<template>
<div id="cesiumContainer" class="tdmap">
  <div class="geometry-toolbar">
    <ul>
      <li v-for="(item, index) in toolbar" :key="index + 1" :title="item.alias" @click.stop="toolHandle(item)"><i :class="item.icon"></i></li>
    </ul>
  </div>
</div>
</template>

<script>
// 参考：https://www.jianshu.com/p/416d432cd83b
import Cesium from 'cesium/Cesium'

export default {
  data () {
    return {
      viewer: null,
      toolbar: [
        {
          name: 'drawPoint',
          alias: '画点',
          type: 'draw',
          icon: 'fa fa-map-marker'
        },
        {
          name: 'drawLineString',
          alias: '画线',
          type: 'draw',
          icon: 'fa fa-map-marker'
        },
        {
          name: 'drawPolygon',
          alias: '画面',
          type: 'draw',
          icon: 'fa fa-map-marker'
        }
      ]
    }
  },
  methods: {
    drawPoint () {
      let _this = this
      // 坐标存储
      let positions = []

      let handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)

      // 单击鼠标左键画点
      handler.setInputAction(function (movement) {
        let cartesian = _this.viewer.scene.camera.pickEllipsoid(movement.position, _this.viewer.scene.globe.ellipsoid)
        positions.push(cartesian)
        _this.viewer.entities.add({
          position: cartesian,
          point: {
            color: Cesium.Color.RED,
            pixelSize: 5,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
          }
        })
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

      // 单击鼠标右键结束画点
      handler.setInputAction(function (movement) {
        handler.destroy()
        _this.drawEndHandle(positions)
        // callback(positions)
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    },
    // 画线
    drawLineString (callback) {
      var _this = this
      let PolyLinePrimitive = (function () {
        function _ (positions) {
          this.options = {
            polyline: {
              show: true,
              positions: [],
              material: Cesium.Color.RED,
              width: 3
            }
          }
          this.positions = positions
          this._init()
        }

        _.prototype._init = function () {
          var _self = this
          var _update = function () {
            return _self.positions
          }
          // 实时更新polyline.positions
          this.options.polyline.positions = new Cesium.CallbackProperty(_update, false)
          _this.viewer.entities.add(this.options)
        }
        return _
      })()

      var handler = new Cesium.ScreenSpaceEventHandler(_this.viewer.scene.canvas)
      var positions = []
      var poly = null
      // 鼠标左键单击画点
      handler.setInputAction(function (movement) {
        var cartesian = _this.viewer.scene.camera.pickEllipsoid(movement.position, _this.viewer.scene.globe.ellipsoid)
        if (positions.length === 0) {
          positions.push(cartesian.clone())
        }
        positions.push(cartesian)
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      // 鼠标移动
      handler.setInputAction(function (movement) {
        var cartesian = _this.viewer.scene.camera.pickEllipsoid(movement.endPosition, _this.viewer.scene.globe.ellipsoid)
        if (positions.length >= 2) {
          if (!Cesium.defined(poly)) {
            poly = new PolyLinePrimitive(positions)
          } else {
            if (cartesian !== undefined) {
              positions.pop()
              cartesian.y += (1 + Math.random())
              positions.push(cartesian)
            }
          }
        }
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
      // 单击鼠标右键结束画线
      handler.setInputAction(function (movement) {
        handler.destroy()
        _this.drawEndHandle(positions)
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    },
    drawEndHandle (positions) {
      debugger
      let wgs84Positions = []
      for (let i = 0; i < positions.length; i++) {
        let wgs84Point = this.Cartesian3_to_WGS84({
          x: positions[i].x,
          y: positions[i].y,
          z: positions[i].z
        })
        wgs84Positions.push(wgs84Point)
      }
    },
    // 笛卡尔坐标系转WGS84坐标系
    Cartesian3_to_WGS84: function (point) {
      var cartesian33 = new Cesium.Cartesian3(point.x, point.y, point.z)
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian33)
      var lat = Cesium.Math.toDegrees(cartographic.latitude)
      var lng = Cesium.Math.toDegrees(cartographic.longitude)
      var alt = cartographic.height
      return { lat: lat, lng: lng, alt: alt }
    },
    drawFactory (type) {
      debugger
      if (this[type]) {
        this[type]()
      }
    },
    toolHandle (tool) {
      if (tool.type === 'draw') {
        this.drawFactory(tool.name)
      }
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
      this.viewer._cesiumWidget._creditContainer.style.display = 'none' // 去掉logo
      let wyoming = this.viewer.entities.add({
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
          height: 200000, // 设置物体离地面高度
          extrudedHeight: 250000, // 会出现一个高度从200000-250000，高度为50000的长方体
          material: Cesium.Color.RED.withAlpha(0.5),
          outLine: true,
          outlineColor: Cesium.Color.BLACK
        }
      })
      wyoming.description = `<img width="50%" style="float:left; margin: 0 1em 1em 0;" src="http://cesiumjs.org/tutorials/Visualizing-Spatial-Data/images/Flag_of_Wyoming.svg"/>`
      this.viewer.flyTo(wyoming)
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
.geometry-toolbar{
  position:absolute;
  float:left;
  top:10px;
  left:20px;
  background-color:#42b983;
  z-index:11111;
}
.geometry-toolbar ul{
  list-style:none;
  padding-right:10px;
}
.geometry-toolbar ul li{
  display:inline-block;
  padding:10px 0px 10px 10px;
  cursor:pointer;
}
.geometry-toolbar ul li:not(:last-child):after{
  content:'|';
  margin-left:10px;
}
</style>
