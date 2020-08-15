const path = require("path");
const fs = require("fs-extra");

const readAllUnits = require("./readAllUnits");
const getBase64Images = require("./getBase64Images");

const wesnothRoot = path.join(__dirname, "../wesnoth");

const allById = readAllUnits(wesnothRoot);

const base64 = getBase64Images(wesnothRoot, allById);

const out = path.join(__dirname, "../out");

fs.ensureDirSync(out);

fs.writeFileSync(path.join(out, "base64.json"), JSON.stringify(base64));

const types = {};
for (const unit of Object.values(allById)) {
  for (const atck of unit.attacks) {
    types[atck.range] = true;
  }
}
console.log(
  "TER",
  Object.keys(types)
    .sort()
    .map((t) => `"${t}"`)
    .join(" | ")
);

fs.writeFileSync(path.join(out, "units.json"), JSON.stringify(allById));
