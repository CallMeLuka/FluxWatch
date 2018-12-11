import Vue from 'vue'
import App from './App.vue'
import router from './router'

import'mint-ui/lib/style.css'
Vue.config.productionTip = false
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

//引入组件mintui库Header
//-引入指定组件
import {Header,Swipe,SwipeItem,Button} from "mint-ui"; 
//-注册当前项目中 <mt-header>    "tt-header"
Vue.component(Header.name,Header);
Vue.component(Swipe.name,Swipe);  //"mt-swipe"
Vue.component(SwipeItem.name,SwipeItem);
Vue.component(Button.name, Button);

//引入Axios库
import axios from "axios"
//跨域保存session的值
axios.defaults.withCredentials = true;
//注册Axios组件
Vue.prototype.axios = axios;

// 引入并注册vue-resource库
import VueResource from "vue-resource"
Vue.use(VueResource)
//A配置 vue-resource 的常见属性
//A.1设置请求服务器的根目录
Vue.http.options.root = "http://127.0.0.1:3000/";
//A.2全局设置post 时候表单
//application/x-www-form-urlencoded;
//将提交的数据进行转码操作 
Vue.http.options.emulateJSON = true;


//创建日期类型的过滤器  val:原先日期对象
Vue.filter("datetimeFilter",function(val){
    //创建日期对象
    var data = new Date(val)
    //获取年月日时分秒
    var y = data.getFullYear();
    var m = data.getMonth()+1;
    var d = data.getDate();
    var h = data.getHours();
    var mi = data.getMinutes();
    var s = data.getSeconds();
    //格式判断 月和日进行判断如果是个位数加个0 07 08 09月或者日
    if(m<10){
      m="0"+m
    };
    if(d<10){
      m="0"+m
    };
    //拼接字符串返回
    return `${y}-${m}-${d} ${h}:${mi}:${s}`
})




new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
