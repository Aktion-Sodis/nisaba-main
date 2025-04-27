import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import vue from 'eslint-plugin-vue';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import parser from 'vue-eslint-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/.eslintrc.cjs',
      '**/dist',
      '**/node_modules',
      '**/public',
      '**/vite.config.js',
      'index.html',
      'src/graphql/**',
      'src/models/**',
      'src/theme/**',
      'amplify/**',
      'src/amplifyconfiguration.json',
      'src/aws-exports.js',
      'scripts/**',
      'vue.config.js',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended' // Ensures Prettier formatting
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      vue,
      prettier,
      import: importPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
        Plotly: 'readonly',
      },

      parser: parser,
      ecmaVersion: 2020,
      sourceType: 'module',

      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: [
          '.vue',
          '.js',
          '.ts',
          '.tsx',
          '.jsx',
          '.html',
          '.md',
        ],
      },
    },

    rules: {
      'vue/component-name-in-template-casing': [
        'error',
        'kebab-case',
        {
          ignores: [
            // Form Components
            'AutoComplete',
            'CascadeSelect',
            'Checkbox',
            'ColorPicker',
            'DatePicker',
            'FloatLabel',
            'IconField',
            'InputIcon',
            'IftaLabel',
            'InputGroup',
            'InputMask',
            'InputNumber',
            'InputOtp',
            'InputText',
            'Knob',
            'Listbox',
            'MultiSelect',
            'Password',
            'RadioButton',
            'Rating',
            'Select',
            'SelectButton',
            'Slider',
            'TextArea',
            'ToggleButton',
            'ToggleSwitch',
            'TreeSelect',
            // Button Components
            'Button',
            'SpeedDial',
            'SplitButton',
            // Data Components
            'DataTable',
            'Column',
            'ColumnGroup',
            'Row',
            'DataView',
            'OrderList',
            'OrganizationChart',
            'Paginator',
            'PickList',
            'Timeline',
            'Tree',
            'TreeTable',
            'VirtualScroller',
            // Panel Components
            'Accordion',
            'AccordionPanel',
            'AccordionHeader',
            'AccordionContent',
            'Card',
            'DefferedContent',
            'Divider',
            'Fieldset',
            'Panel',
            'ScrollPanel',
            'Splitter',
            'SplitterPanel',
            'Stepper',
            'StepList',
            'StepPanels',
            'StepItem',
            'Step',
            'StepPanel',
            'Tabs',
            'TabList',
            'Tab',
            'TabPanels',
            'TabPanel',
            'Toolbar',
            // File
            'FileUpload',
            // Menu
            'Breadcrumb',
            'ContextMenu',
            'Dock',
            'Menu',
            'Menubar',
            'MegaMenu',
            'PanelMenu',
            'TieredMenu',
            // Overlay
            'ConfirmDialog',
            'ComfirmPopup',
            'Dialog',
            'DynamicDialog',
            'Drawer',
            'Popover',
            'Tooltip',
            // Messages
            'Message',
            'Toast',
            // Media
            'Carousel',
            'Galleria',
            'Image',
            'ImageCompare',
            // Misc
            'Avatar',
            'AvatarGroup',
            'Badge',
            'OverlayBadge',
            'BlockUI',
            'Chip',
            'Inplace',
            'MeterGroup',
            'ProgressBar',
            'ProgressSpinner',
            'Ripple',
            'ScrollTop',
            'Skeleton',
            'Tag',
            'Terminal',
            // Vee-Validate
            'Form',
            'Field',
            'ErrorMessage',
          ],
        },
      ],
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',

      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      indent: 'off', // Prettier handles indentation
      semi: ['warn', 'always'],
      'vue/require-v-for-key': 'off',
      'vue/no-mutating-props': 'off',
      'vue/no-v-html': 'off',
      'vue/no-use-v-if-with-v-for': 'off',
      'vue/max-attributes-per-line': 'off',
      'no-mixed-spaces-and-tabs': 'off',
      'no-constant-binary-expression': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',

      // Import order rule
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'], // Built-in and external packages first
            'internal', // Internal imports
            ['parent', 'sibling'], // Relative imports next
            'index', // Index imports last
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // Ensure Prettier rules are applied as ESLint errors
      'prettier/prettier': 'error',
    },
  },
];
