<template>
  <div class="grid">
    <svg width=500 height=400>
      <g v-for="(col, ci) in header" :key="ci" :transform="translateCol(ci)">
        <rect class="col-header" x=0 y=0 width=100 height=24>
        </rect>
        <text text-anchor="middle" x=49 y=12 width=100 height=24>{{col}}</text>
      </g>
      <g transform="translate(0,24)">

        <g v-for="(row, ri) in data" :key="ri" :transform="translateRow(ri)">
          <g v-for="(col, ci) in row" :key="ci" :transform="translateCol(ci)">
            <rect x=0 y=0 width=100 height=24 @click="selectCell(ci, ri)">
            </rect>
            <text x=2 y=12 width=100 height=24>{{col}}</text>
          </g>
        </g>
        <rect :transform="selectionTransform" class="selection" x=0 y=0 width=100 height=24></rect>

      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "SushiGrid",
  props: {},
  data() {
    return {
      header: ["No", "Name", "Age", "Gender"],
      data: [
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
        ["C1", "C2", "C3", "C4"]
      ],
      selection: {
        c: 1,
        r: 0
      }
    };
  },
  computed: {
    selectionTransform() {
      return `translate(${this.selection.c * 100},  ${this.selection.r * 24})`;
    }
  },
  methods: {
    translateCol(ci) {
      return `translate(${ci * 100}, 0)`;
    },
    translateRow(ri) {
      return `translate(0, ${ri * 24})`;
    },
    selectCell(c, r) {
      this.selection.c = c;
      this.selection.r = r;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
rect {
  fill: white;
  stroke: #999;
  shape-rendering: crispEdges;
}
.selection {
  fill: none;
  stroke: rgb(158, 55, 255);
  stroke-width: 3px;
}
.col-header {
  fill: #eee;
}

text {
  dominant-baseline: central;
}

svg {
  border: 1px solid #999;
  background: #eee;
}
</style>
