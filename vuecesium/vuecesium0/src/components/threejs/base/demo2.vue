<template>
<div class="threee-demo2">
  <div id="demo2-container" class="demo2-container"></div>
</div>
</template>

<script>
import * as three from 'three'
/* import { OrbitControls } from 'three-orbit-controls' */
export default {
  name: 'demo1',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      light: null
    }
  },
  methods: {
    // 执行后没出来效果？？？？？
    init () {
      // 声明全局render对象；
      let container = document.getElementById('demo2-container')
      this.renderer = new three.WebGLRenderer({ antialias: true }) // 生成渲染器对象，锯齿效果设置为有效
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(this.renderer.domElement) // 追加canvas元素到canvas3d元素中
      // this.renderer.setClearColor(0xFFFFFF, 1.0) // 设置canvas背景色
      // 设置摄像机camera
      /* 三维空间中的物体投影到二维空间的方式中，存在透视投影和正投影两种相机透视投影就是、从视点开始越近的物体越大、
      远处的物体绘制的较小的一种方式、和日常生活中我们看物体的方式是一致的。 正投影就是不管物体和视点距离，都按照统一的大小进行绘制、
      在建筑和设计等领域需要从各个角度来绘制物体，因此这种投影被广泛应用。在Three.js也能够指定透视投影和正投影两种方式的相机。 本文按照以下的步骤设置透视投影方式。 */
      this.camera = new three.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 10) // 设置透视投影
      // this.camera.position.x = 0
      // this.camera.position.y = 50
      // this.camera.position.z = 100
      this.camera.position.z = 0.6 // 设置相机的位置坐标；
      // this.camera.up.x = 0
      // this.camera.up.y = 1
      // this.camera.up.z = 0
      // this.camera.lookAt({ x: 0, y: 0, z: 0 }) // 设置视野的中心坐标 ？？？？设置后无法看到图形
      this.camera.lookAt(0, 0, 0) // 正确传参
      // 设置场景scene, 场景就是一个三维空间。 用Scene类声明一个对象。
      this.scene = new three.Scene()
      /* OpenGL（WebGL）的三维空间中，存在点光源和聚光灯两种类型。 而且，作为点光源的一种特例还存在平行光源(无线远光源)。
      另外，作为光源的参数还可以进行 [环境光] 等设置。 作为对应， Three.js中可以设置 [点光源(Point Light)] [聚光灯(Spot Light)] [平行光源(Direction Light)]，
      和 [环境光(Ambient Light)]。 和OpenGL一样、在一个场景中可以设置多个光源。 基本上，都是环境光和其他几种光源进行组合。
      如果不设置环境光，那么光线照射不到的面会变得过于黑暗。 本文中首先按照下面的步骤设置平行光源，在这之后还会追加环境光。 */
      console.dir(three)
      // color - (可选参数) 16进制表示光的颜色。 缺省值为 0xffffff (白色)。
      // intensity - (可选参数) 光照的强度。缺省值为1。
      this.light = new three.DirectionalLight(0xff0000, 1.0) // 设置平行光源, DirectionalLight( color : Integer, intensity : Float )
      this.light.position.set(200, 200, 200) // 设置光源向量
      this.scene.add(this.light)
      // 5.设置物体object
      // let geometry = new three.BoxGeometry(0.2, 0.2, 0.2)
      // let material = new three.MeshNormalMaterial()
      // this.mesh = new three.Mesh(geometry, material)
      let LambertMaterial = new three.MeshLambertMaterial()
      // LambertMaterial.color = new three.Color('#44bd32') // 貌似设置会影响其反光率
      this.mesh = new three.Mesh(new three.SphereGeometry(0.2, 6), LambertMaterial) // 材质设定
      this.scene.add(this.mesh)
      this.mesh.position.set(0, 0, 0)
      this.renderer.clear()
      this.renderer.render(this.scene, this.camera)
    },

    animate () {
      requestAnimationFrame(this.animate)
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.01
      this.renderer.render(this.scene, this.camera)
    }
  },

  mounted () {
    this.init()
  }
}
</script>

<style>
.threee-demo2{
  width: 1600px;
  height: 800px;
}
.threee-demo2 .demo2-container{
  border:none;
  cursor:move;
  width:1400px;
  height:600px;
  background-color:#EEEEEE;
}
</style>
