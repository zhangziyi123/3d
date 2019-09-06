<template>
<div id='cesiumContainer' class='tdmap'></div>
</template>

<script>
import Cesium from 'cesium/Cesium'
import URL_CONFIG from './basemap'

export default {
  data () {
    return {
      viewer: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.viewer = new Cesium.Viewer('cesiumContainer', {
        selectionIndicator: false,
        animation: false, // 是否显示动画控件
        baseLayerPicker: false, // 是否显示图层选择控件
        geocoder: false, // 是否显示地名查找控件
        timeline: false, // 是否显示时间线控件
        sceneModePicker: true, // 是否显示投影方式控件
        navigationHelpButton: false, // 是否显示帮助信息控件
        infoBox: false, // 是否显示点击要素之后显示的信息
        fullscreenButton: true,
        // 天地图影像服务（经纬度）
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
          url: URL_CONFIG.TDT_VEC_C,
          layer: 'vec',
          style: 'default',
          format: 'tiles',
          tileMatrixSetID: 'c',
          subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
          tilingScheme: new Cesium.GeographicTilingScheme(),
          tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
          // minimumLevel: 6,
          maximumLevel: 18
        })
      })
      // 设置初始位置
      this.viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(118.63854163, 32.04047801, 10000000)
      })

      // 天地图矢量中文标记服务（经纬度）
      var tdtCva = new Cesium.WebMapTileServiceImageryProvider({
        url: URL_CONFIG.TDT_CVA_C,
        layer: 'cva',
        style: 'default',
        format: 'tiles',
        tileMatrixSetID: 'c',
        subdomains: ['t0', 't1', 't2', 't3', 't4', 't5', 't6', 't7'],
        tilingScheme: new Cesium.GeographicTilingScheme(),
        tileMatrixLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
        minimumLevel: 1,
        maximumLevel: 18
      })
      debugger
      var layers = this.viewer.imageryLayers
      layers.addImageryProvider(tdtCva)
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
