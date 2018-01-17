<template>
  <div id="app">
     <my-header/>

    <router-view/>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader';

export default {
  name: 'App',
  components:{
      MyHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
