<template>
  <div class="grid" @mouseup="onMouseUpSvg()" @mousemove="headerResizeMove">
    <svg width=500 height=24>
      <g v-for="(col, ci) in header" :key="ci" :transform="translateCol(ci)">
        <rect class="col-header" x=0 y=0 :width="widthAt(ci)" :height="rowHeight">
        </rect>
        <text text-anchor="middle" :x="widthAt(ci) / 2" y=12 :width="widthAt(ci)" :height="rowHeight">{{col.name}}</text>
        <rect class="col-header__resize" :class="{'active': ci === headerResizeAt}" :x="widthAt(ci) - 5" :y=0 :width="5" :height="rowHeight" @mousedown="headerResizeStart(ci)"></rect>
      </g>
    </svg>

    <div ref="wrapper" style="height: 400px; width:500px; overflow: scroll; position:relative;">
      <svg width=500 :height="data.length * 24" >
        <g v-for="(row, ri) in data" :key="ri" :transform="translateRow(ri)">
          <g v-for="(col, ci) in row" :key="ci" :transform="translateCol(ci)" @mousedown="onMouseDownCell(ci, ri)" @mousemove="onMouseMoveCell(ci, ri)">
            <rect x=0 y=0 :width="widthAt(ci)" :height="rowHeight">
            </rect>
            <text x=2 y=12 :width="widthAt(ci)" :height="rowHeight">{{col}}</text>
          </g>
        </g>
        <rect :transform="selectionTransform" class="selection" x=0 y=0 :width="selectionSize.w" :height="selectionCount.h * rowHeight"></rect>
      </svg>
      <div class="editor__frame" :style="editorStyleObj">
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
        sc: 0,
        sr: 0
      },
      editingText: "",
      editing: false,
      rowHeight: 24,
      selectionMode: false,
      headerResizeAt: -1
    };
  },
  computed: {
    editorStyleObj() {
      return {
        left: this.positionLeft(this.selection.c) + "px",
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
          this.selection.r <= this.selection.sr
            ? this.selection.r
            : this.selection.sr,
        c:
          this.selection.c <= this.selection.sc
            ? this.selection.c
            : this.selection.sc,
        w: Math.abs(this.selection.sc - this.selection.c) + 1,
        h: Math.abs(this.selection.sr - this.selection.r) + 1
      };
    },
    selectionSize() {
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
    }
  },
  methods: {
    headerResizeStart(c) {
      this.headerResizeAt = c;
      // this.header[c].width = 100;
    },
    headerResizeEnd() {
      this.headerResizeAt = -1;
    },
    headerResizeMove(e) {
      var headerRect = e.target.parentNode.parentNode.getBoundingClientRect();
      var headerMouseX = e.clientX - headerRect.left;
      if (this.headerResizeAt >= 0) {
        this.header[this.headerResizeAt].width =
          headerMouseX - this.positionLeft(this.headerResizeAt);
      }
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
      this.setDataAt(this.selection.c, this.selection.r, this.editingText);
    },
    translateCol(ci) {
      return `translate(${this.positionLeft(ci)}, 0)`;
    },
    translateRow(ri) {
      return `translate(0, ${ri * 24})`;
    },
    onMouseDownCell(c, r) {
      if (this.editing) {
        this.onBlur();
      }
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
      this.selection.sc = c;
      this.selection.sr = r;
      this.setEditingText();
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
      this.headerResizeEnd();
    },
    setSelectionEnd(c, r) {
      if (this.selectionMode) {
        this.selection.c = c;
        this.selection.r = r;
        this.setEditingText();
      }
    },
    endSelection() {
      this.selectionMode = false;
    },
    editCell(c, r) {
      this.editing = true;
      Vue.nextTick(() => {
        this.$refs.hiddenInput.focus();
      });
    },
    editHere() {
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
      if (!this.isInsideTable(this.selection.c + dc, this.selection.r + dr)) {
        return;
      }
      if (this.selectionMode) {
        this.setSelectionEnd(this.selection.c + dc, this.selection.r + dr);
        this.fixScroll();
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
    },
    setEditingText() {
      this.editingText = this.getDataAt(this.selection.c, this.selection.r);
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
            this.editHere();
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
.col-header__resize {
  cursor: col-resize;
  opacity: 0;
}
.col-header__resize:hover {
  cursor: col-resize;
  fill: rgb(158, 55, 255);
  opacity: 0.5;
}
.col-header__resize.active {
  fill: rgb(158, 55, 255);
  opacity: 0.5;
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
