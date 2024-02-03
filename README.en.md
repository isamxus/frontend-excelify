# frontend-excelify

`frontend-excelify` is a library designed specifically for front-end development, based on [ExcelJS](https://github.com/exceljs/exceljs), aimed at simplifying the process of exporting from web applications to Excel files. It offers a range of convenient methods and configuration options, making the seamless conversion of front-end data to Excel files more intuitive and efficient.

## Table of Contents

- [frontend-excelify](#frontend-excelify)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Quick Start](#quick-start)

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
