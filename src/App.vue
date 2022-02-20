<template>
  <div id="app">
    <PlasterCalculator/>
  </div>
</template>

<script>
import PlasterCalculator from './components/PlasterCalculator.vue'

export default {
  name: 'app',
  components: {
    PlasterCalculator
  }
}
</script>

<style>
body {
  color: #111;
  background: #F5F5DC;
}
#app {
  font-family: 'Josefin Sans', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 40px;
  font-size: 1em;
  line-height: 1.75em;
}
</style>
