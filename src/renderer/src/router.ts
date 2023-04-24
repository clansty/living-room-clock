import { createRouter, createWebHashHistory } from 'vue-router';
import Index from './views/Index.vue';
import Kiosk from './views/Kiosk';
import ScreenSaver from './views/ScreenSaver';
import kioskConfig from '../kioskConfig';
import ClansTools from './views/kiosk/ClansTools.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/screensaver', component: ScreenSaver },
    {
      path: '/kiosk', component: Kiosk, children: kioskConfig.map((item, index) => ({
        name: index.toString(),
        path: index.toString(),
        component: item.content,
      })),
    },
  ],
});
