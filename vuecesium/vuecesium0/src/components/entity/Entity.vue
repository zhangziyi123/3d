<template>
<div>
  <div class="gis-entity-right">
    <ul>
      <li v-for="(item, index) in entities" :key="index + 1" @click.stop="createEntityHandle(item)">
        <a>{{ item.alias }}</a>
      </li>
    </ul>
  </div>
  <div id="cesiumContainer" style="width: 100vw;height: 100vh;"></div>
</div>
</template>

<script>
import Cesium from 'cesium/Cesium'
export default {
  data () {
    return {
      viewer: null,
      scene: null,
      modelPath: 'http://localhost/cesiummodels/',
      entities: [
        {
          name: 'test1',
          alias: '实体1',
          image: ''
        },
        {
          name: 'test2',
          alias: '实体2',
          image: ''
        },
        {
          name: 'test3',
          alias: '实体3',
          image: ''
        }
      ]
    }
  },
  methods: {
    initEvent () {
      let _this = this
      this.scene = this.viewer.scene
      let handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas)
      handler.setInputAction(function (event) {
        let earthPosition = _this.viewer.camera.pickEllipsoid(event.position, _this.viewer.scene.globe.ellipsoid)
        if (Cesium.defined(earthPosition)) {
          console.log(earthPosition)
          // createPoint(earthPosition); //在点击位置添加一个点
          if (_this.model) {
            _this.changeModelPosition(earthPosition, _this.model)
          }
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    },
    changeModelPosition (position, model) {
      // 更改坐标与方位
      let hpRoll = new Cesium.HeadingPitchRoll()
      let fixedFrameTransforms = Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west')
      Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransforms, model.modelMatrix)
    },
    createEntityHandle (entityOption) {
      let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(Cesium.Cartesian3.fromDegrees(-75.62898254394531, 40.02804946899414, 0))
      let modelTimestamp = new Date().getTime()
      this.model = this.scene.primitives.add(Cesium.Model.fromGltf({
        id: modelTimestamp,
        url: this.modelPath + 'CesiumAir/Cesium_Air.gltf',
        modelMatrix: modelMatrix,
        minimumPixelSize: 512,
        maximumScale: 200000
      }))
      this.viewer.flyTo(this.model)
    }
  },
  mounted () {
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
    this.initEvent()
  }
}
</script>

<style>
.gis-entity-right{
  position:absolute;
  float:right;
  right:0px;
  width:200px;
  height:100vh;
  background-color:dodgerblue;
  z-index:11111;
}
.gis-entity-right ul{
  list-style:none;
}
.gis-entity-right ul li{
  height:100px;
  cursor:pointer;
}
</style>
