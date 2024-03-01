import { DataFormatTypeEnum, dataFormatTypeList } from '../../constants/dataFormatConfig';
import {
  BodyOptions,
  ColumnItem,
  CommonItemType,
  ExportOptions,
  FormatOptions,
  StyleOptions,
} from '../../models/exportOptionModel';
import { getIndexFormatStringByUnitType } from '../../utils/dataUtils';
import { Cell, Row } from 'exceljs';

function getDefaultConfig(config?: CommonItemType) {
  return Object.assign(
    {
      align: 'center',
      width: 20,
      size: 10,
      bold: true,
      color: 'FFFFFFFF',
      fllType: 'pattern',
      fillPattern: 'solid',
      fillColor: 'FFD3D3D3',
      showBorder: true,
      borderType: 'thin',
      borderColor: 'FF000000',
    },
    config
  );
}

function getDefaultHeaderConfig(column?: ColumnItem) {
  return Object.assign(
    {
      headerAlign: 'center',
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
        color: 'FF000000',
        fillPattern: 'none',
      }),
    },
    body
  );
}

function getDepth(node: ColumnItem, currentDepth = 0): number {
  if (!node.children || node.children.length === 0) {
    return currentDepth + 1;
  }
  return Math.max(...node.children.map((child) => getDepth(child, currentDepth + 1)));
}
function getMaxWidth(node: ColumnItem): number {
  if (!node.children || node.children.length === 0) {
    return 1;
  }
  return node.children.reduce((total, child) => total + getMaxWidth(child), 0);
}

function getMatrix(root: ColumnItem) {
  // 动态计算矩阵的大小
  const maxDepth = getDepth(root);
  const maxWidth = getMaxWidth(root);
  // 初始化矩阵
  const matrix: Array<Array<ColumnItem>> = Array.from({ length: maxDepth }, () => Array(maxWidth).fill('X'));

  function processNode(node: ColumnItem, level: number, position: number) {
    if (level >= maxDepth || position >= maxWidth) return;
    matrix[level][position] = node;
    if (node.children && node.children.length) {
      let offset = position; // 从当前节点的位置开始放置子节点
      node.children.forEach((child) => {
        processNode(child, level + 1, offset);
        offset += getMaxWidth(child); // 更新偏移量为子树的最大宽度
      });
    }
  }

  processNode(root, 0, 0);
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
      vertical: 'middle',
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
  const matrix = getMatrix({ children: columns });
  matrix.shift();
  const headerRowsCount = matrix.length;
  const headerRows: Array<Row> = [];
  const defaultBodyConfig = getDefaultBodyConfig(body);
  const leafNodeList: Array<ColumnItem> = [];
  for (let i = 0; i < headerRowsCount; i++) {
    const rowItem = sheet.addRow([]);
    rowItem.height = defaultBodyConfig.headerRowHeight;
    headerRows.push(rowItem);
  }

  // 收集叶子节点
  for (let col = 0; col < matrix[0].length; col++) {
    let row = matrix.length - 1;
    let cur = matrix[row][col];
    while (cur === ('X' as any) && row >= 0) {
      row--;
      cur = matrix[row][col];
    }
    leafNodeList.push(cur);
  }

  matrix.forEach((item, index) => {
    item.forEach((e: any, v) => {
      if (e === 'X') return;
      const rowItem = headerRows[index];
      const colNumber = v + 1;
      const cell = rowItem.getCell(colNumber);
      const defaultHeaderConfig = getDefaultHeaderConfig(e);
      sheet.getColumn(colNumber).width = defaultHeaderConfig.width;
      cell.value = e.title;
      setCellStyles(cell, defaultHeaderConfig);
      cell.alignment.horizontal = defaultHeaderConfig.headerAlign;
      if (!cell.value) {
        Object.assign(cell.border, {
          diagonal: { down: true, style: 'thin', color: { argb: 'FF000000' } },
        });
      }
    });
  });
  // 纵向合并
  for (let col = 0; col < matrix[0].length; col++) {
    for (let row = matrix.length - 1; row >= 0; row--) {
      if (matrix[row][col] === ('X' as any)) {
        let cur = row - 1;
        while (cur >= 0) {
          if (matrix[cur][col] !== ('X' as any)) {
            const mergeStartIndex = headerRows[cur].number;
            const mergeEndIndex = headerRows[row].number;
            const mergeColIndex = col + 1;
            sheet.mergeCells(mergeStartIndex, mergeColIndex, mergeEndIndex, mergeColIndex);
            for (let start = row; start > cur; start--) {
              matrix[start][col] = 'covered' as any;
            }
            row = cur;
            break;
          }
          cur--;
        }
      }
    }
  }
  // 横向合并
  for (let row = 0; row < headerRowsCount; row++) {
    for (let col = matrix[0].length - 1; col >= 0; col--) {
      if (matrix[row][col] === ('X' as any)) {
        let cur = col - 1;
        while (cur >= 0) {
          if (matrix[row][cur] !== ('X' as any)) {
            const mergeStartIndex = cur + 1;
            const mergeEndIndex = col + 1;
            const mergeRowIndex = headerRows[row].number;
            sheet.mergeCells(mergeRowIndex, mergeStartIndex, mergeRowIndex, mergeEndIndex);
            col = cur;
            break;
          }
          cur--;
        }
      }
    }
  }

  return { leafNodeList };
}

// 格式化单元格值
function getCellValue(context: FormatOptions, value: any) {
  const { formatType, formatter } = context;
  if (formatter) {
    value = formatter(value);
  } else if (formatType && dataFormatTypeList.includes(formatType)) {
    const i = value;
    value = getIndexFormatStringByUnitType(value as number, formatType as DataFormatTypeEnum);
  }
  return value;
}

