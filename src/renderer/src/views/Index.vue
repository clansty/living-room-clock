<script setup lang="ts">
import { ref } from 'vue';
import { QWeather24h, QWeather7d, QWeatherH5 } from '../types/QWeather';
import { useIntervalFn, useNow } from '@vueuse/core';

const PUBLIC_KEY = '0b23abc522ab4c15804ace26ef307466';
const QWEATHER_H5API = new URL('https://widget-api.heweather.net/s6/plugin/h5');
const QWEATHER_24HAPI = new URL('https://devapi.qweather.com/v7/weather/24h');
const QWEATHER_7DAPI = new URL('https://devapi.qweather.com/v7/weather/7d');

const dataH5 = ref<QWeatherH5>();
const data24h = ref<QWeather24h>();
const data7d = ref<QWeather7d>();
const now = useNow();

const config = {
  city: 'CN101190405',
  key: 'a4e073584ad243789d2fb59005a31e36'
};

// 更新天气数据
const fetchWeatherApi = async (url: URL, key: string) => {
  url.searchParams.set('key', key);
  url.searchParams.set('location', config.city);
  const res = await fetch(url.toString());
  return await res.json();
};
const updateWeather = async () => {
  // h5api
  dataH5.value = await fetchWeatherApi(QWEATHER_H5API, PUBLIC_KEY);
  // 24h api 需要密钥
  data24h.value = await fetchWeatherApi(QWEATHER_24HAPI, config.key);
  data7d.value = await fetchWeatherApi(QWEATHER_7DAPI, config.key);
};
useIntervalFn(updateWeather, 1000 * 60 * 5, { immediateCallback: true });

</script>

<template>
  <div class="container">
    <n-grid cols="2" x-gap="16">
      <n-gi>
        <div style="font-size: 4.5em; line-height: 1.4">
          <n-time :time="now" format="H:mm"/>
        </div>
        <div style="font-size: 1.5em; margin-bottom: 0.5em">
          <n-time :time="now" format="yyyy 年 M 月 d 日"/>
        </div>
        <div style="display: flex; margin-bottom: 1em" v-if="dataH5">
          <Realtime :now="dataH5.now"/>
          <Props :now="dataH5.now" :air="dataH5.air_now_city"/>
        </div>
      </n-gi>
      <n-gi style="display: flex; flex-direction: column; justify-content: center">
        <RainWarning :text="dataH5.rain.txt" v-if="dataH5" style="margin-bottom: 1em"/>
        <Week :data="data7d.daily" v-if="data7d" style="font-size: 1.05em"/>
      </n-gi>
    </n-grid>
    <Hourly :data="data24h.hourly" v-if="data24h"/>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin-top: -0.35em;
  color: #000;
  font-size: 3vw;
  line-height: 1.8;
  padding: 1em;
  font-family: STHeiti, 华文细黑, 华文黑体, "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", MingLiu, sans-serif;
}
</style>
