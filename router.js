import Vue from 'vue'
import Router from 'vue-router'



//1:引入自定义组件 
import Home from "./components/tabbar/Home.vue"
import Buynow from "./components/products/buynow.vue"


Vue.use(Router)


//2:配置访问自定义组件路径
//   {path访问路径 component  组件名称}
export default new Router({
  routes: [
    { path: '/', redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/buynow", component: Buynow },
  ]
})


