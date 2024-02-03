import { bodyTypeMap } from "@/constants/bodyConfig";
import { footerTypeMap } from "@/constants/footerConfig";
import { headerTypeMap } from "@/constants/headerConfig";
import { sideTypeMap } from "@/constants/sideConfig";
import { tableTypeMap } from "@/constants/tableConfig";
import { ExportOptions } from "@/models/exportOptionModel";

function useExtend(map: Map<string, Function>) {
  function before(type: string, fn: (context: ExportOptions) => any) {
    const strategy = map.get(type);
    if (strategy) {
      map.set(type, (context: ExportOptions) => {
        fn(context);
        strategy(context);
      });
    }
  }
  function after(type: string, fn: (context: ExportOptions) => any) {
    const strategy = map.get(type);
    if (strategy) {
      map.set(type, (context: ExportOptions) => {
        strategy(context);
        return fn(context);
      });
    }
  }
  function extend(type: string, fn: (context: ExportOptions) => any) {
    map.set(type, fn);
  }
  return {
    before,
    after,
    extend,
  };
}

export default {
  header: useExtend(headerTypeMap),
  body: useExtend(bodyTypeMap),
  footer: useExtend(footerTypeMap),
  side: useExtend(sideTypeMap),
  table: useExtend(tableTypeMap),
};
