<template>
  <el-container class="page">
    <el-aside :width="iscollapse ? '60px':'200px'" class="page-nav">
        <left/>
    </el-aside>
    <el-container class="page-content">
      <el-header class="page-header">
          <top/>
      </el-header>
      <el-main class="page-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import top from './top'
import left from './left'
import {mapState} from 'vuex'
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
      ...mapState(['iscollapse'])
  },
  methods: {},
  components: {
      top,left
  },
};
</script>
<style scoped>
.page {
  width: 100vw;
  height: 100vh;
}
.page-header{
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(0,0,0,.3);
}
.page-nav{
    height: 100%;
    background-color:#444;
}
.page-content{
    height: 100%;
    background-color:#f7f7f7;
    position: relative;
    z-index: 1000;
}
</style>