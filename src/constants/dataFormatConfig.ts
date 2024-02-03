export const enum DataFormatTypeEnum {
  BILLION = "billion",
  TEN_THOUSAND = "ten-thousand",
  NUMBER = "number",
  PERCENT = "percent",
}

export const dataFormatTypeList = [
  DataFormatTypeEnum.BILLION,
  DataFormatTypeEnum.NUMBER,
  DataFormatTypeEnum.PERCENT,
  DataFormatTypeEnum.TEN_THOUSAND,
] as Array<string>;
