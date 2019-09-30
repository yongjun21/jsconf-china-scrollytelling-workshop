<div id="app">
	<MyHeader/>
	<MyStory/>
	<MyFooter/>
</div>

<script>
import MyHeader from './components/MyHeader.svelte'
import MyFooter from './components/MyFooter.svelte'
import MyStory from './components/MyStory.svelte'
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
