const path = require("path");
const fs = require("fs-extra");
const getUsedImages = require("./getUsedImages");

module.exports = (wesnothRoot, unitsById) => {
  const unitImages = {};
  const imgRoot = path.join(wesnothRoot, "data/core/images");
  const imgPaths = getUsedImages(unitsById);
  for (const imgPath of imgPaths) {
    const file = path.join(imgRoot, imgPath);
    const buffer = fs.readFileSync(file);
    const base64 = `data:image/png;base64,${buffer.toString("base64")}`;
    unitImages[imgPath] = base64;
  }

  const iconImages = {};
  const iconFolder = "images/icons/profiles";
  const iconRoot = path.join(wesnothRoot, iconFolder);
  const icons = fs.readdirSync(iconRoot);
  for (const icon of icons) {
    const iconFullPath = path.join(iconRoot, icon);
    const buffer = fs.readFileSync(iconFullPath);
    const base64 = `data:image/png;base64,${buffer.toString("base64")}`;
    const name = icon.replace(/.png$/, "");
    iconImages[`icons/${name}`] = base64;
  }

  const terrainImages = {};
  const terrainFolder = "images/icons/terrain";
  const terrainRoot = path.join(wesnothRoot, terrainFolder);
  const terrains = fs
    .readdirSync(terrainRoot)
    .filter((t) => !t.match(/-pressed/))
    .filter((t) => t.match(/_30/));
  for (const terrain of terrains) {
    const terrainFullPath = path.join(terrainRoot, terrain);
    const buffer = fs.readFileSync(terrainFullPath);
    const base64 = `data:image/png;base64,${buffer.toString("base64")}`;
    const name = terrain
      .replace(/^terrain_(group|type)_/, "")
      .replace(/_30\.png$/, "");
    terrainImages[`terrain/${name}`] = base64;
  }

  return {
    ...unitImages,
    ...iconImages,
    ...terrainImages,
  };
};
