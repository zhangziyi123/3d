import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const demo1 = () => import('../components/demo1.vue')
const Terrain = () => import('../components/specialEffects/Terrain.vue')
const tdtZJ = () => import('../components/xy/Tdt_zj.vue')
const XYPicker = () => import('../components/xy/XYPicker.vue')

export default new Router({
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
    }
  ]
})
