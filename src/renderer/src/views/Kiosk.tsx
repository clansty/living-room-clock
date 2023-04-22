import {defineComponent} from "vue";
import {NLayout, NLayoutContent, NLayoutSider, NMenu} from "naive-ui";
import {RouterLink, RouterView, useRoute} from "vue-router";

export default defineComponent({
  setup() {
    const menuOptions = {
      hass: 'Home Assistant',
      uptime: 'Uptime Kuma',
      uptimeGrafana: 'Uptime Kuma Grafana',
      clanstools: 'ClansTools',
      smokeping: 'SmokePing',
      pve: "Clansty's PVE",
      host: "Host Status",
    }
    const route = useRoute();

    return () => <NLayout position="absolute" hasSider>
      <NLayoutSider contentStyle="padding: 10px 5px;" bordered>
        <NMenu
                value={route.name as string}
                options={Object.entries(menuOptions).map(([path, name]) => ({
                  label: () => (
                          <RouterLink to={path}>
                            {() => name}
                          </RouterLink>
                  ),
                  key: path,
                }))}
        />
      </NLayoutSider>
      <NLayoutContent contentStyle="overflow-x: unset">
        <RouterView/>
      </NLayoutContent>
    </NLayout>;
  }
})
