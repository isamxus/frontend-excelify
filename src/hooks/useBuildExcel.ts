import { TableTypeEnum, tableTypeMap } from '../constants/tableConfig';
import { ColumnItem, ExportContextType, ExportOptions } from '../models/exportOptionModel';
import { Workbook, Worksheet } from 'exceljs';

export default function useBuildExcel(tableName: string, context: ExportContextType, onlyOneSheet?: boolean) {
  let workbook: Workbook;
  let sheetContext: Worksheet;
  function getDefaultContext() {
    return {
      columnleafNodeTotal: 0,
    };
  }

  function getLeafNodeTotal(data: Array<ColumnItem> = []) {
    const queue = [...data];
    const leafNodes: Array<ColumnItem> = [];
    while (queue.length) {
      const node = queue.shift()!;
      if (!node.children || (node.children && !node.children.length)) {
        leafNodes.push(node);
      }
      if (node.children && node.children.length) {
        queue.push(...node.children);
      }
    }
    return leafNodes.length;
  }

  function handleItem(item: ExportOptions) {
    const {
      tableType = TableTypeEnum.NORMAL,
      beforeExport,
      name = 'normal',
      columns,
      context = getDefaultContext(),
    } = item;
    const sheet = onlyOneSheet ? sheetContext : workbook.addWorksheet(name);
    context.columnleafNodeTotal = getLeafNodeTotal(columns);
    item.excelJs = workbook;
    item.sheet = sheet;
    item.context = context;
    const useTableFn = tableTypeMap.get(tableType);
    if (useTableFn) useTableFn(item);
    if (beforeExport && typeof beforeExport === 'function') {
      beforeExport(item);
    }
  }

  function handleContext() {
    if (!Array.isArray(context)) {
      context = [context];
    }
    onlyOneSheet && (sheetContext = workbook.addWorksheet(tableName));
    context.forEach((item) => {
      handleItem(item as ExportOptions);
    });
  }

  function exportFile() {
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = URL.createObjectURL(blob);

      // 创建一个临时的a标签来触发下载
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = tableName; // 文件名
      document.body.appendChild(downloadLink);
      downloadLink.click();

      // 清理
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    });
  }

  function buildExcel() {
    import('exceljs').then((res) => {
      const ExcelJS = res;
      workbook = new ExcelJS.Workbook();
      handleContext();
      exportFile();
    });
  }
  return {
    buildExcel,
  };
}
