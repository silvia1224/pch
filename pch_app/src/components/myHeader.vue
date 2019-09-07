<template>
<!-- 头部全局组件 -->
  <div class="header">
    <i class="iconfont icon-xiaoyuhao headerBack" @click="back"></i>
  </div>
</template>
<script>
export default {
  methods:{
    back(){
      this.router.go(-1)
      // this.$router.push("")
    }
  }
}
</script>
<style scoped>
  .header{
    position:fiexd;
    top:0px;
    left:0px;
    right:0px;
    background-color:#5ECE9E; 
    height:50px;
    width:100%;
    overflow:hidden;
  }
  .headerBack{
    position:absolute;
    top:12px;
    left:10px;
    color:#fff;
  }
</style>