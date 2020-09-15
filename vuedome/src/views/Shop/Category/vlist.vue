<template>
  <div class="table-bg">
    <!-- 表格组件 -->
    <el-table :data="catelist" row-key="id" :tree-props="{children: 'children'}">
      <!-- 
             列 
             prop:渲染的字段
             label:标题
      -->
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="catename" label="分类名称" align="center"></el-table-column>
      <el-table-column label="分类图片" align="center">
        <template slot-scope="scope">
          <img style="80px" v-if="scope.row.img " :src="scope.row.img | pixImg" alt="">

          <img style="80px" v-else src="" alt="">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- slot-scope:作用域 -->
        <template slot-scope="scope">
          <!-- scope.row:表示这一行的数据 -->
          <el-button type="primary" size="small" @click="edit(scope.row)" icon="el-icon-edit"></el-button>
          <el-button type="danger" size="small" @click="del(scope.row.id)" icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { delCategory } from "@/request/category";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      catelist: "category/catelist",
    })
  },
  mounted() {
    if (!this.catelist.length) {
      this.get_category_list();
    }
  },
  methods: {
    ...mapActions({
      get_category_list: "category/get_category_list",
    }),
    edit(val) {
        this.$emit('edit',{...val})
    },
    async del(id) {
    this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async() => {
          let res = await delCategory(id);
            if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_category_list();
            } else {
            this.$message.error(res.msg);
        }
        }).catch(()=>{

        })
        
      
    }
  },
  components: {},
};
</script>
<style scoped>
</style>