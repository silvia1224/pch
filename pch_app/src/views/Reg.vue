<!-- 注册页面组件 -->
<template>
  <div>
    <div class="container">
      <my-header></my-header>
      <div class="logo">
        <i class="iconfont icon-meishi"></i>
      </div>
      <div class="reg">
        <!-- 手机号码注册 -->
        <mt-field v-model="phone" type="number" placeholder="请输入您的手机号码" @blur.native.capture="checkPhone">
          <i class="iconfont icon-shouji"></i>
          <i v-if="judge==-1" class="iconfont icon-cuowu err"></i>
          <i v-else-if="judge==1" class="iconfont icon-dui right"></i>
        </mt-field>
        <!-- 密码 -->
        <mt-field type="password" v-model="pwd" placeholder="请输入密码（6-18位大小写字母、数字）">
          <i class="iconfont icon-suo pwd"></i>
          <i v-if="judge1==-1" class="iconfont icon-cuowu err"></i>
          <i v-else-if="judge1==1" class="iconfont icon-dui right"></i>
        </mt-field>
        <!-- 确认密码 -->
        <mt-field type="password" v-model="pwd2" placeholder="请确认密码">
          <i class="iconfont icon-suo pwd"></i>
          <i v-if="judge2==-1" class="iconfont icon-cuowu err"></i>
          <i v-else-if="judge2==1" class="iconfont icon-dui right"></i>
        </mt-field>
        <!-- 验证码 -->
        <mt-field type="text" v-model="code" placeholder="输入验证码">
          <i class="iconfont icon-yanzheng "></i>
        </mt-field>
        <!-- 注册按钮 -->
        <mt-button size="large" class="Btn">注&nbsp;&nbsp;&nbsp;册</mt-button>
        <!-- 注册说明 -->
        <h3>注册即代表您同意<a >《用户协议》</a>和<a>《隐私协议》</a></h3>
      </div>
        <!-- 其他注册方式 -->
        <div class="wechat">
          <p>其他注册方式...</p>
          <i class="iconfont icon-weixin"></i>
          <i class="iconfont icon-weibo"></i>
          <i class="iconfont icon-icon qq"></i>
        </div>
    </div>
  </div>
</template>
<script>
// 1.引入myHeader组件
import myHeader from "../components/myHeader.vue"
export default {
  data(){
    return {
      phone:"",
      judge:0,
      judge1:0,
      judge2:0,
    }
  },
  // 2.注册子组件
  components:{
    "my-header":myHeader
  },
  methods:{
    //绑定的函数验证
    checkPhone(){
      //正则验证电话
      var reg_phone=this.phone;
      if(!reg_phone.test(this.phone)){
        this.$toast("手机号码格式错误，请重新输入！");
        this.judge=-1;
        return;
      }else{}
    }
  }
}
</script>

<style scoped>
  .reg>>>input{
    border-bottom:1px solid #eee;
  }
  .reg>>>.mint-field-core{
    font-family: "Arial";
    text-indent:40px; 
    font-size:14px;
  }
  .contenter{
    position:relative;
  }
  /* PCHlogo图标显示 */
  .logo{
    padding:40px 0 30px 0;
    text-align:center;
  }
  .logo>i{
    display:inline-block;
    font-size:80px;
    color:#1F8358;
  }
  /* 注册主要内容 */
  .reg i{
    font-size:24px;
    color:#e54847;
    position:absolute;
    right:300px;
    top:-12px;
  }
  
  .Btn{
    width:90%;
    color:#fff;
    margin:0 auto;
    margin-top:40px;
    background-color:#5ECE9E;
    
  }
  h3{
    text-align:center;
    margin-top:20px;
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
</style>
 