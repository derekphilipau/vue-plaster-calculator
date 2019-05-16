<template>
  <div id="app">
    <VolumeCalculator/>
  </div>
</template>

<script>
import VolumeCalculator from './components/VolumeCalculator.vue'

export default {
  name: 'app',
  components: {
    VolumeCalculator
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
  line-height: 1.875em;
}
</style>
