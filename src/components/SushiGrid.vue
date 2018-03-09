<template>
  <div class="grid" @mouseup="onMouseUpSvg()">
    <svg width=500 height=24 >
      <g v-for="(col, ci) in header" :key="ci" :transform="translateCol(ci)">
        <rect class="col-header" x=0 y=0 :width="widthAt(ci)" :height="rowHeight">
        </rect>
        <text text-anchor="middle" :x="widthAt(ci) / 2" y=12 :width="widthAt(ci)" :height="rowHeight">{{col.name}}</text>
      </g>
    </svg>

    <div ref="wrapper" style="height: 400px; width:500px; overflow: scroll; position:relative;">
      <svg width=500 :height="data.length * 24" >
        <g transform="translate(0,0)">
          <g v-for="(row, ri) in data" :key="ri" :transform="translateRow(ri)">
            <g v-for="(col, ci) in row" :key="ci" :transform="translateCol(ci)" @mousedown="onMouseDownCell(ci, ri)" @mousemove="onMouseMoveCell(ci, ri)">
              <rect x=0 y=0 :width="widthAt(ci)" :height="rowHeight">
              </rect>
              <text x=2 y=12 :width="widthAt(ci)" :height="rowHeight">{{col}}</text>
            </g>
          </g>
          <rect :transform="selectionTransform" class="selection" x=0 y=0 :width="getSelectionSize().w" :height="selectionCount.h * rowHeight"></rect>
        </g>
      </svg>
      <div class="editor__frame" :style="styleObj">
        <input ref="hiddenInput" @mousedown="onMouseDownCell(selection.c, selection.r)" class="editor__textarea" v-model="editingText" @blur="onBlur" :class="{'editor--visible': editing}" autofocus />
      </div>
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
      header: [
        { name: "No", width: 50 },
        { name: "Name", width: 150 },
        { name: "Age", width: 80 },
        { name: "Gender", width: 80 }
      ],
      data: [
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
        ["C1", "C2", "C3", "C4"],
        ["D1", "D2", "D3", "D4"],
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
        ["C1", "C2", "C3", "C4"],
        ["D1", "D2", "D3", "D4"],
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
        ["C1", "C2", "C3", "C4"],
        ["D1", "D2", "D3", "D4"],
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
        ["C1", "C2", "C3", "C4"],
        ["D1", "D2", "D3", "D4"],
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
        ["C1", "C2", "C3", "C4"],
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
        ["C1", "C2", "C3", "C4"],
        ["D1", "D2", "D3", "D4"],
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
        ["C1", "C2", "C3", "C4"],
        ["D1", "D2", "D3", "D4"],
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
        ["C1", "C2", "C3", "C4"],
        ["D1", "D2", "D3", "D4"],
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
        ["C1", "C2", "C3", "C4"],
        ["D1", "D2", "D3", "D4"],
        ["A1", "A2", "A3", "A4"],
        ["B1", "B2", "B3", "B4"],
        ["C1", "C2", "C3", "C4"],
        ["D1", "D2", "D3", "D4"]
      ],
      selection: {
        c: 0,
        r: 0,
        ec: 0,
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
        left: this.positionLeft(this.selectionCount.c) + "px",
        top: this.selection.r * 24 + "px"
      };
    },
    selectionTransform() {
      return `translate(${this.positionLeft(this.selectionCount.c)},  ${this
        .selectionCount.r * 24})`;
    },
    selectionCount() {
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
    getSelectionSize() {
      return {
        r: this.positionLeft(this.selectionCount.r),
        c: this.positionLeft(this.selectionCount.c),
        w:
          this.positionLeft(this.selectionCount.c + this.selectionCount.w) -
          this.positionLeft(this.selectionCount.c),
        h:
          this.positionLeft(this.selectionCount.c + this.selectionCount.h) -
          this.positionLeft(this.selectionCount.c)
      };
    },
    widthAt(index) {
      return this.header[index].width;
    },
    positionLeft(index) {
      return this.header
        .slice(0, index)
        .map(it => it.width)
        .reduce((a, b) => a + b, 0);
    },
    setDataAt(c, r, value) {
      Vue.set(this.data[r], c, value);
    },
    getDataAt(c, r) {
      return this.data[r][c];
    },
    onBlur() {
      this.editing = false;
      this.setDataAt(this.editingCell.c, this.editingCell.r, this.editingText);
    },
    translateCol(ci) {
      return `translate(${this.positionLeft(ci)}, 0)`;
    },
    translateRow(ri) {
      return `translate(0, ${ri * 24})`;
    },
    onMouseDownCell(c, r) {
      if (
        this.selectionCount.c === c &&
        this.selectionCount.r === r &&
        this.selectionCount.w === 1 &&
        this.selectionCount.h === 1
      ) {
        this.editHere();
        return;
      }
      this.setSelectionStart(c, r);
    },
    setSelectionSingle(c, r) {
      this.selection.c = c;
      this.selection.r = r;
      this.selection.ec = c;
      this.selection.er = r;
    },
    setSelectionStart(c, r) {
      this.setSelectionSingle(c, r);
      this.selectionMode = true;
    },
    onMouseMoveCell(c, r) {
      if (this.selectionMode) {
        this.setSelectionEnd(c, r);
      }
    },
    onMouseUpSvg() {
      this.endSelection();
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
      this.editing = true;
      Vue.nextTick(() => {
        this.$refs.hiddenInput.focus();
      });
    },
    editHere() {
      this.editingText = this.data[this.selection.r][this.selection.c];
      this.editCell(this.selection.c, this.selection.r);
    },
    editHereNew() {
      this.editCell(this.selection.c, this.selection.r);
    },
    clearCell(c, r) {
      this.setDataAt(c, r, "");
    },
    clearSelection() {
      for (let i = 0; i < this.selectionCount.h; i++) {
        for (let j = 0; j < this.selectionCount.w; j++) {
          this.clearCell(this.selectionCount.c + j, this.selectionCount.r + i);
        }
      }
    },
    isInsideTable(c, r) {
      if (c < 0) {
        return false;
      }
      if (r < 0) {
        return false;
      }
      if (c > this.data[0].length - 1) {
        return false;
      }
      if (r > this.data.length - 1) {
        return false;
      }
      return true;
    },
    moveCursor(dc, dr) {
      if (this.selectionMode) {
        if (
          !this.isInsideTable(this.selection.ec + dc, this.selection.er + dr)
        ) {
          return;
        }
        this.setSelectionEnd(this.selection.ec + dc, this.selection.er + dr);
        return;
      }
      if (!this.isInsideTable(this.selection.c + dc, this.selection.r + dr)) {
        return;
      }
      if (this.editing) {
        this.onBlur();
      }
      this.setSelectionSingle(this.selection.c + dc, this.selection.r + dr);
      this.fixScroll();
    },
    moveInputCaretToEnd() {
      var el = this.$refs["hiddenInput"];
      el.setSelectionRange(this.editingText.length, this.editingText.length);
    },
    fixScroll() {
      const el = this.$refs["wrapper"];

      if (el.scrollTop > this.selection.r * 24) {
        el.scrollTop = this.selection.r * 24;
      }
      if (el.scrollTop < this.selection.r * 24 - el.clientHeight + 24) {
        el.scrollTop = this.selection.r * 24 - el.clientHeight + 24;
      }
    }
  },
  mounted() {
    this.editingText = this.getDataAt(0, 0);
    this.onBlur();

    window.onkeydown = e => {
      switch (e.keyCode) {
        case 8: //backspace
          if (!this.editing) {
            this.moveInputCaretToEnd();
            this.editHere();
          }
          break;
        case 37: //left
          this.moveCursor(-1, 0);
          e.preventDefault();
          break;
        case 38: //up
          this.moveCursor(0, -1);
          e.preventDefault();
          break;
        case 39: //right
          this.moveCursor(1, 0);
          e.preventDefault();
          break;
        case 40: //down
          this.moveCursor(0, 1);
          e.preventDefault();
          break;
        case 46: //delete
          this.clearSelection();
          break;
        case 13: //enter
          this.moveCursor(0, 1);
          break;
        case 16: //shift
          this.setSelectionStart(this.selection.c, this.selection.r);
          break;
        case 91: //ctrl
          break;
        case 113: //F2
          if (!this.editing) {
            this.moveInputCaretToEnd();
            this.editHere();
          }
          break;
        default:
          if (!this.editing) {
            this.editingText = "";
            this.editHereNew();
          }
          break;
      }
    };
    window.onkeyup = e => {
      switch (e.keyCode) {
        case 16: //shift
          this.endSelection();
          break;
      }
    };
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
  background: #eee;
  display: block;
}

.editor__textarea {
  opacity: 0;
}
.editor--visible {
  opacity: 1;
}
</style>
