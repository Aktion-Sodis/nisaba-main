export default {
  root: {
    class: [
      'block relative',

      // Base Label Appearance
      '[&>*:last-child]:text-surface-500 dark:[&>*:last-child]:text-white/80',
      '[&>*:last-child]:absolute',
      '[&>*:last-child]:left-3',
      '[&>*:last-child]:pointer-events-none',
      '[&>*:last-child]:transition-all',
      '[&>*:last-child]:duration-200',
      '[&>*:last-child]:ease',

      // Base Label Appearance (Password, IconField, InputMask)
      '[&_div:has(>input)+label]:!text-lg',
      '[&_div:has(>input)+label]:!text-surface-500 dark:[&_div:has(>input)+label]:!text-white/80',
      '[&_div:has(>input)+label]:!absolute',
      '[&_div:has(>input)+label]:!pointer-events-none',
      '[&_div:has(>input)+label]:!transition-all',
      '[&_div:has(>input)+label]:!duration-200',
      '[&_div:has(>input)+label]:!ease',

      // Base Label Position (Password, IconField, InputMask)
      '[&_div:has(>input):not(:has(>span))+label]:!left-3',
      '[&_div:has(>span+input)+label]:!left-9',
      '[&_div:has(>input+span)+label]:!right-9',
      '[&_div:has(>input[type="password"]):has(>span)+label]:!left-3',

      // Base Label Position (AutoComplete)
      '[&_div:has(>div>input)+label]:!left-9',

      // Base Label Position (MultiSelect)
      '[&_div[data-pc-name="multiselect"]+label]:!left-3',

      // Position for all labels except those following textarea (Password, IconField, InputMask)
      '[&_div:has(>input)+label]:!top-1/2 [&_div:has(>input)+label]:!-translate-y-1/2',

      // Position for all labels except those following textarea
      '[&>:not(textarea)~label]:top-1/2 [&>:not(textarea)~label]:-translate-y-1/2',

      // Position for labels following textareas
      '[&>textarea~label]:top-2.5',

      // Focus Label Position
      '[&>input~label]:has-[:focus]:-top-3',
      '[&>textarea~label]:has-[:focus]:-top-5',

      // Focus Label Position (Password, IconField, InputMask)
      '[&_div:has(>input:focus)+label]:!-top-3 [&_div:has(>input:focus)+label]:!left-3',

      // Focus Label Position (AutoComplete)
      '[&_div:has(>div>input:focus)+label]:!-top-3 [&_div:has(>div>input:focus)+label]:!left-3',

      // Focus Label Appearance
      '[&>*:last-child]:has-[:focus]:text-sm',
      '[&>*:last-child]:has-[:focus]:z-10',
      // '[&>*:last-child]:has-[:focus]:text-surface-700',

      // Focus Label Appearance (Password, IconField, InputMask)
      '[&_div:has(>input:focus)+label]:!text-sm',
      '[&_div:has(>input:focus)+label]:!z-10',

      // Focus Label (Select)
      '[&_div:has(>span[aria-label])+label]:!-top-3',
      '[&_div:has(>span[aria-label])+label]:!text-sm',
      '[&_div:has(>span[aria-expanded="true"])+label]:!-top-3',
      '[&_div:has(>span[aria-expanded="true"])+label]:!text-sm',

      // Focus Label (MultiSelect)
      '[&_div:has(>div>input[aria-expanded="true"])+label]:!-top-3',
      '[&_div:has(>div>input[aria-expanded="true"])+label]:!text-sm',

      // Focus Label (DatePicker)
      '[&_span:has(>input[aria-expanded="true"])+label]:!-top-3',
      '[&_span:has(>input[aria-expanded="true"])+label]:!text-sm',

      // Filled Input Label Appearance
      '[&>*:last-child]:has-[.filled]:-top-3',
      '[&>*:last-child]:has-[>textarea.filled]:-top-5',
      '[&>*:last-child]:has-[.filled]:text-sm',
      '[&>*:last-child]:has-[.filled]:z-10',
      '[&>*:last-child]:has-[.filled]:text-surface-700',

      // Filled Input Label Appearance (Password, IconField, InputMask)
      '[&_div:has(>input.filled):has(>span)+label]:!left-3',
      '[&_div:has(>input.filled)+label]:!-top-3',
      '[&_div:has(>input.filled)+label]:!text-sm',
      '[&_div:has(>input.filled)+label]:!text-surface-700',

      // Filled Input Label Appearance (AutoComplete)
      '[&_div:has(>div>input.filled)+label]:!left-3',
      '[&_div:has(>div>input.filled)+label]:!-top-3',

      // Invalid Input Label Appearance
      '[&_input[aria-invalid="true"]~label]:text-danger-400',

      // Invalid Textarea Label Appearance
      '[&_textarea[aria-invalid="true"]~label]:text-danger-400',

      // Invalid Input Label Appearance (Password, IconField, InputMask)
      '[&_div:has(>input[aria-invalid="true"]):has(>span)+label]:!text-danger-400',

      // Invalid Input Label Appearance (AutoComplete)
      '[&_div:has(>div>input[aria-invalid="true"])+label]:!text-danger-400',

      // Invalid Input Label Appearance (Select)
      '[&_div.border-danger+label]:!text-danger-400',

      '[&_span:has(>input.border-danger)+label]:!text-danger-400',
    ],
  },
};
