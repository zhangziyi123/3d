// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../node_modules/cesium/Build/Cesium/Widgets/widgets.css'
import Cesium from 'cesium/Cesium'
import 'font-awesome/css/font-awesome.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.use(ElementUI)
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYjc5ZjU3MC1hOWE1LTRlMDMtYmM3Mi0wZjUzNjMxMGU2NjUiLCJpZCI6MTEwOTAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTgwNzMwMzR9.abQeypzQwO147hDvhJ7bb4wO-Tvmn89d03KjrwnOC00'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
