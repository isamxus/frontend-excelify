export const enum DataFormatTypeEnum {
  BILLION = "BILLION",
  TEN_THOUSAND = "TEN_THOUSAND",
  NUMBER = "NUMBER",
  PERCENT = "PERCENT",
  YUAN = "YUAN",
}

export const dataFormatTypeList = [
  DataFormatTypeEnum.BILLION,
  DataFormatTypeEnum.NUMBER,
  DataFormatTypeEnum.PERCENT,
  DataFormatTypeEnum.TEN_THOUSAND,
  DataFormatTypeEnum.YUAN,
] as Array<string>;
