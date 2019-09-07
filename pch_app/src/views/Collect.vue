<template>
    <!-- Collect.vue收藏夹组件 -->
    <div class="collect" @click="loadMore">
        <div class="selectAll" style="margin: 10px;">
            全选
            <input type="checkbox" @change="selectAll" />
            <mt-button class="clearBtn" size="small" @click="delMitem">清空收藏夹</mt-button>
        </div>
        <!-- 收藏夹信息 -->
        <div class="collect-item" v-for="(item,i) of list" :key="i">
            <div class="leftImgText">
                <input type="checkbox" v-model="item.cb"/>
                <img  :src="'http://127.0.0.1:3000/'+item.img_url">
            </div>
            <div class="rightImgText">
                <div class="textImg">
                    <div class="cname">{{item.cname}}</div>
                    <img :data-cid="item.cid" @click="delItem" :src="require('../assets/collect_s.png')">
                </div>
                <div class="title">{{item.title}}</div>
            </div>    
        </div>   
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
        }
    },
    created(){
        this.loadMore();
    },
    methods:{
        delMitem(){//取消收藏收藏夹中多个食谱
           var str="";
           //创建循环遍历数组获取状态cid值
           for(var item of this.list){
               if(item.cb){//true,当前食谱被选中
                   str+=item.cid+","
               }
           }
           //截取最后逗号之前的内容
           str=str.substring(0,str.length-1);//substring截取字符串
           //判断如果用户没有选中食谱
           if(str.length==0){
               this.$toast("请选中食谱");
               return;//停止执行
           }
           //显示交互提示框，再次请用户确认是否删除
           this.$messagebox.confirm("是否删除数据？").then(res=>{
               var url="delM";
               var obj={cids:str};
               this.axios.get(url,{params:obj}).then(res=>{
                   //取消收藏多个食谱，加载收藏夹列表
                   this.loadMore();
                   //提示用户取消成功
                   this.$toast("取消收藏成功");
               })
           }).catch(err=>{
               return;
           })
        },
        delItem(e){//收藏夹中取消收藏指定食谱
           //获取收藏夹的食谱cid
           var cid=e.target.dataset.cid;
           //console.log(cid);
           //交互提示用户是否取消收藏食谱
           this.$messagebox.confirm("是否删除指定商品")
           .then(res=>{//同意
               var url="del";//请求服务器的地址
               var obj={cid:cid};//请求发送服务器参数
               this.axios.get(url,{params:obj}).then(res=>{
                   if(res.data.code>0){
                       this.$toast("取消收藏");
                   }
                   this.loadMore();
               })
           }).catch(err=>{
               return;
           })
        },
        selectAll(e){//e是事件对象
            var cb=e.target.checked;
           //创建循环遍历收藏夹数组，修改列表cb
           for(var item of this.list){
               item.cb=cb;//商品状态=cb全选按钮状态
           }
        },
        loadMore(){
            //console.log(111);
            //加载收藏夹数据，当组件成功创建后调用
            //发送请求
            var url="collect";
            this.axios.get(url).then(res=>{
                //console.log(res);
                //返回数据
                if(res.data.code==-1){//用户未登录，提示用户登录/跳转登录组件
                   this.$messagebox("消息","请登录").then(res=>{
                       this.$router.push("/Login");
                      return;
                    })
               }else{
                //获取数据
                var list=res.data.data;
                //保存收藏夹数据
                this.list=list;
            }
            })  
        },
    },
     created(){
        this.loadMore();
        //console.log("组件创建成功")
    }
}
</script>
<style scoped>
.collect-item{
   display: flex;
   margin:20px;
}
.leftImgText>img{
    width:120px;height:120px;
    margin-right:10px;
}
.textImg>.cname{
    font-size:18px;
    vertical-align: center;
}
.textImg{
    display:flex;
    margin-top:20px;
    margin-bottom:20px;
    height:30px;
    line-height: 30px;
}
.textImg>img{
    width:30px;
    margin-left:20px;
}
</style>
