<template>
   <div class="cbkList-app">
    <!--组件:CookbookList.vue
        食谱列表
        指定访问路径 /CookbookList-->
       <!-- 循环渲染食谱列表 -->
       <div v-for="(item,i) of list" :key="i" class="cbk-item">
           <img :src="'http://127.0.0.1:3000/'+item.img_url">
            <span>{{item.cname}}</span>
            <mt-button @click="addCollect" :data-lid="item.lid" :data-cname="item.cname" :data-title="item.title" :data-img_url="item.img_url" class="btn" size="small">收藏</mt-button>  
       </div>
       <div class="cbk-btn">
           <!-- 看收藏夹按钮 -->
           <mt-button type="danger" @click="jumpCollect">查看收藏夹</mt-button>
           <!-- 加载更多按钮 -->
           <mt-button type="primary" @click="loadMore">加载更多</mt-button>
        </div>
      
   </div> 
</template>
<script>
export default {
    data(){
        return{
            list:[],//食谱列表数组
            pno:0,//页码
        }
    },
    methods: {
        jumpCollect(){//功能：查看收藏夹
            //跳转到收藏夹组件
            this.$router.push("/collect");
        },
        addCollect(e){//功能：将食谱添加收藏夹
            console.log(123)
            console.log(e);
            console.log(e.target.dataset)
            var lid=e.target.dataset.lid;
            var t=e.target.dataset.title;
            var c=e.target.dataset.cname;
            var i=e.target.dataset.img_url;
            //console.log(lid+":"+c+":"+t+":"+i);
            //发送ajax请求
            var url="addCollect";//请求服务地址
            var obj={lid:lid,cname:c,title:t,img_url:i};//请求参数
            //获取返回结果
            this.axios.get(url,{params:obj}).then(res=>{
                //如果返回结果是-1，提示用户先登录
                if(res.data.code==-1){
                    this.$toast("请先登录");
                }else{
                //否则返回结果是1，提示用户添加成功
                    this.$toast("添加收藏夹成功");
                    
                }
            })
        },
        loadMore(){//功能获取商品分页的数据
            var url="CookbookList";//发送请求
            this.pno++;//当前页面加1
            var obj={pno:this.pno};//创建参数对象
            //发送请求获取当前页内容
            this.axios.get(url,{params:obj}).then(res=>{
               //获取服务器返回结果
               //console.log(res.data.data);
               //将返回结果保存
               //this.list=res.data.data;
               //拼接多页的内容
              var rows=this.list.concat(res.data.data);
              //将结果赋值给list
               this.list=rows;
            })
        }
    },
    created(){
        this.loadMore();
        //console.log("组件创建成功")
    }
}
</script>
<style scoped>
/* 1.最外层样式 */
.cbkList-app{
    display: flex; /*指定当前元素弹性布局*/
    flex-wrap: wrap;/*指定子元素换行*/
    justify-content: space-between;
    padding:4px;/*最外层内边距*/
}
/* 2.修饰商品样式 */
.cbk-item{
    width:49%;/*指定商品元素的宽度*/
    /*商品外灰色边框*/
    border:1px solid #ccc;
    border-radius:5px;/*指定元素的圆角*/
    margin:2px 0;
    padding:2px;
    box-sizing: border-box;/*重新计算宽度*/
    display: flex;
    flex-direction: column;
    min-height: 200px;/*最小高度*/
}
.cbk-item>.cbk-title{
    margin-top:20px;
    display: flex;
}
.cbk-item>span{
    display: inline-block;
    text-align: center;
    height:41px;
    line-height: 41px;
    font-size:18px;
    margin-right:20px;
    margin-left:5px;
}
.cbk-item>.cbk-title>.btn{
    padding:0;margin:0;
    margin-top:5px;
}
.cbk-item>.cbk-title>.btn>img{
    width:25px;
    padding-bottom:10px;
}
.cbk-btn{
    margin-top:10px;
}

/* 3.修饰商品中图片样式 */
.cbkList-app>.cbk-item img{
    width:100%;
}
</style>