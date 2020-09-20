import $axios from "@/common/http"  // 导入封装好的axios!

// 获取列表
export async function getGoods(page = 1, size = 10) {
    let res = await $axios.get("/goodslist", {
        params: {
            size,
            page
        }
    })
    if (res.code == 200 && res.list) {
        return res.list
    } else {
        return [];
    }
}
// 添加列表
export function addGoods(data) {
    return $axios.post("/goodsadd", data)
}
// 修改列表
export function editGoods(data) {
    return $axios.post("/goodsedit", data)
}
// 删除列表
export function delGoods(id) {
    return $axios.post("/goodsdelete", { id })
}
// 获取管理个数
export async function getTotal() {
    let res = await $axios.get("/goodscount")
    return res.list[0].total
}

