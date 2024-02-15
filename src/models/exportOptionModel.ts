import { BorderStyle, FillPatterns, Workbook, Worksheet } from "exceljs";

export type Arrayable<T> = T | T[];

export type ExportContextType = Arrayable<ExportOptions>;

export type CommonItemType = StyleOptions & FormatOptions;

export interface FormatOptions {
  // 对应数据项字段
  field?: string;
  // 格式化类型
  formatType?: string;
  // 格式化函数
  formatter?: (value: any) => any;
}

// 样式配置
export interface StyleOptions {
  color?: string;
  width?: number;
  height?: number;
  size?: number;
  align?: "center" | "left" | "right";
  bold?: boolean;
  fllType?: string;
  fillPattern?: FillPatterns;
  fillColor?: string;
  showBorder?: boolean;
  borderType?: BorderStyle;
  borderColor?: string;
}

// 单元格项配置
export interface CellItem extends CommonItemType {
  // 行索引
  rowIndex?: number;
  // 列索引
  colIndex?: number;
  // 是否合并
  isMerge?: boolean;
  // 合并结束行索引
  rowEndIndex?: number;
  // 合并结束列索引
  colEndIndex?: number;
}
// 列项配置
export interface ColumnItem extends CommonItemType {
  // 标题
  title?: string;
  // 多级表头
  children?: Array<ColumnItem>;
  // 表头单元格对齐方式
  headerAlign?: "center" | "left" | "right";
}

// 表格头部配置
export interface HeaderOptions extends CommonItemType {}

// 表格表体配置
export interface BodyOptions extends CommonItemType {
  // 表体头部行高
  headerRowHeight?: number;
  // 表体行高
  bodyRowHeight?: number;
}

// 表格侧边配置
export interface SideOptions extends CommonItemType {
  // 位置
  position?: "left" | "right";
}

// 表格底部配置
export interface FooterOptions extends CommonItemType {}

// 导出配置
export interface ExportOptions {
  // excelJs上下文
  excelJs?: Workbook;
  // 工作表上下文
  sheet?: Worksheet;
  // sheet页签名
  name?: string;
  // 头部配置
  header?: HeaderOptions;
  // 侧边配置
  side?: SideOptions;
  // 表体配置
  body?: BodyOptions;
  // 底部配置
  footer?: FooterOptions;
  // 列配置
  columns?: Array<ColumnItem>;
  // 单元格配置
  cells?: Arrayable<CellItem>;
  // 数据源
  data?: Array<any>;
  // 表头类型
  headerType?: string;
  // 表体类型
  bodyType?: string;
  // 侧边栏类型
  sideType?: string;
  // 表格底部类型
  footerType?: string;
  // 表格类型
  tableType?: string;
  // 导出前处理
  beforeExport?: (options: ExportOptions) => any;
}
