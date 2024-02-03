import {
  ColumnItem,
  ExportOptions,
  HeaderOptions,
} from "@/models/exportOptionModel";

function getDefaultConfig(header?: HeaderOptions) {
  return Object.assign(
    {
      height: 30,
      size: 16,
      bold: true,
      align: "center",
    },
    header
  );
}
function getAllLeafNodes(data: Array<ColumnItem>) {
  const queue = [...data];
  const leafNodes: Array<ColumnItem> = [];
  while (queue.length) {
    const node = queue.shift();
    if (!node.children || (node.children && !node.children.length)) {
      leafNodes.push(node);
    }
    if (node.children && node.children.length) {
      queue.push(...node.children);
    }
  }
  return leafNodes.length;
}
export default function buildNormalHeader(context: ExportOptions) {
  const { sheet, name, header, columns = [] } = context;
  const defaultConfig = getDefaultConfig(header);
  const mergeCols = getAllLeafNodes(columns) || 1;
  const headerTitleRow = sheet.addRow([name]);
  headerTitleRow.height = defaultConfig.height;
  headerTitleRow.font = {
    size: defaultConfig.size,
    bold: defaultConfig.bold,
  };
  headerTitleRow.alignment = {
    vertical: "middle",
    horizontal: defaultConfig.align,
  };
  sheet.mergeCells(1, 1, 1, mergeCols);
}
