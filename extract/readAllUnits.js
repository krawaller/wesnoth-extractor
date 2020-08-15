const fs = require("fs-extra");
const path = require("path");
const readUnitFolder = require("./readUnitFolder");

module.exports = (wesnothRoot) => {
  const raceRoot = path.join(wesnothRoot, "data/core/units");
  return (races = fs
    .readdirSync(raceRoot)
    .filter(
      (race) => race !== ".DS_Store" && race !== "boats" && race !== "fake"
    )
    .map((race) => readUnitFolder(path.join(raceRoot, race)))
    .reduce((all, raceById) => ({ ...all, ...raceById }), {}));
};
