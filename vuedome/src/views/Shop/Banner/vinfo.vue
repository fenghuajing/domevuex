<template>
  <el-dialog :title="info.isAdd ? '添加轮播图':'修改轮播图'" @close="cancel"  :visible.sync="info.isShow"   width="40%">
    <!-- 表单 -->
    <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
         <el-form-item label="上级目录">
            <el-select v-model="forminfo.id" placeholder="请选择">
                <el-option label="顶级目录" :value="0"></el-option>
                <el-option  v-for="item in bannerlist" :key="item.id" :label="item.title"  :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="轮播图名称" prop="title">
            <el-input v-model="forminfo.title" placeholder="请输入轮播图"></el-input>
        </el-form-item>
        <el-form-item label="轮播图图片">
            <el-upload
                action=""
                :auto-upload="false"
                list-type="picture-card"
                :limit="1"
                :on-preview="see"
                :on-change="change"
                :on-remove="remove"
                :file-list="filelist"
            >
                <i slot="default" class="el-icon-plus"></i>
            </el-upload>
            <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item label="状态">
            <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="sumbit">提交</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</el-dialog>
</template>
<script>
// 添加和修改的 请求封装方法
import { addBanner,editBanner } from "@/request/banner"
import { mapGetters,mapActions } from "vuex"
let defaultItem = {
    id:0,  
    title:"",
    img:"", 
    status:1    // 状态1正常2禁用
}
let resetItem = {...defaultItem}
export default {
    props:{
        info:{
            type:Object,
            default(){
                return {
                    isAdd:true,
                    isShow:false
                }
            }
        }
    },
    data(){
        return{
            dialogVisible:false,
            dialogImageUrl:"",
            forminfo:{...defaultItem},
            rules:{  // 验证规则对象！
                title:[{required:true,message:"必填！",trigger:'blur'}]
            },
            filelist:[]  
        }
    },
    computed: {
    ...mapGetters({
      catelist: "category/catelist",
      bannerlist: "banner/bannerlist",
    }),
  },
  mounted() {
    if (!this.catelist.length) {
      this.get_banner_list();
    }},
    methods:{
        ...mapActions({
            get_banner_list:"banner/get_banner_list"
        }),
        see(file){
            this.dialogVisible = true;
            // JS生成的预览地址
            this.dialogImageUrl = file.url 
        },
        change(file,fileList){
            // file.raw 是原生文件信息
            this.forminfo.img = file.raw;  
        },
        remove(file,fileList){
             this.forminfo.img =''
        },
        setinfo(val){  // 将数据赋给默认defaultItem; 赋给表单
            if(val.img){
                this.filelist = [{
                    name:val.title,
                    url:this.$host+val.img
                }]
            }
            val.children ? delete val.children:''
            defaultItem = {...val};
            this.forminfo = {...val};
        },
        async sumbit(){
            // 表单验证！
            this.$refs.form.validate(async valid=>{
                if(valid){ // 如果验证通过！
                    let res;
                    // 提交FormData类型！
                    let fd = new FormData();
                    for(let k in this.forminfo){
                        fd.append(k,this.forminfo[k])
                    }
                     // 添加还是修改
                    if(this.info.isAdd){
                        res = await addBanner(fd);
                    }else{
                        res = await editBanner(fd)
                    }
                    if(res.code==200){
                        this.$message.success(res.msg)
                        this.info.isShow = false;
                        this.get_banner_list();  // 再次获取列表，让仓库里面的数据是最新的！
                        this.cancel();
                    }else{
                        this.$message.error(res.msg)
                    }
                }
            })
        },
        reset(){
            if(this.info.isAdd){ // 添加时候的重置！
                this.forminfo = {...resetItem}
            }else{ // 修改时候的重置！
                this.setinfo({...defaultItem})
            }
        },
        cancel(){ //  // 无论是修改成功还是添加成功，都应该让表单为空！或者弹框关闭的时候！
            this.forminfo = {...resetItem}
            this.filelist = [];   // 设为空，就没有了！
        }
    },
    components:{}
}
</script>
<style scoped>
</style>