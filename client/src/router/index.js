import Vue from 'vue'
import Router from 'vue-router'
import UnreadBooks from '@/components/UnreadBooks'
import BelongsSetting from '@/components/BelongsSetting'
import TypesSetting from '@/components/TypesSetting'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/books/unread'
  },{
    path:'/books',
    redirect:'/books/unread'
},{
      path: '/books/unread',
      name: 'UnreadBooks',
      component: UnreadBooks
  },{
      path:'/settings/belongs',
      name:'BelongsSetting',
      component: BelongsSetting
  },{
      path:'/settings/types',
      name:'TypesSetting',
      component: TypesSetting
  }
  ]
})
