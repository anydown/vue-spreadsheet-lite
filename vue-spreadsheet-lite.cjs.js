'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('bootstrap/dist/css/bootstrap-reboot.min.css');
var Vue = _interopDefault(require('vue'));

var VueSpreadsheetLite = {
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      staticClass: "grid",
      on: {
        "mouseup": function mouseup($event) {
          _vm.onMouseUpSvg();
        },
        "mousemove": _vm.headerResizeMove
      }
    }, [_c('svg', {
      attrs: {
        "width": _vm.positionLeft(_vm.data.length + 1) + 1,
        "height": "24"
      }
    }, _vm._l(_vm.headerObj, function (col, ci) {
      return _c('g', {
        key: ci,
        attrs: {
          "transform": _vm.translateCol(ci)
        },
        on: {
          "mousedown": function mousedown($event) {
            _vm.startColumnSelect(ci);
          },
          "mousemove": function mousemove($event) {
            _vm.changeColumnSelect(ci);
          },
          "mouseup": _vm.endColumnSelect
        }
      }, [_c('rect', {
        staticClass: "col-header",
        attrs: {
          "x": "0",
          "y": "0",
          "width": _vm.widthAt(ci),
          "height": _vm.rowHeight
        }
      }), _vm._v(" "), _c('text', {
        staticClass: "col-header__text",
        attrs: {
          "text-anchor": "middle",
          "x": _vm.widthAt(ci) / 2,
          "y": "12",
          "width": _vm.widthAt(ci),
          "height": _vm.rowHeight
        }
      }, [_vm._v(_vm._s(col.name))]), _vm._v(" "), _c('rect', {
        staticClass: "col-header__resize",
        class: {
          'active': ci === _vm.headerResizeAt
        },
        attrs: {
          "x": _vm.widthAt(ci) - 5,
          "y": 0,
          "width": 5,
          "height": _vm.rowHeight
        },
        on: {
          "mousedown": function mousedown($event) {
            $event.stopPropagation();

            _vm.headerResizeStart(ci);
          }
        }
      })]);
    })), _vm._v(" "), _c('div', {
      ref: "wrapper",
      staticStyle: {
        "height": "400px",
        "overflow": "scroll",
        "position": "relative"
      }
    }, [_c('svg', {
      attrs: {
        "width": _vm.positionLeft(_vm.data.length + 1) + 1,
        "height": _vm.data.length * 24
      }
    }, [_vm._l(_vm.data, function (row, ri) {
      return _c('g', {
        key: ri,
        attrs: {
          "transform": _vm.translateRow(ri)
        }
      }, _vm._l(row, function (col, ci) {
        return _c('g', {
          key: ci,
          attrs: {
            "transform": _vm.translateCol(ci)
          },
          on: {
            "mousedown": function mousedown($event) {
              _vm.onMouseDownCell(ci, ri);
            },
            "mousemove": function mousemove($event) {
              _vm.onMouseMoveCell(ci, ri);
            }
          }
        }, [_c('rect', {
          attrs: {
            "x": "0",
            "y": "0",
            "width": _vm.widthAt(ci),
            "height": _vm.rowHeight
          }
        }), _vm._v(" "), _c('text', {
          attrs: {
            "x": "2",
            "y": "12",
            "width": _vm.widthAt(ci),
            "height": _vm.rowHeight
          }
        }, [_vm._v(_vm._s(col))])]);
      }));
    }), _vm._v(" "), _c('rect', {
      staticClass: "selection",
      attrs: {
        "transform": _vm.selectionTransform,
        "x": "0",
        "y": "0",
        "width": _vm.selectionSize.w,
        "height": _vm.selectionCount.h * _vm.rowHeight
      }
    })], 2), _vm._v(" "), _c('div', {
      staticClass: "editor__frame",
      style: _vm.editorStyleObj
    }, [_c('input', {
      directives: [{
        name: "model",
        rawName: "v-model",
        value: _vm.editingText,
        expression: "editingText"
      }],
      ref: "hiddenInput",
      staticClass: "editor__textarea",
      class: {
        'editor--visible': _vm.editing
      },
      attrs: {
        "autofocus": ""
      },
      domProps: {
        "value": _vm.editingText
      },
      on: {
        "mousedown": function mousedown($event) {
          _vm.onMouseDownCell(_vm.selection.c, _vm.selection.r);
        },
        "blur": _vm.onBlur,
        "input": function input($event) {
          if ($event.target.composing) {
            return;
          }

          _vm.editingText = $event.target.value;
        }
      }
    })])])]);
  },
  staticRenderFns: [],
  _scopeId: 'data-v-38127464',
  name: "VueSpreadsheetLite",
  props: {
    header: Array,
    data: Array
  },
  data: function data() {
    return {
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
      selectionModeColumn: false,
      headerResizeAt: -1
    };
  },
  computed: {
    editorStyleObj: function editorStyleObj() {
      return {
        left: this.positionLeft(this.selection.c) + "px",
        top: this.selection.r * 24 + "px",
        width: this.selectionSize.w + "px"
      };
    },
    selectionTransform: function selectionTransform() {
      return "translate(".concat(this.positionLeft(this.selectionCount.c), ",  ").concat(this.selectionCount.r * 24, ")");
    },
    selectionCount: function selectionCount() {
      return {
        r: this.selection.r <= this.selection.sr ? this.selection.r : this.selection.sr,
        c: this.selection.c <= this.selection.sc ? this.selection.c : this.selection.sc,
        w: Math.abs(this.selection.sc - this.selection.c) + 1,
        h: Math.abs(this.selection.sr - this.selection.r) + 1
      };
    },
    selectionSize: function selectionSize() {
      return {
        r: this.positionLeft(this.selectionCount.r),
        c: this.positionLeft(this.selectionCount.c),
        w: this.positionLeft(this.selectionCount.c + this.selectionCount.w) - this.positionLeft(this.selectionCount.c),
        h: this.positionLeft(this.selectionCount.c + this.selectionCount.h) - this.positionLeft(this.selectionCount.c)
      };
    },
    headerObj: function headerObj() {
      return this.header ? this.header : this.data[0].map(function (item, idx) {
        return {
          name: String.fromCharCode(65 + idx),
          width: 80
        };
      });
    }
  },
  methods: {
    startColumnSelect: function startColumnSelect(c) {
      this.selection.sr = this.data.length - 1;
      this.selection.r = 0;
      this.selection.sc = c;
      this.selection.c = c;
      this.selectionModeColumn = true;
    },
    changeColumnSelect: function changeColumnSelect(c) {
      if (this.selectionModeColumn) {
        this.selection.c = c;
      }
    },
    endColumnSelect: function endColumnSelect() {
      this.selectionModeColumn = false;
    },
    headerResizeStart: function headerResizeStart(c) {
      this.headerResizeAt = c;
    },
    headerResizeEnd: function headerResizeEnd() {
      this.headerResizeAt = -1;
    },
    headerResizeMove: function headerResizeMove(e) {
      var headerRect = e.target.parentNode.parentNode.getBoundingClientRect();
      var headerMouseX = e.clientX - headerRect.left;

      if (this.headerResizeAt >= 0) {
        var updateWidth = headerMouseX - this.positionLeft(this.headerResizeAt);
        this.headerObj[this.headerResizeAt].width = updateWidth > 30 ? updateWidth : 30;
      }
    },
    widthAt: function widthAt(index) {
      return this.headerObj[index].width;
    },
    positionLeft: function positionLeft(index) {
      return this.headerObj.slice(0, index).map(function (it) {
        return it.width;
      }).reduce(function (a, b) {
        return a + b;
      }, 0);
    },
    setDataAt: function setDataAt(c, r, value) {
      Vue.set(this.data[r], c, value);
      this.$emit("update", this.data);
    },
    getDataAt: function getDataAt(c, r) {
      return this.data[r][c];
    },
    onBlur: function onBlur() {
      this.editing = false;
      this.setDataAt(this.selection.c, this.selection.r, this.editingText);
    },
    translateCol: function translateCol(ci) {
      return "translate(".concat(this.positionLeft(ci), ", 0)");
    },
    translateRow: function translateRow(ri) {
      return "translate(0, ".concat(ri * 24, ")");
    },
    onMouseDownCell: function onMouseDownCell(c, r) {
      var _this = this;

      if (this.editing) {
        this.onBlur();
      }

      if (this.selectionCount.c === c && this.selectionCount.r === r && this.selectionCount.w === 1 && this.selectionCount.h === 1) {
        this.editHere();
        return;
      }

      this.setSelectionStart(c, r);
      Vue.nextTick(function () {
        _this.$refs["hiddenInput"].focus();
      });
    },
    setSelectionSingle: function setSelectionSingle(c, r) {
      this.selection.c = c;
      this.selection.r = r;
      this.selection.sc = c;
      this.selection.sr = r;
      this.setEditingText();
    },
    setSelectionStart: function setSelectionStart(c, r) {
      this.setSelectionSingle(c, r);
      this.selectionMode = true;
    },
    onMouseMoveCell: function onMouseMoveCell(c, r) {
      if (this.selectionMode) {
        this.setSelectionEnd(c, r);
      }
    },
    onMouseUpSvg: function onMouseUpSvg() {
      this.endSelection();
      this.headerResizeEnd();
    },
    setSelectionEnd: function setSelectionEnd(c, r) {
      if (this.selectionMode) {
        this.selection.c = c;
        this.selection.r = r;
        this.setEditingText();
      }
    },
    endSelection: function endSelection() {
      this.selectionMode = false;
    },
    editCell: function editCell(c, r) {
      var _this2 = this;

      this.editing = true;
      Vue.nextTick(function () {
        _this2.$refs.hiddenInput.focus();
      });
    },
    editHere: function editHere() {
      this.editCell(this.selection.c, this.selection.r);
    },
    clearCell: function clearCell(c, r) {
      this.setDataAt(c, r, "");
    },
    clearSelection: function clearSelection() {
      for (var i = 0; i < this.selectionCount.h; i++) {
        for (var j = 0; j < this.selectionCount.w; j++) {
          this.clearCell(this.selectionCount.c + j, this.selectionCount.r + i);
        }
      }
    },
    isInsideTable: function isInsideTable(c, r) {
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
    moveCursor: function moveCursor(dc, dr) {
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
    moveInputCaretToEnd: function moveInputCaretToEnd() {
      var el = this.$refs["hiddenInput"];
      el.setSelectionRange(this.editingText.length, this.editingText.length);
    },
    fixScroll: function fixScroll() {
      var el = this.$refs["wrapper"];

      if (el.scrollTop > this.selection.r * 24) {
        el.scrollTop = this.selection.r * 24;
      }

      if (el.scrollTop < this.selection.r * 24 - el.clientHeight + 24) {
        el.scrollTop = this.selection.r * 24 - el.clientHeight + 24;
      }

      if (el.scrollLeft < this.positionLeft(this.selection.c) - el.clientWidth) {
        el.scrollLeft = this.positionLeft(this.selection.c);
      }
    },
    setEditingText: function setEditingText() {
      this.editingText = this.getDataAt(this.selection.c, this.selection.r);
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.editingText = this.getDataAt(0, 0);
    this.onBlur();
    var target = this.$el;

    target.onkeydown = function (e) {
      switch (e.keyCode) {
        case 8:
          //backspace
          if (!_this3.editing) {
            _this3.moveInputCaretToEnd();

            _this3.editHere();
          }

          break;

        case 37:
          //left
          _this3.moveCursor(-1, 0);

          e.preventDefault();
          break;

        case 38:
          //up
          _this3.moveCursor(0, -1);

          e.preventDefault();
          break;

        case 39:
          //right
          _this3.moveCursor(1, 0);

          e.preventDefault();
          break;

        case 40:
          //down
          _this3.moveCursor(0, 1);

          e.preventDefault();
          break;

        case 46:
          //delete
          _this3.clearSelection();

          break;

        case 13:
          //enter
          _this3.moveCursor(0, 1);

          break;

        case 16:
          //shift
          _this3.setSelectionStart(_this3.selection.c, _this3.selection.r);

          break;

        case 91:
          //ctrl
          break;

        case 113:
          //F2
          if (!_this3.editing) {
            _this3.moveInputCaretToEnd();

            _this3.editHere();
          }

          break;

        default:
          if (!_this3.editing) {
            _this3.editingText = "";

            _this3.editHere();
          }

          break;
      }
    };

    target.onkeyup = function (e) {
      switch (e.keyCode) {
        case 16:
          //shift
          _this3.endSelection();

          break;
      }
    };
  }
};

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component(VueSpreadsheetLite.name, VueSpreadsheetLite);
}

module.exports = VueSpreadsheetLite;
