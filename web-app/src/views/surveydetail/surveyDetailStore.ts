import { isEqual } from 'lodash';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import type { Survey } from '@/models/index';
import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { createNewTextQuestion, createNewSurvey } from '@/utils/newObjects';

export const useSurveyDetailStore = defineStore('surveyDetail', () => {
  const projectConfigStore = useProjectConfigStore();

  const localSurvey = ref<Survey | null>(null);

  const _dbSurvey = ref<Survey | null>(null);

  const survey = computed(() => {
    return localSurvey.value || _dbSurvey.value;
  });

  const isCreate = computed(() => _dbSurvey.value === null);

  const unsavedChangesAvailable = computed(() => {
    return !isEqual(localSurvey.value, _dbSurvey.value);
  });

  const setDbSurvey = (survey: Survey) => {
    _dbSurvey.value = survey;
    localSurvey.value = survey;
  };

  const initCreate = () => {
    localSurvey.value = createNewSurvey(allowedLanguageKeys.value);
    _dbSurvey.value = null;
  };

  const clear = () => {
    localSurvey.value = null;
    _dbSurvey.value = null;
  };

  const saveSurvey = async () => {
    if (!localSurvey.value) {
      return;
    }
    if (isCreate.value) {
      await projectConfigStore.createSurvey(localSurvey.value as Survey);
      _dbSurvey.value = localSurvey.value;
    } else {
      await projectConfigStore.updateSurvey(localSurvey.value as Survey);
      _dbSurvey.value = localSurvey.value;
    }
  };

  const addEmptyQuestion = () => {
    if (!localSurvey.value) {
      return;
    }
    localSurvey.value.questions.push(
      createNewTextQuestion(allowedLanguageKeys.value)
    );
  };

  const isFollowUpQuestionPossible = (questionIndex: number): boolean => {
    if (!localSurvey.value || questionIndex <= 0) {
      return false;
    }

    // Check all previous questions
    for (let i = 0; i < questionIndex; i++) {
      const question = localSurvey.value.questions[i];
      if (
        (question.type === 'SINGLECHOICE' ||
          question.type === 'MULTIPLECHOICE') &&
        question.questionOptions &&
        question.questionOptions.length > 0
      ) {
        return true;
      }
    }
    return false;
  };

  const getPreviousQuestionOptions = (questionIndex: number) => {
    if (!localSurvey.value || questionIndex <= 0) {
      return [];
    }

    return localSurvey.value.questions
      .slice(0, questionIndex)
      .map((question, qIndex) => {
        if (
          (question.type === 'SINGLECHOICE' ||
            question.type === 'MULTIPLECHOICE') &&
          question.questionOptions &&
          question.questionOptions.length > 0
        ) {
          return {
            question_index: qIndex,
            question_id: question.id,
            question_text: question.text,
            options: question.questionOptions.map((option, oIndex) => ({
              index: oIndex,
              id: option.id,
              text: option.text,
            })),
          };
        }
        return null;
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  };

  const getConditionQuestionOptionIds = (questionIndex: number): string[] => {
    if (!localSurvey.value || questionIndex <= 0) {
      return [];
    }

    const currentQuestion = localSurvey.value.questions[questionIndex];
    if (!currentQuestion?.id) {
      return [];
    }

    const result: string[] = [];

    // Look through all previous questions
    for (let i = 0; i < questionIndex; i++) {
      const prevQuestion = localSurvey.value.questions[i];
      if (
        (prevQuestion.type === 'SINGLECHOICE' ||
          prevQuestion.type === 'MULTIPLECHOICE') &&
        Array.isArray(prevQuestion.questionOptions)
      ) {
        // Check each option in the previous question
        prevQuestion.questionOptions.forEach((option) => {
          if (
            Array.isArray(option.followUpQuestionIDs) &&
            option.followUpQuestionIDs.includes(currentQuestion.id)
          ) {
            result.push(option.id);
          }
        });
      }
    }

    return result;
  };

  const setConditionQuestionOptionIds = (
    questionIndex: number,
    optionIds: string[]
  ) => {
    if (!localSurvey.value || questionIndex <= 0) {
      return;
    }

    const currentQuestion = localSurvey.value.questions[questionIndex];
    if (!currentQuestion?.id) {
      return;
    }

    // Validate optionIds
    const validOptionIds = new Set(optionIds);
    if (validOptionIds.size !== optionIds.length) {
      console.warn(
        'Duplicate option IDs found in setConditionQuestionOptionIds'
      );
    }

    // Create a new questions array with updated follow-up references
    const updatedQuestions = localSurvey.value.questions.map((question, i) => {
      if (i >= questionIndex) {
        return question;
      }

      if (
        (question.type === 'SINGLECHOICE' ||
          question.type === 'MULTIPLECHOICE') &&
        Array.isArray(question.questionOptions)
      ) {
        const updatedOptions = question.questionOptions.map((option) => {
          const currentFollowUps = Array.isArray(option.followUpQuestionIDs)
            ? option.followUpQuestionIDs
            : [];

          if (validOptionIds.has(option.id)) {
            // Add current question ID if not already present
            if (!currentFollowUps.includes(currentQuestion.id)) {
              return {
                ...option,
                followUpQuestionIDs: [...currentFollowUps, currentQuestion.id],
              };
            }
          } else {
            // Remove current question ID if present
            const filteredFollowUps = currentFollowUps.filter(
              (id) => id !== currentQuestion.id
            );
            if (filteredFollowUps.length !== currentFollowUps.length) {
              return {
                ...option,
                followUpQuestionIDs: filteredFollowUps,
              };
            }
          }
          return option;
        });

        // Only create new question object if options were actually modified
        const hasChanges = updatedOptions.some(
          (opt, idx) => opt !== question.questionOptions?.[idx]
        );

        if (hasChanges) {
          return {
            ...question,
            questionOptions: updatedOptions,
          };
        }
      }

      return question;
    });

    // Only update if there were actual changes
    if (
      updatedQuestions.some((q, idx) => q !== localSurvey.value?.questions[idx])
    ) {
      localSurvey.value = {
        ...localSurvey.value,
        questions: updatedQuestions,
      };
    }
  };

  const cleanupQuestionOptionDeletion = (deletedOption: {
    id: string;
    followUpQuestionIDs?: string[];
  }) => {
    if (!localSurvey.value || !deletedOption.followUpQuestionIDs?.length) {
      return;
    }

    deletedOption.followUpQuestionIDs.forEach((questionId) => {
      let isOnlyFollowUpOfDeletedOption = true;
      let questionIndex = -1;

      localSurvey.value?.questions.forEach((question, index) => {
        if (question.id === questionId) {
          questionIndex = index;
          if (
            question.type === 'SINGLECHOICE' ||
            question.type === 'MULTIPLECHOICE'
          ) {
            question.questionOptions?.forEach((option) => {
              if (
                option.id !== deletedOption.id &&
                option.followUpQuestionIDs?.includes(questionId)
              ) {
                isOnlyFollowUpOfDeletedOption = false;
              }
            });
          }
        }
      });

      if (isOnlyFollowUpOfDeletedOption && questionIndex !== -1) {
        const updatedQuestions = [...(localSurvey.value?.questions || [])];
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          isFollowUpQuestion: false,
        };
        localSurvey.value = {
          ...localSurvey.value,
          questions: updatedQuestions,
        };
      }
    });
  };

  const cleanupQuestionDeletion = (deletedQuestionId: string) => {
    if (!localSurvey.value) {
      return;
    }

    const deletedQuestionIndex = localSurvey.value.questions.findIndex(
      (q) => q.id === deletedQuestionId
    );

    if (deletedQuestionIndex === -1) {
      return;
    }

    const updatedQuestions = localSurvey.value.questions.map(
      (question, index) => {
        if (index >= deletedQuestionIndex) {
          return question;
        }

        if (
          question.type === 'SINGLECHOICE' ||
          question.type === 'MULTIPLECHOICE'
        ) {
          const updatedOptions = question.questionOptions?.map((option) => {
            if (option.followUpQuestionIDs?.includes(deletedQuestionId)) {
              return {
                ...option,
                followUpQuestionIDs: option.followUpQuestionIDs.filter(
                  (id) => id !== deletedQuestionId
                ),
              };
            }
            return option;
          });

          if (
            updatedOptions?.some(
              (opt, idx) => opt !== question.questionOptions?.[idx]
            )
          ) {
            return {
              ...question,
              questionOptions: updatedOptions,
            };
          }
        }
        return question;
      }
    );

    localSurvey.value = {
      ...localSurvey.value,
      questions: updatedQuestions,
    };
  };

  const deleteQuestion = (questionIndex: number) => {
    if (
      !localSurvey.value ||
      questionIndex < 0 ||
      questionIndex >= localSurvey.value.questions.length
    ) {
      return;
    }

    const questionToDelete = localSurvey.value.questions[questionIndex];

    const updatedQuestions = [
      ...localSurvey.value.questions.slice(0, questionIndex),
      ...localSurvey.value.questions.slice(questionIndex + 1),
    ];

    localSurvey.value = {
      ...localSurvey.value,
      questions: updatedQuestions,
    };

    cleanupQuestionDeletion(questionToDelete.id);
  };

  const allowedLanguageKeys = ref<Array<string>>([]);

  return {
    localSurvey,
    survey,
    saveSurvey,
    clear,
    setDbSurvey,
    unsavedChangesAvailable,
    isCreate,
    allowedLanguageKeys,
    initCreate,
    addEmptyQuestion,
    isFollowUpQuestionPossible,
    getPreviousQuestionOptions,
    getConditionQuestionOptionIds,
    setConditionQuestionOptionIds,
    cleanupQuestionOptionDeletion,
    cleanupQuestionDeletion,
    deleteQuestion,
  };
});
