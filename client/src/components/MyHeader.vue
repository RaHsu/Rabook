<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
      <MenuItem name="1" >
          <a href="/">
              <Icon type="ios-paper"></Icon>
              书籍
          </a>
      </MenuItem>
      <MenuItem name="2">
         <Icon type="flag"></Icon>
          计划
      </MenuItem>
      <Submenu name="3">
          <template slot="title">
              <Icon type="settings"></Icon>
              设置
          </template>
          <MenuItem name="3-1"><a href="/settings/belongs">所属管理</a></MenuItem>
          <MenuItem name="3-2">书籍类型管理</MenuItem>
      </Submenu>
  </Menu>
</template>
<script>
    export default {
        name:'my-header',
        data () {
            return {
                theme1: 'light'
            }
        }
    }
</script>
