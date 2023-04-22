import {defineComponent} from "vue";
import ClansTools from "./src/views/kiosk/ClansTools.vue";
import Webview from "./src/components/WebView1.vue";

const webview = (url: string) => defineComponent({
  render: () => <Webview src={url}/>
})

export default [
  {name: 'ClansTools', content: ClansTools},
  {name: 'Home Assistant', content: webview('http://172.16.0.77:8123/')},
  {name: 'Uptime Kuma', content: webview('https://status.c5y.moe/status/meclab')},
  {name: 'Uptime Kuma Grafana', content: webview('http://172.22.0.1:3000/d/CN8E-vZ7k/uptime-kuma?orgId=1&refresh=10s&kiosk')},
  {name: 'SmokePing', content: webview('http://172.22.0.1:3000/d/CN8E-vZ7k/uptime-kuma?orgId=1&refresh=10s&kiosk')},
  {name: 'Clansty\'s PVE', content: webview('http://172.22.0.1:3000/d/Dp7Cd57Zza/proxmox?orgId=1&refresh=10s&kiosk')},
  {name: 'Host Status', content: webview('http://172.22.0.1:3000/d/hPGhf0aVz/host-stats?orgId=1&refresh=10s&kiosk')},
]
