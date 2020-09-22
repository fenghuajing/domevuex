import $axios from "@/common/http"  // 导入封装好的axios!

// 获取轮播图
export async function getBanner() {
    let res = await $axios.get("/bannerlist")
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}
// 添加轮播图
export function addBanner(data){
    return  $axios.post("/banneradd",data)
}
// 修改轮播图
export function editBanner(data) {
    return $axios.post("/banneredit", data)
}
// 删除轮播图
export function delBanner(id) {
    return $axios.post("/bannerdelete", {id})
}