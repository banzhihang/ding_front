import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
import router from './router'
import axios from 'axios'
import 'vant/lib/index.less';
import 'github-markdown-css';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {baseUrl} from '../constant'


axios.defaults.baseURL = baseUrl
axios.defaults.headers.post['Content-Type'] = '"application/json"'


axios.interceptors.request.use(config =>{
  NProgress.start()
  return config
})

axios.interceptors.response.use(config =>{
  NProgress.done()
  return config
})

Vue.prototype.$http = axios
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
