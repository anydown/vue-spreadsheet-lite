<template>
  <div id="app">
    <h1>vue-spreadsheet-lite</h1>
    <select v-model="mode">
      <option value="basic">Basic</option>
      <option value="csv">CSV Editing</option>
    </select>
    <div v-if="mode === 'basic'">
      <vue-spreadsheet-lite :data="demoBasic.data" :header="demoBasic.header"/>
      <button @click="addRow">Add Row</button>
    </div>
    <div class="pane" v-if="mode === 'csv'">
      <textarea v-model="dataSrc"></textarea>
      <div class="right">
        <vue-spreadsheet-lite :data="gridData" @update="onUpdate"/>
      </div>
    </div>
  </div>
</template>

<script>
import VueSpreadsheetLite from "./components/VueSpreadsheetLite.vue";

const example = [...Array(20).keys()]
  .map(i => `A${i} B${i} C${i} D${i}`)
  .join("\n");

export default {
  name: "app",
  components: {
    VueSpreadsheetLite
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
    },
    addRow() {
      this.demoBasic.data.push(["", "", ""]);
    }
  },
  data() {
    return {
      demoBasic: {
        header: [
          { name: "Name", width: 200 },
          { name: "Age", width: 60 },
          { name: "Gender", width: 60 }
        ],
        data: [
          ["Yamada Taro", "12", "M"],
          ["Yamada Hanako", "12", "M"],
          ["Sato Jiro", "12", "M"],
          ["Sato Hanako", "12", "M"]
        ]
      },
      dataSrc: example,
      mode: "basic"
    };
  }
};
</script>

<style>
.pane {
  display: flex;
}
#app {
  margin: 1rem;
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

