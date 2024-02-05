# frontend-excelify

[![codecov](https://codecov.io/gh/isamxus/frontend-excelify/graph/badge.svg?token=XJO0THOPRI)](https://codecov.io/gh/isamxus/frontend-excelify)

`frontend-excelify` is a library designed specifically for front-end development, based on [ExcelJS](https://github.com/exceljs/exceljs), aimed at simplifying the process of exporting from web applications to Excel files. It offers a range of convenient methods and configuration options, making the seamless conversion of front-end data to Excel files more intuitive and efficient.

## Table of Contents

- [frontend-excelify](#frontend-excelify)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Quick Start](#quick-start)
  - [API](#api)
  - [Configuration Options](#configuration-options)
  - [More Examples](#more-examples)

## Features

- Simple API, easy to get started
- Customizable styles, formats, and data transformations

## Installation

Install using npm:

`npm install frontend-excelify`

Or using yarn:

`yarn add frontend-excelify`

## Quick Start

Below is a simple example showing how to use `frontend-excelify` to export an Excel file containing a single worksheet:

```
<template>
  <div>
    <button @click="exportToExcel">Export to Excel</button>
  </div>
</template>
<script lang="ts" setup>
import { exportExcel } from "frontend-excelify";
function generateData(count) {
  const units = ["日常运营", "投资", "储蓄"];
  const apps = ["转账", "理财", "存款", "支付"];
  const banks = ["银行A", "银行B", "银行C", "银行D", "银行E", "银行F", "银行G", "银行H", "银行I", "银行J"];
  const tips = ["是", "否"];
  return Array.from({ length: count }, (_, index) => ({
    unit: `单位${index + 1}`,
    account: `${Math.floor(100000 + Math.random() * 900000)}`,
    name: `账户${index + 1}`,
    bank: banks[index % banks.length],
    tip: tips[Math.floor(Math.random() * tips.length)],
    type: units[index % units.length],
    app: apps[index % apps.length],
    amount: Math.floor(Math.random() * (1000000000 - 100000000) + 100000000),
  }));
}
function exportToExcel() {
  exportExcel("测试", {
    name: "账户列表",
    columns: [
      { title: "单位", field: "unit" },
      { title: "账号", field: "account" },
      { title: "账户名称", field: "name" },
      { title: "开户行", field: "bank" },
      { title: "标识", field: "tip" },
      { title: "用途", field: "type" },
      { title: "功能", field: "app" },
      { title: "余额", field: "amount" },
    ],
    data: generateData(10), // Randomly generate ten pieces of data
  });
}
</script>
```

Below is the effect image:
![Effect Image](https://github.com/isamxus/frontend-excelify-assets/blob/09bd3b36d1868f669ef02bfc64157133da9b5776/%E5%9F%BA%E7%A1%80%E5%AF%BC%E5%87%BA.png)

## API

### `exportExcel`

Used to export data to an Excel file. It accepts two parameters: `tableName` and `options`.

```
exportExcel(tableName: string, options: ExportContextType):void;
```

- The first parameter is a string, representing the name of the worksheet in the exported Excel file.
- The second parameter is an object, containing various configuration options for the export process.

## Configuration Options

### Common Configuration Options

In this library, many configuration options are shared across multiple APIs. Below are the detailed explanations of these common configuration options:

#### `field`

- Type: `string`
- Default value: None
- Description: Specifies the field name of the corresponding data item, used to extract values from the data source to fill the corresponding column.

#### `formatType`

- Type: `billion` | `ten-thousand` | `number` | `percent`
- Default value: None
- Description: Specifies the formatting type of the column, used to define how data is displayed.

#### `formatter`

- Type: `(value: any) => any`
- Default value: None
- Description: A custom formatting function that takes the original value as an argument and returns the formatted value.

#### `color`

- Type: `string`
- Default value: None
- Description: Sets the color of the cell text.

#### `width`

- Type: `number`
- Default value: None
- Description: Sets the width of the cell.

#### `height`

- Type: `number`
- Default value: None
- Description: Sets the height of the cell.

#### `size`

- Type: `number`
- Default value: None
- Description: Sets the font size of the cell.

#### `align`

- Type: `"center" | "left" | "right"`
- Default value: None
- Description: Sets the text alignment of the cell.

#### `bold`

- Type: `boolean`
- Default value: `false`
- Description: Sets whether the cell text is bold.

#### `fillColor`

- Type: `string`
- Default value: None
- Description: Sets the fill color of the cell.

#### `showBorder`

- Type: `boolean`
- Default value: `false`
- Description: Sets whether the cell's border is shown.

#### `borderType`

- Type: `thin` | `dotted` | `dotted` | `hair` | `dashDotDot` | `slantDashDot` | `mediumDashed` | `mediumDashDotDot` | `mediumDashDot` | `medium` | `double` | `thick`
- Default value: None
- Description: Sets the style of the cell's border.

#### `borderColor`

- Type: `string`
- Default value: None
- Description: Sets the color of the cell's border.

### `name`

- Type: `string`
- Default value: None
- Description: The name of each sheet in the workbook.

### `columns`

- Type: `Array<ColumnItem>`
- Default value: `[]`
- Description: Defines the configuration for each column in the Excel file. Each `ColumnItem` can include the column's title, data field, style, formatting options, etc. Multi-level header configuration is supported through the `children` property.

#### `ColumnItem` Configuration Options

##### `title`

- Type: `string`
- Default value: None
- Description: Defines the title of the column, which will be displayed at the top of the Excel table.

##### `children`

- Type: `Array<ColumnItem>`
- Default value: `[]`
- Description: Used to define multi-level headers, where each child is also a `ColumnItem`.

##### `headerAlign`

- Type: `"center" | "left" | "right"`
- Default value: None
- Description: Sets the alignment of the header cell.

##### For other common configuration items, refer to the above explanation of common configuration items.

### `cells`

- Type: `Arrayable<CellItem>`
- Default value: None
- Description: Defines the specific configuration of cells, including style, formatting, and position information. `CellItem` can be a single object or an array of objects, allowing for detailed configuration of one or multiple cells.

#### `CellItem` Configuration Options

##### `rowIndex`

- Type: `number`
- Default value: None
- Description: The row index of the cell.

##### `colIndex`

- Type: `number`
- Default value: None
- Description: The column index of the cell.

##### `isMerge`

- Type: `boolean`
- Default value: `false`
- Description: Whether the current cell is merged with other cells.

##### `rowEndIndex`

- Type: `number`
- Default value: None
- Description: The row index where the merge ends (only valid when `isMerge` is `true`).

##### `colEndIndex`

- Type: `number`
- Default value: None
- Description: The column index where the merge ends (only valid when `isMerge` is `true`).

##### For other common configuration items, refer to the above explanation of common configuration items.

## More Examples

### Multi-level Headers

Multi-level headers can be achieved by setting the `children` option, supporting multiple levels of headers.

```
<template>
  <div>
    <button @click="exportToExcel">Export to Excel</button>
  </div>
</template>
<script lang="ts" setup>
import { exportExcel } from "frontend-excelify";
function generateData(count) {
  const units = ["日常运营", "投资", "储蓄"];
  const apps = ["转账", "理财", "存款", "支付"];
  const banks = ["银行A", "银行B", "银行C", "银行D", "银行E", "银行F", "银行G", "银行H", "银行I", "银行J"];
  const tips = ["是", "否"];
  return Array.from({ length: count }, (_, index) => ({
    unit: `单位${index + 1}`,
    account: `${Math.floor(100000 + Math.random() * 900000)}`,
    name: `账户${index + 1}`,
    bank: banks[index % banks.length],
    tip: tips[Math.floor(Math.random() * tips.length)],
    type: units[index % units.length],
    app: apps[index % apps.length],
    amount: Math.floor(Math.random() * (1000000000 - 100000000) + 100000000),
  }));
}
function exportToExcel() {
  exportExcel("测试", {
    name: "账户列表",
    columns: [
      {
        title: "单位",
        field: "unit",
        children: [
          { title: "单位1", field: "unit" },
          { title: "单位2", field: "unit" },
        ],
      },
      {
        title: "账号",
        field: "account",
        children: [
          {
            title: "账号1",
            field: "account",
            children: [
              { title: "账号3", field: "account" },
              { title: "账号4", field: "account" },
            ],
          },
          {
            title: "账号2",
            field: "account",
            children: [
              { title: "账号5", field: "account" },
              { title: "账号6", field: "account" },
            ],
          },
        ],
      },
      { title: "账户名称", field: "name" },
      { title: "开户行", field: "bank" },
      { title: "标识", field: "tip" },
      { title: "用途", field: "type" },
      { title: "功能", field: "app" },
      { title: "余额", field: "amount" },
    ],,
    data: generateData(10), // 随机生成十条数据
  });
}
</script>

```

Below is the effect image:
![Effect Image](https://github.com/isamxus/frontend-excelify-assets/blob/da7c158bcc4acf5b80ffabf5773f2c2510799114/%E5%A4%9A%E7%BA%A7%E8%A1%A8%E5%A4%B4%E5%AF%BC%E5%87%BA.png)

### Custom Cell Style (Fill Color)

By setting the `cells` option and specifying `rowIndex` and `colIndex`, you can set the cell style.

```
<template>
  <div>
    <button @click="exportToExcel">Export to Excel</button>
  </div>
</template>
<script lang="ts" setup>
import { exportExcel } from "frontend-excelify";
function generateData(count) {
  const units = ["日常运营", "投资", "储蓄"];
  const apps = ["转账", "理财", "存款", "支付"];
  const banks = [
    "银行A",
    "银行B",
    "银行C",
    "银行D",
    "银行E",
    "银行F",
    "银行G",
    "银行H",
    "银行I",
    "银行J",
  ];
  const tips = ["是", "否"];
  return Array.from({ length: count }, (_, index) => ({
    unit: `单位${index + 1}`,
    account: `${Math.floor(100000 + Math.random() * 900000)}`,
    name: `账户${index + 1}`,
    bank: banks[index % banks.length],
    tip: tips[Math.floor(Math.random() * tips.length)],
    type: units[index % units.length],
    app: apps[index % apps.length],
    amount: Math.floor(Math.random() * (1000000000 - 100000000) + 100000000),
  }));
}
function exportToExcel() {
  exportExcel("测试", {
    name: "账户列表",
    columns: [
      { title: "单位", field: "unit" },
      { title: "账号", field: "account" },
      { title: "账户名称", field: "name" },
      { title: "开户行", field: "bank" },
      { title: "标识", field: "tip" },
      { title: "用途", field: "type" },
      { title: "功能", field: "app" },
      { title: "余额", field: "amount" },
    ],
    data: generateData(10), // 随机生成十条数据
    cells: {
      rowIndex: 0,
      colIndex: 2,
      fillPattern: "solid",
      fillColor: "FFD2691E",
    },
  });
}
</script>

```

Below is the effect image:
![Effect Image](<https://github.com/isamxus/frontend-excelify-assets/blob/193724cab3ecf1cf21ac943b484814340203bc92/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E5%AE%9A%E5%8D%95%E5%85%83%E6%A0%BC%E6%A0%B7%E5%BC%8F(%E5%A1%AB%E5%85%85%E9%A2%9C%E8%89%B2).png>)

### Merging Specific Cells

By setting `isMerge` to true and specifying `rowEndIndex` and `colEndIndex`, cells can be merged.

```
<template>
  <div>
    <button @click="exportToExcel">Export to Excel</button>
  </div>
</template>
<script lang="ts" setup>
import { exportExcel } from "frontend-excelify";
function generateData(count) {
  const units = ["日常运营", "投资", "储蓄"];
  const apps = ["转账", "理财", "存款", "支付"];
  const banks = [
    "银行A",
    "银行B",
    "银行C",
    "银行D",
    "银行E",
    "银行F",
    "银行G",
    "银行H",
    "银行I",
    "银行J",
  ];
  const tips = ["是", "否"];
  return Array.from({ length: count }, (_, index) => ({
    unit: `单位${index + 1}`,
    account: `${Math.floor(100000 + Math.random() * 900000)}`,
    name: `账户${index + 1}`,
    bank: banks[index % banks.length],
    tip: tips[Math.floor(Math.random() * tips.length)],
    type: units[index % units.length],
    app: apps[index % apps.length],
    amount: Math.floor(Math.random() * (1000000000 - 100000000) + 100000000),
  }));
}
function exportToExcel() {
  exportExcel("测试", {
    name: "账户列表",
    columns: [
      { title: "单位", field: "unit" },
      { title: "账号", field: "account" },
      { title: "账户名称", field: "name" },
      { title: "开户行", field: "bank" },
      { title: "标识", field: "tip" },
      { title: "用途", field: "type" },
      { title: "功能", field: "app" },
      { title: "余额", field: "amount" },
    ],
    cells: {
      rowIndex: 0,
      colIndex: 2,
      fillPattern: "solid",
      fillColor: "FFD2691E",
      isMerge: true,
      rowEndIndex: 1,
      colEndIndex: 3,
    },
    data: generateData(10), // 随机生成十条数据
  });
}
</script>

```

Below is the effect image:
![Effect Image](https://github.com/isamxus/frontend-excelify-assets/blob/193724cab3ecf1cf21ac943b484814340203bc92/%E5%90%88%E5%B9%B6%E6%8C%87%E5%AE%9A%E5%8D%95%E5%85%83%E6%A0%BC.png)

### Exporting Multiple Sheets

Passing an array as the second parameter to the `exportExcel` method allows for exporting multiple sheets.

```
<template>
  <div>
    <button @click="exportToExcel">Export to Excel</button>
  </div>
</template>
<script lang="ts" setup>
import { exportExcel } from "frontend-excelify";
function generateData(count) {
  const units = ["日常运营", "投资", "储蓄"];
  const apps = ["转账", "理财", "存款", "支付"];
  const banks = [
    "银行A",
    "银行B",
    "银行C",
    "银行D",
    "银行E",
    "银行F",
    "银行G",
    "银行H",
    "银行I",
    "银行J",
  ];
  const tips = ["是", "否"];
  return Array.from({ length: count }, (_, index) => ({
    unit: `单位${index + 1}`,
    account: `${Math.floor(100000 + Math.random() * 900000)}`,
    name: `账户${index + 1}`,
    bank: banks[index % banks.length],
    tip: tips[Math.floor(Math.random() * tips.length)],
    type: units[index % units.length],
    app: apps[index % apps.length],
    amount: Math.floor(Math.random() * (1000000000 - 100000000) + 100000000),
  }));
}
function exportToExcel() {
  exportExcel("测试", [
    {
      name: "账户列表1",
      columns: [
        { title: "单位", field: "unit" },
        { title: "账号", field: "account" },
        { title: "账户名称", field: "name" },
        { title: "开户行", field: "bank" },
        { title: "标识", field: "tip" },
        { title: "用途", field: "type" },
        { title: "功能", field: "app" },
        { title: "余额", field: "amount" },
      ],
      data: generateData(10), // 随机生成十条数据
    },
    {
      name: "账户列表2",
      columns: [
        { title: "单位", field: "unit" },
        { title: "账号", field: "account" },
        { title: "账户名称", field: "name" },
        { title: "开户行", field: "bank" },
        { title: "标识", field: "tip" },
        { title: "用途", field: "type" },
        { title: "功能", field: "app" },
        { title: "余额", field: "amount" },
      ],
      data: generateData(10), // 随机生成十条数据
    },
  ]);
}
</script>

```

Below is the effect image:
![Effect Image](https://github.com/isamxus/frontend-excelify-assets/blob/ac23633170535500e76764bfe422369d34ff9b0a/%E5%A4%9A%E4%B8%AAsheet%E5%AF%BC%E5%87%BA.png)
