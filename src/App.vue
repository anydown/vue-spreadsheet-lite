<template>
  <div id="app">
    <sushi-grid msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import SushiGrid from "./components/SushiGrid.vue";

export default {
  name: "app",
  components: {
    SushiGrid
  }
};
</script>

<style>
#app {
  margin: 1rem;
}
</style>

