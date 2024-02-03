// tests/hooks/useExtend.spec.ts
import { expect } from "chai";
import sinon from "sinon";
import useExtend from "@/hooks/useExtend";
import { headerTypeMap } from "@/constants/headerConfig";
import { bodyTypeMap } from "@/constants/bodyConfig";
import { footerTypeMap } from "@/constants/footerConfig";
import { sideTypeMap } from "@/constants/sideConfig";
import { tableTypeMap } from "@/constants/tableConfig";

describe("useExtend Interfaces with real Maps - Header Interface", () => {
  // 保存原始Map对象的副本
  let originalMaps: any = {};

  beforeEach(() => {
    // 备份原始Map对象
    originalMaps.headerTypeMap = new Map(headerTypeMap);
  });

  afterEach(() => {
    // Clear the map first
    headerTypeMap.clear();
    // Repopulate it with the original values
    originalMaps.headerTypeMap.forEach((value, key) => {
      headerTypeMap.set(key, value);
    });
  });

  describe("header interface", () => {
    it("should add a new strategy using extend", () => {
      const { header } = useExtend;
      const testFn = () => {};
      header.extend("testType", testFn);

      expect(headerTypeMap.has("testType")).to.be.true;
      expect(headerTypeMap.get("testType")).to.equal(testFn);
    });

    it("should prepend a function using before", () => {
      const { header } = useExtend;
      const initialFn = sinon.fake();
      const beforeFn = sinon.fake();
      headerTypeMap.set("testType", initialFn);

      header.before("testType", beforeFn);
      const resultFn = headerTypeMap.get("testType");

      resultFn({}); // 假设的ExportOptions对象
      sinon.assert.calledOnce(beforeFn);
      sinon.assert.calledOnce(initialFn);
      sinon.assert.callOrder(beforeFn, initialFn);
    });

    it("should append a function using after", () => {
      const { header } = useExtend;
      const initialFn = sinon.fake();
      const afterFn = sinon.fake();
      headerTypeMap.set("testType", initialFn);

      header.after("testType", afterFn);
      const resultFn = headerTypeMap.get("testType");

      resultFn({}); // 假设的ExportOptions对象
      sinon.assert.calledOnce(afterFn);
      sinon.assert.calledOnce(initialFn);
      sinon.assert.callOrder(initialFn, afterFn);
    });
  });
});

describe("useExtend Interfaces with real Maps - Body Interface", () => {
  let originalMaps: any = {};

  beforeEach(() => {
    // Assuming bodyTypeMap is imported or defined somewhere
    originalMaps.bodyTypeMap = new Map(bodyTypeMap);
  });

  afterEach(() => {
    bodyTypeMap.clear();
    originalMaps.bodyTypeMap.forEach((value, key) => {
      bodyTypeMap.set(key, value);
    });
  });

  describe("body interface", () => {
    it("should add a new strategy using extend", () => {
      const { body } = useExtend;
      const testFn = () => {};
      body.extend("testType", testFn);

      expect(bodyTypeMap.has("testType")).to.be.true;
      expect(bodyTypeMap.get("testType")).to.equal(testFn);
    });

    it("should prepend a function using before", () => {
      const { body } = useExtend;
      const initialFn = sinon.fake();
      const beforeFn = sinon.fake();
      bodyTypeMap.set("testType", initialFn);

      body.before("testType", beforeFn);
      const resultFn = bodyTypeMap.get("testType");

      resultFn({}); // Assuming an ExportOptions object
      sinon.assert.calledOnce(beforeFn);
      sinon.assert.calledOnce(initialFn);
      sinon.assert.callOrder(beforeFn, initialFn);
    });

    it("should append a function using after", () => {
      const { body } = useExtend;
      const initialFn = sinon.fake();
      const afterFn = sinon.fake();
      bodyTypeMap.set("testType", initialFn);

      body.after("testType", afterFn);
      const resultFn = bodyTypeMap.get("testType");

      resultFn({}); // Assuming an ExportOptions object
      sinon.assert.calledOnce(afterFn);
      sinon.assert.calledOnce(initialFn);
      sinon.assert.callOrder(initialFn, afterFn);
    });
  });
});

