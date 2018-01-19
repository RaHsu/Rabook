import Vue from 'vue'
import Router from 'vue-router'
import UnreadBooks from '@/components/UnreadBooks'
import BelongsSetting from '@/components/BelongsSetting'
import TypesSetting from '@/components/TypesSetting'
import ReadedBooks from '@/components/ReadedBooks'
import Reading from '@/components/Reading'
import Wishs from '@/components/Wishs'

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
        path: '/books/readed',
        name: 'ReadedBooks',
        component: ReadedBooks
    },{
          path: '/plans/reading',
          name: 'Reading',
          component: Reading
      },{
            path: '/plans/wishs',
            name: 'Wishs',
            component: Wishs
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
