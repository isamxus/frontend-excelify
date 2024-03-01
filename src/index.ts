import { ExportContextType } from './models/exportOptionModel';
import extendOptions from './hooks/useExtend';
import useBuildExcel from './hooks/useBuildExcel';
import { deepCopy } from './utils/dataUtils';
export function exportExcel(tableName: string, options: ExportContextType, onlyOneSheet?: boolean) {
  options = deepCopy(options);
  const { buildExcel } = useBuildExcel(tableName, options, onlyOneSheet);
  buildExcel();
}

export default {
  ...extendOptions,
  exportExcel,
};
