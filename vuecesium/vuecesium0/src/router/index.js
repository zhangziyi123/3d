import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const demo1 = () => import('../components/demo1.vue')
const Terrain = () => import('../components/specialEffects/Terrain.vue')

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
      path: '/terrain',
      name: 'terrain',
      component: Terrain
    }
  ]
})
