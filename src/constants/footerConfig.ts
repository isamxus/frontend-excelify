import buildNormalFooter from "@/strategy/footer/buildNormalFooter";

export const enum FooterTypeEnum {
  NORMAL = "normal",
}

export const footerTypeMap = new Map<string, Function>([
  [FooterTypeEnum.NORMAL, buildNormalFooter],
]);
