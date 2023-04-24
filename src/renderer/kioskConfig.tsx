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
  {name: 'Clansty\'s PVE', content: webview('http://172.22.0.1:3000/d/Dp7Cd57Zza/proxmox?orgId=1&refresh=10s&kiosk&var-instance=pve.c5y.moe')},
  {name: 'Clansty\'s PVE Host', content: webview('http://172.22.0.1:3000/d/hPGhf0aVz/host-stats?orgId=1&refresh=10s&kiosk&var-instance=172.22.3.3:9100')},
  {name: 'RainbowBird\'s PVE', content: webview('http://172.22.0.1:3000/d/Dp7Cd57Zza/proxmox?orgId=1&refresh=10s&kiosk&var-instance=nc-pve.c5y.moe')},
  {name: 'RainbowBird\'s PVE Host', content: webview('http://172.22.0.1:3000/d/hPGhf0aVz/host-stats?orgId=1&refresh=10s&kiosk&var-instance=172.16.1.5:9100')},
  {name: 'Clansty\'s Router', content: webview('http://172.22.0.1:3000/d/hPGhf0aVz/host-stats?orgId=1&refresh=10s&kiosk&var-instance=172.22.3.4:9100')},
  {name: 'Estela\'s Router', content: webview('http://172.22.0.1:3000/d/hPGhf0aVz/host-stats?orgId=1&refresh=10s&kiosk&var-instance=172.22.0.1:9100')},
  {name: 'Estela\'s W510', content: webview('http://172.22.0.1:3000/d/hPGhf0aVz/host-stats?orgId=1&refresh=10s&kiosk&var-instance=172.22.2.1:9100')},
  {name: 'Kiosk Status', content: webview('http://172.22.0.1:3000/d/hPGhf0aVz/host-stats?orgId=1&refresh=10s&kiosk&var-instance=11.11.1.42:9100')},
  {name: '', content: webview('http://172.22.0.1/video.webm')},
]
