import Vue from 'vue'
import Router from 'vue-router'

//在router.js中引入组件
import Home from "./views/Home.vue"
import CookbookList from "./views/CookbookList.vue"
import Collect from "./views/Collect.vue"
import NotFound from './views/NotFound'
import search from './components/search.vue'

import Login from "./views/Login.vue"
import Reg from "./views/Reg.vue"

import Mine from "./views/Mine.vue"
import About from "./views/About.vue"
import TabBarIcon from './components/TabBarIcon'

import carousel from "./components/carousel.vue"

Vue.use(Router)
export default new Router({
  routes: [
    //组件访问路径
     {path:'/',component:Home},
     {path:'/CookbookList',component:CookbookList},
     {path:'/Collect',component:Collect},
     {path:'/carousel',component:carousel},
     {path:'/search',component:search},
     {path:'/Reg',component:Reg},
     {path:'/Login',component:Login},
     {path:'/Mine',component:Mine},
     {path:'/About', component:About},
     {path:'/TabBarIcon', component:TabBarIcon},
     {path:'*', component:NotFound}//其他组件必须在此之前添加
      
  ]
})
