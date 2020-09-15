import axios from "axios"
import router from '@/router'
let $axios = axios.create({
    baseURL:"/api",
    timeout:3000
})
// 添加请求拦截器
$axios.interceptors.request.use(function (config) {
  if(config.url == '/userlogin'){
    return config;
  }else{
    let userinfo = JSON.parse(localStorage.getItem("userinfo"))
    config.headers.authorization = userinfo.token;
    return config;
  }
    // 在发送请求之前做些什么
    // 设置token！！！
        // 一定要要要！！！return config 否则无效！！！！！！
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  // 添加响应拦截器
$axios.interceptors.response.use(function (response) {
  if(response.data.code == 403){
    router.push("/login")
    return response.data;
  }else{
    return response.data;
  }

}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default $axios;