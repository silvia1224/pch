<template>
   <div class="page-tabbar">
      <div class="page-wrap">
      <!--Home.vue-->
      <!--Home.vue 入口全局组件-->
      <!--3:切换面板列表-->
      <mt-tab-container class="page-tabbar-container" v-model="active">
        <mt-tab-container-item id="shouye">
          <search></search>
          <carousel></carousel>
        </mt-tab-container-item>
        <mt-tab-container-item id="contact">
         <cookbookList>
         </cookbookList>
        </mt-tab-container-item>
         <mt-tab-container-item id="mine">
         <mine>
         </mine>
        </mt-tab-container-item>
        <mt-tab-container-item id="collect">
         <collect>
         </collect>
        </mt-tab-container-item>
      </mt-tab-container>
      <!--4:tabbar列表-->
      <!--为每个按钮绑定点击事件-->
      <!--当前按钮isSelect:true-->
      <!--其它按钮isSelect:false-->
      <mt-tabbar v-model="active" fixed>
        <mt-tab-item id="shouye" @click.native="changeState(0)">
         <tabbaricon        
          :selectedImage="require('../assets/shouye_s.png')"
          :normalImage="require('../assets/shouye.png')"
          :focused="currentIndex[0].isSelect">
         </tabbaricon>
         首页  
        </mt-tab-item>
        <mt-tab-item id="contact" @click.native="changeState(1)">
         <tabbaricon
          :selectedImage="require('../assets/shipu_s.png')"    
          :normalImage="require('../assets/shipu.png')"
         :focused="currentIndex[1].isSelect">
         </tabbaricon>
         食谱大全
        </mt-tab-item>
        <mt-tab-item id="collect" @click.native="changeState(2)">
          <tabbaricon
          :selectedImage="require('../assets/yundong_s.png')"
          :normalImage="require('../assets/yundong.png')"
          :focused="currentIndex[2].isSelect">
          </tabbaricon>
          收藏夹
        </mt-tab-item>
        <mt-tab-item id="mine" @click.native="changeState(3)">
          <tabbaricon
           :selectedImage="require('../assets/wode_s.png')"
          :normalImage="require('../assets/wode.png')"
           :focused="currentIndex[3].isSelect"
          ></tabbaricon>
          个人中心
        </mt-tab-item>
      </mt-tabbar>
   </div>
   </div>
</template>
<script>
import Collect from "./Collect.vue"
import mine from "./Mine.vue"
import CookbookList from "./CookbookList.vue"
import TabBarIcon from "../components/TabBarIcon.vue"
import carousel from "../components/carousel.vue"
import search from "../components/search.vue"
export default {
  data(){
    return {
      //面板中显示子组件id
      active:"cookbookList",
      //创建数组保存图片焦点状态
      currentIndex:[
        {isSelect:true},
        {isSelect:false},
        {isSelect:false},
        {isSelect:false}
      ]
    }
  },
  methods: {
    mysearch(){console.log("搜索");},
    myadd(){console.log("+")},
    changeState(n){
      //函数功能:将当前参数下标
      //对应数组值修改true其它修改false
      //1:创建循环,循环数组中内容
      for(var i=0;i<this.currentIndex.length;i++){
       //2:判断如果循环下标与n相等 20
       if(n==i){
        //3:当前下标元素true 10:22
        this.currentIndex[i].isSelect=true;
       }else{
        //4:其它元素修改false
        this.currentIndex[i].isSelect=false;
       }
       
      }

    }
  },
  components:{
      "mine":mine,
    "cookbookList":CookbookList,
    "tabbaricon":TabBarIcon,
    "collect":Collect,
    "carousel":carousel,
    "search":search
  }
}
</script>
<style  scoped>
/*最外层父元素Home.vue*/
.page-tabbar{
  overflow: hidden;/*溢出隐藏*/
}
/*修改 tabbar 默认文字颜色*/
.mint-tabbar>.mint-tab-item{
  color:#999999;
}
/*修改默认tab选中文字样式*/
.mint-tabbar>.mint-tab-item.is-selected{
  background-color: transparent;
  color:#45c018;
}

.page-wrap{
  overflow:auto;/*溢出显示轮动条*/
  padding-bottom: 60px;
}
</style>