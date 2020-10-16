import { createApp } from 'vue';
import {
  Button, Layout, Menu, Form, Dropdown, Input, message,
} from 'ant-design-vue';

import router from '@/router';
import store from '@/resources/store';
import App from './App.vue';

import 'ant-design-vue/dist/antd.css';

const app = createApp(App);
app.use(router)
  .use(store)
  .use(Button)
  .use(Layout)
  .use(Menu)
  .use(Form)
  .use(Dropdown)
  .use(Input);

app.config.globalProperties.$message = message;

app.mount('#app');
