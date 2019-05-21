<template>
<div id="cesiumContainer" class="tdmap"></div>
</template>

<script>
import Cesium from 'cesium/Cesium'

export default {
  data () {
    return {
      viewer: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false, // 是否显示动画控件(左下方那个)
        baseLayerPicker: true, // 是否显示图层选择控件
        geocoder: true, // 是否显示地名查找控件
        timeline: true, // 是否显示时间线控件
        projectionPicker: true,
        sceneModePicker: true, // 是否显示投影方式控件
        navigationHelpButton: false, // 是否显示帮助信息控件
        infoBox: true // 是否显示点击要素之后显示的信息
      })
      debugger
      let layer = new Cesium.MapboxImageryProvider({
        mapId: 'mapbox.dark',
        accessToken: 'pk.eyJ1Ijoic2hhZmFrZSIsImEiOiJjajR0YWVjcGEwMG03MnFwMmpoNmp6cTV5In0.SlARU085R1d1ns5JxmLOUw'
      })
      this.viewer.imageryLayers.addImageryProvider(layer)
    })
  }
}
</script>

<style>
.tdmap{
  height:100vh;
  width:100%;
  background-color:deepskyblue;
}
</style>
