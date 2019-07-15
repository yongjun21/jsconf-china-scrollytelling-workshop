<template>
  <div id="app">
    <my-header key="header"></my-header>
    <my-story></my-story>
    <my-footer key="footer"></my-footer>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'
import MyFooter from './components/MyFooter'
import MyStory from './components/MyStory.vue'

export default {
  name: 'app',
  components: {
    MyHeader,
    MyStory,
    MyFooter
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
