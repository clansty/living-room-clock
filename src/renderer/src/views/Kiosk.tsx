import {defineComponent} from "vue";
import {NLayout, NLayoutContent, NLayoutSider, NMenu} from "naive-ui";
import {RouterLink, RouterView, useRoute} from "vue-router";
import kioskConfig from "../../kioskConfig";

export default defineComponent({
  setup() {
    const route = useRoute();

    return () => <NLayout position="absolute" hasSider>
      <NLayoutSider contentStyle="padding: 10px 5px;" bordered>
        <NMenu
                value={route.name as string}
                options={kioskConfig.map(({name}, index) => ({
                  label: () => (
                          <RouterLink to={index.toString()}>
                            {name}
                          </RouterLink>
                  ),
                  key: index.toString(),
                }))}
        />
      </NLayoutSider>
      <NLayoutContent contentStyle="overflow-x: unset">
        <RouterView/>
      </NLayoutContent>
    </NLayout>;
  }
})
