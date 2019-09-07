<!-- login:登录页面组件 -->
<template>
  <div>
    <div class="container">
      <!-- 使用子组件：头部样式 -->
      <my-header>用户登陆</my-header>

      <div class="logo">
        <i class="iconfont icon-meishi"></i>
      </div>
      <!-- 登录界面说明 -->
      <div class="login">
        <p>您好，</p>
        <p>欢迎来到PCH私人厨房</p>
        <!-- 手机号码 -->
        <mt-field label="账号:" :placeholder="unameholder" v-model="uname"></mt-field>
        <!-- 登录密码-->
        <mt-field label="密码:" type="password" :placeholder="upwdholder" v-model="upwd"></mt-field>
        <!-- 登陆按钮 -->
        <mt-button class="Btn" size="large" @click="login">登&nbsp;&nbsp;&nbsp;陆</mt-button>
        <h3>没有账号？<span @click="toReg" style="color:#1F7952">立即注册</span></h3>
      </div>
      <!-- 其他注册方式 -->
      <div class="wechat">
        <p>其他登录方式...</p>
        <i class="iconfont icon-weixin"></i>
        <i class="iconfont icon-weibo"></i>
        <i class="iconfont icon-icon qq"></i>
      </div>
    </div>
  </div>
</template>
<script>
  // 1.引入myHeader组件
  import myHeader from "../components/myHeader.vue";
export default {
  components:{
    "my-header":myHeader
  },
  data() {
        return {
            unameholder:"请输入用户名", //用户名提示
            upwdholder:"请输入密码", //用户密码提示
            uname:"silvia",//用户输入用户名
            upwd:"123456" //用户输入密码
        }
    },
    methods:{
        login(){
            //功能？：完成用户登录操作
            //1.获取用户输入用户名
            var u=this.uname;
            //2.获取用户输入密码
            var p=this.upwd;
            //console.log(u+"_"+p);
            //3.创建正则表达式验证用户名和密码
            var reg=/^[0-9a-z]{3,12}$/i;
                //3~12 字母数字
            //4.如果验证失败，提示短消息
            if(!reg.test(u)){
                 this.$toast("用户名格式不正确");
                 return;//失败停止执行
            }
            //5.密码验证失败 提示短消息
            if(!reg.test(p)){
                 this.$toast("密码格式不正确");
                 return;//失败停止执行
            }
            //6.发送ajax 请求axios？
            var url="login";
            var obj={uname:u,upwd:p};
            this.axios.get(url,{params:obj}).then(res=>{
            //获取服务器返回结果
               console.log(res);
               //7.1登录失败 提示
               if(res.data.code==-1){
                   this.$toast("用户名或密码有误")
               }else{
               //7.2 登录成功 跳转到商品首页组件
               //vue中一个组件 
                   sessionStorage.setItem('uname', this.uname);
                   sessionStorage.setItem('uid',res.data.uid);
                   this.$router.push("/");
               }
            });
        }
    }
}
</script>

<style scoped>
  /* PCHlogo图标 */
  .logo{
    padding:40px 0 30px 0;
    text-align:center;
  }
  .logo>i{
    font-size:8rem;
    color:#1f8358;
    display:inline-block;
  }
  /* 登录主体内容 */
  .login p{
    font-family:"Arial Black";
    font-size:2rem;
    margin-left:1.2rem;
  }
  .login p+p{
    margin-bottom:2rem;
  }
  .login>>>input{
    border-bottom:1px solid #eee;
  }
  .login>>>.mint-field-core{
    font-family:Arial;
    font-size:14px;
  }
  .Btn{
    width:90%;
    margin:0 auto;
    margin-top:40px;
    background-color:#5ECE9E;
    color:#fff;
  }
  .login>h3{
    text-align:center;
    margin-top:15px;
  }
  /* 其他登录方式 */
  .wechat{
    text-align:center;
    color:81D842;
    padding-top:40px;
  }
  .wechat i{
    margin-left:45px;
    border:1px solid #eee;
    border-radius:50%;
    font-size:26px;
  }
  .wechat :nth-child(2) {
    color:#81D842;
    margin:0;
  }
  .wechat :nth-child(4){
    color:#23AAF2;
  }
  .wechat p{
    margin-bottom:10px;
  }
  .wechat>p>span{
    width:50px;
    height:1px;
    border:black;
    background:#000;
  }
</style>
