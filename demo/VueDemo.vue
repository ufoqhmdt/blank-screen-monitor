<template>
  <div id="app">
    <HelloWorld msg="白屏监控 Test" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  /* height: 100%; */
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
}

#app div {
  background: white;
  /* min-height: -webkit-fill-available;
  min-width: -webkit-fill-available; */
  /* border:1px #c8f5dc solid; */
  height: 1%;
  width: 1%;
}
</style>
