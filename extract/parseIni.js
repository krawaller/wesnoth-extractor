const ini = require("ini");
const pathTempDefRegex = /#define PATH_TEMP\n(.*?)#enddef/;
const pathTempRegex = /{PATH_TEMP}/g;

module.exports = (raw, whitelist, top) => {
  if (!raw) return {};
  const pathTemp = raw.match(pathTempDefRegex);
  if (pathTemp) {
    raw = raw.replace(pathTempRegex, pathTemp[1]);
  }

  let data = ini.parse(raw);
  if (top) {
    data = data[top];
  }

  const ret = {};
  if (whitelist && whitelist.length) {
    for (const prop of whitelist) {
      const val = data[prop];
      ret[prop] =
        val === "null" || val === null
          ? null
          : !isNaN(+val)
          ? +val
          : val
          ? val.replace(/^_ ?["'](.*)["']?$/, "$1")
          : undefined;
    }
  } else {
    return data;
  }
  return ret;
};
