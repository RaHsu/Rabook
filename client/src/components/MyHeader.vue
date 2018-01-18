<template>
    <Menu mode="horizontal" :theme="theme1" :active-name="activeCode">
    <router-link to="/">
      <MenuItem name="1">
        <Icon type="ios-paper"></Icon>
        书籍
      </MenuItem>
     </router-link>
      <MenuItem name="2">
         <Icon type="flag"></Icon>
          计划
      </MenuItem>
      <Submenu name="3">
          <template slot="title">
              <Icon type="settings"></Icon>
              设置
          </template>
          <router-link to="/settings/belongs">
              <MenuItem name="3-1">所属管理</MenuItem>
          </router-link>
          <router-link to="/settings/types">
              <MenuItem name="3-2">书籍类型管理</MenuItem>
          </router-link>
      </Submenu>
  </Menu>
</template>
<script>

    export default {
        name:'my-header',
        data () {
            return {
                theme1: 'light',
                activeCode:'',
                routes:[
                    {code:'1',route:'/'},
                    {code:'2',route:'/plan'},
                    {code:'3-1',route:'/settings/belongs'},
                    {code:'3-2',route:'/settings/types'}

                ]
            }
        },
        methods:{


        },
        created:function(){
            //console.log(this.$route.path);
            for(var i = 0;i<this.routes.length;i++){
                 if(this.$route.path === this.routes[i].route){
                     this.activeCode = this.routes[i].code;
                 }
            }
        }
    }
</script>
