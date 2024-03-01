import { isNumber as _isNumber, commafy, toNumber } from 'xe-utils';
import { DataFormatTypeEnum } from '../constants/dataFormatConfig';
import { CurrencyFormatOption } from '../models/dataFormatModel';

// 千分号符号
export const THOUSAND_SEPARATOR = ',';

/**
 * 判断是否数字
 */
export function isNumber(value: any) {
  return _isNumber(value);
}
/**
 * 格式化小数位
 */
export function toFixedString(value: number, digits: number, round = true): string {
  const options = {
    digits: digits,
    round: round,
  };
  const stringValue = commafy(value, options);
  return stringValue.replaceAll(',', '');
}
/**
 * 格式化小数位
 */
export function toFixedNumber(value: number, digits: number, round = true): number {
  const stringValue = toFixedString(value, digits, round);
  return toNumber(stringValue);
}
/**
 * 换算为万元
 */
export function converToTenThousandYuan(value: number, digits: number, round = true): number {
  return toFixedNumber(value / 10000, digits, round);
}

/**
 * 换算为亿元
 */
export function convertToBillionYuan(value: number, digits: number, round = true): number {
  return toFixedNumber(value / 100000000, digits, round);
}

/**
 * 转换为百分比数值
 */
export function convertToPercent(value: number, digits: number, round = true): number {
  return toFixedNumber(value / 0.01, digits, round);
}

/**
 * 格式化货币
 */
export function formatToCurrencyString(value: number, options: CurrencyFormatOption): string {
  if (isNaN(value)) {
    return options.defaultString || '';
  }
  const numberValue = value;
  const commafyOptions = {
    separator: THOUSAND_SEPARATOR,
    digits: options.digits,
    round: options.round,
  };
  let resultString = commafy(numberValue, commafyOptions);
  // 不显示千分位则移除
  if (!options.thousandth) {
    resultString = resultString.replaceAll(THOUSAND_SEPARATOR, '');
  }
  return resultString;
}

/**
 * 根据单位获转换显示的数值(把元转换为换算单位对应的值)
 */
export function getIndexConvertValueByUnitType(
  originalValue: number,
  convertUnitType: string = DataFormatTypeEnum.BILLION,
  digits = 2,
  round = true
): number {
  let convertValue = originalValue;
  if (!isNumber(originalValue)) {
    return convertValue;
  }
  switch (convertUnitType) {
    // 万元
    case DataFormatTypeEnum.TEN_THOUSAND:
      convertValue = converToTenThousandYuan(convertValue, digits, round);
      break;
    // 亿元
    case DataFormatTypeEnum.BILLION:
      convertValue = convertToBillionYuan(convertValue, digits, round);
      break;
    // 百分比
    case DataFormatTypeEnum.PERCENT:
      convertValue = convertToPercent(convertValue, digits, round);
      break;
    default:
      break;
  }
  return convertValue;
}

/**
 * 根据单位获取转换显示的格式(把元转换为换算单位对应的值)
 */
export function getIndexFormatStringByUnitType(originalValue: number, convertUnitType: DataFormatTypeEnum): string {
  const options = {
    thousandth: true,
    digits: 2,
    round: true,
    defaultString: '--',
  };
  // 非数字显示
  if (isNaN(originalValue) || originalValue === null) {
    return options.defaultString || '';
  }
  // 个数不显示小数位
  if (convertUnitType === DataFormatTypeEnum.NUMBER) {
    options.digits = 0;
  }
  // 换算值
  const convertValue = getIndexConvertValueByUnitType(originalValue, convertUnitType, options.digits);
  // 格式化显示值
  const formatString = formatToCurrencyString(convertValue, options);
  // 百分比
  if (convertUnitType === DataFormatTypeEnum.PERCENT) {
    return `${formatString}%`;
  }
  return formatString;
}

/**
 *  对象深拷贝
 */
export function deepCopy(sourceData: any): any {
  if (sourceData === null || typeof sourceData === 'undefined' || typeof sourceData !== 'object') {
    return sourceData;
  }
  if (Array.isArray(sourceData)) {
    const newArray: Array<any> = [];
    sourceData.forEach((item: any) => {
      if (typeof item === 'object') {
        newArray.push(deepCopy(item));
      } else {
        newArray.push(item);
      }
    });
    return newArray;
  }
  const newObj: any = {};
  Object.keys(sourceData).forEach((key: string) => {
    if (typeof sourceData[key] === 'object') {
      newObj[key] = deepCopy(sourceData[key]);
    } else {
      newObj[key] = sourceData[key];
    }
  });
  return newObj;
}
