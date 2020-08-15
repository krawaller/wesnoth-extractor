const fs = require("fs-extra");
const convertUnit = require("./convertUnit");

module.exports = (unitPath) => {
  const raw = fs.readFileSync(unitPath).toString();
  return convertUnit(raw);
};
