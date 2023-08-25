import { defineStore } from 'pinia';

import { usei18nStore } from '@/store/i18n'

export const useChartStore = defineStore('chart', {
  state: () => ({

  }),

  persist: {
  },


  actions: {

    createLabelList(question_options, i18nLocale) {
        const labels = [];
        const i18nStore = usei18nStore()

        question_options.forEach((option, index) => {
          const option_text = i18nStore.getLanguageText(
            option.text.languageKeys,
            option.text.languageTexts,
            i18nLocale
          );
          if (option_text !== -1) {
            labels.push(option_text);
          }
        });
        return labels;
      },

    sumAnswerValues(answers) {
        if (answers.length === 0) {
          return [];
        }
        const columnSums = answers.reduce((acc, answer) => {
          answer.answer_value.forEach((value, index) => {
            if (acc[index] === undefined) {
              acc[index] = 0;
            }
            acc[index] += value;
          });
          return acc;
        }, []);
        return columnSums;
      },

  }
});