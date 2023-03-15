<template>
  <div id="app">
   <router-view></router-view>
 </div>
</template>

<script>
  import resource from './api/resource.js'
  import login from './components/login.vue'

  export default {
    name: 'app',
    created(){
      // this.$router.push('/home');
      // return
      //验证是否登录
      resource.loginCheck().then(res => {
        if(res.data.code == '1'){
          this.$store.commit('setUserName',res.data.name);
          this.$store.commit('setOnlyRead',res.data.only_read);
          let tab = sessionStorage.getItem("tab");
          if(res.data.only_read == '1'){
            this.$router.push('/detailed');
          }else{
            if(!!tab){
              this.$router.push(tab);
            }else{
              this.$router.push('/home');
            }
          }
        }else{
          this.$router.push('/login');
        }
      });
    }

  }
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
body,html{
  font-family: SourceHanSansSC-Regular;
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
