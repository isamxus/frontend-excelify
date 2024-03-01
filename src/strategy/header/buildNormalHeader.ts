import { ColumnItem, ExportOptions, HeaderOptions } from '../../models/exportOptionModel';

function getDefaultConfig(header?: HeaderOptions) {
  return Object.assign(
    {
      height: 30,
      size: 16,
      bold: true,
      align: 'center',
    },
    header
  );
}

export default function buildNormalHeader(context: ExportOptions) {
  const { sheet, name, header, context: contextInfo } = context;
  const defaultConfig = getDefaultConfig(header);
  const mergeCols = contextInfo.columnleafNodeTotal || 1;
  const headerTitleRow = sheet.addRow([name]);
  const headerTitleRowNumber = headerTitleRow.number;
  headerTitleRow.height = defaultConfig.height;
  headerTitleRow.font = {
    size: defaultConfig.size,
    bold: defaultConfig.bold,
  };
  headerTitleRow.alignment = {
    vertical: 'middle',
    horizontal: defaultConfig.align,
  };
  sheet.mergeCells(headerTitleRowNumber, 1, headerTitleRowNumber, mergeCols);
}
