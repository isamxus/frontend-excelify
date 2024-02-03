import {
  DataFormatTypeEnum,
  dataFormatTypeList,
} from "@/constants/dataFormatConfig";
import {
  BodyOptions,
  ColumnItem,
  CommonItemType,
  ExportOptions,
  FormatOptions,
  StyleOptions,
} from "@/models/exportOptionModel";
import { getIndexFormatStringByUnitType } from "@/utils/dataUtils";
import { Cell, Row } from "exceljs";

function getDefaultConfig(config?: CommonItemType) {
  return Object.assign(
    {
      align: "center",
      width: 20,
      size: 10,
      bold: true,
      color: "FFFFFFFF",
      fllType: "pattern",
      fillPattern: "solid",
      fillColor: "FFD3D3D3",
      showBorder: true,
      borderType: "thin",
      borderColor: "FF000000",
    },
    config
  );
}

function getDefaultHeaderConfig(column?: ColumnItem) {
  return Object.assign(
    {
      headerAlign: "center",
      ...getDefaultConfig(),
    },
    column
  );
}

function getDefaultBodyConfig(body?: BodyOptions) {
  return Object.assign(
    {
      headerRowHeight: 30,
      bodyRowHeight: 20,
      ...getDefaultConfig({
        bold: false,
        showBorder: false,
        color: "FF000000",
        fillPattern: "none",
      }),
    },
    body
  );
}

function getDepth(data: Array<any>) {
  if (!data.length) return 0;
  return Math.max(...data.map((item) => getDepth(item.children || []))) + 1;
}

function getMatrix(root: ColumnItem) {
  const queue = [root, "end"];
  const matrix: Array<Array<ColumnItem>> = [[]];
  while (queue.length > 1) {
    const node = queue.shift() as any;
    if (node === "end") {
      matrix.push([]);
      queue.push("end");
      continue;
    }
    matrix[matrix.length - 1].push(node);
    if (node.children && node.children.length) {
      queue.push(...node.children);
      matrix[matrix.length - 1].push(
        ...new Array(node.children.length - 1).fill("X")
      );
    }
  }
  return matrix;
}

function setCellStyles(cell: Cell, styles: StyleOptions) {
  const assignStyles = {
    font: {
      bold: styles.bold,
      size: styles.size,
      color: { argb: styles.color },
    },
    fill: {
      type: styles.fllType,
      pattern: styles.fillPattern,
      fgColor: { argb: styles.fillColor },
    },
    alignment: {
      vertical: "middle",
      horizontal: styles.align,
    },
  };
  if (styles.showBorder) {
    Object.assign(assignStyles, {
      border: {
        top: {
          style: styles.borderType,
          color: { argb: styles.borderColor },
        }, // 黑色边框
        left: {
          style: styles.borderType,
          color: { argb: styles.borderColor },
        },
        bottom: {
          style: styles.borderType,
          color: { argb: styles.borderColor },
        },
        right: {
          style: styles.borderType,
          color: { argb: styles.borderColor },
        },
      },
    });
  }
  Object.assign(cell, assignStyles);
}