describe("useExtend Interfaces with real Maps - Footer Interface", () => {
  let originalMaps: any = {};

  beforeEach(() => {
    // Assuming footerTypeMap is imported or defined somewhere
    originalMaps.footerTypeMap = new Map(footerTypeMap);
    footerTypeMap.clear();
  });

  afterEach(() => {
    footerTypeMap.clear();
    originalMaps.footerTypeMap.forEach((value, key) => {
      footerTypeMap.set(key, value);
    });
  });

  describe("footer interface", () => {
    it("should add a new strategy using extend", () => {
      const { footer } = useExtend;
      const testFn = () => {};
      footer.extend("testType", testFn);

      expect(footerTypeMap.has("testType")).to.be.true;
      expect(footerTypeMap.get("testType")).to.equal(testFn);
    });

    it("should prepend a function using before", () => {
      const { footer } = useExtend;
      const initialFn = sinon.fake();
      const beforeFn = sinon.fake();
      footerTypeMap.set("testType", initialFn);

      footer.before("testType", beforeFn);
      const resultFn = footerTypeMap.get("testType");

      resultFn({}); // Assuming an ExportOptions object
      sinon.assert.calledOnce(beforeFn);
      sinon.assert.calledOnce(initialFn);
      sinon.assert.callOrder(beforeFn, initialFn);
    });

    it("should append a function using after", () => {
      const { footer } = useExtend;
      const initialFn = sinon.fake();
      const afterFn = sinon.fake();
      footerTypeMap.set("testType", initialFn);

      footer.after("testType", afterFn);
      const resultFn = footerTypeMap.get("testType");

      resultFn({}); // Assuming an ExportOptions object
      sinon.assert.calledOnce(afterFn);
      sinon.assert.calledOnce(initialFn);
      sinon.assert.callOrder(initialFn, afterFn);
    });
  });
});

describe("useExtend Interfaces with real Maps - Side Interface", () => {
  let originalMaps: any = {};

  beforeEach(() => {
    // Assuming sideTypeMap is imported or defined somewhere
    originalMaps.sideTypeMap = new Map(sideTypeMap);
    sideTypeMap.clear();
  });

  afterEach(() => {
    sideTypeMap.clear();
    originalMaps.sideTypeMap.forEach((value, key) => {
      sideTypeMap.set(key, value);
    });
  });

  describe("side interface", () => {
    it("should add a new strategy using extend", () => {
      const { side } = useExtend;
      const testFn = () => {};
      side.extend("testType", testFn);

      expect(sideTypeMap.has("testType")).to.be.true;
      expect(sideTypeMap.get("testType")).to.equal(testFn);
    });

    it("should prepend a function using before", () => {
      const { side } = useExtend;
      const initialFn = sinon.fake();
      const beforeFn = sinon.fake();
      sideTypeMap.set("testType", initialFn);

      side.before("testType", beforeFn);
      const resultFn = sideTypeMap.get("testType");

      resultFn({}); // Assuming an ExportOptions object
      sinon.assert.calledOnce(beforeFn);
      sinon.assert.calledOnce(initialFn);
      sinon.assert.callOrder(beforeFn, initialFn);
    });

    it("should append a function using after", () => {
      const { side } = useExtend;
      const initialFn = sinon.fake();
      const afterFn = sinon.fake();
      sideTypeMap.set("testType", initialFn);

      side.after("testType", afterFn);
      const resultFn = sideTypeMap.get("testType");

      resultFn({}); // Assuming an ExportOptions object
      sinon.assert.calledOnce(afterFn);
      sinon.assert.calledOnce(initialFn);
      sinon.assert.callOrder(initialFn, afterFn);
    });
  });
});

describe("useExtend Interfaces with real Maps - Table Interface", () => {
  let originalMaps: any = {};

  beforeEach(() => {
    // Assuming tableTypeMap is imported or defined somewhere
    originalMaps.tableTypeMap = new Map(tableTypeMap);
    tableTypeMap.clear();
  });

  afterEach(() => {
    tableTypeMap.clear();
    originalMaps.tableTypeMap.forEach((value, key) => {
      tableTypeMap.set(key, value);
    });
  });

  describe("table interface", () => {
    it("should add a new strategy using extend", () => {
      const { table } = useExtend;
      const testFn = () => {};
      table.extend("testType", testFn);

      expect(tableTypeMap.has("testType")).to.be.true;
      expect(tableTypeMap.get("testType")).to.equal(testFn);
    });

    it("should prepend a function using before", () => {
      const { table } = useExtend;
      const initialFn = sinon.fake();
      const beforeFn = sinon.fake();
      tableTypeMap.set("testType", initialFn);

      table.before("testType", beforeFn);
      const resultFn = tableTypeMap.get("testType");

      resultFn({}); // Assuming an ExportOptions object
      sinon.assert.calledOnce(beforeFn);
      sinon.assert.calledOnce(initialFn);
      sinon.assert.callOrder(beforeFn, initialFn);
    });

    it("should append a function using after", () => {
      const { table } = useExtend;
      const initialFn = sinon.fake();
      const afterFn = sinon.fake();
      tableTypeMap.set("testType", initialFn);

      table.after("testType", afterFn);
      const resultFn = tableTypeMap.get("testType");

      resultFn({}); // Assuming an ExportOptions object
      sinon.assert.calledOnce(afterFn);
      sinon.assert.calledOnce(initialFn);
      sinon.assert.callOrder(initialFn, afterFn);
    });
  });
});
