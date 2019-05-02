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
      debugger
      this.viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false, // 是否显示动画控件(左下方那个)
        baseLayerPicker: true, // 是否显示图层选择控件
        geocoder: true, // 是否显示地名查找控件
        timeline: true, // 是否显示时间线控件
        sceneModePicker: true, // 是否显示投影方式控件
        navigationHelpButton: false, // 是否显示帮助信息控件
        infoBox: true, // 是否显示点击要素之后显示的信息
        imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
          url: 'http://t0.tianditu.gov.cn/vec_w/wmts?tk=1ebef01c272359809b59d1ef1641d3dd',
          layer: 'vec',
          style: 'default',
          format: 'tiles',
          tileMatrixSetID: 'w',
          show: false
        })
      })

      this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: 'http://t0.tianditu.com/cva_w/wmts?tk=1ebef01c272359809b59d1ef1641d3dd',
        layer: 'cva',
        style: 'default',
        format: 'tiles',
        tileMatrixSetID: 'w',
        show: false
      }))
      /* let wyoming = this.viewer.entities.add({
        name: 'Wyoming',
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArray([
            -109.080842, 45.002073,
            -105.91517, 45.002073,
            -104.058488, 44.996596,
            -104.053011, 43.002989,
            -104.053011, 41.003906,
            -105.728954, 40.998429,
            -107.919731, 41.003906,
            -109.04798, 40.998429,
            -111.047063, 40.998429,
            -111.047063, 42.000709,
            -111.047063, 44.476286,
            -111.05254, 45.002073
          ]),
          height: 0,
          material: Cesium.Color.RED.withAlpha(0.5),
          outLine: true,
          outlineColor: Cesium.Color.BLACK
        }
      })
      this.viewer.zoomTo(wyoming) */
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
