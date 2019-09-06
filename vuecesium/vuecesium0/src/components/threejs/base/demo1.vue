<template>
    <div class="threee-demo1">
      <div id="demo1-container" class="demo1-container"></div>
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
    /* 1. 设置threejs渲染器
    *2.设置摄像机camera
    *3.设置场景scene
    *4.设置光源light
    *5.设置物体object
    *
    * */
    init () {
      let container = document.getElementById('demo1-container')
      // 声明全局render对象；
      this.renderer = new three.WebGLRenderer({ antialias: true }) // 生成渲染器对象，锯齿效果设置为有效
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      // 设置摄像机camera
      /* 三维空间中的物体投影到二维空间的方式中，存在透视投影和正投影两种相机透视投影就是、从视点开始越近的物体越大、
      远处的物体绘制的较小的一种方式、和日常生活中我们看物体的方式是一致的。 正投影就是不管物体和视点距离，都按照统一的大小进行绘制、
      在建筑和设计等领域需要从各个角度来绘制物体，因此这种投影被广泛应用。在Three.js也能够指定透视投影和正投影两种方式的相机。 本文按照以下的步骤设置透视投影方式。 */
      this.camera = new three.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 10) // 设置透视投影
      this.camera.position.z = 0.6 // 设置相机的位置坐标；
      // 设置场景scene, 场景就是一个三维空间。 用Scene类声明一个对象。
      this.scene = new three.Scene()
      /* OpenGL（WebGL）的三维空间中，存在点光源和聚光灯两种类型。 而且，作为点光源的一种特例还存在平行光源(无线远光源)。
      另外，作为光源的参数还可以进行 [环境光] 等设置。 作为对应， Three.js中可以设置 [点光源(Point Light)] [聚光灯(Spot Light)] [平行光源(Direction Light)]，
      和 [环境光(Ambient Light)]。 和OpenGL一样、在一个场景中可以设置多个光源。 基本上，都是环境光和其他几种光源进行组合。
      如果不设置环境光，那么光线照射不到的面会变得过于黑暗。 本文中首先按照下面的步骤设置平行光源，在这之后还会追加环境光。 */
      this.light = new three.DirectionalLight(0xff0000, 1.0, 0) // 设置平行光源
      this.light.position.set(200, 200, 200) // 设置光源向量
      this.scene.add(this.light)
      // 5.设置物体object
      let geometry = new three.BoxGeometry(0.2, 0.2, 0.2)
      let material = new three.MeshNormalMaterial()
      this.mesh = new three.Mesh(geometry, material)
      this.scene.add(this.mesh)

      container.appendChild(this.renderer.domElement) // 追加canvas元素到canvas3d元素中
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
    this.animate()
  }
}
</script>

<style>
  .threee-demo1{
    width: 400px;
    height: 400px;
  }
  .threee-demo1 .demo1-container{
    height: 400px;
  }
</style>
