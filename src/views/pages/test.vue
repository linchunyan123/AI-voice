<!-- <template>
  <div>
      <div>
        <button @click="leastDistance"> 最短距离 </button>
        <button @click="leastTime"> 最短时间 </button>
      </div>
      <baidu-map class="map" style="overflow:auto" center="北京" :zoom="16">
        <bm-driving :start="lushuPoint.start" :end="lushuPoint.end" :auto-viewport="true" :policy="policy" :panel="true" location="北京" :waypoints="['西二旗']">
        </bm-driving>
      </baidu-map>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const policy = ref('');
const lushuPoint = ref({
  start: {
    lng: 116.301934,
    lat: 39.977552
  },
  end: {
    lng: 116.508328,
    lat: 39.919141
  },
});

const leastDistance = () => {
  policy.value = "BMAP_DRIVING_POLICY_LEAST_DISTANCE"
};
const leastTime = () => {
  policy.value = "BMAP_DRIVING_POLICY_LEAST_TIME"
};
</script> -->

<template>
  <div>待开发
    
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>