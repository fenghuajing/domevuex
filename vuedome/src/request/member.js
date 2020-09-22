import $axios from "@/common/http"  // 导入封装好的axios!

// 获取规格列表
export async function getMember(page = 1,size=10) {
    let res = await $axios.get("/memberlist",{
        params:{
            size,
            page
        }
    })
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
}
// 添加规格
export function addMember(data){
    return  $axios.post("/memberadd",data)
}
// 修改规格
export function editMember(data) {
    return $axios.post("/memberedit", data)
}
// 删除规格
export function delMember(id) {
    return $axios.post("/memberdelete", { id})
}
// 获取管理个数
export async function getTotal(){
    let res = await $axios.get("/membercount")
    return res.list[0].total
}

