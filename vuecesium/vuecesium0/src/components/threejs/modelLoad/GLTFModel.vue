<template>
    <div :id="containerId" class="threee-gltf"></div>
</template>

<script>
import * as three from 'three'
import GLTFLoader from 'three/examples/js/loaders/GLTFLoader'
// https://github.com/KhronosGroup/glTF-Sample-Models 2.0模型数据下载github地址
export default {
  name: 'GLTFModel',
  data () {
    return {
      OrbitControls: require('three-orbit-controls')(three),
      // GLTFLoader: require('three/examples/js/loaders/GLTFLoader')(three),
      containerId: 'container',
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      light: null,
      modelPath: '/static/model/CesiumAir/Cesium_Air.gltf' // require('static/model/CesiumAir/Cesium_Air.gltf') // 'http://localhost:5001/models/CesiumAir/Cesium_Air.gltf'
    }
  },
  methods: {
    init () {
      let container = document.getElementById(this.containerId)
      // 声明全局render对象；
      this.renderer = new three.WebGLRenderer({ antialias: true }) // 生成渲染器对象，锯齿效果设置为有效
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      this.camera = new three.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 10) // 设置透视投影
      this.camera.position.z = 0.6 // 设置相机的位置坐标；
      // 设置场景scene, 场景就是一个三维空间。 用Scene类声明一个对象。
      this.scene = new three.Scene()
      this.light = new three.DirectionalLight(0xff0000, 1.0, 0) // 设置平行光源
      this.light.position.set(200, 200, 200) // 设置光源向量
      this.scene.add(this.light)
      // 5.设置物体object
      let geometry = new three.BoxGeometry(0.2, 0.2, 0.2)
      let material = new three.MeshNormalMaterial()
      this.mesh = new three.Mesh(geometry, material)
      this.scene.add(this.mesh)
      container.appendChild(this.renderer.domElement) // 追加canvas元素到canvas3d元素中
      debugger
      let controls = new this.OrbitControls(this.camera, this.renderer.domElement)
      console.log(controls)
      this.loadModel(this.modelPath)
    },
    loadModel (path) {
      debugger
      console.log(GLTFLoader)
      let loader = new GLTFLoader()
      loader.load(path, function (gltf) {
        let gltfObj = gltf.scene
        // gltfObj.scale.set(scale, scale, scale)
        this.scene.add(gltfObj)
      }, function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
      }, function (error) {
        console.error(error, 'load error!')
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style>
  .threee-gltf{
    width: 100vw;
    height: 100vh;
  }
</style>
