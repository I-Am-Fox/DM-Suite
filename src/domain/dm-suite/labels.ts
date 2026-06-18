import type { PrepBlockType, WorldEntityKind } from "@/domain/dm-suite/types";

export const prepBlockLabels: Record<PrepBlockType, string> = {
  scene: "Scene",
  encounter: "Encounter",
  npc_cue: "NPC cue",
  location_cue: "Location cue",
  faction_cue: "Faction cue",
  secret: "Secret",
  note: "Note",
  loot: "Loot",
  todo: "To-do"
};

export const worldKindLabels: Record<WorldEntityKind, string> = {
  npc: "NPCs",
  location: "Locations",
  faction: "Factions",
  item: "Items"
};
