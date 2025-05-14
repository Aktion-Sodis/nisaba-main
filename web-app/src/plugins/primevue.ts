import { FilterService } from '@primevue/core/api';
import { Form } from '@primevue/forms';
import { FormField } from '@primevue/forms';
import Accordion from 'primevue/accordion';
import AccordionContent from 'primevue/accordioncontent';
import AccordionHeader from 'primevue/accordionheader';
import AccordionPanel from 'primevue/accordionpanel';
import AutoComplete from 'primevue/autocomplete';
import Avatar from 'primevue/avatar';
import AvatarGroup from 'primevue/avatargroup';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import Breadcrumb from 'primevue/breadcrumb';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Carousel from 'primevue/carousel';
import Checkbox from 'primevue/checkbox';
import Chip from 'primevue/chip';
import Column from 'primevue/column';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import DataTable from 'primevue/datatable';
import DataView from 'primevue/dataview';
import DatePicker from 'primevue/datepicker';
import Dialog from 'primevue/dialog';
import Divider from 'primevue/divider';
import Drawer from 'primevue/drawer';
import FileUpload from 'primevue/fileupload';
import FloatLabel from 'primevue/floatlabel';
import Galleria from 'primevue/galleria';
import IconField from 'primevue/iconfield';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputIcon from 'primevue/inputicon';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Knob from 'primevue/knob';
import Listbox from 'primevue/listbox';
import Menu from 'primevue/menu';
import MenuBar from 'primevue/menubar';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import OverlayBadge from 'primevue/overlaybadge';
import Panel from 'primevue/panel';
import Password from 'primevue/password';
import Popover from 'primevue/popover';
import ProgressBar from 'primevue/progressbar';
import ProgressSpinner from 'primevue/progressspinner';
import RadioButton from 'primevue/radiobutton';
import Rating from 'primevue/rating';
import Ripple from 'primevue/ripple';
import ScrollPanel from 'primevue/scrollpanel';
import ScrollTop from 'primevue/scrolltop';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import Skeleton from 'primevue/skeleton';
import Slider from 'primevue/slider';
import StyleClass from 'primevue/styleclass';
import Tab from 'primevue/tab';
import TabList from 'primevue/tablist';
import TabMenu from 'primevue/tabmenu';
import TabPanel from 'primevue/tabpanel';
import TabPanels from 'primevue/tabpanels';
import Tabs from 'primevue/tabs';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import ToggleButton from 'primevue/togglebutton';
import ToggleSwitch from 'primevue/toggleswitch';
import Tooltip from 'primevue/tooltip';
import TreeTable from 'primevue/treetable';
import { App } from 'vue';

import Sodis from '@/theme';

