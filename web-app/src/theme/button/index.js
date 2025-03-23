export default {
  root: ({ props, context, parent, instance }) => ({
    class: [
      'relative',

      'shrink-0',

      'group',
      {
        'max-w-max': !props.fluid,
        'w-full': props.fluid,
      },

      'px-3',

      // Alignments
      'items-center inline-flex text-center align-bottom justify-center',
      {
        'flex-col':
          (props.iconPos === 'top' || props.iconPos === 'bottom') &&
          props.label,
      },

      // Sizes & Spacing
      'leading-[normal]',
      {
        'h-[2.6rem]': props.size === null,
        'text-sm h-[2.1rem]': props.size === 'small',
        'text-xl h-[3.35rem]': props.size === 'large',
      },
      {
        'px-3':
          props.label !== null &&
          (props.size === null || props.size === 'small'),
        'px-6': props.label !== null && props.size === 'large',
      },
      { 'gap-2': props.label !== null },
      {
        'aspect-square': props.label === null && props.icon !== null,
        '[&:has(>svg)]:aspect-square':
          props.label === null && props.icon === null,
        '[&:has(>i.material-symbols-outlined)]:aspect-square':
          props.label === null && props.icon === null,
        '[&:has(>button)]:aspect-square':
          props.label === null && props.icon === null,
      },

      {
        // 'w-10 px-0 gap-0': instance.hasIcon && !props.label && !props.badge,
        'rounded-[50%] h-10 [&>[data-pc-section=label]]:w-0 [&>[data-pc-section=label]]:invisible':
          instance.hasIcon && !props.label && !props.badge && props.rounded,
      },

      // Shapes
      { 'shadow-lg': props.raised },
      { 'rounded-md': !props.rounded, 'rounded-full': props.rounded },
      {
        'rounded-none first:rounded-l-md last:rounded-r-md':
          parent.instance.$name == 'InputGroup',
      },

      // Link Button
      //   { 'text-primary-600 bg-transparent border-transparent': props.link },
      { 'bg-transparent border-transparent': props.link },

      // Plain Button
      {
        'text-white bg-gray-500 border border-gray-500':
          props.plain && !props.outlined && !props.text && !props.link,
      },
      // Plain Text Button
      { 'text-surface-500': props.plain && props.text },
      // Plain Outlined Button
      {
        'text-surface-500 border border-gray-500':
          props.plain && props.outlined,
      },

      // Text Button
      { 'bg-transparent border-transparent': props.text && !props.plain },

      // Outlined Button
      { 'bg-transparent border': props.outlined && !props.plain },

      // --- Severity Buttons ---

      // Primary Button
      {
        'text-primary-contrast':
          !props.link &&
          props.severity === null &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'bg-primary':
          !props.link &&
          props.severity === null &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'border border-primary':
          !props.link &&
          props.severity === null &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      // Primary Text Button
      {
        'text-primary':
          (props.text || props.link) && props.severity === null && !props.plain,
      },
      // Primary Outlined Button
      {
        'text-primary border border-primary-200':
          props.outlined && props.severity === null && !props.plain,
      },

      // Secondary Button
      {
        'text-surface-900 dark:text-white':
          props.severity === 'secondary' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link &&
          !props.link,
        'bg-surface-100 dark:bg-surface-700':
          props.severity === 'secondary' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'border border-surface-100 dark:border-surface-700':
          props.severity === 'secondary' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      // Secondary Text Button
      {
        'text-surface-500 dark:text-surface-300':
          (props.text || props.link) &&
          props.severity === 'secondary' &&
          !props.plain,
        'text-secondary-500 dark:text-secondary-300':
          props.severity === 'secondary' && props.link,
      },
      // Secondary Outlined Button
      {
        'text-surface-500 dark:text-surface-300 border border-surface-200 hover:bg-surface-50':
          props.outlined && props.severity === 'secondary' && !props.plain,
      },

      // Success Button
      {
        'text-white dark:text-success-900':
          props.severity === 'success' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'bg-success-500 dark:bg-success-400':
          props.severity === 'success' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'border border-success-500 dark:border-success-400':
          props.severity === 'success' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      // Success Text Button
      {
        'text-success-500 dark:text-success-400':
          props.text && props.severity === 'success' && !props.plain,
      },
      // Success Outlined Button
      {
        'text-success-500 border border-success-200 hover:bg-success-50':
          props.outlined && props.severity === 'success' && !props.plain,
      },
      // Success Link Button
      {
        'text-success-500 dark:text-success-400':
          props.link && props.severity === 'success' && !props.plain,
      },

      // Info Button
      {
        'text-white dark:text-surface-900':
          props.severity === 'info' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'bg-info-500 dark:bg-info-400':
          props.severity === 'info' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'border border-info-500 dark:border-info-400':
          props.severity === 'info' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      // Info Text Button
      {
        'text-info-500 dark:text-info-400':
          props.text && props.severity === 'info' && !props.plain,
      },
      // Info Outlined Button
      {
        'text-info-500 border border-info-200 hover:bg-info-50 ':
          props.outlined && props.severity === 'info' && !props.plain,
      },
      // Info Link Button
      {
        'text-info-500 dark:text-info-400':
          props.link && props.severity === 'info' && !props.plain,
      },

      // Warning Button
      {
        'text-white dark:text-surface-900':
          props.severity === 'warn' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'bg-warning-500 dark:bg-warning-400':
          props.severity === 'warn' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'border border-warning-500 dark:border-warning-400':
          props.severity === 'warn' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      // Warning Text Button
      {
        'text-warning-500 dark:text-warning-400':
          props.text && props.severity === 'warn' && !props.plain,
      },
      // Warning Outlined Button
      {
        'text-warning-500 border border-warning-200 hover:bg-warning-50':
          props.outlined && props.severity === 'warn' && !props.plain,
      },
      // Warning Link Button
      {
        'text-warning-500 dark:text-warning-400':
          props.link && props.severity === 'warn' && !props.plain,
      },

      // Help Button
      {
        'text-white dark:text-surface-900':
          props.severity === 'help' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'bg-help-500 dark:bg-help-400':
          props.severity === 'help' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'border border-help-500 dark:border-help-400':
          props.severity === 'help' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      // Help Text Button
      {
        'text-help-500 dark:text-help-400':
          props.text && props.severity === 'help' && !props.plain,
      },
      // Help Outlined Button
      {
        'text-help-500 border border-help-200 hover:bg-help-50':
          props.outlined && props.severity === 'help' && !props.plain,
      },
      // Help Link Button
      {
        'text-help-500 dark:text-help-400':
          props.link && props.severity === 'help' && !props.plain,
      },

      // Danger Button
      {
        'text-white dark:text-surface-900':
          props.severity === 'danger' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'bg-danger-500 dark:bg-danger-400':
          props.severity === 'danger' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'border border-danger-500 dark:border-danger-400':
          props.severity === 'danger' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      // Danger Text Button
      {
        'text-danger-500 dark:text-danger-400':
          props.text && props.severity === 'danger' && !props.plain,
      },
      // Danger Outlined Button
      {
        'text-danger-500 border border-danger-200 hover:bg-danger-50':
          props.outlined && props.severity === 'danger' && !props.plain,
      },
      // Danger Link Button
      {
        'text-danger-500 dark:text-danger-400':
          props.link && props.severity === 'danger' && !props.plain,
      },

      // Contrast Button
      {
        'text-white dark:text-surface-900':
          props.severity === 'contrast' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'bg-surface-900 dark:bg-surface-0':
          props.severity === 'contrast' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
        'border border-surface-900 dark:border-surface-0':
          props.severity === 'contrast' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      // Contrast Text Button
      {
        'text-surface-900 dark:text-surface-0 hover:bg-surface-100':
          props.text && props.severity === 'contrast' && !props.plain,
      },
      // Contrast Outlined Button
      {
        'text-surface-900 dark:text-surface-0 border border-surface-300 dark:border-surface-0 hover:bg-surface-100':
          props.outlined && props.severity === 'contrast' && !props.plain,
      },
      // Contrast Link Button
      {
        'text-surface-900 dark:text-surface-0':
          props.link && props.severity === 'contrast' && !props.plain,
      },

      // --- Severity Button States ---
      'focus:outline-none focus:outline-offset-0 focus:ring-1',

      // Link
      { 'focus:ring-primary': props.link, '!px-0': props.link },

      // Plain
      {
        'hover:bg-gray-600 hover:border-gray-600':
          props.plain && !props.outlined && !props.text,
      },
      // Text & Outlined Button
      {
        'hover:bg-surface-50': props.plain && (props.text || props.outlined),
      },

      // Primary
      {
        'hover:bg-primary-emphasis hover:border-primary-emphasis':
          !props.link &&
          props.severity === null &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      { 'focus:ring-primary': props.severity === null },
      // Text & Outlined Button
      {
        'hover:bg-primary-50':
          (props.text || props.outlined) &&
          props.severity === null &&
          !props.plain,
      },

      // Secondary
      {
        'hover:bg-surface-200 dark:hover:bg-surface-600 hover:border-surface-200 dark:hover:border-surface-600':
          props.severity === 'secondary' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link &&
          !props.link,
      },
      {
        'focus:ring-surface-500 dark:focus:ring-surface-400':
          props.severity === 'secondary',
      },
      // Text & Outlined Button
      {
        'hover:bg-surface-50':
          (props.text || props.outlined) &&
          props.severity === 'secondary' &&
          !props.plain,
      },

      // Success
      {
        'hover:bg-success-600 dark:hover:bg-success-300 hover:border-success-600 dark:hover:border-success-300':
          props.severity === 'success' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      {
        'focus:ring-success-500 dark:focus:ring-success-400':
          props.severity === 'success',
      },
      // Text & Outlined Button
      {
        'hover:bg-success-50':
          (props.text || props.outlined) &&
          props.severity === 'success' &&
          !props.plain,
      },

      // Info
      {
        'hover:bg-info-600 dark:hover:bg-info-300 hover:border-info-600 dark:hover:border-info-300':
          props.severity === 'info' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      {
        'focus:ring-info-500 dark:focus:ring-info-400':
          props.severity === 'info',
      },
      // Text & Outlined Button
      {
        'hover:bg-info-50':
          (props.text || props.outlined) &&
          props.severity === 'info' &&
          !props.plain,
      },

      // Warning
      {
        'hover:bg-warning-600 dark:hover:bg-warning-300 hover:border-warning-600 dark:hover:border-warning-300':
          props.severity === 'warn' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      {
        'focus:ring-warning-500 dark:focus:ring-warning-400':
          props.severity === 'warn',
      },
      // Text & Outlined Button
      {
        'hover:bg-warning-50':
          (props.text || props.outlined) &&
          props.severity === 'warn' &&
          !props.plain,
      },

      // Help
      {
        'hover:bg-help-600 dark:hover:bg-help-300 hover:border-help-600 dark:hover:border-help-300':
          props.severity === 'help' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      {
        'focus:ring-help-500 dark:focus:ring-help-400':
          props.severity === 'help',
      },
      // Text & Outlined Button
      {
        'hover:bg-help-50':
          (props.text || props.outlined) &&
          props.severity === 'help' &&
          !props.plain,
      },

      // Danger
      {
        'hover:bg-danger-600 dark:hover:bg-danger-300 hover:border-danger-600 dark:hover:border-danger-300':
          props.severity === 'danger' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      {
        'focus:ring-danger-500 dark:focus:ring-danger-400':
          props.severity === 'danger',
      },
      // Text & Outlined Button
      {
        'hover:bg-danger-50':
          (props.text || props.outlined) &&
          props.severity === 'danger' &&
          !props.plain,
      },

      // Contrast
      {
        'hover:bg-surface-800 dark:hover:bg-surface-100 hover:border-surface-800 dark:hover:border-surface-100':
          props.severity === 'contrast' &&
          !props.text &&
          !props.outlined &&
          !props.plain &&
          !props.link,
      },
      {
        'focus:ring-surface-500 dark:focus:ring-surface-400':
          props.severity === 'contrast',
      },
      // Text & Outlined Button
      {
        'hover:bg-surface-900/10 dark:hover:bg-[rgba(255,255,255,0.03)]':
          (props.text || props.outlined) &&
          props.severity === 'contrast' &&
          !props.plain,
      },

      // Disabled
      { 'opacity-60 pointer-events-none cursor-default': context.disabled },

      // Transitions
      'transition duration-200 ease-in-out',

      // Misc
      'cursor-pointer overflow-hidden select-none',

      // Badge
      '[&>[data-pc-name=badge]]:min-w-4 [&>[data-pc-name=badge]]:h-4 [&>[data-pc-name=badge]]:leading-4',
    ],
  }),
  label: ({ props }) => ({
    class: [
      'duration-200',
      'font-medium',
      {
        'group-hover:underline': props.link,
      },
      {
        'flex-1': props.label !== null && !props.link,
        'invisible w-0': props.label == null,
      },
    ],
  }),
  icon: ({ props }) => ({
    class: [
      'leading-4',
      {
        'text-sm': props.size === 'small',
        'text-xl': props.size === 'large',
      },
      'mx-0',
      {
        // 'mr-2': props.iconPos == 'left' && props.label != null,
        // 'ml-2 order-1': props.iconPos == 'right' && props.label != null,
        'ml-1 order-1': props.iconPos == 'right' && props.label != null,
        'order-2': props.iconPos == 'bottom' && props.label != null,
      },
    ],
  }),
  loadingIcon: ({ props }) => ({
    class: [
      'h-4 w-4',
      'mx-0',
      {
        'mr-2': props.iconPos == 'left' && props.label != null,
        'ml-2 order-1': props.iconPos == 'right' && props.label != null,
        'mb-2': props.iconPos == 'top' && props.label != null,
        'mt-2': props.iconPos == 'bottom' && props.label != null,
      },
      'animate-spin',
    ],
  }),
  badge: ({ props }) => ({
    class: [
      {
        'ml-2 w-4 h-4 leading-none flex items-center justify-center':
          props.badge,
      },
    ],
  }),
};
