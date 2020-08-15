const fs = require("fs-extra");
const path = require("path");
const readUnit = require("./readUnit");

module.exports = (racePath) => {
  const unitPaths = fs.readdirSync(racePath).filter((u) => u !== ".DS_Store");
  const ret = {};
  for (const unitPath of unitPaths) {
    const unitData = readUnit(path.join(racePath, unitPath));
    if (unitData.id && unitData.image) {
      ret[unitData.id] = unitData;
    }
  }
  return ret;
};
