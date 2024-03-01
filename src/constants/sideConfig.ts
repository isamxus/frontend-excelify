import buildNormalSide from "../strategy/side/buildNormalSide";

export const enum SideTypeEnum {
  NORMAL = "normal",
}

export const sideTypeMap = new Map<string, Function>([[SideTypeEnum.NORMAL, buildNormalSide]]);
