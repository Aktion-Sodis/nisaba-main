export default {
  root: ({ props, context }) => ({
    class: [
      'relative shrink-0',

      // Shape
      'border-b-2',
      'rounded-t-md',

      // Spacing
      'py-2 px-[1.125rem]',
      // '-mb-px',

      // Colors and Conditions
      'outline-transparent',
      {
        'border-surface-200 dark:border-surface-700': !context.active,
        'bg-surface-0 dark:bg-surface-900': !context.active,
        'text-surface-700 dark:text-surface-100': !context.active,

        'bg-surface-0 dark:bg-surface-900': context.active,
        'text-danger ': context.active,
        'border-danger': context.active,

        'opacity-60 cursor-default user-select-none select-none pointer-events-none':
          props?.disabled,
      },

      // States
      'focus:outline-none focus:outline-offset-0 focus-visible:ring-1 ring-inset focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300',

      // Transitions
      'transition-all duration-200',

      // Misc
      'cursor-pointer select-none whitespace-nowrap',
      'user-select-none',
    ],
  }),
};
