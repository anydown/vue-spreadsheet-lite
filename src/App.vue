<template>
  <div id="app">
    <textarea v-model="dataSrc"></textarea>
    <div class="right">
      <sushi-grid :data="gridData" @update="onUpdate"/>
    </div>
  </div>
</template>

<script>
import SushiGrid from "./components/SushiGrid.vue";

const example = [...Array(20).keys()]
  .map(i => `A${i} B${i} C${i} D${i}`)
  .join("\n");

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
        let output = data.map(s => s.join(" ")).join("\n");
        this.dataSrc = output;
      }
    }
  },
  data() {
    return {
      dataSrc: example
    };
  }
};
</script>

<style>
#app {
  margin: 1rem;
  display: flex;
}
textarea {
  width: 20rem;
  background: #333;
  color: white;
}
.right {
  flex: 1;
}
</style>

