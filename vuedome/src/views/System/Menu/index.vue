<template>
 <div>
     <el-button type="primary" @click="add">添加菜单</el-button>
     <!-- 列表组件 -->
     <v-list @edit='edit'></v-list>
     <!-- 添加/修改组件 -->
     <v-info :info="info" ref="dialog" ></v-info>
 </div>
</template>

<script>
import VList from './vlist'
import VInfo from './vinfo'
export default {
 data(){
 return{
    //  这是组件的info变量
     info:{
         isAdd:false,
         isShow:false
     }
 }
 },
 created(){},
 methods:{
     add(){
        this.info.isAdd=this.info.isShow= true;
     },
     edit(val){
        this.info.isAdd = false 
        this.info.isShow = true
    this.$refs.dialog.setinfo(val) ;
     }
 },
 components:{
   VList,VInfo  
 }
}

</script>
<style scoped>
</style>