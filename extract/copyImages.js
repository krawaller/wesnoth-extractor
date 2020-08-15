const path = require("path");
const fs = require("fs-extra");
const getUsedImages = require("./getUsedImages");

module.exports = (out, wesnothRoot, unitsById) => {
  const imgRoot = path.join(wesnothRoot, "data/core/images");

  const imgPaths = getUsedImages(unitsById);

  for (const imgPath of imgPaths) {
    const file = path.join(imgRoot, imgPath);
    const target = path.join(out, imgPath);
    fs.ensureDirSync(target.replace(/\/[^/]*$/, ""));
    fs.copyFileSync(file, target);
  }
};
