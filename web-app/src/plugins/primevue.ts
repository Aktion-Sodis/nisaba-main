// src/plugins/primevue.ts
import { App } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Message from 'primevue/message';
import Card from 'primevue/card';
import { Form } from '@primevue/forms';
import { FormField } from '@primevue/forms';

export default {
  install(app: App) {
    app.component('Button', Button);
    app.component('InputText', InputText);
    app.component('Password', Password);
    app.component('Message', Message);
    app.component('Card', Card);
    app.component('Form', Form);
    app.component('FormField', FormField);

  },
};