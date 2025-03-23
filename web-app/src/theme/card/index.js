export default {
  root: {
    class: [
      //Flex
      'flex flex-col',

      //Shape
      'rounded-md',
      'shadow-md',

      //Color
      'bg-surface-0 dark:bg-surface-900',
      'text-surface-700 dark:text-surface-0',
    ],
  },
  body: {
    class: [
      //Flex
      'flex flex-col h-full',
      'gap-4',
      'flex-grow',
      'p-6',
    ],
  },
  caption: {
    class: [
      //Flex
      'flex flex-col',
      'gap-2',
    ],
  },
  title: {
    class: 'text-section-inner-title font-semibold mb-0',
  },
  subtitle: {
    class: [
      'text-oneliner-light-small',

      //Font
      'font-normal',

      //Spacing
      'mb-0',

      //Color
      'text-surface-600 dark:text-surface-0/60',
    ],
  },
  content: {
    class: 'p-0 h-full flex-grow',
  },
  footer: {
    class: 'p-0',
  },
};
