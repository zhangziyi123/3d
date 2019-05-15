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
        sceneModePicker: true, // 是否显示投影方式控件
        navigationHelpButton: false, // 是否显示帮助信息控件
        infoBox: true // 是否显示点击要素之后显示的信息
      })
      let { viewer } = this
      let handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
      handler.setInputAction(function (movement) {
        var windowPosition = viewer.camera.getPickRay(movement.position)
        debugger
        var cartesianCoordinates = viewer.scene.globe.pick(windowPosition, viewer.scene)
        var cartoCoordinates = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesianCoordinates)
        // var cartesian2 = viewer.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid)
        // var carto2 = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian2)
        alert(Cesium.Math.toDegrees(cartoCoordinates.longitude) + ',' + Cesium.Math.toDegrees(cartoCoordinates.latitude) + ',' + Cesium.Math.toDegrees(cartoCoordinates.height))
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
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