export default {
  install(app: App) {
    app.use(PrimeVue, {
      unstyled: true,
      pt: Sodis,
    });

    // Register all PrimeVue components
    app.component('InputGroup', InputGroup);
    app.component('InputGroupAddon', InputGroupAddon);
    app.component('Accordion', Accordion);
    app.component('AccordionPanel', AccordionPanel);
    app.component('AccordionHeader', AccordionHeader);
    app.component('AccordionContent', AccordionContent);
    app.component('Avatar', Avatar);
    app.component('AvatarGroup', AvatarGroup);
    app.component('AutoComplete', AutoComplete);
    app.component('Badge', Badge);
    app.component('Breadcrumb', Breadcrumb);
    app.component('Button', Button);
    app.component('Card', Card);
    app.component('Carousel', Carousel);
    app.component('Checkbox', Checkbox);
    app.component('Chip', Chip);
    app.component('Column', Column);
    app.component('DatePicker', DatePicker);
    app.component('DataTable', DataTable);
    app.component('TreeTable', TreeTable);
    app.component('DataView', DataView);
    app.component('Dialog', Dialog);
    app.component('Divider', Divider);
    app.component('FileUpload', FileUpload);
    app.component('FloatLabel', FloatLabel);
    app.component('Galleria', Galleria);
    app.component('InputMask', InputMask);
    app.component('InputNumber', InputNumber);
    app.component('InputText', InputText);
    app.component('InputSwitch', InputSwitch);
    app.component('IconField', IconField);
    app.component('InputIcon', InputIcon);
    app.component('Knob', Knob);
    app.component('Menu', Menu);
    app.component('MenuBar', MenuBar);
    app.component('Message', Message);
    app.component('MultiSelect', MultiSelect);
    app.component('OverlayBadge', OverlayBadge);
    app.component('Password', Password);
    app.component('Panel', Panel);
    app.component('Popover', Popover);
    app.component('ProgressBar', ProgressBar);
    app.component('ProgressSpinner', ProgressSpinner);
    app.component('RadioButton', RadioButton);
    app.component('Rating', Rating);
    app.component('Drawer', Drawer);
    app.component('ScrollTop', ScrollTop);
    app.component('Select', Select);
    app.component('Slider', Slider);
    app.component('SelectButton', SelectButton);
    app.component('ScrollPanel', ScrollPanel);
    app.component('Skeleton', Skeleton);
    app.component('Tab', Tab);
    app.component('Tabs', Tabs);
    app.component('TabList', TabList);
    app.component('TabMenu', TabMenu);
    app.component('TabPanel', TabPanel);
    app.component('TabPanels', TabPanels);
    app.component('Tag', Tag);
    app.component('Textarea', Textarea);
    app.component('ToggleButton', ToggleButton);
    app.component('ToggleSwitch', ToggleSwitch);
    app.component('Toast', Toast);
    app.component('Form', Form);
    app.component('FormField', FormField);
    app.component('Listbox', Listbox);
    // Directives
    app.directive('badge', BadgeDirective);
    app.directive('tooltip', Tooltip);
    app.directive('ripple', Ripple);
    app.directive('styleclass', StyleClass);

    // Services
    app.use(ToastService);
    app.config.globalProperties.$toast.add({ life: 3000 });
    app.use(ConfirmationService);

    // PrimeVue Filter Service for DataTable
    FilterService.register('filterByArrayLikes', (arr, value) => {
      if (!value) {
        return true;
      }

      // Ensure `arr` is a valid array
      return (
        Array.isArray(arr) &&
        arr.some((item) => {
          // If `item` is an object, match a specific property (e.g., `label`, `name`, `displayName`) using a partial match
          if (typeof item === 'object' && item !== null) {
            if ('name' in item && typeof item.name === 'string') {
              return item.name?.toLowerCase().includes(value.toLowerCase());
            } else if (
              'displayName' in item &&
              typeof item.displayName === 'string'
            ) {
              return item.displayName
                ?.toLowerCase()
                .includes(value.toLowerCase());
            } else if ('label' in item && typeof item.label === 'string') {
              return item.label?.toLowerCase().includes(value.toLowerCase());
            }
            return false;
          }
          // For primitive types, check if the string includes the filter value
          return String(item).toLowerCase().includes(value.toLowerCase());
        })
      );
    });

    FilterService.register('filterByObjectLikes', (obj, value) => {
      if (!value) {
        return true; // If no filter value is provided, include all items
      }

      if (typeof obj === 'object' && obj !== null) {
        return Object.values(obj).some((item) => {
          if (
            item &&
            typeof item === 'object' &&
            'name' in item &&
            typeof item.name === 'string'
          ) {
            return item.name.toLowerCase().includes(value.toLowerCase());
          } else if (
            item &&
            typeof item === 'object' &&
            'displayName' in item &&
            typeof item.displayName === 'string'
          ) {
            return item.displayName.toLowerCase().includes(value.toLowerCase());
          } else if (
            item &&
            typeof item === 'object' &&
            'label' in item &&
            typeof item.label === 'string'
          ) {
            return item.label.toLowerCase().includes(value.toLowerCase());
          } else if (typeof item === 'string') {
            // If `item` is a string, check if it matches the filter value
            return item.toLowerCase().includes(value.toLowerCase());
          }
          return false; // Skip non-string, non-object items
        });
      }

      return false; // If `obj` is not a valid object, return false
    });
  },
};
