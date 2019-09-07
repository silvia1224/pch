<template>
    <div class="mine">
        <!--我的组件-->
        <div class="tou">
            <span>个人中心</span>
        </div>
        <div class="header" v-show="res.uid">
             <img src="../assets/icon_账号.png" alt="">   
             <span class="logtex">欢迎 {{res.uname}}</span>
             <span @click="loutu" class="tuic">退出登录</span>
             <!-- <router-link class="logtex" :to="`/login`" @click="ll">登录 / </router-link> -->
        </div>
        <div class="header" v-show="!res.uid">
            <img src="../assets/icon_账号 (1).png" alt="">
            <router-link class="logtex" :to="`/login`">登录 / </router-link>
            <router-link class="logtex" :to="`/Reg`">注册</router-link>
        </div>
        <ul class="list" style="margin-top:20px;border-radius:10px;">
            <li v-for="(item,i) of items" :key="i" @click="jup(item.path)">
                <img :src="item.url" alt="">
                <span class="txt" v-text="item.text" ></span>
                <span class="txt2" v-text="item.im"></span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            res:{
                uid:sessionStorage.getItem('uid'),
                uname:sessionStorage.getItem('uname'),
            },
                
                // uid:sessionStorage.getItem('uid')
               items:[
                   {
                       url:require("../assets/意见.png"),
                       text:"意见反馈",
                       im:">",
                       path:"/"
                   },
                    {
                       url:require("../assets/4_1版权案件管理.png"),
                       text:"关于我们",
                       im:">",
                       path:"/About"
                   },
                    {
                       url:require("../assets/icon_设置.png"),
                       text:"协议管理",
                       im:">",
                       path:"/"
                   },
               ]
            }
        },
     
    methods: {
        jup(i){
            // console.log(i);
            this.$router.push(i)
        },
        loutu(){
                sessionStorage.removeItem('uanme');
                sessionStorage.removeItem('uid');
                sessionStorage.clear()
                window.history.go(0)
                // window.location.reload()
                console.log("退出登录成功")
        },
    //     mlog(){
    //         var url="/Mine/login";
    //         this.axios.get(url).then(res=>{
    //             if(res.data.code==-1){
    //                 console.log("请登录")
                    
    //             }else{
                    
    //                 console.log("登录成功",sessionStorage.getItem('uname'))
    //                 console.log("登录成功",sessionStorage.getItem('uid'))

    //                 // this.$store.commit("Uid",res.data.data2)
    //                 // console.log("登录成功",res.data.data[0])
    //                 // this.uname=res.data.data[0].uname
    //             }
    //         })
    //     }
    },
    created() {
        // this.mlog();
    },
}
</script>
<style scoped>
    .mine{
        background: #eeeeee;
        height:52rem;
    }
     .mine .header{
        position:relative;
        width: 90%;
        background-color: #fff;
        /* color: #000; */
        /* line-height: 80px; */
        margin: auto;
        text-align: center;
        border-radius:10px;
        margin-top:-45px;
        padding: 20px 10px;
        height: 80px;
    }
    .mine .header img{
        /* width: 30px; */
        height: 40px;
        /* vertical-align:baseline; */
        position: absolute;
       left:15%;
    }
   .mine .header .logtex{
        color: #000;
        font-size: 18px;
        text-decoration: none;
        line-height:40px;
    }
    .mine .tou{
        /* display:flex; */
        /* align-items:center; */
        background:#7bb0f5;
        height:100px;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
    }
    .mine ul{
        list-style:none;
        background-color: #fff;
        /* margin-top:0; */
        /* text-align: center; */
        position: relative;
    }
    .mine ul li{
        padding: 20px;
        line-height:30px;
    }
    .mine ul li~li{
        padding-top:0 ;
    }
    .mine ul li img{
        height: 30px;
        position: absolute;
        left: 18.2%;
    }
    .mine ul li .txt{
        margin-left:35%;
        color:#000;
        font-size: 18px;
        height: 30px;
    }
    .mine ul li::after{
        content: "";
        border:0.5px solid #dfdeded0;
        display:block;
        width:66%;
        right:0;
        position: absolute;

        height:0px;
        /* margin-left: 0px; */
        /* margin-right:100px; */
    }
    .mine ul li .txt2{
        position: absolute;
        right:5%;
        font-size: 18px;
        color: #dfdeded0;
    }
    .header .tuic{
        font-size: 16px;
        position: absolute;
        top:32%;
        right: 5%;
        border: 1px solid #e0dede;
        padding:2px;
        border-radius:5px;
        background: #dfdddd;
    }
   
</style>

