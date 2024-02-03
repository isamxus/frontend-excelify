# frontend-excelify

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
