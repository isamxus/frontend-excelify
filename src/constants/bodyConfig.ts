import buildNormalBody from "@/strategy/body/buildNormalBody";

export const enum BodyTypeEnum {
  NORMAL = "normal",
}

export const bodyTypeMap = new Map<string, Function>([[BodyTypeEnum.NORMAL, buildNormalBody]]);
