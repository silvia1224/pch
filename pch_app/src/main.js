import Vue from 'vue'
import App from './App.vue'
import router from './router'
import myHeader from './components/myHeader.vue'


//引入第三方组件库 mint ui
//1:完整引入mint-ui组件库中所有组件
import MintUI from "mint-ui"
//2:单独引入mint-ui组件库中样式文件
import "mint-ui/lib/style.css"
//3:将mint-ui注册vue实例中
Vue.use(MintUI)

//引入轮播图组件
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//引入搜索组件
import { Search } from 'mint-ui';
Vue.component(Search.name, Search);

import "./components/font/iconfont.css"

//注册全局组件
Vue.component("myHeader",myHeader)

//引入axios第三方模块
import axios from 'axios'
//配置axios基础路径
axios.defaults.baseURL="http://127.0.0.1:3000/"
//配置axios保存session信息
axios.defaults.withCredentials=true;
//将axios注册vue实例中
Vue.prototype.axios=axios

//引入vuex第三方模块
import Vuex from "vuex"
//注册Vuex ，先注册再创建实例对象
Vue.use(Vuex)
/*var store=new Vuex.Store({
  state:{cartCount:0},//共享数据
  mutations:{         //添加修改数据函数
      increment(state){ //购物车数量加1
        state.cartCount++;
      },
      clear(state){    //清空购物车
        state.cartCount=0; //购物车数量清0
      }
  },
  getters:{
    getCartCount(state){
      return state.cartCount;
    }
  },//添加获取数据函数
  actions:{}//添加异步操作数据函数
})
*/



Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  //store
}).$mount('#app')//http://127.0.0.1:3000
