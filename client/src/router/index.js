import Vue from 'vue'
import Router from 'vue-router'
import Books from '@/components/Books'
import BelongsSetting from '@/components/BelongsSetting'
import TypesSetting from '@/components/TypesSetting'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Books',
      component: Books
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
