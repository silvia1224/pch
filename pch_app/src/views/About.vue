<template>
    <div class="about">
        <div class="logi">
            <img src="../assets/log.png" alt=""/>
            <span>当前版本：v 1.0.1</span>
        </div>
        <div class="banq">
            <div class="lx">
                <span>联系方式：</span>
                <span>{{qq}}</span>  
            </div>
            
            <div class="jc" @click="gengx">
                <span class="gx">检查更新</span>
                <span class="fuhao">></span>  
            </div>
            
        </div>
    </div>

</template>
<script>
export default {
    data() {
        return {
            qq:"00000000",
        }
    },
    methods: {
        gengx(){
            this.$toast({
                message:"已是最新",
                position:"bottom",
                duration:1000, 
            })
           
        }
    },
}
</script>
<style scoped>
    .about{
        height: 80rem;
        width: 100%;
        background: #eeeeee;
    }
    .about .logi{
        text-align: center;
        
        background: #eeeeee;
        height: 15rem;
        width:100%;
        /* border-bottom:1px solid #f0f; */
        position: relative;
    }
    .about .logi>img{
        width: 13%;
        position: absolute;
        top:4rem;
        /* left: 50%; */
        transform: translate(-50%);
    }
    .about .logi>span{
        position:absolute;
        top: 9rem;
        transform: translate(-50%);
        font-size: 15px;
        color: #6e6d6d;
    }
    .about .banq div{
        background:#fff;
        width: 100%;
        height:4rem;
        color: #464444;
        font-size: 15px;
        /* display:block; */
        position: relative;
        line-height:4rem;
        /* left: 1rem; */
        padding:0 7px;
    }
    .about .banq .lx::after{
        content:"";
        border:1px solid #eeeeee;
        height:0px;
        width: 100%;
        display:block;
        position:absolute;
        z-index:1;
    }
    .about .banq .lx span+span,.about .banq .fuhao{
        position: absolute;
        right:7px;
        padding-right:7px;
        margin-right: 7px;
    }
</style>

