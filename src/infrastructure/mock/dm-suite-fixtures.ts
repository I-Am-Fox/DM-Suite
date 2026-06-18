import type {
  AppUser,
  CampaignSummary,
  ExportRequest,
  PrepBlock,
  SessionSummary,
  TimelineEvent,
  WorldEntity
} from "@/domain/dm-suite/types";

export const mockUser: AppUser = {
  id: "usr_demo_dm",
  name: "Morgan Vale",
  email: "morgan@example.com"
};

export const campaigns: CampaignSummary[] = [
  {
    id: "cmp-emberfall",
    ownerId: mockUser.id,
    name: "Emberfall Frontier",
    pitch: "A borderland campaign about old oaths, mining towns, and a fire under the mountains.",
    system: "D&D 5e",
    status: "active",
    nextSessionId: "ses-ash-road",
    nextSessionTitle: "The Ash Road Ambush",
    nextSessionDate: "2026-06-22",
    unresolvedHooks: [
      "The blacksmith saw a branded courier leave through the east gate.",
      "A cracked ruby keeps warming near old dwarven stone.",
      "The Ash Road patrol never reported back."
    ],
    recentNotes: [
      "Players promised Warden Elric they would investigate the missing caravan.",
      "Nyra has not revealed who funds the Silver Thread.",
      "Keep the pressure on food shortages without blocking player choice."
    ],
    prepHealth: "in-progress",
    lastUpdatedAt: "2026-06-18T15:40:00.000Z"
  }
];

export const sessions: SessionSummary[] = [
  {
    id: "ses-ash-road",
    campaignId: "cmp-emberfall",
    title: "The Ash Road Ambush",
    date: "2026-06-22",
    status: "draft",
    prepProgress: 68,
    lastEditedAt: "2026-06-18T15:46:00.000Z",
    recap:
      "The party accepted the warden's request, learned the caravan carried sealed temple records, and followed wagon tracks toward the eastern pass."
  },
  {
    id: "ses-cinder-market",
    campaignId: "cmp-emberfall",
    title: "Cinder Market Bargains",
    date: "2026-06-15",
    status: "played",
    prepProgress: 100,
    lastEditedAt: "2026-06-16T10:30:00.000Z",
    recap:
      "The party won over the market clerk, exposed a ration scam, and found a silver-thread token beneath the weighhouse floor."
  },
  {
    id: "ses-smoke-chapel",
    campaignId: "cmp-emberfall",
    title: "Smoke in the Chapel",
    date: "2026-06-29",
    status: "draft",
    prepProgress: 24,
    lastEditedAt: "2026-06-18T13:20:00.000Z",
    recap:
      "Placeholder prep for the fallout after the Ash Road encounter and the chapel's sealed reliquary."
  }
];

export const prepBlocks: PrepBlock[] = [
  {
    id: "blk-opening",
    campaignId: "cmp-emberfall",
    sessionId: "ses-ash-road",
    type: "scene",
    title: "Cold open: wagon smoke on the ridge",
    body:
      "Open with the smell of scorched canvas before the party sees the broken caravan. Give them three clear investigation vectors: tracks, survivors, and the marked crate.",
    linkedEntityIds: ["loc-ash-road", "fac-silver-thread"],
    isComplete: true
  },
  {
    id: "blk-ambush",
    campaignId: "cmp-emberfall",
    sessionId: "ses-ash-road",
    type: "encounter",
    title: "Ambush pressure, not a forced fight",
    body:
      "Bandits test the party from cover and retreat if two fall. Their goal is the temple record crate, not killing the characters.",
    linkedEntityIds: ["fac-silver-thread"],
    isComplete: false
  },
  {
    id: "blk-nyra",
    campaignId: "cmp-emberfall",
    sessionId: "ses-ash-road",
    type: "npc_cue",
    title: "Nyra's cue",
    body:
      "If confronted about the silver-thread token, Nyra answers with a practical lie: 'Everyone pays someone to survive out here.'",
    linkedEntityIds: ["npc-nyra"],
    isComplete: true
  },
  {
    id: "blk-shrine",
    campaignId: "cmp-emberfall",
    sessionId: "ses-ash-road",
    type: "location_cue",
    title: "Shrine below the road",
    body:
      "A buried milestone marks an old pilgrim stair. The stairs lead to a sealed alcove with soot-blackened saint tiles.",
    linkedEntityIds: ["loc-ash-road"],
    isComplete: false
  },
  {
    id: "blk-secret",
    campaignId: "cmp-emberfall",
    sessionId: "ses-ash-road",
    type: "secret",
    title: "Secret: the ruby is a key",
    body:
      "The cracked ruby is a monastery archive key. It warms when pointed at hidden reliquaries or authenticated records.",
    linkedEntityIds: ["item-cracked-ruby"],
    isComplete: false
  },
  {
    id: "blk-todo",
    campaignId: "cmp-emberfall",
    sessionId: "ses-ash-road",
    type: "todo",
    title: "Before session",
    body:
      "Name two caravan survivors, choose a retreat route for the bandits, and write one sensory detail for the shrine door.",
    linkedEntityIds: [],
    isComplete: false
  }
];

