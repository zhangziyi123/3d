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
      wyoming.description = `<img width="50%" style="float:left; margin: 0 1em 1em 0;" src="http://cesiumjs.org/tutorials/Visualizing-Spatial-Data/images/Flag_of_Wyoming.svg"/>
     <p>Wyoming is a state in the mountain region of the Western United States.</p>
     <p>
    Wyoming is the 10th most extensive, but the least populous
    and the second least densely populated of the 50 United
    States. The western two thirds of the state is covered mostly
    with the mountain ranges and rangelands in the foothills of
    the eastern Rocky Mountains, while the eastern third of the
    state is high elevation prairie known as the High Plains.
    Cheyenne is the capital and the most populous city in Wyoming,
    with a population estimate of 62,448 in 2013.\
  </p>
  <p>Source: <a style='color: WHITE' target="_blank" href="http://en.wikipedia.org/wiki/Wyoming">Wikpedia</a></p>`

      // var heading = Cesium.Math.toRadians(90) // 相机会从东方向下倾斜30°角去看怀俄明的多边形
      // var pitch = Cesium.Math.toRadians(-30)
      // this.viewer.zoomTo(wyoming, new Cesium.HeadingPitchRange(heading, pitch))
      // this.viewer.flyTo(wyoming) // zoomTo 和flyTo 都是异步函数 缩放完成后需要制定的代码放到 then函数里 if (result) {.....
      var citizensBankPark = this.viewer.entities.add({
        name: 'Citizens Bank Park',
        position: Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
        point: {
          pixelSize: 5,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2
        },
        label: {
          text: 'Citizens Bank Park',
          font: '14pt monospace',
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          // outlineWidth: 2,
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          pixelOffset: new Cesium.Cartesian2(0, -9)
        }
      })
      this.viewer.flyTo(citizensBankPark)

      // 设置相机参数
      /* let point = Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534, 15000.0)
      this.viewer.camera.setView({
        destination: point,
        orientation: {
          heading: Cesium.Math.toRadians(0.0), // 默认值, Heading是当前方向 由北向东旋转的角度。
          pitch: Cesium.Math.toRadians(-90.0), // 默认值, Pitch 是方向和水平平面的夹角。Pitch为正 表示方向向量指向水平平面上方，反之表示方向向量指向平面下方。
          roll: 0.0 // 默认值, roll是方向向量以正东方向为轴的旋转角度。
        }
      }) */
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
