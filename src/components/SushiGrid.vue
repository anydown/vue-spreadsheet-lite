<template>
  <div class="grid">
    <svg width=500 height=400>
      <g v-for="(col, ci) in header" :key="ci" :transform="translateCol(ci)">
        <rect class="col-header" x=0 y=0 width=100 :height="rowHeight">
        </rect>
        <text text-anchor="middle" x=49 y=12 width=100 :height="rowHeight">{{col}}</text>
      </g>
      <g transform="translate(0,24)">

        <g v-for="(row, ri) in data" :key="ri" :transform="translateRow(ri)">
          <g v-for="(col, ci) in row" :key="ci" :transform="translateCol(ci)">
            <rect x=0 y=0 width=100 :height="rowHeight" @click="selectCell(ci, ri)">
            </rect>
            <text x=2 y=12 width=100 :height="rowHeight">{{col}}</text>
          </g>
        </g>
        <rect :transform="selectionTransform" class="selection" x=0 y=0 width=100 :height="rowHeight"></rect>
      </g>
    </svg>
    <div class="editor__frame" :style="styleObj" v-if="editing">
      <input ref="hiddenInput" class="editor__textarea" v-model="editingText" @blur="onBlur" autofocus />
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import Vue from "vue";

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
      },
      editingText: "",
      editing: false,
      rowHeight: 24
    };
  },
  computed: {
    styleObj() {
      return {
        left: this.selection.c * 100 + "px",
        top: this.selection.r * 24 + 24 + "px"
      };
    },
    selectionTransform() {
      return `translate(${this.selection.c * 100},  ${this.selection.r * 24})`;
    }
  },
  methods: {
    onBlur() {
      this.editing = false;

      Vue.set(this.data[this.selection.r], this.selection.c, this.editingText);
    },
    translateCol(ci) {
      return `translate(${ci * 100}, 0)`;
    },
    translateRow(ri) {
      return `translate(0, ${ri * 24})`;
    },
    selectCell(c, r) {
      this.editingText = this.data[r][c];
      if (this.selection.c === c && this.selection.r === r) {
        this.editCell();
      }
      this.selection.c = c;
      this.selection.r = r;
    },
    editCell(c, r) {
      this.editing = true;
      Vue.nextTick(() => {
        this.$refs.hiddenInput.focus();
      });
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
.grid {
  position: relative;
}

.editor__frame {
  position: absolute;
}

text {
  dominant-baseline: central;
}

input {
  border: none;
  box-sizing: border-box;
  outline: 0;
  margin-left: 2px;
}

svg {
  border: 1px solid #999;
  background: #eee;
}
</style>