export const worldEntities: WorldEntity[] = [
  {
    id: "npc-nyra",
    campaignId: "cmp-emberfall",
    kind: "npc",
    name: "Nyra Voss",
    role: "Fence and information broker",
    status: "Useful but compromised",
    tags: ["silver-thread", "market", "knows-too-much"],
    lastAppeared: "Cinder Market Bargains",
    linkedSessions: ["ses-cinder-market", "ses-ash-road"]
  },
  {
    id: "npc-elric",
    campaignId: "cmp-emberfall",
    kind: "npc",
    name: "Warden Elric Thane",
    role: "Frontier warden",
    status: "Pressed by shortages",
    tags: ["authority", "emberfall", "honest"],
    lastAppeared: "Cinder Market Bargains",
    linkedSessions: ["ses-cinder-market"]
  },
  {
    id: "loc-ash-road",
    campaignId: "cmp-emberfall",
    kind: "location",
    name: "The Ash Road",
    role: "Trade route over old pilgrim tunnels",
    status: "Unsafe",
    tags: ["road", "ambush", "old-shrine"],
    lastAppeared: "Upcoming",
    linkedSessions: ["ses-ash-road"]
  },
  {
    id: "loc-cinder-market",
    campaignId: "cmp-emberfall",
    kind: "location",
    name: "Cinder Market",
    role: "Main supply market",
    status: "Tense but open",
    tags: ["market", "rations", "rumors"],
    lastAppeared: "Cinder Market Bargains",
    linkedSessions: ["ses-cinder-market"]
  },
  {
    id: "fac-silver-thread",
    campaignId: "cmp-emberfall",
    kind: "faction",
    name: "The Silver Thread",
    role: "Smuggling ring with noble cover",
    status: "Active threat",
    tags: ["smugglers", "couriers", "blackmail"],
    lastAppeared: "Cinder Market Bargains",
    linkedSessions: ["ses-cinder-market", "ses-ash-road"]
  },
  {
    id: "item-cracked-ruby",
    campaignId: "cmp-emberfall",
    kind: "item",
    name: "Cracked Ruby",
    role: "Warm archive key",
    status: "In party inventory",
    tags: ["reliquary", "temple", "mystery"],
    lastAppeared: "Cinder Market Bargains",
    linkedSessions: ["ses-cinder-market", "ses-ash-road"]
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: "evt-market",
    campaignId: "cmp-emberfall",
    date: "2026-06-15",
    title: "Ration scam exposed",
    description:
      "The party traced missing food ledgers to the weighhouse and found the first Silver Thread token.",
    sessionId: "ses-cinder-market"
  },
  {
    id: "evt-courier",
    campaignId: "cmp-emberfall",
    date: "2026-06-16",
    title: "Branded courier leaves Emberfall",
    description:
      "The blacksmith reports a courier with a silver-thread brand leaving through the east gate before dawn."
  },
  {
    id: "evt-caravan",
    campaignId: "cmp-emberfall",
    date: "2026-06-18",
    title: "Temple caravan goes missing",
    description:
      "The warden's eastern patrol and a records caravan both fail to report back from the Ash Road."
  }
];

export const exportRequests: ExportRequest[] = [
  {
    id: "exp-md",
    campaignId: "cmp-emberfall",
    label: "Markdown campaign packet",
    format: "markdown",
    status: "planned",
    description:
      "Bundle sessions, timeline events, and world tracker entries into portable Markdown files."
  },
  {
    id: "exp-pdf",
    campaignId: "cmp-emberfall",
    label: "PDF session brief",
    format: "pdf",
    status: "planned",
    description:
      "Generate a clean table-ready session brief once server-side PDF export is implemented."
  }
];
