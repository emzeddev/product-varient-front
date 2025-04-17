// plugins/toast.js
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
  install: (app) => {
    // اضافه کردن toast به app global properties
    app.config.globalProperties.$toast = toast;
  }
};
