import { createRouter, createWebHashHistory } from 'vue-router';
import Index from './views/Index.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Index },
  ],
});
