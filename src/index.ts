import { ExportContextType } from "./models/exportOptionModel";
import extendOptions from "./hooks/useExtend";
import useBuildExcel from "./hooks/useBuildExcel";
import { deepCopy } from "./utils/dataUtils";
export function exportExcel(tableName: string, options: ExportContextType) {
  options = deepCopy(options);
  const { buildExcel } = useBuildExcel(tableName, options);
  buildExcel();
}

export default {
  ...extendOptions,
  exportExcel,
};
