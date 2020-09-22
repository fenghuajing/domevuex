// 获取轮播图列表！
import { getBanner } from "@/request/banner"
export default {
    namespaced:true,
    state: {
        bannerlist:[]  // 轮播图列表
    },
    getters: {
        bannerlist: state => state.bannerlist
    },
    mutations: {
        SET_LIST(state,data){
            state.bannerlist = data;
        }
    },
    actions: {
        // 请求轮播图列表的数据
        async get_banner_list({commit}){
            let res = await getBanner();  
            commit('SET_LIST',res)
        }
    }
};