function buildTableBody(context: ExportOptions, leafNodeList: Array<ColumnItem>) {
  let { sheet, body, data = [], cells = [] } = context;
  const rowItems: Array<Row> = [];
  // 处理常规数据
  data.forEach((item, index) => {
    const row: Array<string | number> = [];
    leafNodeList.forEach((col) => {
      row.push('--');
    });
    const tableItem = sheet.addRow(row);
    rowItems.push(tableItem);
    const defaultBodyConfig = getDefaultBodyConfig(body);
    tableItem.height = defaultBodyConfig.bodyRowHeight;
    tableItem.eachCell({ includeEmpty: true }, (cell, number) => {
      const colItem = leafNodeList[number - 1];
      const { field, showIndex } = colItem;
      const defaultHeaderConfig = getDefaultHeaderConfig(colItem);
      let cellValue: any = showIndex ? index + 1 : null;
      if (field) cellValue = item[field];
      cellValue = getCellValue(colItem, cellValue);
      cell.value = cellValue;
      setCellStyles(cell, defaultBodyConfig);
      cell.alignment.horizontal = defaultHeaderConfig.align || defaultBodyConfig.align;
    });
  });
  // 处理特殊单元格
  cells = Array.isArray(cells) ? cells : [cells];
  rowItems.length &&
    cells.forEach((item) => {
      let { rowIndex, colIndex, field, value, isMerge, rowEndIndex, colEndIndex } = item;
      let cellValue: any;
      const defaultCellConfig = getDefaultBodyConfig(item);
      if (rowIndex !== undefined && rowIndex >= 0) {
        const rowItem = rowItems[rowIndex];
        const rowNumber = rowItem.number;
        if (colIndex === undefined) {
          // 如果只传入行索引
          rowItem.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            const columnItem = leafNodeList[colNumber - 1];
            const key = field || columnItem.field;
            key && (cellValue = data[rowIndex!][key]);
            cell.value = getCellValue(item, cellValue);
            setCellStyles(cell, defaultCellConfig);
          });
          // 如果此时isMerge为true，则合并整行
          isMerge && sheet.mergeCells(rowNumber, 1, rowNumber, leafNodeList.length);
        } else if (colIndex !== undefined && colIndex >= 0) {
          // 如果同时传入行列索引
          if (rowEndIndex !== undefined && rowEndIndex >= rowIndex && colEndIndex === undefined) {
            // 如果只传入行结束索引, 则处理指定列从行开始索引到行结束索引的单元格
            const rows = rowItems.slice(rowIndex, rowEndIndex + 1);
            const rowEndNumber = rowItems[rowEndIndex].number;
            const colNumber = colIndex + 1;
            const columnItem = leafNodeList[colIndex];
            rows.forEach((rowItem, index) => {
              const cell = rowItem.getCell(colNumber);
              const key = field || columnItem.field;
              
              key && (cellValue = data[rowIndex! + index][key]);
              cell.value = getCellValue(item, cellValue);
              setCellStyles(cell, defaultCellConfig);
            });
            isMerge && sheet.mergeCells(rowNumber, colNumber, rowEndNumber, colNumber);
          } else if (colEndIndex !== undefined && colEndIndex >= colIndex && rowEndIndex === undefined) {
            // 如果只传入列结束索引, 则处理指定行从列开始索引到列结束索引的单元格
            rowItem.eachCell({ includeEmpty: true }, (cell, colNumber) => {
              if (colNumber - 1 < colIndex! || colNumber - 1 > colEndIndex!) return;
              const columnItem = leafNodeList[colNumber - 1];
              const key = field || columnItem.field;
              key && (cellValue = data[rowIndex!][key]);
              cell.value = getCellValue(item, cellValue);
              setCellStyles(cell, defaultCellConfig);
            });
            isMerge && sheet.mergeCells(rowNumber, colIndex + 1, rowNumber, colEndIndex + 1);
          } else if (
            colEndIndex !== undefined &&
            colEndIndex >= colIndex &&
            rowEndIndex !== undefined &&
            rowEndIndex >= rowIndex
          ) {
            // 如果同时传入行和列的结束索引
            const rows = rowItems.slice(rowIndex, rowEndIndex + 1);
            const rowEndNumber = rowItems[rowEndIndex].number;
            rows.forEach((rowItem, index) => {
              rowItem.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                if (colNumber - 1 < colIndex! || colNumber - 1 > colEndIndex!) return;
                const columnItem = leafNodeList[colNumber - 1];
                const key = field || columnItem.field;
                key && (cellValue = data[rowIndex! + index][key]);
                cell.value = getCellValue(item, cellValue);
                setCellStyles(cell, defaultCellConfig);
              });
            });
            isMerge && sheet.mergeCells(rowNumber, colIndex + 1, rowEndNumber, colEndIndex + 1);
          } else {
            // 如果既没有行结束索引，又没有列结束索引
            const cell = rowItem.getCell(colIndex);
            const columnItem = leafNodeList[colIndex];
            const key = field || columnItem.field;
            key && (cellValue = data[rowIndex!][key]);
            value && (cellValue = value);
            cell.value = getCellValue(item, cellValue);
            setCellStyles(cell, defaultCellConfig);
          }
        }
      }
    });
}

export default function buildNormalBody(context: ExportOptions) {
  const { leafNodeList } = buildTableHeader(context);
  buildTableBody(context, leafNodeList);
}
