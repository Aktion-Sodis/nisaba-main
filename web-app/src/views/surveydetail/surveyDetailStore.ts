import { cloneDeep, isEqual } from 'lodash';
import { defineStore } from 'pinia';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { computed, ref, watch } from 'vue';

import i18n from '@/i18n';
import { SurveyStatus, type Survey } from '@/models/index';
import { useProjectConfigStore } from '@/stores/projectConfigStore';
import { createNewTextQuestion, createNewSurvey } from '@/utils/newObjects';

export const useSurveyDetailStore = defineStore('surveyDetail', () => {
  const toast = useToast();
  const confirm = useConfirm();
  const activeIndex = ref(-1);
  const lastSavedAt = ref<Date | null>(null);
  const isSaving = ref(false);
  const editMode = ref(false);
  const autoSaveTimer = ref<number | null>(null);
  const autoSaveInterval = 30000; // 30 seconds
  const minAutoSaveInterval = 5000; // 5 seconds
  const currentAutoSaveInterval = ref(autoSaveInterval);
  const lastAutoSaveFailed = ref(false);

  // Watch for editMode changes to handle auto-save
  watch(editMode, (newValue) => {
    if (newValue) {
      startAutoSave();
    } else {
      stopAutoSave();
    }
  });

  const projectConfigStore = useProjectConfigStore();

  const localSurvey = ref<Survey | null>(null);

  const _dbSurvey = ref<Survey | null>(null);

  // Error state
  const errors = ref<{
    general: string[];
    [key: number]: string[];
  }>({
    general: [],
  });

  const hasErrors = computed(() => {
    if (errors.value.general.length > 0) return true;

    return Object.keys(errors.value)
      .filter((key) => key !== 'general')
      .some((key) => errors.value[Number(key)].length > 0);
  });

  const survey = computed(() => {
    return localSurvey.value || _dbSurvey.value;
  });

  const isCreate = computed(() => _dbSurvey.value === null);

  const unsavedChangesAvailable = computed(() => {
    if (isCreate.value) {
      return true;
    }

    if (!localSurvey.value || !_dbSurvey.value) {
      return false;
    }

    // Compare only the relevant properties
    const local = localSurvey.value;
    const db = _dbSurvey.value;

    return (
      !isEqual(local.name, db.name) ||
      !isEqual(local.description, db.description) ||
      !isEqual(local.questions, db.questions) ||
      !isEqual(local.surveyType, db.surveyType) ||
      !isEqual(local.status, db.status) ||
      !isEqual(local.schemeVersion, db.schemeVersion) ||
      !isEqual(local.archived, db.archived) ||
      !isEqual(local.interventionSurveysId, db.interventionSurveysId)
    );
  });

  const publishingSurvey = ref(false);
  const publishSurvey = async () => {
    if (!localSurvey.value) {
      return;
    }

    if (publishingSurvey.value) {
      return;
    }

    confirm.require({
      message: i18n.global.t(
        'surveydetails.publish_card.draft.confirm.message'
      ),
      header: i18n.global.t('surveydetails.publish_card.draft.confirm.title'),
      icon: 'pi pi-exclamation-triangle',
      acceptProps: {
        label: i18n.global.t('surveydetails.publish_card.draft.confirm.accept'),
        icon: 'pi pi-send',
      },
      rejectProps: {
        label: i18n.global.t('surveydetails.publish_card.draft.confirm.reject'),
        severity: 'secondary',
        outlined: true,
      },
      accept: async () => {
        publishingSurvey.value = true;
        clearErrors();

        if (!validateSurvey(true)) {
          toast.add({
            severity: 'error',
            summary: i18n.global.t(
              'surveydetails.toasts.publish_validation_error.title'
            ),
            detail: i18n.global.t(
              'surveydetails.toasts.publish_validation_error.message'
            ),
            life: 5000,
          });
          return;
        }

        try {
          await projectConfigStore.updateSurvey({
            ...localSurvey.value,
            status: SurveyStatus.ACTIVE,
          } as Survey);
          localSurvey.value = {
            ...localSurvey.value,
            status: SurveyStatus.ACTIVE,
          } as Survey;
          _dbSurvey.value = cloneDeep(localSurvey.value);
          toast.add({
            severity: 'success',
            summary: i18n.global.t(
              'surveydetails.toasts.publish_success.title'
            ),
            detail: i18n.global.t(
              'surveydetails.toasts.publish_success.message'
            ),
            life: 3000,
          });
        } catch (error) {
          toast.add({
            severity: 'error',
            summary: i18n.global.t(
              'surveydetails.toasts.publish_server_error.title'
            ),
            detail: i18n.global.t(
              'surveydetails.toasts.publish_server_error.message'
            ),
            life: 5000,
          });
        } finally {
          publishingSurvey.value = false;
        }
      },
    });
  };

  const archivingSurvey = ref(false);
  const archiveSurvey = async () => {
    if (!localSurvey.value) {
      return;
    }

    if (archivingSurvey.value) {
      return;
    }

    confirm.require({
      message: i18n.global.t(
        'surveydetails.publish_card.published.confirm.message'
      ),
      header: i18n.global.t(
        'surveydetails.publish_card.published.confirm.title'
      ),
      icon: 'pi pi-exclamation-triangle',
      acceptProps: {
        label: i18n.global.t(
          'surveydetails.publish_card.published.confirm.accept'
        ),
        icon: 'pi pi-archive',
      },
      rejectProps: {
        label: i18n.global.t(
          'surveydetails.publish_card.published.confirm.reject'
        ),
        severity: 'secondary',
        outlined: true,
      },
      accept: async () => {
        archivingSurvey.value = true;

        try {
          await projectConfigStore.updateSurvey({
            ...localSurvey.value,
            status: SurveyStatus.ARCHIVED,
          } as Survey);
          localSurvey.value = {
            ...localSurvey.value,
            status: SurveyStatus.ARCHIVED,
          } as Survey;
          _dbSurvey.value = cloneDeep(localSurvey.value);
          toast.add({
            severity: 'success',
            summary: i18n.global.t(
              'surveydetails.toasts.archive_success.title'
            ),
            detail: i18n.global.t(
              'surveydetails.toasts.archive_success.message'
            ),
            life: 3000,
          });
        } catch (error) {
          toast.add({
            severity: 'error',
            summary: i18n.global.t(
              'surveydetails.toasts.archive_server_error.title'
            ),
            detail: i18n.global.t(
              'surveydetails.toasts.archive_server_error.message'
            ),
            life: 5000,
          });
        } finally {
          archivingSurvey.value = false;
        }
      },
    });
  };

  const reactivatingSurvey = ref(false);
  const reactivateSurvey = async () => {
    if (!localSurvey.value) {
      return;
    }

    if (reactivatingSurvey.value) {
      return;
    }

    confirm.require({
      message: i18n.global.t(
        'surveydetails.publish_card.archived.confirm.message'
      ),
      header: i18n.global.t(
        'surveydetails.publish_card.archived.confirm.title'
      ),
      icon: 'pi pi-exclamation-triangle',
      acceptProps: {
        label: i18n.global.t(
          'surveydetails.publish_card.archived.confirm.accept'
        ),
        icon: 'pi pi-refresh',
      },
      rejectProps: {
        label: i18n.global.t(
          'surveydetails.publish_card.archived.confirm.reject'
        ),
        severity: 'secondary',
        outlined: true,
      },
      accept: async () => {
        reactivatingSurvey.value = true;

        try {
          await projectConfigStore.updateSurvey({
            ...localSurvey.value,
            status: SurveyStatus.ACTIVE,
          } as Survey);
          localSurvey.value = {
            ...localSurvey.value,
            status: SurveyStatus.ACTIVE,
          } as Survey;
          _dbSurvey.value = cloneDeep(localSurvey.value);
          toast.add({
            severity: 'success',
            summary: i18n.global.t(
              'surveydetails.toasts.reactivate_success.title'
            ),
            detail: i18n.global.t(
              'surveydetails.toasts.reactivate_success.message'
            ),
            life: 3000,
          });
        } catch (error) {
          toast.add({
            severity: 'error',
            summary: i18n.global.t(
              'surveydetails.toasts.reactivate_server_error.title'
            ),
            detail: i18n.global.t(
              'surveydetails.toasts.reactivate_server_error.message'
            ),
            life: 5000,
          });
        } finally {
          reactivatingSurvey.value = false;
        }
      },
    });
  };

  const saveSurvey = async (
    options: {
      showToasts?: boolean;
      showValidationErrors?: boolean;
    } = { showToasts: true, showValidationErrors: true }
  ) => {
    if (isSaving.value) {
      return;
    }

    if (options.showValidationErrors) {
      clearErrors();
    }

    if (!localSurvey.value) {
      return;
    }

    if (!validateSurvey(options.showValidationErrors)) {
      if (options.showToasts) {
        toast.add({
          severity: 'error',
          summary: i18n.global.t('surveydetails.toasts.save_error.title'),
          detail: i18n.global.t('surveydetails.toasts.save_error.message'),
          life: 5000,
        });
      }
      return false;
    }

    isSaving.value = true;
    try {
      if (isCreate.value) {
        await projectConfigStore.createSurvey(localSurvey.value as Survey);
        _dbSurvey.value = cloneDeep(localSurvey.value);
        if (options.showToasts) {
          toast.add({
            severity: 'success',
            summary: i18n.global.t('surveydetails.toasts.create_success.title'),
            detail: i18n.global.t(
              'surveydetails.toasts.create_success.message'
            ),
            life: 3000,
          });
        }
      } else {
        await projectConfigStore.updateSurvey(localSurvey.value as Survey);
        _dbSurvey.value = cloneDeep(localSurvey.value);
        if (options.showToasts) {
          toast.add({
            severity: 'success',
            summary: i18n.global.t('surveydetails.toasts.save_success.title'),
            detail: i18n.global.t('surveydetails.toasts.save_success.message'),
            life: 3000,
          });
        }
      }
      lastSavedAt.value = new Date();
      return true;
    } catch (error) {
      if (options.showToasts) {
        toast.add({
          severity: 'error',
          summary: i18n.global.t('surveydetails.toasts.server_error.title'),
          detail: i18n.global.t('surveydetails.toasts.server_error.message'),
          life: 5000,
        });
      }
      return false;
    } finally {
      isSaving.value = false;
    }
  };

  const startAutoSave = () => {
    if (autoSaveTimer.value) {
      clearInterval(autoSaveTimer.value);
    }

    currentAutoSaveInterval.value = autoSaveInterval;
    lastAutoSaveFailed.value = false;

    const scheduleNextAutoSave = async () => {
      if (unsavedChangesAvailable.value) {
        const success = await saveSurvey({
          showToasts: false,
          showValidationErrors: false,
        });

        if (!success) {
          // If save failed, increase frequency for next attempt
          if (!lastAutoSaveFailed.value) {
            // First failure, reduce to 15 seconds
            currentAutoSaveInterval.value = Math.max(
              minAutoSaveInterval,
              autoSaveInterval / 2
            );
          } else {
            // Subsequent failures, reduce by half again but not below minimum
            currentAutoSaveInterval.value = Math.max(
              minAutoSaveInterval,
              currentAutoSaveInterval.value / 2
            );
          }
          lastAutoSaveFailed.value = true;
        } else {
          // Reset to normal interval on success
          currentAutoSaveInterval.value = autoSaveInterval;
          lastAutoSaveFailed.value = false;
        }
      }

      // Schedule next attempt
      autoSaveTimer.value = window.setTimeout(
        scheduleNextAutoSave,
        currentAutoSaveInterval.value
      );
    };

    // Start first attempt
    scheduleNextAutoSave();
  };

  const stopAutoSave = () => {
    if (autoSaveTimer.value) {
      clearTimeout(autoSaveTimer.value);
      autoSaveTimer.value = null;
    }
    currentAutoSaveInterval.value = autoSaveInterval;
    lastAutoSaveFailed.value = false;
  };

  const initEdit = (survey: Survey) => {
    _dbSurvey.value = cloneDeep(survey);
    localSurvey.value = cloneDeep(survey);
    editMode.value = true;
  };

  const initCreate = () => {
    localSurvey.value = createNewSurvey(allowedLanguageKeys.value);
    _dbSurvey.value = null;
    editMode.value = true;
  };

  const initView = (survey: Survey) => {
    localSurvey.value = cloneDeep(survey);
    _dbSurvey.value = cloneDeep(survey);
    editMode.value = false;
  };

  const clear = () => {
    localSurvey.value = null;
    _dbSurvey.value = null;
    editMode.value = false;
  };

  const clearErrors = () => {
    errors.value = { general: [] };
  };

  const validateSurvey = (showValidationErrors: boolean = true): boolean => {
    if (!localSurvey.value) {
      if (showValidationErrors) {
        errors.value.general.push(
          i18n.global.t('surveydetails.errors.general.no_survey_data')
        );
      }
      return false;
    }

    // Clear previous errors
    if (showValidationErrors) {
      clearErrors();
    }

    let hasValidationErrors = false;

    // Validate general info (name is required, description is optional)
    const hasName = localSurvey.value.name.languageKeys.every((key, index) =>
      localSurvey.value?.name.languageTexts[index]?.trim()
    );
    if (!hasName) {
      hasValidationErrors = true;
      if (showValidationErrors) {
        errors.value.general.push(
          i18n.global.t('surveydetails.errors.general.name_required')
        );
      }
    }

    // Validate intervention
    if (!localSurvey.value.interventionSurveysId) {
      hasValidationErrors = true;
      if (showValidationErrors) {
        errors.value.general.push(
          i18n.global.t('surveydetails.errors.general.intervention_required')
        );
      }
    }

    // Validate that there is at least one question
    if (
      !localSurvey.value.questions ||
      localSurvey.value.questions.length === 0
    ) {
      hasValidationErrors = true;
      if (showValidationErrors) {
        errors.value.general.push(
          i18n.global.t(
            'surveydetails.errors.general.at_least_one_question_required'
          )
        );
      }
    }

    // Validate each question
    localSurvey.value.questions.forEach((question, index) => {
      const questionErrors: string[] = [];

      // Check question text
      const hasQuestionText = question.text.languageKeys.every(
        (key, textIndex) => question.text.languageTexts[textIndex]?.trim()
      );
      if (!hasQuestionText) {
        hasValidationErrors = true;
        if (showValidationErrors) {
          questionErrors.push(
            i18n.global.t('surveydetails.errors.question.text_required')
          );
        }
      }

      // Check question options if they exist
      if (question.questionOptions && question.questionOptions.length > 0) {
        question.questionOptions.forEach((option, optionIndex) => {
          const hasOptionText = option.text.languageKeys.every(
            (key, textIndex) => option.text.languageTexts[textIndex]?.trim()
          );
          if (!hasOptionText) {
            hasValidationErrors = true;
            if (showValidationErrors) {
              questionErrors.push(
                i18n.global.t(
                  'surveydetails.errors.question.option_text_required',
                  {
                    number: optionIndex + 1,
                  }
                )
              );
            }
          }
        });
      }

      if (questionErrors.length > 0 && showValidationErrors) {
        errors.value[index] = questionErrors;
      }
    });

    return !hasValidationErrors;
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
    activeIndex,
    lastSavedAt,
    publishSurvey,
    archiveSurvey,
    reactivateSurvey,
    errors,
    hasErrors,
    validateSurvey,
    clearErrors,
    isSaving,
    initEdit,
    editMode,
    initView,
    startAutoSave,
    stopAutoSave,
  };
});
