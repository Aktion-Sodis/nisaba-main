export default {
  root: ({ props }) => ({
    class: [
      // Spacing and Shape
      'rounded-md',
      props.variant,
      {
        outline: props.variant !== 'simple',
      },

      // Colors
      {
        'bg-info-100/70 dark:bg-info/20':
          props.severity == 'info' && props.variant !== 'simple',
        'bg-success-100/70 dark:bg-success/20':
          props.severity == 'success' && props.variant !== 'simple',
        'bg-secondary-100/70 dark:bg-secondary/20':
          props.severity == 'secondary' && props.variant !== 'simple',
        'bg-warning-100/70 dark:bg-warning/20':
          props.severity == 'warn' && props.variant !== 'simple',
        'bg-danger-100/70 dark:bg-danger/20':
          props.severity == 'error' && props.variant !== 'simple',
        'bg-surface-950 dark:bg-surface-0':
          props.severity == 'contrast' && props.variant !== 'simple',
      },
      {
        'outline-info-200 dark:outline-info/20':
          props.severity == 'info' && props.variant !== 'simple',
        'outline-success-200 dark:outline-success/20':
          props.severity == 'success' && props.variant !== 'simple',
        'outline-secondary-200 dark:outline-secondary/20':
          props.severity == 'secondary' && props.variant !== 'simple',
        'outline-warning-200 dark:outline-warning/20':
          props.severity == 'warn' && props.variant !== 'simple',
        'outline-danger-200 dark:outline-danger/20':
          props.severity == 'error' && props.variant !== 'simple',
        'outline-surface-950 dark:outline-surface-0':
          props.severity == 'contrast' && props.variant !== 'simple',
      },
      {
        'text-info-400 dark:text-info-300': props.severity == 'info',
        'text-success-400 dark:text-success-300': props.severity == 'success',
        'text-secondary-400 dark:text-secondary-300':
          props.severity == 'secondary',
        'text-warning-400 dark:text-warning-300': props.severity == 'warn',
        'text-danger-400 dark:text-danger-300': props.severity == 'error',
        'text-surface-0 dark:text-surface-950': props.severity == 'contrast',
      },
    ],
  }),
  content: ({ props }) => ({
    class: [
      // Flexbox
      'flex items-center h-full',

      // Spacing
      'gap-2',
      {
        'px-3 py-2': props.variant !== 'simple',
        'pt-1': props.variant === 'simple',
      },
    ],
  }),
  icon: {
    class: [
      // Sizing and Spacing
      'shrink-0 w-[1.125rem] h-[1.125rem]',
    ],
  },
  text: {
    class: [
      // Font and Text
      'text-sm leading-[normal]',
      'font-medium',
    ],
  },
  closeButton: ({ props }) => ({
    class: [
      // Flexbox
      'flex items-center justify-center',

      // Size
      'w-7 h-7',

      // Spacing and Misc
      'ml-auto relative',

      // Shape
      'rounded-full',

      // Colors
      'bg-transparent',

      // Transitions
      'transition duration-200 ease-in-out',

      // States
      'hover:bg-secondary-0/30 dark:hover:bg-[rgba(255,255,255,0.03)]',
      'focus:outline-none focus:outline-offset-0 focus:ring-1',
      {
        'focus:ring-info dark:focus:ring-info-400':
          props.severity == 'info' && props.variant !== 'simple',
        'focus:ring-success dark:focus:ring-success-400':
          props.severity == 'success' && props.variant !== 'simple',
        'focus:ring-secondary dark:focus:ring-secondary-400':
          props.severity == 'secondary' && props.variant !== 'simple',
        'focus:ring-warning dark:focus:ring-warning-400':
          props.severity == 'warn' && props.variant !== 'simple',
        'focus:ring-danger dark:focus:ring-danger-4000':
          props.severity == 'error' && props.variant !== 'simple',
        'focus:ring-surface-0 dark:focus:ring-surface-950':
          props.severity == 'contrast' && props.variant !== 'simple',
      },

      // Misc
      'overflow-hidden',
    ],
  }),
  transition: {
    enterFromClass: 'opacity-0',
    enterActiveClass: 'transition-opacity duration-300',
    leaveFromClass: 'max-h-40',
    leaveActiveClass: 'overflow-hidden transition-all duration-300 ease-in',
    leaveToClass: 'max-h-0 opacity-0 !m-0',
  },
};
