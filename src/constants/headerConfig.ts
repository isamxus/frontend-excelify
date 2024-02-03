import buildNormalHeader from "@/strategy/header/buildNormalHeader";

export const enum HeaderTypeEnum {
  NORMAL = "normal",
}

export const headerTypeMap = new Map<string, Function>([
  [HeaderTypeEnum.NORMAL, buildNormalHeader],
]);
