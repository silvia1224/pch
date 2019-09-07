<template>
   <div class="page-search">
       <mt-search autofocus v-model="value" :result="filterResult">
       </mt-search>
   </div>
</template>
<script>
export default {
    name:'page-search',
    data() {
        return {
            value:'',
            defaultResult:[
                '韭菜盒子',
                '美味小饭团',
                '凉拌鸡丝',
                '西葫芦'
            ]
        };
    },
    computed:{
        filterResult(){
            // return this.defaultResult.filter(value=>new RegExp(this.value,'i').text(value))
        }
    }
};
</script>
<style scoped>
.page-search{
    height:100%;
}
.mint-search{
    height:50px;
}
.mint-searchbar{
     border-radius:20px;
     background: #000 !important;
}

.mint-search>.mint-searchbar{
    background: #000;
}
</style>

