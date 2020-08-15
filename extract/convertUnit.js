const parseIni = require("./parseIni");

const atkRegex = /\[attack\][\s\S]*?\[\/attack\]/g;
const abilitiesRegex = /\[abilities\][\s\S]*?\[\/abilities\]/;
const atkAnimRegex = /\[attack_anim\][\s\S]*?\[\/attack_anim\]/g;
const idleAnimRegex = /\[idle_anim\][\s\S]*?\[\/idle_anim\]/g;
const movementAnimRegex = /\[movement_anim\][\s\S]*?\[\/movement_anim\]/g;
const femaleRegex = /\[female_anim\][\s\S]*?\[\/female_anim\]/g;
const drawWeaponAnimRegex = /\[draw_weapon_anim\][\s\S]*?\[\/draw_weapon_anim\]/g;
const sheathWeaponAnimRegex = /\[sheath_weapon_anim\][\s\S]*?\[\/sheath_weapon_anim\]/g;
const resistanceRegex = /\[resistance\][\s\S]*?\[\/resistance\]/g;
const defenseRegex = /\[defense\][\s\S]*?\[\/defense\]/g;
const variationRegex = /\[variation\][\s\S]*?\[\/variation\]/g;
const standingAnimRegex = /\[standing_anim\][\s\S]*?\[\/standing_anim\]/g;
const deathRegex = /\[death\][\s\S]*?\[\/death\]/g;

module.exports = (unitcfg) => {
  const stripped = unitcfg
    .replace(atkRegex, "")
    .replace(atkAnimRegex, "")
    .replace(idleAnimRegex, "")
    .replace(femaleRegex, "")
    .replace(movementAnimRegex, "")
    .replace(drawWeaponAnimRegex, "")
    .replace(sheathWeaponAnimRegex, "")
    .replace(abilitiesRegex, "")
    .replace(variationRegex, "")
    .replace(standingAnimRegex, "")
    .replace(deathRegex, "");
  const data = parseIni(
    stripped,
    [
      "id",
      "name",
      "race",
      "image",
      "hitpoints",
      "movement_type",
      "movement",
      "experience",
      "level",
      "alignment",
      "advances_to",
      "cost",
      "usage",
      "description",
    ],
    "unit_type"
  );

  const notes = (stripped.match(/\{NOTE_[^}]*}/g) || [])
    .map((s) => s.replace(/^\{NOTE_|}$/g, ""))
    .map((s) => s.toLowerCase());
  data.notes = notes;

  const abilities = (
    (unitcfg.match(abilitiesRegex) || [""])[0].match(/\{ABILITY_[^}]*}/g) || []
  )
    .map((s) => s.replace(/^\{ABILITY_|}$/g, ""))
    .map((s) => s.toLowerCase());
  data.abilities = abilities;

  data.attacks = (unitcfg.match(atkRegex) || [])
    .map((atkStr) => {
      const specials = (atkStr.match(/\{WEAPON_SPECIAL_[^}]*}/g) || [])
        .map((s) => s.replace(/^\{WEAPON_SPECIAL_|}$/g, ""))
        .map((s) => s.toLowerCase());
      return {
        specials,
        ...parseIni(
          atkStr,
          ["name", "description", "icon", "type", "range", "damage"],
          "attack"
        ),
      };
    })
    .filter((atck) => atck.icon);

  const res = ((unitcfg.match(resistanceRegex) || [])[0] || "").replace(
    /    /g,
    ""
  );
  data.resistance = Object.entries(parseIni(res, [], "resistance")).reduce(
    (memo, [key, val]) => ({
      ...memo,
      [key]: +val,
    }),
    {}
  );

  const def = ((unitcfg.match(defenseRegex) || [])[0] || "").replace(
    /    /g,
    ""
  );
  data.defense = Object.entries(parseIni(def, [], "defense")).reduce(
    (memo, [key, val]) => ({
      ...memo,
      [key]: +val,
    }),
    {}
  );

  data.description = data.description || "";

  const adv = data["advances_to"];
  data["advances_to"] = !adv ? [] : adv.match(",") ? adv.split(/, */) : [adv];

  if (data.image) {
    data.image = data.image
      .replace(/\.png:.*$/, ".png")
      .replace(/["']/g, "")
      .replace(/\[.*?]\.png$/, "1.png");
  }

  return data;
};
