import Vue from 'vue'
import VueRouter from 'vue-router'
import ChennalList from '../views/ChennalList.vue'
import Optimization from '../views/Optimization.vue'
import Login from '../views/Login.vue'
import Activeplandetails from '../views/Activeplandetails.vue'
import AddChannel from '../views/AddChannel.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,

    routes: [{
        path: '/',
        name: 'Login',
        component:Login,
        meta: {
          auth: true,
        },
      },
      {
        path: '/ChennalList',
        name: 'ChennalList',
        component: ChennalList,
      },
      {
        path: '/Activeplandetails',
        name: 'Activeplandetails',
        component: Activeplandetails,
      },
      {
        path: '/addChannel',
        name: 'addChannel',
        component: AddChannel,
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/optimization',
        name: 'optimization',
        component: Optimization,
      },
    ]
})

export default router
