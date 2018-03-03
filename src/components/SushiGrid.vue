<template>
  <div class="grid">
    <svg width=500 height=400  @mouseup="endSelection()">
      <g v-for="(col, ci) in header" :key="ci" :transform="translateCol(ci)">
        <rect class="col-header" x=0 y=0 width=100 :height="rowHeight">
        </rect>
        <text text-anchor="middle" x=49 y=12 width=100 :height="rowHeight">{{col}}</text>
      </g>
      <g transform="translate(0,24)">

        <g v-for="(row, ri) in data" :key="ri" :transform="translateRow(ri)">
          <g v-for="(col, ci) in row" :key="ci" :transform="translateCol(ci)">
            <rect x=0 y=0 width=100 :height="rowHeight" @mousedown="setSelectionStart(ci, ri)" @mousemove="setSelectionEnd(ci, ri)">
            </rect>
            <text x=2 y=12 width=100 :height="rowHeight">{{col}}</text>
          </g>
        </g>
        <rect :transform="selectionTransform" class="selection" x=0 y=0 :width="selectionSize.w * 100" :height="selectionSize.h * rowHeight"></rect>
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
        r: 0,
        ec: 1,
        er: 0
      },
      editingText: "",
      editing: false,
      editingCell: { c: 0, r: 0 },
      rowHeight: 24,
      selectionMode: false
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
      return `translate(${this.selectionSize.c * 100},  ${this.selectionSize.r *
        24})`;
    },
    selectionSize() {
      return {
        r:
          this.selection.r <= this.selection.er
            ? this.selection.r
            : this.selection.er,
        c:
          this.selection.c <= this.selection.ec
            ? this.selection.c
            : this.selection.ec,
        w: Math.abs(this.selection.ec - this.selection.c) + 1,
        h: Math.abs(this.selection.er - this.selection.r) + 1
      };
    }
  },
  methods: {
    onBlur() {
      this.editing = false;
      Vue.set(
        this.data[this.editingCell.r],
        this.editingCell.c,
        this.editingText
      );
    },
    translateCol(ci) {
      return `translate(${ci * 100}, 0)`;
    },
    translateRow(ri) {
      return `translate(0, ${ri * 24})`;
    },
    setSelectionStart(c, r) {
      if (
        this.selectionSize.c === c &&
        this.selectionSize.r === r &&
        this.selectionSize.w === 1 &&
        this.selectionSize.h === 1
      ) {
        this.editCell(c, r);
        return;
      }
      this.selection.c = c;
      this.selection.r = r;
      this.selection.ec = c;
      this.selection.er = r;
      this.selectionMode = true;
    },
    setSelectionEnd(c, r) {
      if (this.selectionMode) {
        this.selection.ec = c;
        this.selection.er = r;
      }
    },
    endSelection() {
      this.selectionMode = false;
    },
    editCell(c, r) {
      this.editingCell.c = c;
      this.editingCell.r = r;
      this.editingText = this.data[r][c];
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
  user-select: none;
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
