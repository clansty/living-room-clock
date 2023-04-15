import { createRouter, createWebHashHistory } from 'vue-router';
import Index from './views/Index.vue';
import Kiosk from './views/Kiosk';
import Hass from './views/kiosk/Hass.vue';
import Uptime from './views/kiosk/Uptime.vue';
import ClansTools from './views/kiosk/ClansTools.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Index },
    {
      path: '/kiosk', component: Kiosk, children: [
        { path: 'hass', component: Hass, name: 'hass' },
        { path: 'uptime', component: Uptime, name: 'uptime' },
        { path: 'clanstools', component: ClansTools, name: 'clanstools' },
      ],
    },
  ],
});
