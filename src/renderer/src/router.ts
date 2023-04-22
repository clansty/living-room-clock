import { createRouter, createWebHashHistory } from 'vue-router';
import Index from './views/Index.vue';
import Kiosk from './views/Kiosk';
import Hass from './views/kiosk/Hass.vue';
import Uptime from './views/kiosk/Uptime.vue';
import ClansTools from './views/kiosk/ClansTools.vue';
import ScreenSaver from './views/ScreenSaver';
import SmokePing from './views/kiosk/SmokePing.vue';
import PVEStatus from './views/kiosk/PVEStatus.vue';
import HostStatus from './views/kiosk/HostStatus.vue';
import UptimeGrafana from './views/kiosk/UptimeGrafana.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Index },
    { path: '/screensaver', component: ScreenSaver },
    {
      path: '/kiosk', component: Kiosk, children: [
        { path: 'hass', component: Hass, name: 'hass' },
        { path: 'uptime', component: Uptime, name: 'uptime' },
        { path: 'clanstools', component: ClansTools, name: 'clanstools' },
        { path: 'smokeping', component: SmokePing, name: 'smokeping' },
        { path: 'pve', component: PVEStatus, name: 'pve' },
        { path: 'host', component: HostStatus, name: 'host' },
        { path: 'uptimeGrafana', component: UptimeGrafana, name: 'uptimeGrafana' },
      ],
    },
  ],
});
