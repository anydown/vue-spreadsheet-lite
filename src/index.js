import VueSpreadsheetLite from "./components/VueSpreadsheetLite.vue";

export default VueSpreadsheetLite;

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.component(VueSpreadsheetLite.name, VueSpreadsheetLite);
}
