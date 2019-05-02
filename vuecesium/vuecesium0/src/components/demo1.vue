<template>
  <div id="cesiumContainer" class="tdmap"></div>
</template>

<script>
import Cesium from 'cesium/Cesium'
export default {
  data () {
    return {
      map: null,
      Cesium: require('../../node_modules/cesium/Source/Cesium.js')
    }
  },
  mounted () {
    this.$nextTick(() => {
      debugger
      this.map = new Cesium.Viewer('cesiumContainer')
    })
  }
}
</script>

<style>
  .tdmap{
    height: 100vh;
    width: 100%;
    background-color:deepskyblue;
  }
</style>
