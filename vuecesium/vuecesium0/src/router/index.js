import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const demo1 = () => import('../components/demo1.vue')
const Terrain = () => import('../components/specialEffects/Terrain.vue')
const tdtZJ = () => import('../components/xy/Tdt_zj.vue')
const XYPicker = () => import('../components/xy/XYPicker.vue')
const Mapbox3 = () => import('../components/mapbox/3mapbox.vue')
const Entity = () => import('../components/entity/Entity.vue')
const Geometry = () => import('../components/geometry/Geometry.vue')

// threejs
const ThreeJsPage = () => import('../components/threejs/ThreePage') // threejs首页
const Demo1 = () => import('../components/threejs/base/demo1') // first demo
const Demo2 = () => import('../components/threejs/base/demo2') // second demo
const GLTFLoadPage = () => import('../components/threejs/modelLoad/GLTFModel') // 加载gltf三维模型
export default new Router({
  history: true,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/demo',
      name: 'demo-1',
      component: demo1
    },
    {
      path: '/tdt',
      name: 'tdt',
      component: tdtZJ
    },
    {
      path: '/xypick',
      name: 'xypick',
      component: XYPicker
    },
    {
      path: '/terrain',
      name: 'terrain',
      component: Terrain
    },
    {
      path: '/mapbox',
      name: 'mapbox-3',
      component: Mapbox3
    },
    {
      path: '/entity',
      name: 'entity',
      component: Entity
    },
    {
      path: '/geometry',
      name: 'geometry',
      component: Geometry
    },
    {
      name: 'three',
      path: '/three',
      component: ThreeJsPage,
      children: [
        {
          name: 'demo1',
          path: 'demo1',
          component: Demo1
        },
        {
          name: 'demo2',
          path: 'demo2',
          component: Demo2
        },
        {
          name: 'gltf',
          path: 'gltf',
          component: GLTFLoadPage
        }
      ]
    }
  ]
})
