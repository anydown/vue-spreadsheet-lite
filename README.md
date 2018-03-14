# vue-spreadsheet-lite

![Logo](https://user-images.githubusercontent.com/3132889/37255669-e971baf2-2592-11e8-823c-0dcadcb3b772.gif)

Lightweight full-scratched spreadsheet component. WIP

# Usage

npm install -D @anydown/vue-spreadsheet-lite

```
import VueSpreadsheetLite from "vue-spreadsheet-lite";
import "vue-spreadsheet-lite/dist/vue-spreadsheet-lite.css";

...

components: {
  VueSpreadsheetLite
}

...

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
    }
  };
}
```

in template:

```
<vue-spreadsheet-lite :data="demoBasic.data" :header="demoBasic.header"/>
```
