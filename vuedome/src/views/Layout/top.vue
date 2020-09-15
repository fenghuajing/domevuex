<template>
 <div class="header">
     <!-- 左侧 -->
     <div class="lt">
         <!-- 收缩按钮 -->
         <el-button v-if='iscollapse' type="primary" icon="el-icon-s-fold" @click="TOGGLE" size="small" class="toggle-btn"></el-button>
         <el-button v-else type="primary" icon="el-icon-s-fold" size="small" @click="TOGGLE" class="toggle-btn"></el-button>
         
         <!-- 面包屑 -->
         <el-breadcrumb separator-class="el-icon-arrow-right" class="mbx">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 返回按钮 -->
    <el-button   size="small" v-if="$router.path!='/index'" @click="$router.back()" icon="el-icon-arrow-left" ></el-button>

     </div>
     <!-- 右侧 -->
     <div>
<el-dropdown>
  <span class="el-dropdown-link">
   {{username}}欢迎
    <i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
     
          <el-dropdown-item @click.native="togglescreenfull">
               <i class="el-icon-rank"></i>{{isfull ? '退出全屏':'全屏操作'}}
          </el-dropdown-item>
      
    <el-dropdown-item><i class="el-icon-user-solid"></i> 登录</el-dropdown-item>
    <el-dropdown-item><i class="el-icon-shopping-bag-1"></i>注册</el-dropdown-item>
    <el-dropdown-item @click.native="QUIT"><i class="el-icon-switch-button"></i>退出登录</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

     </div>
 </div>
</template>

<script>

import {mapState,mapMutations,mapGetters} from 'vuex'
import screenfull from 'screenfull'
export default {
 data(){
 return{
     isfull:false
 }
 },
 created(){},
 computed: {
     ...mapState(['iscollapse']),
      ...mapGetters({
         username:"user/username"
       })
 },
 methods:{
     ...mapMutations({
         TOGGLE:"TOGGLE",
         QUIT:"user/QUIT"
     }),
      togglescreenfull(){
        if (!screenfull.isEnabled) {
          this.$message.warning('您的浏览器不支持全屏')
          return false
        }
        this.isfull = !this.isfull
        screenfull.toggle()
      }
 },
 components:{}
}

</script>
<style scoped>
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}
.toggle-btn{
    font-size: 10px;
}
.header .lt{
    display: flex;
    align-items: center;
}
.header .mbx{
    margin: 0 20px;
}
</style>