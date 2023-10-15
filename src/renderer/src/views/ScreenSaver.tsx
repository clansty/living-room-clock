import {Component, ComponentPublicInstance, computed, defineComponent, effect, onMounted, ref, watch} from "vue";
import {useNow} from "@vueuse/core";
import {NSpace, NTime} from "naive-ui";
import _ from 'lodash'
import DryerIcon from '../assets/icons/dryer.svg'
import mqtt from 'mqtt'
import sound from '../assets/qwq.wav'
import connectedIcon from '../assets/icons/On.png';
import disconnectedIcon from '../assets/icons/Warrning.png';
import {ipcRenderer} from 'electron'

export default defineComponent({
  setup() {
    const now = useNow();
    const dryerState = ref<{ timer: number }>({timer: 0})
    const opacity = computed(() => now.value.getSeconds() >= 57 ? 0 : 1)
    const timeRef = ref<ComponentPublicInstance>()
    const position = (ref({
      top: 0,
      left: 0
    }))
    const connected = ref(false)
    const randPosition = () => {
      console.log('randPosition')
      if (!timeRef.value) {
        console.log('no timeRef')
        return
      }
      const width = window.innerWidth - timeRef.value.$el.getBoundingClientRect().width
      const height = window.innerHeight - timeRef.value.$el.getBoundingClientRect().height
      console.log(height, width)
      position.value.top = _.random(0, height)
      position.value.left = _.random(0, width)
      console.log(position.value)
    }

    const playAudio = async () => {
      const audio = new Audio(sound)
      audio.volume = 0.2;
      await audio.play()
    }

    const mqttClient = mqtt.connect("ws://172.16.0.77:1884", {
      clean: true,
      connectTimeout: 4000,
      username: "mqtt",
      password: "mqtt",
      reconnectPeriod: 1000,
    })
    mqttClient.once('connect', () => {
      mqttClient.subscribe(['dryertimer/status', 'zigbee2mqtt/0xa4c1385783dd5105/action', 'doorbellTest/action'])
    })
    mqttClient.on("connect", () => {
      connected.value = true
    })
    mqttClient.on("reconnect", () => {
      connected.value = true
    })
    mqttClient.on("disconnect", () => {
      connected.value = false
    })
    mqttClient.on('message', (message, payload) => {
      switch (message) {
        case 'dryertimer/status':
          dryerState.value = JSON.parse(payload.toString()) as { timer: number }
          break;
        case 'zigbee2mqtt/0xa4c1385783dd5105/action':
        case 'doorbellTest/action':
          playAudio()
          break;
      }
    })
    const dryerTimeLeft = computed(() => {
      if (dryerState.value.timer === 0 || dryerState.value.timer <= now.value.getTime()) return 0;
      return dryerState.value.timer - now.value.getTime()
    })

    watch([() => now.value.getMinutes()], () => randPosition())
    onMounted(() => randPosition())

    const hideScreenSaver = () => {
      ipcRenderer.send('hideScreenSaver')
    }

    return () => <div style={{
      height: '100vh',
      width: '100%',
      background: 'black',
      fontFamily: 'STHeiti, 华文细黑, 华文黑体, "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", MingLiu, sans-serif',
      fontSize: '2em'
    }}
                      onClick={hideScreenSaver}
    >
      <img src={connected.value ? connectedIcon : disconnectedIcon}
           style={{
             position: 'fixed',
             top: '20px',
             right: '20px'
           }}
      />
      <Time style={{
        opacity: opacity.value,
        position: 'absolute',
        top: position.value.top + 'px',
        left: position.value.left + 'px'
      }}
            ref={timeRef}
            dryerTimeLeft={dryerTimeLeft.value}
      />
    </div>
  }
})

const Time = defineComponent({
  props: {
    dryerTimeLeft: Number
  },
  setup(props) {
    const now = useNow();

    return () => <div style={{color: '#cccccc', transition: 'opacity 3s', display: 'inline-block'}}>
      <div style="font-size: 4.5em; line-height: 1.2">
        <NTime time={now.value} format="H:mm"/>
      </div>
      {!!props.dryerTimeLeft &&
              <NSpace style={{fontSize: '1.5em'}} justify="center" align="center">
                <DryerIcon/>
                <NTime time={props.dryerTimeLeft} format="H:mm:ss" timeZone="UTC" style={{marginBottom: '-.1em'}}/>
              </NSpace>}
    </div>
  }
})
