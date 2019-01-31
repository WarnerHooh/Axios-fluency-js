<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <User />
    <!--<UserLegacy />-->
  </div>
</template>

<script>
import User from './components/User.vue'
// import UserLegacy from './components/UserLegacy.vue'

export default {
  name: 'app',
  components: {
    User,
    // UserLegacy
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
  margin-top: 60px;
}
</style>