function buildTableHeader(context: ExportOptions) {
  const { sheet, columns = [], body } = context;

  // 表头处理逻辑
  const headerRowsCount = getDepth(columns);
  const headerRows: Array<Row> = [];
  const defaultBodyConfig = getDefaultBodyConfig(body);
  const leafNodeList: Array<ColumnItem> = [];
  let startIndex = 1;
  let endIndex = 1;

  for (let i = 0; i < headerRowsCount; i++) {
    const rowItem = sheet.addRow([]);
    rowItem.height = defaultBodyConfig.headerRowHeight;
    headerRows.push(rowItem);
  }

  columns.forEach((item) => {
    const matrix = getMatrix(item);
    const maxWidth = Math.max(...matrix.map((item) => item.length));
    if (matrix.length) {
      matrix[0].push(...new Array(maxWidth - matrix[0].length).fill("X"));
      leafNodeList.push(...matrix[matrix.length - 1].map((item) => item));
    }
    endIndex += maxWidth;
    matrix.forEach((item, index) => {
      item.forEach((e, v) => {
        const rowItem = headerRows[index];
        const colNumber = startIndex + v;
        const cell = rowItem.getCell(colNumber);
        const defaultHeaderConfig = getDefaultHeaderConfig(e);
        sheet.getColumn(colNumber).width = defaultHeaderConfig.width;
        cell.value = e.title;
        setCellStyles(cell, defaultHeaderConfig);
        cell.alignment.horizontal = defaultHeaderConfig.headerAlign;
      });
    });

    // 纵向合并
    const mergeRows = headerRowsCount - matrix.length;
    if (mergeRows) {
      const mergeNumber = headerRows[headerRows.length - 1].number;
      for (let i = startIndex; i < endIndex; i++) {
        sheet.mergeCells(mergeNumber, i, mergeNumber - mergeRows, i);
      }
    }
    // 横向合并
    matrix.forEach((item, index) => {
      let start = startIndex,
        end = startIndex;
      const rowNumber = headerRows[index].number;
      if (item.includes("X" as any)) {
        item.forEach((e, v) => {
          if (v === 0 || e === ("X" as any)) return (end += 1);
          sheet.mergeCells(rowNumber, start, rowNumber, end - 1);
          end += 1;
          start = end - 1;
        });
        sheet.mergeCells(rowNumber, start, rowNumber, end - 1);
      }
    });

    startIndex = endIndex;
  });
  return { leafNodeList };
}

// 格式化单元格值
function getCellValue(context: FormatOptions, value: any) {
  const { formatType, formatter } = context;
  if (formatter) {
    value = formatter(value);
  } else if (formatType && dataFormatTypeList.includes(formatType)) {
    value = getIndexFormatStringByUnitType(
      value as number,
      formatType as DataFormatTypeEnum
    );
  }
  return value;
}

function buildTableBody(
  context: ExportOptions,
  leafNodeList: Array<ColumnItem>
) {
  let { sheet, body, data = [], cells = [] } = context;
  const rowItems: Array<Row> = [];
  // 处理常规数据
  data.forEach((item) => {
    const row = [];
    leafNodeList.forEach((col) => {
      row.push("--");
    });
    const tableItem = sheet.addRow(row);
    rowItems.push(tableItem);
    const defaultBodyConfig = getDefaultBodyConfig(body);
    tableItem.height = defaultBodyConfig.bodyRowHeight;
    tableItem.eachCell((cell, number) => {
      const colItem = leafNodeList[number - 1];
      const { field } = colItem;
      const defaultHeaderConfig = getDefaultHeaderConfig(colItem);
      let value: any;
      if (field) value = item[field];
      value = getCellValue(colItem, value);
      cell.value = value;
      setCellStyles(cell, defaultBodyConfig);
      cell.alignment.horizontal =
        defaultHeaderConfig.align || defaultBodyConfig.align;
    });
  });

  // 处理特殊单元格
  cells = Array.isArray(cells) ? cells : [cells];
  cells.forEach((item) => {
    const {
      rowIndex = 0,
      colIndex = 0,
      field,
      isMerge,
      rowEndIndex = 0,
      colEndIndex = 0,
    } = item;
    if (rowItems.length && rowIndex > -1 && colIndex > -1) {
      const rowItem = rowItems[rowIndex];
      const rowNumber = rowItem.number;
      const cell = rowItem.getCell(colIndex + 1);
      const defaultCellConfig = getDefaultBodyConfig(item);
      let value: any;
      if (field) value = data[rowIndex][field];
      value = getCellValue(item, value);
      cell.value = value;
      setCellStyles(cell, defaultCellConfig);
      if (isMerge && rowEndIndex >= rowIndex && colEndIndex >= colIndex) {
        sheet.mergeCells(
          rowNumber + rowIndex,
          colIndex + 1,
          rowNumber + rowEndIndex,
          colEndIndex + 1
        );
      }
    }
  });
}

export default function buildNormalBody(context: ExportOptions) {
  const { leafNodeList } = buildTableHeader(context);
  buildTableBody(context, leafNodeList);
}
