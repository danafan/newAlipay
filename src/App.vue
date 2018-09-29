<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>
import login from './components/login.vue'

export default {
  name: 'app',
  created(){
    this.$router.push('/index');
  }
  
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
div{
  box-sizing: border-box;
  cursor: default;
}
input{
  box-sizing: border-box;
  padding-left: .5rem;
  border: none;
  outline: none;
}
</style>
