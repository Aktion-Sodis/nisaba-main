export default {
  root: ({ props }) => ({
    class: [
      //Font
      'text-xs font-bold',

      //Alignments
      'inline-flex items-center justify-center',

      //Spacing
      'px-[0.4rem] py-1',

      //Shape
      {
        'rounded-md': !props.rounded,
        'rounded-full': props.rounded,
      },

      //Colors
      {
        'text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-500/20':
          props.severity === undefined ||
          props.severity === null ||
          props.severity === 'primary',
        'text-success-700 dark:text-success-300 bg-success-100 dark:bg-success-500/20':
          props.severity === 'success',
        'text-surface-700 dark:text-surface-300 bg-surface-100 dark:bg-surface-500/20':
          props.severity === 'secondary',
        'text-info-700 dark:text-info-300 bg-info-100 dark:bg-info-500/20':
          props.severity === 'info',
        'text-warning-700 dark:text-warning-300 bg-warning-100 dark:bg-warning-500/20':
          props.severity === 'warn',
        'text-help-700 dark:text-help-300 bg-help-100 dark:bg-help-500/20':
          props.severity === 'help',
        'text-danger-700 dark:text-danger-300 bg-danger-100 dark:bg-danger-500/20':
          props.severity === 'danger',
        'text-surface-0 dark:text-surface-900 bg-surface-900 dark:bg-surface-0':
          props.severity === 'contrast',
      },
    ],
  }),
  value: {
    class: 'leading-normal',
  },
  icon: {
    class: 'mr-1 text-sm',
  },
};
