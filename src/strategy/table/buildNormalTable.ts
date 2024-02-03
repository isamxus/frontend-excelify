import { BodyTypeEnum, bodyTypeMap } from "@/constants/bodyConfig";
import { footerTypeMap } from "@/constants/footerConfig";
import { HeaderTypeEnum, headerTypeMap } from "@/constants/headerConfig";
import { sideTypeMap } from "@/constants/sideConfig";
import { ExportOptions } from "@/models/exportOptionModel";

export default function buildNormalTable(context: ExportOptions) {
  const {
    headerType,
    bodyType = BodyTypeEnum.NORMAL,
    sideType,
    footerType,
    name = "normal",
    excelJs,
  } = context;
  const sheet = excelJs.addWorksheet(name);
  const headerFn = headerTypeMap.get(headerType);
  const bodyFn = bodyTypeMap.get(bodyType);
  const sideFn = sideTypeMap.get(sideType);
  const footerFn = footerTypeMap.get(footerType);
  context.sheet = sheet;
  headerFn && headerFn(context);
  bodyFn && bodyFn(context);
  sideFn && sideFn(context);
  footerFn && footerFn(context);
}
