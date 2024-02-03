import buildNormalTable from "@/strategy/table/buildNormalTable";

export const enum TableTypeEnum {
  NORMAL = "normal",
}

export const tableTypeMap = new Map<string, Function>([
  [TableTypeEnum.NORMAL, buildNormalTable],
]);
