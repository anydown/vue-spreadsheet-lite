<template>
  <div id="app">
    <sushi-grid :data="gridData" :header="header" @update="onUpdate"/>

    <textarea v-model="dataSrc"></textarea>
  </div>
</template>

<script>
import SushiGrid from "./components/SushiGrid.vue";

export default {
  name: "app",
  components: {
    SushiGrid
  },
  computed: {
    gridData() {
      return this.dataSrc.split("\n").map(s => s.split(" "));
    }
  },
  methods: {
    onUpdate(data) {
      if (data) {
        console.log("data", data);
        this.dataSrc = data.map(s => s.join(" ")).join("\n");
      }
    }
  },
  data() {
    return {
      dataSrc: "No Name Age Gender\na b c d\na b c d",
      header: [
        { name: "No", width: 50 },
        { name: "Name", width: 150 },
        { name: "Age", width: 80 },
        { name: "Gender", width: 80 }
      ]
    };
  }
};
</script>

<style>
#app {
  margin: 1rem;
}
</style>

