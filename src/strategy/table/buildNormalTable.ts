import { BodyTypeEnum, bodyTypeMap } from '../../constants/bodyConfig';
import { footerTypeMap } from '../../constants/footerConfig';
import { headerTypeMap } from '../../constants/headerConfig';
import { sideTypeMap } from '../../constants/sideConfig';
import { ExportParamsType } from '../../models/exportOptionModel';

export default function buildNormalTable(context: ExportParamsType) {
  const { headerType, bodyType = BodyTypeEnum.NORMAL, sideType, footerType } = context;

  const headerFn = headerTypeMap.get(headerType!);
  const bodyFn = bodyTypeMap.get(bodyType!);
  const sideFn = sideTypeMap.get(sideType!);
  const footerFn = footerTypeMap.get(footerType!);

  headerFn && headerFn(context);
  bodyFn && bodyFn(context);
  sideFn && sideFn(context);
  footerFn && footerFn(context);
}
