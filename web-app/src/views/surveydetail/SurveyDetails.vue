<template>
  <div
    v-if="surveyDetailStore.localSurvey"
    class="flex gap-4 h-full w-full pb-4"
  >
    <div
      ref="mainScrollRef"
      class="flex-1 min-w-0 h-full overflow-y-auto"
      :class="{ 'pr-2': hasScrollbar }"
    >
      <div class="flex flex-col gap-4">
        <div ref="generalCardRef">
          <general-input-card />
        </div>
        <div
          v-for="(_, index) in surveyDetailStore.localSurvey.questions"
          :key="index"
          :ref="(el) => (questionRefs[index] = el as HTMLElement | null)"
        >
          <question-card :question-index="index" />
        </div>
        <add-question-card />
      </div>
    </div>
    <div class="w-80 flex-shrink-0 flex flex-col gap-4 h-full">
      <div class="flex-grow min-h-0">
        <navigation-card
          :active-index="activeIndex"
          :on-navigate="scrollToSection"
        />
      </div>
      <publish-card />
      <save-card
        v-if="surveyDetailStore.survey?.status === SurveyStatus.DRAFT"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import AddQuestionCard from './components/AddQuestionCard.vue';
import GeneralInputCard from './components/GeneralInputCard.vue';
import NavigationCard from './components/NavigationCard.vue';
import PublishCard from './components/PublishCard.vue';
import QuestionCard from './components/questioncard/QuestionCard.vue';
import SaveCard from './components/SaveCard.vue';
import { useSurveyDetailStore } from './surveyDetailStore';

import { SurveyStatus } from '@/models';

const surveyDetailStore = useSurveyDetailStore();
const { locale } = useI18n();

const questionRefs = ref<(HTMLElement | null)[]>([]);
const generalCardRef = ref<HTMLElement | null>(null);
const mainScrollRef = ref<HTMLElement | null>(null);
const hasScrollbar = ref(false);

const activeIndex = computed({
  get: () => surveyDetailStore.activeIndex,
  set: (value) => {
    surveyDetailStore.activeIndex = value;
  },
});

const scrollToSection = (index: number) => {
  nextTick(() => {
    const el = index === -1 ? generalCardRef.value : questionRefs.value[index];
    if (el && mainScrollRef.value) {
      const containerRect = mainScrollRef.value.getBoundingClientRect();
      const elementRect = el.getBoundingClientRect();
      const offset =
        mainScrollRef.value.scrollTop + (elementRect.top - containerRect.top);

      mainScrollRef.value.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
      el.focus?.();
    }
  });
};

const onScroll = () => {
  if (!mainScrollRef.value) return;

  const containerRect = mainScrollRef.value.getBoundingClientRect();
  let foundIndex = -1;
  let maxVisibleArea = 0;

  // Special case: if we're at the top of the container, always select general section
  if (mainScrollRef.value.scrollTop === 0) {
    if (foundIndex !== activeIndex.value) {
      activeIndex.value = -1;
    }
    return;
  }

  // Check general card first
  if (generalCardRef.value) {
    const elementRect = generalCardRef.value.getBoundingClientRect();
    const visibleArea =
      Math.min(elementRect.bottom, containerRect.bottom) -
      Math.max(elementRect.top, containerRect.top);
    if (visibleArea > maxVisibleArea) {
      maxVisibleArea = visibleArea;
      foundIndex = -1;
    }
  }

  // Then check question cards
  for (let i = 0; i < questionRefs.value.length; i++) {
    const element = questionRefs.value[i];
    if (element) {
      const elementRect = element.getBoundingClientRect();
      const visibleArea =
        Math.min(elementRect.bottom, containerRect.bottom) -
        Math.max(elementRect.top, containerRect.top);
      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        foundIndex = i;
      }
    }
  }

  // First check if the selected section is fully visible
  const currentElement =
    foundIndex === -1 ? generalCardRef.value : questionRefs.value[foundIndex];
  if (currentElement) {
    const currentRect = currentElement.getBoundingClientRect();
    if (
      currentRect.top >= containerRect.top &&
      currentRect.bottom <= containerRect.bottom
    ) {
      // Current section is fully visible, no need to check next section
      if (foundIndex !== activeIndex.value) {
        activeIndex.value = foundIndex;
      }
      return;
    }
  }

  // If current section is not fully visible, check the next section
  const nextElement =
    foundIndex === -1
      ? questionRefs.value[0]
      : questionRefs.value[foundIndex + 1];
  if (nextElement) {
    const nextRect = nextElement.getBoundingClientRect();
    if (
      nextRect.top >= containerRect.top &&
      nextRect.bottom <= containerRect.bottom
    ) {
      foundIndex = foundIndex === -1 ? 0 : foundIndex + 1;
    }
  }

  if (foundIndex !== activeIndex.value) {
    activeIndex.value = foundIndex;
  }
};

const checkForScrollbar = () => {
  if (mainScrollRef.value) {
    hasScrollbar.value =
      mainScrollRef.value.scrollHeight > mainScrollRef.value.clientHeight;
  }
};

onMounted(() => {
  if (surveyDetailStore.allowedLanguageKeys.length === 0) {
    surveyDetailStore.allowedLanguageKeys = [locale.value];
  }
  mainScrollRef.value?.addEventListener('scroll', onScroll);
  checkForScrollbar();
  // Add resize observer to check for scrollbar when content changes
  const resizeObserver = new ResizeObserver(() => {
    checkForScrollbar();
  });
  if (mainScrollRef.value) {
    resizeObserver.observe(mainScrollRef.value);
  }
});

onUnmounted(() => {
  mainScrollRef.value?.removeEventListener('scroll', onScroll);
});
</script>
