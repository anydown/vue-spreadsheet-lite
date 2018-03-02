<template>
  <div class="grid">
    <svg width=500>
      <g v-for="(row, ri) in data" :key="ri">
        <g v-for="(col, ci) in row" :key="ci" :transform="translateCol(ci, ri)">
          <rect x=0 y=0 width=100 height=24>
          </rect>
          <text x=0 y=12 width=100 height=24>{{col}}</text>
        </g>
      </g>
      <rect class="selection" x=0 y=0 width=100 height=24></rect>
    </svg>
  </div>
</template>

<script>
export default {
  name: "SushiGrid",
  props: {},
  data() {
    return {
      data: [["A1", "A2", "A3", "A4"], ["B1", "B2", "B3", "B4"]]
    };
  },
  methods: {
    translateCol(ri, ci) {
      return `translate(${ri * 100}, ${ci * 24})`;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
rect {
  fill: white;
  stroke: gray;
  shape-rendering: crispEdges;
}
.selection {
  fill: none;
  stroke: green;
  stroke-width: 2px;
}

text {
  dominant-baseline: central;
}
</style>
