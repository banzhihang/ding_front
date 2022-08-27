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
const Exchange = () => import(/* webpackChunkName: "exchange" */ './components/Exchange')
const Invite = () => import(/* webpackChunkName: "invite" */ './components/Invite')
const InviteCode = () => import(/* webpackChunkName: "invite-code" */ './components/InviteCode')
const UserBuyCode = () => import(/* webpackChunkName: "user-buy-code" */ './components/UserBuyCode')
const OrderQuery = () => import(/* webpackChunkName: "order-query" */ './components/OrderQuery')
const PostExchangeApply = () => import(/* webpackChunkName: "invite-exchange-apply" */ './components/PostExchangeApply')
const PostExchangeList = () => import(/* webpackChunkName: "invite-exchange-apply-list" */ './components/PostExchangeList')
const ExchangePay = () => import(/* webpackChunkName: "exchange-pay" */ './components/ExchangePay')

Vue.use(Router)

export default new Router({
        routes: [
            {
                path: '/alter',
                component: Alter,
                name:"Alter",
                meta:{
                    title: '修改信息',
                    keepAlive: true
                }
            },
            {
                path: '/register',
                component: Register,
                name:"Register",
                meta:{
                    title: '激活',
                    keepAlive: true
                }
            },
            {
                path: '/try',
                component: Try,
                name:"Try",
                meta:{
                    title: '试用',
                    keepAlive: true
                }
            },
            {
                path: '/hand',
                component: Hand,
                name:"Hand",
                meta:{
                    title: '手动打卡',
                    keepAlive: true
                }
            },
            {
                path: '/register_step',
                component: RegisterStep,
                name:"RegisterStep",
                meta:{
                    title: '激活步骤',
                    keepAlive: true
                }
            },
            {
                path: '/try_step',
                component: TryStep ,
                name:"TryStep",
                meta:{
                    title: '试用步骤',
                    keepAlive: true
                }
            },
            {
                path: '/home',
                component: Home ,
                name:"Home",
                meta:{
                    title: '首页',
                    keepAlive: true
                }
            },
            {
                path: '/',
                redirect: '/home' ,
                meta:{
                    title: '自动打卡',
                    keepAlive: true
                }

            },
            {
                path: '/notice',
                component: Notice,
                name:"Notice",
                meta:{
                    title: '帮助中心',
                    keepAlive: true
                }
            },
            {
                path:'/notice/:id',
                component:Article,
                name:"Article",
                meta:{
                    title: '通知详情',
                }
            },
            {
                path:'/exchange',
                component:Exchange,
                name:"Exchange",
                meta:{
                    title: '兑换',
                    keepAlive: true
                }
            },
            {
                path:'/invite',
                component:Invite,
                name:"Invite",
                meta:{
                    title: '邀请',
                    keepAlive: true
                }
            },
            {
                path:'/invite_code',
                component:InviteCode,
                name:"InviteCode",
                meta:{
                    title: '邀请码',
                    keepAlive: true
                }
            },
            {
                path: '/rs',
                component: RegisterStep,
                name:"RegisterStep",
                meta:{
                    title: '激活步骤',
                    keepAlive: true
                }
            },
            {
                path: '/ts',
                component: TryStep ,
                name:"TryStep",
                meta:{
                    title: '试用步骤',
                    keepAlive: true
                }
            },
            {
                path: '/n',
                component: Notice,
                name:"Notice",
                meta:{
                    title: '帮助中心',
                    keepAlive: true
                }
            },
            {
                path: '/a',
                component: Alter,
                name:"Alter",
                meta:{
                    title: '修改信息',
                    keepAlive: true
                }
            },
            {
                path: '/b',
                component: UserBuyCode,
                name:"UserBuyCode",
                meta:{
                    title: '购买激活码'
                }
            },
            {
                path: '/order_query',
                component: OrderQuery,
                name:"OrderQuery",
                meta:{
                    title: '支付详情',
                    keepAlive: true
                }
            },
            {
                path: '/apply_exchange',
                component: PostExchangeApply,
                name:"PostExchangeApply",
                meta:{
                    title: '提现请求',
                    keepAlive: true
                }
            },
            {
                path: '/apply_exchange_list',
                component: PostExchangeList,
                name:"PostExchangeList",
                meta:{
                    title: '历史申请'
                }
            },
            {
                path: '/exchange_pay',
                component: ExchangePay,
                name:"ExchangePay",
                meta:{
                    title: '兑换支付',
                }
            },

        ],
    }
)
