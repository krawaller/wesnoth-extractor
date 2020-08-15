type Alignment = "chaotic" | "lawful" | "liminal" | "neutral";
type UnitNote =
  | "ambush"
  | "arcane"
  | "backstab"
  | "berserk"
  | "charge"
  | "concealment"
  | "cures"
  | "defense_cap"
  | "diversion"
  | "drain"
  | "extra_heal"
  | "feeding"
  | "firststrike"
  | "heals"
  | "illuminates"
  | "leadership"
  | "magical"
  | "marksman"
  | "nightstalk"
  | "plague"
  | "poison"
  | "regenerates"
  | "self_heal"
  | "skirmisher"
  | "slow"
  | "spirit"
  | "steadfast"
  | "submerge"
  | "swarm"
  | "teleport";
type UnitAbility =
  | "ambush"
  | "concealment"
  | "cures"
  | "diversion"
  | "extra_heal"
  | "feeding"
  | "heals"
  | "illuminates"
  | "leadership"
  | "nightstalk"
  | "regenerates"
  | "self_heal"
  | "skirmisher"
  | "steadfast"
  | "submerge"
  | "teleport";
type AttackNote =
  | "backstab"
  | "berserk"
  | "charge"
  | "drain"
  | "firststrike"
  | "magical"
  | "marksman"
  | "plague"
  | "poison"
  | "slow";
type Race =
  | "bats"
  | "drake"
  | "dunefolk"
  | "monster"
  | "dwarf"
  | "elf"
  | "wolf"
  | "goblin"
  | "gryphon"
  | "human"
  | "merman"
  | "falcon"
  | "undead"
  | "naga"
  | "ogre"
  | "orc"
  | "lizard"
  | "troll"
  | "wose";
type AttackType = "cold" | "pierce" | "fire" | "blade" | "impact" | "arcane";
type Terrain =
  | "village"
  | "sand"
  | "forest"
  | "mountains"
  | "hills"
  | "cave"
  | "castle"
  | "flat"
  | "shallow_water"
  | "swamp_water"
  | "frozen"
  | "deep_water"
  | "fungus";

type MovementType =
  | "smallfly"
  | "drakefoot"
  | "drakefly"
  | "drakeglide"
  | "drakeglide2"
  | "dunefoot"
  | "dunearmoredfoot"
  | "dunearmoredhorse"
  | "duneelusivefoot"
  | "dunehorse"
  | "fly"
  | "dwarvishfoot"
  | "woodland"
  | "woodlandfloat"
  | "orcishfoot"
  | "mounted"
  | "smallfoot"
  | "elusivefoot"
  | "armoredfoot"
  | "swimmer"
  | "deepsea"
  | "lightfly"
  | "scuttlefoot"
  | "rodentfoot"
  | "mountainfoot"
  | "spirit"
  | "undeadfly"
  | "float"
  | "naga"
  | "largefoot"
  | "lizard"
  | "gruefoot"
  | "undeadfoot"
  | "undeadspirit"
  | "treefolk";

type Unit = {
  id: string;
  name: string;
  race: Race;
  image: string;
  hitpoints: number;
  movement_type: MovementType;
  movement: number;
  experience: number;
  level: number;
  alignment: Alignment;
  advances_to: string[];
  cost: number;
  usage: string;
  description: string;
  notes: UnitNote[];
  abilities: UnitAbility[];
  resistance: Record<AttackType, number>;
  defence: Record<Terrain, number>;
};

type Attack = {
  specials: AttackNote[];
  name: string;
  description: string;
  icon: string;
  type: AttackType;
  range: "meelee" | "ranged";
  damage: number;
};
