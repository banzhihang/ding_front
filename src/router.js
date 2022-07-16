import Vue from 'vue'
import Router from 'vue-router'

const Alter = () => import(/* webpackChunkName: "alter" */ './components/Alter')
const Register = () => import(/* webpackChunkName: "register" */ './components/Register')
const Try = () => import(/* webpackChunkName: "try" */ './components/Try')
const Hand = () => import(/* webpackChunkName: "hand" */ './components/Hand')
const RegisterStep = () => import(/* webpackChunkName: "register-step" */ './components/RegisterStep')
const TryStep = () => import(/* webpackChunkName: "try-step" */ './components/TryStep')
const Home = () => import(/* webpackChunkName: "home" */ './components/Home')
const Notice = () => import(/* webpackChunkName: "notice" */ './components/Notice')
const Article = () => import(/* webpackChunkName: "article" */ './components/Article')
const Exchange = () => import(/* webpackChunkName: "invite" */ './components/Exchange')
const Invite = () => import(/* webpackChunkName: "invite" */ './components/Invite')
const InviteCode = () => import(/* webpackChunkName: "invite" */ './components/InviteCode')


Vue.use(Router)

export default new Router({
        routes: [
            {
                path: '/alter',
                component: Alter,
                meta:{
                    title: '修改信息'
                }
            },
            {
                path: '/register',
                component: Register,
                meta:{
                    title: '激活'
                }
            },
            {
                path: '/try',
                component: Try,
                meta:{
                    title: '试用'
                }
            },
            {
                path: '/hand',
                component: Hand,
                meta:{
                    title: '手动打卡'
                }
            },
            {
                path: '/register_step',
                component: RegisterStep,
                meta:{
                    title: '激活步骤'
                }
            },
            {
                path: '/try_step',
                component: TryStep ,
                meta:{
                    title: '试用步骤'
                }
            },
            {
                path: '/home',
                component: Home ,
                meta:{
                    title: '首页'
                }
            },
            {
                path: '/',
                redirect: '/home' ,
                meta:{
                    title: '自动打卡'
                }

            },
            {
                path: '/notice',
                component: Notice,
                meta:{
                    title: '帮助中心'
                }
            },
            {
                path:'/notice/:id',
                component:Article,
                meta:{
                    title: '通知详情'
                }
            },
            {
                path:'/exchange',
                component:Exchange,
                meta:{
                    title: '兑换'
                }
            },
            {
                path:'/invite',
                component:Invite,
                meta:{
                    title: '邀请'
                }
            },
            {
                path:'/invite_code',
                component:InviteCode,
                meta:{
                    title: '邀请'
                }
            },
            {
                path: '/rs',
                component: RegisterStep,
                meta:{
                    title: '激活步骤'
                }
            },
            {
                path: '/ts',
                component: TryStep ,
                meta:{
                    title: '试用步骤'
                }
            },
            {
                path: '/n',
                component: Notice,
                meta:{
                    title: '帮助中心'
                }
            },
            {
                path: '/a',
                component: Alter,
                meta:{
                    title: '修改信息'
                }
            },

        ],
    }
)
