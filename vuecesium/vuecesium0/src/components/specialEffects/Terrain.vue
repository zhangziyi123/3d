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
        infoBox: true // 是否显示点击要素之后显示的信息
      })
      let zhumulanma = this.viewer.entities.add({
        name: '珠穆朗玛峰',
        position: Cesium.Cartesian3.fromDegrees(87.118378, 27.750233),
        point: {
          pixelSize: 5,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2
        }
      })
      this.viewer.flyTo(zhumulanma)

      // 默认，全球是 WGS84 标准球。 添加下面代码 (在这一行之后 var viewer = ...)，即可把Cesium ion上发布的全球地形数据加入到场景中:
      // this.viewer.terrainProvider = Cesium.createWorldTerrain()

      // 开启地形光照和水面效果
      // Cesium全球地形也包含了地形光照数据，以及水面效果需要的海岸线数据。默认地形服务器不会传递包含这两个额外数据的切片。我们可以在 CesiumTerrainProvider的构造函数配置一下。
      // 开启地形光照，需要VertexNormals扩展。
      // 水面效果也是同样的方法。我们请求WaterMask扩展。
      let terrainProvider = Cesium.createWorldTerrain({
        requestVertexNormals: true,
        requestWaterMask: true
      })
      this.viewer.terrainProvider = terrainProvider
      this.viewer.scene.globe.enableLighting = true
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
