# frontend-excelify

[![codecov](https://codecov.io/gh/isamxus/frontend-excelify/graph/badge.svg?token=XJO0THOPRI)](https://codecov.io/gh/isamxus/frontend-excelify)

选择阅读语言版本 / Choose your reading language:

- [中文版](README.md)
- [English Version](README.en.md)(Updates ongoing)
- `frontend-excelify` 是一个专为前端设计的库，基于 [ExcelJS](https://github.com/exceljs/exceljs)，旨在简化从网页应用到 Excel 文件的导出过程。它提供了一系列便捷的方法和配置选项，使得将前端数据无缝转换为 Excel 文件变得更加直观和高效。

## 目录

- [frontend-excelify](#frontend-excelify)
  - [目录](#目录)
  - [特性](#特性)
  - [安装](#安装)
  - [快速开始](#快速开始)
  - [API](#api)
  - [配置项](#配置项)
  - [更多示例](#更多示例)

## 特性

- 简单的 API，易于上手
- 可以自定义样式、格式和数据转换

## 安装

使用 npm 安装：

`npm install frontend-excelify`

或者使用 yarn：

`yarn add frontend-excelify`

## 快速开始

以下是一个简单的示例，展示如何使用 `frontend-excelify` 导出一个包含单个工作表的 Excel 文件：

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
    data: generateData(10), // 随机生成十条数据
  });
}
</script>
```

以下是效果图：
![效果图](https://github.com/isamxus/frontend-excelify-assets/blob/09bd3b36d1868f669ef02bfc64157133da9b5776/%E5%9F%BA%E7%A1%80%E5%AF%BC%E5%87%BA.png)

## API

### `exportExcel`

用于将数据导出为 Excel 文件。它接受两个参数：`tableName` 和 `options`。

```
exportExcel(tableName: string, options: ExportContextType):void;
```

- 第一个参数是一个字符串，表示导出的 Excel 文件中的工作表名称。
- 第二个参数是一个对象，包含了导出过程中的各种配置项。

## 配置项

### 公共配置项说明

在本库中，有许多配置项是多个 API 共享的。以下是这些公共配置项的详细说明：

#### `field`

- 类型: `string`
- 默认值: 无
- 描述: 指定对应数据项的字段名，用于从数据源中提取值填充到对应列。

#### `formatType`

- 类型: `billion`|`ten-thousand`|`number`|`percent`
- 默认值: 无
- 描述: 指定列的格式化类型，用于定义如何显示数据。

#### `formatter`

- 类型: `(value: any) => any`
- 默认值: 无
- 描述: 自定义格式化函数，接受原始值作为参数并返回格式化后的值。

#### `color`

- 类型: `string`
- 默认值: 无
- 描述: 设置单元格文本的颜色。

#### `width`

- 类型: `number`
- 默认值: 无
- 描述: 设置单元格的宽度。

#### `height`

- 类型: `number`
- 默认值: 无
- 描述: 设置单元格的高度。

#### `size`

- 类型: `number`
- 默认值: 无
- 描述: 设置单元格字体大小。

#### `align`

- 类型: `"center" | "left" | "right"`
- 默认值: 无
- 描述: 设置单元格文本对齐方式。

#### `bold`

- 类型: `boolean`
- 默认值: `false`
- 描述: 设置单元格文本是否加粗。

#### `fillColor`

- 类型: `string`
- 默认值: 无
- 描述: 设置单元格的填充颜色。

#### `showBorder`

- 类型: `boolean`
- 默认值: `false`
- 描述: 设置是否单元格的边框。

#### `borderType`

- 类型: `thin` | `dotted` | `dotted` | `hair` | `dashDotDot` | `slantDashDot` | `mediumDashed` | `mediumDashDotDot` | `mediumDashDot` | `medium` | `double` | `thick`
- 默认值: 无
- 描述: 设置单元格边框的样式。

#### `borderColor`

- 类型: `string`
- 默认值: 无
- 描述: 设置单元格边框的颜色。

### `name`

- 类型: `string`
- 默认值: 无
- 描述: 工作表中每个 sheet 的名称。

### `columns`

- 类型: `Array<ColumnItem>`
- 默认值: `[]`
- 描述: 定义 Excel 文件中各列的配置。每个 `ColumnItem` 可以包含列的标题、数据字段、样式、格式化选项等。支持多级表头配置通过 `children` 属性。

#### `ColumnItem` 配置项

##### `title`

- 类型: `string`
- 默认值: 无
- 描述: 定义列的标题，该标题将显示在 Excel 表格的头部。

##### `children`

- 类型: `Array<ColumnItem>`
- 默认值: `[]`
- 描述: 用于定义多级表头，每个子项也是一个 `ColumnItem`。

##### `headerAlign`

- 类型: `"center" | "left" | "right"`
- 默认值: 无
- 描述: 设置表头单元格的对齐方式。

##### 其他公共配置项，参考上述公共配置项说明

### `cells`

- 类型: `Arrayable<CellItem>`
- 默认值: 无
- 描述: 定义单元格的具体配置，包括样式、格式化以及位置信息。`CellItem` 可以是单个对象或对象数组，允许对单个或多个单元格进行详细配置。

#### `CellItem`配置项

##### `rowIndex`

- 类型: `number`
- 默认值: 无
- 描述: 单元格的行索引。

##### `colIndex`

- 类型: `number`
- 默认值: 无
- 描述: 单元格的列索引。

##### `isMerge`

- 类型: `boolean`
- 默认值: `false`
- 描述: 是否将当前单元格与其他单元格合并。

##### `rowEndIndex`

- 类型: `number`
- 默认值: 无
- 描述: 合并结束的行索引（仅在 `isMerge` 为 `true` 时有效）。

##### `colEndIndex`

- 类型: `number`
- 默认值: 无
- 描述: 合并结束的列索引（仅在 `isMerge` 为 `true` 时有效）。

##### 其他公共配置项，参考上述公共配置项说明

## 更多示例

### 多级表头

通过设置`children`选项可实现多级表头，支持多层级表头。

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

以下是效果图：
![效果图](https://github.com/isamxus/frontend-excelify-assets/blob/da7c158bcc4acf5b80ffabf5773f2c2510799114/%E5%A4%9A%E7%BA%A7%E8%A1%A8%E5%A4%B4%E5%AF%BC%E5%87%BA.png)

### 自定义单元格样式(填充颜色)

通过设置`cells`选项，指定`rowIndex`和`colIndex`可设置单元格样式。

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

以下是效果图：
![效果图](<https://github.com/isamxus/frontend-excelify-assets/blob/193724cab3ecf1cf21ac943b484814340203bc92/%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8C%87%E5%AE%9A%E5%8D%95%E5%85%83%E6%A0%BC%E6%A0%B7%E5%BC%8F(%E5%A1%AB%E5%85%85%E9%A2%9C%E8%89%B2).png>)

### 合并指定单元格

通过设置`isMerge`为 true,并且指定`rowEndIndex`和`colEndIndex`可实现合并单元格

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

以下是效果图：
![效果图](https://github.com/isamxus/frontend-excelify-assets/blob/193724cab3ecf1cf21ac943b484814340203bc92/%E5%90%88%E5%B9%B6%E6%8C%87%E5%AE%9A%E5%8D%95%E5%85%83%E6%A0%BC.png)

### 多个 sheet 导出

`exportExcel`方法的第二个参数传入数组类型可以导出多个 sheet

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

以下是效果图：
![效果图](https://github.com/isamxus/frontend-excelify-assets/blob/ac23633170535500e76764bfe422369d34ff9b0a/%E5%A4%9A%E4%B8%AAsheet%E5%AF%BC%E5%87%BA.png)
