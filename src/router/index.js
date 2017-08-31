import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Start from '@/components/start'
import Main from '@/components/main'
import Detail from '@/components/Detail'
import Order from '@/components/Order'
import MyOrder from '@/components/MyOrder'
import Cart from '@/components/Cart'
import Set from '@/components/Set'
import Login from '@/components/Login'
import Reg from '@/components/Reg'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/start',
      name: 'Start',
      component: Start
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/set',
      name: 'Set',
      component: Set
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/',
      redirect: '/start'
    },
    {
      path: '/detail/:id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: MyOrder
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ]
})
