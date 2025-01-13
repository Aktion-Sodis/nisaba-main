<template>
    <div
      class="relative flex group bg-surface-0 hover:bg-surface-100 rounded-xl shadow transition duration-200 ease-in-out"
      :class="{
        'pointer-events-none opacity-50': disabled,
        'cursor-pointer': !disabled,
      }"
      @click="handleClick"
    >
      <div
        :class="[
          'aspect-square h-full flex items-center justify-center rounded-l-xl ',
          bgColor,
        ]"
      >
        <slot name="icon"></slot>
      </div>
  
      <div class="flex flex-col justify-center p-4 h-24 gap-0.5">
        <h3>
          {{ title }}
        </h3>
        <span class="text-oneliner-light-small">
          {{ subtitle }}
        </span>
      </div>
  
      <div class="absolute bottom-0 right-0 group-hover:opacity-100 md:opacity-0">
        <Button severity="light" size="large" class="p-0">
          <template #icon>
            <i
              class="material-symbols-outlined text-surface-400 md:text-surface-700 font-semibold text-3xl"
            >
              arrow_forward
            </i>
          </template>
        </Button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  /**
   * Define Props
   * Defines the properties passed from the parent component to the child for configuration and data.
   */
  const props = withDefaults(
    defineProps<{
      title: string;
      subtitle: string;
      bgColor?: string;
      disabled?: boolean;
    }>(),
    {
      bgColor: 'bg-primary',
      disabled: false,
    }
  );
  
  /**
   * Define Emits
   * Defines custom events to be emitted by the component, allowing communication with the parent.
   */
  const emit = defineEmits(['click']);
  
  /**
   * Define Methods
   * Defines functions that perform specific actions or handle events within the component.
   */
  const handleClick = () => {
    props.disabled !== true && emit('click');
  };
  </script>
  