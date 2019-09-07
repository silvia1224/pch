<template>
   <div>
     <!-- 轮播区域 -->
     <mt-swipe :auto="4000">
       <mt-swipe-item>
         <img src="../assets/banner02.jpg" alt="">
       </mt-swipe-item>
       <mt-swipe-item>
         <img src="../assets/banner01.png" alt="">
       </mt-swipe-item>
       <mt-swipe-item>
         <img src="../assets/banner03.jpg" alt="">
       </mt-swipe-item>
       <mt-swipe-item>
         <img src="../assets/banner04.jpg" alt="">
       </mt-swipe-item>
     </mt-swipe>
   </div>
</template>
<script>
</script>
<style scoped>
  .mint-swipe{
    height:200px;
    text-align: center;
  }
 img{
    width:100%;height:200px;
  }
</style>