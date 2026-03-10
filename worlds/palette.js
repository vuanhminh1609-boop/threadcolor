import { composeHandoff } from "../scripts/handoff.js";
import { resolveIncoming } from "../scripts/workbench_context.js";
import {
  createPaletteState,
  createImageExtractState
} from "./palette_modules/state.js";
import {
  normalizeHex as normalizeHexCore,
  hexToRgb as hexToRgbCore,
  rgbToHsl as rgbToHslCore,
  hslToHex as hslToHexCore,
  rgbToLab as rgbToLabCore,
  deltaE76 as deltaE76Core,
  clampNumber as clampNumberCore,
  rgbToCmykApprox as rgbToCmykApproxCore,
  formatCmyk as formatCmykCore,
  gradientCss as gradientCssCore,
  relativeLuminance as relativeLuminanceCore,
  contrastRatio as contrastRatioCore,
  toHexByte as toHexByteCore,
  rgbToHexUpper as rgbToHexUpperCore,
  colorDistanceSq as colorDistanceSqCore,
  sampleImagePixels as sampleImagePixelsCore,
  initKMeansCentroids as initKMeansCentroidsCore,
  quantizeSamplesKMeans as quantizeSamplesKMeansCore,
  hasCloseColor as hasCloseColorCore,
  sortRgbByHue as sortRgbByHueCore,
  extractPaletteFromImageData as extractPaletteFromImageDataCore,
  buildHarmonyPalette as buildHarmonyPaletteCore,
  buildTonePalette as buildTonePaletteCore
} from "./palette_modules/generators.js";
import {
  normalizeShareSim as normalizeShareSimCore,
  toInternalVisionMode as toInternalVisionModeCore,
  toShareSim as toShareSimCore,
  normalizeShareRoles as normalizeShareRolesCore,
  normalizeShareStatePayload as normalizeShareStatePayloadCore,
  encodeBase64UrlUtf8 as encodeBase64UrlUtf8Core,
  decodeBase64UrlUtf8 as decodeBase64UrlUtf8Core,
  encodePaletteShareState as encodePaletteShareStateCore,
  decodePaletteShareState as decodePaletteShareStateCore,
  normalizeSearchText as normalizeSearchTextCore,
  normalizeShortShareId as normalizeShortShareIdCore,
  createShortShareId as createShortShareIdCore,
  createLibraryPresetId as createLibraryPresetIdCore
} from "./palette_modules/share_bridge.js";
import {
  toIsoString as toIsoStringCore,
  formatStampVi as formatStampViCore,
  formatRoomRevisionTime as formatRoomRevisionTimeCore,
  formatTuneValue as formatTuneValueCore
} from "./palette_modules/view_helpers.js";

const MIN_STOPS = 2;
const MAX_STOPS = 7;
const ASSET_STORAGE_KEY = "tc_asset_library_v1";
const PROJECT_STORAGE_KEY = "tc_project_current";
const FEED_STORAGE_KEY = "tc_community_feed";
const HANDOFF_FROM = "palette";
const LIBRARY_COLLECTION = "library_palettes";
const TEAM_COLLECTION = "teams";
const TEAM_MEMBER_COLLECTION = "members";
const TEAM_AUDIT_COLLECTION = "audit";
const TEAM_APPROVAL_COLLECTION = "approvals";
const TEAM_RELEASE_COLLECTION = "releases";
const TEAM_GUIDELINE_COLLECTION = "color_guidelines";
const TEAM_GUIDELINE_DOC_ID = "current";
const ROOM_COLLECTION = "w3_rooms";
const ROOM_MEMBER_COLLECTION = "members";
const ROOM_STATE_COLLECTION = "state";
const ROOM_STATE_DOC_ID = "current";
const ROOM_PRESENCE_COLLECTION = "presence";
const ROOM_REVISION_COLLECTION = "revisions";
const ROOM_COMMENT_COLLECTION = "comments";
const ROOM_SHARE_PUBLIC = "publicLink";
const ROOM_SHARE_INVITE_ONLY = "inviteOnly";
const ROOM_SYNC_THROTTLE_MS = 100;
const ROOM_PRESENCE_THROTTLE_MS = 280;
const ROOM_PRESENCE_HEARTBEAT_MS = 30000;
const ROOM_PRESENCE_ONLINE_WINDOW_MS = 120000;
const ROOM_REVISION_FETCH_LIMIT = 60;
const ROOM_REVISION_MIN_INTERVAL_MS = 7000;
const ROOM_COMMENT_FETCH_LIMIT = 500;
const ROOM_COMMENT_MAX_LENGTH = 600;
const ROOM_VIEWER_CAN_COMMENT = false;
const TEAM_ROLE_OWNER = "owner";
const TEAM_ROLE_EDITOR = "editor";
const TEAM_ROLE_APPROVER = "approver";
const TEAM_ROLE_VIEWER = "viewer";
const TEAM_WRITABLE_ROLES = [TEAM_ROLE_OWNER, TEAM_ROLE_EDITOR];
const TEAM_APPROVER_ROLES = [TEAM_ROLE_OWNER, TEAM_ROLE_APPROVER];
const TEAM_COMMENTER_ROLES = [TEAM_ROLE_OWNER, TEAM_ROLE_APPROVER, TEAM_ROLE_EDITOR];
const APPROVAL_STATUS_DRAFT = "draft";
const APPROVAL_STATUS_IN_REVIEW = "in_review";
const APPROVAL_STATUS_APPROVED = "approved";
const APPROVAL_STATUS_PUBLISHED = "published";
const APPROVAL_STATUS_CHANGES_REQUESTED = "changes_requested";
const APPROVAL_STATUS_REJECTED = "rejected";
const APPROVAL_STATUS_VALUES = [
  APPROVAL_STATUS_DRAFT,
  APPROVAL_STATUS_IN_REVIEW,
  APPROVAL_STATUS_APPROVED,
  APPROVAL_STATUS_PUBLISHED,
  APPROVAL_STATUS_CHANGES_REQUESTED,
  APPROVAL_STATUS_REJECTED
];
const LIBRARY_FETCH_LIMIT = 120;
const LIBRARY_ID_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const LIBRARY_ID_LENGTH = 12;
const LIBRARY_SCOPE_STORAGE_KEY = "tc_w3_library_scope_v1";
const LIBRARY_TEAM_STORAGE_KEY = "tc_w3_library_team_v1";
const ROOM_EDITABLE_IDS = [
  "paletteStyleHub",
  "palettePresetHub",
  "paletteLibraryHub",
  "paletteFullscreenBtn",
  "paletteSaveLibrary",
  "paletteSaveTeamLibrary",
  "paletteUseLibrary",
  "paletteShare",
  "paletteRevisionCreate"
];
const TEAM_GUIDELINE_DEFAULT = {
  targetLevel: "AA",
  textSize: "normal",
  lockedRoles: [],
  preferKeepHue: true,
  maxAdjustSteps: 12
};
const incomingHandoff = resolveIncoming({ search: window.location.search, hash: window.location.hash });
const hasStrictIncoming = incomingHandoff && (incomingHandoff.source === "asset" || incomingHandoff.source === "buffer");
const THREAD_BRAND_PRIORITY = ["Gingko", "Ming Shyang", "Marathon", "DMC"];
const KNOWLEDGE_URL = "../assets/knowledge/palette_knowledge_vi.json";

const FALLBACK_KNOWLEDGE = {
  goals: {
    ui: { keywords: ["website", "ui", "web", "giao dien", "giao diện"] },
    brand: { keywords: ["brand", "thuong hieu", "thương hiệu", "nhan dien", "nhận diện"] },
    embroidery: { keywords: ["theu", "thêu", "chi", "chỉ"] },
    print: { keywords: ["in", "cmyk", "print"] }
  },
  moods: [
    { key: "sang", label: "Sang", keywords: ["sang", "cao cap", "cao cấp"], h: 210, s: 28, l: 48 },
    { key: "tre", label: "Trẻ", keywords: ["tre", "trẻ", "nang dong", "năng động"], h: 20, s: 75, l: 55 },
    { key: "am", label: "Ấm", keywords: ["am", "ấm", "ap", "ấm áp"], h: 25, s: 55, l: 52 },
    { key: "lanh", label: "Lạnh", keywords: ["lanh", "lạnh", "mat", "mát"], h: 205, s: 50, l: 50 },
    { key: "tu_nhien", label: "Tự nhiên", keywords: ["tu nhien", "tự nhiên", "xanh la", "xanh lá"], h: 120, s: 40, l: 45 },
    { key: "toi_gian", label: "Tối giản", keywords: ["toi gian", "tối giản", "nhe", "nhẹ"], h: 220, s: 12, l: 65 }
  ],
  defaults: { h: 210, s: 35, l: 50 }
};

const state = createPaletteState({
  teamRoleViewer: TEAM_ROLE_VIEWER,
  roomShareInviteOnly: ROOM_SHARE_INVITE_ONLY
});

const FULLSCREEN_COLUMNS = 5;
const FULLSCREEN_HISTORY_LIMIT = 10;
const FULLSCREEN_HUE_STEP = 8;
const FULLSCREEN_HUE_STEP_LARGE = 20;
const FULLSCREEN_LIGHT_STEP = 3;
const FULLSCREEN_LIGHT_STEP_LARGE = 10;
let fullscreenActive = false;
let fullscreenPalette = [];
let fullscreenLocks = Array.from({ length: FULLSCREEN_COLUMNS }, () => false);
let fullscreenHelpVisible = false;
let fullscreenBodyOverflow = "";
let fullscreenHistory = [];
let fullscreenHistoryIndex = -1;
let fullscreenTokenVisible = false;
let fullscreenLastPointer = "mouse";
const fullscreenRailTimers = new WeakMap();
let presetDetailOpen = false;
let presetDetailBodyOverflow = "";
let approvalModalOpen = false;
let approvalModalBodyOverflow = "";
const approvalModalEl = {
  root: null,
  title: null,
  status: null,
  state: null,
  list: null,
  input: null,
  submit: null,
  close: null
};
let approvalModalPreset = null;
let releaseSignatureModalOpen = false;
let releaseSignatureModalBodyOverflow = "";
const releaseSignatureModalEl = {
  root: null,
  title: null,
  state: null,
  releaseId: null,
  version: null,
  signedBy: null,
  signedAt: null,
  signatureHash: null,
  policyHash: null,
  downloadBundle: null,
  copyCssVars: null,
  copySignature: null,
  copyPolicy: null,
  close: null
};
let releaseSignatureModalPayload = null;

const el = {
  grid: document.getElementById("paletteGrid"),
  empty: document.getElementById("paletteEmpty"),
  onboardingZone: document.getElementById("paletteOnboardingZone"),
  tourStartBtn: document.getElementById("paletteTourStart"),
  tourDontShowBtn: document.getElementById("paletteTourDontShow"),
  tourReplayBtn: document.getElementById("paletteTourReplay"),
  startFocusButtons: Array.from(document.querySelectorAll("[data-start-focus]")),
  styleHub: document.getElementById("paletteStyleHub"),
  presetHub: document.getElementById("palettePresetHub"),
  reviewZone: document.getElementById("paletteReviewZone"),
  saveLibrary: document.getElementById("paletteSaveLibrary"),
  useLibrary: document.getElementById("paletteUseLibrary"),
  share: document.getElementById("paletteShare"),
  fullscreenBtn: document.getElementById("paletteFullscreenBtn"),
  fullscreen: document.getElementById("paletteFullscreen"),
  fullscreenExit: document.getElementById("paletteFsExit"),
  fullscreenCopyAll: document.getElementById("paletteFsCopyAll"),
  fullscreenHelp: document.getElementById("paletteFsHelp"),
  fullscreenToken: document.getElementById("paletteFsToken"),
  fullscreenTokenCopy: document.getElementById("paletteFsTokenCopy"),
  presetDetail: document.getElementById("palettePresetDetail"),
  presetDetailBody: document.getElementById("palettePresetDetailBody"),
  presetDetailScrollHint: document.getElementById("palettePresetDetailScrollHint"),
  hexInput: document.getElementById("paletteHexInput"),
  hexApply: document.getElementById("paletteHexApply"),
  baseColor: document.getElementById("paletteBaseColor"),
  harmonySelect: document.getElementById("paletteHarmony"),
  harmonyApply: document.getElementById("paletteHarmonyApply"),
  toneSelect: document.getElementById("paletteTone"),
  toneApply: document.getElementById("paletteToneApply"),
  lockRow: document.getElementById("paletteLockRow"),
  lockClear: document.getElementById("paletteLockClear"),
  goalSelect: document.getElementById("paletteGoal"),
  sourceSelect: document.getElementById("paletteSource"),
  boldnessRange: document.getElementById("paletteBoldness"),
  suggestBtn: document.getElementById("paletteSuggest"),
  suggestGrid: document.getElementById("paletteSuggestGrid"),
  smartBrief: document.getElementById("paletteSmartBrief"),
  smartGenerate: document.getElementById("paletteSmartGenerate"),
  smartGrid: document.getElementById("paletteSmartGrid"),
  briefPick: document.getElementById("paletteSmartPick"),
  briefSheet: document.getElementById("paletteBriefSheet"),
  briefIndustry: document.getElementById("paletteBriefIndustry"),
  briefList: document.getElementById("paletteBriefList"),
  imageCard: document.getElementById("paletteImageCard"),
  imageTitle: document.getElementById("paletteImageTitle"),
  imageDesc: document.getElementById("paletteImageDesc"),
  imageCta: document.getElementById("paletteImageCta"),
  imageDrop: document.getElementById("paletteImageDrop"),
  imageDropText: document.getElementById("paletteImageDropText"),
  imageDropHint: document.getElementById("paletteImageDropHint"),
  imageInput: document.getElementById("paletteImageInput"),
  imageMeta: document.getElementById("paletteImageMeta"),
  imageCountLabel: document.getElementById("paletteImageCountLabel"),
  imageCount: document.getElementById("paletteImageCount"),
  imagePriorityLabel: document.getElementById("paletteImagePriorityLabel"),
  imagePriority: document.getElementById("paletteImagePriority"),
  imageExtract: document.getElementById("paletteImageExtract"),
  imageResult: document.getElementById("paletteImageResult"),
  imageResultTitle: document.getElementById("paletteImageResultTitle"),
  imageSwatches: document.getElementById("paletteImageSwatches"),
  imageUse: document.getElementById("paletteImageUse"),
  libraryHub: document.getElementById("paletteLibraryHub"),
  libraryTitle: document.getElementById("paletteLibraryTitle"),
  libraryDesc: document.getElementById("paletteLibraryDesc"),
  libraryState: document.getElementById("paletteLibraryState"),
  libraryGrid: document.getElementById("paletteLibraryGrid"),
  libraryRefresh: document.getElementById("paletteLibraryRefresh"),
  libraryOpenPage: document.getElementById("paletteLibraryOpenPage"),
  libraryModal: document.getElementById("paletteLibraryModal"),
  libraryForm: document.getElementById("paletteLibraryForm"),
  libraryModalTitle: document.getElementById("paletteLibraryModalTitle"),
  libraryModalClose: document.getElementById("paletteLibraryModalClose"),
  libraryNameLabel: document.getElementById("paletteLibraryNameLabel"),
  libraryNameInput: document.getElementById("paletteLibraryName"),
  libraryTagsLabel: document.getElementById("paletteLibraryTagsLabel"),
  libraryTagsInput: document.getElementById("paletteLibraryTags"),
  libraryNotesLabel: document.getElementById("paletteLibraryNotesLabel"),
  libraryNotesInput: document.getElementById("paletteLibraryNotes"),
  libraryCancel: document.getElementById("paletteLibraryCancel"),
  librarySubmit: document.getElementById("paletteLibrarySubmit"),
  saveTeamLibrary: document.getElementById("paletteSaveTeamLibrary"),
  saveLibraryLabelBtn: document.getElementById("paletteSaveLibrary"),
  useLibraryLabelBtn: document.getElementById("paletteUseLibrary"),
  saveTeamLibraryLabelBtn: document.getElementById("paletteSaveTeamLibrary"),
  scopePersonal: document.getElementById("paletteScopePersonal"),
  scopeTeam: document.getElementById("paletteScopeTeam"),
  teamSelect: document.getElementById("paletteTeamSelect"),
  teamRoleHint: document.getElementById("paletteTeamRoleHint"),
  roomFlowHint: document.getElementById("paletteRoomFlowHint"),
  roomFlowState: document.getElementById("paletteRoomFlowState"),
  roomSoloBtn: document.getElementById("paletteRoomSoloBtn"),
  roomRecentBtn: document.getElementById("paletteRoomRecentBtn"),
  roomCreateBtn: document.getElementById("paletteRoomCreateBtn"),
  roomJoinInput: document.getElementById("paletteRoomJoinInput"),
  roomJoinBtn: document.getElementById("paletteRoomJoinBtn"),
  roomBar: document.getElementById("paletteRoomBar"),
  roomLabel: document.getElementById("paletteRoomLabel"),
  roomName: document.getElementById("paletteRoomName"),
  roomStatus: document.getElementById("paletteRoomStatus"),
  roomPresence: document.getElementById("paletteRoomPresence"),
  roomRevisionPanel: document.getElementById("paletteRevisionPanel"),
  roomRevisionTitle: document.getElementById("paletteRevisionTitle"),
  roomRevisionDesc: document.getElementById("paletteRevisionDesc"),
  roomRevisionCreate: document.getElementById("paletteRevisionCreate"),
  roomRevisionState: document.getElementById("paletteRevisionState"),
  roomRevisionList: document.getElementById("paletteRevisionList"),
  roomRevisionPreview: document.getElementById("paletteRevisionPreview"),
  roomCommentPanel: document.getElementById("paletteCommentPanel"),
  roomCommentTitle: document.getElementById("paletteCommentTitle"),
  roomCommentDesc: document.getElementById("paletteCommentDesc"),
  roomCommentFilterLabel: document.getElementById("paletteCommentFilterLabel"),
  roomCommentFilter: document.getElementById("paletteCommentFilter"),
  roomCommentBadge: document.getElementById("paletteCommentBadge"),
  roomCommentState: document.getElementById("paletteCommentState"),
  roomCommentReply: document.getElementById("paletteCommentReply"),
  roomCommentReplyText: document.getElementById("paletteCommentReplyText"),
  roomCommentReplyCancel: document.getElementById("paletteCommentReplyCancel"),
  roomCommentList: document.getElementById("paletteCommentList"),
  roomCommentComposer: document.getElementById("paletteCommentComposer"),
  roomCommentInput: document.getElementById("paletteCommentInput"),
  roomCommentSubmit: document.getElementById("paletteCommentSubmit"),
  modeQuick: document.getElementById("paletteModeQuick"),
  modeExpert: document.getElementById("paletteModeExpert"),
  modeHint: document.getElementById("paletteModeHint"),
  modeTargets: Array.from(document.querySelectorAll("[data-palette-mode-target]"))
};

const ROLE_KEYS = ["bg", "surface", "text", "muted", "accent"];
const PREVIEW_TABS = ["ui", "poster", "card", "cta"];
const PREVIEW_VISION_MODES = ["normal", "deuteranopia", "protanopia", "tritanopia", "grayscale"];
const SHARE_STATE_VERSION = 1;
const SHORT_SHARE_COLLECTION = "w3_share_links";
const SHORT_SHARE_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const SHORT_SHARE_ID_LENGTH = 9;
const SHORT_SHARE_MAX_TRIES = 8;
const SHORT_SHARE_WAIT_AUTH_MS = 2200;
const ROOM_LAST_ID_STORAGE_KEY = "tc_w3_last_room_v1";
const TOUR_SEEN_STORAGE_KEY = "tc_w3_tour_seen_v1";
const TOUR_NEVER_STORAGE_KEY = "tc_w3_tour_never_v1";
const PALETTE_WORKMODE_HINT = {
  quick: "Tạo nhanh: đi theo luồng tối ưu từ chọn palette, gán vai màu đến contrast/preview.",
  expert: "Chế độ chuyên gia: mở thêm cộng tác theo phòng, timeline phiên bản và bình luận vai màu."
};
let paletteWorkMode = "quick";
let roomListenerUnsub = null;
let firestoreRealtimeModulePromise = null;
let roomSyncTimer = null;
let roomSyncBusy = false;
let roomPendingCommitFinal = false;
let roomLastCommitTriggerAt = 0;
let roomPresenceListenerUnsub = null;
let roomPresenceTimer = null;
let roomPresenceHeartbeat = null;
let roomPresenceWriteBusy = false;
let roomRevisionListenerUnsub = null;
let roomRevisionWriteBusy = false;
let roomCommentListenerUnsub = null;
let roomCommentWriteBusy = false;
let activePaletteTour = null;
let roomPresenceDraft = {
  activePaletteIndex: null,
  activeRoleKey: "",
  activePanel: ""
};
const SHARE_SIM_TO_INTERNAL = {
  normal: "normal",
  deuter: "deuteranopia",
  protan: "protanopia",
  tritan: "tritanopia"
};
const SHARE_SIM_FROM_INTERNAL = {
  normal: "normal",
  deuteranopia: "deuter",
  protanopia: "protan",
  tritanopia: "tritan"
};
const IMAGE_EXTRACT_MAX_SIDE = 512;
const IMAGE_EXTRACT_MIN = 3;
const IMAGE_EXTRACT_MAX = 8;
const BUILTIN_FALLBACK_PALETTES = [
  {
    id: "fallback_neon_ui",
    ten: "Neon giao diện",
    tags: ["fallback", "neon"],
    stops: ["#1D4ED8", "#0EA5E9", "#14B8A6", "#E879F9", "#111827"]
  },
  {
    id: "fallback_ocean",
    ten: "Đại dương ngọc",
    tags: ["fallback", "ocean"],
    stops: ["#082F49", "#0369A1", "#06B6D4", "#67E8F9", "#E0F2FE"]
  },
  {
    id: "fallback_ink",
    ten: "Mực tàu tối giản",
    tags: ["fallback", "ink"],
    stops: ["#020617", "#111827", "#334155", "#94A3B8", "#E2E8F0"]
  },
  {
    id: "fallback_sunset",
    ten: "Hoàng hôn",
    tags: ["fallback", "sunset"],
    stops: ["#7C2D12", "#EA580C", "#F97316", "#FDBA74", "#FFF7ED"]
  },
  {
    id: "fallback_chrome",
    ten: "Chrome sang",
    tags: ["fallback", "chrome"],
    stops: ["#111827", "#374151", "#9CA3AF", "#E5E7EB", "#F9FAFB"]
  }
];

const imageExtractState = createImageExtractState();

function t(key, fallback = "", params) {
  try {
    return window.tcI18n?.t?.(key, fallback, params) || fallback;
  } catch (_err) {
    return fallback;
  }
}

function readLocalStorage(key) {
  try {
    return String(localStorage.getItem(key) || "").trim();
  } catch (_err) {
    return "";
  }
}

function writeLocalStorage(key, value) {
  try {
    localStorage.setItem(key, String(value || "").trim());
    return true;
  } catch (_err) {
    return false;
  }
}

function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (_err) {
    return false;
  }
}

function rememberLastRoomId(roomId) {
  const normalized = normalizeRoomId(roomId);
  if (!normalized) return false;
  return writeLocalStorage(ROOM_LAST_ID_STORAGE_KEY, normalized);
}

function getLastRoomId() {
  const raw = readLocalStorage(ROOM_LAST_ID_STORAGE_KEY);
  return normalizeRoomId(raw);
}

function updateRoomQueryParam(roomId = "") {
  try {
    const nextRoomId = normalizeRoomId(roomId);
    const current = new URL(window.location.href);
    if (nextRoomId) {
      current.searchParams.set("room", nextRoomId);
    } else {
      current.searchParams.delete("room");
    }
    const nextHref = `${current.pathname}${current.search}${current.hash}`;
    window.history.replaceState(null, "", nextHref);
  } catch (_err) {}
}

function getCurrentAuthUser() {
  try {
    return getFirebaseApi()?.auth?.currentUser || null;
  } catch (_err) {
    return null;
  }
}

function extractRoomIdFromInput(rawInput) {
  const text = String(rawInput || "").trim();
  if (!text) return "";
  const direct = normalizeRoomId(text);
  if (direct) return direct;
  const normalizedText = normalizeSearchText(text);
  try {
    const parsed = normalizedText.includes("://")
      ? new URL(normalizedText)
      : new URL(normalizedText, window.location.origin);
    const fromQuery = normalizeRoomId(parsed.searchParams.get("room"));
    if (fromQuery) return fromQuery;
  } catch (_err) {}
  const marker = "room=";
  const idx = normalizedText.indexOf(marker);
  if (idx === -1) return "";
  const rest = normalizedText.slice(idx + marker.length);
  const token = rest.split("&")[0].split("#")[0].trim();
  return normalizeRoomId(token);
}

function resolveRoomFlowStateText() {
  const status = String(state.room.status || "idle");
  const hasRoom = Boolean(state.room.id);
  const hasAuth = Boolean(getCurrentAuthUser()?.uid);
  if (!hasRoom) {
    if (hasAuth) {
      return "Bạn đang làm việc một mình. Có thể tạo phòng mới hoặc nhập room ID khi cần cộng tác.";
    }
    return "Bạn đang làm việc một mình. Đăng nhập để tạo phòng mới hoặc tham gia phòng cộng tác.";
  }
  if (status === "connecting") return "Đang kết nối phòng...";
  if (status === "need-login") return "Bạn cần đăng nhập để tiếp tục vào phòng.";
  if (status === "missing") return "Không tìm thấy phòng. Kiểm tra lại room ID hoặc link mời.";
  if (status === "invite-only") return "Phòng chỉ cho người được mời. Bạn cần quyền truy cập.";
  if (status === "listen-error" || status === "invalid-state") {
    return "Phòng gặp lỗi đồng bộ. Bạn có thể thử lại hoặc chuyển sang dùng một mình.";
  }
  if (status === "viewer") return "Đã vào phòng ở chế độ chỉ xem.";
  if (status === "editor") return "Đã vào phòng và có thể chỉnh sửa thời gian thực.";
  return "Đang làm việc một mình.";
}

function renderRoomFlowGuide() {
  if (!el.roomFlowState || !el.roomFlowHint) return;
  el.roomFlowState.textContent = resolveRoomFlowStateText();
  const hasAuth = Boolean(getCurrentAuthUser()?.uid);
  const hasRoom = Boolean(state.room.id);
  if (hasRoom) {
    const roomLabel = state.room.name || state.room.id;
    el.roomFlowHint.textContent = `Bạn đang ở phòng ${roomLabel}. Có thể chia sẻ link chứa ?room=${state.room.id} để mời người khác.`;
  } else if (hasAuth) {
    el.roomFlowHint.textContent = "Chế độ chuyên gia cho phép làm một mình hoặc làm việc theo phòng. Dùng link ?room=... để mở cùng một trạng thái.";
  } else {
    el.roomFlowHint.textContent = "Bạn có thể dùng chế độ chuyên gia khi chưa đăng nhập. Đăng nhập chỉ cần thiết khi tạo phòng mới hoặc vào phòng cộng tác.";
  }
  const hasRecent = Boolean(getLastRoomId());
  if (el.roomRecentBtn) {
    el.roomRecentBtn.disabled = !hasRecent;
    el.roomRecentBtn.setAttribute("aria-disabled", hasRecent ? "false" : "true");
  }
}

function buildFallbackRoomPayload() {
  const active = getActivePalette();
  let stops = Array.isArray(active?.stops)
    ? active.stops.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
    : [];
  if (stops.length < MIN_STOPS) {
    stops = ["#0EA5E9", "#2563EB", "#0F172A", "#94A3B8", "#F8FAFC"];
  }
  stops = stops.slice(0, MAX_STOPS);
  const roles = active ? getRoleMapForPalette(active, stops) : autoAssignRoleMap(stops);
  const preview = active ? getCurrentPreviewForPalette(active, PREVIEW_TABS[0]) : PREVIEW_TABS[0];
  const visionMode = active ? getCurrentVisionForPalette(active, "normal") : "normal";
  return buildShareStatePayload(stops, {
    roles,
    preview,
    sim: visionMode
  });
}

async function pickAvailableRoomId(api, maxRetries = 8) {
  for (let i = 0; i < maxRetries; i += 1) {
    const candidate = normalizeRoomId(`room_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`);
    if (!candidate) continue;
    const ref = api.doc(api.db, ROOM_COLLECTION, candidate);
    const snap = await api.getDoc(ref).catch(() => null);
    if (!snap?.exists?.()) {
      return candidate;
    }
  }
  return "";
}

async function createPaletteRoomFromCurrentState() {
  const api = await waitForFirebaseApi();
  if (!canUseRoomRealtimeApi(api)) {
    showToast(t("paletteTool.room.toast.syncUnavailable", "Không thể kết nối đồng bộ phòng."));
    return { ok: false, reason: "api_unavailable" };
  }
  const user = await waitForFirebaseUser(api);
  if (!user?.uid) {
    showToast(t("paletteTool.room.toast.needLogin", "Cần đăng nhập để vào Phòng chỉnh sửa."));
    return { ok: false, reason: "no_auth" };
  }
  const roomId = await pickAvailableRoomId(api);
  if (!roomId) {
    showToast("Không thể tạo mã phòng mới. Thử lại sau vài giây.");
    return { ok: false, reason: "room_id_unavailable" };
  }
  const nowStamp = typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString();
  const roomRef = api.doc(api.db, ROOM_COLLECTION, roomId);
  const memberRef = api.doc(api.db, ROOM_COLLECTION, roomId, ROOM_MEMBER_COLLECTION, user.uid);
  const currentRef = api.doc(api.db, ROOM_COLLECTION, roomId, ROOM_STATE_COLLECTION, ROOM_STATE_DOC_ID);
  const roomName = `Phòng ${roomId.slice(-6).toUpperCase()}`;
  const payload = buildFallbackRoomPayload();
  if (!payload) {
    showToast("Chưa đủ dữ liệu palette để tạo phòng.");
    return { ok: false, reason: "missing_payload" };
  }
  try {
    await api.setDoc(roomRef, {
      name: roomName,
      title: roomName,
      shareMode: ROOM_SHARE_INVITE_ONLY,
      createdByUid: user.uid,
      createdAt: nowStamp,
      updatedByUid: user.uid,
      updatedAt: nowStamp
    }, { merge: false });
    await api.setDoc(memberRef, {
      uid: user.uid,
      role: TEAM_ROLE_OWNER,
      displayName: resolvePresenceDisplayName(user),
      joinedAt: nowStamp,
      updatedAt: nowStamp
    }, { merge: true });
    await api.setDoc(currentRef, {
      ...payload,
      type: "palette",
      rev: 0,
      updatedByUid: user.uid,
      updatedAt: nowStamp
    }, { merge: false });
  } catch (_err) {
    showToast(t("paletteTool.room.toast.joinFailed", "Không thể tham gia phòng."));
    return { ok: false, reason: "create_failed" };
  }
  const result = await enterPaletteRoom(roomId, { silent: true });
  if (result?.ok) {
    rememberLastRoomId(roomId);
    updateRoomQueryParam(roomId);
    if (el.roomJoinInput) {
      el.roomJoinInput.value = roomId;
    }
    showToast(`Đã tạo phòng mới: ${roomName}.`);
  }
  return result;
}

async function joinPaletteRoomFromInput(rawInput, options = {}) {
  const roomId = extractRoomIdFromInput(rawInput);
  const { silent = false } = options;
  if (!roomId) {
    if (!silent) {
      showToast(t("paletteTool.room.toast.invalidRoom", "Mã phòng không hợp lệ."));
    }
    return { ok: false, reason: "invalid_room" };
  }
  const result = await enterPaletteRoom(roomId, { silent });
  if (result?.ok) {
    rememberLastRoomId(roomId);
    updateRoomQueryParam(roomId);
    if (el.roomJoinInput) {
      el.roomJoinInput.value = roomId;
    }
  }
  return result;
}

function usePaletteSoloMode(options = {}) {
  const { silent = false } = options;
  cleanupRoomListener();
  resetRoomState();
  updateRoomQueryParam("");
  if (el.roomJoinInput && !el.roomJoinInput.value) {
    el.roomJoinInput.value = getLastRoomId() || "";
  }
  renderRoomFlowGuide();
  if (!silent) {
    showToast("Đã chuyển sang làm việc một mình trong chế độ chuyên gia.");
  }
}

function focusPaletteStartPath(nextPath) {
  const target = String(nextPath || "").trim();
  if (target === "style") {
    setPaletteWorkMode("quick");
    el.styleHub?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (target === "preset") {
    setPaletteWorkMode("quick");
    el.presetHub?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  if (target === "expert") {
    setPaletteWorkMode("expert");
    (el.roomFlowHint || el.modeExpert)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

function hasPaletteTourBeenSeen() {
  return readLocalStorage(TOUR_SEEN_STORAGE_KEY) === "1";
}

function isPaletteTourDisabled() {
  return readLocalStorage(TOUR_NEVER_STORAGE_KEY) === "1";
}

function refreshPaletteTourControls() {
  const disabled = isPaletteTourDisabled();
  if (el.tourDontShowBtn) {
    el.tourDontShowBtn.textContent = disabled ? "Đã tắt tự động tour" : "Đừng hiện lại";
    el.tourDontShowBtn.setAttribute("aria-pressed", disabled ? "true" : "false");
  }
  if (el.tourStartBtn) {
    el.tourStartBtn.textContent = hasPaletteTourBeenSeen() ? "Mở tour lại từ đầu" : "Bắt đầu tour";
  }
}

function markPaletteTourSeen() {
  writeLocalStorage(TOUR_SEEN_STORAGE_KEY, "1");
  refreshPaletteTourControls();
}

function markPaletteTourNever() {
  writeLocalStorage(TOUR_SEEN_STORAGE_KEY, "1");
  writeLocalStorage(TOUR_NEVER_STORAGE_KEY, "1");
  refreshPaletteTourControls();
}

function getPaletteTourSteps() {
  return [
    {
      id: "intro",
      selector: "#paletteOnboardingZone",
      title: "World 3 dùng để làm gì?",
      desc: "Đây là studio tạo bảng phối, kiểm tra độ đọc và chốt màu trước khi triển khai."
    },
    {
      id: "start",
      selector: "#paletteStyleHub",
      title: "Có những cách bắt đầu nào?",
      desc: "Bạn có thể bắt đầu từ mục tiêu, brief 1 dòng, danh sách HEX hoặc ảnh."
    },
    {
      id: "preset",
      selector: "#palettePresetHub",
      title: "Chọn palette mẫu ở đâu?",
      desc: "Khu mẫu palette sẵn giúp vào việc nhanh và có thể mở chi tiết từng bảng."
    },
    {
      id: "contrast",
      selector: "#paletteReviewContrastHint",
      title: "Đọc contrast/WCAG ở đâu?",
      desc: "Mở chi tiết preset để xem cặp đang fail, vai màu nút thắt và các phương án sửa theo mức thay đổi."
    },
    {
      id: "preview",
      selector: "#paletteReviewPreviewHint",
      title: "Xem thử theo bối cảnh ở đâu?",
      desc: "Trong chi tiết preset có preview Giao diện, Áp phích, Thẻ nội dung và CTA/Nhãn để kiểm tra thực tế."
    },
    {
      id: "expert",
      selector: "#paletteExpertPrimer",
      title: "Khi nào nên mở chế độ chuyên gia?",
      desc: "Khi cần cộng tác theo phòng, theo dõi timeline phiên bản và bình luận vai màu.",
      prepare: () => setPaletteWorkMode("expert")
    }
  ];
}

function getPaletteTourTopInset() {
  const cssVal = getComputedStyle(document.documentElement).getPropertyValue("--tc-topbar-h");
  const parsed = Number.parseFloat(cssVal);
  if (Number.isFinite(parsed)) return parsed + 10;
  return 76;
}

function isPaletteTourTargetVisible(node) {
  if (!node) return false;
  const style = window.getComputedStyle(node);
  if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return false;
  const rect = node.getBoundingClientRect();
  return rect.width > 0 && rect.height > 0;
}

function createPaletteTourOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "tc-tour-overlay";
  overlay.innerHTML = `
    <div class="tc-tour-spotlight" aria-hidden="true"></div>
    <div class="tc-tour-card" role="dialog" aria-live="polite" aria-label="Tour hướng dẫn World 3">
      <div class="tc-tour-step"></div>
      <div class="tc-tour-title"></div>
      <div class="tc-tour-desc"></div>
      <div class="tc-tour-actions">
        <button class="tc-tour-btn tc-tour-prev" type="button">Quay lại</button>
        <button class="tc-tour-btn tc-tour-skip" type="button">Bỏ qua</button>
        <button class="tc-tour-btn tc-tour-never" type="button">Đừng hiện lại</button>
        <button class="tc-tour-btn tc-tour-next" type="button">Tiếp</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  return overlay;
}

function startPaletteTour(options = {}) {
  const { force = false } = options;
  if (!force) {
    if (isPaletteTourDisabled() || hasPaletteTourBeenSeen()) return false;
  }
  const steps = getPaletteTourSteps();
  if (!steps.length) return false;
  if (activePaletteTour?.finish) {
    activePaletteTour.finish({ markSeen: false, restoreMode: false });
  }
  const originalMode = paletteWorkMode;
  setPaletteWorkMode("quick");
  const overlay = createPaletteTourOverlay();
  const spotlight = overlay.querySelector(".tc-tour-spotlight");
  const card = overlay.querySelector(".tc-tour-card");
  const stepEl = overlay.querySelector(".tc-tour-step");
  const titleEl = overlay.querySelector(".tc-tour-title");
  const descEl = overlay.querySelector(".tc-tour-desc");
  const prevBtn = overlay.querySelector(".tc-tour-prev");
  const skipBtn = overlay.querySelector(".tc-tour-skip");
  const neverBtn = overlay.querySelector(".tc-tour-never");
  const nextBtn = overlay.querySelector(".tc-tour-next");
  let index = 0;

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const positionCard = (rect) => {
    const margin = 16;
    const topInset = getPaletteTourTopInset();
    const cardRect = card.getBoundingClientRect();
    let top = rect.bottom + 12;
    if (top + cardRect.height > window.innerHeight - margin) {
      top = rect.top - cardRect.height - 12;
    }
    top = clamp(top, topInset, window.innerHeight - cardRect.height - margin);
    let left = rect.left;
    if (left + cardRect.width > window.innerWidth - margin) {
      left = window.innerWidth - cardRect.width - margin;
    }
    left = clamp(left, margin, window.innerWidth - cardRect.width - margin);
    card.style.top = `${top}px`;
    card.style.left = `${left}px`;
  };

  const findValidIndex = (start, direction) => {
    let next = start;
    while (next >= 0 && next < steps.length) {
      const step = steps[next];
      step?.prepare?.();
      const target = document.querySelector(step.selector);
      if (isPaletteTourTargetVisible(target)) return next;
      next += direction;
    }
    return -1;
  };

  const paintActiveStep = (step, target, options = {}) => {
    const { shouldScroll = false } = options;
    if (!step || !target) return;
    if (shouldScroll) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    window.setTimeout(() => {
      const rect = target.getBoundingClientRect();
      const padding = 10;
      const topInset = getPaletteTourTopInset();
      const top = clamp(rect.top - padding, topInset, window.innerHeight - 20);
      const left = clamp(rect.left - padding, 10, window.innerWidth - 20);
      const width = clamp(rect.width + padding * 2, 44, window.innerWidth - 20);
      const height = clamp(rect.height + padding * 2, 44, window.innerHeight - 20);
      spotlight.style.width = `${width}px`;
      spotlight.style.height = `${height}px`;
      spotlight.style.transform = `translate(${left}px, ${top}px)`;
      positionCard({ top, left, width, height, bottom: top + height });
      stepEl.textContent = `Bước ${index + 1}/${steps.length}`;
      titleEl.textContent = step.title;
      descEl.textContent = step.desc;
      prevBtn.disabled = index === 0;
      nextBtn.textContent = index === steps.length - 1 ? "Hoàn tất" : "Tiếp";
    }, shouldScroll ? 110 : 0);
  };

  const renderStep = (direction = 1) => {
    const validIndex = findValidIndex(index, direction);
    if (validIndex === -1) {
      finish({ markSeen: true, restoreMode: true });
      return;
    }
    index = validIndex;
    const step = steps[index];
    step?.prepare?.();
    const target = document.querySelector(step.selector);
    if (!target) {
      finish({ markSeen: true, restoreMode: true });
      return;
    }
    paintActiveStep(step, target, { shouldScroll: true });
  };

  const finish = ({ markSeen = true, markNever = false, restoreMode = true } = {}) => {
    if (markNever) {
      markPaletteTourNever();
    } else if (markSeen) {
      markPaletteTourSeen();
    }
    overlay.remove();
    window.removeEventListener("resize", handleReposition);
    window.removeEventListener("scroll", handleReposition, true);
    if (restoreMode) {
      setPaletteWorkMode(originalMode);
    }
    activePaletteTour = null;
  };

  const handleReposition = () => {
    const step = steps[index];
    if (!step) return;
    const target = document.querySelector(step.selector);
    if (!target || !isPaletteTourTargetVisible(target)) return;
    paintActiveStep(step, target, { shouldScroll: false });
  };

  activePaletteTour = { finish };
  prevBtn?.addEventListener("click", () => {
    if (index <= 0) return;
    index -= 1;
    renderStep(-1);
  });
  nextBtn?.addEventListener("click", () => {
    if (index >= steps.length - 1) {
      finish({ markSeen: true, restoreMode: true });
      return;
    }
    index += 1;
    renderStep(1);
  });
  skipBtn?.addEventListener("click", () => {
    finish({ markSeen: true, restoreMode: true });
  });
  neverBtn?.addEventListener("click", () => {
    finish({ markNever: true, restoreMode: true });
  });

  window.addEventListener("resize", handleReposition);
  window.addEventListener("scroll", handleReposition, true);
  renderStep(1);
  return true;
}

function normalizeHex(input) {
  return normalizeHexCore(input);
}

function setPaletteWorkMode(nextMode) {
  paletteWorkMode = nextMode === "expert" ? "expert" : "quick";
  const isExpert = paletteWorkMode === "expert";
  if (document.body) {
    document.body.setAttribute("data-palette-mode", paletteWorkMode);
  }
  el.modeQuick?.classList.toggle("is-active", !isExpert);
  el.modeQuick?.setAttribute("aria-pressed", !isExpert ? "true" : "false");
  el.modeExpert?.classList.toggle("is-active", isExpert);
  el.modeExpert?.setAttribute("aria-pressed", isExpert ? "true" : "false");
  if (el.modeHint) {
    el.modeHint.textContent = PALETTE_WORKMODE_HINT[paletteWorkMode];
  }
  (el.modeTargets || []).forEach((node) => {
    const targetMode = String(node?.getAttribute("data-palette-mode-target") || "");
    if (targetMode !== "expert") return;
    if (isExpert) {
      node.removeAttribute("hidden");
    } else {
      node.setAttribute("hidden", "hidden");
    }
  });
  renderRoomFlowGuide();
}

function hexToRgb(hex) {
  return hexToRgbCore(hex);
}

function rgbToHsl({ r, g, b }) {
  return rgbToHslCore({ r, g, b });
}

function hslToHex(h, s, l) {
  return hslToHexCore(h, s, l);
}

function rgbToLab({ r, g, b }) {
  return rgbToLabCore({ r, g, b });
}

function deltaE76(lab1, lab2) {
  return deltaE76Core(lab1, lab2);
}

function getLabForHex(hex) {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToLab(rgb) : null;
}

function clampNumber(value, min, max) {
  return clampNumberCore(value, min, max);
}

function rgbToCmykApprox({ r, g, b }) {
  return rgbToCmykApproxCore({ r, g, b });
}

function formatCmyk(cmyk) {
  return formatCmykCore(cmyk);
}

function gradientCss(stops) {
  return gradientCssCore(stops);
}

function relativeLuminance(hex) {
  return relativeLuminanceCore(hex);
}

function contrastRatio(hexA, hexB) {
  return contrastRatioCore(hexA, hexB);
}

function getBestText(hex) {
  const black = "#000000";
  const white = "#FFFFFF";
  const contrastWithBlack = contrastRatio(hex, black);
  const contrastWithWhite = contrastRatio(hex, white);
  if (contrastWithBlack >= contrastWithWhite) {
    return { text: black, label: "Chữ đen", ratio: contrastWithBlack };
  }
  return { text: white, label: "Chữ trắng", ratio: contrastWithWhite };
}

function getPaletteId(palette) {
  return String(palette?.id || "palette-default");
}

function normalizeRoleIndex(value, stopCount, fallback) {
  const max = Math.max(0, Number(stopCount) - 1);
  const num = Number(value);
  if (Number.isInteger(num) && num >= 0 && num <= max) return num;
  return Math.max(0, Math.min(max, Number(fallback) || 0));
}

function sortIndexesByLuminance(stops) {
  return stops
    .map((hex, idx) => ({ idx, lum: relativeLuminance(hex) }))
    .sort((a, b) => b.lum - a.lum)
    .map((item) => item.idx);
}

function findBestContrastIndex(stops, backgroundIndex, options = {}) {
  const { exclude = [] } = options;
  if (!Array.isArray(stops) || !stops.length) return 0;
  const blocked = new Set(exclude);
  const bg = stops[normalizeRoleIndex(backgroundIndex, stops.length, 0)];
  let bestIdx = 0;
  let bestRatio = -1;
  stops.forEach((hex, idx) => {
    if (blocked.has(idx)) return;
    const ratio = contrastRatio(bg, hex);
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestIdx = idx;
    }
  });
  if (bestRatio < 0) return 0;
  return bestIdx;
}

function pickMutedIndex(stops, surfaceIndex, fallbackTextIndex) {
  if (!Array.isArray(stops) || !stops.length) return 0;
  const bg = stops[normalizeRoleIndex(surfaceIndex, stops.length, 0)];
  let best = null;
  stops.forEach((hex, idx) => {
    if (idx === surfaceIndex) return;
    const ratio = contrastRatio(bg, hex);
    if (ratio < 3) return;
    const delta = Math.abs(ratio - 4.5);
    if (!best || delta < best.delta) {
      best = { idx, delta };
    }
  });
  if (best) return best.idx;
  return normalizeRoleIndex(fallbackTextIndex, stops.length, 0);
}

function pickAccentIndex(stops, excluded = []) {
  if (!Array.isArray(stops) || !stops.length) return 0;
  const blocked = new Set(excluded);
  let bestIdx = 0;
  let bestSat = -1;
  stops.forEach((hex, idx) => {
    if (blocked.has(idx)) return;
    const sat = getSaturation(hex);
    if (sat > bestSat) {
      bestSat = sat;
      bestIdx = idx;
    }
  });
  if (bestSat < 0) return 0;
  return bestIdx;
}

function autoAssignRoleMap(stops) {
  if (!Array.isArray(stops) || !stops.length) {
    return { bg: 0, surface: 0, text: 0, muted: 0, accent: 0 };
  }
  const byLight = sortIndexesByLuminance(stops);
  const bg = byLight[0] ?? 0;
  const surface = byLight[1] ?? bg;
  const text = findBestContrastIndex(stops, bg, { exclude: [bg] });
  const muted = pickMutedIndex(stops, surface, text);
  const accent = pickAccentIndex(stops, [bg, surface]);
  return { bg, surface, text, muted, accent };
}

function ensureRoleMap(palette, stops) {
  const paletteId = getPaletteId(palette);
  const autoMap = autoAssignRoleMap(stops);
  const raw = state.roleMapByPaletteId.get(paletteId) || {};
  const normalized = ROLE_KEYS.reduce((acc, key) => {
    acc[key] = normalizeRoleIndex(raw[key], stops.length, autoMap[key]);
    return acc;
  }, {});
  state.roleMapByPaletteId.set(paletteId, normalized);
  return { paletteId, roleMap: normalized, autoMap };
}

function findClosestPaletteIndex(stops, targetHex) {
  const target = hexToRgb(targetHex);
  if (!target || !Array.isArray(stops) || !stops.length) return 0;
  let bestIdx = 0;
  let bestDistance = Number.POSITIVE_INFINITY;
  stops.forEach((hex, idx) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return;
    const distance = Math.sqrt(
      (rgb.r - target.r) ** 2 +
      (rgb.g - target.g) ** 2 +
      (rgb.b - target.b) ** 2
    );
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIdx = idx;
    }
  });
  return bestIdx;
}

function resolveRoleColors(stops, roleMap) {
  if (!Array.isArray(stops) || !stops.length) {
    return {
      bg: "#F8FAFC",
      surface: "#E2E8F0",
      text: "#0F172A",
      muted: "#475569",
      accent: "#0EA5E9"
    };
  }
  const safeIndex = (value, fallback) => normalizeRoleIndex(value, stops.length, fallback);
  return {
    bg: stops[safeIndex(roleMap.bg, 0)],
    surface: stops[safeIndex(roleMap.surface, 0)],
    text: stops[safeIndex(roleMap.text, 0)],
    muted: stops[safeIndex(roleMap.muted, safeIndex(roleMap.text, 0))],
    accent: stops[safeIndex(roleMap.accent, 0)]
  };
}

function classifyContrast(ratio) {
  if (ratio >= 7) {
    return { level: "aaa", label: t("paletteTool.matrix.badge.aaa", "Đạt AAA"), pass: true };
  }
  if (ratio >= 4.5) {
    return { level: "aa", label: t("paletteTool.matrix.badge.aa", "Đạt AA"), pass: true };
  }
  return { level: "fail", label: t("paletteTool.matrix.badge.fail", "Chưa đạt"), pass: false };
}

function classifyContrastByThreshold(ratio, threshold) {
  if (ratio >= 7) {
    return { level: "aaa", label: t("paletteTool.matrix.badge.aaa", "Đạt AAA"), pass: true };
  }
  if (ratio >= 4.5 && threshold <= 4.5) {
    return { level: "aa", label: t("paletteTool.matrix.badge.aa", "Đạt AA"), pass: true };
  }
  if (ratio >= threshold) {
    return {
      level: "aa",
      label: t("paletteTool.matrix.badge.guideline", "Đạt theo Hướng dẫn Team"),
      pass: true
    };
  }
  return { level: "fail", label: t("paletteTool.matrix.badge.fail", "Chưa đạt"), pass: false };
}

function shiftHexLightness(hex, deltaL, options = {}) {
  const rgb = hexToRgb(hex);
  if (!rgb) return normalizeHex(hex)?.toUpperCase() || "#000000";
  const hsl = rgbToHsl(rgb);
  const keepHue = options.preferKeepHue !== false;
  const nextL = clampNumber(hsl.l + deltaL, 0, 100);
  const nextS = keepHue ? hsl.s : clampNumber(hsl.s - Math.abs(deltaL) * 0.35, 0, 100);
  return hslToHex(hsl.h, nextS, nextL).toUpperCase();
}

function findLightnessSuggestion(baseHex, againstHex, threshold, options = {}) {
  const maxSteps = clampGuidelineAdjustSteps(options.maxAdjustSteps);
  const preferKeepHue = options.preferKeepHue !== false;
  const baseColor = normalizeHex(baseHex)?.toUpperCase();
  const against = normalizeHex(againstHex)?.toUpperCase();
  if (!baseColor || !against) return null;
  const initialRatio = contrastRatio(against, baseColor);
  let best = {
    hex: baseColor,
    ratio: initialRatio,
    delta: 0,
    pass: initialRatio >= threshold
  };
  for (let step = 1; step <= maxSteps; step += 1) {
    const delta = step * 2;
    const candidates = [
      shiftHexLightness(baseColor, delta, { preferKeepHue }),
      shiftHexLightness(baseColor, -delta, { preferKeepHue })
    ];
    candidates.forEach((candidateHex) => {
      const ratio = contrastRatio(against, candidateHex);
      const pass = ratio >= threshold;
      const distance = Math.abs(delta);
      if (pass) {
        if (!best.pass || distance < best.delta || (distance === best.delta && ratio > best.ratio)) {
          best = { hex: candidateHex, ratio, delta: distance, pass: true };
        }
        return;
      }
      if (!best.pass && ratio > best.ratio) {
        best = { hex: candidateHex, ratio, delta: distance, pass: false };
      }
    });
    if (best.pass) break;
  }
  return best;
}

function calcRoleChangeMagnitude(baseRoleColors, nextRoleColors) {
  let sum = 0;
  let changed = 0;
  ROLE_KEYS.forEach((roleKey) => {
    const from = hexToRgb(baseRoleColors?.[roleKey]);
    const to = hexToRgb(nextRoleColors?.[roleKey]);
    if (!from || !to) return;
    const distance = Math.sqrt(
      (from.r - to.r) ** 2 +
      (from.g - to.g) ** 2 +
      (from.b - to.b) ** 2
    );
    if (distance > 0.5) {
      changed += 1;
      sum += (distance / 441.6729559300637) * 100;
    }
  });
  return {
    changedRoles: changed,
    score: Number(sum.toFixed(1))
  };
}

function resolveAccentText(roleColors) {
  const candidates = [
    { mode: "role", hex: roleColors.text, label: t("paletteTool.roles.items.text", "Chữ chính") },
    { mode: "black", hex: "#000000", label: t("paletteTool.matrix.black", "Đen") },
    { mode: "white", hex: "#FFFFFF", label: t("paletteTool.matrix.white", "Trắng") }
  ];
  let best = candidates[0];
  let bestRatio = contrastRatio(roleColors.accent, best.hex);
  candidates.forEach((item) => {
    const ratio = contrastRatio(roleColors.accent, item.hex);
    if (ratio > bestRatio) {
      best = item;
      bestRatio = ratio;
    }
  });
  return {
    ...best,
    ratio: bestRatio
  };
}

function buildRoleTokenPayload(stops, roleMap) {
  const roleColors = resolveRoleColors(stops, roleMap);
  const css = [
    ":root {",
    `  --sc-bg: ${roleColors.bg};`,
    `  --sc-surface: ${roleColors.surface};`,
    `  --sc-text: ${roleColors.text};`,
    `  --sc-muted: ${roleColors.muted};`,
    `  --sc-accent: ${roleColors.accent};`,
    "}"
  ].join("\n");
  const json = JSON.stringify({
    roles: {
      bg: roleColors.bg,
      surface: roleColors.surface,
      text: roleColors.text,
      muted: roleColors.muted,
      accent: roleColors.accent
    },
    mapping: {
      bg: roleMap.bg,
      surface: roleMap.surface,
      text: roleMap.text,
      muted: roleMap.muted,
      accent: roleMap.accent
    }
  }, null, 2);
  return `${css}\n\n${json}`;
}

function toHexByte(value) {
  return toHexByteCore(value);
}

function rgbToHexUpper(r, g, b) {
  return rgbToHexUpperCore(r, g, b);
}

function isImageFile(file) {
  if (!file) return false;
  const mime = String(file.type || "").toLowerCase();
  if (mime.startsWith("image/")) return true;
  return /\.(png|jpg|jpeg|webp|bmp|gif)$/i.test(String(file.name || ""));
}

async function decodeImageFile(file) {
  if (typeof createImageBitmap === "function") {
    const bitmap = await createImageBitmap(file);
    return {
      width: bitmap.width,
      height: bitmap.height,
      source: bitmap,
      cleanup: () => {
        if (typeof bitmap.close === "function") bitmap.close();
      }
    };
  }
  const objectUrl = URL.createObjectURL(file);
  const image = new Image();
  const loaded = new Promise((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("decode_failed"));
  });
  image.src = objectUrl;
  await loaded;
  return {
    width: image.naturalWidth || image.width || 0,
    height: image.naturalHeight || image.height || 0,
    source: image,
    cleanup: () => {
      URL.revokeObjectURL(objectUrl);
    }
  };
}

async function downscaleImageForExtraction(file, maxSide = IMAGE_EXTRACT_MAX_SIDE) {
  const decoded = await decodeImageFile(file);
  const srcWidth = Math.max(1, decoded.width || 1);
  const srcHeight = Math.max(1, decoded.height || 1);
  const scale = Math.min(1, maxSide / Math.max(srcWidth, srcHeight));
  const width = Math.max(1, Math.round(srcWidth * scale));
  const height = Math.max(1, Math.round(srcHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    decoded.cleanup?.();
    throw new Error("canvas_context_unavailable");
  }
  ctx.drawImage(decoded.source, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height);
  decoded.cleanup?.();
  return { imageData, srcWidth, srcHeight, width, height };
}

function colorDistanceSq(a, b) {
  return colorDistanceSqCore(a, b);
}

function sampleImagePixels(imageData, priorityMode) {
  return sampleImagePixelsCore(imageData, priorityMode);
}

function initKMeansCentroids(samples, count) {
  return initKMeansCentroidsCore(samples, count);
}

function quantizeSamplesKMeans(samples, targetCount) {
  return quantizeSamplesKMeansCore(samples, targetCount);
}

function hasCloseColor(colors, candidate, threshold) {
  return hasCloseColorCore(colors, candidate, threshold);
}

function sortRgbByHue(colors) {
  return sortRgbByHueCore(colors);
}

function extractPaletteFromImageData(imageData, requestedCount, priorityMode) {
  return extractPaletteFromImageDataCore(imageData, requestedCount, priorityMode, {
    minCount: IMAGE_EXTRACT_MIN,
    maxCount: IMAGE_EXTRACT_MAX
  });
}

function normalizeShareSim(raw) {
  return normalizeShareSimCore(raw, SHARE_SIM_TO_INTERNAL);
}

function toInternalVisionMode(shareSim) {
  return toInternalVisionModeCore(shareSim, SHARE_SIM_TO_INTERNAL);
}

function toShareSim(internalMode) {
  return toShareSimCore(internalMode, SHARE_SIM_FROM_INTERNAL);
}

function normalizeShareRoles(rawRoles, stopCount) {
  return normalizeShareRolesCore(rawRoles, stopCount, ROLE_KEYS);
}

function normalizeShareStatePayload(payload) {
  return normalizeShareStatePayloadCore(payload, {
    shareStateVersion: SHARE_STATE_VERSION,
    normalizeHex,
    minStops: MIN_STOPS,
    maxStops: MAX_STOPS,
    roleKeys: ROLE_KEYS,
    previewTabs: PREVIEW_TABS,
    shareSimToInternal: SHARE_SIM_TO_INTERNAL
  });
}

function encodeBase64UrlUtf8(text) {
  return encodeBase64UrlUtf8Core(text);
}

function decodeBase64UrlUtf8(input) {
  return decodeBase64UrlUtf8Core(input);
}

function encodePaletteShareState(statePayload) {
  return encodePaletteShareStateCore(statePayload, {
    shareStateVersion: SHARE_STATE_VERSION,
    normalizePayload: normalizeShareStatePayload
  });
}

function decodePaletteShareState(rawValue) {
  return decodePaletteShareStateCore(rawValue, {
    shareStateVersion: SHARE_STATE_VERSION,
    normalizePayload: normalizeShareStatePayload
  });
}

function parsePaletteShareStateFromHash(hashText) {
  const hash = String(hashText || "").replace(/^#/, "");
  if (!hash) return { status: "none", state: null };
  const params = new URLSearchParams(hash);
  return decodePaletteShareState(params.get("p"));
}

function normalizeSearchText(searchText) {
  return normalizeSearchTextCore(searchText);
}

function normalizeShortShareId(rawValue) {
  return normalizeShortShareIdCore(rawValue);
}

function createShortShareId(length = SHORT_SHARE_ID_LENGTH) {
  const cryptoApi = typeof window !== "undefined" ? window.crypto : globalThis.crypto;
  return createShortShareIdCore({
    length,
    alphabet: SHORT_SHARE_ALPHABET,
    cryptoApi
  });
}

function createLibraryPresetId(length = LIBRARY_ID_LENGTH) {
  const cryptoApi = typeof window !== "undefined" ? window.crypto : globalThis.crypto;
  return createLibraryPresetIdCore({
    length,
    alphabet: LIBRARY_ID_ALPHABET,
    cryptoApi
  });
}

function toIsoString(value) {
  return toIsoStringCore(value);
}

function formatStampVi(value) {
  return formatStampViCore(value, "vi-VN");
}

function parseTagsText(raw) {
  return String(raw || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 20);
}

function normalizeTeamRole(rawRole) {
  const role = String(rawRole || "").trim().toLowerCase();
  if (role === TEAM_ROLE_OWNER) return TEAM_ROLE_OWNER;
  if (role === TEAM_ROLE_EDITOR) return TEAM_ROLE_EDITOR;
  if (role === TEAM_ROLE_APPROVER) return TEAM_ROLE_APPROVER;
  return TEAM_ROLE_VIEWER;
}

function canWriteTeamRole(role) {
  return TEAM_WRITABLE_ROLES.includes(normalizeTeamRole(role));
}

function canApproveTeamRole(role) {
  return TEAM_APPROVER_ROLES.includes(normalizeTeamRole(role));
}

function canCommentTeamApproval(role) {
  return TEAM_COMMENTER_ROLES.includes(normalizeTeamRole(role));
}

function normalizeApprovalStatus(rawStatus) {
  const status = String(rawStatus || "").trim().toLowerCase();
  return APPROVAL_STATUS_VALUES.includes(status) ? status : APPROVAL_STATUS_DRAFT;
}

function getApprovalStatusLabel(status) {
  const normalized = normalizeApprovalStatus(status);
  return t(`paletteTool.library.approval.status.${normalized}`, normalized);
}

function getApprovalStatusClass(status) {
  const normalized = normalizeApprovalStatus(status);
  return `is-${normalized}`;
}

function canSubmitApprovalByStatus(status) {
  const normalized = normalizeApprovalStatus(status);
  return [
    APPROVAL_STATUS_DRAFT,
    APPROVAL_STATUS_CHANGES_REQUESTED,
    APPROVAL_STATUS_REJECTED
  ].includes(normalized);
}

function canApproveByStatus(status) {
  return normalizeApprovalStatus(status) === APPROVAL_STATUS_IN_REVIEW;
}

function canRequestChangesByStatus(status) {
  const normalized = normalizeApprovalStatus(status);
  return [
    APPROVAL_STATUS_IN_REVIEW,
    APPROVAL_STATUS_APPROVED
  ].includes(normalized);
}

function canRejectByStatus(status) {
  const normalized = normalizeApprovalStatus(status);
  return [
    APPROVAL_STATUS_IN_REVIEW,
    APPROVAL_STATUS_CHANGES_REQUESTED
  ].includes(normalized);
}

function canPublishByStatus(status) {
  return normalizeApprovalStatus(status) === APPROVAL_STATUS_APPROVED;
}

function clampGuidelineAdjustSteps(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return TEAM_GUIDELINE_DEFAULT.maxAdjustSteps;
  return Math.max(1, Math.min(40, Math.round(parsed)));
}

function normalizeTeamGuideline(raw) {
  const next = raw && typeof raw === "object" ? raw : {};
  const targetLevel = String(next.targetLevel || TEAM_GUIDELINE_DEFAULT.targetLevel).trim().toUpperCase() === "AAA"
    ? "AAA"
    : "AA";
  const textSize = String(next.textSize || TEAM_GUIDELINE_DEFAULT.textSize).trim().toLowerCase() === "large"
    ? "large"
    : "normal";
  const lockedRoles = Array.isArray(next.lockedRoles)
    ? Array.from(new Set(next.lockedRoles.map((role) => String(role || "").trim()).filter((role) => ROLE_KEYS.includes(role))))
    : [];
  return {
    targetLevel,
    textSize,
    lockedRoles,
    preferKeepHue: next.preferKeepHue !== false,
    maxAdjustSteps: clampGuidelineAdjustSteps(next.maxAdjustSteps)
  };
}

function getGuidelineThreshold(guideline) {
  const normalized = normalizeTeamGuideline(guideline || null);
  if (normalized.targetLevel === "AAA") {
    return normalized.textSize === "large" ? 4.5 : 7;
  }
  return normalized.textSize === "large" ? 3 : 4.5;
}

function normalizeRoomId(rawValue) {
  const roomId = String(rawValue || "").trim();
  if (!roomId) return "";
  if (!/^[A-Za-z0-9_-]{3,80}$/.test(roomId)) return "";
  return roomId;
}

function normalizeRoomShareMode(rawMode) {
  const mode = String(rawMode || "").trim();
  if (mode === ROOM_SHARE_PUBLIC) return ROOM_SHARE_PUBLIC;
  return ROOM_SHARE_INVITE_ONLY;
}

function parseRoomIdFromQuery(searchText) {
  const params = new URLSearchParams(normalizeSearchText(searchText ?? window.location.search));
  return normalizeRoomId(params.get("room"));
}

function canUseRoomRealtimeApi(api) {
  return !!(
    api &&
    api.db &&
    api.auth &&
    typeof api.doc === "function" &&
    typeof api.getDoc === "function" &&
    typeof api.setDoc === "function"
  );
}

function roomReadOnlyByRole(role) {
  return !canWriteTeamRole(role);
}

function setRoomStatus(status) {
  state.room.status = String(status || "idle");
  renderRoomBanner();
}

function cleanupRoomPresenceListener() {
  if (typeof roomPresenceListenerUnsub === "function") {
    try {
      roomPresenceListenerUnsub();
    } catch (_err) {
      // ignore unlisten errors
    }
  }
  roomPresenceListenerUnsub = null;
  if (roomPresenceHeartbeat) {
    window.clearInterval(roomPresenceHeartbeat);
    roomPresenceHeartbeat = null;
  }
  if (roomPresenceTimer) {
    window.clearTimeout(roomPresenceTimer);
    roomPresenceTimer = null;
  }
}

function resolvePresenceDisplayName(user) {
  const rawName = String(user?.displayName || "").trim();
  if (rawName) return rawName;
  const email = String(user?.email || "").trim();
  if (email && email.includes("@")) {
    return email.split("@")[0];
  }
  return t("paletteTool.room.presence.fallbackUser", "Khách");
}

function buildPresenceInitials(name) {
  const normalized = String(name || "").trim();
  if (!normalized) return "?";
  const parts = normalized.split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase();
}

function hashToHue(text) {
  const raw = String(text || "");
  let hash = 0;
  for (let i = 0; i < raw.length; i += 1) {
    hash = ((hash << 5) - hash) + raw.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % 360;
}

function normalizePresenceDoc(uid, raw) {
  const identity = String(uid || "").trim();
  if (!identity || !raw || typeof raw !== "object") return null;
  const displayName = String(raw.displayName || "").trim() || t("paletteTool.room.presence.fallbackUser", "Khách");
  const activePaletteIndexRaw = Number(raw.activePaletteIndex);
  const activePaletteIndex = Number.isFinite(activePaletteIndexRaw) && activePaletteIndexRaw >= 0
    ? Math.floor(activePaletteIndexRaw)
    : null;
  const activeRoleKey = ROLE_KEYS.includes(raw.activeRoleKey) ? raw.activeRoleKey : "";
  const activePanel = String(raw.activePanel || "").trim();
  const seenIso = toIsoString(raw.lastSeenAt);
  const seenAt = seenIso ? Date.parse(seenIso) : 0;
  return {
    uid: identity,
    displayName,
    initials: buildPresenceInitials(displayName),
    hue: hashToHue(identity || displayName),
    activePaletteIndex,
    activeRoleKey,
    activePanel,
    lastSeenAt: seenIso,
    lastSeenMs: Number.isFinite(seenAt) ? seenAt : 0
  };
}

function isPresenceOnline(entry) {
  if (!entry?.lastSeenMs) return false;
  return (Date.now() - entry.lastSeenMs) <= ROOM_PRESENCE_ONLINE_WINDOW_MS;
}

function getOnlinePresenceEntries(options = {}) {
  const { includeSelf = false } = options;
  const currentUid = String(state.room.selfUid || "").trim();
  const list = [];
  state.room.presenceByUid.forEach((entry) => {
    if (!entry) return;
    if (!includeSelf && currentUid && entry.uid === currentUid) return;
    if (!isPresenceOnline(entry)) return;
    list.push(entry);
  });
  list.sort((a, b) => {
    const aSeen = Number(a.lastSeenMs || 0);
    const bSeen = Number(b.lastSeenMs || 0);
    return bSeen - aSeen;
  });
  return list;
}

function applyPresenceBadgesInDom() {
  const clearBadges = () => {
    document.querySelectorAll("[data-presence-palette-index], [data-presence-role-key]").forEach((node) => {
      node.textContent = "";
      node.title = "";
      node.classList.add("is-hidden");
    });
  };
  if (!state.room.active) {
    clearBadges();
    return;
  }
  const online = getOnlinePresenceEntries({ includeSelf: false });
  const paletteMap = new Map();
  const roleMap = new Map();
  online.forEach((entry) => {
    if (Number.isInteger(entry.activePaletteIndex) && !paletteMap.has(entry.activePaletteIndex)) {
      paletteMap.set(entry.activePaletteIndex, entry);
    }
    if (entry.activeRoleKey && ROLE_KEYS.includes(entry.activeRoleKey) && !roleMap.has(entry.activeRoleKey)) {
      roleMap.set(entry.activeRoleKey, entry);
    }
  });
  const badgeText = (name) => t("paletteTool.room.presence.editingBy", "đang chỉnh bởi {name}", { name });
  document.querySelectorAll("[data-presence-palette-index]").forEach((node) => {
    const idx = Number(node.getAttribute("data-presence-palette-index"));
    const entry = Number.isFinite(idx) ? paletteMap.get(idx) : null;
    const text = entry ? badgeText(entry.displayName) : "";
    node.textContent = text;
    node.title = text;
    node.classList.toggle("is-hidden", !entry);
  });
  document.querySelectorAll("[data-presence-role-key]").forEach((node) => {
    const roleKey = String(node.getAttribute("data-presence-role-key") || "");
    const entry = roleMap.get(roleKey) || null;
    const text = entry ? badgeText(entry.displayName) : "";
    node.textContent = text;
    node.title = text;
    node.classList.toggle("is-hidden", !entry);
  });
}

function renderRoomPresenceStack() {
  if (!el.roomPresence) return;
  el.roomPresence.innerHTML = "";
  if (!state.room.active) return;
  const online = getOnlinePresenceEntries({ includeSelf: true });
  if (!online.length) {
    const empty = document.createElement("span");
    empty.className = "tc-room-presence-empty";
    empty.textContent = t("paletteTool.room.presence.empty", "Chưa có ai online");
    el.roomPresence.appendChild(empty);
    return;
  }
  const stack = document.createElement("div");
  stack.className = "tc-avatar-stack";
  const visible = online.slice(0, 4);
  visible.forEach((entry) => {
    const avatar = document.createElement("span");
    avatar.className = "tc-avatar-chip";
    if (entry.uid === state.room.selfUid) {
      avatar.classList.add("is-self");
    }
    avatar.style.background = `linear-gradient(130deg, hsl(${entry.hue} 84% 92%), hsl(${(entry.hue + 28) % 360} 70% 84%))`;
    avatar.textContent = entry.initials;
    avatar.setAttribute("aria-label", entry.displayName);
    avatar.title = entry.displayName;
    stack.appendChild(avatar);
  });
  if (online.length > visible.length) {
    const more = document.createElement("span");
    more.className = "tc-avatar-chip is-more";
    more.textContent = `+${online.length - visible.length}`;
    more.title = t("paletteTool.room.presence.more", "Thêm {count} người đang online", {
      count: String(online.length - visible.length)
    });
    stack.appendChild(more);
  }
  const count = document.createElement("span");
  count.className = "tc-room-presence-empty";
  count.textContent = t("paletteTool.room.presence.onlineCount", "{count} online", {
    count: String(online.length)
  });
  el.roomPresence.appendChild(stack);
  el.roomPresence.appendChild(count);
}

function schedulePresenceBadgeRefresh() {
  renderRoomPresenceStack();
  applyPresenceBadgesInDom();
}

function markPresenceIntent(payload = {}) {
  const next = {
    activePaletteIndex: Number.isInteger(payload.activePaletteIndex) && payload.activePaletteIndex >= 0
      ? payload.activePaletteIndex
      : (payload.activePaletteIndex === null ? null : roomPresenceDraft.activePaletteIndex),
    activeRoleKey: ROLE_KEYS.includes(payload.activeRoleKey)
      ? payload.activeRoleKey
      : (payload.activeRoleKey === "" ? "" : roomPresenceDraft.activeRoleKey),
    activePanel: String(payload.activePanel || roomPresenceDraft.activePanel || "").trim()
  };
  roomPresenceDraft = next;
  queueRoomPresenceUpdate({ immediate: false });
}

function queueRoomPresenceUpdate(options = {}) {
  const { immediate = false } = options;
  if (!state.room.active || !state.room.id || !state.room.selfUid) return false;
  if (roomPresenceTimer) {
    window.clearTimeout(roomPresenceTimer);
    roomPresenceTimer = null;
  }
  if (immediate) {
    window.setTimeout(() => {
      flushRoomPresenceUpdate();
    }, 0);
    return true;
  }
  roomPresenceTimer = window.setTimeout(() => {
    roomPresenceTimer = null;
    flushRoomPresenceUpdate();
  }, ROOM_PRESENCE_THROTTLE_MS);
  return true;
}

async function flushRoomPresenceUpdate() {
  if (roomPresenceTimer) {
    window.clearTimeout(roomPresenceTimer);
    roomPresenceTimer = null;
  }
  if (roomPresenceWriteBusy) {
    queueRoomPresenceUpdate({ immediate: false });
    return false;
  }
  if (!state.room.active || !state.room.id || !state.room.selfUid) return false;
  const api = await waitForFirebaseApi();
  if (!canUseRoomRealtimeApi(api)) return false;
  const user = await waitForFirebaseUser(api);
  if (!user?.uid || user.uid !== state.room.selfUid) return false;
  roomPresenceWriteBusy = true;
  try {
    const presenceRef = api.doc(api.db, ROOM_COLLECTION, state.room.id, ROOM_PRESENCE_COLLECTION, state.room.selfUid);
    await api.setDoc(presenceRef, {
      displayName: state.room.selfDisplayName || resolvePresenceDisplayName(user),
      activePaletteIndex: Number.isInteger(roomPresenceDraft.activePaletteIndex) ? roomPresenceDraft.activePaletteIndex : null,
      activeRoleKey: ROLE_KEYS.includes(roomPresenceDraft.activeRoleKey) ? roomPresenceDraft.activeRoleKey : "",
      activePanel: String(roomPresenceDraft.activePanel || ""),
      lastSeenAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (_err) {
    return false;
  } finally {
    roomPresenceWriteBusy = false;
  }
}

async function startRoomPresenceSync(api, realtimeApi) {
  if (!state.room.id || !state.room.selfUid || !api || !realtimeApi) return false;
  cleanupRoomPresenceListener();
  const presenceCol = api.collection(api.db, ROOM_COLLECTION, state.room.id, ROOM_PRESENCE_COLLECTION);
  roomPresenceListenerUnsub = realtimeApi.onSnapshot(presenceCol, (snapshot) => {
    const next = new Map();
    snapshot?.forEach?.((docSnap) => {
      const uid = String(docSnap.id || "").trim();
      const item = normalizePresenceDoc(uid, docSnap.data?.() || null);
      if (item) next.set(uid, item);
    });
    state.room.presenceByUid = next;
    schedulePresenceBadgeRefresh();
  }, () => {
    // ignore presence listen errors to avoid noisy UX
  });
  roomPresenceHeartbeat = window.setInterval(() => {
    queueRoomPresenceUpdate({ immediate: true });
  }, ROOM_PRESENCE_HEARTBEAT_MS);
  queueRoomPresenceUpdate({ immediate: true });
  return true;
}

function cleanupRoomRevisionListener() {
  if (typeof roomRevisionListenerUnsub === "function") {
    try {
      roomRevisionListenerUnsub();
    } catch (_err) {
      // ignore unlisten errors
    }
  }
  roomRevisionListenerUnsub = null;
}

function cloneRoomSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object") return null;
  try {
    return JSON.parse(JSON.stringify(snapshot));
  } catch (_err) {
    return null;
  }
}

function normalizeRoomRevisionDoc(id, raw) {
  if (!id || !raw || typeof raw !== "object") return null;
  const snapshot = normalizeShareStatePayload(raw.snapshot || null);
  if (!snapshot) return null;
  const revRaw = Number(raw.rev);
  const rev = Number.isFinite(revRaw) && revRaw >= 0 ? Math.floor(revRaw) : 0;
  const createdByUid = String(raw.createdByUid || "").trim();
  if (!createdByUid) return null;
  const createdAt = toIsoString(raw.createdAt) || "";
  const label = String(raw.label || "").trim();
  const diff = (raw.diff && typeof raw.diff === "object" && !Array.isArray(raw.diff)) ? raw.diff : null;
  return {
    id: String(id),
    rev,
    snapshot,
    createdByUid,
    createdAt,
    label: label.slice(0, 80),
    diff
  };
}

function buildRoomRevisionDiff(previousSnapshot, nextSnapshot) {
  const prev = normalizeShareStatePayload(previousSnapshot || null);
  const next = normalizeShareStatePayload(nextSnapshot || null);
  if (!prev || !next) return null;
  const diff = {};
  const maxStops = Math.max(prev.colors.length, next.colors.length);
  let changedStops = 0;
  for (let idx = 0; idx < maxStops; idx += 1) {
    if (String(prev.colors[idx] || "") !== String(next.colors[idx] || "")) {
      changedStops += 1;
    }
  }
  if (changedStops > 0) {
    diff.changedStops = changedStops;
  }
  let changedRoles = 0;
  ROLE_KEYS.forEach((roleKey) => {
    if (Number(prev.roles[roleKey]) !== Number(next.roles[roleKey])) {
      changedRoles += 1;
    }
  });
  if (changedRoles > 0) {
    diff.changedRoles = changedRoles;
  }
  if (String(prev.preview) !== String(next.preview)) {
    diff.previewChanged = `${prev.preview}->${next.preview}`;
  }
  if (String(prev.sim) !== String(next.sim)) {
    diff.simChanged = `${prev.sim}->${next.sim}`;
  }
  return Object.keys(diff).length ? diff : null;
}

function resolveRoomRevisionStateText() {
  switch (state.room.revisionStatus) {
    case "loading":
      return t("paletteTool.room.revisions.state.loading", "Đang tải lịch sử phiên bản...");
    case "empty":
      return t("paletteTool.room.revisions.state.empty", "Chưa có mốc phiên bản.");
    case "error":
      return t("paletteTool.room.revisions.state.error", "Không thể tải lịch sử phiên bản.");
    case "rate-limited":
      return t("paletteTool.room.revisions.state.rateLimited", "Bạn vừa tạo mốc, thử lại sau vài giây.");
    case "saving":
      return t("paletteTool.room.revisions.state.saving", "Đang lưu mốc phiên bản...");
    case "ready":
      return t("paletteTool.room.revisions.state.ready", "Danh sách phiên bản đã sẵn sàng.");
    default:
      return t("paletteTool.room.revisions.state.idle", "Kết nối phòng để xem lịch sử phiên bản.");
  }
}

function formatRoomRevisionTime(isoText) {
  return formatRoomRevisionTimeCore(isoText, {
    locale: "vi-VN",
    unknownText: t("paletteTool.room.revisions.unknownTime", "Không rõ thời gian")
  });
}

function renderRoomRevisionPreview(selectedRevision) {
  if (!el.roomRevisionPreview) return;
  if (!selectedRevision) {
    el.roomRevisionPreview.classList.add("hidden");
    el.roomRevisionPreview.innerHTML = "";
    return;
  }
  el.roomRevisionPreview.classList.remove("hidden");
  const title = selectedRevision.label
    ? t("paletteTool.room.revisions.preview.titleWithLabel", "Rev {rev} · {label}", {
      rev: String(selectedRevision.rev),
      label: selectedRevision.label
    })
    : t("paletteTool.room.revisions.preview.title", "Rev {rev}", {
      rev: String(selectedRevision.rev)
    });
  const byText = selectedRevision.createdByUid === state.room.selfUid
    ? t("paletteTool.room.revisions.you", "Bạn")
    : selectedRevision.createdByUid;
  const meta = t("paletteTool.room.revisions.preview.meta", "{time} · bởi {uid}", {
    time: formatRoomRevisionTime(selectedRevision.createdAt),
    uid: byText
  });
  const swatches = (selectedRevision.snapshot.colors || [])
    .slice(0, 7)
    .map((hex) => `<span class="tc-room-revision-swatch" style="background:${hex}" title="${hex}"></span>`)
    .join("");
  el.roomRevisionPreview.innerHTML = `
    <p class="tc-room-revision-preview__title">${title}</p>
    <p class="tc-room-revision-preview__meta">${meta}</p>
    <div class="tc-room-revision-preview__swatches">${swatches}</div>
  `;
}

function renderRoomRevisionPanel() {
  if (!el.roomRevisionPanel) return;
  const hasRoom = Boolean(state.room.id);
  el.roomRevisionPanel.classList.toggle("hidden", !hasRoom);
  if (el.roomRevisionTitle) {
    el.roomRevisionTitle.textContent = t("paletteTool.room.revisions.title", "Lịch sử phiên bản");
  }
  if (el.roomRevisionDesc) {
    el.roomRevisionDesc.textContent = t("paletteTool.room.revisions.desc", "Timeline các phiên bản để xem và khôi phục.");
  }
  if (el.roomRevisionCreate) {
    el.roomRevisionCreate.textContent = t("paletteTool.room.revisions.create", "Tạo mốc phiên bản");
    el.roomRevisionCreate.disabled = !isRoomSyncWritable();
  }
  if (!hasRoom) {
    if (el.roomRevisionList) el.roomRevisionList.innerHTML = "";
    if (el.roomRevisionState) el.roomRevisionState.textContent = "";
    renderRoomRevisionPreview(null);
    return;
  }
  if (el.roomRevisionState) {
    el.roomRevisionState.textContent = resolveRoomRevisionStateText();
  }
  if (!el.roomRevisionList) return;
  el.roomRevisionList.innerHTML = "";
  const items = Array.isArray(state.room.revisions) ? state.room.revisions : [];
  if (!items.length) {
    renderRoomRevisionPreview(null);
    return;
  }
  items.forEach((item) => {
    const row = document.createElement("article");
    row.className = "tc-room-revision-item";
    if (item.id === state.room.revisionPreviewId) {
      row.classList.add("is-active");
    }
    const heading = document.createElement("p");
    heading.className = "tc-room-revision-item__title";
    heading.textContent = item.label
      ? t("paletteTool.room.revisions.item.titleWithLabel", "Rev {rev} · {label}", {
        rev: String(item.rev),
        label: item.label
      })
      : t("paletteTool.room.revisions.item.title", "Rev {rev}", {
        rev: String(item.rev)
      });
    const byText = item.createdByUid === state.room.selfUid
      ? t("paletteTool.room.revisions.you", "Bạn")
      : item.createdByUid;
    const meta = document.createElement("p");
    meta.className = "tc-room-revision-item__meta";
    meta.textContent = t("paletteTool.room.revisions.item.meta", "{time} · bởi {uid}", {
      time: formatRoomRevisionTime(item.createdAt),
      uid: byText
    });
    const actions = document.createElement("div");
    actions.className = "tc-room-revision-item__actions";
    const viewBtn = document.createElement("button");
    viewBtn.type = "button";
    viewBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    viewBtn.textContent = t("paletteTool.room.revisions.actions.view", "Xem");
    viewBtn.addEventListener("click", () => {
      state.room.revisionPreviewId = item.id;
      renderRoomRevisionPanel();
    });
    const restoreBtn = document.createElement("button");
    restoreBtn.type = "button";
    restoreBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    restoreBtn.textContent = t("paletteTool.room.revisions.actions.restore", "Khôi phục");
    restoreBtn.disabled = !isRoomSyncWritable();
    restoreBtn.addEventListener("click", () => {
      restoreRoomRevision(item);
    });
    actions.appendChild(viewBtn);
    actions.appendChild(restoreBtn);
    row.appendChild(heading);
    row.appendChild(meta);
    row.appendChild(actions);
    el.roomRevisionList.appendChild(row);
  });
  const selected = items.find((item) => item.id === state.room.revisionPreviewId) || items[0];
  if (selected && selected.id !== state.room.revisionPreviewId) {
    state.room.revisionPreviewId = selected.id;
  }
  renderRoomRevisionPreview(selected || null);
}

async function startRoomRevisionSync(api, realtimeApi) {
  if (!state.room.id || !api || !realtimeApi || typeof realtimeApi.onSnapshot !== "function") return false;
  cleanupRoomRevisionListener();
  state.room.revisionStatus = "loading";
  renderRoomRevisionPanel();
  let target = api.collection(api.db, ROOM_COLLECTION, state.room.id, ROOM_REVISION_COLLECTION);
  if (typeof api.query === "function" && typeof api.orderBy === "function" && typeof api.limit === "function") {
    target = api.query(target, api.orderBy("rev", "desc"), api.limit(ROOM_REVISION_FETCH_LIMIT));
  }
  roomRevisionListenerUnsub = realtimeApi.onSnapshot(target, (snapshot) => {
    const revisions = [];
    snapshot?.forEach?.((docSnap) => {
      const item = normalizeRoomRevisionDoc(docSnap.id, docSnap.data?.() || null);
      if (item) revisions.push(item);
    });
    revisions.sort((a, b) => {
      if (b.rev !== a.rev) return b.rev - a.rev;
      return Date.parse(b.createdAt || 0) - Date.parse(a.createdAt || 0);
    });
    state.room.revisions = revisions;
    state.room.revisionStatus = revisions.length ? "ready" : "empty";
    if (state.room.revisionPreviewId && !revisions.some((item) => item.id === state.room.revisionPreviewId)) {
      state.room.revisionPreviewId = revisions[0]?.id || "";
    }
    renderRoomRevisionPanel();
  }, () => {
    state.room.revisionStatus = "error";
    renderRoomRevisionPanel();
  });
  return true;
}

function cleanupRoomCommentListener() {
  if (typeof roomCommentListenerUnsub === "function") {
    try {
      roomCommentListenerUnsub();
    } catch (_err) {
      // ignore unlisten errors
    }
  }
  roomCommentListenerUnsub = null;
}

function canWriteRoomComments() {
  if (!state.room.active || !state.room.id) return false;
  if (canWriteTeamRole(state.room.role)) return true;
  return ROOM_VIEWER_CAN_COMMENT && !state.room.readOnly;
}

function canResolveRoomComments() {
  return !!(state.room.active && state.room.id && canWriteTeamRole(state.room.role) && !state.room.readOnly);
}

function normalizeRoomCommentDoc(id, raw) {
  const commentId = String(id || "").trim();
  if (!commentId || !raw || typeof raw !== "object") return null;
  if (String(raw.targetType || "") !== "role") return null;
  const targetKey = String(raw.targetKey || "").trim();
  if (!ROLE_KEYS.includes(targetKey)) return null;
  const message = String(raw.message || "").trim();
  if (!message) return null;
  const threadRootId = String(raw.threadRootId || "").trim();
  if (!threadRootId) return null;
  const createdByUid = String(raw.createdByUid || "").trim();
  if (!createdByUid) return null;
  const createdByName = String(raw.createdByName || "").trim() || createdByUid;
  const createdAt = toIsoString(raw.createdAt) || "";
  const resolved = raw.resolved === true;
  const resolvedByUid = String(raw.resolvedByUid || "").trim();
  const resolvedByName = String(raw.resolvedByName || "").trim();
  const resolvedAt = toIsoString(raw.resolvedAt) || "";
  const parentId = String(raw.parentId || "").trim();
  return {
    id: commentId,
    targetType: "role",
    targetKey,
    message: message.slice(0, ROOM_COMMENT_MAX_LENGTH),
    threadRootId,
    parentId,
    createdByUid,
    createdByName,
    createdAt,
    createdAtMs: Number.isFinite(Date.parse(createdAt)) ? Date.parse(createdAt) : 0,
    resolved,
    resolvedByUid,
    resolvedByName,
    resolvedAt
  };
}

function getRoomCommentRoots() {
  const roots = new Map();
  const list = Array.isArray(state.room.comments) ? state.room.comments : [];
  list.forEach((item) => {
    if (!item || item.threadRootId !== item.id) return;
    roots.set(item.id, {
      ...item,
      replies: []
    });
  });
  list.forEach((item) => {
    if (!item || item.threadRootId === item.id) return;
    const root = roots.get(item.threadRootId);
    if (!root) return;
    root.replies.push(item);
  });
  roots.forEach((root) => {
    root.replies.sort((a, b) => {
      if (a.createdAtMs !== b.createdAtMs) return a.createdAtMs - b.createdAtMs;
      return String(a.id).localeCompare(String(b.id));
    });
  });
  return roots;
}

function getRoomCommentThreads() {
  const roots = Array.from(getRoomCommentRoots().values());
  roots.sort((a, b) => {
    if (b.createdAtMs !== a.createdAtMs) return b.createdAtMs - a.createdAtMs;
    return String(b.id).localeCompare(String(a.id));
  });
  const activeFilter = (state.room.commentFilterRole === "all" || ROLE_KEYS.includes(state.room.commentFilterRole))
    ? state.room.commentFilterRole
    : "all";
  if (activeFilter === "all") return roots;
  return roots.filter((root) => root.targetKey === activeFilter);
}

function getRoomUnresolvedCommentCounts() {
  const counts = {
    total: 0
  };
  ROLE_KEYS.forEach((roleKey) => {
    counts[roleKey] = 0;
  });
  const roots = getRoomCommentRoots();
  roots.forEach((root) => {
    if (root.resolved) return;
    counts.total += 1;
    counts[root.targetKey] = (counts[root.targetKey] || 0) + 1;
  });
  return counts;
}

function resolveRoomCommentRoleLabel(roleKey) {
  return t(`paletteTool.roles.items.${roleKey}`, roleKey);
}

function resolveRoomCommentStatusText() {
  switch (state.room.commentStatus) {
    case "loading":
      return t("paletteTool.room.comments.state.loading", "Đang tải bình luận...");
    case "error":
      return t("paletteTool.room.comments.state.error", "Không thể tải bình luận.");
    case "empty":
      return t("paletteTool.room.comments.state.empty", "Chưa có bình luận nào.");
    case "ready":
      return t("paletteTool.room.comments.state.ready", "Đang hiển thị bình luận theo vai màu.");
    case "posting":
      return t("paletteTool.room.comments.state.posting", "Đang gửi bình luận...");
    default:
      return t("paletteTool.room.comments.state.idle", "Kết nối phòng để xem bình luận.");
  }
}

function applyRoomCommentBadgesInDom() {
  const counts = getRoomUnresolvedCommentCounts();
  document.querySelectorAll("[data-comment-role-badge]").forEach((node) => {
    const roleKey = String(node.getAttribute("data-comment-role-badge") || "");
    const value = Number(counts[roleKey] || 0);
    node.textContent = value > 0 ? String(value) : "";
    node.classList.toggle("is-hidden", value <= 0);
  });
}

function clearRoomCommentReply() {
  state.room.commentReplyRootId = "";
}

function setRoomCommentReply(rootId) {
  const root = getRoomCommentRoots().get(String(rootId || "").trim());
  if (!root) return false;
  state.room.commentReplyRootId = root.id;
  state.room.commentFilterRole = root.targetKey;
  renderRoomCommentPanel();
  if (el.roomCommentInput) {
    el.roomCommentInput.focus();
  }
  return true;
}

function openRoomCommentPanel(roleKey = "") {
  if (!state.room.id || !state.room.active) {
    showToast(t("paletteTool.room.comments.toast.needRoom", "Hãy kết nối Phòng chỉnh sửa để dùng bình luận."));
    return false;
  }
  if (ROLE_KEYS.includes(roleKey)) {
    state.room.commentFilterRole = roleKey;
  }
  renderRoomCommentPanel();
  el.roomCommentPanel?.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function renderRoomCommentPanel() {
  if (!el.roomCommentPanel) return;
  const hasRoom = Boolean(state.room.id);
  el.roomCommentPanel.classList.toggle("hidden", !hasRoom);
  if (el.roomCommentTitle) {
    el.roomCommentTitle.textContent = t("paletteTool.room.comments.title", "Bình luận theo vai màu");
  }
  if (el.roomCommentDesc) {
    el.roomCommentDesc.textContent = t("paletteTool.room.comments.desc", "Mỗi bình luận gắn vào một vai màu để trao đổi chính xác.");
  }
  if (el.roomCommentFilterLabel) {
    el.roomCommentFilterLabel.textContent = t("paletteTool.room.comments.filterLabel", "Lọc theo vai");
  }
  if (!hasRoom) {
    if (el.roomCommentBadge) {
      el.roomCommentBadge.textContent = "";
      el.roomCommentBadge.classList.add("is-hidden");
    }
    if (el.roomCommentList) el.roomCommentList.innerHTML = "";
    if (el.roomCommentState) el.roomCommentState.textContent = "";
    if (el.roomCommentInput) {
      el.roomCommentInput.value = "";
    }
    clearRoomCommentReply();
    applyRoomCommentBadgesInDom();
    return;
  }

  if (!ROLE_KEYS.includes(state.room.commentFilterRole) && state.room.commentFilterRole !== "all") {
    state.room.commentFilterRole = "all";
  }

  if (el.roomCommentFilter) {
    const selected = state.room.commentFilterRole || "all";
    const options = [
      { value: "all", text: t("paletteTool.room.comments.filterAll", "Tất cả vai màu") },
      ...ROLE_KEYS.map((roleKey) => ({
        value: roleKey,
        text: resolveRoomCommentRoleLabel(roleKey)
      }))
    ];
    el.roomCommentFilter.innerHTML = "";
    options.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.value;
      option.textContent = item.text;
      el.roomCommentFilter.appendChild(option);
    });
    el.roomCommentFilter.value = options.some((item) => item.value === selected) ? selected : "all";
    state.room.commentFilterRole = el.roomCommentFilter.value;
  }

  const unresolved = getRoomUnresolvedCommentCounts();
  if (el.roomCommentBadge) {
    const total = Number(unresolved.total || 0);
    el.roomCommentBadge.textContent = total > 0
      ? t("paletteTool.room.comments.unresolved", "{count} chưa xử lý", { count: String(total) })
      : "";
    el.roomCommentBadge.classList.toggle("is-hidden", total <= 0);
  }
  if (el.roomCommentState) {
    el.roomCommentState.textContent = resolveRoomCommentStatusText();
  }

  const canWrite = canWriteRoomComments();
  const canResolve = canResolveRoomComments();
  if (el.roomCommentComposer) {
    el.roomCommentComposer.classList.toggle("is-disabled", !canWrite);
  }
  if (el.roomCommentInput) {
    el.roomCommentInput.disabled = !canWrite;
    el.roomCommentInput.placeholder = canWrite
      ? t("paletteTool.room.comments.inputPlaceholder", "Nhập bình luận cho vai màu này...")
      : t("paletteTool.room.comments.readonlyHint", "Bạn đang ở chế độ chỉ xem, không thể bình luận.");
  }
  if (el.roomCommentSubmit) {
    el.roomCommentSubmit.disabled = !canWrite;
    el.roomCommentSubmit.textContent = t("paletteTool.room.comments.submit", "Gửi bình luận");
  }

  const replyRoot = getRoomCommentRoots().get(state.room.commentReplyRootId || "");
  if (el.roomCommentReply && el.roomCommentReplyText) {
    if (replyRoot) {
      el.roomCommentReply.classList.remove("hidden");
      el.roomCommentReplyText.textContent = t(
        "paletteTool.room.comments.replyingTo",
        "Đang trả lời: {role}",
        { role: resolveRoomCommentRoleLabel(replyRoot.targetKey) }
      );
    } else {
      el.roomCommentReply.classList.add("hidden");
      el.roomCommentReplyText.textContent = "";
      state.room.commentReplyRootId = "";
    }
  }
  if (el.roomCommentReplyCancel) {
    el.roomCommentReplyCancel.disabled = !replyRoot;
    el.roomCommentReplyCancel.textContent = t("paletteTool.room.comments.cancelReply", "Huỷ trả lời");
  }

  if (!el.roomCommentList) {
    applyRoomCommentBadgesInDom();
    return;
  }

  const threads = getRoomCommentThreads();
  el.roomCommentList.innerHTML = "";
  if (!threads.length) {
    const empty = document.createElement("p");
    empty.className = "tc-room-comment-empty";
    empty.textContent = t("paletteTool.room.comments.emptyList", "Chưa có bình luận cho vai màu đang lọc.");
    el.roomCommentList.appendChild(empty);
    applyRoomCommentBadgesInDom();
    return;
  }

  threads.forEach((thread) => {
    const wrap = document.createElement("article");
    wrap.className = "tc-room-comment-thread";
    if (thread.resolved) {
      wrap.classList.add("is-resolved");
    }

    const head = document.createElement("div");
    head.className = "tc-room-comment-head";
    const role = document.createElement("span");
    role.className = "tc-room-comment-role";
    role.textContent = resolveRoomCommentRoleLabel(thread.targetKey);
    const meta = document.createElement("span");
    meta.className = "tc-room-comment-meta";
    const byText = thread.createdByUid === state.room.selfUid
      ? t("paletteTool.room.comments.you", "Bạn")
      : thread.createdByName;
    meta.textContent = t("paletteTool.room.comments.meta", "{time} · bởi {name}", {
      time: formatRoomRevisionTime(thread.createdAt),
      name: byText
    });
    head.appendChild(role);
    head.appendChild(meta);

    const body = document.createElement("p");
    body.className = "tc-room-comment-message";
    body.textContent = thread.message;

    const actions = document.createElement("div");
    actions.className = "tc-room-comment-actions";

    const replyBtn = document.createElement("button");
    replyBtn.type = "button";
    replyBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    replyBtn.textContent = t("paletteTool.room.comments.actions.reply", "Trả lời");
    replyBtn.disabled = !canWrite;
    replyBtn.addEventListener("click", () => {
      setRoomCommentReply(thread.id);
    });
    actions.appendChild(replyBtn);

    const resolveBtn = document.createElement("button");
    resolveBtn.type = "button";
    resolveBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    resolveBtn.textContent = thread.resolved
      ? t("paletteTool.room.comments.actions.unresolve", "Mở lại")
      : t("paletteTool.room.comments.actions.resolve", "Đã xử lý");
    resolveBtn.disabled = !canResolve;
    resolveBtn.addEventListener("click", () => {
      toggleRoomCommentResolved(thread, !thread.resolved);
    });
    actions.appendChild(resolveBtn);

    wrap.appendChild(head);
    wrap.appendChild(body);
    wrap.appendChild(actions);

    if (thread.replies.length) {
      const replyList = document.createElement("div");
      replyList.className = "tc-room-comment-replies";
      thread.replies.forEach((reply) => {
        const item = document.createElement("div");
        item.className = "tc-room-comment-reply";
        const rMeta = document.createElement("p");
        rMeta.className = "tc-room-comment-meta";
        const rBy = reply.createdByUid === state.room.selfUid
          ? t("paletteTool.room.comments.you", "Bạn")
          : reply.createdByName;
        rMeta.textContent = t("paletteTool.room.comments.meta", "{time} · bởi {name}", {
          time: formatRoomRevisionTime(reply.createdAt),
          name: rBy
        });
        const rBody = document.createElement("p");
        rBody.className = "tc-room-comment-message";
        rBody.textContent = reply.message;
        item.appendChild(rMeta);
        item.appendChild(rBody);
        replyList.appendChild(item);
      });
      wrap.appendChild(replyList);
    }

    if (thread.resolved) {
      const resolvedMeta = document.createElement("p");
      resolvedMeta.className = "tc-room-comment-resolved";
      const resolvedBy = thread.resolvedByUid === state.room.selfUid
        ? t("paletteTool.room.comments.you", "Bạn")
        : (thread.resolvedByName || thread.resolvedByUid || "-");
      resolvedMeta.textContent = t("paletteTool.room.comments.resolvedMeta", "Đã xử lý bởi {name}", {
        name: resolvedBy
      });
      wrap.appendChild(resolvedMeta);
    }
    el.roomCommentList.appendChild(wrap);
  });

  applyRoomCommentBadgesInDom();
}

async function startRoomCommentSync(api, realtimeApi) {
  if (!state.room.id || !api || !realtimeApi || typeof realtimeApi.onSnapshot !== "function") return false;
  cleanupRoomCommentListener();
  state.room.commentStatus = "loading";
  renderRoomCommentPanel();
  let target = api.collection(api.db, ROOM_COLLECTION, state.room.id, ROOM_COMMENT_COLLECTION);
  if (typeof api.query === "function" && typeof api.orderBy === "function" && typeof api.limit === "function") {
    target = api.query(target, api.orderBy("createdAt", "desc"), api.limit(ROOM_COMMENT_FETCH_LIMIT));
  }
  roomCommentListenerUnsub = realtimeApi.onSnapshot(target, (snapshot) => {
    const comments = [];
    snapshot?.forEach?.((docSnap) => {
      const item = normalizeRoomCommentDoc(docSnap.id, docSnap.data?.() || null);
      if (item) comments.push(item);
    });
    comments.sort((a, b) => {
      if (a.createdAtMs !== b.createdAtMs) return a.createdAtMs - b.createdAtMs;
      return String(a.id).localeCompare(String(b.id));
    });
    state.room.comments = comments;
    state.room.commentStatus = comments.length ? "ready" : "empty";
    renderRoomCommentPanel();
  }, () => {
    state.room.commentStatus = "error";
    renderRoomCommentPanel();
  });
  return true;
}

async function submitRoomComment() {
  if (!state.room.id || !state.room.active) return false;
  if (!canWriteRoomComments()) {
    showToast(t("paletteTool.room.comments.toast.readonly", "Bạn đang ở chế độ chỉ xem, không thể bình luận."));
    return false;
  }
  const rawText = String(el.roomCommentInput?.value || "");
  const message = rawText.trim();
  if (!message) {
    showToast(t("paletteTool.room.comments.toast.empty", "Hãy nhập nội dung bình luận."));
    return false;
  }
  if (roomCommentWriteBusy) return false;
  const roots = getRoomCommentRoots();
  const replyRoot = roots.get(state.room.commentReplyRootId || "") || null;
  const targetKey = replyRoot
    ? replyRoot.targetKey
    : state.room.commentFilterRole;
  if (!ROLE_KEYS.includes(targetKey)) {
    showToast(t("paletteTool.room.comments.toast.pickRole", "Hãy chọn vai màu để bình luận."));
    return false;
  }

  const api = await waitForFirebaseApi();
  if (!canUseRoomRealtimeApi(api)) {
    showToast(t("paletteTool.room.comments.toast.failed", "Không thể gửi bình luận."));
    return false;
  }
  const user = await waitForFirebaseUser(api);
  if (!user?.uid) {
    showToast(t("paletteTool.room.toast.needLogin", "Cần đăng nhập để vào Phòng chỉnh sửa."));
    return false;
  }
  roomCommentWriteBusy = true;
  state.room.commentStatus = "posting";
  renderRoomCommentPanel();
  try {
    const commentId = `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    const threadRootId = replyRoot ? replyRoot.id : commentId;
    const commentRef = api.doc(api.db, ROOM_COLLECTION, state.room.id, ROOM_COMMENT_COLLECTION, commentId);
    const payload = {
      targetType: "role",
      targetKey,
      threadRootId,
      message: message.slice(0, ROOM_COMMENT_MAX_LENGTH),
      createdByUid: user.uid,
      createdByName: state.room.selfDisplayName || resolvePresenceDisplayName(user),
      createdAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString(),
      resolved: false
    };
    if (replyRoot) {
      payload.parentId = replyRoot.id;
    }
    await api.setDoc(commentRef, payload, { merge: false });
    if (el.roomCommentInput) {
      el.roomCommentInput.value = "";
    }
    if (replyRoot) {
      clearRoomCommentReply();
      showToast(t("paletteTool.room.comments.toast.replied", "Đã gửi trả lời."));
    } else {
      showToast(t("paletteTool.room.comments.toast.created", "Đã gửi bình luận."));
    }
    state.room.commentStatus = "ready";
    renderRoomCommentPanel();
    return true;
  } catch (_err) {
    state.room.commentStatus = "error";
    renderRoomCommentPanel();
    showToast(t("paletteTool.room.comments.toast.failed", "Không thể gửi bình luận."));
    return false;
  } finally {
    roomCommentWriteBusy = false;
  }
}

async function toggleRoomCommentResolved(thread, nextResolved) {
  if (!thread || !thread.id || !canResolveRoomComments()) return false;
  const api = await waitForFirebaseApi();
  if (!canUseRoomRealtimeApi(api)) {
    showToast(t("paletteTool.room.comments.toast.resolveFailed", "Không thể cập nhật trạng thái xử lý."));
    return false;
  }
  const user = await waitForFirebaseUser(api);
  if (!user?.uid) {
    showToast(t("paletteTool.room.toast.needLogin", "Cần đăng nhập để vào Phòng chỉnh sửa."));
    return false;
  }
  try {
    const ref = api.doc(api.db, ROOM_COLLECTION, state.room.id, ROOM_COMMENT_COLLECTION, thread.id);
    await api.setDoc(ref, {
      resolved: nextResolved === true,
      resolvedByUid: nextResolved ? user.uid : "",
      resolvedByName: nextResolved ? (state.room.selfDisplayName || resolvePresenceDisplayName(user)) : "",
      resolvedAt: nextResolved
        ? (typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString())
        : null
    }, { merge: true });
    showToast(nextResolved
      ? t("paletteTool.room.comments.toast.resolved", "Đã đánh dấu xử lý.")
      : t("paletteTool.room.comments.toast.unresolved", "Đã mở lại bình luận."));
    return true;
  } catch (_err) {
    showToast(t("paletteTool.room.comments.toast.resolveFailed", "Không thể cập nhật trạng thái xử lý."));
    return false;
  }
}

async function writeRoomRevision(snapshot, options = {}) {
  const {
    rev = state.room.baseRev,
    label = "",
    enforceRate = true,
    createdByUid = ""
  } = options;
  if (!state.room.id || !state.room.active) return { ok: false, reason: "no_room" };
  if (roomRevisionWriteBusy) return { ok: false, reason: "busy" };
  const normalized = normalizeShareStatePayload(snapshot || null);
  if (!normalized) return { ok: false, reason: "invalid_snapshot" };
  const nowMs = Date.now();
  if (enforceRate && state.room.lastRevisionAtMs && (nowMs - state.room.lastRevisionAtMs) < ROOM_REVISION_MIN_INTERVAL_MS) {
    state.room.revisionStatus = "rate-limited";
    renderRoomRevisionPanel();
    return { ok: false, reason: "rate_limited" };
  }
  const api = await waitForFirebaseApi();
  if (!canUseRoomRealtimeApi(api) || typeof api.setDoc !== "function") {
    return { ok: false, reason: "api_unavailable" };
  }
  const user = await waitForFirebaseUser(api);
  const uid = String(createdByUid || user?.uid || "").trim();
  if (!uid) return { ok: false, reason: "no_auth" };
  roomRevisionWriteBusy = true;
  state.room.revisionStatus = "saving";
  renderRoomRevisionPanel();
  try {
    const revisionId = `rev_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    const revisionRef = api.doc(api.db, ROOM_COLLECTION, state.room.id, ROOM_REVISION_COLLECTION, revisionId);
    const payload = {
      snapshot: normalized,
      createdAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString(),
      createdByUid: uid,
      rev: Number.isFinite(Number(rev)) && Number(rev) >= 0 ? Math.floor(Number(rev)) : 0
    };
    const cleanLabel = String(label || "").trim();
    if (cleanLabel) {
      payload.label = cleanLabel.slice(0, 80);
    }
    const diff = buildRoomRevisionDiff(state.room.lastRevisionSnapshot, normalized);
    if (diff) {
      payload.diff = diff;
    }
    await api.setDoc(revisionRef, payload, { merge: false });
    state.room.lastRevisionAtMs = nowMs;
    state.room.lastRevisionSnapshot = cloneRoomSnapshot(normalized);
    state.room.revisionStatus = "ready";
    renderRoomRevisionPanel();
    return { ok: true, id: revisionId };
  } catch (_err) {
    state.room.revisionStatus = "error";
    renderRoomRevisionPanel();
    return { ok: false, reason: "write_failed" };
  } finally {
    roomRevisionWriteBusy = false;
  }
}

async function commitRoomSnapshotWithRevision(snapshot, options = {}) {
  const {
    revisionLabel = "",
    forceRevision = true
  } = options;
  if (!state.room.id || !state.room.active || !isRoomSyncWritable()) {
    return { ok: false, reason: "no_room" };
  }
  const normalized = normalizeShareStatePayload(snapshot || null);
  if (!normalized) {
    return { ok: false, reason: "invalid_snapshot" };
  }
  const api = await waitForFirebaseApi();
  if (!canUseRoomRealtimeApi(api)) {
    return { ok: false, reason: "api_unavailable" };
  }
  const user = await waitForFirebaseUser(api);
  if (!user?.uid) {
    return { ok: false, reason: "no_auth" };
  }
  const realtimeApi = await getFirestoreRealtimeModule(api);
  if (typeof realtimeApi?.runTransaction !== "function") {
    return { ok: false, reason: "tx_unavailable" };
  }
  try {
    const currentRef = api.doc(api.db, ROOM_COLLECTION, state.room.id, ROOM_STATE_COLLECTION, ROOM_STATE_DOC_ID);
    const baseRev = Number.isFinite(state.room.baseRev) ? state.room.baseRev : 0;
    const txResult = await realtimeApi.runTransaction(api.db, async (transaction) => {
      const currentSnap = await transaction.get(currentRef);
      const currentData = currentSnap?.data?.() || {};
      const currentRevRaw = Number(currentData?.rev ?? 0);
      const currentRev = Number.isFinite(currentRevRaw) && currentRevRaw >= 0 ? Math.floor(currentRevRaw) : 0;
      if (currentRev !== baseRev) {
        throw new Error("room_conflict");
      }
      const nextRev = currentRev + 1;
      transaction.set(currentRef, {
        ...normalized,
        type: "palette",
        rev: nextRev,
        updatedByUid: user.uid,
        updatedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString()
      }, { merge: false });
      return { nextRev };
    });
    const nextRev = Number(txResult?.nextRev ?? (baseRev + 1));
    state.room.baseRev = Number.isFinite(nextRev) ? Math.max(0, Math.floor(nextRev)) : state.room.baseRev;
    state.room.currentFingerprint = encodePaletteShareState(normalized) || state.room.currentFingerprint;
    state.room.pendingDirty = false;
    state.room.pendingPayload = null;
    state.room.pendingFingerprint = "";
    state.room.lastRevisionSnapshot = cloneRoomSnapshot(normalized);
    if (forceRevision) {
      await writeRoomRevision(normalized, {
        rev: state.room.baseRev,
        label: String(revisionLabel || "").trim(),
        enforceRate: false,
        createdByUid: user.uid
      });
    }
    return { ok: true, rev: state.room.baseRev };
  } catch (err) {
    if (String(err?.message || "").includes("room_conflict")) {
      showToast(t("paletteTool.room.toast.conflict", "Đã có thay đổi từ người khác..."));
      await resyncRoomStateFromServer();
      return { ok: false, reason: "room_conflict" };
    }
    return { ok: false, reason: "commit_failed" };
  }
}

async function createRoomRevisionMarker(options = {}) {
  if (guardRoomReadonlyAction()) return false;
  if (!state.room.id || !state.room.active || !isRoomSyncWritable()) return false;
  const snapshot = buildRoomSyncSnapshotFromCurrentState();
  if (!snapshot?.payload) {
    showToast(t("paletteTool.room.revisions.toast.invalidState", "Trạng thái hiện tại chưa sẵn sàng để tạo mốc phiên bản."));
    return false;
  }
  const result = await writeRoomRevision(snapshot.payload, {
    rev: state.room.baseRev,
    label: String(options.label || ""),
    enforceRate: true
  });
  if (result.ok) {
    showToast(t("paletteTool.room.revisions.toast.created", "Đã tạo mốc phiên bản."));
    return true;
  }
  if (result.reason === "rate_limited") {
    showToast(t("paletteTool.room.revisions.toast.rateLimited", "Bạn vừa tạo mốc, thử lại sau vài giây."));
    return false;
  }
  showToast(t("paletteTool.room.revisions.toast.createFailed", "Không thể tạo mốc phiên bản."));
  return false;
}

async function restoreRoomRevision(revision) {
  if (!revision || typeof revision !== "object") return false;
  if (guardRoomReadonlyAction()) return false;
  if (!state.room.id || !state.room.active || !isRoomSyncWritable()) return false;
  const snapshot = normalizeShareStatePayload(revision.snapshot || null);
  if (!snapshot) {
    showToast(t("paletteTool.room.revisions.toast.invalidSnapshot", "Phiên bản này không hợp lệ."));
    return false;
  }
  const confirmed = window.confirm(
    t("paletteTool.room.revisions.confirmRestore", "Khôi phục phiên bản rev {rev}?", {
      rev: String(revision.rev ?? "?")
    })
  );
  if (!confirmed) return false;
  if (roomSyncTimer) {
    window.clearTimeout(roomSyncTimer);
    roomSyncTimer = null;
  }
  roomPendingCommitFinal = false;
  state.room.pendingDirty = false;
  state.room.pendingPayload = null;
  state.room.pendingFingerprint = "";
  const api = await waitForFirebaseApi();
  if (!canUseRoomRealtimeApi(api)) {
    showToast(t("paletteTool.room.revisions.toast.restoreFailed", "Không thể khôi phục phiên bản."));
    return false;
  }
  const user = await waitForFirebaseUser(api);
  if (!user?.uid) {
    showToast(t("paletteTool.room.toast.needLogin", "Cần đăng nhập để vào Phòng chỉnh sửa."));
    return false;
  }
  const realtimeApi = await getFirestoreRealtimeModule(api);
  if (typeof realtimeApi?.runTransaction !== "function") {
    showToast(t("paletteTool.room.revisions.toast.restoreFailed", "Không thể khôi phục phiên bản."));
    return false;
  }
  try {
    const currentRef = api.doc(api.db, ROOM_COLLECTION, state.room.id, ROOM_STATE_COLLECTION, ROOM_STATE_DOC_ID);
    const committed = await realtimeApi.runTransaction(api.db, async (transaction) => {
      const currentSnap = await transaction.get(currentRef);
      const currentData = currentSnap?.data?.() || {};
      const currentRevRaw = Number(currentData?.rev ?? 0);
      const currentRev = Number.isFinite(currentRevRaw) && currentRevRaw >= 0 ? Math.floor(currentRevRaw) : 0;
      const nextRev = currentRev + 1;
      transaction.set(currentRef, {
        ...snapshot,
        type: "palette",
        rev: nextRev,
        updatedByUid: user.uid,
        updatedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString()
      }, { merge: false });
      return { nextRev };
    });
    const nextRev = Number(committed?.nextRev ?? (state.room.baseRev + 1));
    state.room.baseRev = Number.isFinite(nextRev) ? Math.max(0, Math.floor(nextRev)) : state.room.baseRev;
    state.room.currentFingerprint = encodePaletteShareState(snapshot) || state.room.currentFingerprint;
    state.room.pendingDirty = false;
    state.room.pendingPayload = null;
    state.room.pendingFingerprint = "";
    state.room.lastRevisionSnapshot = cloneRoomSnapshot(snapshot);
    await writeRoomRevision(snapshot, {
      rev: state.room.baseRev,
      label: t("paletteTool.room.revisions.restoredLabel", "Khôi phục từ rev {rev}", {
        rev: String(revision.rev ?? "?")
      }),
      enforceRate: false,
      createdByUid: user.uid
    });
    showToast(t("paletteTool.room.revisions.toast.restored", "Đã khôi phục phiên bản."));
    return true;
  } catch (_err) {
    showToast(t("paletteTool.room.revisions.toast.restoreFailed", "Không thể khôi phục phiên bản."));
    return false;
  }
}

function resetRoomState() {
  if (roomSyncTimer) {
    window.clearTimeout(roomSyncTimer);
    roomSyncTimer = null;
  }
  state.room.id = "";
  state.room.name = "";
  state.room.role = TEAM_ROLE_VIEWER;
  state.room.shareMode = ROOM_SHARE_INVITE_ONLY;
  state.room.status = "idle";
  state.room.readOnly = false;
  state.room.active = false;
  state.room.baseRev = 0;
  state.room.currentFingerprint = "";
  state.room.pendingFingerprint = "";
  state.room.pendingPayload = null;
  state.room.pendingDirty = false;
  state.room.invalidStateNotified = false;
  state.room.selfUid = "";
  state.room.selfDisplayName = "";
  state.room.presenceByUid = new Map();
  state.room.revisions = [];
  state.room.revisionStatus = "idle";
  state.room.revisionPreviewId = "";
  state.room.lastRevisionAtMs = 0;
  state.room.lastRevisionSnapshot = null;
  state.room.comments = [];
  state.room.commentStatus = "idle";
  state.room.commentFilterRole = "all";
  state.room.commentReplyRootId = "";
  roomPresenceDraft = {
    activePaletteIndex: null,
    activeRoleKey: "",
    activePanel: ""
  };
  roomSyncBusy = false;
  roomPresenceWriteBusy = false;
  roomRevisionWriteBusy = false;
  roomCommentWriteBusy = false;
  roomPendingCommitFinal = false;
  cleanupRoomPresenceListener();
  cleanupRoomRevisionListener();
  cleanupRoomCommentListener();
  renderRoomBanner();
  syncRoomReadonlyUi();
  applyPresenceBadgesInDom();
  renderRoomRevisionPanel();
  renderRoomCommentPanel();
}

function cleanupRoomListener() {
  if (typeof roomListenerUnsub === "function") {
    try {
      roomListenerUnsub();
    } catch (_err) {
      // ignore unlisten errors
    }
  }
  roomListenerUnsub = null;
  cleanupRoomPresenceListener();
  cleanupRoomRevisionListener();
  cleanupRoomCommentListener();
  state.room.presenceByUid = new Map();
  state.room.revisions = [];
  state.room.revisionStatus = "idle";
  state.room.revisionPreviewId = "";
  state.room.comments = [];
  state.room.commentStatus = "idle";
  state.room.commentFilterRole = "all";
  state.room.commentReplyRootId = "";
  roomCommentWriteBusy = false;
  renderRoomPresenceStack();
  applyPresenceBadgesInDom();
  renderRoomRevisionPanel();
  renderRoomCommentPanel();
}

function resolveRoomStatusText() {
  const roomName = state.room.name || state.room.id || "-";
  switch (state.room.status) {
    case "connecting":
      return t("paletteTool.room.status.connecting", "Đang kết nối phòng...");
    case "need-login":
      return t("paletteTool.room.status.needLogin", "Cần đăng nhập để vào phòng.");
    case "missing":
      return t("paletteTool.room.status.notFound", "Không tìm thấy phòng.");
    case "invite-only":
      return t("paletteTool.room.status.inviteOnly", "Phòng chỉ cho người được mời.");
    case "listen-error":
      return t("paletteTool.room.status.syncFail", "Mất kết nối đồng bộ phòng.");
    case "waiting-state":
      return t("paletteTool.room.status.waitingState", "Đang chờ trạng thái phòng...");
    case "invalid-state":
      return t("paletteTool.room.status.invalidState", "Trạng thái phòng không hợp lệ.");
    case "viewer":
      return t("paletteTool.room.status.viewer", "Đang đồng bộ thời gian thực (chỉ xem).");
    case "editor":
      return t("paletteTool.room.status.editor", "Đang đồng bộ thời gian thực.");
    default:
      return t("paletteTool.room.status.idle", "Chưa kết nối phòng.");
  }
}

function syncRoomReadonlyUi() {
  const shouldLock = !!(state.room.active && state.room.readOnly);
  ROOM_EDITABLE_IDS.forEach((id) => {
    const node = document.getElementById(id);
    if (!node) return;
    node.classList.toggle("tc-room-disabled", shouldLock);
    if (["BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(node.tagName)) {
      node.disabled = shouldLock;
    }
    node.setAttribute("aria-disabled", shouldLock ? "true" : "false");
  });
  renderRoomRevisionPanel();
  renderRoomCommentPanel();
}

function renderRoomBanner() {
  if (!el.roomBar || !el.roomName || !el.roomStatus) {
    renderRoomFlowGuide();
    return;
  }
  const hasRoom = Boolean(state.room.id);
  el.roomBar.classList.toggle("hidden", !hasRoom);
  if (!hasRoom) {
    el.roomBar.classList.remove("is-readonly");
    renderRoomPresenceStack();
    renderRoomRevisionPanel();
    renderRoomCommentPanel();
    renderRoomFlowGuide();
    return;
  }
  if (el.roomLabel) {
    el.roomLabel.textContent = t("paletteTool.room.barLabel", "Phòng chỉnh sửa");
  }
  const fallbackName = t("paletteTool.room.fallbackName", "Phòng {id}", { id: state.room.id || "-" });
  el.roomName.textContent = state.room.name || fallbackName;
  el.roomStatus.textContent = resolveRoomStatusText();
  el.roomBar.classList.toggle("is-readonly", !!state.room.readOnly);
  renderRoomPresenceStack();
  renderRoomRevisionPanel();
  renderRoomCommentPanel();
  renderRoomFlowGuide();
}

function isRoomSyncWritable() {
  return !!(state.room.active && state.room.id && !state.room.readOnly && canWriteTeamRole(state.room.role));
}

function isRoomReadonly() {
  return !!(state.room.active && state.room.readOnly);
}

function guardRoomReadonlyAction(options = {}) {
  const { silent = false } = options;
  if (!isRoomReadonly()) return false;
  if (!silent) {
    showToast(t("paletteTool.room.toast.viewerReadOnly", "Bạn đang ở chế độ chỉ xem của phòng."));
  }
  return true;
}

function normalizeRoomStateSnapshot(rawState) {
  if (!rawState || typeof rawState !== "object") return null;
  const payload = (rawState.payload && typeof rawState.payload === "object")
    ? rawState.payload
    : rawState;
  const normalized = normalizeShareStatePayload(payload);
  if (!normalized) return null;
  const rawRev = Number(rawState.rev ?? payload.rev ?? 0);
  const rev = Number.isFinite(rawRev) && rawRev >= 0 ? Math.floor(rawRev) : 0;
  return {
    ...normalized,
    rev
  };
}

function applyRoomSharedPalette(rawState) {
  const normalized = normalizeRoomStateSnapshot(rawState);
  if (!normalized) return { ok: false, reason: "invalid_state" };
  const fingerprint = encodePaletteShareState(normalized);
  if (fingerprint && fingerprint === state.room.currentFingerprint) {
    state.room.baseRev = normalized.rev;
    return { ok: true, changed: false, rev: normalized.rev };
  }
  const paletteId = "room-share-palette";
  state.hashPalette = {
    id: paletteId,
    ten: t("paletteTool.room.roomPaletteName", "Bảng phối màu từ Phòng chỉnh sửa"),
    tags: [t("paletteTool.room.roomPaletteTag", "từ phòng chỉnh sửa")],
    stops: normalized.colors
  };
  state.selectedPaletteId = paletteId;
  state.roleMapByPaletteId.set(paletteId, { ...normalized.roles });
  state.previewTabByPaletteId.set(paletteId, normalized.preview);
  state.previewVisionModeByPaletteId.set(paletteId, normalized.visionMode);
  state.room.baseRev = normalized.rev;
  state.room.currentFingerprint = fingerprint || "";
  state.room.pendingDirty = false;
  state.room.pendingPayload = null;
  state.room.pendingFingerprint = "";
  renderPalettes();
  return { ok: true, changed: true, rev: normalized.rev };
}

function buildRoomSyncSnapshotFromCurrentState() {
  if (!isRoomSyncWritable()) return null;
  const active = getActivePalette();
  if (!active) return null;
  const stops = Array.isArray(active?.stops)
    ? active.stops.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
    : [];
  if (stops.length < MIN_STOPS || stops.length > MAX_STOPS) return null;
  const roles = getRoleMapForPalette(active, stops);
  const preview = getCurrentPreviewForPalette(active, PREVIEW_TABS[0]);
  const visionMode = getCurrentVisionForPalette(active, "normal");
  const payload = buildShareStatePayload(stops, {
    roles,
    preview,
    sim: visionMode
  });
  if (!payload) return null;
  const fingerprint = encodePaletteShareState(payload);
  if (!fingerprint) return null;
  return {
    payload,
    fingerprint
  };
}

function queueRoomSync(options = {}) {
  const { final = false } = options;
  if (!isRoomSyncWritable()) return false;
  const snapshot = buildRoomSyncSnapshotFromCurrentState();
  if (!snapshot) return false;
  if (
    snapshot.fingerprint === state.room.currentFingerprint &&
    (!final || !state.room.pendingDirty)
  ) {
    return false;
  }
  state.room.pendingPayload = snapshot.payload;
  state.room.pendingFingerprint = snapshot.fingerprint;
  state.room.pendingDirty = true;
  if (final) {
    roomPendingCommitFinal = true;
    if (roomSyncTimer) {
      window.clearTimeout(roomSyncTimer);
    }
    roomSyncTimer = window.setTimeout(() => {
      roomSyncTimer = null;
      flushRoomSyncQueue({ forceFinal: true });
    }, 0);
    return true;
  }
  if (roomSyncTimer) return true;
  roomSyncTimer = window.setTimeout(() => {
    roomSyncTimer = null;
    flushRoomSyncQueue({ forceFinal: false });
  }, ROOM_SYNC_THROTTLE_MS);
  return true;
}

async function resyncRoomStateFromServer() {
  if (!state.room.id) return false;
  const api = await waitForFirebaseApi();
  if (!canUseRoomRealtimeApi(api)) return false;
  try {
    const currentRef = api.doc(api.db, ROOM_COLLECTION, state.room.id, ROOM_STATE_COLLECTION, ROOM_STATE_DOC_ID);
    const snap = await api.getDoc(currentRef);
    if (!snap?.exists?.()) return false;
    const data = snap.data?.() || null;
    if (!data) return false;
    applyRoomSharedPalette(data);
    return true;
  } catch (_err) {
    return false;
  }
}

async function flushRoomSyncQueue(options = {}) {
  const { forceFinal = false } = options;
  if (!isRoomSyncWritable()) return false;
  if (roomSyncBusy) {
    if (forceFinal) {
      roomPendingCommitFinal = true;
    }
    return false;
  }
  const pendingPayload = state.room.pendingPayload;
  const pendingFingerprint = state.room.pendingFingerprint;
  if (!pendingPayload || !pendingFingerprint) return false;
  roomSyncBusy = true;
  const wantsFinal = forceFinal || roomPendingCommitFinal;
  roomPendingCommitFinal = false;
  try {
    const api = await waitForFirebaseApi();
    if (!canUseRoomRealtimeApi(api)) return false;
    const user = await waitForFirebaseUser(api);
    if (!user?.uid) return false;
    const currentRef = api.doc(api.db, ROOM_COLLECTION, state.room.id, ROOM_STATE_COLLECTION, ROOM_STATE_DOC_ID);
    if (!wantsFinal) {
      const draftRev = Number.isFinite(state.room.baseRev) ? state.room.baseRev : 0;
      await api.setDoc(currentRef, {
        ...pendingPayload,
        type: "palette",
        rev: draftRev,
        updatedByUid: user.uid,
        updatedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString()
      }, { merge: true });
      return true;
    }

    const realtimeApi = await getFirestoreRealtimeModule(api);
    if (typeof realtimeApi?.runTransaction !== "function") {
      return false;
    }
    const baseRev = Number.isFinite(state.room.baseRev) ? state.room.baseRev : 0;
    const committed = await realtimeApi.runTransaction(api.db, async (transaction) => {
      const snap = await transaction.get(currentRef);
      const current = snap?.data?.() || {};
      const currentRevRaw = Number(current?.rev ?? 0);
      const currentRev = Number.isFinite(currentRevRaw) && currentRevRaw >= 0 ? Math.floor(currentRevRaw) : 0;
      if (currentRev !== baseRev) {
        throw new Error("room_conflict");
      }
      const nextRev = currentRev + 1;
      const nextData = {
        ...pendingPayload,
        type: "palette",
        rev: nextRev,
        updatedByUid: user.uid,
        updatedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString()
      };
      transaction.set(currentRef, nextData, { merge: false });
      return { nextRev };
    });
    const nextRev = Number(committed?.nextRev ?? (baseRev + 1));
    state.room.baseRev = Number.isFinite(nextRev) && nextRev >= 0 ? Math.floor(nextRev) : (baseRev + 1);
    state.room.currentFingerprint = pendingFingerprint;
    state.room.pendingDirty = false;
    state.room.pendingPayload = null;
    state.room.pendingFingerprint = "";
    await writeRoomRevision(pendingPayload, {
      rev: state.room.baseRev,
      enforceRate: true,
      createdByUid: user.uid
    });
    return true;
  } catch (err) {
    if (String(err?.message || "").includes("room_conflict")) {
      showToast(t("paletteTool.room.toast.conflict", "Đã có thay đổi từ người khác..."));
      await resyncRoomStateFromServer();
      return false;
    }
    return false;
  } finally {
    roomSyncBusy = false;
    if (
      isRoomSyncWritable() &&
      state.room.pendingDirty &&
      state.room.pendingFingerprint &&
      state.room.pendingFingerprint !== state.room.currentFingerprint
    ) {
      if (roomPendingCommitFinal) {
        queueRoomSync({ final: true });
      } else if (!roomSyncTimer) {
        roomSyncTimer = window.setTimeout(() => {
          roomSyncTimer = null;
          flushRoomSyncQueue({ forceFinal: false });
        }, ROOM_SYNC_THROTTLE_MS);
      }
    }
  }
}

function shouldIgnoreRoomCommitTrigger(event) {
  const target = event?.target;
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest("#paletteRevisionPanel"));
}

function handleRoomCommitTrigger(event) {
  if (shouldIgnoreRoomCommitTrigger(event)) return;
  if (!isRoomSyncWritable() || !state.room.pendingDirty) return;
  const now = Date.now();
  if (now - roomLastCommitTriggerAt < 80) return;
  roomLastCommitTriggerAt = now;
  queueRoomSync({ final: true });
}

async function waitForFirebaseUser(api, timeoutMs = SHORT_SHARE_WAIT_AUTH_MS) {
  const current = api?.auth?.currentUser || null;
  if (current?.uid) return current;
  if (!api || typeof api.onAuthStateChanged !== "function") return null;
  return new Promise((resolve) => {
    let done = false;
    const finish = (user) => {
      if (done) return;
      done = true;
      try { unsub?.(); } catch (_err) {}
      window.clearTimeout(timer);
      resolve(user || null);
    };
    const unsub = api.onAuthStateChanged((user) => {
      if (user?.uid) {
        finish(user);
      }
    });
    const timer = window.setTimeout(() => finish(api?.auth?.currentUser || null), timeoutMs);
  });
}

async function getFirestoreRealtimeModule(api) {
  if (typeof api?.onSnapshot === "function" && typeof api?.runTransaction === "function") {
    return {
      onSnapshot: api.onSnapshot.bind(api),
      runTransaction: api.runTransaction.bind(api)
    };
  }
  if (!firestoreRealtimeModulePromise) {
    firestoreRealtimeModulePromise = import("https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js")
      .then((mod) => ({
        onSnapshot: typeof mod?.onSnapshot === "function" ? mod.onSnapshot : null,
        runTransaction: typeof mod?.runTransaction === "function" ? mod.runTransaction : null
      }))
      .catch(() => ({ onSnapshot: null, runTransaction: null }));
  }
  return firestoreRealtimeModulePromise;
}

async function enterPaletteRoom(roomId, options = {}) {
  const normalizedRoomId = normalizeRoomId(roomId);
  const { silent = false } = options;
  if (!normalizedRoomId) {
    if (!silent) {
      showToast(t("paletteTool.room.toast.invalidRoom", "Mã phòng không hợp lệ."));
    }
    resetRoomState();
    return { ok: false, reason: "invalid_room" };
  }
  cleanupRoomListener();
  if (roomSyncTimer) {
    window.clearTimeout(roomSyncTimer);
    roomSyncTimer = null;
  }
  roomSyncBusy = false;
  roomPendingCommitFinal = false;
  state.room.id = normalizedRoomId;
  state.room.name = normalizedRoomId;
  state.room.status = "connecting";
  state.room.active = false;
  state.room.readOnly = true;
  state.room.currentFingerprint = "";
  state.room.invalidStateNotified = false;
  renderRoomBanner();
  syncRoomReadonlyUi();

  const api = await waitForFirebaseApi();
  if (!canUseRoomRealtimeApi(api)) {
    state.room.status = "listen-error";
    renderRoomBanner();
    if (!silent) {
      showToast(t("paletteTool.room.toast.syncUnavailable", "Không thể kết nối đồng bộ phòng."));
    }
    return { ok: false, reason: "api_unavailable" };
  }

  const realtimeApi = await getFirestoreRealtimeModule(api);
  if (typeof realtimeApi?.onSnapshot !== "function") {
    state.room.status = "listen-error";
    renderRoomBanner();
    if (!silent) {
      showToast(t("paletteTool.room.toast.syncUnavailable", "Không thể kết nối đồng bộ phòng."));
    }
    return { ok: false, reason: "snapshot_unavailable" };
  }

  const user = await waitForFirebaseUser(api);
  if (!user?.uid) {
    state.room.status = "need-login";
    renderRoomBanner();
    if (!silent) {
      showToast(t("paletteTool.room.toast.needLogin", "Cần đăng nhập để vào Phòng chỉnh sửa."));
    }
    return { ok: false, reason: "no_auth" };
  }
  state.room.selfUid = user.uid;
  state.room.selfDisplayName = resolvePresenceDisplayName(user);
  state.room.presenceByUid = new Map();
  state.room.revisions = [];
  state.room.revisionStatus = "loading";
  state.room.revisionPreviewId = "";
  state.room.lastRevisionAtMs = 0;
  state.room.lastRevisionSnapshot = null;
  state.room.comments = [];
  state.room.commentStatus = "loading";
  state.room.commentFilterRole = "all";
  state.room.commentReplyRootId = "";
  roomPresenceDraft = {
    activePaletteIndex: null,
    activeRoleKey: "",
    activePanel: "palette"
  };

  const roomRef = api.doc(api.db, ROOM_COLLECTION, normalizedRoomId);
  const roomSnap = await api.getDoc(roomRef).catch(() => null);
  if (!roomSnap?.exists?.()) {
    state.room.status = "missing";
    renderRoomBanner();
    if (!silent) {
      showToast(t("paletteTool.room.toast.notFound", "Không tìm thấy Phòng chỉnh sửa."));
    }
    return { ok: false, reason: "room_missing" };
  }
  const roomData = roomSnap.data?.() || {};
  const roomShareMode = normalizeRoomShareMode(roomData.shareMode);
  state.room.shareMode = roomShareMode;
  state.room.name = String(roomData.name || roomData.title || normalizedRoomId);

  const memberRef = api.doc(api.db, ROOM_COLLECTION, normalizedRoomId, ROOM_MEMBER_COLLECTION, user.uid);
  const memberSnap = await api.getDoc(memberRef).catch(() => null);
  let memberRole = TEAM_ROLE_VIEWER;
  if (memberSnap?.exists?.()) {
    memberRole = normalizeTeamRole(memberSnap.data?.().role);
  } else if (roomShareMode === ROOM_SHARE_PUBLIC) {
    try {
      await api.setDoc(memberRef, {
        uid: user.uid,
        role: TEAM_ROLE_VIEWER,
        joinedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString(),
        updatedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString()
      }, { merge: true });
      memberRole = TEAM_ROLE_VIEWER;
    } catch (_err) {
      state.room.status = "listen-error";
      renderRoomBanner();
      if (!silent) {
        showToast(t("paletteTool.room.toast.joinFailed", "Không thể tham gia phòng."));
      }
      return { ok: false, reason: "member_write_failed" };
    }
  } else {
    state.room.status = "invite-only";
    renderRoomBanner();
    if (!silent) {
      showToast(t("paletteTool.room.toast.inviteOnly", "Phòng này chỉ cho người được mời."));
    }
    return { ok: false, reason: "invite_only" };
  }

  state.room.role = memberRole;
  state.room.readOnly = roomReadOnlyByRole(memberRole);
  state.room.active = true;
  state.room.baseRev = 0;
  state.room.pendingPayload = null;
  state.room.pendingFingerprint = "";
  state.room.pendingDirty = false;
  state.room.status = state.room.readOnly ? "viewer" : "editor";
  rememberLastRoomId(normalizedRoomId);
  updateRoomQueryParam(normalizedRoomId);
  renderRoomBanner();
  syncRoomReadonlyUi();
  await startRoomPresenceSync(api, realtimeApi);
  await startRoomRevisionSync(api, realtimeApi);
  await startRoomCommentSync(api, realtimeApi);

  const currentRef = api.doc(api.db, ROOM_COLLECTION, normalizedRoomId, ROOM_STATE_COLLECTION, ROOM_STATE_DOC_ID);
  roomListenerUnsub = realtimeApi.onSnapshot(currentRef, (snap) => {
    const payload = snap?.data?.() || null;
    if (!payload) {
      setRoomStatus("waiting-state");
      return;
    }
    const applied = applyRoomSharedPalette(payload);
    if (!applied.ok) {
      setRoomStatus("invalid-state");
      if (!state.room.invalidStateNotified) {
        state.room.invalidStateNotified = true;
        showToast(t("paletteTool.room.toast.invalidState", "Trạng thái phòng không hợp lệ."));
      }
      return;
    }
    state.room.invalidStateNotified = false;
    state.room.baseRev = Number.isFinite(applied.rev) ? applied.rev : state.room.baseRev;
    setRoomStatus(state.room.readOnly ? "viewer" : "editor");
  }, () => {
    setRoomStatus("listen-error");
    if (!silent) {
      showToast(t("paletteTool.room.toast.syncFail", "Mất kết nối đồng bộ Phòng chỉnh sửa."));
    }
  });

  return {
    ok: true,
    roomId: state.room.id,
    roomName: state.room.name,
    role: state.room.role,
    readOnly: state.room.readOnly
  };
}

function loadLibraryScopePreference() {
  try {
    const scope = String(localStorage.getItem(LIBRARY_SCOPE_STORAGE_KEY) || "").trim().toLowerCase();
    state.libraryScope = scope === "team" ? "team" : "personal";
    state.selectedTeamId = String(localStorage.getItem(LIBRARY_TEAM_STORAGE_KEY) || "").trim();
  } catch (_err) {
    state.libraryScope = "personal";
    state.selectedTeamId = "";
  }
}

function saveLibraryScopePreference() {
  try {
    localStorage.setItem(LIBRARY_SCOPE_STORAGE_KEY, state.libraryScope === "team" ? "team" : "personal");
    localStorage.setItem(LIBRARY_TEAM_STORAGE_KEY, state.selectedTeamId || "");
  } catch (_err) {
    // ignore storage errors
  }
}

function getActiveTeam() {
  if (state.libraryScope !== "team" || !state.selectedTeamId) return null;
  const item = state.teams.find((team) => team.id === state.selectedTeamId) || null;
  if (!item) return null;
  return {
    id: item.id,
    name: item.name,
    role: normalizeTeamRole(item.role)
  };
}

function getActiveGuidelineTeamId() {
  const team = getActiveTeam();
  if (!team?.id) return "";
  return team.id;
}

function getEffectiveTeamGuideline() {
  const teamId = getActiveGuidelineTeamId();
  if (teamId && state.teamGuidelineByTeamId.has(teamId)) {
    return normalizeTeamGuideline(state.teamGuidelineByTeamId.get(teamId));
  }
  return normalizeTeamGuideline(TEAM_GUIDELINE_DEFAULT);
}

async function loadTeamGuideline(teamId, options = {}) {
  const normalizedTeamId = String(teamId || "").trim();
  if (!normalizedTeamId) return { ok: false, reason: "missing_team" };
  const { silent = true, api: providedApi = null } = options;
  const api = providedApi || await waitForFirebaseApi();
  if (!canUseTeamGuidelineApi(api)) {
    state.teamGuidelineByTeamId.set(normalizedTeamId, normalizeTeamGuideline(TEAM_GUIDELINE_DEFAULT));
    return { ok: false, reason: "api_unavailable" };
  }
  const user = api.auth?.currentUser || null;
  if (!user?.uid) {
    state.teamGuidelineByTeamId.set(normalizedTeamId, normalizeTeamGuideline(TEAM_GUIDELINE_DEFAULT));
    return { ok: false, reason: "no_auth" };
  }
  try {
    const ref = api.doc(api.db, TEAM_COLLECTION, normalizedTeamId, TEAM_GUIDELINE_COLLECTION, TEAM_GUIDELINE_DOC_ID);
    const snap = await api.getDoc(ref);
    const guideline = normalizeTeamGuideline(snap?.exists?.() ? (snap.data?.() || null) : null);
    state.teamGuidelineByTeamId.set(normalizedTeamId, guideline);
    window.dispatchEvent(new CustomEvent("tc:team-guideline-updated", {
      detail: { teamId: normalizedTeamId, guideline: { ...guideline } }
    }));
    return { ok: true, guideline };
  } catch (_err) {
    if (!silent) {
      showToast(t("paletteTool.matrix.guideline.toast.loadFailed", "Không thể tải Hướng dẫn Team."));
    }
    state.teamGuidelineByTeamId.set(normalizedTeamId, normalizeTeamGuideline(TEAM_GUIDELINE_DEFAULT));
    return { ok: false, reason: "load_failed" };
  }
}

async function saveTeamGuideline(teamId, rawGuideline, options = {}) {
  const normalizedTeamId = String(teamId || "").trim();
  if (!normalizedTeamId) return { ok: false, reason: "missing_team" };
  const { silent = false, api: providedApi = null } = options;
  const guideline = normalizeTeamGuideline(rawGuideline || null);
  const api = providedApi || await waitForFirebaseApi();
  if (!canUseTeamGuidelineApi(api)) {
    if (!silent) {
      showToast(t("paletteTool.matrix.guideline.toast.saveFailed", "Không thể lưu Hướng dẫn Team."));
    }
    return { ok: false, reason: "api_unavailable" };
  }
  const user = api.auth?.currentUser || null;
  if (!user?.uid) {
    if (!silent) {
      showToast(t("paletteTool.room.toast.needLogin", "Cần đăng nhập để vào Phòng chỉnh sửa."));
    }
    return { ok: false, reason: "no_auth" };
  }
  const teamRole = normalizeTeamRole(
    state.teams.find((team) => team.id === normalizedTeamId)?.role || TEAM_ROLE_VIEWER
  );
  if (!canWriteTeamRole(teamRole)) {
    if (!silent) {
      showToast(t("paletteTool.matrix.guideline.toast.readonly", "Bạn chỉ có quyền xem Hướng dẫn Team."));
    }
    return { ok: false, reason: "forbidden" };
  }
  try {
    const ref = api.doc(api.db, TEAM_COLLECTION, normalizedTeamId, TEAM_GUIDELINE_COLLECTION, TEAM_GUIDELINE_DOC_ID);
    await api.setDoc(ref, {
      ...guideline,
      updatedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString(),
      updatedByUid: user.uid
    }, { merge: false });
    state.teamGuidelineByTeamId.set(normalizedTeamId, guideline);
    window.dispatchEvent(new CustomEvent("tc:team-guideline-updated", {
      detail: { teamId: normalizedTeamId, guideline: { ...guideline } }
    }));
    if (!silent) {
      showToast(t("paletteTool.matrix.guideline.toast.saved", "Đã lưu Hướng dẫn Team."));
    }
    return { ok: true, guideline };
  } catch (_err) {
    if (!silent) {
      showToast(t("paletteTool.matrix.guideline.toast.saveFailed", "Không thể lưu Hướng dẫn Team."));
    }
    return { ok: false, reason: "save_failed" };
  }
}

function getLibrarySourceScope() {
  return state.libraryScope === "team" ? "team" : "personal";
}

function getFirebaseApi() {
  return window.firebaseAuth || window.firebaseAuthApi || null;
}

function canUseShortShareApi(api) {
  return !!(
    api &&
    api.db &&
    typeof api.doc === "function" &&
    typeof api.getDoc === "function" &&
    typeof api.setDoc === "function"
  );
}

function canUsePaletteLibraryApi(api) {
  return !!(
    api &&
    api.db &&
    api.auth &&
    typeof api.doc === "function" &&
    typeof api.setDoc === "function" &&
    typeof api.collection === "function" &&
    typeof api.getDocs === "function"
  );
}

function canUseTeamGuidelineApi(api) {
  return !!(
    api &&
    api.db &&
    api.auth &&
    typeof api.doc === "function" &&
    typeof api.getDoc === "function" &&
    typeof api.setDoc === "function"
  );
}

function canDeleteWithApi(api) {
  return !!(api && typeof api.deleteDoc === "function");
}

function waitForFirebaseApi(timeoutMs = SHORT_SHARE_WAIT_AUTH_MS) {
  const current = getFirebaseApi();
  if (canUseShortShareApi(current)) {
    return Promise.resolve(current);
  }
  return new Promise((resolve) => {
    const done = (api) => resolve(canUseShortShareApi(api) ? api : null);
    const onReady = () => {
      window.clearTimeout(timer);
      done(getFirebaseApi());
    };
    const timer = window.setTimeout(() => {
      window.removeEventListener("firebase-auth-ready", onReady);
      done(getFirebaseApi());
    }, timeoutMs);
    window.addEventListener("firebase-auth-ready", onReady, { once: true });
  });
}

async function createShortShareIdOnFirestore(encodedState) {
  if (!encodedState) return { status: "invalid" };
  const api = await waitForFirebaseApi();
  if (!canUseShortShareApi(api)) return { status: "unavailable" };
  for (let attempt = 0; attempt < SHORT_SHARE_MAX_TRIES; attempt += 1) {
    const shareId = createShortShareId();
    const ref = api.doc(api.db, SHORT_SHARE_COLLECTION, shareId);
    try {
      const existing = await api.getDoc(ref);
      if (existing?.exists?.()) continue;
      const payload = {
        v: SHARE_STATE_VERSION,
        payload: encodedState,
        source: "palette",
        createdAt: typeof api.serverTimestamp === "function"
          ? api.serverTimestamp()
          : new Date().toISOString()
      };
      await api.setDoc(ref, payload, { merge: false });
      return { status: "ok", shareId };
    } catch (_err) {
      // Thử ID khác để giảm khả năng fail do race/collision.
    }
  }
  return { status: "error" };
}

async function loadShortShareStateById(shortId) {
  const normalizedId = normalizeShortShareId(shortId);
  if (!normalizedId) return { status: "invalid-id", state: null };
  const api = await waitForFirebaseApi();
  if (!canUseShortShareApi(api)) return { status: "unavailable", state: null };
  try {
    const ref = api.doc(api.db, SHORT_SHARE_COLLECTION, normalizedId);
    const snap = await api.getDoc(ref);
    if (!snap?.exists?.()) return { status: "missing", state: null };
    const data = snap.data?.() || null;
    const decoded = decodePaletteShareState(data?.payload || "");
    if (decoded.status !== "ok" || !decoded.state) {
      return { status: "invalid", state: null };
    }
    return { status: "ok", state: decoded.state, shareId: normalizedId };
  } catch (_err) {
    return { status: "error", state: null };
  }
}

async function parsePaletteShareStateFromQuery(searchText) {
  const params = new URLSearchParams(normalizeSearchText(searchText ?? window.location.search));
  const rawId = params.get("s");
  if (!rawId) return { status: "none", state: null };
  return loadShortShareStateById(rawId);
}

function buildShareLink(stops, options = {}) {
  const payload = buildShareStatePayload(stops, options);
  if (!payload) return "";
  const encodedState = encodePaletteShareState(payload);
  if (!encodedState) return "";
  return `${window.location.origin}${window.location.pathname}#p=${encodedState}`;
}

function buildShareStatePayload(stops, options = {}) {
  const colors = Array.isArray(stops)
    ? stops.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
    : [];
  if (colors.length < MIN_STOPS || colors.length > MAX_STOPS) return null;
  const fallbackRoles = autoAssignRoleMap(colors);
  const roleSource = options.roles && typeof options.roles === "object"
    ? options.roles
    : fallbackRoles;
  const roles = normalizeShareRoles(roleSource, colors.length) || fallbackRoles;
  const preview = PREVIEW_TABS.includes(options.preview) ? options.preview : PREVIEW_TABS[0];
  const sim = toShareSim(options.sim);
  return {
    v: SHARE_STATE_VERSION,
    colors,
    roles,
    preview,
    sim
  };
}

async function buildShortShareLink(stops, options = {}) {
  const payload = buildShareStatePayload(stops, options);
  if (!payload) return { status: "invalid", url: "" };
  const encodedState = encodePaletteShareState(payload);
  if (!encodedState) return { status: "invalid", url: "" };
  const created = await createShortShareIdOnFirestore(encodedState);
  if (created.status !== "ok" || !created.shareId) {
    return { status: created.status || "error", url: "" };
  }
  const url = `${window.location.origin}${window.location.pathname}?s=${encodeURIComponent(created.shareId)}`;
  return { status: "ok", url, shareId: created.shareId };
}

let knowledgeCache = null;
let showAllIndustries = false;
async function loadKnowledge() {
  if (knowledgeCache) return knowledgeCache;
  try {
    const res = await fetch(KNOWLEDGE_URL, { cache: "no-store" });
    const data = await res.json();
    knowledgeCache = data || FALLBACK_KNOWLEDGE;
  } catch (_err) {
    knowledgeCache = FALLBACK_KNOWLEDGE;
  }
  return knowledgeCache;
}

function normalizeText(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function pickGoal(normalized, knowledge) {
  const goals = knowledge?.goals || FALLBACK_KNOWLEDGE.goals;
  for (const [key, value] of Object.entries(goals)) {
    const keywords = value?.keywords || [];
    if (keywords.some((kw) => normalized.includes(normalizeText(kw)))) {
      return key;
    }
  }
  return "ui";
}

function pickMood(normalized, knowledge) {
  const moods = knowledge?.moods || FALLBACK_KNOWLEDGE.moods;
  for (const mood of moods) {
    const keywords = mood?.keywords || [];
    if (keywords.some((kw) => normalized.includes(normalizeText(kw)))) {
      return mood;
    }
  }
  return knowledge?.defaults || FALLBACK_KNOWLEDGE.defaults;
}

async function parseBrief(brief) {
  const knowledge = await loadKnowledge();
  const normalized = normalizeText(brief);
  const goal = pickGoal(normalized, knowledge);
  const mood = pickMood(normalized, knowledge);
  const boldness = detectBoldness(normalized);
  return { goal, mood, boldness };
}

function goalDisplay(goal) {
  if (goal === "brand") return "Brand";
  if (goal === "embroidery") return "Ngành thêu";
  if (goal === "print") return "In ấn";
  return "Website/UI";
}

function detectBoldness(normalized) {
  if (/(noi bat|nổi bật|manh|mạnh|cao|ruc|rực)/.test(normalized)) return 70;
  if (/(an toan|an toàn|toi gian|tối giản|nhe|nhẹ|tinh te|tinh tế)/.test(normalized)) return 25;
  return 45;
}

function ensureUiContrast(roles) {
  if (!roles?.background || !roles?.text) return roles;
  const ratio = contrastRatio(roles.background, roles.text);
  if (ratio >= 4.5) return roles;
  const black = "#111111";
  const white = "#FFFFFF";
  const contrastBlack = contrastRatio(roles.background, black);
  const contrastWhite = contrastRatio(roles.background, white);
  return {
    ...roles,
    text: contrastBlack >= contrastWhite ? black : white
  };
}

function buildBaseHex(goal, mood) {
  const base = mood || FALLBACK_KNOWLEDGE.defaults;
  const h = typeof base.h === "number" ? base.h : FALLBACK_KNOWLEDGE.defaults.h;
  let s = typeof base.s === "number" ? base.s : FALLBACK_KNOWLEDGE.defaults.s;
  let l = typeof base.l === "number" ? base.l : FALLBACK_KNOWLEDGE.defaults.l;
  if (goal === "embroidery") s = Math.min(s, 45);
  if (goal === "print") s = Math.min(s, 55);
  return hslToHex(h, s, l);
}

function getSaturation(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const hsl = rgbToHsl(rgb);
  return hsl.s;
}

function getBriefTemplates(knowledge) {
  const list = Array.isArray(knowledge?.briefTemplates) ? knowledge.briefTemplates : [];
  return list.filter((item) => item?.id && Array.isArray(item.briefs));
}

function getDefaultIndustryIds(knowledge) {
  const ids = Array.isArray(knowledge?.defaultIndustryIds) ? knowledge.defaultIndustryIds : [];
  return ids.filter(Boolean);
}

function openBriefSheet() {
  if (!el.briefSheet) return;
  el.briefSheet.classList.remove("hidden");
}

function closeBriefSheet() {
  if (!el.briefSheet) return;
  el.briefSheet.classList.add("hidden");
}

function renderBriefIndustries(templates) {
  if (!el.briefIndustry || !el.briefList) return;
  el.briefIndustry.scrollTop = 0;
  el.briefIndustry.innerHTML = "";
  el.briefList.innerHTML = "";
  const defaultIds = getDefaultIndustryIds(knowledgeCache);
  const defaults = defaultIds.length
    ? templates.filter((item) => defaultIds.includes(item.id))
    : templates.slice(0, 6);
  const rest = templates.filter((item) => !defaults.includes(item));

  const addGroupLabel = (text) => {
    const label = document.createElement("div");
    label.className = "w-full text-[11px] font-semibold tc-muted";
    label.textContent = text;
    el.briefIndustry.appendChild(label);
  };

  addGroupLabel("Ngành phổ biến");
  defaults.forEach((template, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    btn.textContent = template.industryLabel;
    btn.addEventListener("click", () => {
      renderBriefList(template);
      const all = el.briefIndustry.querySelectorAll("button");
      all.forEach((item) => item.classList.remove("tc-btn-primary"));
      btn.classList.add("tc-btn-primary");
    });
    if (idx === 0) btn.classList.add("tc-btn-primary");
    el.briefIndustry.appendChild(btn);
  });

  if (rest.length) {
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "tc-btn tc-chip px-3 py-2 text-xs";
    toggle.textContent = showAllIndustries ? "Thu gọn" : "Xem thêm ngành";
    toggle.addEventListener("click", () => {
      showAllIndustries = !showAllIndustries;
      renderBriefIndustries(templates);
    });
    el.briefIndustry.appendChild(toggle);
  }

  if (showAllIndustries && rest.length) {
    addGroupLabel("Tất cả ngành");
    rest.forEach((template) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tc-btn tc-chip px-3 py-2 text-xs";
      btn.textContent = template.industryLabel;
      btn.addEventListener("click", () => {
        renderBriefList(template);
        const all = el.briefIndustry.querySelectorAll("button");
        all.forEach((item) => item.classList.remove("tc-btn-primary"));
        btn.classList.add("tc-btn-primary");
      });
      el.briefIndustry.appendChild(btn);
    });
  }

  if (defaults.length) {
    renderBriefList(defaults[0]);
  } else if (templates.length) {
    renderBriefList(templates[0]);
  }
}

function renderBriefList(template) {
  if (!el.briefList) return;
  el.briefList.innerHTML = "";
  template.briefs.forEach((brief) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tc-btn tc-chip px-3 py-2 text-xs text-left";
    btn.textContent = brief;
    btn.addEventListener("click", () => {
      if (el.smartBrief) {
        el.smartBrief.value = brief;
        el.smartBrief.dispatchEvent(new Event("input", { bubbles: true }));
      }
      closeBriefSheet();
    });
    el.briefList.appendChild(btn);
  });
}

let threadsLoaded = false;
let threadsAll = [];
const threadsByBrand = new Map();

async function ensureThreadsLoaded() {
  if (threadsLoaded) return;
  try {
    const res = await fetch("../threads.json", { cache: "no-store" });
    const data = await res.json();
    const list = Array.isArray(data) ? data : [];
    list.forEach((thread) => {
      if (!thread?.hex) return;
      const lab = Array.isArray(thread.lab) && thread.lab.length === 3
        ? thread.lab
        : getLabForHex(thread.hex);
      const normalized = {
        ...thread,
        lab
      };
      threadsAll.push(normalized);
      const brand = (thread.brand || "").trim();
      if (!threadsByBrand.has(brand)) threadsByBrand.set(brand, []);
      threadsByBrand.get(brand).push(normalized);
    });
  } catch (_err) {
    threadsAll = [];
    threadsByBrand.clear();
  }
  threadsLoaded = true;
}

function findNearestThread(hex) {
  const targetLab = getLabForHex(hex);
  if (!targetLab) return null;
  const findBestInList = (list) => {
    if (!list?.length) return null;
    let best = null;
    for (const item of list) {
      const delta = deltaE76(targetLab, item.lab);
      if (delta === null) continue;
      if (!best || delta < best.delta) {
        best = { thread: item, delta };
      }
    }
    return best;
  };
  for (const brand of THREAD_BRAND_PRIORITY) {
    const best = findBestInList(threadsByBrand.get(brand));
    if (best) {
      return { ...best.thread, delta: best.delta };
    }
  }
  const fallback = findBestInList(threadsAll);
  return fallback ? { ...fallback.thread, delta: fallback.delta } : null;
}

function shuffle(array) {
  const next = [...array];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function scoreContrast(stops) {
  if (stops.length < 2) return 0;
  const background = stops[0];
  const text = stops[2] || stops[1] || stops[0];
  return contrastRatio(background, text);
}

function buildRolePalette(baseHex, goal, boldness) {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [];
  const hsl = rgbToHsl(rgb);
  const hueShift = 18 + Math.round((boldness / 100) * 42);
  const accentShift = 120 + Math.round((boldness / 100) * 60);
  const baseLight = clampNumber(hsl.l, 20, 80);
  const satBoost = goal === "brand" ? 10 : 0;

  const background = hslToHex(hsl.h, clampNumber(hsl.s - 20, 8, 45), clampNumber(baseLight + 32, 80, 96));
  const surface = hslToHex(hsl.h, clampNumber(hsl.s - 10, 10, 50), clampNumber(baseLight + 18, 65, 88));
  const text = hslToHex(hsl.h, clampNumber(hsl.s + satBoost, 20, 65), clampNumber(baseLight - 32, 10, 35));
  const primary = hslToHex((hsl.h + hueShift) % 360, clampNumber(hsl.s + satBoost + 10, 35, 80), clampNumber(baseLight, 35, 60));
  const accent = hslToHex((hsl.h + accentShift) % 360, clampNumber(hsl.s + satBoost + 15, 40, 90), clampNumber(baseLight + 4, 40, 65));

  return [background, surface, text, primary, accent].map((hex) => hex.toUpperCase());
}

function getSourceSeedHexes(source) {
  if (source === "current") {
    const active = getActivePalette();
    return active?.stops?.length ? active.stops.slice(0, 5) : [];
  }
  if (source === "hexhub") {
    const list = state.generatorStops.length ? state.generatorStops : (state.palettes[0]?.stops || []);
    return list.slice(0, 5);
  }
  if (source === "random") {
    return buildTonePalette("fresh", 5);
  }
  const primary = normalizeHex(el.baseColor?.value || "") || "#0EA5E9";
  return [primary];
}

function buildSuggestions(goal, source, boldness) {
  const seeds = getSourceSeedHexes(source);
  const primary = seeds[0] || "#0EA5E9";
  const base = buildRolePalette(primary, goal, boldness);
  if (!base.length) return [];
  const suggestions = [];
  const variants = [
    { tweak: 0, label: "Chuẩn" },
    { tweak: 10, label: "Tươi hơn" },
    { tweak: -10, label: "Trầm hơn" },
    { tweak: 20, label: "Nổi bật" },
    { tweak: -20, label: "An toàn" },
    { tweak: 5, label: "Cân bằng" }
  ];
  variants.slice(0, 6).forEach((variant, idx) => {
    const adjusted = base.map((hex) => {
      const rgb = hexToRgb(hex);
      if (!rgb) return hex;
      const hsl = rgbToHsl(rgb);
      const nextL = clampNumber(hsl.l + variant.tweak, 8, 96);
      return hslToHex(hsl.h, hsl.s, nextL).toUpperCase();
    });
    const scored = scoreContrast(adjusted);
    suggestions.push({
      id: `suggest_${Date.now()}_${idx}`,
      label: variant.label,
      score: scored,
      roles: {
        background: adjusted[0],
        surface: adjusted[1],
        text: adjusted[2],
        primary: adjusted[3],
        accent: adjusted[4]
      },
      stops: adjusted
    });
  });
  return suggestions;
}

async function enrichSuggestions(goal, suggestions) {
  if (!suggestions.length) return suggestions;
  if (goal === "embroidery") {
    await ensureThreadsLoaded();
    suggestions.forEach((suggestion) => {
      suggestion.threadMatches = suggestion.stops.map((hex) => findNearestThread(hex));
    });
  }
  if (goal === "print") {
    suggestions.forEach((suggestion) => {
      suggestion.cmykList = suggestion.stops.map((hex) => {
        const rgb = hexToRgb(hex);
        return rgb ? rgbToCmykApprox(rgb) : null;
      });
    });
  }
  return suggestions;
}

function buildSmartSuggestions(goal, mood, boldness) {
  const baseHex = buildBaseHex(goal, mood);
  const base = buildRolePalette(baseHex, goal === "brand" ? "brand" : "ui", boldness);
  if (!base.length) return [];
  const variants = [
    { tweak: 0, label: "Chuẩn" },
    { tweak: 10, label: "Tươi hơn" },
    { tweak: -10, label: "Trầm hơn" },
    { tweak: 15, label: "Nổi bật" },
    { tweak: -15, label: "An toàn" },
    { tweak: 5, label: "Cân bằng" }
  ];
  return variants.map((variant, idx) => {
    const adjusted = base.map((hex) => {
      const rgb = hexToRgb(hex);
      if (!rgb) return hex;
      const hsl = rgbToHsl(rgb);
      const nextL = clampNumber(hsl.l + variant.tweak, 8, 96);
      return hslToHex(hsl.h, hsl.s, nextL).toUpperCase();
    });
    if (goal === "brand") {
      adjusted[3] = baseHex;
    }
    let roles = {
      background: adjusted[0],
      surface: adjusted[1],
      text: adjusted[2],
      primary: adjusted[3],
      accent: adjusted[4]
    };
    if (goal === "ui") {
      roles = ensureUiContrast(roles);
      adjusted[2] = roles.text;
    }
    const avgSaturation = adjusted.reduce((sum, hex) => sum + getSaturation(hex), 0) / adjusted.length;
    const note = goal === "print" && avgSaturation > 70
      ? "Cảnh báo: màu rực, CMYK xấp xỉ (chưa ICC)."
      : "";
    return {
      id: `smart_${Date.now()}_${idx}`,
      label: variant.label,
      roles,
      stops: adjusted,
      goal,
      note
    };
  });
}

function renderSmartCard(suggestion, goalLabelText, moodLabel) {
  const card = document.createElement("div");
  card.className = "tc-card p-3 space-y-2";

  const head = document.createElement("div");
  head.className = "flex items-center justify-between";
  head.innerHTML = `<span class="text-xs font-semibold">${goalLabelText}</span><span class="text-[10px] tc-muted">${moodLabel}</span>`;

  const roleGrid = document.createElement("div");
  roleGrid.className = "grid grid-cols-2 gap-2 text-[10px]";
  Object.entries({
    "Nền": suggestion.roles.background,
    "Bề mặt": suggestion.roles.surface,
    "Chữ": suggestion.roles.text,
    "Primary": suggestion.roles.primary,
    "Accent": suggestion.roles.accent
  }).forEach(([label, hex]) => {
    const cell = document.createElement("div");
    cell.className = "flex items-center gap-2";
    cell.innerHTML = `<span class="w-4 h-4 rounded border" style="background:${hex}"></span><span>${label}</span>`;
    roleGrid.appendChild(cell);
  });

  if (suggestion.note) {
    const note = document.createElement("div");
    note.className = "text-[10px] tc-muted";
    note.textContent = suggestion.note;
    card.appendChild(note);
  }

  const actions = document.createElement("div");
  actions.className = "flex flex-wrap gap-2";
  const useBtn = document.createElement("button");
  useBtn.className = "tc-btn tc-btn-primary px-3 py-2 text-xs";
  useBtn.type = "button";
  useBtn.textContent = "Dùng ngay";
  useBtn.addEventListener("click", () => {
    createUserPalette(suggestion.stops, "Palette từ brief 1 dòng", ["smart", suggestion.goal]);
  });
  const saveBtn = document.createElement("button");
  saveBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  saveBtn.type = "button";
  saveBtn.textContent = "Lưu";
  saveBtn.addEventListener("click", () => {
    const palette = {
      id: `smart_${Date.now()}`,
      ten: "Palette từ brief 1 dòng",
      tags: ["smart", suggestion.goal],
      stops: suggestion.stops
    };
    const ok = addAssetToLibrary(buildPaletteAsset(palette));
    showToast(ok ? "Đã lưu gợi ý vào Thư viện." : "Không thể lưu gợi ý.");
  });
  const copyBtn = document.createElement("button");
  copyBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  copyBtn.type = "button";
  copyBtn.textContent = "Sao chép tokens";
  copyBtn.addEventListener("click", async () => {
    const ok = await copyText(tokensFor(suggestion.stops));
    showToast(ok ? "Đã sao chép token." : "Không thể sao chép.");
  });
  actions.appendChild(useBtn);
  actions.appendChild(saveBtn);
  actions.appendChild(copyBtn);

  card.appendChild(head);
  card.appendChild(roleGrid);
  card.appendChild(actions);
  return card;
}

function renderSmartSuggestions(list, goalLabelText, moodLabel) {
  if (!el.smartGrid) return;
  el.smartGrid.innerHTML = "";
  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "tc-card p-3 text-xs tc-muted";
    empty.textContent = "Chưa có gợi ý phù hợp.";
    el.smartGrid.appendChild(empty);
    return;
  }
  list.forEach((item) => {
    el.smartGrid.appendChild(renderSmartCard(item, goalLabelText, moodLabel));
  });
}

function renderSuggestCard(suggestion) {
  const card = document.createElement("div");
  card.className = "tc-card p-3 space-y-2";

  const head = document.createElement("div");
  head.className = "flex items-center justify-between";
  head.innerHTML = `<span class="text-xs font-semibold">${suggestion.label}</span><span class="text-[10px] tc-muted">Chấm điểm ${suggestion.score.toFixed(2)}</span>`;

  const roleGrid = document.createElement("div");
  roleGrid.className = "grid grid-cols-2 gap-2 text-[10px]";
  const roles = suggestion.roles;
  Object.entries({
    "Nền": roles.background,
    "Bề mặt": roles.surface,
    "Chữ": roles.text,
    "Primary": roles.primary,
    "Accent": roles.accent
  }).forEach(([label, hex]) => {
    const cell = document.createElement("div");
    cell.className = "flex items-center gap-2";
    cell.innerHTML = `<span class="w-4 h-4 rounded border" style="background:${hex}"></span><span>${label}</span>`;
    roleGrid.appendChild(cell);
  });

  if (suggestion.threadMatches?.length) {
    const wrap = document.createElement("div");
    wrap.className = "space-y-1 text-[10px]";
    const title = document.createElement("div");
    title.className = "tc-muted";
    title.textContent = "Mã chỉ gợi ý (ΔE):";
    const list = document.createElement("div");
    list.className = "flex flex-wrap gap-2";
    suggestion.threadMatches.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "tc-chip px-2 py-1 rounded-full";
      if (!item) {
        chip.textContent = "—";
      } else {
        const delta = typeof item.delta === "number" ? item.delta.toFixed(2) : "--";
        chip.textContent = `${item.brand || "?"} ${item.code || ""} · ΔE ${delta}`;
      }
      list.appendChild(chip);
    });
    wrap.appendChild(title);
    wrap.appendChild(list);
    card.appendChild(wrap);
  }

  if (suggestion.cmykList?.length) {
    const wrap = document.createElement("div");
    wrap.className = "space-y-1 text-[10px]";
    const title = document.createElement("div");
    title.className = "tc-muted";
    title.textContent = "CMYK xấp xỉ (chưa ICC):";
    const list = document.createElement("div");
    list.className = "flex flex-wrap gap-2";
    suggestion.cmykList.forEach((item) => {
      const chip = document.createElement("span");
      chip.className = "tc-chip px-2 py-1 rounded-full";
      chip.textContent = formatCmyk(item);
      list.appendChild(chip);
    });
    wrap.appendChild(title);
    wrap.appendChild(list);
    card.appendChild(wrap);
  }

  const actions = document.createElement("div");
  actions.className = "flex flex-wrap gap-2";
  const useBtn = document.createElement("button");
  useBtn.className = "tc-btn tc-btn-primary px-3 py-2 text-xs";
  useBtn.type = "button";
  useBtn.textContent = "Dùng ngay";
  useBtn.addEventListener("click", () => {
    createUserPalette(suggestion.stops, "Palette gợi ý theo mục tiêu", ["suggest", goalLabel(el.goalSelect?.value)]);
  });
  const saveBtn = document.createElement("button");
  saveBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  saveBtn.type = "button";
  saveBtn.textContent = "Lưu";
  saveBtn.addEventListener("click", () => {
    const palette = {
      id: `suggest_${Date.now()}`,
      ten: "Palette gợi ý theo mục tiêu",
      tags: ["suggest"],
      stops: suggestion.stops
    };
    const ok = addAssetToLibrary(buildPaletteAsset(palette));
    showToast(ok ? "Đã lưu gợi ý vào Thư viện." : "Không thể lưu gợi ý.");
  });
  const copyBtn = document.createElement("button");
  copyBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  copyBtn.type = "button";
  copyBtn.textContent = "Sao chép";
  copyBtn.addEventListener("click", async () => {
    const ok = await copyText(suggestion.stops.join(", "));
    showToast(ok ? "Đã sao chép HEX." : "Không thể sao chép.");
  });
  const openThread = document.createElement("button");
  openThread.className = "tc-btn tc-chip px-3 py-2 text-xs";
  openThread.type = "button";
  openThread.textContent = "Mở ở Thêu";
  openThread.addEventListener("click", () => {
    const target = suggestion.stops[0];
    if (!target) return;
    window.location.href = `./threadcolor.html?color=${encodeURIComponent(target)}`;
  });
  const openPrint = document.createElement("button");
  openPrint.className = "tc-btn tc-chip px-3 py-2 text-xs";
  openPrint.type = "button";
  openPrint.textContent = "Mở ở In";
  openPrint.addEventListener("click", () => {
    const payload = encodeURIComponent(suggestion.stops.join(","));
    window.location.href = `./printcolor.html#c=${payload}`;
  });
  actions.appendChild(useBtn);
  actions.appendChild(saveBtn);
  actions.appendChild(copyBtn);
  actions.appendChild(openThread);
  actions.appendChild(openPrint);

  card.appendChild(head);
  card.appendChild(roleGrid);
  card.appendChild(actions);
  return card;
}

function goalLabel(goal) {
  if (goal === "brand") return "brand";
  if (goal === "ui") return "ui";
  if (goal === "embroidery") return "embroidery";
  if (goal === "print") return "print";
  return "ui";
}

function renderSuggestions(suggestions) {
  if (!el.suggestGrid) return;
  el.suggestGrid.innerHTML = "";
  if (!suggestions.length) {
    const empty = document.createElement("div");
    empty.className = "tc-card p-3 text-xs tc-muted";
    empty.textContent = "Chưa có gợi ý phù hợp.";
    el.suggestGrid.appendChild(empty);
    return;
  }
  suggestions.forEach((suggestion) => {
    el.suggestGrid.appendChild(renderSuggestCard(suggestion));
  });
}
function tokensFor(stops) {
  return stops
    .map((hex, idx) => `  --mau-${String(idx + 1).padStart(2, "0")}: ${hex};`)
    .join("\n");
}

function exportText(palette) {
  const name = palette.ten || "Bảng phối màu";
  const stops = palette.stops || [];
  return `/* ${name} */\nHex: ${stops.join(", ")}\n\n:root {\n${tokensFor(stops)}\n}\n`;
}

function showToast(message) {
  let toast = document.getElementById("paletteToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "paletteToast";
    toast.className = "tc-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1400);
}

function buildHexPaletteFromInput(list) {
  const cleaned = Array.isArray(list) ? list.filter(Boolean) : [];
  if (!cleaned.length) return [];
  const base = cleaned[0];
  const fallback = buildHarmonyPalette(base, "analogous");
  const targetCount = 5;
  const result = fallback.slice(0, targetCount);
  cleaned.slice(0, targetCount).forEach((hex, idx) => {
    result[idx] = hex;
  });
  return result.slice(0, targetCount);
}

function buildFullscreenPalette() {
  const baseHue = Math.floor(Math.random() * 360);
  const hueOffsets = [0, 28, 62, 130, 210];
  const baseSat = clampNumber(45 + Math.random() * 30, 35, 85);
  const baseLight = clampNumber(42 + Math.random() * 16, 30, 70);
  return hueOffsets.map((offset, idx) => {
    const h = (baseHue + offset) % 360;
    const s = clampNumber(baseSat + (idx - 2) * 4, 28, 90);
    const l = clampNumber(baseLight + (idx - 2) * 6, 24, 82);
    return hslToHex(h, s, l);
  });
}

function seedFullscreenPalette() {
  const base = buildFullscreenPalette();
  const active = getActivePalette();
  const stops = Array.isArray(active?.stops) ? active.stops : [];
  if (!stops.length) return base;
  const cleaned = stops.map((hex) => normalizeHex(hex)).filter(Boolean);
  if (!cleaned.length) return base;
  return Array.from({ length: FULLSCREEN_COLUMNS }, (_, idx) => cleaned[idx] || base[idx]);
}

function normalizeFullscreenHex(hex) {
  const normalized = normalizeHex(hex);
  return normalized ? normalized.toUpperCase() : "#111111";
}

function snapshotFullscreenPalette(palette) {
  const list = Array.isArray(palette) ? palette : [];
  return Array.from({ length: FULLSCREEN_COLUMNS }, (_, idx) => normalizeFullscreenHex(list[idx]));
}

function showRailForCol(col, duration = 2000) {
  if (!col) return;
  col.classList.add("is-rail-visible");
  if (fullscreenRailTimers.has(col)) {
    window.clearTimeout(fullscreenRailTimers.get(col));
  }
  const timer = window.setTimeout(() => {
    col.classList.remove("is-rail-visible");
    fullscreenRailTimers.delete(col);
  }, duration);
  fullscreenRailTimers.set(col, timer);
}

function hideRailForCol(col) {
  if (!col) return;
  col.classList.remove("is-rail-visible");
  if (fullscreenRailTimers.has(col)) {
    window.clearTimeout(fullscreenRailTimers.get(col));
    fullscreenRailTimers.delete(col);
  }
}

function hideAllRails() {
  if (!el.fullscreen) return;
  el.fullscreen.querySelectorAll(".pf-col.is-rail-visible").forEach((col) => {
    hideRailForCol(col);
  });
}

function closeAllTunePopovers(exceptCol) {
  if (!el.fullscreen) return;
  el.fullscreen.querySelectorAll(".pf-tune.is-open").forEach((panel) => {
    const col = panel.closest(".pf-col");
    if (exceptCol && col === exceptCol) return;
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    if (col) col.classList.remove("is-tune-open");
  });
}

function toggleTunePopover(col) {
  if (!col) return;
  const panel = col.querySelector(".pf-tune");
  if (!panel) return;
  const isOpen = panel.classList.contains("is-open");
  closeAllTunePopovers(col);
  if (!isOpen) {
    initTunePanel(col);
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    col.classList.add("is-tune-open");
  } else {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    col.classList.remove("is-tune-open");
  }
}

function randomFullscreenHex() {
  const hue = Math.floor(Math.random() * 360);
  const sat = clampNumber(45 + Math.random() * 40, 30, 90);
  const light = clampNumber(35 + Math.random() * 30, 25, 80);
  return hslToHex(hue, sat, light);
}

function updateFullscreenColumn(idx, hex, { recordHistory = true } = {}) {
  if (idx < 0 || idx >= FULLSCREEN_COLUMNS) return;
  const next = snapshotFullscreenPalette(fullscreenPalette);
  next[idx] = normalizeFullscreenHex(hex);
  applyFullscreenPalette(next, { respectLocks: false, recordHistory });
}

function adjustFullscreenColumn(idx, { hueDelta = 0, lightDelta = 0 } = {}) {
  if (idx < 0 || idx >= FULLSCREEN_COLUMNS) return;
  const baseHex = fullscreenPalette[idx];
  const rgb = hexToRgb(baseHex);
  if (!rgb) return;
  const hsl = rgbToHsl(rgb);
  const nextHue = (hsl.h + hueDelta + 360) % 360;
  const nextLight = clampNumber(hsl.l + lightDelta, 0, 100);
  updateFullscreenColumn(idx, hslToHex(nextHue, hsl.s, nextLight));
}

function formatTuneValue(value, { isOffset = false } = {}) {
  return formatTuneValueCore(value, { isOffset });
}

function syncTuneValues(panel) {
  if (!panel) return;
  const hueInput = panel.querySelector("[data-tune='hue']");
  const satInput = panel.querySelector("[data-tune='sat']");
  const lightInput = panel.querySelector("[data-tune='light']");
  const hueValue = panel.querySelector("[data-value='hue']");
  const satValue = panel.querySelector("[data-value='sat']");
  const lightValue = panel.querySelector("[data-value='light']");
  if (hueInput && hueValue) hueValue.textContent = formatTuneValue(hueInput.value);
  if (satInput && satValue) satValue.textContent = formatTuneValue(satInput.value, { isOffset: true });
  if (lightInput && lightValue) lightValue.textContent = formatTuneValue(lightInput.value, { isOffset: true });
}

function initTunePanel(col) {
  if (!col) return;
  const panel = col.querySelector(".pf-tune");
  if (!panel) return;
  const idx = Number(col.dataset.idx || 0);
  const hex = normalizeHex(fullscreenPalette[idx] || col.dataset.hex || "#111111");
  const rgb = hex ? hexToRgb(hex) : null;
  if (!rgb) return;
  const hsl = rgbToHsl(rgb);
  panel.dataset.baseH = String(Math.round(hsl.h));
  panel.dataset.baseS = String(Math.round(hsl.s));
  panel.dataset.baseL = String(Math.round(hsl.l));
  const hueInput = panel.querySelector("[data-tune='hue']");
  const satInput = panel.querySelector("[data-tune='sat']");
  const lightInput = panel.querySelector("[data-tune='light']");
  if (hueInput) hueInput.value = Math.round(hsl.h);
  if (satInput) satInput.value = 0;
  if (lightInput) lightInput.value = 0;
  syncTuneValues(panel);
}

function computeTuneHex(panel) {
  if (!panel) return null;
  const baseH = Number(panel.dataset.baseH || 0);
  const baseS = Number(panel.dataset.baseS || 0);
  const baseL = Number(panel.dataset.baseL || 0);
  const hueInput = panel.querySelector("[data-tune='hue']");
  const satInput = panel.querySelector("[data-tune='sat']");
  const lightInput = panel.querySelector("[data-tune='light']");
  const hue = Number(hueInput?.value ?? baseH);
  const satOffset = Number(satInput?.value ?? 0);
  const lightOffset = Number(lightInput?.value ?? 0);
  const nextS = clampNumber(baseS + satOffset, 0, 100);
  const nextL = clampNumber(baseL + lightOffset, 0, 100);
  return hslToHex(hue, nextS, nextL);
}

function getFullscreenStops() {
  return snapshotFullscreenPalette(fullscreenPalette);
}

function toggleFullscreenTokenPanel(force) {
  if (!el.fullscreenToken) return;
  if (typeof force === "boolean") {
    fullscreenTokenVisible = force;
  } else {
    fullscreenTokenVisible = !fullscreenTokenVisible;
  }
  el.fullscreenToken.classList.toggle("is-open", fullscreenTokenVisible);
  el.fullscreenToken.setAttribute("aria-hidden", fullscreenTokenVisible ? "false" : "true");
}

async function copyFullscreenTokens() {
  const stops = getFullscreenStops();
  if (!stops.length) {
    showToast("Chưa có màu để xuất token.");
    return;
  }
  const ok = await copyText(tokensFor(stops));
  showToast(ok ? "Đã sao chép CSS tokens." : "Không thể sao chép.");
  if (ok) toggleFullscreenTokenPanel(false);
}

function saveFullscreenToLibrary() {
  const stops = getFullscreenStops();
  if (stops.length < MIN_STOPS) {
    showToast("Chưa đủ màu để lưu.");
    return;
  }
  const palette = {
    ten: "Palette toàn màn hình",
    tags: ["fullscreen"],
    stops
  };
  const ok = addAssetToLibrary(buildPaletteAsset(palette));
  showToast(ok ? "Đã lưu vào Thư viện." : "Không thể lưu tài sản.");
}

async function copyFullscreenShareLink() {
  const stops = getFullscreenStops();
  if (stops.length < MIN_STOPS) {
    showToast("Chưa đủ màu để chia sẻ.");
    return;
  }
  const link = buildShareLink(stops);
  if (!link) {
    showToast(t("paletteTool.shareState.toast.copyFail", "Không thể sao chép link chia sẻ."));
    return;
  }
  const ok = await copyText(link);
  showToast(
    ok
      ? t("paletteTool.shareState.toast.copied", "Đã sao chép link!")
      : t("paletteTool.shareState.toast.copyFail", "Không thể sao chép link chia sẻ.")
  );
}

function pushFullscreenHistory(palette) {
  const snapshot = snapshotFullscreenPalette(palette);
  const current = fullscreenHistory[fullscreenHistoryIndex];
  if (current && current.join("|") === snapshot.join("|")) return;
  if (fullscreenHistoryIndex < fullscreenHistory.length - 1) {
    fullscreenHistory = fullscreenHistory.slice(0, fullscreenHistoryIndex + 1);
  }
  fullscreenHistory.push(snapshot);
  if (fullscreenHistory.length > FULLSCREEN_HISTORY_LIMIT) {
    const overflow = fullscreenHistory.length - FULLSCREEN_HISTORY_LIMIT;
    fullscreenHistory = fullscreenHistory.slice(overflow);
  }
  fullscreenHistoryIndex = fullscreenHistory.length - 1;
}

function resetFullscreenHistory(palette) {
  fullscreenHistory = [];
  fullscreenHistoryIndex = -1;
  pushFullscreenHistory(palette);
}

function applyFullscreenPalette(hexes, { respectLocks = false, recordHistory = true } = {}) {
  const next = renderFullscreenPalette(hexes, { respectLocks });
  if (recordHistory && next) {
    pushFullscreenHistory(next);
  }
  return next;
}

function undoFullscreenPalette() {
  if (fullscreenHistoryIndex <= 0) return;
  fullscreenHistoryIndex -= 1;
  renderFullscreenPalette(fullscreenHistory[fullscreenHistoryIndex] || []);
}

function redoFullscreenPalette() {
  if (fullscreenHistoryIndex >= fullscreenHistory.length - 1) return;
  fullscreenHistoryIndex += 1;
  renderFullscreenPalette(fullscreenHistory[fullscreenHistoryIndex] || []);
}

function shiftFullscreenHue(delta) {
  if (!fullscreenPalette.length) return;
  const shifted = fullscreenPalette.map((hex) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return hex;
    const rgb = hexToRgb(normalized);
    if (!rgb) return hex;
    const hsl = rgbToHsl(rgb);
    const nextHue = (hsl.h + delta + 360) % 360;
    return hslToHex(nextHue, hsl.s, hsl.l);
  });
  applyFullscreenPalette(shifted, { respectLocks: true });
}

function shiftFullscreenLightness(delta) {
  if (!fullscreenPalette.length) return;
  const shifted = fullscreenPalette.map((hex) => {
    const normalized = normalizeHex(hex);
    if (!normalized) return hex;
    const rgb = hexToRgb(normalized);
    if (!rgb) return hex;
    const hsl = rgbToHsl(rgb);
    const nextLight = clampNumber(hsl.l + delta, 0, 100);
    return hslToHex(hsl.h, hsl.s, nextLight);
  });
  applyFullscreenPalette(shifted, { respectLocks: true });
}

function ensureFullscreenOverlay() {
  let overlay = el.fullscreen || document.getElementById("paletteFullscreen");
  if (!overlay) {
    const lockIcon = `
      <svg class="pf-rail-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 11V8a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
      </svg>
    `;
    const copyRailIcon = `
      <svg class="pf-rail-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="9" y="9" width="10" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
        <path d="M5 15V5a2 2 0 0 1 2-2h10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    `;
    const rollIcon = `
      <svg class="pf-rail-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 4v6h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M20 20v-6h-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M20 10a8 8 0 0 0-14-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M4 14a8 8 0 0 0 14 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    `;
    const tuneIcon = `
      <svg class="pf-rail-icon" viewBox="0 0 24 24" aria-hidden="true">
        <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <circle cx="9" cy="6" r="2" fill="none" stroke="currentColor" stroke-width="2"></circle>
        <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <circle cx="15" cy="12" r="2" fill="none" stroke="currentColor" stroke-width="2"></circle>
        <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
        <circle cx="7" cy="18" r="2" fill="none" stroke="currentColor" stroke-width="2"></circle>
      </svg>
    `;
    const pickIcon = `
      <svg class="pf-rail-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M14.5 3.5l6 6-2 2-1.5-1.5-7.5 7.5H7v-2.5l7.5-7.5L13 5.5z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        <path d="M5 19h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
      </svg>
    `;
    const rail = `
      <div class="pf-rail" aria-hidden="false">
        <button class="pf-rail-btn" type="button" data-action="lock" data-tooltip="Khóa cột" aria-label="Khóa cột">${lockIcon}</button>
        <button class="pf-rail-btn" type="button" data-action="copy" data-tooltip="Sao chép HEX" aria-label="Sao chép HEX">${copyRailIcon}</button>
        <button class="pf-rail-btn" type="button" data-action="roll" data-tooltip="Quay cột" aria-label="Quay cột">${rollIcon}</button>
        <button class="pf-rail-btn" type="button" data-action="tune" data-tooltip="Tinh chỉnh" aria-label="Tinh chỉnh">${tuneIcon}</button>
        <button class="pf-rail-btn" type="button" data-action="pick" data-tooltip="Chọn màu" aria-label="Chọn màu">${pickIcon}</button>
      </div>
      <div class="pf-tune" aria-hidden="true">
        <div class="pf-tune-row">
          <span class="pf-tune-label">Hue</span>
          <input class="pf-tune-range" type="range" min="0" max="360" step="1" value="0" data-tune="hue" aria-label="Hue" />
          <span class="pf-tune-value" data-value="hue">0</span>
        </div>
        <div class="pf-tune-row">
          <span class="pf-tune-label">Bão hoà</span>
          <input class="pf-tune-range" type="range" min="-30" max="30" step="1" value="0" data-tune="sat" aria-label="Bão hoà" />
          <span class="pf-tune-value" data-value="sat">0</span>
        </div>
        <div class="pf-tune-row">
          <span class="pf-tune-label">Sáng</span>
          <input class="pf-tune-range" type="range" min="-20" max="20" step="1" value="0" data-tune="light" aria-label="Độ sáng" />
          <span class="pf-tune-value" data-value="light">0</span>
        </div>
      </div>
    `;
    const cols = Array.from({ length: FULLSCREEN_COLUMNS }, (_, idx) => `
      <div class="pf-col" role="button" tabindex="0" data-idx="${idx}">
        ${rail}
        <span class="pf-hex">#FFFFFF</span>
      </div>
    `).join("");
    const shortcutsIcon = `
      <svg class="pf-hud-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
        <path d="M7 10h2M11 10h2M15 10h2M7 14h2M11 14h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
      </svg>
    `;
    const exitIcon = `
      <svg class="pf-hud-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 6l12 12M18 6l-12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
      </svg>
    `;
    overlay = document.createElement("div");
    overlay.id = "paletteFullscreen";
    overlay.className = "pf-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML = `
      <div class="pf-hud pf-hud-top">
        <span class="pf-live">LIVE</span>
        <div class="pf-hud-rail">
          <button id="paletteFsShortcuts" class="pf-hud-btn" type="button" aria-label="Phím tắt">
            ${shortcutsIcon}
            <span class="pf-tooltip pf-tooltip--shortcuts" aria-hidden="true">
              <span>Space</span>
              <span>1-5</span>
              <span>C</span>
              <span>H</span>
              <span>Esc</span>
            </span>
          </button>
          <button id="paletteFsExit" class="pf-hud-btn" type="button" aria-label="Thoát">
            ${exitIcon}
          </button>
        </div>
      </div>
      <div class="pf-cols">
        ${cols}
      </div>
      <div id="paletteFsToken" class="pf-help" aria-hidden="true" style="top:auto; bottom:72px;">
        <div style="display:flex; align-items:center; gap:0.6rem; justify-content:space-between;">
          <p class="pf-help-title" style="margin:0;">CSS tokens</p>
          <button id="paletteFsTokenCopy" class="pf-btn" type="button">Copy</button>
        </div>
      </div>
      <div id="paletteFsHelp" class="pf-help" aria-hidden="true">
        <p class="pf-help-title">Phím tắt</p>
        <ul class="pf-help-list">
          <li><span>Space</span> Đổi palette</li>
          <li><span>1-5</span> Khoá/mở cột</li>
          <li><span>C</span> Sao chép toàn bộ</li>
          <li><span>H</span> Bật/tắt trợ giúp</li>
          <li><span>Esc</span> Thoát</li>
        </ul>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  el.fullscreen = overlay;
  el.fullscreenExit = overlay.querySelector("#paletteFsExit");
  el.fullscreenCopyAll = overlay.querySelector("#paletteFsCopyAll");
  el.fullscreenHelp = overlay.querySelector("#paletteFsHelp");
  el.fullscreenToken = overlay.querySelector("#paletteFsToken");
  el.fullscreenTokenCopy = overlay.querySelector("#paletteFsTokenCopy");
  if (!el.fullscreenToken) {
    const tokenPanel = document.createElement("div");
    tokenPanel.id = "paletteFsToken";
    tokenPanel.className = "pf-help";
    tokenPanel.setAttribute("aria-hidden", "true");
    tokenPanel.style.top = "auto";
    tokenPanel.style.bottom = "72px";
    tokenPanel.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.6rem; justify-content:space-between;">
        <p class="pf-help-title" style="margin:0;">CSS tokens</p>
        <button id="paletteFsTokenCopy" class="pf-btn" type="button">Copy</button>
      </div>
    `;
    overlay.appendChild(tokenPanel);
    el.fullscreenToken = tokenPanel;
    el.fullscreenTokenCopy = tokenPanel.querySelector("#paletteFsTokenCopy");
  }
  let picker = overlay.querySelector("#paletteFsPicker");
  if (!picker) {
    picker = document.createElement("input");
    picker.id = "paletteFsPicker";
    picker.type = "color";
    picker.className = "pf-picker";
    picker.setAttribute("aria-hidden", "true");
    overlay.appendChild(picker);
  }
  el.fullscreenPicker = picker;
  const helpList = overlay.querySelector(".pf-help-list");
  if (helpList) {
    helpList.innerHTML = `
      <li><span>Space</span> Đổi palette</li>
      <li><span>1-5</span> Khoá/mở cột</li>
      <li><span>C</span> Sao chép toàn bộ</li>
      <li><span>H</span> Bật/tắt trợ giúp</li>
      <li><span>Esc</span> Thoát</li>
    `;
  }
  return overlay;
}

function renderFullscreenPalette(hexes, { respectLocks = false } = {}) {
  if (!el.fullscreen) return;
  const cols = Array.from(el.fullscreen.querySelectorAll(".pf-col"));
  const nextPalette = [...fullscreenPalette];
  for (let idx = 0; idx < FULLSCREEN_COLUMNS; idx += 1) {
    const raw = hexes[idx] || nextPalette[idx] || "#111111";
    const normalized = normalizeHex(raw) ? normalizeHex(raw).toUpperCase() : "#111111";
    if (!respectLocks || !fullscreenLocks[idx] || !nextPalette[idx]) {
      nextPalette[idx] = normalized;
    }
  }
  cols.forEach((col) => {
    const idx = Number(col.dataset.idx || 0);
    const hex = nextPalette[idx] || "#111111";
    col.dataset.hex = hex;
    col.dataset.locked = fullscreenLocks[idx] ? "1" : "0";
    col.style.background = hex;
    const label = col.querySelector(".pf-hex");
    if (label) {
      label.textContent = hex;
      const best = getBestText(hex);
      const isDarkText = best.text === "#000000";
      label.style.color = best.text;
      label.style.backgroundColor = isDarkText ? "rgba(255,255,255,0.72)" : "rgba(0,0,0,0.35)";
      label.style.borderColor = isDarkText ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.2)";
    }
  });
  fullscreenPalette = nextPalette;
  return nextPalette;
}

function toggleFullscreenLock(idx) {
  if (idx < 0 || idx >= FULLSCREEN_COLUMNS) return;
  fullscreenLocks[idx] = !fullscreenLocks[idx];
  renderFullscreenPalette(fullscreenPalette, { respectLocks: true });
}

async function copyFullscreenAll() {
  const list = fullscreenPalette.filter(Boolean);
  if (!list.length) {
    showToast("Chưa có màu để sao chép.");
    return;
  }
  const ok = await copyText(list.join(", "));
  showToast(ok ? "Đã sao chép toàn bộ HEX." : "Không thể sao chép.");
}

function toggleFullscreenHelp(force) {
  if (!el.fullscreenHelp) return;
  if (typeof force === "boolean") {
    fullscreenHelpVisible = force;
  } else {
    fullscreenHelpVisible = !fullscreenHelpVisible;
  }
  el.fullscreenHelp.classList.toggle("is-open", fullscreenHelpVisible);
  el.fullscreenHelp.setAttribute("aria-hidden", fullscreenHelpVisible ? "false" : "true");
}

function handleFullscreenKeydown(event) {
  if (!fullscreenActive) return;
  const tag = event.target?.tagName || "";
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  if (event.code === "Space") {
    event.preventDefault();
    applyFullscreenPalette(buildFullscreenPalette(), { respectLocks: true });
    return;
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    const step = event.shiftKey ? FULLSCREEN_HUE_STEP_LARGE : FULLSCREEN_HUE_STEP;
    shiftFullscreenHue(-step);
    return;
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    const step = event.shiftKey ? FULLSCREEN_HUE_STEP_LARGE : FULLSCREEN_HUE_STEP;
    shiftFullscreenHue(step);
    return;
  }
  if (event.key === "ArrowUp") {
    event.preventDefault();
    const step = event.shiftKey ? FULLSCREEN_LIGHT_STEP_LARGE : FULLSCREEN_LIGHT_STEP;
    shiftFullscreenLightness(step);
    return;
  }
  if (event.key === "ArrowDown") {
    event.preventDefault();
    const step = event.shiftKey ? FULLSCREEN_LIGHT_STEP_LARGE : FULLSCREEN_LIGHT_STEP;
    shiftFullscreenLightness(-step);
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    closeFullscreenPalette();
    return;
  }
  if (event.key === "c" || event.key === "C") {
    event.preventDefault();
    copyFullscreenAll();
    return;
  }
  if (event.key === "h" || event.key === "H") {
    event.preventDefault();
    toggleFullscreenHelp();
    return;
  }
  if (event.key === "t" || event.key === "T") {
    event.preventDefault();
    toggleFullscreenTokenPanel();
    return;
  }
  if (event.key === "s" || event.key === "S") {
    event.preventDefault();
    saveFullscreenToLibrary();
    return;
  }
  if (event.key === "l" || event.key === "L") {
    event.preventDefault();
    copyFullscreenShareLink();
    return;
  }
  if (event.key === "u" || event.key === "U") {
    event.preventDefault();
    undoFullscreenPalette();
    return;
  }
  if (event.key === "r" || event.key === "R") {
    event.preventDefault();
    redoFullscreenPalette();
    return;
  }
  if (/^[1-5]$/.test(event.key)) {
    event.preventDefault();
    toggleFullscreenLock(Number(event.key) - 1);
  }
}

function openFullscreenColorPicker(idx) {
  if (!el.fullscreenPicker) return;
  const hex = normalizeFullscreenHex(fullscreenPalette[idx]);
  el.fullscreenPicker.value = hex;
  el.fullscreenPicker.dataset.idx = String(idx);
  let opened = false;
  try {
    if (typeof el.fullscreenPicker.showPicker === "function") {
      el.fullscreenPicker.showPicker();
      opened = true;
    } else {
      el.fullscreenPicker.click();
      opened = true;
    }
  } catch (_err) {
    opened = false;
  }
  if (!opened) {
    const fallback = window.prompt("Nhập mã HEX (#RRGGBB):", hex);
    const next = normalizeHex(fallback);
    if (next) {
      updateFullscreenColumn(idx, next.toUpperCase());
    } else if (fallback) {
      showToast("Mã HEX không hợp lệ.");
    }
  }
}

function handleFullscreenPickerChange(event) {
  const picker = event.target;
  const idx = Number(picker.dataset.idx || -1);
  if (Number.isNaN(idx) || idx < 0) return;
  const next = normalizeHex(picker.value);
  if (!next) return;
  const normalized = next.toUpperCase();
  updateFullscreenColumn(idx, normalized);
  showToast(`Đã chọn ${normalized}.`);
}

async function handleFullscreenOverlayClick(event) {
  if (!fullscreenActive || !el.fullscreen) return;
  const overlay = el.fullscreen;
  const actionBtn = event.target.closest("[data-action]");
  if (actionBtn && overlay.contains(actionBtn)) {
    event.preventDefault();
    event.stopPropagation();
    const col = actionBtn.closest(".pf-col");
    const idx = Number(col?.dataset.idx ?? -1);
    if (Number.isNaN(idx) || idx < 0) return;
    const action = actionBtn.dataset.action || "";
    const hex = fullscreenPalette[idx] || col?.dataset.hex || "";
    if (action === "lock") {
      toggleFullscreenLock(idx);
      return;
    }
    if (action === "copy") {
      if (!hex) {
        showToast("Chưa có màu để sao chép.");
        return;
      }
      const ok = await copyText(hex);
      showToast(ok ? `Đã sao chép ${hex}` : "Không thể sao chép.");
      closeAllTunePopovers();
      return;
    }
    if (action === "roll") {
      updateFullscreenColumn(idx, randomFullscreenHex());
      closeAllTunePopovers();
      return;
    }
    if (action === "tune") {
      toggleTunePopover(col);
      return;
    }
    if (action === "pick") {
      openFullscreenColorPicker(idx);
      closeAllTunePopovers();
      return;
    }
    return;
  }

  const col = event.target.closest(".pf-col");
  if (!col || !overlay.contains(col)) {
    closeAllTunePopovers();
    return;
  }
  if (event.target.closest(".pf-tune")) return;
  if (fullscreenLastPointer === "touch") {
    showRailForCol(col, 2000);
    return;
  }
  const idx = Number(col.dataset.idx || 0);
  toggleFullscreenLock(idx);
  closeAllTunePopovers();
  const hex = col.dataset.hex || "";
  if (!hex) return;
  const ok = await copyText(hex);
  showToast(ok ? `Đã sao chép ${hex}` : "Không thể sao chép.");
}

function handleFullscreenOverlayPointerDown(event) {
  if (!el.fullscreen) return;
  fullscreenLastPointer = event.pointerType || "mouse";
  if (fullscreenLastPointer !== "touch") return;
  const col = event.target.closest(".pf-col");
  if (!col || !el.fullscreen.contains(col)) return;
  if (event.target.closest(".pf-rail") || event.target.closest(".pf-tune")) return;
  showRailForCol(col, 2000);
}

function handleFullscreenOverlayInput(event) {
  if (!fullscreenActive) return;
  const range = event.target.closest(".pf-tune-range");
  if (!range || !el.fullscreen?.contains(range)) return;
  const panel = range.closest(".pf-tune");
  const col = range.closest(".pf-col");
  if (!panel || !col) return;
  const idx = Number(col.dataset.idx || 0);
  const nextHex = computeTuneHex(panel);
  if (!nextHex) return;
  syncTuneValues(panel);
  updateFullscreenColumn(idx, nextHex, { recordHistory: false });
}

function handleFullscreenOverlayChange(event) {
  if (!fullscreenActive) return;
  const range = event.target.closest(".pf-tune-range");
  if (!range || !el.fullscreen?.contains(range)) return;
  const panel = range.closest(".pf-tune");
  const col = range.closest(".pf-col");
  if (!panel || !col) return;
  const idx = Number(col.dataset.idx || 0);
  const nextHex = computeTuneHex(panel);
  if (!nextHex) return;
  syncTuneValues(panel);
  updateFullscreenColumn(idx, nextHex, { recordHistory: true });
}

function handleFullscreenChange() {
  if (!fullscreenActive) return;
  if (document.fullscreenElement !== el.fullscreen) {
    closeFullscreenPalette({ skipExit: true });
  }
}

function openFullscreenPalette() {
  if (guardRoomReadonlyAction({ silent: true })) return;
  const overlay = ensureFullscreenOverlay();
  if (!overlay || fullscreenActive) return;
  fullscreenActive = true;
  fullscreenBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  overlay.classList.add("is-active");
  overlay.setAttribute("aria-hidden", "false");
  fullscreenLocks = Array.from({ length: FULLSCREEN_COLUMNS }, () => false);
  fullscreenHelpVisible = false;
  toggleFullscreenHelp(false);
  fullscreenTokenVisible = false;
  toggleFullscreenTokenPanel(false);
  fullscreenLastPointer = "mouse";
  closeAllTunePopovers();
  hideAllRails();
  const seeded = renderFullscreenPalette(seedFullscreenPalette());
  resetFullscreenHistory(seeded || []);
  window.addEventListener("keydown", handleFullscreenKeydown);
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  if (typeof overlay.requestFullscreen === "function") {
    overlay.requestFullscreen().catch(() => {
      overlay.classList.add("is-fallback");
    });
  } else {
    overlay.classList.add("is-fallback");
  }
}

function closeFullscreenPalette({ skipExit = false } = {}) {
  if (!fullscreenActive || !el.fullscreen) return;
  fullscreenActive = false;
  el.fullscreen.classList.remove("is-active", "is-fallback");
  el.fullscreen.setAttribute("aria-hidden", "true");
  window.removeEventListener("keydown", handleFullscreenKeydown);
  document.removeEventListener("fullscreenchange", handleFullscreenChange);
  toggleFullscreenHelp(false);
  toggleFullscreenTokenPanel(false);
  closeAllTunePopovers();
  hideAllRails();
  if (!skipExit && document.fullscreenElement === el.fullscreen) {
    document.exitFullscreen().catch(() => {});
  }
  document.body.style.overflow = fullscreenBodyOverflow;
  fullscreenBodyOverflow = "";
  fullscreenHistory = [];
  fullscreenHistoryIndex = -1;
  fullscreenTokenVisible = false;
}

function initFullscreenPalette() {
  const overlay = ensureFullscreenOverlay();
  if (!overlay || overlay.dataset.ready === "1") return;
  overlay.dataset.ready = "1";
  const triggers = document.querySelectorAll("[data-action='palette-fullscreen']");
  triggers.forEach((btn) => {
    if (btn.dataset.fsBound === "1") return;
    btn.dataset.fsBound = "1";
    btn.addEventListener("click", openFullscreenPalette);
  });
  el.fullscreenExit?.addEventListener("click", closeFullscreenPalette);
  el.fullscreenCopyAll?.addEventListener("click", copyFullscreenAll);
  el.fullscreenTokenCopy?.addEventListener("click", copyFullscreenTokens);
  overlay.addEventListener("click", handleFullscreenOverlayClick);
  overlay.addEventListener("pointerdown", handleFullscreenOverlayPointerDown);
  overlay.addEventListener("input", handleFullscreenOverlayInput);
  overlay.addEventListener("change", handleFullscreenOverlayChange);
  el.fullscreenPicker?.addEventListener("change", handleFullscreenPickerChange);
  el.fullscreenPicker?.addEventListener("input", handleFullscreenPickerChange);
}

function initPaletteCardCtas() {
  const bind = (selector, handler) => {
    document.querySelectorAll(selector).forEach((btn) => {
      if (btn.dataset.ctaBound === "1") return;
      btn.dataset.ctaBound = "1";
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        handler(btn);
      });
    });
  };

  bind("[data-action='palette-goal-run']", (btn) => {
    const card = btn.closest("details");
    if (card) card.open = true;
    if (el.suggestBtn) {
      el.suggestBtn.click();
      return;
    }
    showToast("Chưa sẵn sàng gợi ý theo mục tiêu.");
  });

  bind("[data-action='palette-smart-run']", async (btn) => {
    const card = btn.closest("details");
    if (card) card.open = true;
    const brief = String(el.smartBrief?.value || "").trim();
    if (!brief) {
      showToast("Hãy nhập brief 1 dòng.");
      el.smartBrief?.focus();
      return;
    }
    if (el.smartGenerate) {
      el.smartGenerate.click();
      return;
    }
    const parsed = await parseBrief(brief);
    const goal = parsed.goal || "ui";
    const mood = parsed.mood || FALLBACK_KNOWLEDGE.defaults;
    const boldness = clampNumber(parsed.boldness ?? 45, 0, 100);
    const suggestions = buildSmartSuggestions(goal, mood, boldness);
    const moodLabel = mood.label || "Mặc định";
    renderSmartSuggestions(suggestions, goalDisplay(goal), moodLabel);
  });

  bind("[data-action='palette-hex-run']", (btn) => {
    const card = btn.closest("details");
    if (card) card.open = true;
    const stops = parseHexList(el.hexInput?.value || "").slice(0, 5);
    if (stops.length < MIN_STOPS) {
      showToast("Hãy nhập ít nhất 2 màu hợp lệ.");
      el.hexInput?.focus();
      return;
    }
    const next = applyLocks(buildHexPaletteFromInput(stops));
    createUserPalette(next, "Palette từ HEX", ["hex"]);
  });
}

function buildPaletteAsset(palette, options = {}) {
  const rawStops = Array.isArray(palette?.stops) ? palette.stops : [];
  const colors = rawStops
    .map((hex) => normalizeHex(hex))
    .filter(Boolean)
    .map((hex) => hex.toUpperCase());
  const roleMap = normalizeShareRoles(options.roles, colors.length);
  const preview = PREVIEW_TABS.includes(options.preview) ? options.preview : null;
  const visionMode = PREVIEW_VISION_MODES.includes(options.visionMode) ? options.visionMode : null;
  const now = new Date().toISOString();
  return {
    id: String(options.assetId || `asset_${Date.now()}`),
    type: "palette",
    name: String(options.name || palette.ten || "Bảng phối màu"),
    tags: parseTagsText(Array.isArray(options.tags) ? options.tags.join(",") : ((palette.tags || []).join(","))),
    notes: String(options.notes || ""),
    payload: {
      colors,
      ...(roleMap ? { roles: roleMap } : {}),
      ...(preview ? { preview } : {}),
      ...(visionMode ? { visionMode } : {}),
      ...(options.libraryId ? { libraryId: String(options.libraryId) } : {})
    },
    createdAt: now,
    updatedAt: now,
    sourceWorld: HANDOFF_FROM,
    project: getCurrentProject(),
    version: "1.0.0"
  };
}

function addAssetToLibrary(asset) {
  try {
    const raw = localStorage.getItem(ASSET_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(list) ? list : [];
    next.unshift(asset);
    localStorage.setItem(ASSET_STORAGE_KEY, JSON.stringify(next));
    return true;
  } catch (_err) {
    return false;
  }
}

function getCurrentProject() {
  try {
    return localStorage.getItem(PROJECT_STORAGE_KEY) || "";
  } catch (_err) {
    return "";
  }
}

function loadLocalPaletteAssetById(assetId) {
  if (!assetId) return null;
  try {
    const raw = localStorage.getItem(ASSET_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(list)) return null;
    return list.find((item) => String(item?.id || "") === String(assetId)) || null;
  } catch (_err) {
    return null;
  }
}

function extractLibraryPresetFromAsset(asset) {
  if (!asset || typeof asset !== "object") return null;
  const colors = Array.isArray(asset?.payload?.colors)
    ? asset.payload.colors.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
    : [];
  if (colors.length < MIN_STOPS || colors.length > MAX_STOPS) return null;
  const roles = normalizeShareRoles(asset?.payload?.roles, colors.length) || autoAssignRoleMap(colors);
  const preview = PREVIEW_TABS.includes(asset?.payload?.preview) ? asset.payload.preview : PREVIEW_TABS[0];
  const visionMode = PREVIEW_VISION_MODES.includes(asset?.payload?.visionMode) ? asset.payload.visionMode : "normal";
  return {
    id: String(asset?.payload?.libraryId || asset?.id || `asset_${Date.now()}`),
    name: String(asset?.name || "Preset bảng phối"),
    tags: Array.isArray(asset?.tags) ? asset.tags.map((tag) => String(tag)) : [],
    notes: String(asset?.notes || ""),
    colors,
    roles,
    preview,
    visionMode,
    createdAt: String(asset?.createdAt || ""),
    updatedAt: String(asset?.updatedAt || "")
  };
}

function getSelectedPalette() {
  if (state.selectedPaletteId === "hash-palette") return state.hashPalette;
  if (!state.selectedPaletteId) return null;
  return state.palettes.find((item) => item.id === state.selectedPaletteId) || null;
}

function selectPalette(palette) {
  if (!palette) return;
  state.selectedPaletteId = palette.id || "";
}

function getActivePalette() {
  return getSelectedPalette() || state.hashPalette;
}

function isLoggedIn() {
  const auth = window.tcAuth || null;
  if (typeof auth?.isLoggedIn === "function") return auth.isLoggedIn();
  return false;
}

function publishToFeed(asset) {
  if (!asset) return false;
  if (!isLoggedIn()) {
    showToast("Cần đăng nhập để chia sẻ.");
    return false;
  }
  try {
    const raw = localStorage.getItem(FEED_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const next = Array.isArray(list) ? list : [];
    next.unshift({
      id: `post_${Date.now()}`,
      asset,
      createdAt: new Date().toISOString()
    });
    localStorage.setItem(FEED_STORAGE_KEY, JSON.stringify(next));
    showToast("Đã chia sẻ lên feed.");
    return true;
  } catch (_err) {
    showToast("Không thể chia sẻ.");
    return false;
  }
}

async function copyText(text) {
  if (!text) return false;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (_err) {
    // fallback below
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    return true;
  } catch (_err) {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

function downloadTextFile(filename, content, mimeType = "text/plain;charset=utf-8") {
  const fileName = String(filename || "").trim();
  const payload = String(content ?? "");
  if (!fileName || !payload) return false;
  try {
    const blob = new Blob([payload], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.style.position = "fixed";
    anchor.style.left = "-9999px";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1200);
    return true;
  } catch (_err) {
    return false;
  }
}

function getRoleMapForPalette(palette, stops, fallbackRoles = null) {
  const fallback = normalizeShareRoles(fallbackRoles, stops.length) || autoAssignRoleMap(stops);
  const paletteId = getPaletteId(palette);
  const current = state.roleMapByPaletteId.get(paletteId);
  return normalizeShareRoles(current, stops.length) || fallback;
}

function getCurrentPreviewForPalette(palette, fallbackPreview = PREVIEW_TABS[0]) {
  const paletteId = getPaletteId(palette);
  const preview = state.previewTabByPaletteId.get(paletteId);
  return PREVIEW_TABS.includes(preview) ? preview : fallbackPreview;
}

function getCurrentVisionForPalette(palette, fallbackVision = "normal") {
  const paletteId = getPaletteId(palette);
  const vision = state.previewVisionModeByPaletteId.get(paletteId);
  return PREVIEW_VISION_MODES.includes(vision) ? vision : fallbackVision;
}

function setLibraryStateText(message) {
  if (!el.libraryState) return;
  el.libraryState.textContent = message || "";
}

function renderTeamScopeControls() {
  const hasTeams = state.teams.length > 0;
  if (el.scopePersonal) {
    el.scopePersonal.classList.toggle("is-active", state.libraryScope === "personal");
  }
  if (el.scopeTeam) {
    el.scopeTeam.classList.toggle("is-active", state.libraryScope === "team");
    el.scopeTeam.disabled = !hasTeams;
    el.scopeTeam.classList.toggle("opacity-60", !hasTeams);
    el.scopeTeam.classList.toggle("cursor-not-allowed", !hasTeams);
  }
  if (el.teamSelect) {
    el.teamSelect.disabled = !hasTeams || state.libraryScope !== "team";
    el.teamSelect.innerHTML = "";
    if (!hasTeams) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = t("paletteTool.library.team.noTeamOption", "Chưa có team");
      el.teamSelect.appendChild(opt);
    } else {
      state.teams.forEach((team) => {
        const option = document.createElement("option");
        option.value = team.id;
        option.textContent = team.name || team.id;
        el.teamSelect.appendChild(option);
      });
      el.teamSelect.value = state.selectedTeamId || state.teams[0].id;
    }
  }
  const activeTeam = getActiveTeam();
  state.selectedTeamRole = activeTeam?.role || TEAM_ROLE_VIEWER;
  if (el.teamRoleHint) {
    if (state.libraryScope === "team" && activeTeam) {
      const roleText = t(`paletteTool.library.team.roles.${activeTeam.role}`, activeTeam.role);
      el.teamRoleHint.textContent = t("paletteTool.library.team.current", "Đang xem team {team} · quyền {role}.", {
        team: activeTeam.name || activeTeam.id,
        role: roleText
      });
    } else if (state.libraryScope === "team") {
      el.teamRoleHint.textContent = t("paletteTool.library.team.needSelect", "Hãy chọn team để xem Thư viện Team.");
    } else {
      el.teamRoleHint.textContent = t("paletteTool.library.team.personalHint", "Đang xem thư viện cá nhân.");
    }
  }
  if (el.saveTeamLibrary) {
    const showTeamButton = state.libraryScope === "team" && !!activeTeam;
    el.saveTeamLibrary.classList.toggle("hidden", !showTeamButton);
    const canWrite = canWriteTeamRole(activeTeam?.role || TEAM_ROLE_VIEWER);
    el.saveTeamLibrary.disabled = !canWrite;
    el.saveTeamLibrary.classList.toggle("opacity-60", !canWrite);
    el.saveTeamLibrary.classList.toggle("cursor-not-allowed", !canWrite);
  }
}

function setLibraryScope(nextScope, options = {}) {
  const scope = nextScope === "team" ? "team" : "personal";
  const { refresh = true, silent = true } = options;
  if (scope === "team" && !state.teams.length) {
    state.libraryScope = "personal";
    renderTeamScopeControls();
    if (!silent) {
      showToast(t("paletteTool.library.toast.noTeam", "Bạn chưa thuộc team nào."));
    }
    return false;
  }
  state.libraryScope = scope;
  if (scope === "team" && !state.selectedTeamId && state.teams.length) {
    state.selectedTeamId = state.teams[0].id;
  }
  saveLibraryScopePreference();
  renderTeamScopeControls();
  if (scope === "team" && state.selectedTeamId) {
    loadTeamGuideline(state.selectedTeamId, { silent: true }).finally(() => {
      renderPalettes();
    });
  } else {
    renderPalettes();
  }
  if (refresh) {
    loadLibraryPresets({ silent: true });
  }
  return true;
}

async function loadTeamsForCurrentUser(options = {}) {
  const { silent = false } = options;
  const api = await waitForFirebaseApi();
  if (!canUsePaletteLibraryApi(api)) {
    state.teams = [];
    state.teamsLoaded = false;
    state.selectedTeamId = "";
    renderTeamScopeControls();
    return { ok: false, reason: "api_unavailable" };
  }
  const user = api.auth?.currentUser || null;
  if (!user?.uid) {
    state.teams = [];
    state.teamsLoaded = false;
    state.selectedTeamId = "";
    renderTeamScopeControls();
    return { ok: false, reason: "no_auth" };
  }
  state.teamsLoading = true;
  try {
    const teamColRef = api.collection(api.db, TEAM_COLLECTION);
    const teamSnap = await api.getDocs(teamColRef);
    const teams = [];
    const tasks = [];
    teamSnap?.forEach?.((docSnap) => {
      const teamData = docSnap.data?.() || {};
      const teamId = String(docSnap.id || "").trim();
      if (!teamId) return;
      tasks.push((async () => {
        try {
          const memberRef = api.doc(api.db, TEAM_COLLECTION, teamId, TEAM_MEMBER_COLLECTION, user.uid);
          const memberSnap = await api.getDoc(memberRef);
          if (!memberSnap?.exists?.()) return;
          const memberData = memberSnap.data?.() || {};
          const role = normalizeTeamRole(memberData.role);
          teams.push({
            id: teamId,
            name: String(teamData.name || teamData.label || `Team ${teamId}`),
            role
          });
        } catch (_err) {
          // bỏ qua team lỗi đọc member riêng lẻ
        }
      })());
    });
    await Promise.all(tasks);
    teams.sort((a, b) => a.name.localeCompare(b.name, "vi"));
    state.teams = teams;
    state.teamsLoaded = true;
    if (!state.teams.find((team) => team.id === state.selectedTeamId)) {
      state.selectedTeamId = teams[0]?.id || "";
    }
    if (state.libraryScope === "team" && !teams.length) {
      state.libraryScope = "personal";
    }
    state.selectedTeamRole = (teams.find((team) => team.id === state.selectedTeamId)?.role) || TEAM_ROLE_VIEWER;
    if (state.selectedTeamId) {
      await loadTeamGuideline(state.selectedTeamId, { silent: true, api });
    }
    saveLibraryScopePreference();
    renderTeamScopeControls();
    renderPalettes();
    return { ok: true, count: teams.length };
  } catch (_err) {
    state.teams = [];
    state.teamsLoaded = false;
    state.selectedTeamId = "";
    if (state.libraryScope === "team") {
      state.libraryScope = "personal";
    }
    renderTeamScopeControls();
    if (!silent) {
      showToast(t("paletteTool.library.toast.teamLoadFailed", "Không thể tải danh sách team."));
    }
    return { ok: false, reason: "team_fetch_failed" };
  } finally {
    state.teamsLoading = false;
  }
}

async function writeTeamAuditEvent(api, teamId, eventName, payload = {}) {
  if (!api || !teamId || !eventName) return false;
  const user = api.auth?.currentUser || null;
  if (!user?.uid) return false;
  const eventId = `evt_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const ref = api.doc(api.db, TEAM_COLLECTION, teamId, TEAM_AUDIT_COLLECTION, eventId);
  try {
    const nextPayload = {
      event: String(eventName),
      paletteId: String(payload.paletteId || ""),
      actorUid: user.uid,
      teamId: String(teamId),
      sourceWorld: HANDOFF_FROM,
      locked: !!payload.locked,
      at: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString()
    };
    if (typeof payload.statusFrom === "string") {
      nextPayload.statusFrom = normalizeApprovalStatus(payload.statusFrom);
    }
    if (typeof payload.statusTo === "string") {
      nextPayload.statusTo = normalizeApprovalStatus(payload.statusTo);
    }
    const approvalAction = String(payload.approvalAction || "").trim().toLowerCase();
    if (approvalAction) {
      nextPayload.approvalAction = approvalAction;
    }
    const comment = String(payload.comment || "").trim().slice(0, 500);
    if (comment) {
      nextPayload.comment = comment;
    }
    await api.setDoc(ref, nextPayload, { merge: false });
    return true;
  } catch (_err) {
    return false;
  }
}

function setLibraryModalOpen(open) {
  if (!el.libraryModal) return;
  el.libraryModal.setAttribute("aria-hidden", open ? "false" : "true");
  if (open) {
    document.body.classList.add("tc-modal-open");
    window.setTimeout(() => {
      el.libraryNameInput?.focus();
      el.libraryNameInput?.select?.();
    }, 0);
    return;
  }
  document.body.classList.remove("tc-modal-open");
}

function syncLibrarySubmitState() {
  if (!el.librarySubmit) return;
  el.librarySubmit.disabled = state.librarySaveBusy;
  el.librarySubmit.classList.toggle("opacity-60", state.librarySaveBusy);
  el.librarySubmit.classList.toggle("cursor-not-allowed", state.librarySaveBusy);
}

function closeLibrarySaveModal() {
  state.librarySaveDraft = null;
  state.librarySaveBusy = false;
  syncLibrarySubmitState();
  setLibraryModalOpen(false);
}

function openLibrarySaveModal({ palette, roleMap, preview, visionMode, mode = "create", sourceScope = null, targetPresetId = "" } = {}) {
  if (!palette) {
    showToast(t("paletteTool.library.toast.missingPalette", "Hãy chọn một bảng phối màu."));
    return;
  }
  const stops = Array.isArray(palette?.stops)
    ? palette.stops.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
    : [];
  if (stops.length < MIN_STOPS || stops.length > MAX_STOPS) {
    showToast(t("paletteTool.library.toast.invalidPreset", "Preset trong Thư viện không hợp lệ."));
    return;
  }
  const normalizedRoleMap = normalizeShareRoles(roleMap, stops.length) || autoAssignRoleMap(stops);
  const activeScope = sourceScope || getLibrarySourceScope();
  state.librarySaveDraft = {
    mode: mode === "update" ? "update" : "create",
    sourceScope: activeScope === "team" ? "team" : "personal",
    teamId: activeScope === "team" ? (getActiveTeam()?.id || "") : "",
    teamRole: activeScope === "team" ? (getActiveTeam()?.role || TEAM_ROLE_VIEWER) : TEAM_ROLE_VIEWER,
    targetPresetId: String(targetPresetId || ""),
    palette: {
      id: String(palette?.id || `palette_${Date.now()}`),
      ten: String(palette?.ten || t("paletteTool.library.fallbackName", "Preset bảng phối")),
      tags: Array.isArray(palette?.tags) ? palette.tags.map((tag) => String(tag)) : [],
      stops
    },
    roleMap: normalizedRoleMap,
    preview: PREVIEW_TABS.includes(preview) ? preview : PREVIEW_TABS[0],
    visionMode: PREVIEW_VISION_MODES.includes(visionMode) ? visionMode : "normal"
  };
  if (el.libraryNameInput) el.libraryNameInput.value = state.librarySaveDraft.palette.ten;
  if (el.libraryTagsInput) el.libraryTagsInput.value = state.librarySaveDraft.palette.tags.join(", ");
  if (el.libraryNotesInput) el.libraryNotesInput.value = String(palette?.notes || "");
  if (el.libraryModalTitle) {
    const titleKey = state.librarySaveDraft.mode === "update"
      ? "paletteTool.library.modal.titleUpdate"
      : "paletteTool.library.modal.title";
    const titleFallback = state.librarySaveDraft.mode === "update"
      ? "Cập nhật preset bảng phối"
      : "Lưu preset bảng phối";
    el.libraryModalTitle.textContent = t(titleKey, titleFallback);
  }
  state.librarySaveBusy = false;
  syncLibrarySubmitState();
  setLibraryModalOpen(true);
}

function normalizeLibraryPreset(id, raw) {
  const colors = Array.isArray(raw?.colors)
    ? raw.colors.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
    : [];
  if (colors.length < MIN_STOPS || colors.length > MAX_STOPS) return null;
  const roles = normalizeShareRoles(raw?.roles, colors.length) || autoAssignRoleMap(colors);
  const preview = PREVIEW_TABS.includes(raw?.preview) ? raw.preview : PREVIEW_TABS[0];
  let visionMode = "normal";
  const rawVision = String(raw?.visionMode || "").trim().toLowerCase();
  if (PREVIEW_VISION_MODES.includes(rawVision)) {
    visionMode = rawVision;
  } else {
    const shareSim = toInternalVisionMode(raw?.sim);
    visionMode = PREVIEW_VISION_MODES.includes(shareSim) ? shareSim : "normal";
  }
  return {
    id: String(id || raw?.id || `lib_${Date.now()}`),
    name: String(raw?.name || t("paletteTool.library.fallbackName", "Preset bảng phối")),
    tags: Array.isArray(raw?.tags) ? raw.tags.map((tag) => String(tag).trim()).filter(Boolean) : [],
    notes: String(raw?.notes || ""),
    colors,
    roles,
    preview,
    visionMode,
    createdAt: toIsoString(raw?.createdAt),
    updatedAt: toIsoString(raw?.updatedAt),
    scope: raw?.scope === "team" ? "team" : "personal",
    teamId: String(raw?.teamId || ""),
    teamRole: normalizeTeamRole(raw?.teamRole),
    locked: !!raw?.locked,
    status: normalizeApprovalStatus(raw?.status),
    publishedReleaseId: String(raw?.publishedReleaseId || "").trim()
  };
}

function canonicalizeJsonValue(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalizeJsonValue(item)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value).sort();
    const pairs = [];
    keys.forEach((key) => {
      const item = value[key];
      if (item === undefined) return;
      pairs.push(`${JSON.stringify(key)}:${canonicalizeJsonValue(item)}`);
    });
    return `{${pairs.join(",")}}`;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? JSON.stringify(value) : "null";
  }
  if (typeof value === "string") {
    return JSON.stringify(value.normalize("NFC"));
  }
  if (typeof value === "boolean" || value === null) {
    return JSON.stringify(value);
  }
  return "null";
}

function canonicalJSONStringify(value) {
  return canonicalizeJsonValue(value);
}

async function sha256Hex(text) {
  const source = String(text || "");
  if (!source) return "";
  if (typeof window !== "undefined" && window.crypto?.subtle && typeof TextEncoder !== "undefined") {
    try {
      const payload = new TextEncoder().encode(source);
      const digest = await window.crypto.subtle.digest("SHA-256", payload);
      return Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
    } catch (_err) {
      return "";
    }
  }
  return "";
}

function createTeamReleaseId() {
  return `rel_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeTeamReleaseSnapshot(raw, fallbackPreset = null) {
  const source = raw && typeof raw === "object" ? raw : {};
  const fallback = fallbackPreset && typeof fallbackPreset === "object" ? fallbackPreset : {};
  const colors = Array.isArray(source.colors)
    ? source.colors.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
    : Array.isArray(fallback.colors)
      ? fallback.colors.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
      : [];
  if (colors.length < MIN_STOPS || colors.length > MAX_STOPS) return null;
  const roles = normalizeShareRoles(source.roles, colors.length)
    || normalizeShareRoles(fallback.roles, colors.length)
    || autoAssignRoleMap(colors);
  const preview = PREVIEW_TABS.includes(source.preview)
    ? source.preview
    : PREVIEW_TABS.includes(fallback.preview)
      ? fallback.preview
      : PREVIEW_TABS[0];
  const sim = normalizeShareSim(source.sim || toShareSim(source.visionMode || fallback.visionMode));
  const visionMode = PREVIEW_VISION_MODES.includes(source.visionMode)
    ? source.visionMode
    : toInternalVisionMode(sim);
  return {
    colors,
    roles,
    name: String(source.name || fallback.name || ""),
    tags: Array.isArray(source.tags)
      ? source.tags.map((item) => String(item).trim()).filter(Boolean).slice(0, 20)
      : Array.isArray(fallback.tags)
        ? fallback.tags.map((item) => String(item).trim()).filter(Boolean).slice(0, 20)
        : [],
    notes: String(source.notes || fallback.notes || ""),
    preview,
    sim,
    visionMode,
    sourceWorld: HANDOFF_FROM,
    version: 1
  };
}

function getRoleHexFromReleaseSnapshot(snapshot, roleKey, fallback = "#000000") {
  const colors = Array.isArray(snapshot?.colors) ? snapshot.colors : [];
  const roles = snapshot?.roles && typeof snapshot.roles === "object" ? snapshot.roles : {};
  const index = Number(roles[roleKey]);
  if (Number.isInteger(index) && index >= 0 && index < colors.length) {
    const color = normalizeHex(colors[index]);
    if (color) return color.toUpperCase();
  }
  const fallbackColor = normalizeHex(colors[0]);
  if (fallbackColor) return fallbackColor.toUpperCase();
  return String(fallback || "#000000").toUpperCase();
}

function buildReleaseTokensCss(roleHex = {}) {
  return [
    ":root{",
    `  --sc-bg: ${roleHex.bg || "#000000"};`,
    `  --sc-surface: ${roleHex.surface || "#000000"};`,
    `  --sc-text: ${roleHex.text || "#000000"};`,
    `  --sc-muted: ${roleHex.muted || "#000000"};`,
    `  --sc-accent: ${roleHex.accent || "#000000"};`,
    "}"
  ].join("\n");
}

function buildReleaseTokenBundleFromData({
  teamId = "",
  releaseId = "",
  presetId = "",
  snapshot = null,
  signatureHash = "",
  policyHash = "",
  signedByUid = "",
  signedAtMs = 0
} = {}) {
  const normalizedSnapshot = normalizeTeamReleaseSnapshot(snapshot || null, null);
  if (!normalizedSnapshot) return null;
  const roleHex = {
    bg: getRoleHexFromReleaseSnapshot(normalizedSnapshot, "bg", "#0F172A"),
    surface: getRoleHexFromReleaseSnapshot(normalizedSnapshot, "surface", "#1F2937"),
    text: getRoleHexFromReleaseSnapshot(normalizedSnapshot, "text", "#F8FAFC"),
    muted: getRoleHexFromReleaseSnapshot(normalizedSnapshot, "muted", "#94A3B8"),
    accent: getRoleHexFromReleaseSnapshot(normalizedSnapshot, "accent", "#0EA5E9")
  };
  const metadata = {
    teamId: String(teamId || "").trim(),
    releaseId: String(releaseId || "").trim(),
    version: "1.0.0",
    signatureHash: String(signatureHash || "").trim().toLowerCase(),
    policyHash: String(policyHash || "").trim().toLowerCase()
  };
  const generatedAtMs = Date.now();
  const signedAtIso = Number.isFinite(Number(signedAtMs))
    ? new Date(Number(signedAtMs)).toISOString()
    : "";
  const tokensObject = {
    color: {
      background: { $value: roleHex.bg, $type: "color" },
      surface: { $value: roleHex.surface, $type: "color" },
      text: { $value: roleHex.text, $type: "color" },
      muted: { $value: roleHex.muted, $type: "color" },
      accent: { $value: roleHex.accent, $type: "color" }
    },
    $metadata: metadata
  };
  const tokensCss = buildReleaseTokensCss(roleHex);
  const tokensMetaObject = {
    ...metadata,
    presetId: String(presetId || "").trim(),
    sourceWorld: HANDOFF_FROM,
    signedByUid: String(signedByUid || "").trim(),
    signedAt: signedAtIso || "",
    signedAtMs: Number.isFinite(Number(signedAtMs)) ? Number(signedAtMs) : 0,
    generatedAt: new Date(generatedAtMs).toISOString(),
    generatedAtMs
  };
  return {
    formatVersion: "1.0.0",
    generatedAtMs,
    tokensJson: JSON.stringify(tokensObject, null, 2),
    tokensCss,
    tokensMetaJson: JSON.stringify(tokensMetaObject, null, 2)
  };
}

function normalizeReleaseTokenBundle(raw, fallback = null) {
  const source = raw && typeof raw === "object" ? raw : {};
  const tokensJson = String(source.tokensJson || "").trim();
  const tokensCss = String(source.tokensCss || "").trim();
  const tokensMetaJson = String(source.tokensMetaJson || "").trim();
  if (!tokensJson || !tokensCss || !tokensMetaJson) {
    return fallback && typeof fallback === "object" ? fallback : null;
  }
  return {
    formatVersion: String(source.formatVersion || "1.0.0"),
    tokensJson,
    tokensCss,
    tokensMetaJson,
    generatedAt: toIsoString(source.generatedAt),
    generatedAtMs: Number.isFinite(Number(source.generatedAtMs)) ? Number(source.generatedAtMs) : 0
  };
}

function normalizeTeamReleaseDoc(id, raw) {
  if (!raw || typeof raw !== "object") return null;
  const presetId = String(raw.presetId || "").trim();
  const releaseId = String(id || raw?.releaseMeta?.releaseId || "").trim();
  if (!presetId || !releaseId) return null;
  const snapshot = normalizeTeamReleaseSnapshot(raw.snapshot || null);
  if (!snapshot) return null;
  const releaseMeta = raw.releaseMeta && typeof raw.releaseMeta === "object" ? raw.releaseMeta : {};
  const version = Number(releaseMeta.version);
  const signatureHash = String(raw.signatureHash || "").trim().toLowerCase();
  const policyHash = String(raw.policyHash || "").trim().toLowerCase();
  const signedByUid = String(raw.signedByUid || "").trim();
  const signedAt = toIsoString(raw.signedAt);
  const releaseMetaObj = {
    version: Number.isInteger(version) && version > 0 ? version : 1,
    releaseId: String(releaseMeta.releaseId || releaseId),
    presetId: String(releaseMeta.presetId || presetId),
    teamId: String(releaseMeta.teamId || raw.teamId || "").trim(),
    signedByUid: String(releaseMeta.signedByUid || signedByUid || "").trim(),
    signedAtMs: Number.isFinite(Number(releaseMeta.signedAtMs)) ? Number(releaseMeta.signedAtMs) : 0,
    sourceWorld: String(releaseMeta.sourceWorld || raw.sourceWorld || HANDOFF_FROM)
  };
  const generatedBundle = buildReleaseTokenBundleFromData({
    teamId: releaseMetaObj.teamId,
    releaseId,
    presetId,
    snapshot,
    signatureHash,
    policyHash,
    signedByUid: releaseMetaObj.signedByUid || signedByUid,
    signedAtMs: releaseMetaObj.signedAtMs
  });
  const tokenBundle = normalizeReleaseTokenBundle(raw.tokenBundle || null, generatedBundle);
  return {
    id: releaseId,
    presetId,
    status: normalizeApprovalStatus(raw.status),
    snapshot,
    releaseMeta: releaseMetaObj,
    signatureHash,
    policyHash,
    signedByUid,
    signedAt,
    sourceWorld: String(raw.sourceWorld || HANDOFF_FROM),
    tokenBundle
  };
}

function getReleaseShortHash(hashValue) {
  const normalized = String(hashValue || "").trim();
  if (!normalized) return "--";
  if (normalized.length <= 20) return normalized;
  return `${normalized.slice(0, 12)}...${normalized.slice(-10)}`;
}

function getTeamPolicyPayload(teamId) {
  const normalizedTeamId = String(teamId || "").trim();
  if (normalizedTeamId && state.teamGuidelineByTeamId.has(normalizedTeamId)) {
    return normalizeTeamGuideline(state.teamGuidelineByTeamId.get(normalizedTeamId));
  }
  return normalizeTeamGuideline(TEAM_GUIDELINE_DEFAULT);
}

async function getNextTeamReleaseVersion(api, teamId, presetId) {
  if (!api || !teamId || !presetId) return 1;
  try {
    const colRef = api.collection(api.db, TEAM_COLLECTION, String(teamId), TEAM_RELEASE_COLLECTION);
    let snapshot = null;
    if (typeof api.query === "function" && typeof api.orderBy === "function" && typeof api.limit === "function") {
      const q = api.query(colRef, api.orderBy("signedAt", "desc"), api.limit(320));
      snapshot = await api.getDocs(q);
    } else {
      snapshot = await api.getDocs(colRef);
    }
    let maxVersion = 0;
    snapshot?.forEach?.((docSnap) => {
      const data = docSnap.data?.() || null;
      const normalized = normalizeTeamReleaseDoc(docSnap.id, data);
      if (!normalized || normalized.presetId !== String(presetId)) return;
      maxVersion = Math.max(maxVersion, Number(normalized.releaseMeta.version) || 0);
    });
    return maxVersion + 1;
  } catch (_err) {
    return 1;
  }
}

async function createTeamReleaseOnPublish(api, teamId, preset, userUid, options = {}) {
  const normalizedTeamId = String(teamId || "").trim();
  const normalizedPresetId = String(preset?.id || "").trim();
  if (!api || !normalizedTeamId || !normalizedPresetId || !userUid) {
    return { ok: false, error: "invalid_input" };
  }
  const snapshot = normalizeTeamReleaseSnapshot({
    colors: preset.colors,
    roles: preset.roles,
    name: preset.name,
    tags: preset.tags,
    notes: preset.notes,
    preview: preset.preview,
    visionMode: preset.visionMode
  }, preset);
  if (!snapshot) {
    return { ok: false, error: "invalid_snapshot" };
  }
  const policy = getTeamPolicyPayload(normalizedTeamId);
  const policyCanonical = canonicalJSONStringify(policy);
  const policyHash = await sha256Hex(policyCanonical);
  if (!policyHash) {
    return { ok: false, error: "policy_hash_failed" };
  }
  const releaseId = createTeamReleaseId();
  const releaseVersion = await getNextTeamReleaseVersion(api, normalizedTeamId, normalizedPresetId);
  const releaseMeta = {
    version: Math.max(1, Number(releaseVersion) || 1),
    releaseId,
    presetId: normalizedPresetId,
    teamId: normalizedTeamId,
    signedByUid: String(userUid),
    signedAtMs: Date.now(),
    sourceWorld: HANDOFF_FROM
  };
  const signaturePayload = canonicalJSONStringify({
    snapshot,
    releaseMeta,
    policyHash
  });
  const signatureHash = await sha256Hex(signaturePayload);
  if (!signatureHash) {
    return { ok: false, error: "signature_failed" };
  }
  const releaseRef = api.doc(api.db, TEAM_COLLECTION, normalizedTeamId, TEAM_RELEASE_COLLECTION, releaseId);
  const presetRef = api.doc(api.db, TEAM_COLLECTION, normalizedTeamId, LIBRARY_COLLECTION, normalizedPresetId);
  const tokenBundle = buildReleaseTokenBundleFromData({
    teamId: normalizedTeamId,
    releaseId,
    presetId: normalizedPresetId,
    snapshot,
    signatureHash,
    policyHash,
    signedByUid: String(userUid),
    signedAtMs: releaseMeta.signedAtMs
  });
  if (!tokenBundle) {
    return { ok: false, error: "token_bundle_failed" };
  }
  const releaseDoc = {
    presetId: normalizedPresetId,
    status: APPROVAL_STATUS_PUBLISHED,
    snapshot,
    releaseMeta,
    signatureHash,
    policyHash,
    tokenBundle: {
      formatVersion: tokenBundle.formatVersion,
      tokensJson: tokenBundle.tokensJson,
      tokensCss: tokenBundle.tokensCss,
      tokensMetaJson: tokenBundle.tokensMetaJson,
      generatedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString(),
      generatedAtMs: tokenBundle.generatedAtMs
    },
    signedByUid: String(userUid),
    signedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString(),
    sourceWorld: HANDOFF_FROM
  };
  const presetPatch = {
    status: APPROVAL_STATUS_PUBLISHED,
    publishedReleaseId: releaseId,
    updatedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString(),
    updatedByUid: String(userUid)
  };
  if (typeof api.runTransaction === "function") {
    try {
      await api.runTransaction(api.db, async (transaction) => {
        const currentSnap = await transaction.get(presetRef);
        const currentData = currentSnap?.data?.() || {};
        const currentStatus = normalizeApprovalStatus(currentData.status || options.currentStatus || APPROVAL_STATUS_DRAFT);
        if (!canPublishByStatus(currentStatus)) {
          throw new Error("publish_status_conflict");
        }
        transaction.set(releaseRef, releaseDoc, { merge: false });
        transaction.set(presetRef, presetPatch, { merge: true });
      });
    } catch (_err) {
      return { ok: false, error: "transaction_failed" };
    }
  } else {
    try {
      await api.setDoc(releaseRef, releaseDoc, { merge: false });
      await api.setDoc(presetRef, presetPatch, { merge: true });
    } catch (_err) {
      return { ok: false, error: "write_failed" };
    }
  }
  const normalizedRelease = normalizeTeamReleaseDoc(releaseId, {
    ...releaseDoc,
    signedAt: new Date().toISOString()
  });
  if (normalizedRelease) {
    state.releaseById.set(`${normalizedTeamId}:${releaseId}`, normalizedRelease);
  }
  return {
    ok: true,
    releaseId,
    signatureHash,
    policyHash,
    releaseVersion: releaseMeta.version,
    release: normalizedRelease,
    tokenBundle
  };
}

async function loadTeamReleaseById(teamId, releaseId, options = {}) {
  const normalizedTeamId = String(teamId || "").trim();
  const normalizedReleaseId = String(releaseId || "").trim();
  if (!normalizedTeamId || !normalizedReleaseId) return null;
  const cacheKey = `${normalizedTeamId}:${normalizedReleaseId}`;
  if (state.releaseById.has(cacheKey)) {
    return state.releaseById.get(cacheKey) || null;
  }
  const { api: providedApi = null } = options;
  const api = providedApi || await waitForFirebaseApi();
  if (!canUsePaletteLibraryApi(api)) return null;
  try {
    const ref = api.doc(api.db, TEAM_COLLECTION, normalizedTeamId, TEAM_RELEASE_COLLECTION, normalizedReleaseId);
    const snap = await api.getDoc(ref);
    if (!snap?.exists?.()) return null;
    const release = normalizeTeamReleaseDoc(snap.id, snap.data?.() || null);
    if (!release) return null;
    state.releaseById.set(cacheKey, release);
    return release;
  } catch (_err) {
    return null;
  }
}

function normalizeTeamApprovalEvent(id, raw) {
  if (!raw || typeof raw !== "object") return null;
  const paletteId = String(raw.paletteId || "").trim();
  if (!paletteId) return null;
  const action = String(raw.action || "").trim().toLowerCase();
  if (!action) return null;
  return {
    id: String(id || `approval_${Date.now()}`),
    paletteId,
    action,
    fromStatus: normalizeApprovalStatus(raw.fromStatus),
    toStatus: normalizeApprovalStatus(raw.toStatus),
    comment: String(raw.comment || "").trim(),
    actorUid: String(raw.actorUid || ""),
    actorRole: normalizeTeamRole(raw.actorRole || TEAM_ROLE_VIEWER),
    teamId: String(raw.teamId || ""),
    createdAt: toIsoString(raw.createdAt)
  };
}

function getApprovalActionLabel(action) {
  return t(`paletteTool.library.approval.actions.${String(action || "").trim().toLowerCase()}`, String(action || ""));
}

function createTeamApprovalId() {
  return `ap_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}

async function writeTeamApprovalEvent(api, teamId, payload = {}) {
  if (!api || !teamId || !payload?.paletteId) return false;
  const user = api.auth?.currentUser || null;
  if (!user?.uid) return false;
  const teamRole = normalizeTeamRole(
    state.teams.find((team) => team.id === String(teamId || "").trim())?.role || TEAM_ROLE_VIEWER
  );
  const eventId = createTeamApprovalId();
  const ref = api.doc(api.db, TEAM_COLLECTION, String(teamId), TEAM_APPROVAL_COLLECTION, eventId);
  try {
    await api.setDoc(ref, {
      paletteId: String(payload.paletteId || ""),
      action: String(payload.action || "").trim().toLowerCase(),
      fromStatus: normalizeApprovalStatus(payload.fromStatus),
      toStatus: normalizeApprovalStatus(payload.toStatus),
      comment: String(payload.comment || "").trim().slice(0, 500),
      actorUid: user.uid,
      actorRole: teamRole,
      teamId: String(teamId),
      createdAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString()
    }, { merge: false });
    return true;
  } catch (_err) {
    return false;
  }
}

async function loadTeamApprovalHistory(teamId, paletteId, options = {}) {
  const normalizedTeamId = String(teamId || "").trim();
  const normalizedPaletteId = String(paletteId || "").trim();
  if (!normalizedTeamId || !normalizedPaletteId) return [];
  const { api: providedApi = null } = options;
  const api = providedApi || await waitForFirebaseApi();
  if (!canUsePaletteLibraryApi(api)) return [];
  try {
    const colRef = api.collection(api.db, TEAM_COLLECTION, normalizedTeamId, TEAM_APPROVAL_COLLECTION);
    let snapshot = null;
    if (typeof api.query === "function" && typeof api.orderBy === "function" && typeof api.limit === "function") {
      const q = api.query(colRef, api.orderBy("createdAt", "desc"), api.limit(240));
      snapshot = await api.getDocs(q);
    } else {
      snapshot = await api.getDocs(colRef);
    }
    const list = [];
    snapshot?.forEach?.((docSnap) => {
      const event = normalizeTeamApprovalEvent(docSnap.id, docSnap.data?.() || null);
      if (!event || event.paletteId !== normalizedPaletteId) return;
      list.push(event);
    });
    list.sort((a, b) => Date.parse(b.createdAt || 0) - Date.parse(a.createdAt || 0));
    state.approvalHistoryByPresetId.set(`${normalizedTeamId}:${normalizedPaletteId}`, list);
    return list;
  } catch (_err) {
    return [];
  }
}

function canTransitionApprovalStatus(role, currentStatus, nextStatus) {
  const normalizedRole = normalizeTeamRole(role);
  const fromStatus = normalizeApprovalStatus(currentStatus);
  const toStatus = normalizeApprovalStatus(nextStatus);
  if (!APPROVAL_STATUS_VALUES.includes(toStatus)) return false;
  if (normalizedRole === TEAM_ROLE_OWNER) {
    if (toStatus === APPROVAL_STATUS_PUBLISHED) {
      return canPublishByStatus(fromStatus);
    }
    return true;
  }
  if (normalizedRole === TEAM_ROLE_EDITOR) {
    if (toStatus === APPROVAL_STATUS_IN_REVIEW) {
      return canSubmitApprovalByStatus(fromStatus);
    }
    if (toStatus === APPROVAL_STATUS_DRAFT) {
      return [
        APPROVAL_STATUS_CHANGES_REQUESTED,
        APPROVAL_STATUS_REJECTED,
        APPROVAL_STATUS_IN_REVIEW
      ].includes(fromStatus);
    }
    return false;
  }
  if (normalizedRole === TEAM_ROLE_APPROVER) {
    if (toStatus === APPROVAL_STATUS_APPROVED) return canApproveByStatus(fromStatus);
    if (toStatus === APPROVAL_STATUS_CHANGES_REQUESTED) return canRequestChangesByStatus(fromStatus);
    if (toStatus === APPROVAL_STATUS_REJECTED) return canRejectByStatus(fromStatus);
    if (toStatus === APPROVAL_STATUS_IN_REVIEW) {
      return [
        APPROVAL_STATUS_CHANGES_REQUESTED,
        APPROVAL_STATUS_REJECTED
      ].includes(fromStatus);
    }
    return false;
  }
  return false;
}

function resolveApprovalActionByStatus(targetStatus) {
  const status = normalizeApprovalStatus(targetStatus);
  if (status === APPROVAL_STATUS_IN_REVIEW) return "submit";
  if (status === APPROVAL_STATUS_APPROVED) return "approve";
  if (status === APPROVAL_STATUS_CHANGES_REQUESTED) return "changes_requested";
  if (status === APPROVAL_STATUS_REJECTED) return "reject";
  if (status === APPROVAL_STATUS_PUBLISHED) return "publish";
  return "update";
}

function getApprovalStatusToast(targetStatus) {
  const status = normalizeApprovalStatus(targetStatus);
  return t(`paletteTool.library.approval.toast.status.${status}`, getApprovalStatusLabel(status));
}

function setApprovalModalOpen(open) {
  const root = approvalModalEl.root;
  if (!root) return;
  root.setAttribute("aria-hidden", open ? "false" : "true");
  if (open) {
    approvalModalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    approvalModalOpen = true;
    return;
  }
  document.body.style.overflow = approvalModalBodyOverflow;
  approvalModalBodyOverflow = "";
  approvalModalOpen = false;
}

function closeApprovalHistoryModal() {
  approvalModalPreset = null;
  setApprovalModalOpen(false);
}

function renderApprovalHistoryModalContent(events = []) {
  if (!approvalModalEl.list || !approvalModalEl.state || !approvalModalEl.status || !approvalModalPreset) return;
  const preset = approvalModalPreset;
  approvalModalEl.status.textContent = t(
    "paletteTool.library.approval.modal.currentStatus",
    "Trạng thái hiện tại: {status}",
    { status: getApprovalStatusLabel(preset.status) }
  );
  approvalModalEl.list.innerHTML = "";
  if (!events.length) {
    approvalModalEl.state.textContent = t(
      "paletteTool.library.approval.modal.empty",
      "Chưa có lịch sử phê duyệt cho preset này."
    );
    return;
  }
  approvalModalEl.state.textContent = t(
    "paletteTool.library.approval.modal.count",
    "Có {count} bản ghi phê duyệt.",
    { count: String(events.length) }
  );
  events.forEach((item) => {
    const row = document.createElement("article");
    row.className = "tc-approval-modal__item";
    const title = document.createElement("p");
    title.className = "tc-approval-modal__item-title";
    const actionLabel = getApprovalActionLabel(item.action);
    title.textContent = t(
      "paletteTool.library.approval.modal.itemTitle",
      "{action} · {from} → {to}",
      {
        action: actionLabel,
        from: getApprovalStatusLabel(item.fromStatus),
        to: getApprovalStatusLabel(item.toStatus)
      }
    );
    const meta = document.createElement("p");
    meta.className = "tc-approval-modal__item-meta";
    const when = formatStampVi(item.createdAt);
    meta.textContent = t("paletteTool.library.approval.modal.itemMeta", "{time} · {uid}", {
      time: when || t("paletteTool.room.revisions.unknownTime", "Không rõ thời gian"),
      uid: item.actorUid || t("paletteTool.room.revisions.you", "Bạn")
    });
    row.appendChild(title);
    row.appendChild(meta);
    if (item.comment) {
      const comment = document.createElement("p");
      comment.className = "tc-approval-modal__item-comment";
      comment.textContent = item.comment;
      row.appendChild(comment);
    }
    approvalModalEl.list.appendChild(row);
  });
}

function ensureApprovalHistoryModal() {
  if (approvalModalEl.root) return approvalModalEl.root;
  const root = document.createElement("div");
  root.className = "tc-approval-modal";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <div class="tc-approval-modal__backdrop" data-approval-close></div>
    <section class="tc-approval-modal__dialog" role="dialog" aria-modal="true">
      <header class="tc-approval-modal__head">
        <h3 class="tc-approval-modal__title"></h3>
        <button type="button" class="tc-btn tc-chip px-3 py-2 text-xs" data-approval-close>${t("common.close", "Đóng")}</button>
      </header>
      <p class="tc-approval-modal__status"></p>
      <p class="tc-approval-modal__state"></p>
      <div class="tc-approval-modal__list"></div>
      <div class="tc-approval-modal__composer">
        <label class="tc-approval-modal__label" for="tcApprovalComment">${t("paletteTool.library.approval.modal.commentLabel", "Bình luận phê duyệt")}</label>
        <textarea id="tcApprovalComment" class="tc-input text-xs" rows="3" placeholder="${t("paletteTool.library.approval.modal.commentPlaceholder", "Nhập bình luận cho vòng phê duyệt...")}"></textarea>
        <div class="tc-approval-modal__actions">
          <button type="button" class="tc-btn tc-btn-primary px-3 py-2 text-xs" data-approval-submit>${t("paletteTool.library.approval.modal.addComment", "Gửi bình luận")}</button>
        </div>
      </div>
    </section>
  `;
  document.body.appendChild(root);
  approvalModalEl.root = root;
  approvalModalEl.title = root.querySelector(".tc-approval-modal__title");
  approvalModalEl.status = root.querySelector(".tc-approval-modal__status");
  approvalModalEl.state = root.querySelector(".tc-approval-modal__state");
  approvalModalEl.list = root.querySelector(".tc-approval-modal__list");
  approvalModalEl.input = root.querySelector("#tcApprovalComment");
  approvalModalEl.submit = root.querySelector("[data-approval-submit]");
  approvalModalEl.close = root.querySelector("[data-approval-close]");
  root.addEventListener("click", (event) => {
    if (event.target.closest("[data-approval-close]")) {
      closeApprovalHistoryModal();
    }
  });
  approvalModalEl.submit?.addEventListener("click", async () => {
    if (!approvalModalPreset) return;
    const activeTeam = getActiveTeam();
    if (!activeTeam?.id || !canCommentTeamApproval(activeTeam.role)) {
      showToast(t("paletteTool.library.approval.toast.readonly", "Bạn không có quyền ghi nhận xét phê duyệt."));
      return;
    }
    const comment = String(approvalModalEl.input?.value || "").trim();
    if (!comment) {
      showToast(t("paletteTool.library.approval.toast.commentRequired", "Hãy nhập bình luận trước khi gửi."));
      approvalModalEl.input?.focus();
      return;
    }
    const ok = await updateTeamPresetApprovalStatus(approvalModalPreset, approvalModalPreset.status, {
      action: "comment",
      comment,
      keepStatus: true
    });
    if (!ok) return;
    if (approvalModalEl.input) approvalModalEl.input.value = "";
    const history = await loadTeamApprovalHistory(activeTeam.id, approvalModalPreset.id);
    renderApprovalHistoryModalContent(history);
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && approvalModalOpen) {
      closeApprovalHistoryModal();
    }
  });
  return root;
}

async function openApprovalHistoryModal(preset) {
  if (!preset || preset.scope !== "team") return;
  const activeTeam = getActiveTeam();
  if (!activeTeam?.id) return;
  ensureApprovalHistoryModal();
  approvalModalPreset = { ...preset, status: normalizeApprovalStatus(preset.status) };
  if (approvalModalEl.title) {
    approvalModalEl.title.textContent = t(
      "paletteTool.library.approval.modal.title",
      "Lịch sử phê duyệt · {name}",
      { name: preset.name || preset.id }
    );
  }
  if (approvalModalEl.input) {
    approvalModalEl.input.disabled = !canCommentTeamApproval(activeTeam.role);
    approvalModalEl.input.placeholder = canCommentTeamApproval(activeTeam.role)
      ? t("paletteTool.library.approval.modal.commentPlaceholder", "Nhập bình luận cho vòng phê duyệt...")
      : t("paletteTool.library.approval.modal.readonlyComment", "Bạn đang ở chế độ chỉ xem.");
  }
  if (approvalModalEl.submit) {
    approvalModalEl.submit.disabled = !canCommentTeamApproval(activeTeam.role);
  }
  if (approvalModalEl.state) {
    approvalModalEl.state.textContent = t("paletteTool.library.approval.modal.loading", "Đang tải lịch sử phê duyệt...");
  }
  if (approvalModalEl.list) {
    approvalModalEl.list.innerHTML = "";
  }
  setApprovalModalOpen(true);
  const events = await loadTeamApprovalHistory(activeTeam.id, preset.id);
  renderApprovalHistoryModalContent(events);
}

function setReleaseSignatureModalOpen(open) {
  const root = releaseSignatureModalEl.root;
  if (!root) return;
  root.setAttribute("aria-hidden", open ? "false" : "true");
  if (open) {
    releaseSignatureModalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    releaseSignatureModalOpen = true;
    return;
  }
  document.body.style.overflow = releaseSignatureModalBodyOverflow;
  releaseSignatureModalBodyOverflow = "";
  releaseSignatureModalOpen = false;
}

function closeReleaseSignatureModal() {
  releaseSignatureModalPayload = null;
  setReleaseSignatureModalOpen(false);
}

function renderReleaseSignatureModalContent(releaseDoc, preset) {
  if (!releaseSignatureModalEl.root) return;
  const data = releaseDoc || null;
  if (!data) {
    releaseSignatureModalPayload = null;
    if (releaseSignatureModalEl.state) {
      releaseSignatureModalEl.state.textContent = t("paletteTool.library.release.modal.missing", "Chưa có dữ liệu chữ ký phát hành.");
    }
    if (releaseSignatureModalEl.releaseId) releaseSignatureModalEl.releaseId.textContent = "--";
    if (releaseSignatureModalEl.version) releaseSignatureModalEl.version.textContent = "--";
    if (releaseSignatureModalEl.signedBy) releaseSignatureModalEl.signedBy.textContent = "--";
    if (releaseSignatureModalEl.signedAt) releaseSignatureModalEl.signedAt.textContent = "--";
    if (releaseSignatureModalEl.signatureHash) releaseSignatureModalEl.signatureHash.textContent = "--";
    if (releaseSignatureModalEl.policyHash) releaseSignatureModalEl.policyHash.textContent = "--";
    return;
  }
  const signedAtText = formatStampVi(data.signedAt) || (data.releaseMeta?.signedAtMs ? formatStampVi(data.releaseMeta.signedAtMs) : "");
  const titleName = String(preset?.name || data.snapshot?.name || data.presetId || "");
  if (releaseSignatureModalEl.title) {
    releaseSignatureModalEl.title.textContent = t(
      "paletteTool.library.release.modal.title",
      "Chữ ký phát hành · {name}",
      { name: titleName }
    );
  }
  if (releaseSignatureModalEl.state) {
    releaseSignatureModalEl.state.textContent = t(
      "paletteTool.library.release.modal.status",
      "Bản phát hành đã ký đang có hiệu lực."
    );
  }
  if (releaseSignatureModalEl.releaseId) releaseSignatureModalEl.releaseId.textContent = data.id;
  if (releaseSignatureModalEl.version) releaseSignatureModalEl.version.textContent = String(data.releaseMeta?.version || 1);
  if (releaseSignatureModalEl.signedBy) releaseSignatureModalEl.signedBy.textContent = data.signedByUid || data.releaseMeta?.signedByUid || "--";
  if (releaseSignatureModalEl.signedAt) releaseSignatureModalEl.signedAt.textContent = signedAtText || "--";
  if (releaseSignatureModalEl.signatureHash) {
    releaseSignatureModalEl.signatureHash.textContent = `${getReleaseShortHash(data.signatureHash)} (${data.signatureHash || "--"})`;
  }
  if (releaseSignatureModalEl.policyHash) {
    releaseSignatureModalEl.policyHash.textContent = `${getReleaseShortHash(data.policyHash)} (${data.policyHash || "--"})`;
  }
  releaseSignatureModalPayload = {
    releaseDoc: data,
    preset: preset || null,
    tokenBundle: data.tokenBundle || null,
    signatureHash: data.signatureHash || "",
    policyHash: data.policyHash || ""
  };
}

function ensureReleaseSignatureModal() {
  if (releaseSignatureModalEl.root) return releaseSignatureModalEl.root;
  const root = document.createElement("div");
  root.className = "tc-release-modal";
  root.setAttribute("aria-hidden", "true");
  root.innerHTML = `
    <div class="tc-release-modal__backdrop" data-release-close></div>
    <section class="tc-release-modal__dialog" role="dialog" aria-modal="true">
      <header class="tc-release-modal__head">
        <h3 class="tc-release-modal__title"></h3>
        <button type="button" class="tc-btn tc-chip px-3 py-2 text-xs" data-release-close>${t("common.close", "Đóng")}</button>
      </header>
      <p class="tc-release-modal__state"></p>
      <dl class="tc-release-modal__grid">
        <div class="tc-release-modal__row">
          <dt>${t("paletteTool.library.release.modal.releaseId", "Mã phát hành")}</dt>
          <dd data-release-id>--</dd>
        </div>
        <div class="tc-release-modal__row">
          <dt>${t("paletteTool.library.release.modal.version", "Phiên bản")}</dt>
          <dd data-release-version>--</dd>
        </div>
        <div class="tc-release-modal__row">
          <dt>${t("paletteTool.library.release.modal.signedBy", "Ký bởi")}</dt>
          <dd data-release-signed-by>--</dd>
        </div>
        <div class="tc-release-modal__row">
          <dt>${t("paletteTool.library.release.modal.signedAt", "Thời điểm ký")}</dt>
          <dd data-release-signed-at>--</dd>
        </div>
        <div class="tc-release-modal__row">
          <dt>${t("paletteTool.library.release.modal.signatureHash", "Mã băm chữ ký")}</dt>
          <dd data-release-signature-hash>--</dd>
        </div>
        <div class="tc-release-modal__row">
          <dt>${t("paletteTool.library.release.modal.policyHash", "Mã băm chính sách")}</dt>
          <dd data-release-policy-hash>--</dd>
        </div>
      </dl>
      <div class="tc-release-modal__actions">
        <button type="button" class="tc-btn tc-btn-primary px-3 py-2 text-xs" data-release-download-bundle>${t("paletteTool.library.release.actions.downloadBundle", "Tải gói tokens")}</button>
        <button type="button" class="tc-btn tc-chip px-3 py-2 text-xs" data-release-copy-css>${t("paletteTool.library.release.actions.copyCssVars", "Sao chép CSS variables")}</button>
        <button type="button" class="tc-btn tc-chip px-3 py-2 text-xs" data-release-copy-signature>${t("paletteTool.library.release.actions.copySignature", "Sao chép mã băm chữ ký")}</button>
        <button type="button" class="tc-btn tc-chip px-3 py-2 text-xs" data-release-copy-policy>${t("paletteTool.library.release.actions.copyPolicyHash", "Sao chép mã băm chính sách")}</button>
      </div>
    </section>
  `;
  document.body.appendChild(root);
  releaseSignatureModalEl.root = root;
  releaseSignatureModalEl.title = root.querySelector(".tc-release-modal__title");
  releaseSignatureModalEl.state = root.querySelector(".tc-release-modal__state");
  releaseSignatureModalEl.releaseId = root.querySelector("[data-release-id]");
  releaseSignatureModalEl.version = root.querySelector("[data-release-version]");
  releaseSignatureModalEl.signedBy = root.querySelector("[data-release-signed-by]");
  releaseSignatureModalEl.signedAt = root.querySelector("[data-release-signed-at]");
  releaseSignatureModalEl.signatureHash = root.querySelector("[data-release-signature-hash]");
  releaseSignatureModalEl.policyHash = root.querySelector("[data-release-policy-hash]");
  releaseSignatureModalEl.downloadBundle = root.querySelector("[data-release-download-bundle]");
  releaseSignatureModalEl.copyCssVars = root.querySelector("[data-release-copy-css]");
  releaseSignatureModalEl.copySignature = root.querySelector("[data-release-copy-signature]");
  releaseSignatureModalEl.copyPolicy = root.querySelector("[data-release-copy-policy]");
  releaseSignatureModalEl.close = root.querySelector("[data-release-close]");
  root.addEventListener("click", (event) => {
    if (event.target.closest("[data-release-close]")) {
      closeReleaseSignatureModal();
    }
  });
  releaseSignatureModalEl.copySignature?.addEventListener("click", async () => {
    const hash = String(releaseSignatureModalPayload?.signatureHash || "").trim();
    if (!hash) return;
    const ok = await copyText(hash);
    showToast(ok
      ? t("paletteTool.library.release.toast.copySignatureOk", "Đã sao chép mã băm chữ ký.")
      : t("paletteTool.library.release.toast.copySignatureFail", "Không thể sao chép mã băm chữ ký."));
  });
  releaseSignatureModalEl.copyCssVars?.addEventListener("click", async () => {
    const cssText = String(releaseSignatureModalPayload?.tokenBundle?.tokensCss || "").trim();
    if (!cssText) {
      showToast(t("paletteTool.library.release.toast.bundleMissing", "Không tìm thấy gói tokens cho bản phát hành này."));
      return;
    }
    const ok = await copyText(cssText);
    showToast(ok
      ? t("paletteTool.library.release.toast.copyCssOk", "Đã sao chép CSS variables.")
      : t("paletteTool.library.release.toast.copyCssFail", "Không thể sao chép CSS variables."));
  });
  releaseSignatureModalEl.downloadBundle?.addEventListener("click", () => {
    const bundle = releaseSignatureModalPayload?.tokenBundle || null;
    const releaseDoc = releaseSignatureModalPayload?.releaseDoc || null;
    if (!bundle || !releaseDoc) {
      showToast(t("paletteTool.library.release.toast.bundleMissing", "Không tìm thấy gói tokens cho bản phát hành này."));
      return;
    }
    const baseName = `w3_${releaseDoc.id || "release"}_tokens`;
    const okJson = downloadTextFile(`${baseName}.tokens.json`, bundle.tokensJson, "application/json;charset=utf-8");
    const okCss = downloadTextFile(`${baseName}.tokens.css`, bundle.tokensCss, "text/css;charset=utf-8");
    const okMeta = downloadTextFile(`${baseName}.tokens.meta.json`, bundle.tokensMetaJson, "application/json;charset=utf-8");
    showToast(okJson && okCss && okMeta
      ? t("paletteTool.library.release.toast.downloadBundleOk", "Đã tải gói tokens.")
      : t("paletteTool.library.release.toast.downloadBundleFail", "Không thể tải gói tokens."));
  });
  releaseSignatureModalEl.copyPolicy?.addEventListener("click", async () => {
    const hash = String(releaseSignatureModalPayload?.policyHash || "").trim();
    if (!hash) return;
    const ok = await copyText(hash);
    showToast(ok
      ? t("paletteTool.library.release.toast.copyPolicyOk", "Đã sao chép mã băm chính sách.")
      : t("paletteTool.library.release.toast.copyPolicyFail", "Không thể sao chép mã băm chính sách."));
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && releaseSignatureModalOpen) {
      closeReleaseSignatureModal();
    }
  });
  return root;
}

async function openReleaseSignatureModal(preset) {
  if (!preset || preset.scope !== "team") return;
  const activeTeam = getActiveTeam();
  if (!activeTeam?.id || activeTeam.id !== preset.teamId) return;
  const releaseId = String(preset.publishedReleaseId || "").trim();
  if (!releaseId) {
    showToast(t("paletteTool.library.release.toast.missing", "Preset này chưa có bản phát hành."));
    return;
  }
  const api = await waitForFirebaseApi();
  if (!canUsePaletteLibraryApi(api)) {
    showToast(t("paletteTool.library.release.toast.loadFailed", "Không thể tải chữ ký phát hành."));
    return;
  }
  ensureReleaseSignatureModal();
  if (releaseSignatureModalEl.title) {
    releaseSignatureModalEl.title.textContent = t(
      "paletteTool.library.release.modal.title",
      "Chữ ký phát hành · {name}",
      { name: preset.name || preset.id }
    );
  }
  if (releaseSignatureModalEl.state) {
    releaseSignatureModalEl.state.textContent = t("paletteTool.library.release.modal.loading", "Đang tải chữ ký phát hành...");
  }
  setReleaseSignatureModalOpen(true);
  const releaseDoc = await loadTeamReleaseById(activeTeam.id, releaseId, { api });
  if (!releaseDoc) {
    renderReleaseSignatureModalContent(null, preset);
    showToast(t("paletteTool.library.release.toast.loadFailed", "Không thể tải chữ ký phát hành."));
    return;
  }
  renderReleaseSignatureModalContent(releaseDoc, preset);
}

async function updateTeamPresetApprovalStatus(preset, nextStatus, options = {}) {
  const activeTeam = getActiveTeam();
  if (!activeTeam || preset?.scope !== "team" || preset?.teamId !== activeTeam.id) return false;
  const api = await waitForFirebaseApi();
  if (!canUsePaletteLibraryApi(api)) return false;
  const user = api.auth?.currentUser || null;
  if (!user?.uid) {
    showToast(t("paletteTool.library.toast.loginToSave", "Cần đăng nhập để lưu vào Thư viện."));
    return false;
  }
  const currentStatus = normalizeApprovalStatus(preset.status);
  const targetStatus = normalizeApprovalStatus(nextStatus);
  const role = normalizeTeamRole(activeTeam.role);
  const action = String(options.action || resolveApprovalActionByStatus(targetStatus)).trim().toLowerCase();
  const keepStatus = options.keepStatus === true;
  const normalizedComment = String(options.comment || "").trim().slice(0, 500);
  if (!keepStatus && !canTransitionApprovalStatus(role, currentStatus, targetStatus)) {
    showToast(t("paletteTool.library.approval.toast.transitionDenied", "Bạn không có quyền thực hiện bước chuyển trạng thái này."));
    return false;
  }
  if (action === "comment" && !canCommentTeamApproval(role)) {
    showToast(t("paletteTool.library.approval.toast.readonly", "Bạn không có quyền ghi nhận xét phê duyệt."));
    return false;
  }
  if (action === "comment" && !normalizedComment) {
    showToast(t("paletteTool.library.approval.toast.commentRequired", "Hãy nhập bình luận trước khi gửi."));
    return false;
  }
  const ref = api.doc(api.db, TEAM_COLLECTION, activeTeam.id, LIBRARY_COLLECTION, preset.id);
  const finalStatus = keepStatus ? currentStatus : targetStatus;
  try {
    let publishResult = null;
    if (!keepStatus && action === "publish" && finalStatus === APPROVAL_STATUS_PUBLISHED) {
      publishResult = await createTeamReleaseOnPublish(api, activeTeam.id, preset, user.uid, {
        currentStatus
      });
      if (!publishResult?.ok) {
        showToast(t("paletteTool.library.release.toast.signFailed", "Không thể tạo chữ ký phát hành."));
        return false;
      }
    } else {
      await api.setDoc(ref, {
        status: finalStatus,
        updatedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString(),
        updatedByUid: user.uid
      }, { merge: true });
    }
    await writeTeamApprovalEvent(api, activeTeam.id, {
      paletteId: preset.id,
      action,
      fromStatus: currentStatus,
      toStatus: finalStatus,
      comment: normalizedComment
    });
    await writeTeamAuditEvent(api, activeTeam.id, `approval_${action}`, {
      paletteId: preset.id,
      statusFrom: currentStatus,
      statusTo: finalStatus,
      approvalAction: action,
      comment: normalizedComment
    });
    await loadLibraryPresets({ silent: true });
    const reloadedPreset = state.libraryPresets.find((item) => item.id === preset.id) || {
      ...preset,
      status: finalStatus,
      publishedReleaseId: publishResult?.releaseId || preset.publishedReleaseId || ""
    };
    approvalModalPreset = reloadedPreset;
    if (approvalModalOpen && approvalModalPreset?.id === preset.id) {
      const events = await loadTeamApprovalHistory(activeTeam.id, preset.id, { api });
      renderApprovalHistoryModalContent(events);
    }
    if (action === "comment") {
      showToast(t("paletteTool.library.approval.toast.commentSent", "Đã gửi bình luận phê duyệt."));
    } else {
      showToast(
        t("paletteTool.library.approval.toast.statusChanged", "Đã chuyển trạng thái sang {status}.", {
          status: getApprovalStatusToast(finalStatus)
        })
      );
      if (action === "publish" && publishResult?.releaseId) {
        showToast(t("paletteTool.library.release.toast.releaseCreated", "Đã tạo bản phát hành có chữ ký."));
      }
    }
    return true;
  } catch (_err) {
    showToast(t("paletteTool.library.approval.toast.updateFailed", "Không thể cập nhật trạng thái phê duyệt."));
    return false;
  }
}

function buildLibraryPreviewCard(preset) {
  const card = document.createElement("article");
  card.className = "tc-library-card";
  card.dataset.libraryPresetId = preset.id;
  const activeTeam = getActiveTeam();
  const activeRole = normalizeTeamRole(
    preset.scope === "team"
      ? (activeTeam?.role || preset.teamRole || TEAM_ROLE_VIEWER)
      : TEAM_ROLE_VIEWER
  );
  const approvalStatus = normalizeApprovalStatus(preset.status);

  const head = document.createElement("div");
  head.className = "tc-library-card__head";
  const title = document.createElement("p");
  title.className = "text-sm font-semibold";
  title.textContent = preset.name;
  head.appendChild(title);
  if (preset.scope === "team") {
    const badge = document.createElement("span");
    badge.className = `tc-approval-badge ${getApprovalStatusClass(approvalStatus)}`;
    badge.textContent = getApprovalStatusLabel(approvalStatus);
    head.appendChild(badge);
  }
  card.appendChild(head);

  const tagLine = document.createElement("p");
  tagLine.className = "tc-library-meta";
  tagLine.textContent = preset.tags.length ? preset.tags.join(" · ") : t("paletteTool.library.meta.noTag", "Không có tag");
  card.appendChild(tagLine);

  const stampLine = document.createElement("p");
  stampLine.className = "tc-library-meta";
  const stamp = formatStampVi(preset.updatedAt || preset.createdAt);
  let stampText = stamp
    ? t("paletteTool.library.meta.updated", "Cập nhật: {time}", { time: stamp })
    : t("paletteTool.library.meta.updatedUnknown", "Chưa có thời gian cập nhật.");
  if (preset.scope === "team") {
    const roleText = t(`paletteTool.library.team.roles.${activeRole}`, activeRole);
    const modeText = preset.locked
      ? t("paletteTool.library.team.locked", "Đang khoá")
      : t("paletteTool.library.team.unlocked", "Đang mở");
    stampText = `${stampText} · ${roleText} · ${modeText} · ${getApprovalStatusLabel(approvalStatus)}`;
  }
  stampLine.textContent = stampText;
  card.appendChild(stampLine);

  const swatches = document.createElement("div");
  swatches.className = "tc-library-swatches";
  preset.colors.slice(0, 5).forEach((hex) => {
    const node = document.createElement("span");
    node.className = "tc-library-swatch";
    node.style.background = hex;
    node.setAttribute("aria-label", hex);
    swatches.appendChild(node);
  });
  card.appendChild(swatches);

  const actions = document.createElement("div");
  actions.className = "flex flex-wrap gap-2";
  const applyBtn = document.createElement("button");
  applyBtn.type = "button";
  applyBtn.className = "tc-btn tc-btn-primary px-3 py-2 text-xs";
  applyBtn.textContent = t("paletteTool.library.apply", "Áp dụng");
  applyBtn.addEventListener("click", () => {
    applyLibraryPreset(preset, { openDetail: true });
  });
  const tokenBtn = document.createElement("button");
  tokenBtn.type = "button";
  tokenBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  tokenBtn.textContent = t("paletteTool.library.copyToken", "Sao chép token vai màu");
  tokenBtn.addEventListener("click", async () => {
    const payload = buildRoleTokenPayload(preset.colors, preset.roles);
    const ok = await copyText(payload);
    showToast(ok
      ? t("paletteTool.library.toast.tokenCopied", "Đã sao chép token vai màu.")
      : t("paletteTool.library.toast.tokenCopyFail", "Không thể sao chép token vai màu."));
  });
  actions.appendChild(applyBtn);
  actions.appendChild(tokenBtn);

  if (preset.scope === "team") {
    const historyBtn = document.createElement("button");
    historyBtn.type = "button";
    historyBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    historyBtn.textContent = t("paletteTool.library.approval.actions.history", "Lịch sử phê duyệt");
    historyBtn.addEventListener("click", async () => {
      await openApprovalHistoryModal(preset);
    });
    actions.appendChild(historyBtn);

    if (approvalStatus === APPROVAL_STATUS_PUBLISHED && preset.publishedReleaseId) {
      const signatureBtn = document.createElement("button");
      signatureBtn.type = "button";
      signatureBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
      signatureBtn.textContent = t("paletteTool.library.release.actions.viewSignature", "Xem chữ ký phát hành");
      signatureBtn.addEventListener("click", async () => {
        await openReleaseSignatureModal(preset);
      });
      actions.appendChild(signatureBtn);
    }

    if (activeRole === TEAM_ROLE_EDITOR && canSubmitApprovalByStatus(approvalStatus)) {
      const submitBtn = document.createElement("button");
      submitBtn.type = "button";
      submitBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
      submitBtn.textContent = t("paletteTool.library.approval.actions.submit", "Gửi phê duyệt");
      submitBtn.addEventListener("click", async () => {
        const comment = window.prompt(
          t("paletteTool.library.approval.prompt.submit", "Nhập ghi chú gửi phê duyệt (tuỳ chọn):"),
          ""
        );
        if (comment === null) return;
        await updateTeamPresetApprovalStatus(preset, APPROVAL_STATUS_IN_REVIEW, {
          action: "submit",
          comment
        });
      });
      actions.appendChild(submitBtn);
    }

    if (canApproveTeamRole(activeRole)) {
      if (canApproveByStatus(approvalStatus)) {
        const approveBtn = document.createElement("button");
        approveBtn.type = "button";
        approveBtn.className = "tc-btn tc-btn-primary px-3 py-2 text-xs";
        approveBtn.textContent = t("paletteTool.library.approval.actions.approve", "Duyệt");
        approveBtn.addEventListener("click", async () => {
          const comment = window.prompt(
            t("paletteTool.library.approval.prompt.approve", "Nhập ghi chú duyệt (tuỳ chọn):"),
            ""
          );
          if (comment === null) return;
          await updateTeamPresetApprovalStatus(preset, APPROVAL_STATUS_APPROVED, {
            action: "approve",
            comment
          });
        });
        actions.appendChild(approveBtn);
      }
      if (canRequestChangesByStatus(approvalStatus)) {
        const changeBtn = document.createElement("button");
        changeBtn.type = "button";
        changeBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
        changeBtn.textContent = t("paletteTool.library.approval.actions.requestChanges", "Yêu cầu chỉnh sửa");
        changeBtn.addEventListener("click", async () => {
          const comment = window.prompt(
            t("paletteTool.library.approval.prompt.requestChanges", "Nhập yêu cầu chỉnh sửa:"),
            ""
          );
          if (comment === null) return;
          await updateTeamPresetApprovalStatus(preset, APPROVAL_STATUS_CHANGES_REQUESTED, {
            action: "changes_requested",
            comment
          });
        });
        actions.appendChild(changeBtn);
      }
      if (canRejectByStatus(approvalStatus)) {
        const rejectBtn = document.createElement("button");
        rejectBtn.type = "button";
        rejectBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
        rejectBtn.textContent = t("paletteTool.library.approval.actions.reject", "Từ chối");
        rejectBtn.addEventListener("click", async () => {
          const comment = window.prompt(
            t("paletteTool.library.approval.prompt.reject", "Nhập lý do từ chối:"),
            ""
          );
          if (comment === null) return;
          await updateTeamPresetApprovalStatus(preset, APPROVAL_STATUS_REJECTED, {
            action: "reject",
            comment
          });
        });
        actions.appendChild(rejectBtn);
      }
    }

    if (activeRole === TEAM_ROLE_OWNER && canPublishByStatus(approvalStatus)) {
      const publishBtn = document.createElement("button");
      publishBtn.type = "button";
      publishBtn.className = "tc-btn tc-btn-primary px-3 py-2 text-xs";
      publishBtn.textContent = t("paletteTool.library.approval.actions.publish", "Phát hành");
      publishBtn.addEventListener("click", async () => {
        await updateTeamPresetApprovalStatus(preset, APPROVAL_STATUS_PUBLISHED, {
          action: "publish",
          comment: ""
        });
      });
      actions.appendChild(publishBtn);
    }
  }

  if (preset.scope === "team" && canWriteTeamRole(activeRole)) {
    const updateBtn = document.createElement("button");
    updateBtn.type = "button";
    updateBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    updateBtn.textContent = t("paletteTool.library.team.actions.update", "Cập nhật");
    updateBtn.addEventListener("click", () => {
      const active = getActivePalette();
      if (!active) {
        showToast(t("paletteTool.library.toast.missingPalette", "Hãy chọn một bảng phối màu."));
        return;
      }
      const stops = Array.isArray(active?.stops)
        ? active.stops.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
        : [];
      const roleMap = getRoleMapForPalette(active, stops, preset.roles);
      const preview = getCurrentPreviewForPalette(active, preset.preview || PREVIEW_TABS[0]);
      const visionMode = getCurrentVisionForPalette(active, preset.visionMode || "normal");
      openLibrarySaveModal({
        palette: {
          ...active,
          ten: preset.name,
          tags: preset.tags,
          notes: preset.notes
        },
        roleMap,
        preview,
        visionMode,
        mode: "update",
        sourceScope: "team",
        targetPresetId: preset.id
      });
    });
    const lockBtn = document.createElement("button");
    lockBtn.type = "button";
    lockBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    lockBtn.textContent = preset.locked
      ? t("paletteTool.library.team.actions.unlock", "Mở khoá")
      : t("paletteTool.library.team.actions.lock", "Khoá");
    lockBtn.addEventListener("click", async () => {
      await toggleTeamPresetLock(preset);
    });
    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    deleteBtn.textContent = t("paletteTool.library.team.actions.delete", "Xoá");
    deleteBtn.addEventListener("click", async () => {
      await deleteTeamPreset(preset);
    });
    actions.appendChild(updateBtn);
    actions.appendChild(lockBtn);
    actions.appendChild(deleteBtn);
  }
  card.appendChild(actions);

  return card;
}

function renderLibraryPresets() {
  if (!el.libraryGrid || !el.libraryState) return;
  el.libraryGrid.innerHTML = "";
  if (state.libraryLoading) {
    setLibraryStateText(t("paletteTool.library.loading", "Đang tải preset từ Thư viện..."));
    el.libraryState.classList.remove("hidden");
    return;
  }
  if (!state.libraryPresets.length) {
    const inTeam = state.libraryScope === "team";
    const emptyKey = state.libraryLoaded
      ? (inTeam ? "paletteTool.library.team.empty" : "paletteTool.library.empty")
      : "paletteTool.library.needLogin";
    const fallback = state.libraryLoaded
      ? (inTeam ? "Chưa có preset nào trong Thư viện Team." : "Chưa có preset nào trong Thư viện.")
      : "Đăng nhập để xem preset từ Thư viện.";
    setLibraryStateText(t(emptyKey, fallback));
    el.libraryState.classList.remove("hidden");
    return;
  }
  el.libraryState.classList.add("hidden");
  state.libraryPresets.forEach((preset) => {
    el.libraryGrid.appendChild(buildLibraryPreviewCard(preset));
  });
}

function applyLibraryPreset(preset, options = {}) {
  if (guardRoomReadonlyAction()) return null;
  const normalized = normalizeLibraryPreset(preset?.id, preset);
  if (!normalized) {
    showToast(t("paletteTool.library.toast.invalidPreset", "Preset trong Thư viện không hợp lệ."));
    return null;
  }
  const paletteId = `library_${normalized.id}`;
  const palette = {
    id: paletteId,
    ten: normalized.name,
    tags: normalized.tags.length ? normalized.tags : ["library"],
    notes: normalized.notes,
    stops: normalized.colors
  };
  state.palettes = state.palettes.filter((item) => item.id !== paletteId);
  state.palettes.unshift(palette);
  state.selectedPaletteId = paletteId;
  state.roleMapByPaletteId.set(paletteId, { ...normalized.roles });
  state.previewTabByPaletteId.set(paletteId, normalized.preview);
  state.previewVisionModeByPaletteId.set(paletteId, normalized.visionMode);
  renderPalettes();
  queueRoomSync();
  window.tcWorkbench?.setContext?.(normalized.colors, { worldKey: "palette", source: "library" });
  if (options.openDetail) {
    openPresetDetail(palette);
  }
  showToast(t("paletteTool.library.toast.loaded", "Đã áp dụng preset từ Thư viện."));
  return palette;
}

async function loadLibraryPresets(options = {}) {
  const { silent = false } = options;
  const api = await waitForFirebaseApi();
  if (!canUsePaletteLibraryApi(api)) {
    state.libraryPresets = [];
    state.libraryLoaded = false;
    state.libraryLoading = false;
    renderLibraryPresets();
    if (!silent) {
      showToast(t("paletteTool.library.toast.loginToLoad", "Cần đăng nhập để tải preset từ Thư viện."));
    }
    return { ok: false, reason: "api_unavailable" };
  }
  const user = api.auth?.currentUser || null;
  if (!user?.uid) {
    state.libraryPresets = [];
    state.libraryLoaded = false;
    state.libraryLoading = false;
    renderLibraryPresets();
    if (!silent) {
      showToast(t("paletteTool.library.toast.loginToLoad", "Cần đăng nhập để tải preset từ Thư viện."));
    }
    return { ok: false, reason: "no_auth" };
  }
  const scope = getLibrarySourceScope();
  const activeTeam = getActiveTeam();
  if (scope === "team" && (!activeTeam || !activeTeam.id)) {
    state.libraryPresets = [];
    state.libraryLoaded = true;
    state.libraryLoading = false;
    renderLibraryPresets();
    if (!silent) {
      showToast(t("paletteTool.library.toast.noTeam", "Bạn chưa thuộc team nào."));
    }
    return { ok: false, reason: "no_team" };
  }
  state.libraryLoading = true;
  renderLibraryPresets();
  try {
    const colRef = scope === "team"
      ? api.collection(api.db, TEAM_COLLECTION, activeTeam.id, LIBRARY_COLLECTION)
      : api.collection(api.db, "users", user.uid, LIBRARY_COLLECTION);
    let snapshot = null;
    if (typeof api.query === "function" && typeof api.orderBy === "function" && typeof api.limit === "function") {
      const q = api.query(colRef, api.orderBy("updatedAt", "desc"), api.limit(LIBRARY_FETCH_LIMIT));
      snapshot = await api.getDocs(q);
    } else {
      snapshot = await api.getDocs(colRef);
    }
    const presets = [];
    snapshot?.forEach?.((docSnap) => {
      const item = normalizeLibraryPreset(docSnap.id, {
        ...(docSnap.data?.() || {}),
        scope,
        teamId: scope === "team" ? activeTeam.id : "",
        teamRole: scope === "team" ? activeTeam.role : TEAM_ROLE_OWNER
      });
      if (item) presets.push(item);
    });
    presets.sort((a, b) => Date.parse(b.updatedAt || b.createdAt || 0) - Date.parse(a.updatedAt || a.createdAt || 0));
    state.libraryPresets = presets;
    state.libraryLoaded = true;
    state.libraryLoading = false;
    renderLibraryPresets();
    return { ok: true, count: presets.length };
  } catch (_err) {
    state.libraryLoading = false;
    state.libraryPresets = [];
    state.libraryLoaded = false;
    renderLibraryPresets();
    if (!silent) {
      showToast(t("paletteTool.library.toast.loadFailed", "Không thể tải preset từ Thư viện."));
    }
    return { ok: false, reason: "firestore_error" };
  }
}

async function deleteTeamPreset(preset) {
  const activeTeam = getActiveTeam();
  if (!activeTeam || preset?.scope !== "team" || preset?.teamId !== activeTeam.id) return false;
  if (!canWriteTeamRole(activeTeam.role)) {
    showToast(t("paletteTool.library.toast.viewerReadOnly", "Bạn chỉ có quyền xem trong team này."));
    return false;
  }
  const confirmed = window.confirm(t("paletteTool.library.team.confirmDelete", "Bạn có chắc muốn xoá preset team này?"));
  if (!confirmed) return false;
  const api = await waitForFirebaseApi();
  if (!canUsePaletteLibraryApi(api) || !canDeleteWithApi(api)) {
    showToast(t("paletteTool.library.toast.teamDeleteFailed", "Không thể xoá preset team."));
    return false;
  }
  const ref = api.doc(api.db, TEAM_COLLECTION, activeTeam.id, LIBRARY_COLLECTION, preset.id);
  try {
    await api.deleteDoc(ref);
    await writeTeamAuditEvent(api, activeTeam.id, "delete", { paletteId: preset.id });
    showToast(t("paletteTool.library.toast.teamDeleted", "Đã xoá preset team."));
    await loadLibraryPresets({ silent: true });
    return true;
  } catch (_err) {
    showToast(t("paletteTool.library.toast.teamDeleteFailed", "Không thể xoá preset team."));
    return false;
  }
}

async function toggleTeamPresetLock(preset) {
  const activeTeam = getActiveTeam();
  if (!activeTeam || preset?.scope !== "team" || preset?.teamId !== activeTeam.id) return false;
  if (!canWriteTeamRole(activeTeam.role)) {
    showToast(t("paletteTool.library.toast.viewerReadOnly", "Bạn chỉ có quyền xem trong team này."));
    return false;
  }
  const api = await waitForFirebaseApi();
  if (!canUsePaletteLibraryApi(api)) {
    showToast(t("paletteTool.library.toast.teamLockFailed", "Không thể cập nhật trạng thái khoá."));
    return false;
  }
  const user = api.auth?.currentUser || null;
  if (!user?.uid) {
    showToast(t("paletteTool.library.toast.loginToSave", "Cần đăng nhập để lưu vào Thư viện."));
    return false;
  }
  const nextLocked = !preset.locked;
  const ref = api.doc(api.db, TEAM_COLLECTION, activeTeam.id, LIBRARY_COLLECTION, preset.id);
  try {
    await api.setDoc(ref, {
      locked: nextLocked,
      lockedByUid: user.uid,
      lockedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString(),
      updatedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString(),
      updatedByUid: user.uid
    }, { merge: true });
    await writeTeamAuditEvent(api, activeTeam.id, "lock", { paletteId: preset.id, locked: nextLocked });
    showToast(nextLocked
      ? t("paletteTool.library.toast.teamLocked", "Đã khoá preset team.")
      : t("paletteTool.library.toast.teamUnlocked", "Đã mở khoá preset team."));
    await loadLibraryPresets({ silent: true });
    return true;
  } catch (_err) {
    showToast(t("paletteTool.library.toast.teamLockFailed", "Không thể cập nhật trạng thái khoá."));
    return false;
  }
}

async function saveLibraryPresetFromModal() {
  if (state.librarySaveBusy) return;
  const draft = state.librarySaveDraft;
  if (!draft?.palette) return;
  const name = String(el.libraryNameInput?.value || "").trim();
  if (!name) {
    showToast(t("paletteTool.library.toast.nameRequired", "Hãy nhập tên preset."));
    el.libraryNameInput?.focus();
    return;
  }
  const tags = parseTagsText(el.libraryTagsInput?.value || "");
  const notes = String(el.libraryNotesInput?.value || "").trim();
  const api = await waitForFirebaseApi();
  if (!canUsePaletteLibraryApi(api)) {
    showToast(t("paletteTool.library.toast.loginToSave", "Cần đăng nhập để lưu vào Thư viện."));
    return;
  }
  const user = api.auth?.currentUser || null;
  if (!user?.uid) {
    showToast(t("paletteTool.library.toast.loginToSave", "Cần đăng nhập để lưu vào Thư viện."));
    return;
  }

  const colors = draft.palette.stops.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase());
  if (colors.length < MIN_STOPS || colors.length > MAX_STOPS) {
    showToast(t("paletteTool.library.toast.invalidPreset", "Preset trong Thư viện không hợp lệ."));
    return;
  }
  const roles = normalizeShareRoles(draft.roleMap, colors.length) || autoAssignRoleMap(colors);
  const sourceScope = draft.sourceScope === "team" ? "team" : "personal";
  const activeTeam = getActiveTeam();

  state.librarySaveBusy = true;
  syncLibrarySubmitState();
  try {
    const commonPayload = {
      colors,
      roles,
      name,
      tags,
      notes,
      preview: PREVIEW_TABS.includes(draft.preview) ? draft.preview : PREVIEW_TABS[0],
      sim: toShareSim(draft.visionMode),
      visionMode: PREVIEW_VISION_MODES.includes(draft.visionMode) ? draft.visionMode : "normal",
      sourceWorld: HANDOFF_FROM,
      updatedAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString(),
      updatedByUid: user.uid,
      version: 1
    };
    if (sourceScope === "team") {
      if (!activeTeam?.id) {
        state.librarySaveBusy = false;
        syncLibrarySubmitState();
        showToast(t("paletteTool.library.toast.noTeam", "Bạn chưa thuộc team nào."));
        return;
      }
      if (!canWriteTeamRole(activeTeam.role)) {
        state.librarySaveBusy = false;
        syncLibrarySubmitState();
        showToast(t("paletteTool.library.toast.viewerReadOnly", "Bạn chỉ có quyền xem trong team này."));
        return;
      }
      const isUpdate = draft.mode === "update" && draft.targetPresetId;
      const paletteId = isUpdate ? String(draft.targetPresetId) : createLibraryPresetId();
      const teamRef = api.doc(api.db, TEAM_COLLECTION, activeTeam.id, LIBRARY_COLLECTION, paletteId);
      if (isUpdate) {
        const existingPreset = state.libraryPresets.find((item) => item.id === paletteId) || null;
        await api.setDoc(teamRef, {
          ...commonPayload,
          status: normalizeApprovalStatus(
            existingPreset?.status || APPROVAL_STATUS_DRAFT
          ),
          publishedReleaseId: String(existingPreset?.publishedReleaseId || "")
        }, { merge: true });
        await writeTeamAuditEvent(api, activeTeam.id, "update", { paletteId });
      } else {
        await api.setDoc(teamRef, {
          ...commonPayload,
          createdAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString(),
          createdByUid: user.uid,
          locked: false,
          status: APPROVAL_STATUS_DRAFT,
          publishedReleaseId: ""
        }, { merge: false });
        await writeTeamAuditEvent(api, activeTeam.id, "create", { paletteId });
      }
      closeLibrarySaveModal();
      showToast(isUpdate
        ? t("paletteTool.library.toast.teamUpdated", "Đã cập nhật preset team.")
        : t("paletteTool.library.toast.teamSaved", "Đã lưu preset vào Thư viện Team."));
      await loadLibraryPresets({ silent: true });
      return;
    }

    const paletteId = createLibraryPresetId();
    const ref = api.doc(api.db, "users", user.uid, LIBRARY_COLLECTION, paletteId);
    await api.setDoc(ref, {
      ...commonPayload,
      createdAt: typeof api.serverTimestamp === "function" ? api.serverTimestamp() : new Date().toISOString()
    }, { merge: false });

    const localAsset = buildPaletteAsset({
      ...draft.palette,
      ten: name,
      tags
    }, {
      name,
      tags,
      notes,
      roles,
      preview: commonPayload.preview,
      visionMode: commonPayload.visionMode,
      libraryId: paletteId
    });
    addAssetToLibrary(localAsset);

    closeLibrarySaveModal();
    showToast(t("paletteTool.library.toast.saved", "Đã lưu preset vào Thư viện."));
    await loadLibraryPresets({ silent: true });
  } catch (_err) {
    state.librarySaveBusy = false;
    syncLibrarySubmitState();
    const errKey = (draft?.sourceScope === "team")
      ? "paletteTool.library.toast.teamSaveFailed"
      : "paletteTool.library.toast.saveFailed";
    const fallback = (draft?.sourceScope === "team")
      ? "Không thể lưu preset vào Thư viện Team."
      : "Không thể lưu preset vào Thư viện.";
    showToast(t(errKey, fallback));
  }
}

function applyPaletteI18nLabels() {
  if (el.libraryTitle) el.libraryTitle.textContent = t("paletteTool.library.sectionTitle", "Từ Thư viện");
  if (el.libraryDesc) el.libraryDesc.textContent = t("paletteTool.library.sectionDesc", "Preset bảng phối đã lưu theo tài khoản.");
  if (el.libraryRefresh) el.libraryRefresh.textContent = t("paletteTool.library.refresh", "Tải lại");
  if (el.libraryOpenPage) el.libraryOpenPage.textContent = t("paletteTool.library.openPage", "Mở trang Thư viện");
  if (el.libraryModalTitle) el.libraryModalTitle.textContent = t("paletteTool.library.modal.title", "Lưu preset bảng phối");
  if (el.libraryModalClose) el.libraryModalClose.textContent = t("paletteTool.library.modal.close", "Đóng");
  if (el.libraryNameLabel) el.libraryNameLabel.textContent = t("paletteTool.library.modal.name", "Tên preset");
  if (el.libraryNameInput) {
    el.libraryNameInput.placeholder = t("paletteTool.library.modal.namePlaceholder", "Ví dụ: Bộ màu landing tháng 3");
  }
  if (el.libraryTagsLabel) el.libraryTagsLabel.textContent = t("paletteTool.library.modal.tags", "Nhãn");
  if (el.libraryTagsInput) {
    el.libraryTagsInput.placeholder = t("paletteTool.library.modal.tagsPlaceholder", "ui, thương hiệu, chiến dịch");
  }
  if (el.libraryNotesLabel) el.libraryNotesLabel.textContent = t("paletteTool.library.modal.notes", "Ghi chú (tuỳ chọn)");
  if (el.libraryNotesInput) {
    el.libraryNotesInput.placeholder = t("paletteTool.library.modal.notesPlaceholder", "Mục tiêu sử dụng, bối cảnh...");
  }
  if (el.libraryCancel) el.libraryCancel.textContent = t("paletteTool.library.modal.cancel", "Huỷ");
  if (el.librarySubmit) el.librarySubmit.textContent = t("paletteTool.library.modal.save", "Lưu preset");
  if (el.saveLibraryLabelBtn) el.saveLibraryLabelBtn.textContent = t("paletteTool.library.saveButton", "Lưu vào Thư viện");
  if (el.saveTeamLibraryLabelBtn) el.saveTeamLibraryLabelBtn.textContent = t("paletteTool.library.team.saveButton", "Lưu vào Thư viện Team");
  if (el.useLibraryLabelBtn) el.useLibraryLabelBtn.textContent = t("paletteTool.library.useButton", "Dùng từ Thư viện");
  if (el.scopePersonal) el.scopePersonal.textContent = t("paletteTool.library.team.scope.personal", "Cá nhân");
  if (el.scopeTeam) el.scopeTeam.textContent = t("paletteTool.library.team.scope.team", "Team");
  if (el.teamSelect && !state.teams.length) {
    el.teamSelect.innerHTML = `<option value="">${t("paletteTool.library.team.noTeamOption", "Chưa có team")}</option>`;
  }
  if (el.roomLabel) {
    el.roomLabel.textContent = t("paletteTool.room.barLabel", "Phòng chỉnh sửa");
  }
  if (el.roomRevisionTitle) {
    el.roomRevisionTitle.textContent = t("paletteTool.room.revisions.title", "Lịch sử phiên bản");
  }
  if (el.roomRevisionDesc) {
    el.roomRevisionDesc.textContent = t("paletteTool.room.revisions.desc", "Timeline các phiên bản để xem và khôi phục.");
  }
  if (el.roomRevisionCreate) {
    el.roomRevisionCreate.textContent = t("paletteTool.room.revisions.create", "Tạo mốc phiên bản");
  }
  if (el.roomCommentTitle) {
    el.roomCommentTitle.textContent = t("paletteTool.room.comments.title", "Bình luận theo vai màu");
  }
  if (el.roomCommentDesc) {
    el.roomCommentDesc.textContent = t("paletteTool.room.comments.desc", "Mỗi bình luận gắn vào một vai màu để trao đổi chính xác.");
  }
  if (el.roomCommentFilterLabel) {
    el.roomCommentFilterLabel.textContent = t("paletteTool.room.comments.filterLabel", "Lọc theo vai");
  }
  if (el.roomCommentSubmit) {
    el.roomCommentSubmit.textContent = t("paletteTool.room.comments.submit", "Gửi bình luận");
  }
  if (el.roomCommentReplyCancel) {
    el.roomCommentReplyCancel.textContent = t("paletteTool.room.comments.cancelReply", "Huỷ trả lời");
  }
  if (approvalModalEl.root) {
    const closeBtn = approvalModalEl.root.querySelector("[data-approval-close]");
    if (closeBtn) closeBtn.textContent = t("common.close", "Đóng");
    if (approvalModalEl.input) {
      approvalModalEl.input.placeholder = t("paletteTool.library.approval.modal.commentPlaceholder", "Nhập bình luận cho vòng phê duyệt...");
    }
    if (approvalModalEl.submit) {
      approvalModalEl.submit.textContent = t("paletteTool.library.approval.modal.addComment", "Gửi bình luận");
    }
    if (approvalModalPreset?.id) {
      approvalModalEl.title.textContent = t(
        "paletteTool.library.approval.modal.title",
        "Lịch sử phê duyệt · {name}",
        { name: approvalModalPreset.name || approvalModalPreset.id }
      );
    }
  }
  if (releaseSignatureModalEl.root) {
    const closeBtn = releaseSignatureModalEl.root.querySelector("[data-release-close]");
    if (closeBtn) closeBtn.textContent = t("common.close", "Đóng");
    const labelReleaseId = releaseSignatureModalEl.root.querySelector('[data-release-id]')?.closest(".tc-release-modal__row")?.querySelector("dt");
    if (labelReleaseId) labelReleaseId.textContent = t("paletteTool.library.release.modal.releaseId", "Mã phát hành");
    const labelVersion = releaseSignatureModalEl.root.querySelector('[data-release-version]')?.closest(".tc-release-modal__row")?.querySelector("dt");
    if (labelVersion) labelVersion.textContent = t("paletteTool.library.release.modal.version", "Phiên bản");
    const labelSignedBy = releaseSignatureModalEl.root.querySelector('[data-release-signed-by]')?.closest(".tc-release-modal__row")?.querySelector("dt");
    if (labelSignedBy) labelSignedBy.textContent = t("paletteTool.library.release.modal.signedBy", "Ký bởi");
    const labelSignedAt = releaseSignatureModalEl.root.querySelector('[data-release-signed-at]')?.closest(".tc-release-modal__row")?.querySelector("dt");
    if (labelSignedAt) labelSignedAt.textContent = t("paletteTool.library.release.modal.signedAt", "Thời điểm ký");
    const labelSig = releaseSignatureModalEl.root.querySelector('[data-release-signature-hash]')?.closest(".tc-release-modal__row")?.querySelector("dt");
    if (labelSig) labelSig.textContent = t("paletteTool.library.release.modal.signatureHash", "Mã băm chữ ký");
    const labelPolicy = releaseSignatureModalEl.root.querySelector('[data-release-policy-hash]')?.closest(".tc-release-modal__row")?.querySelector("dt");
    if (labelPolicy) labelPolicy.textContent = t("paletteTool.library.release.modal.policyHash", "Mã băm chính sách");
    if (releaseSignatureModalEl.copySignature) {
      releaseSignatureModalEl.copySignature.textContent = t("paletteTool.library.release.actions.copySignature", "Sao chép mã băm chữ ký");
    }
    if (releaseSignatureModalEl.copyCssVars) {
      releaseSignatureModalEl.copyCssVars.textContent = t("paletteTool.library.release.actions.copyCssVars", "Sao chép CSS variables");
    }
    if (releaseSignatureModalEl.downloadBundle) {
      releaseSignatureModalEl.downloadBundle.textContent = t("paletteTool.library.release.actions.downloadBundle", "Tải gói tokens");
    }
    if (releaseSignatureModalEl.copyPolicy) {
      releaseSignatureModalEl.copyPolicy.textContent = t("paletteTool.library.release.actions.copyPolicyHash", "Sao chép mã băm chính sách");
    }
    if (releaseSignatureModalPayload?.releaseDoc) {
      renderReleaseSignatureModalContent(
        releaseSignatureModalPayload.releaseDoc,
        releaseSignatureModalPayload.preset || null
      );
    }
  }
  renderRoomBanner();
  renderRoomRevisionPanel();
  renderRoomCommentPanel();
}

function initLibraryUiBindings() {
  loadLibraryScopePreference();
  applyPaletteI18nLabels();
  renderTeamScopeControls();
  if (el.libraryModal) {
    el.libraryModal.addEventListener("click", (event) => {
      if (event.target.closest("[data-library-modal-close]")) {
        closeLibrarySaveModal();
      }
    });
  }
  el.libraryModalClose?.addEventListener("click", closeLibrarySaveModal);
  el.libraryCancel?.addEventListener("click", closeLibrarySaveModal);
  el.libraryForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveLibraryPresetFromModal();
  });
  el.libraryRefresh?.addEventListener("click", () => {
    loadTeamsForCurrentUser({ silent: true }).then(() => loadLibraryPresets());
  });
  el.libraryOpenPage?.addEventListener("click", () => {
    const payload = composeHandoff({
      from: HANDOFF_FROM,
      intent: "use",
      projectId: getCurrentProject()
    });
    window.location.href = `./library.html${payload}`;
  });
  el.scopePersonal?.addEventListener("click", () => {
    setLibraryScope("personal", { refresh: true, silent: true });
  });
  el.scopeTeam?.addEventListener("click", () => {
    setLibraryScope("team", { refresh: true, silent: false });
  });
  el.teamSelect?.addEventListener("change", () => {
    const teamId = String(el.teamSelect?.value || "").trim();
    state.selectedTeamId = teamId;
    state.selectedTeamRole = normalizeTeamRole(state.teams.find((team) => team.id === teamId)?.role);
    saveLibraryScopePreference();
    renderTeamScopeControls();
    if (teamId) {
      loadTeamGuideline(teamId, { silent: true }).finally(() => {
        renderPalettes();
      });
    } else {
      renderPalettes();
    }
    if (state.libraryScope === "team") {
      loadLibraryPresets({ silent: true });
    }
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && el.libraryModal?.getAttribute("aria-hidden") === "false") {
      closeLibrarySaveModal();
    }
  });
  renderLibraryPresets();
}

function ensurePresetDetailOverlay() {
  if (el.presetDetail && el.presetDetailBody) return el.presetDetail;
  const overlay = document.getElementById("palettePresetDetail");
  const body = document.getElementById("palettePresetDetailBody");
  const scrollHint = document.getElementById("palettePresetDetailScrollHint");
  if (overlay && body) {
    el.presetDetail = overlay;
    el.presetDetailBody = body;
    el.presetDetailScrollHint = scrollHint;
    return overlay;
  }
  return null;
}

function syncPresetDetailScrollHint() {
  if (!el.presetDetailBody || !el.presetDetailScrollHint) return;
  const body = el.presetDetailBody;
  const hasOverflow = body.scrollHeight > body.clientHeight + 12;
  const nearBottom = body.scrollTop + body.clientHeight >= body.scrollHeight - 14;
  el.presetDetailScrollHint.hidden = !hasOverflow || nearBottom;
}

function openPresetDetail(palette) {
  if (!palette) return;
  const overlay = ensurePresetDetailOverlay();
  if (!overlay || !el.presetDetailBody) return;
  selectPalette(palette);
  el.presetDetailBody.innerHTML = "";
  const detail = renderPaletteCard(palette);
  detail.classList.add("tc-palette-detail-card");
  el.presetDetailBody.appendChild(detail);
  markPresenceIntent({
    activePaletteIndex: null,
    activeRoleKey: "",
    activePanel: "palette"
  });
  schedulePresenceBadgeRefresh();
  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
  presetDetailOpen = true;
  presetDetailBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  el.presetDetailBody.scrollTop = 0;
  window.setTimeout(syncPresetDetailScrollHint, 30);
}

function closePresetDetail() {
  if (!el.presetDetail) return;
  el.presetDetail.classList.add("hidden");
  el.presetDetail.setAttribute("aria-hidden", "true");
  if (el.presetDetailBody) el.presetDetailBody.innerHTML = "";
  document.body.style.overflow = presetDetailBodyOverflow;
  presetDetailBodyOverflow = "";
  presetDetailOpen = false;
  if (el.presetDetailScrollHint) {
    el.presetDetailScrollHint.hidden = false;
  }
}

function initPresetDetail() {
  const overlay = ensurePresetDetailOverlay();
  if (!overlay || overlay.dataset.ready === "1") return;
  overlay.dataset.ready = "1";
  overlay.addEventListener("click", (event) => {
    if (event.target.closest("[data-preset-close]")) {
      closePresetDetail();
    }
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && presetDetailOpen) {
      closePresetDetail();
    }
  });
  el.presetDetailBody?.addEventListener("scroll", () => {
    syncPresetDetailScrollHint();
  });
}

function renderPaletteMiniCard(palette) {
  const card = document.createElement("div");
  card.className = "tc-card tc-palette-mini p-3 flex flex-col gap-2";
  card.dataset.paletteId = palette.id || "";
  card.tabIndex = 0;
  card.setAttribute("role", "button");

  const title = document.createElement("p");
  title.className = "text-sm font-semibold";
  title.textContent = palette.ten || "Bảng phối màu";

  const swatchRow = document.createElement("div");
  swatchRow.className = "tc-palette-mini-swatches";
  (palette.stops || []).slice(0, 5).forEach((hex) => {
    const swatch = document.createElement("span");
    swatch.className = "tc-palette-mini-swatch";
    swatch.style.background = hex;
    swatch.setAttribute("aria-label", hex.toUpperCase());
    swatchRow.appendChild(swatch);
  });

  card.appendChild(title);
  card.appendChild(swatchRow);

  const openDetail = () => {
    openPresetDetail(palette);
  };
  card.addEventListener("click", openDetail);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDetail();
    }
  });

  return card;
}

function renderPaletteCard(palette) {
  const card = document.createElement("div");
  card.className = "tc-card p-4 flex flex-col gap-3";
  card.dataset.paletteId = palette.id || "";

  const rawStops = Array.isArray(palette.stops) ? palette.stops : [];
  const stops = rawStops
    .map((hex) => normalizeHex(hex))
    .filter(Boolean)
    .map((hex) => hex.toUpperCase());
  if (!stops.length) {
    stops.push("#F8FAFC", "#E2E8F0", "#0F172A", "#64748B", "#0EA5E9");
  }
  const { paletteId, roleMap: initialRoleMap, autoMap: initialAutoMap } = ensureRoleMap(palette, stops);
  let roleMap = { ...initialRoleMap };
  let autoRoleMap = { ...initialAutoMap };
  let refreshTimer = null;
  let activeMatrixTab = "checks";
  let previewSuggestionId = "";
  let latestGuidelineSuggestions = [];
  let guidelineDraftTeamId = getActiveGuidelineTeamId();
  let guidelineDraft = normalizeTeamGuideline(getEffectiveTeamGuideline());

  const header = document.createElement("div");
  header.className = "flex items-start justify-between gap-3";

  const meta = document.createElement("div");
  const title = document.createElement("p");
  title.className = "text-sm font-semibold";
  title.textContent = palette.ten || "Bảng phối màu";
  const tags = document.createElement("p");
  tags.className = "tc-muted text-xs mt-1";
  tags.textContent = (palette.tags || []).join(" · ");
  meta.appendChild(title);
  meta.appendChild(tags);

  const actions = document.createElement("div");
  actions.className = "flex flex-wrap gap-2";

  const exportBtn = document.createElement("button");
  exportBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  exportBtn.type = "button";
  exportBtn.textContent = "Xuất Bản thông số";
  exportBtn.addEventListener("click", async () => {
    selectPalette(palette);
    const ok = await copyText(exportText(palette));
    showToast(ok ? "Đã sao chép bảng phối." : "Không thể sao chép.");
  });

  const bridgeBtn = document.createElement("button");
  bridgeBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  bridgeBtn.type = "button";
  bridgeBtn.textContent = "Biến thành dải";
  bridgeBtn.addEventListener("click", () => {
    selectPalette(palette);
    const payload = (stops || []).join(",");
    window.location.href = `gradient.html#g=${encodeURIComponent(payload)}`;
  });

  actions.appendChild(exportBtn);
  actions.appendChild(bridgeBtn);

  const saveBtn = document.createElement("button");
  saveBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  saveBtn.type = "button";
  saveBtn.textContent = t("paletteTool.library.saveButton", "Lưu vào Thư viện");
  saveBtn.addEventListener("click", () => {
    selectPalette(palette);
    const sourceScope = getLibrarySourceScope();
    openLibrarySaveModal({
      palette,
      roleMap,
      preview: activePreviewTab,
      visionMode: activeVisionMode,
      sourceScope
    });
  });

  actions.appendChild(saveBtn);

  const printSpecBtn = document.createElement("button");
  printSpecBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  printSpecBtn.type = "button";
  printSpecBtn.textContent = "Tạo bản thông số in";
  printSpecBtn.addEventListener("click", () => {
    const printableStops = (stops || []).filter(Boolean);
    if (!printableStops.length) return;
    const hash = encodeURIComponent(printableStops.join(","));
    window.location.href = `printcolor.html#p=${hash}`;
  });

  actions.appendChild(printSpecBtn);

  header.appendChild(meta);
  header.appendChild(actions);

  const swatchRow = document.createElement("div");
  swatchRow.className = "tc-swatch-row";

  stops.forEach((hex, idx) => {
    const swatch = document.createElement("button");
    swatch.type = "button";
    swatch.className = "tc-swatch";
    swatch.style.background = hex;
    swatch.textContent = hex.toUpperCase();
    const markSwatchPresence = () => {
      markPresenceIntent({
        activePaletteIndex: idx,
        activeRoleKey: "",
        activePanel: "palette"
      });
    };
    swatch.addEventListener("focus", markSwatchPresence);
    swatch.addEventListener("click", async () => {
      markSwatchPresence();
      const ok = await copyText(hex.toUpperCase());
      showToast(ok ? `Đã sao chép ${hex.toUpperCase()}` : "Không thể sao chép.");
    });
    const swatchBadge = document.createElement("span");
    swatchBadge.className = "tc-presence-badge tc-presence-badge--swatch is-hidden";
    swatchBadge.setAttribute("data-presence-palette-index", String(idx));
    swatchBadge.setAttribute("aria-hidden", "true");
    swatch.appendChild(swatchBadge);
    swatchRow.appendChild(swatch);
  });

  const strip = document.createElement("div");
  strip.className = "tc-strip";
  strip.style.background = gradientCss(stops);

  const quickCopy = document.createElement("details");
  quickCopy.className = "tc-card p-3";
  const quickSummary = document.createElement("summary");
  quickSummary.className = "cursor-pointer text-xs font-semibold";
  quickSummary.textContent = "Sao chép nhanh";
  const quickBody = document.createElement("div");
  quickBody.className = "mt-2 flex flex-wrap gap-2";
  const hexListBtn = document.createElement("button");
  hexListBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  hexListBtn.type = "button";
  hexListBtn.textContent = "HEX list";
  hexListBtn.addEventListener("click", async () => {
    const ok = await copyText(stops.join(", "));
    showToast(ok ? "Đã sao chép danh sách HEX." : "Không thể sao chép.");
  });
  const cssBtn = document.createElement("button");
  cssBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  cssBtn.type = "button";
  cssBtn.textContent = "CSS variables";
  cssBtn.addEventListener("click", async () => {
    const ok = await copyText(tokensFor(stops));
    showToast(ok ? "Đã sao chép CSS variables." : "Không thể sao chép.");
  });
  const jsonBtn = document.createElement("button");
  jsonBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  jsonBtn.type = "button";
  jsonBtn.textContent = "JSON tokens";
  jsonBtn.addEventListener("click", async () => {
    const payload = JSON.stringify({ colors: stops }, null, 2);
    const ok = await copyText(payload);
    showToast(ok ? "Đã sao chép JSON tokens." : "Không thể sao chép.");
  });
  const linkBtn = document.createElement("button");
  linkBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  linkBtn.type = "button";
  linkBtn.textContent = t("paletteTool.shareState.copyLink", "Sao chép link chia sẻ");
  linkBtn.addEventListener("click", async () => {
    const link = buildShareLink(stops, {
      roles: roleMap,
      preview: activePreviewTab,
      sim: activeVisionMode
    });
    if (!link) {
      showToast(t("paletteTool.shareState.toast.copyFail", "Không thể sao chép link chia sẻ."));
      return;
    }
    const ok = await copyText(link);
    showToast(
      ok
        ? t("paletteTool.shareState.toast.copied", "Đã sao chép link!")
        : t("paletteTool.shareState.toast.copyFail", "Không thể sao chép link chia sẻ.")
    );
  });
  const shortLinkBtn = document.createElement("button");
  shortLinkBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  shortLinkBtn.type = "button";
  shortLinkBtn.textContent = t("paletteTool.shareState.copyShortLink", "Sao chép link rút gọn");
  shortLinkBtn.addEventListener("click", async () => {
    const shortResult = await buildShortShareLink(stops, {
      roles: roleMap,
      preview: activePreviewTab,
      sim: activeVisionMode
    });
    if (shortResult.status !== "ok" || !shortResult.url) {
      showToast(t("paletteTool.shareState.toast.shortCreateFail", "Không thể tạo link rút gọn."));
      return;
    }
    const ok = await copyText(shortResult.url);
    showToast(
      ok
        ? t("paletteTool.shareState.toast.shortCopied", "Đã sao chép link rút gọn!")
        : t("paletteTool.shareState.toast.copyFail", "Không thể sao chép link chia sẻ.")
    );
  });
  quickBody.appendChild(hexListBtn);
  quickBody.appendChild(cssBtn);
  quickBody.appendChild(jsonBtn);
  quickBody.appendChild(linkBtn);
  quickBody.appendChild(shortLinkBtn);
  quickCopy.appendChild(quickSummary);
  quickCopy.appendChild(quickBody);

  const semanticWrap = document.createElement("details");
  semanticWrap.className = "tc-card p-3 tc-role-wrap";
  semanticWrap.open = true;
  const semanticSummary = document.createElement("summary");
  semanticSummary.className = "cursor-pointer text-xs font-semibold";
  semanticSummary.textContent = t("paletteTool.roles.title", "Phân vai màu");
  const semanticBody = document.createElement("div");
  semanticBody.className = "mt-2 space-y-2";
  const semanticHint = document.createElement("p");
  semanticHint.className = "text-xs tc-muted";
  semanticHint.textContent = t(
    "paletteTool.roles.hint",
    "Gán vai màu theo nền/chữ/nhấn để kiểm tra workflow thực tế."
  );
  semanticBody.appendChild(semanticHint);
  const roleStatus = document.createElement("div");
  roleStatus.className = "tc-role-status";
  const roleStatusLine = document.createElement("p");
  roleStatusLine.className = "tc-role-status__line";
  const roleHotspotLine = document.createElement("p");
  roleHotspotLine.className = "tc-role-status__line tc-role-status__line--warn";
  roleHotspotLine.hidden = true;
  const roleChipList = document.createElement("div");
  roleChipList.className = "tc-role-chip-list";
  roleStatus.appendChild(roleStatusLine);
  roleStatus.appendChild(roleHotspotLine);
  roleStatus.appendChild(roleChipList);
  semanticBody.appendChild(roleStatus);
  const roleGrid = document.createElement("div");
  roleGrid.className = "tc-role-grid";
  semanticBody.appendChild(roleGrid);
  semanticWrap.appendChild(semanticSummary);
  semanticWrap.appendChild(semanticBody);

  const roleDefs = [
    { key: "bg", label: t("paletteTool.roles.items.bg", "Nền") },
    { key: "surface", label: t("paletteTool.roles.items.surface", "Nền phụ") },
    { key: "text", label: t("paletteTool.roles.items.text", "Chữ chính") },
    { key: "muted", label: t("paletteTool.roles.items.muted", "Chữ phụ") },
    { key: "accent", label: t("paletteTool.roles.items.accent", "Nhấn (CTA)") }
  ];
  const roleLabelMap = roleDefs.reduce((acc, role) => {
    acc[role.key] = role.label;
    return acc;
  }, {});
  const resolveRoleLabel = (roleKey) => roleLabelMap[roleKey] || roleKey || "";

  const buildSuggestionBadges = (suggestion, allSuggestions) => {
    const safeList = Array.isArray(allSuggestions) ? allSuggestions : [];
    if (!safeList.length || !suggestion) return [];
    const minChange = Math.min(...safeList.map((item) => Number(item?.changeScore || 0)));
    const maxFixed = Math.max(...safeList.map((item) => Number(item?.fixedCount || 0)));
    const badges = [];
    if (Number(suggestion.changeScore || 0) <= minChange) {
      badges.push({ label: "Ít thay đổi nhất", tone: "safe" });
    }
    if (Number(suggestion.fixedCount || 0) >= maxFixed) {
      badges.push({ label: "Dễ đạt chuẩn nhất", tone: "quick" });
    }
    if (suggestion.id === "text_lightness") {
      badges.push({ label: "Giữ nhận diện tốt", tone: "brand" });
    }
    if (Number(suggestion.changeScore || 0) >= minChange + 12) {
      badges.push({ label: "Táo bạo hơn", tone: "bold" });
    }
    if (!badges.length) {
      badges.push({ label: "Cân bằng", tone: "safe" });
    }
    return badges.slice(0, 3);
  };

  const describeSuggestionTradeoff = (suggestion) => {
    const roles = Array.isArray(suggestion?.changedRoles)
      ? suggestion.changedRoles.map((key) => resolveRoleLabel(key)).filter(Boolean)
      : [];
    const roleText = roles.length ? roles.join(", ") : "không thay vai";
    const changeScore = Number(suggestion?.changeScore || 0);
    const impact = changeScore <= 22
      ? "thấp"
      : (changeScore <= 42 ? "vừa" : "cao");
    return `Sửa vai: ${roleText} · Lợi ích: giảm ${suggestion?.fixedCount || 0} cặp lỗi · Đánh đổi: mức thay đổi ${impact}.`;
  };

  const contrastMatrix = document.createElement("details");
  contrastMatrix.className = "tc-card p-3 tc-contrast-wrap";
  contrastMatrix.open = true;
  const matrixSummary = document.createElement("summary");
  matrixSummary.className = "cursor-pointer text-xs font-semibold";
  matrixSummary.textContent = t("paletteTool.matrix.title", "Ma trận tương phản");
  const matrixBody = document.createElement("div");
  matrixBody.className = "mt-2 space-y-2";
  const matrixTabs = document.createElement("div");
  matrixTabs.className = "tc-preview-tabs";
  const matrixChecksBtn = document.createElement("button");
  matrixChecksBtn.type = "button";
  matrixChecksBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  matrixChecksBtn.textContent = t("paletteTool.matrix.tabs.checks", "Kiểm tra");
  const matrixSuggestBtn = document.createElement("button");
  matrixSuggestBtn.type = "button";
  matrixSuggestBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  matrixSuggestBtn.textContent = t("paletteTool.matrix.tabs.suggest", "Đề xuất");
  matrixTabs.appendChild(matrixChecksBtn);
  matrixTabs.appendChild(matrixSuggestBtn);
  const matrixHint = document.createElement("p");
  matrixHint.className = "text-xs tc-muted";
  matrixHint.textContent = t("paletteTool.matrix.hint", "Tỷ lệ tương phản càng cao càng dễ đọc; ưu tiên xử lý cặp fail thấp nhất trước.");
  matrixHint.title = t("paletteTool.matrix.tooltip", "Tỷ lệ tương phản càng cao càng dễ đọc; ưu tiên xử lý cặp fail thấp nhất trước.");
  const matrixGuideMeta = document.createElement("p");
  matrixGuideMeta.className = "text-xs tc-muted";
  const matrixBottleneck = document.createElement("p");
  matrixBottleneck.className = "text-xs tc-muted";
  const guidelineForm = document.createElement("div");
  guidelineForm.className = "tc-matrix-guideline";
  const guidelineTitle = document.createElement("p");
  guidelineTitle.className = "tc-matrix-guideline__title";
  guidelineTitle.textContent = t("paletteTool.matrix.guideline.title", "Hướng dẫn Team");
  const guidelineHint = document.createElement("p");
  guidelineHint.className = "tc-matrix-guideline__hint";
  const guidelineGrid = document.createElement("div");
  guidelineGrid.className = "tc-matrix-guideline__grid";

  const levelWrap = document.createElement("label");
  levelWrap.className = "tc-matrix-guideline__field";
  const levelLabel = document.createElement("span");
  levelLabel.className = "tc-matrix-guideline__label";
  levelLabel.textContent = t("paletteTool.matrix.guideline.fields.targetLevel", "Mức chuẩn");
  const levelSelect = document.createElement("select");
  levelSelect.className = "tc-input text-xs";
  ["AA", "AAA"].forEach((level) => {
    const option = document.createElement("option");
    option.value = level;
    option.textContent = level;
    levelSelect.appendChild(option);
  });
  levelWrap.appendChild(levelLabel);
  levelWrap.appendChild(levelSelect);

  const sizeWrap = document.createElement("label");
  sizeWrap.className = "tc-matrix-guideline__field";
  const sizeLabel = document.createElement("span");
  sizeLabel.className = "tc-matrix-guideline__label";
  sizeLabel.textContent = t("paletteTool.matrix.guideline.fields.textSize", "Cỡ chữ");
  const sizeSelect = document.createElement("select");
  sizeSelect.className = "tc-input text-xs";
  [
    { value: "normal", label: t("paletteTool.matrix.guideline.textSize.normal", "thường") },
    { value: "large", label: t("paletteTool.matrix.guideline.textSize.large", "lớn") }
  ].forEach((sizeOption) => {
    const option = document.createElement("option");
    option.value = sizeOption.value;
    option.textContent = sizeOption.label;
    sizeSelect.appendChild(option);
  });
  sizeWrap.appendChild(sizeLabel);
  sizeWrap.appendChild(sizeSelect);

  const stepWrap = document.createElement("label");
  stepWrap.className = "tc-matrix-guideline__field";
  const stepLabel = document.createElement("span");
  stepLabel.className = "tc-matrix-guideline__label";
  stepLabel.textContent = t("paletteTool.matrix.guideline.fields.maxAdjustSteps", "Số bước chỉnh tối đa");
  const stepInput = document.createElement("input");
  stepInput.type = "number";
  stepInput.min = "1";
  stepInput.max = "40";
  stepInput.step = "1";
  stepInput.className = "tc-input text-xs";
  stepWrap.appendChild(stepLabel);
  stepWrap.appendChild(stepInput);

  const hueWrap = document.createElement("label");
  hueWrap.className = "tc-matrix-guideline__field tc-matrix-guideline__field--inline";
  const hueToggle = document.createElement("input");
  hueToggle.type = "checkbox";
  const hueText = document.createElement("span");
  hueText.className = "tc-matrix-guideline__label";
  hueText.textContent = t("paletteTool.matrix.guideline.fields.preferKeepHue", "Giữ sắc độ (ưu tiên giữ hue)");
  hueWrap.appendChild(hueToggle);
  hueWrap.appendChild(hueText);

  guidelineGrid.appendChild(levelWrap);
  guidelineGrid.appendChild(sizeWrap);
  guidelineGrid.appendChild(stepWrap);
  guidelineGrid.appendChild(hueWrap);

  const lockedWrap = document.createElement("div");
  lockedWrap.className = "tc-matrix-guideline__locked";
  const lockedTitle = document.createElement("p");
  lockedTitle.className = "tc-matrix-guideline__label";
  lockedTitle.textContent = t("paletteTool.matrix.guideline.fields.lockedRoles", "Khóa vai");
  const lockedList = document.createElement("div");
  lockedList.className = "tc-matrix-guideline__chips";
  const lockedRoleInputs = new Map();
  roleDefs.forEach((role) => {
    const chip = document.createElement("label");
    chip.className = "tc-matrix-guideline__chip";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = role.key;
    const text = document.createElement("span");
    text.textContent = role.label;
    chip.appendChild(input);
    chip.appendChild(text);
    lockedList.appendChild(chip);
    lockedRoleInputs.set(role.key, input);
  });
  lockedWrap.appendChild(lockedTitle);
  lockedWrap.appendChild(lockedList);

  const guidelineActions = document.createElement("div");
  guidelineActions.className = "tc-matrix-guideline__actions";
  const guidelineResetBtn = document.createElement("button");
  guidelineResetBtn.type = "button";
  guidelineResetBtn.className = "tc-btn tc-chip px-2 py-1 text-[11px]";
  guidelineResetBtn.textContent = t("paletteTool.matrix.guideline.actions.resetDraft", "Đặt lại mặc định");
  const guidelineSaveBtn = document.createElement("button");
  guidelineSaveBtn.type = "button";
  guidelineSaveBtn.className = "tc-btn tc-btn-primary px-2 py-1 text-[11px]";
  guidelineSaveBtn.textContent = t("paletteTool.matrix.guideline.actions.save", "Lưu Hướng dẫn Team");
  guidelineActions.appendChild(guidelineResetBtn);
  guidelineActions.appendChild(guidelineSaveBtn);

  const guidelineState = document.createElement("p");
  guidelineState.className = "tc-matrix-guideline__state";

  guidelineForm.appendChild(guidelineTitle);
  guidelineForm.appendChild(guidelineHint);
  guidelineForm.appendChild(guidelineGrid);
  guidelineForm.appendChild(lockedWrap);
  guidelineForm.appendChild(guidelineActions);
  guidelineForm.appendChild(guidelineState);

  const matrixList = document.createElement("div");
  matrixList.className = "tc-contrast-list";
  const matrixSuggestList = document.createElement("div");
  matrixSuggestList.className = "tc-contrast-list hidden";
  const matrixSuggestState = document.createElement("p");
  matrixSuggestState.className = "text-xs tc-muted";
  matrixSuggestState.textContent = "";
  matrixBody.appendChild(matrixTabs);
  matrixBody.appendChild(matrixHint);
  matrixBody.appendChild(matrixGuideMeta);
  matrixBody.appendChild(matrixBottleneck);
  matrixBody.appendChild(guidelineForm);
  matrixBody.appendChild(matrixList);
  matrixBody.appendChild(matrixSuggestState);
  matrixBody.appendChild(matrixSuggestList);
  contrastMatrix.appendChild(matrixSummary);
  contrastMatrix.appendChild(matrixBody);

  const previewWrap = document.createElement("details");
  previewWrap.className = "tc-card p-3 tc-context-wrap";
  previewWrap.open = true;
  const previewSummary = document.createElement("summary");
  previewSummary.className = "cursor-pointer text-xs font-semibold";
  previewSummary.textContent = t("paletteTool.preview.title", "Xem thử theo bối cảnh");
  const previewBody = document.createElement("div");
  previewBody.className = "mt-2 space-y-2";
  const visionRow = document.createElement("div");
  visionRow.className = "tc-preview-vision";
  const visionLabel = document.createElement("label");
  visionLabel.className = "text-xs font-semibold";
  visionLabel.textContent = t("paletteTool.preview.cvd.label", "Mô phỏng mù màu");
  const visionSelect = document.createElement("select");
  visionSelect.className = "tc-input text-xs";
  visionSelect.setAttribute("aria-label", t("paletteTool.preview.cvd.label", "Mô phỏng mù màu"));
  const tabBar = document.createElement("div");
  tabBar.className = "tc-preview-tabs";
  const previewStage = document.createElement("div");
  previewStage.className = "tc-preview-stage";
  const tokenCopyBtn = document.createElement("button");
  tokenCopyBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  tokenCopyBtn.type = "button";
  tokenCopyBtn.textContent = t("paletteTool.token.copy", "Sao chép token vai màu");
  visionRow.appendChild(visionLabel);
  visionRow.appendChild(visionSelect);
  previewBody.appendChild(visionRow);
  previewBody.appendChild(tabBar);
  previewBody.appendChild(previewStage);
  previewBody.appendChild(tokenCopyBtn);
  previewWrap.appendChild(previewSummary);
  previewWrap.appendChild(previewBody);

  const workflowWrap = document.createElement("section");
  workflowWrap.className = "tc-workflow-next";
  const workflowTitle = document.createElement("p");
  workflowTitle.className = "tc-workflow-next__title";
  workflowTitle.textContent = "Bước tiếp theo sau khi tối ưu";
  const workflowState = document.createElement("p");
  workflowState.className = "tc-workflow-next__state";
  const workflowActions = document.createElement("div");
  workflowActions.className = "tc-workflow-next__actions";
  const workflowUseBtn = document.createElement("button");
  workflowUseBtn.type = "button";
  workflowUseBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
  workflowUseBtn.textContent = "Đặt làm bảng phối đang dùng";
  workflowUseBtn.addEventListener("click", () => {
    selectPalette(palette);
    showToast("Đã đặt làm bảng phối đang dùng.");
  });
  const workflowApplyPreviewBtn = document.createElement("button");
  workflowApplyPreviewBtn.type = "button";
  workflowApplyPreviewBtn.className = "tc-btn tc-btn-primary px-3 py-2 text-xs";
  workflowApplyPreviewBtn.textContent = "Áp dụng phương án đang xem";
  workflowApplyPreviewBtn.hidden = true;
  const workflowToThread = document.createElement("a");
  workflowToThread.className = "tc-btn tc-chip px-3 py-2 text-xs";
  workflowToThread.textContent = "Gửi sang World 1";
  const workflowToGradient = document.createElement("a");
  workflowToGradient.className = "tc-btn tc-chip px-3 py-2 text-xs";
  workflowToGradient.textContent = "Gửi sang World 2";
  const workflowToCommunity = document.createElement("a");
  workflowToCommunity.className = "tc-btn tc-chip px-3 py-2 text-xs";
  workflowToCommunity.textContent = "Đẩy sang Cộng đồng";
  workflowActions.appendChild(workflowUseBtn);
  workflowActions.appendChild(workflowApplyPreviewBtn);
  workflowActions.appendChild(workflowToThread);
  workflowActions.appendChild(workflowToGradient);
  workflowActions.appendChild(workflowToCommunity);
  workflowWrap.appendChild(workflowTitle);
  workflowWrap.appendChild(workflowState);
  workflowWrap.appendChild(workflowActions);

  const roleRows = new Map();

  const applyRoleIndex = (roleKey, nextIndex) => {
    if (guardRoomReadonlyAction()) return;
    previewSuggestionId = "";
    roleMap[roleKey] = normalizeRoleIndex(nextIndex, stops.length, autoRoleMap[roleKey]);
    state.roleMapByPaletteId.set(paletteId, { ...roleMap });
    markPresenceIntent({
      activePaletteIndex: null,
      activeRoleKey: roleKey,
      activePanel: "roles"
    });
    queueRoomSync();
  };

  const scheduleRefresh = () => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      refreshTimer = null;
      renderSemanticSections();
    }, 100);
  };

  roleDefs.forEach((role) => {
    const row = document.createElement("div");
    row.className = "tc-role-row";
    const swatch = document.createElement("span");
    swatch.className = "tc-role-swatch";
    const label = document.createElement("span");
    label.className = "tc-role-label";
    const labelText = document.createElement("span");
    labelText.textContent = role.label;
    const roleBadge = document.createElement("span");
    roleBadge.className = "tc-presence-badge tc-presence-badge--role is-hidden";
    roleBadge.setAttribute("data-presence-role-key", role.key);
    roleBadge.setAttribute("aria-hidden", "true");
    label.appendChild(labelText);
    label.appendChild(roleBadge);
    const select = document.createElement("select");
    select.className = "tc-input text-xs";
    stops.forEach((hex, idx) => {
      const option = document.createElement("option");
      option.value = String(idx);
      option.textContent = t("paletteTool.roles.option", "Màu {index} · {hex}", {
        index: String(idx + 1),
        hex
      });
      select.appendChild(option);
    });
    select.addEventListener("focus", () => {
      markPresenceIntent({
        activePaletteIndex: null,
        activeRoleKey: role.key,
        activePanel: "roles"
      });
    });
    select.addEventListener("change", () => {
      applyRoleIndex(role.key, Number(select.value));
      scheduleRefresh();
    });
    const resetBtn = document.createElement("button");
    resetBtn.className = "tc-btn tc-chip px-2 py-1 text-[11px]";
    resetBtn.type = "button";
    resetBtn.textContent = t("paletteTool.roles.reset", "Đặt lại");
    resetBtn.addEventListener("click", () => {
      autoRoleMap = autoAssignRoleMap(stops);
      applyRoleIndex(role.key, autoRoleMap[role.key]);
      scheduleRefresh();
    });
    const commentBtn = document.createElement("button");
    commentBtn.className = "tc-btn tc-chip px-2 py-1 text-[11px] tc-role-comment-btn";
    commentBtn.type = "button";
    const commentIcon = document.createElement("span");
    commentIcon.className = "tc-role-comment-btn__icon";
    commentIcon.setAttribute("aria-hidden", "true");
    commentIcon.innerHTML = "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><path d='M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z'></path></svg>";
    const commentText = document.createElement("span");
    commentText.className = "tc-role-comment-btn__text";
    commentText.textContent = t("paletteTool.room.comments.openForRole", "Bình luận");
    const commentBadge = document.createElement("span");
    commentBadge.className = "tc-role-comment-btn__badge is-hidden";
    commentBadge.setAttribute("data-comment-role-badge", role.key);
    commentBadge.setAttribute("aria-hidden", "true");
    commentBtn.appendChild(commentIcon);
    commentBtn.appendChild(commentText);
    commentBtn.appendChild(commentBadge);
    commentBtn.addEventListener("click", () => {
      openRoomCommentPanel(role.key);
    });
    const controls = document.createElement("div");
    controls.className = "tc-role-controls";
    controls.appendChild(select);
    controls.appendChild(resetBtn);
    controls.appendChild(commentBtn);
    row.appendChild(swatch);
    row.appendChild(label);
    row.appendChild(controls);
    roleGrid.appendChild(row);
    roleRows.set(role.key, { swatch, select, commentBtn, commentBadge });
  });

  const previewButtons = new Map();
  const savedTab = state.previewTabByPaletteId.get(paletteId);
  let activePreviewTab = PREVIEW_TABS.includes(savedTab) ? savedTab : PREVIEW_TABS[0];
  state.previewTabByPaletteId.set(paletteId, activePreviewTab);
  const savedVisionMode = state.previewVisionModeByPaletteId.get(paletteId);
  let activeVisionMode = PREVIEW_VISION_MODES.includes(savedVisionMode) ? savedVisionMode : "normal";
  state.previewVisionModeByPaletteId.set(paletteId, activeVisionMode);

  PREVIEW_TABS.forEach((tabKey) => {
    const tabBtn = document.createElement("button");
    tabBtn.type = "button";
    tabBtn.className = "tc-btn tc-chip px-3 py-2 text-xs";
    tabBtn.textContent = t(`paletteTool.preview.tabs.${tabKey}`, tabKey);
    tabBtn.addEventListener("click", () => {
      if (guardRoomReadonlyAction()) return;
      activePreviewTab = tabKey;
      state.previewTabByPaletteId.set(paletteId, tabKey);
      markPresenceIntent({
        activePaletteIndex: null,
        activeRoleKey: "",
        activePanel: "preview"
      });
      queueRoomSync();
      renderSemanticSections();
    });
    previewButtons.set(tabKey, tabBtn);
    tabBar.appendChild(tabBtn);
  });

  PREVIEW_VISION_MODES.forEach((modeKey) => {
    const option = document.createElement("option");
    option.value = modeKey;
    option.textContent = t(`paletteTool.preview.cvd.modes.${modeKey}`, modeKey);
    visionSelect.appendChild(option);
  });
  visionSelect.addEventListener("change", () => {
    if (guardRoomReadonlyAction()) return;
    const nextMode = String(visionSelect.value || "normal");
    activeVisionMode = PREVIEW_VISION_MODES.includes(nextMode) ? nextMode : "normal";
    state.previewVisionModeByPaletteId.set(paletteId, activeVisionMode);
    markPresenceIntent({
      activePaletteIndex: null,
      activeRoleKey: "",
      activePanel: "preview"
    });
    queueRoomSync();
    renderSemanticSections();
  });

  const syncGuidelineControlsFromDraft = () => {
    const normalized = normalizeTeamGuideline(guidelineDraft);
    levelSelect.value = normalized.targetLevel;
    sizeSelect.value = normalized.textSize;
    stepInput.value = String(normalized.maxAdjustSteps);
    hueToggle.checked = normalized.preferKeepHue !== false;
    lockedRoleInputs.forEach((input, roleKey) => {
      input.checked = normalized.lockedRoles.includes(roleKey);
    });
  };

  const readGuidelineDraftFromControls = () => normalizeTeamGuideline({
    targetLevel: levelSelect.value,
    textSize: sizeSelect.value,
    maxAdjustSteps: stepInput.value,
    preferKeepHue: !!hueToggle.checked,
    lockedRoles: Array.from(lockedRoleInputs.entries())
      .filter((entry) => !!entry?.[1]?.checked)
      .map((entry) => entry?.[0])
  });

  const getGuidelineEditorContext = () => {
    const activeTeam = getActiveTeam();
    const teamId = activeTeam?.id || "";
    const teamRole = normalizeTeamRole(activeTeam?.role || TEAM_ROLE_VIEWER);
    return {
      teamId,
      teamRole,
      hasTeam: !!teamId,
      canEdit: !!(teamId && canWriteTeamRole(teamRole))
    };
  };

  const updateGuidelineControlsState = () => {
    const context = getGuidelineEditorContext();
    if (context.teamId && guidelineDraftTeamId !== context.teamId) {
      guidelineDraftTeamId = context.teamId;
      guidelineDraft = normalizeTeamGuideline(
        state.teamGuidelineByTeamId.get(context.teamId) || TEAM_GUIDELINE_DEFAULT
      );
    }
    if (!context.teamId && guidelineDraftTeamId) {
      guidelineDraftTeamId = "";
      guidelineDraft = normalizeTeamGuideline(TEAM_GUIDELINE_DEFAULT);
    }
    syncGuidelineControlsFromDraft();
    const disabled = !context.canEdit;
    levelSelect.disabled = disabled;
    sizeSelect.disabled = disabled;
    stepInput.disabled = disabled;
    hueToggle.disabled = disabled;
    lockedRoleInputs.forEach((input) => {
      input.disabled = disabled;
    });
    guidelineResetBtn.disabled = disabled;
    guidelineSaveBtn.disabled = disabled;

    if (!context.hasTeam) {
      guidelineHint.textContent = t(
        "paletteTool.matrix.guideline.hint.noTeam",
        "Chuyển sang phạm vi Team để dùng Hướng dẫn Team cho Ma trận tương phản."
      );
      guidelineState.textContent = t(
        "paletteTool.matrix.guideline.state.personal",
        "Đang dùng bộ mặc định cục bộ."
      );
      return;
    }
    guidelineHint.textContent = t(
      "paletteTool.matrix.guideline.hint.activeTeam",
      "Đang áp dụng chuẩn tương phản của Team hiện tại."
    );
    guidelineState.textContent = context.canEdit
      ? t("paletteTool.matrix.guideline.state.editable", "Bạn có thể chỉnh và lưu Hướng dẫn Team.")
      : t("paletteTool.matrix.guideline.state.readonly", "Bạn chỉ có quyền xem Hướng dẫn Team.");
  };

  const onGuidelineInputChange = () => {
    guidelineDraft = readGuidelineDraftFromControls();
    previewSuggestionId = "";
    renderSemanticSections();
  };

  [levelSelect, sizeSelect, hueToggle].forEach((control) => {
    control.addEventListener("change", onGuidelineInputChange);
  });
  stepInput.addEventListener("input", onGuidelineInputChange);
  lockedRoleInputs.forEach((input) => {
    input.addEventListener("change", onGuidelineInputChange);
  });

  guidelineResetBtn.addEventListener("click", () => {
    const context = getGuidelineEditorContext();
    if (!context.canEdit) return;
    guidelineDraft = normalizeTeamGuideline(TEAM_GUIDELINE_DEFAULT);
    syncGuidelineControlsFromDraft();
    previewSuggestionId = "";
    renderSemanticSections();
  });

  guidelineSaveBtn.addEventListener("click", async () => {
    const context = getGuidelineEditorContext();
    if (!context.hasTeam) {
      showToast(t("paletteTool.matrix.guideline.toast.needTeam", "Hãy chọn Team trước khi lưu Hướng dẫn Team."));
      return;
    }
    if (!context.canEdit) {
      showToast(t("paletteTool.matrix.guideline.toast.readonly", "Bạn chỉ có quyền xem Hướng dẫn Team."));
      return;
    }
    guidelineDraft = readGuidelineDraftFromControls();
    const saved = await saveTeamGuideline(context.teamId, guidelineDraft, { silent: false });
    if (!saved.ok) return;
    guidelineDraftTeamId = context.teamId;
    guidelineDraft = normalizeTeamGuideline(saved.guideline);
    previewSuggestionId = "";
    const api = await waitForFirebaseApi();
    if (canUseTeamGuidelineApi(api)) {
      await writeTeamAuditEvent(api, context.teamId, "update", {
        paletteId: paletteId || state.selectedPaletteId || ""
      });
    }
    renderSemanticSections();
  });

  matrixChecksBtn.addEventListener("click", () => {
    activeMatrixTab = "checks";
    renderSemanticSections();
  });
  matrixSuggestBtn.addEventListener("click", () => {
    activeMatrixTab = "suggest";
    renderSemanticSections();
  });

  const buildContrastRows = (roleColors, guideline) => {
    const threshold = getGuidelineThreshold(guideline);
    const accentText = resolveAccentText(roleColors);
    const defs = [
      { id: "textBg", label: t("paletteTool.matrix.rows.textBg", "Chữ chính / Nền"), fgRole: "text", bgRole: "bg", fg: roleColors.text, bg: roleColors.bg },
      { id: "mutedBg", label: t("paletteTool.matrix.rows.mutedBg", "Chữ phụ / Nền"), fgRole: "muted", bgRole: "bg", fg: roleColors.muted, bg: roleColors.bg },
      { id: "textSurface", label: t("paletteTool.matrix.rows.textSurface", "Chữ chính / Nền phụ"), fgRole: "text", bgRole: "surface", fg: roleColors.text, bg: roleColors.surface },
      { id: "mutedSurface", label: t("paletteTool.matrix.rows.mutedSurface", "Chữ phụ / Nền phụ"), fgRole: "muted", bgRole: "surface", fg: roleColors.muted, bg: roleColors.surface },
      { id: "ctaAccent", label: t("paletteTool.matrix.rows.ctaAccent", "Chữ trên Nhấn (CTA)"), fgRole: accentText.mode === "role" ? "text" : "", bgRole: "accent", fg: accentText.hex, bg: roleColors.accent }
    ];
    return defs.map((item) => {
      const ratio = contrastRatio(item.bg, item.fg);
      const badge = classifyContrastByThreshold(ratio, threshold);
      return {
        ...item,
        ratio,
        threshold,
        pass: ratio >= threshold,
        badge
      };
    });
  };

  const buildGuidelineSummary = (guideline) => {
    const locked = Array.isArray(guideline?.lockedRoles) ? guideline.lockedRoles : [];
    const lockedText = locked.length
      ? locked.map((roleKey) => t(`paletteTool.roles.items.${roleKey}`, roleKey)).join(", ")
      : t("paletteTool.matrix.guideline.noneLocked", "không khóa");
    return t(
      "paletteTool.matrix.guideline.summary",
      "Hướng dẫn Team: {level} · chữ {size} · khóa vai: {locked} · tối đa {steps} bước",
      {
        level: guideline?.targetLevel || "AA",
        size: guideline?.textSize === "large"
          ? t("paletteTool.matrix.guideline.textSize.large", "lớn")
          : t("paletteTool.matrix.guideline.textSize.normal", "thường"),
        locked: lockedText,
        steps: String(guideline?.maxAdjustSteps || TEAM_GUIDELINE_DEFAULT.maxAdjustSteps)
      }
    );
  };

  const buildStopUpdatesFromRoleColors = (baseRoleColors, nextRoleColors, lockedRoles) => {
    const locked = new Set(Array.isArray(lockedRoles) ? lockedRoles : []);
    const updates = new Map();
    ROLE_KEYS.forEach((roleKey) => {
      if (locked.has(roleKey)) return;
      const from = normalizeHex(baseRoleColors?.[roleKey])?.toUpperCase() || "";
      const next = normalizeHex(nextRoleColors?.[roleKey])?.toUpperCase() || from;
      if (!from || !next || from === next) return;
      const stopIndex = Number(roleMap?.[roleKey]);
      if (!Number.isInteger(stopIndex) || stopIndex < 0 || stopIndex >= stops.length) return;
      const previous = updates.get(stopIndex);
      if (previous && previous.color !== next) return;
      updates.set(stopIndex, { index: stopIndex, color: next, roleKey });
    });
    return Array.from(updates.values());
  };

  const buildGuidelineSuggestions = (baseRoleColors, baseRows, guideline) => {
    const suggestions = [];
    const lockedRoles = new Set(Array.isArray(guideline?.lockedRoles) ? guideline.lockedRoles : []);
    const baseFailCount = baseRows.filter((row) => !row.pass).length;
    if (!baseFailCount) return suggestions;
    const threshold = getGuidelineThreshold(guideline);
    const registerCandidate = (candidate) => {
      if (!candidate || !candidate.id || !candidate.nextRoleColors) return;
      const nextRoleColors = ROLE_KEYS.reduce((acc, roleKey) => {
        acc[roleKey] = normalizeHex(candidate.nextRoleColors[roleKey])?.toUpperCase()
          || normalizeHex(baseRoleColors[roleKey])?.toUpperCase()
          || "#000000";
        return acc;
      }, {});
      const rows = buildContrastRows(nextRoleColors, guideline);
      const failCount = rows.filter((row) => !row.pass).length;
      if (failCount >= baseFailCount) return;
      const stopUpdates = buildStopUpdatesFromRoleColors(baseRoleColors, nextRoleColors, Array.from(lockedRoles));
      if (!stopUpdates.length) return;
      const magnitude = calcRoleChangeMagnitude(baseRoleColors, nextRoleColors);
      suggestions.push({
        id: candidate.id,
        title: candidate.title,
        desc: candidate.desc,
        failCount,
        fixedCount: baseFailCount - failCount,
        threshold,
        rows,
        roleColors: nextRoleColors,
        stopUpdates,
        changeScore: magnitude.score,
        changedRoles: magnitude.changedRoles
      });
    };

    const bwCandidate = { ...baseRoleColors };
    let bwChanged = false;
    ["text", "muted"].forEach((roleKey) => {
      if (lockedRoles.has(roleKey)) return;
      const relevantRows = baseRows.filter((row) => row.fgRole === roleKey && !row.pass);
      if (!relevantRows.length) return;
      const backgrounds = Array.from(new Set(relevantRows.map((row) => row.bg)));
      const blackMin = Math.min(...backgrounds.map((bg) => contrastRatio(bg, "#000000")));
      const whiteMin = Math.min(...backgrounds.map((bg) => contrastRatio(bg, "#FFFFFF")));
      const nextHex = blackMin >= whiteMin ? "#000000" : "#FFFFFF";
      if (normalizeHex(bwCandidate[roleKey])?.toUpperCase() !== nextHex) {
        bwCandidate[roleKey] = nextHex;
        bwChanged = true;
      }
    });
    if (bwChanged) {
      registerCandidate({
        id: "bw_priority",
        title: t("paletteTool.matrix.suggest.options.bwTitle", "Ưu tiên chữ đen/trắng"),
        desc: t("paletteTool.matrix.suggest.options.bwDesc", "Đổi chữ sang đen hoặc trắng để đạt ngưỡng nhanh nhất."),
        nextRoleColors: bwCandidate
      });
    }

    const textLightCandidate = { ...baseRoleColors };
    let textLightChanged = false;
    baseRows
      .filter((row) => !row.pass)
      .sort((a, b) => a.ratio - b.ratio)
      .forEach((row) => {
        if (!ROLE_KEYS.includes(row.fgRole) || lockedRoles.has(row.fgRole)) return;
        const suggestion = findLightnessSuggestion(
          textLightCandidate[row.fgRole],
          textLightCandidate[row.bgRole],
          row.threshold,
          guideline
        );
        if (!suggestion?.hex) return;
        const currentHex = normalizeHex(textLightCandidate[row.fgRole])?.toUpperCase() || "";
        if (suggestion.pass && suggestion.hex !== currentHex) {
          textLightCandidate[row.fgRole] = suggestion.hex;
          textLightChanged = true;
        }
      });
    if (textLightChanged) {
      registerCandidate({
        id: "text_lightness",
        title: t("paletteTool.matrix.suggest.options.textLightTitle", "Tinh chỉnh chữ theo độ sáng"),
        desc: t("paletteTool.matrix.suggest.options.textLightDesc", "Giữ nhận diện, chỉ chỉnh sáng/tối ở vai chữ để vượt ngưỡng."),
        nextRoleColors: textLightCandidate
      });
    }

    const bgLightCandidate = { ...baseRoleColors };
    let bgLightChanged = false;
    baseRows
      .filter((row) => !row.pass)
      .sort((a, b) => a.ratio - b.ratio)
      .forEach((row) => {
        if (!ROLE_KEYS.includes(row.bgRole) || lockedRoles.has(row.bgRole)) return;
        const suggestion = findLightnessSuggestion(
          bgLightCandidate[row.bgRole],
          bgLightCandidate[row.fgRole],
          row.threshold,
          guideline
        );
        if (!suggestion?.hex) return;
        const currentHex = normalizeHex(bgLightCandidate[row.bgRole])?.toUpperCase() || "";
        if (suggestion.pass && suggestion.hex !== currentHex) {
          bgLightCandidate[row.bgRole] = suggestion.hex;
          bgLightChanged = true;
        }
      });
    if (bgLightChanged) {
      registerCandidate({
        id: "bg_lightness",
        title: t("paletteTool.matrix.suggest.options.bgLightTitle", "Tinh chỉnh nền theo độ sáng"),
        desc: t("paletteTool.matrix.suggest.options.bgLightDesc", "Điều chỉnh vai nền để giữ đọc tốt mà ít thay đổi nhất."),
        nextRoleColors: bgLightCandidate
      });
    }

    suggestions.sort((a, b) => {
      if (a.failCount !== b.failCount) return a.failCount - b.failCount;
      return a.changeScore - b.changeScore;
    });
    return suggestions.slice(0, 3);
  };

  const applyGuidelineSuggestion = async (suggestion) => {
    if (!suggestion || !Array.isArray(suggestion.stopUpdates)) return false;
    if (guardRoomReadonlyAction()) return false;
    if (!suggestion.stopUpdates.length) {
      showToast(t("paletteTool.matrix.suggest.toast.noChange", "Không có thay đổi nào để áp dụng."));
      return false;
    }
    suggestion.stopUpdates.forEach((update) => {
      if (!Number.isInteger(update.index) || update.index < 0 || update.index >= stops.length) return;
      const nextHex = normalizeHex(update.color)?.toUpperCase();
      if (!nextHex) return;
      stops[update.index] = nextHex;
    });
    palette.stops = [...stops];
    if (state.hashPalette && state.hashPalette.id === paletteId) {
      state.hashPalette.stops = [...stops];
    }
    previewSuggestionId = "";
    state.roleMapByPaletteId.set(paletteId, { ...roleMap });
    renderPalettes();
    renderSemanticSections();

    const snapshot = buildShareStatePayload(stops, {
      roles: roleMap,
      preview: activePreviewTab,
      sim: activeVisionMode
    });
    if (snapshot && isRoomSyncWritable()) {
      const commit = await commitRoomSnapshotWithRevision(snapshot, {
        revisionLabel: t("paletteTool.matrix.suggest.applyRevisionLabel", "Áp dụng đề xuất tương phản"),
        forceRevision: true
      });
      if (!commit.ok) {
        showToast(t("paletteTool.matrix.suggest.toast.applyRoomFailed", "Không thể đồng bộ đề xuất vào phòng."));
      }
    } else if (isRoomSyncWritable()) {
      queueRoomSync({ final: true });
    }

    const activeTeam = getActiveTeam();
    if (activeTeam?.id && canWriteTeamRole(activeTeam.role)) {
      const api = await waitForFirebaseApi();
      if (canUseTeamGuidelineApi(api)) {
        await writeTeamAuditEvent(api, activeTeam.id, "update", {
          paletteId: paletteId || state.selectedPaletteId || ""
        });
      }
    }
    showToast(t("paletteTool.matrix.suggest.toast.applied", "Đã áp dụng đề xuất tự động."));
    return true;
  };

  const renderMatrix = (roleColors) => {
    updateGuidelineControlsState();
    const guideline = normalizeTeamGuideline(guidelineDraft);
    const threshold = getGuidelineThreshold(guideline);
    const rows = buildContrastRows(roleColors, guideline);
    const baseRoleColors = resolveRoleColors(stops, roleMap);
    const baseRows = buildContrastRows(baseRoleColors, guideline);
    latestGuidelineSuggestions = buildGuidelineSuggestions(baseRoleColors, baseRows, guideline);
    matrixGuideMeta.textContent = buildGuidelineSummary(guideline);
    matrixList.innerHTML = "";
    matrixSuggestList.innerHTML = "";

    roleChipList.innerHTML = "";
    roleDefs.forEach((role) => {
      const chip = document.createElement("span");
      chip.className = "tc-role-chip";
      const dot = document.createElement("span");
      dot.className = "tc-role-chip__dot";
      dot.style.background = roleColors[role.key] || "#E2E8F0";
      const text = document.createElement("span");
      text.textContent = `${role.label}: ${String(roleColors[role.key] || "").toUpperCase()}`;
      chip.appendChild(dot);
      chip.appendChild(text);
      roleChipList.appendChild(chip);
    });

    const failingRows = rows.filter((row) => !row.pass).sort((a, b) => a.ratio - b.ratio);
    const weakestRow = failingRows[0] || null;
    if (weakestRow) {
      roleStatusLine.innerHTML = `<strong>${failingRows.length}</strong> cặp vai màu chưa đạt ngưỡng ${threshold.toFixed(1)}:1.`;
      roleHotspotLine.hidden = false;
      roleHotspotLine.textContent = `Nút thắt hiện tại: ${weakestRow.label} (${weakestRow.ratio.toFixed(2)}:1). Ưu tiên chỉnh ${resolveRoleLabel(weakestRow.fgRole)} trước.`;
      matrixBottleneck.textContent = `Cặp cần ưu tiên: ${weakestRow.label} · ${weakestRow.ratio.toFixed(2)}:1 (mục tiêu ${threshold.toFixed(1)}:1).`;
    } else {
      roleStatusLine.innerHTML = `<strong>Đạt chuẩn</strong> cho toàn bộ cặp vai màu theo ngưỡng ${threshold.toFixed(1)}:1.`;
      roleHotspotLine.hidden = true;
      roleHotspotLine.textContent = "";
      matrixBottleneck.textContent = "Không còn nút thắt contrast. Bạn có thể ưu tiên tinh chỉnh thẩm mỹ hoặc chuyển tiếp workflow.";
    }

    rows.forEach((rowDef) => {
      const row = document.createElement("div");
      row.className = "tc-contrast-row";
      const meta = document.createElement("div");
      meta.className = "tc-contrast-meta";
      const pair = document.createElement("div");
      pair.className = "text-xs font-semibold";
      pair.textContent = rowDef.label;
      const ratioText = document.createElement("div");
      ratioText.className = "text-xs tc-muted";
      ratioText.textContent = `${rowDef.ratio.toFixed(2)}:1`;
      meta.appendChild(pair);
      meta.appendChild(ratioText);
      const badgeEl = document.createElement("span");
      badgeEl.className = `tc-contrast-badge is-${rowDef.badge.level}`;
      badgeEl.textContent = rowDef.badge.label;
      row.appendChild(meta);
      row.appendChild(badgeEl);
      matrixList.appendChild(row);

      if (rowDef.ratio >= threshold || !ROLE_KEYS.includes(rowDef.fgRole)) return;
      const suggest = document.createElement("div");
      suggest.className = "tc-contrast-actions";
      const betterBW = contrastRatio(rowDef.bg, "#000000") >= contrastRatio(rowDef.bg, "#FFFFFF")
        ? { hex: "#000000", label: t("paletteTool.matrix.black", "Đen") }
        : { hex: "#FFFFFF", label: t("paletteTool.matrix.white", "Trắng") };
      const nearestBWIdx = findClosestPaletteIndex(stops, betterBW.hex);
      const bwBtn = document.createElement("button");
      bwBtn.type = "button";
      bwBtn.className = "tc-btn tc-chip px-2 py-1 text-[11px]";
      bwBtn.textContent = t("paletteTool.matrix.actions.pickBW", "Ưu tiên chữ {color}", { color: betterBW.label });
      bwBtn.addEventListener("click", () => {
        applyRoleIndex(rowDef.fgRole, nearestBWIdx);
        renderSemanticSections();
      });
      const bgIndex = roleMap[rowDef.bgRole];
      const bestIdx = findBestContrastIndex(stops, bgIndex, { exclude: [bgIndex] });
      const bestBtn = document.createElement("button");
      bestBtn.type = "button";
      bestBtn.className = "tc-btn tc-chip px-2 py-1 text-[11px]";
      bestBtn.textContent = t("paletteTool.matrix.actions.pickBest", "Chọn màu palette dễ đọc nhất");
      bestBtn.addEventListener("click", () => {
        applyRoleIndex(rowDef.fgRole, bestIdx);
        renderSemanticSections();
      });
      suggest.appendChild(bwBtn);
      suggest.appendChild(bestBtn);
      matrixList.appendChild(suggest);
    });

    const currentFailCount = rows.filter((row) => !row.pass).length;
    if (!latestGuidelineSuggestions.length) {
      matrixSuggestState.textContent = currentFailCount > 0
        ? t("paletteTool.matrix.suggest.none", "Chưa tạo được đề xuất phù hợp với Hướng dẫn Team hiện tại.")
        : t("paletteTool.matrix.suggest.allPass", "Palette hiện tại đã đạt Hướng dẫn Team.");
    } else {
      matrixSuggestState.textContent = t("paletteTool.matrix.suggest.state", "Có {count} đề xuất tự động.", {
        count: String(latestGuidelineSuggestions.length)
      });
    }

    latestGuidelineSuggestions.forEach((suggestion, index) => {
      const item = document.createElement("article");
      item.className = "tc-contrast-row tc-suggest-card";
      const meta = document.createElement("div");
      meta.className = "tc-contrast-meta";
      const title = document.createElement("div");
      title.className = "text-xs font-semibold";
      title.textContent = t("paletteTool.matrix.suggest.itemTitle", "Phương án {index} · {title}", {
        index: String(index + 1),
        title: suggestion.title
      });
      const desc = document.createElement("div");
      desc.className = "text-xs tc-muted";
      desc.textContent = t(
        "paletteTool.matrix.suggest.itemMeta",
        "{desc} · Giảm {fixed} cặp lỗi · Mức thay đổi {score}",
        {
          desc: suggestion.desc,
          fixed: String(suggestion.fixedCount),
          score: `${suggestion.changeScore}%`
        }
      );
      meta.appendChild(title);
      meta.appendChild(desc);
      const tradeoff = document.createElement("p");
      tradeoff.className = "tc-suggest-tradeoff";
      tradeoff.textContent = describeSuggestionTradeoff(suggestion);
      meta.appendChild(tradeoff);

      const badgeWrap = document.createElement("div");
      badgeWrap.className = "tc-suggest-badges";
      buildSuggestionBadges(suggestion, latestGuidelineSuggestions).forEach((badge) => {
        const node = document.createElement("span");
        node.className = `tc-suggest-badge tc-suggest-badge--${badge.tone || "safe"}`;
        node.textContent = badge.label;
        badgeWrap.appendChild(node);
      });

      const head = document.createElement("div");
      head.className = "tc-suggest-card__head";
      head.appendChild(meta);
      head.appendChild(badgeWrap);

      const actions = document.createElement("div");
      actions.className = "tc-contrast-actions";
      const previewBtn = document.createElement("button");
      previewBtn.type = "button";
      previewBtn.className = "tc-btn tc-chip px-2 py-1 text-[11px]";
      const previewing = previewSuggestionId === suggestion.id;
      previewBtn.textContent = previewing
        ? t("paletteTool.matrix.suggest.actions.previewing", "Đang xem trước")
        : t("paletteTool.matrix.suggest.actions.preview", "Xem trước");
      previewBtn.addEventListener("click", () => {
        previewSuggestionId = previewSuggestionId === suggestion.id ? "" : suggestion.id;
        renderSemanticSections();
      });
      const applyBtn = document.createElement("button");
      applyBtn.type = "button";
      applyBtn.className = "tc-btn tc-btn-primary px-2 py-1 text-[11px]";
      applyBtn.textContent = t("paletteTool.matrix.suggest.actions.apply", "Áp dụng");
      applyBtn.addEventListener("click", async () => {
        await applyGuidelineSuggestion(suggestion);
      });
      actions.appendChild(previewBtn);
      actions.appendChild(applyBtn);

      item.appendChild(head);
      item.appendChild(actions);
      matrixSuggestList.appendChild(item);
    });

    matrixChecksBtn.classList.toggle("tc-btn-primary", activeMatrixTab === "checks");
    matrixSuggestBtn.classList.toggle("tc-btn-primary", activeMatrixTab === "suggest");
    matrixHint.classList.toggle("hidden", activeMatrixTab !== "checks");
    matrixList.classList.toggle("hidden", activeMatrixTab !== "checks");
    matrixSuggestState.classList.toggle("hidden", activeMatrixTab !== "suggest");
    matrixSuggestList.classList.toggle("hidden", activeMatrixTab !== "suggest");
    return rows;
  };

  const renderPreview = (roleColors) => {
    previewStage.innerHTML = "";
    const accentText = resolveAccentText(roleColors);
    if (activePreviewTab === "poster") {
      const poster = document.createElement("div");
      poster.className = "tc-context-poster";
      poster.style.background = `linear-gradient(140deg, ${roleColors.bg} 0%, ${roleColors.surface} 100%)`;
      poster.style.color = roleColors.text;
      const title = document.createElement("h4");
      title.className = "text-base font-semibold";
      title.textContent = t("paletteTool.preview.poster.title", "Áp phích giới thiệu bộ sưu tập");
      const body = document.createElement("p");
      body.className = "text-sm";
      body.style.color = roleColors.muted;
      body.textContent = t("paletteTool.preview.poster.body", "Kiểm tra mức nổi bật của tiêu đề, mô tả và CTA trong bối cảnh áp phích.");
      const cta = document.createElement("button");
      cta.type = "button";
      cta.className = "tc-context-cta";
      cta.style.background = roleColors.accent;
      cta.style.color = accentText.hex;
      cta.textContent = t("paletteTool.preview.poster.cta", "Đăng ký ngay");
      poster.appendChild(title);
      poster.appendChild(body);
      poster.appendChild(cta);
      previewStage.appendChild(poster);
      return;
    }
    if (activePreviewTab === "card") {
      const grid = document.createElement("div");
      grid.className = "tc-context-grid";

      const cardLight = document.createElement("article");
      cardLight.className = "tc-context-card";
      cardLight.style.background = roleColors.surface;
      const cardLightHead = document.createElement("div");
      cardLightHead.className = "tc-context-card__head";
      cardLightHead.style.background = roleColors.bg;
      cardLightHead.style.color = roleColors.text;
      cardLightHead.textContent = t("paletteTool.preview.card.lightTitle", "Thẻ nội dung sáng");
      const cardLightBody = document.createElement("div");
      cardLightBody.className = "tc-context-card__body";
      const lightHeading = document.createElement("p");
      lightHeading.className = "text-sm font-semibold";
      lightHeading.style.color = roleColors.text;
      lightHeading.textContent = t("paletteTool.preview.card.lightHeading", "Tiêu đề chính");
      const lightDesc = document.createElement("p");
      lightDesc.className = "tc-context-caption";
      lightDesc.style.color = roleColors.muted;
      lightDesc.textContent = t("paletteTool.preview.card.lightDesc", "Dùng để kiểm tra khả năng đọc trong bối cảnh light.");
      const lightBadge = document.createElement("span");
      lightBadge.className = "tc-context-badge";
      lightBadge.style.background = roleColors.accent;
      lightBadge.style.color = accentText.hex;
      lightBadge.textContent = t("paletteTool.preview.card.lightBadge", "Nhãn nổi bật");
      cardLightBody.appendChild(lightHeading);
      cardLightBody.appendChild(lightDesc);
      cardLightBody.appendChild(lightBadge);
      cardLight.appendChild(cardLightHead);
      cardLight.appendChild(cardLightBody);

      const cardDark = document.createElement("article");
      cardDark.className = "tc-context-card";
      cardDark.style.background = roleColors.text;
      const cardDarkHead = document.createElement("div");
      cardDarkHead.className = "tc-context-card__head";
      cardDarkHead.style.background = roleColors.accent;
      cardDarkHead.style.color = accentText.hex;
      cardDarkHead.textContent = t("paletteTool.preview.card.darkTitle", "Thẻ nội dung tối");
      const cardDarkBody = document.createElement("div");
      cardDarkBody.className = "tc-context-card__body";
      const darkHeading = document.createElement("p");
      darkHeading.className = "text-sm font-semibold";
      darkHeading.style.color = roleColors.bg;
      darkHeading.textContent = t("paletteTool.preview.card.darkHeading", "Khối thông tin phụ");
      const darkDesc = document.createElement("p");
      darkDesc.className = "tc-context-caption";
      darkDesc.style.color = roleColors.surface;
      darkDesc.textContent = t("paletteTool.preview.card.darkDesc", "So nhanh độ nổi của chữ và nút khi dùng nền tối.");
      const darkBtn = document.createElement("button");
      darkBtn.type = "button";
      darkBtn.className = "tc-context-cta";
      darkBtn.style.background = roleColors.bg;
      darkBtn.style.color = roleColors.text;
      darkBtn.textContent = t("paletteTool.preview.card.darkCta", "Mở chi tiết");
      cardDarkBody.appendChild(darkHeading);
      cardDarkBody.appendChild(darkDesc);
      cardDarkBody.appendChild(darkBtn);
      cardDark.appendChild(cardDarkHead);
      cardDark.appendChild(cardDarkBody);

      grid.appendChild(cardLight);
      grid.appendChild(cardDark);
      previewStage.appendChild(grid);
      return;
    }
    if (activePreviewTab === "cta") {
      const lab = document.createElement("div");
      lab.className = "tc-context-cta-lab";
      const header = document.createElement("p");
      header.className = "tc-context-caption";
      header.textContent = t("paletteTool.preview.cta.hint", "Kiểm tra nhanh độ nổi của CTA/nhãn trước khi áp vào trang thật.");
      lab.appendChild(header);
      const rows = [
        {
          label: t("paletteTool.preview.cta.primary", "CTA chính"),
          bg: roleColors.accent,
          fg: accentText.hex,
          text: t("paletteTool.preview.cta.primaryText", "Mua ngay")
        },
        {
          label: t("paletteTool.preview.cta.secondary", "CTA phụ"),
          bg: roleColors.surface,
          fg: roleColors.text,
          text: t("paletteTool.preview.cta.secondaryText", "Xem thêm")
        },
        {
          label: t("paletteTool.preview.cta.tag", "Nhãn trạng thái"),
          bg: roleColors.bg,
          fg: roleColors.text,
          text: t("paletteTool.preview.cta.tagText", "Đang xử lý")
        }
      ];
      rows.forEach((item) => {
        const row = document.createElement("div");
        row.className = "tc-context-cta-lab__row";
        const label = document.createElement("span");
        label.className = "tc-context-cta-lab__label";
        label.textContent = item.label;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "tc-context-cta";
        btn.style.background = item.bg;
        btn.style.color = item.fg;
        btn.textContent = item.text;
        row.appendChild(label);
        row.appendChild(btn);
        lab.appendChild(row);
      });
      previewStage.appendChild(lab);
      return;
    }
    const ui = document.createElement("div");
    ui.className = "tc-context-ui";
    ui.style.background = roleColors.bg;
    ui.style.borderColor = roleColors.surface;
    const head = document.createElement("div");
    head.className = "tc-context-ui-head";
    head.style.background = roleColors.surface;
    head.style.color = roleColors.text;
    head.textContent = t("paletteTool.preview.ui.header", "Khung giao diện sản phẩm");
    const body = document.createElement("div");
    body.className = "tc-context-ui-body";
    const heading = document.createElement("p");
    heading.className = "text-sm font-semibold";
    heading.style.color = roleColors.text;
    heading.textContent = t("paletteTool.preview.ui.title", "Tiêu đề nội dung");
    const desc = document.createElement("p");
    desc.className = "text-xs";
    desc.style.color = roleColors.muted;
    desc.textContent = t("paletteTool.preview.ui.body", "Mô phỏng card thật để nhìn rõ độ đọc của chữ và nút hành động.");
    const cta = document.createElement("button");
    cta.type = "button";
    cta.className = "tc-context-cta";
    cta.style.background = roleColors.accent;
    cta.style.color = accentText.hex;
    cta.textContent = t("paletteTool.preview.ui.cta", "Nút kêu gọi");
    const badge = document.createElement("span");
    badge.className = "tc-context-badge";
    badge.style.background = roleColors.surface;
    badge.style.color = roleColors.text;
    badge.textContent = t("paletteTool.preview.ui.badge", "Nhãn");
    body.appendChild(heading);
    body.appendChild(desc);
    body.appendChild(cta);
    body.appendChild(badge);
    ui.appendChild(head);
    ui.appendChild(body);
    previewStage.appendChild(ui);
  };

  const renderSemanticSections = () => {
    const ensured = ensureRoleMap(palette, stops);
    roleMap = { ...ensured.roleMap };
    autoRoleMap = { ...ensured.autoMap };
    const roleColors = resolveRoleColors(stops, roleMap);
    visionSelect.value = activeVisionMode;
    previewStage.dataset.vision = activeVisionMode;
    roleDefs.forEach((role) => {
      const controls = roleRows.get(role.key);
      if (!controls) return;
      controls.swatch.style.background = roleColors[role.key];
      controls.select.value = String(roleMap[role.key]);
      if (controls.commentBtn) {
        const hasRoom = !!(state.room.id && state.room.active);
        controls.commentBtn.disabled = !hasRoom;
        controls.commentBtn.title = hasRoom
          ? t("paletteTool.room.comments.openRoleTooltip", "Mở bình luận cho vai màu này")
          : t("paletteTool.room.comments.needRoomHint", "Kết nối Phòng chỉnh sửa để bình luận.");
      }
    });
    previewButtons.forEach((btn, key) => {
      btn.classList.toggle("tc-btn-primary", key === activePreviewTab);
    });
    const matrixRows = renderMatrix(roleColors) || [];
    let previewRoleColors = roleColors;
    let previewSuggestion = null;
    if (previewSuggestionId) {
      previewSuggestion = latestGuidelineSuggestions.find((item) => item.id === previewSuggestionId) || null;
      if (previewSuggestion?.roleColors) {
        previewRoleColors = previewSuggestion.roleColors;
      } else {
        previewSuggestionId = "";
        previewSuggestion = null;
      }
    }
    renderPreview(previewRoleColors);
    const selected = state.selectedPaletteId === paletteId;
    workflowUseBtn.disabled = selected;
    workflowUseBtn.textContent = selected
      ? "Đang là bảng phối đang dùng"
      : "Đặt làm bảng phối đang dùng";
    if (previewSuggestion) {
      workflowState.textContent = `Đang xem trước: ${previewSuggestion.title}. Có thể áp dụng ngay hoặc so tiếp với palette gốc.`;
      workflowApplyPreviewBtn.hidden = false;
      workflowApplyPreviewBtn.onclick = async () => {
        await applyGuidelineSuggestion(previewSuggestion);
      };
    } else {
      const failCount = matrixRows.filter((row) => !row.pass).length;
      workflowApplyPreviewBtn.hidden = true;
      workflowApplyPreviewBtn.onclick = null;
      workflowState.textContent = failCount > 0
        ? `Còn ${failCount} cặp vai màu chưa đạt chuẩn. Hãy chọn một phương án ở tab Đề xuất để tối ưu nhanh.`
        : "Palette đã đạt chuẩn tương phản. Bạn có thể lưu, sao chép token hoặc chuyển tiếp sang World khác.";
    }
    const leadHex = normalizeHex(stops[roleMap.accent] || stops[0] || "#0EA5E9")?.toUpperCase() || "#0EA5E9";
    workflowToThread.href = `./threadcolor.html?color=${encodeURIComponent(leadHex)}`;
    workflowToGradient.href = `./gradient.html#g=${encodeURIComponent(stops.join(","))}`;
    workflowToCommunity.href = "../spaces/community.html?from=world3_palette";
    applyPresenceBadgesInDom();
  };

  tokenCopyBtn.addEventListener("click", async () => {
    const payload = buildRoleTokenPayload(stops, roleMap);
    const ok = await copyText(payload);
    showToast(ok
      ? t("paletteTool.token.copied", "Đã sao chép token vai màu.")
      : t("paletteTool.token.copyFail", "Không thể sao chép token vai màu."));
  });
  renderSemanticSections();

  card.appendChild(header);
  card.appendChild(swatchRow);
  card.appendChild(strip);
  card.appendChild(semanticWrap);
  card.appendChild(contrastMatrix);
  card.appendChild(previewWrap);
  card.appendChild(workflowWrap);
  card.appendChild(quickCopy);
  card.addEventListener("click", (event) => {
    if (event.target.closest("button")) return;
    markPresenceIntent({
      activePaletteIndex: null,
      activeRoleKey: "",
      activePanel: "palette"
    });
    selectPalette(palette);
  });

  return card;
}

function renderLockRow() {
  if (!el.lockRow) return;
  el.lockRow.innerHTML = "";
  const stops = state.generatorStops;
  if (!stops.length) {
    const note = document.createElement("span");
    note.className = "tc-muted text-xs";
    note.textContent = "Chưa có palette mới để khoá màu.";
    el.lockRow.appendChild(note);
    return;
  }
  stops.forEach((hex, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tc-btn tc-chip px-3 py-2 text-xs flex items-center gap-2";
    const isLocked = state.lockedSlots[idx] === hex;
    if (isLocked) btn.classList.add("tc-btn-primary");
    btn.dataset.lockIndex = String(idx);
    btn.dataset.lockHex = hex;
    btn.innerHTML = `<span class="w-3 h-3 rounded-full border" style="background:${hex}"></span>${hex}`;
    btn.addEventListener("click", () => toggleLock(idx, hex));
    el.lockRow.appendChild(btn);
  });
}

function toggleLock(index, hex) {
  if (state.lockedSlots[index] === hex) {
    delete state.lockedSlots[index];
    renderLockRow();
    return;
  }
  const lockedCount = Object.keys(state.lockedSlots).length;
  if (lockedCount >= 2 && !state.lockedSlots[index]) {
    showToast("Chỉ nên khoá tối đa 2 màu.");
    return;
  }
  state.lockedSlots[index] = hex;
  renderLockRow();
}

function clearLocks() {
  state.lockedSlots = {};
  renderLockRow();
}

function applyLocks(stops) {
  const next = [...stops];
  Object.entries(state.lockedSlots).forEach(([key, hex]) => {
    const idx = Number(key);
    if (Number.isNaN(idx) || idx < 0) return;
    if (idx < next.length) {
      next[idx] = hex;
    }
  });
  return next;
}

function createUserPalette(stops, name, tags = []) {
  if (guardRoomReadonlyAction()) return null;
  const palette = {
    id: `user_${Date.now()}`,
    ten: name,
    tags: ["user-generated", ...tags],
    stops
  };
  state.palettes.unshift(palette);
  state.selectedPaletteId = palette.id;
  state.generatorStops = [...stops];
  renderLockRow();
  renderPalettes();
  queueRoomSync();
  return palette;
}

function parseHexList(text) {
  return (text || "")
    .split(/[\s,]+/)
    .map((item) => normalizeHex(item))
    .filter(Boolean);
}

function setImageExtractMeta(message) {
  if (!el.imageMeta) return;
  el.imageMeta.textContent = message || "";
}

function clearImageExtractResult() {
  imageExtractState.stops = [];
  if (el.imageSwatches) el.imageSwatches.innerHTML = "";
  if (el.imageResult) el.imageResult.classList.add("hidden");
}

function renderImageExtractSwatches(stops) {
  if (!el.imageSwatches) return;
  el.imageSwatches.innerHTML = "";
  stops.forEach((hex) => {
    const swatch = document.createElement("span");
    swatch.className = "tc-image-swatch";
    swatch.style.background = hex;
    swatch.textContent = hex;
    swatch.setAttribute("aria-label", hex);
    el.imageSwatches.appendChild(swatch);
  });
  if (el.imageResult) el.imageResult.classList.remove("hidden");
}

function applyImageExtractTexts() {
  if (el.imageTitle) el.imageTitle.textContent = t("paletteTool.extract.title");
  if (el.imageDesc) el.imageDesc.textContent = t("paletteTool.extract.desc");
  if (el.imageCta) el.imageCta.textContent = t("paletteTool.extract.cta");
  if (el.imageDropText) el.imageDropText.textContent = t("paletteTool.extract.drop.text");
  if (el.imageDropHint) el.imageDropHint.textContent = t("paletteTool.extract.drop.hint");
  if (el.imageCountLabel) el.imageCountLabel.textContent = t("paletteTool.extract.count");
  if (el.imagePriorityLabel) el.imagePriorityLabel.textContent = t("paletteTool.extract.priority.label");
  if (el.imageExtract) el.imageExtract.textContent = t("paletteTool.extract.extractAction");
  if (el.imageResultTitle) el.imageResultTitle.textContent = t("paletteTool.extract.resultTitle");
  if (el.imageUse) el.imageUse.textContent = t("paletteTool.extract.useAction");
  if (el.imagePriority) {
    const vivid = el.imagePriority.querySelector("option[value='vivid']");
    const soft = el.imagePriority.querySelector("option[value='soft']");
    if (vivid) vivid.textContent = t("paletteTool.extract.priority.vivid");
    if (soft) soft.textContent = t("paletteTool.extract.priority.soft");
  }
  setImageExtractMeta(t("paletteTool.extract.meta.empty"));
}

async function setImageFileForExtraction(file) {
  if (!isImageFile(file)) {
    showToast(t("paletteTool.extract.toast.invalidFile"));
    return false;
  }
  clearImageExtractResult();
  imageExtractState.file = file;
  setImageExtractMeta(t("paletteTool.extract.meta.loading"));
  try {
    const scaled = await downscaleImageForExtraction(file, IMAGE_EXTRACT_MAX_SIDE);
    if ((scaled.width * scaled.height) < 16) {
      throw new Error("image_too_small");
    }
    imageExtractState.scaled = scaled;
    setImageExtractMeta(t("paletteTool.extract.meta.ready", "", {
      srcW: String(scaled.srcWidth),
      srcH: String(scaled.srcHeight),
      dstW: String(scaled.width),
      dstH: String(scaled.height)
    }));
    return true;
  } catch (_err) {
    imageExtractState.scaled = null;
    if (_err?.message === "image_too_small") {
      showToast(t("paletteTool.extract.toast.tooSmall"));
    } else {
      showToast(t("paletteTool.extract.toast.failed"));
    }
    setImageExtractMeta(t("paletteTool.extract.meta.empty"));
    return false;
  }
}

function applyExtractedPaletteToWorld() {
  const extracted = Array.isArray(imageExtractState.stops) ? imageExtractState.stops.filter(Boolean) : [];
  if (extracted.length < IMAGE_EXTRACT_MIN) {
    showToast(t("paletteTool.extract.toast.emptyResult"));
    return;
  }
  const palette = createUserPalette(
    extracted.slice(0, IMAGE_EXTRACT_MAX),
    t("paletteTool.extract.paletteName"),
    ["image-extract"]
  );
  if (palette) {
    openPresetDetail(palette);
  }
  showToast(t("paletteTool.extract.toast.applied"));
}

function bindImageDropEvents() {
  if (!el.imageDrop) return;
  const drop = el.imageDrop;
  const onDragOver = (event) => {
    event.preventDefault();
    drop.classList.add("is-dragover");
  };
  const onDragLeave = () => {
    drop.classList.remove("is-dragover");
  };
  drop.addEventListener("dragenter", onDragOver);
  drop.addEventListener("dragover", onDragOver);
  drop.addEventListener("dragleave", onDragLeave);
  drop.addEventListener("dragend", onDragLeave);
  drop.addEventListener("drop", async (event) => {
    event.preventDefault();
    onDragLeave();
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;
    await setImageFileForExtraction(file);
  });
}

function initImageExtractTool() {
  if (!el.imageCard || !el.imageInput || !el.imageExtract || !el.imageUse) return;
  applyImageExtractTexts();
  bindImageDropEvents();

  el.imageCta?.addEventListener("click", () => {
    el.imageCard.open = true;
    el.imageInput?.click();
  });

  el.imageInput.addEventListener("change", async () => {
    const file = el.imageInput?.files?.[0];
    if (!file) return;
    await setImageFileForExtraction(file);
  });

  el.imageExtract.addEventListener("click", () => {
    if (!imageExtractState.scaled?.imageData) {
      showToast(t("paletteTool.extract.toast.needImage"));
      return;
    }
    const desiredCount = clampNumber(el.imageCount?.value || 5, IMAGE_EXTRACT_MIN, IMAGE_EXTRACT_MAX);
    const priorityMode = (el.imagePriority?.value || "vivid") === "soft" ? "soft" : "vivid";
    const stops = extractPaletteFromImageData(imageExtractState.scaled.imageData, desiredCount, priorityMode);
    if (stops.length < IMAGE_EXTRACT_MIN) {
      clearImageExtractResult();
      showToast(t("paletteTool.extract.toast.failed"));
      return;
    }
    imageExtractState.stops = stops;
    renderImageExtractSwatches(stops);
    showToast(t("paletteTool.extract.toast.extracted", "", { count: String(stops.length) }));
  });

  el.imageUse.addEventListener("click", () => {
    applyExtractedPaletteToWorld();
  });

  window.tcPaletteImageExtractDebug = {
    loadFile: setImageFileForExtraction,
    runExtract: (count = 5, priority = "vivid") => {
      if (!imageExtractState.scaled?.imageData) return [];
      return extractPaletteFromImageData(imageExtractState.scaled.imageData, count, priority);
    },
    getState: () => ({
      srcWidth: imageExtractState.scaled?.srcWidth || 0,
      srcHeight: imageExtractState.scaled?.srcHeight || 0,
      width: imageExtractState.scaled?.width || 0,
      height: imageExtractState.scaled?.height || 0,
      stops: [...(imageExtractState.stops || [])]
    })
  };
}

function buildHarmonyPalette(baseHex, rule) {
  return buildHarmonyPaletteCore(baseHex, rule);
}

function buildTonePalette(tone, count) {
  return buildTonePaletteCore(tone, count);
}

function renderPalettes() {
  if (!el.grid || !el.empty) return;
  el.grid.innerHTML = "";
  const list = [...state.palettes];
  if (state.hashPalette) {
    list.unshift(state.hashPalette);
  }
  if (!list.length) {
    el.empty.classList.remove("hidden");
    return;
  }
  el.empty.classList.add("hidden");
  list.forEach((palette) => {
    el.grid.appendChild(renderPaletteMiniCard(palette));
  });
}

function safeDecode(value) {
  if (!value) return "";
  try {
    return decodeURIComponent(value);
  } catch (_err) {
    return value;
  }
}

function decodePaletteStops(raw) {
  if (!raw) return null;
  const decoded = safeDecode(raw).trim();
  if (!decoded) return null;
  let list = null;
  if (decoded.startsWith("{") || decoded.startsWith("[")) {
    try {
      const payload = JSON.parse(decoded);
      if (Array.isArray(payload)) {
        list = payload;
      } else if (Array.isArray(payload?.colors)) {
        list = payload.colors;
      } else if (Array.isArray(payload?.stops)) {
        list = payload.stops;
      }
    } catch (_err) {
      list = null;
    }
  }
  if (!list) {
    list = decoded.split(",");
  }
  const stops = list.map((s) => normalizeHex(s)).filter(Boolean);
  if (stops.length >= MIN_STOPS && stops.length <= MAX_STOPS) {
    return stops;
  }
  return null;
}

function normalizePaletteCollection(list) {
  if (!Array.isArray(list)) return [];
  return list
    .map((item, idx) => {
      const rawStops = Array.isArray(item?.stops) ? item.stops : [];
      const stops = rawStops
        .map((hex) => normalizeHex(hex))
        .filter(Boolean)
        .slice(0, MAX_STOPS)
        .map((hex) => hex.toUpperCase());
      if (stops.length < MIN_STOPS) return null;
      return {
        id: String(item?.id || `fallback_${Date.now()}_${idx}`),
        ten: String(item?.ten || item?.name || `Bảng phối màu ${idx + 1}`),
        tags: Array.isArray(item?.tags) ? item.tags.map((tag) => String(tag)) : [],
        stops
      };
    })
    .filter(Boolean);
}

function getHashStops(key) {
  const hash = (window.location.hash || "").replace("#", "");
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const raw = params.get(key);
  if (!raw) return null;
  return decodePaletteStops(raw);
}

function applyHashSharedPalette(sharedState) {
  if (!sharedState) return;
  const paletteId = "hash-share-palette";
  state.hashPalette = {
    id: paletteId,
    ten: t("paletteTool.shareState.linkPaletteName", "Bảng phối màu từ link chia sẻ"),
    tags: [t("paletteTool.shareState.linkPaletteTag", "từ link chia sẻ")],
    stops: sharedState.colors
  };
  state.selectedPaletteId = paletteId;
  state.roleMapByPaletteId.set(paletteId, { ...sharedState.roles });
  state.previewTabByPaletteId.set(paletteId, sharedState.preview);
  state.previewVisionModeByPaletteId.set(paletteId, sharedState.visionMode);
}

function handleBackwardCompatibility() {
  if (hasStrictIncoming) return false;
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");
  const hashStops = getHashStops("g");
  if (mode === "gradient" || hashStops) {
    const stops = hashStops ? hashStops.join(",") : "";
    const target = stops ? `gradient.html#g=${encodeURIComponent(stops)}` : "gradient.html";
    window.location.replace(target);
    return true;
  }
  return false;
}

async function loadPalettes() {
  let next = [];
  try {
    const res = await fetch("../data/palettes.json", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      next = normalizePaletteCollection(data);
    }
  } catch (_err) {
    next = [];
  }
  if (!next.length) {
    next = normalizePaletteCollection(BUILTIN_FALLBACK_PALETTES);
  }
  state.palettes = next;
  renderPalettes();
}

async function init() {
  if (handleBackwardCompatibility()) return;
  setPaletteWorkMode("quick");
  const queryParams = new URLSearchParams(normalizeSearchText(window.location.search || ""));
  const hasRoomQueryParam = queryParams.has("room");
  const roomIdFromQuery = parseRoomIdFromQuery(window.location.search || "");
  if (!hasStrictIncoming && hasRoomQueryParam && !roomIdFromQuery) {
    showToast(t("paletteTool.room.toast.invalidRoom", "Mã phòng không hợp lệ."));
  }
  if (!hasStrictIncoming && roomIdFromQuery) {
    await enterPaletteRoom(roomIdFromQuery, { silent: false });
  }

  if (!hasStrictIncoming && !roomIdFromQuery) {
    const shortShare = await parsePaletteShareStateFromQuery(window.location.search || "");
    if (shortShare.status === "ok" && shortShare.state) {
      applyHashSharedPalette(shortShare.state);
    } else {
      if (shortShare.status !== "none") {
        if (shortShare.status === "missing") {
          showToast(t("paletteTool.shareState.toast.shortNotFound", "Không tìm thấy link rút gọn."));
        } else if (shortShare.status === "invalid" || shortShare.status === "invalid-id") {
          showToast(t("paletteTool.shareState.toast.shortInvalid", "Link rút gọn không hợp lệ."));
        } else {
          showToast(t("paletteTool.shareState.toast.shortLoadFail", "Không thể tải link rút gọn."));
        }
      }
      const parsedShare = parsePaletteShareStateFromHash(window.location.hash || "");
      if (parsedShare.status === "ok" && parsedShare.state) {
        applyHashSharedPalette(parsedShare.state);
      } else {
        if (parsedShare.status === "invalid") {
          showToast(t("paletteTool.shareState.toast.invalidLink", "Link chia sẻ không hợp lệ."));
        }
        const stops = getHashStops("p");
        if (stops) {
          state.hashPalette = {
            id: "hash-palette",
            ten: "Palette từ dải chuyển màu",
            tags: ["từ hash"],
            stops
          };
          state.selectedPaletteId = "hash-palette";
        }
      }
    }
  }
  if (el.roomJoinInput) {
    el.roomJoinInput.value = roomIdFromQuery || getLastRoomId() || "";
  }
  renderRoomFlowGuide();
  refreshPaletteTourControls();
  loadPalettes();
  el.modeQuick?.addEventListener("click", () => {
    setPaletteWorkMode("quick");
  });
  el.modeExpert?.addEventListener("click", () => {
    setPaletteWorkMode("expert");
  });
  (el.startFocusButtons || []).forEach((button) => {
    button.addEventListener("click", () => {
      focusPaletteStartPath(button.getAttribute("data-start-focus") || "");
    });
  });
  el.tourStartBtn?.addEventListener("click", () => {
    startPaletteTour({ force: true });
  });
  el.tourReplayBtn?.addEventListener("click", () => {
    startPaletteTour({ force: true });
  });
  el.tourDontShowBtn?.addEventListener("click", () => {
    markPaletteTourNever();
    showToast("Đã tắt tự động hiển thị tour cho lần truy cập tiếp theo.");
  });
  el.roomSoloBtn?.addEventListener("click", () => {
    usePaletteSoloMode({ silent: false });
  });
  el.roomRecentBtn?.addEventListener("click", async () => {
    const lastRoomId = getLastRoomId();
    if (!lastRoomId) {
      showToast("Chưa có phòng gần nhất để vào lại.");
      return;
    }
    await joinPaletteRoomFromInput(lastRoomId, { silent: false });
  });
  el.roomCreateBtn?.addEventListener("click", async () => {
    await createPaletteRoomFromCurrentState();
  });
  el.roomJoinBtn?.addEventListener("click", async () => {
    await joinPaletteRoomFromInput(el.roomJoinInput?.value || "", { silent: false });
  });
  el.roomJoinInput?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    el.roomJoinBtn?.click();
  });

  el.hexApply?.addEventListener("click", () => {
    const stops = parseHexList(el.hexInput?.value || "").slice(0, MAX_STOPS);
    if (stops.length < MIN_STOPS) {
      showToast("Hãy nhập ít nhất 2 màu hợp lệ.");
      return;
    }
    const next = applyLocks(stops);
    createUserPalette(next, "Palette từ HEX", ["hex"]);
  });

  el.harmonyApply?.addEventListener("click", () => {
    const baseHex = normalizeHex(el.baseColor?.value || "");
    if (!baseHex) {
      showToast("Chọn màu chủ đạo hợp lệ.");
      return;
    }
    const rule = el.harmonySelect?.value || "complementary";
    const generated = buildHarmonyPalette(baseHex, rule).slice(0, MAX_STOPS);
    const next = applyLocks(generated);
    createUserPalette(next, "Palette theo quy tắc hài hoà", ["harmony", rule]);
  });

  el.toneApply?.addEventListener("click", () => {
    const tone = el.toneSelect?.value || "fresh";
    const generated = buildTonePalette(tone, 5).slice(0, MAX_STOPS);
    const next = applyLocks(generated);
    createUserPalette(next, "Palette ngẫu nhiên theo tông", ["random", tone]);
  });

  el.lockClear?.addEventListener("click", () => {
    clearLocks();
  });
  renderLockRow();
  initFullscreenPalette();
  initPaletteCardCtas();
  initPresetDetail();
  initImageExtractTool();

  el.suggestBtn?.addEventListener("click", async () => {
    const goal = el.goalSelect?.value || "ui";
    if (!["ui", "brand", "embroidery", "print"].includes(goal)) {
      showToast("Mục tiêu chưa hỗ trợ.");
      return;
    }
    const source = el.sourceSelect?.value || "primary";
    const boldness = clampNumber(el.boldnessRange?.value || 35, 0, 100);
    const suggestions = buildSuggestions(goal, source, boldness);
    await enrichSuggestions(goal, suggestions);
    renderSuggestions(suggestions);
  });

  el.smartGenerate?.addEventListener("click", async () => {
    const brief = String(el.smartBrief?.value || "").trim();
    if (!brief) {
      showToast("Hãy nhập brief 1 dòng.");
      return;
    }
    const parsed = await parseBrief(brief);
    const goal = parsed.goal || "ui";
    const mood = parsed.mood || FALLBACK_KNOWLEDGE.defaults;
    const boldness = clampNumber(parsed.boldness ?? 45, 0, 100);
    const suggestions = buildSmartSuggestions(goal, mood, boldness);
    const moodLabel = mood.label || "Mặc định";
    renderSmartSuggestions(suggestions, goalDisplay(goal), moodLabel);
  });

  el.briefPick?.addEventListener("click", async () => {
    const knowledge = await loadKnowledge();
    const templates = getBriefTemplates(knowledge);
    if (!templates.length) {
      showToast("Chưa có mẫu brief.");
      return;
    }
    renderBriefIndustries(templates);
    openBriefSheet();
  });

  el.briefSheet?.querySelectorAll("[data-brief-close]").forEach((btn) => {
    btn.addEventListener("click", closeBriefSheet);
  });

  el.saveLibrary?.addEventListener("click", () => {
    const active = getActivePalette();
    if (!active) {
      showToast(t("paletteTool.library.toast.missingPalette", "Hãy chọn một bảng phối màu."));
      return;
    }
    const stops = Array.isArray(active?.stops)
      ? active.stops.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
      : [];
    const roleMap = getRoleMapForPalette(active, stops);
    const preview = getCurrentPreviewForPalette(active, PREVIEW_TABS[0]);
    const visionMode = getCurrentVisionForPalette(active, "normal");
    openLibrarySaveModal({
      palette: active,
      roleMap,
      preview,
      visionMode,
      sourceScope: getLibrarySourceScope()
    });
  });

  el.saveTeamLibrary?.addEventListener("click", () => {
    if (state.libraryScope !== "team") {
      setLibraryScope("team", { refresh: true, silent: false });
      return;
    }
    const activeTeam = getActiveTeam();
    if (!activeTeam || !canWriteTeamRole(activeTeam.role)) {
      showToast(t("paletteTool.library.toast.viewerReadOnly", "Bạn chỉ có quyền xem trong team này."));
      return;
    }
    const active = getActivePalette();
    if (!active) {
      showToast(t("paletteTool.library.toast.missingPalette", "Hãy chọn một bảng phối màu."));
      return;
    }
    const stops = Array.isArray(active?.stops)
      ? active.stops.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
      : [];
    const roleMap = getRoleMapForPalette(active, stops);
    const preview = getCurrentPreviewForPalette(active, PREVIEW_TABS[0]);
    const visionMode = getCurrentVisionForPalette(active, "normal");
    openLibrarySaveModal({
      palette: active,
      roleMap,
      preview,
      visionMode,
      sourceScope: "team"
    });
  });

  el.useLibrary?.addEventListener("click", async () => {
    el.libraryHub?.scrollIntoView({ behavior: "smooth", block: "start" });
    await loadTeamsForCurrentUser({ silent: true });
    await loadLibraryPresets();
  });

  el.share?.addEventListener("click", () => {
    const active = getActivePalette();
    if (!active) {
      showToast("Hãy chọn một bảng phối màu.");
      return;
    }
    publishToFeed(buildPaletteAsset(active));
  });

  el.roomRevisionCreate?.addEventListener("click", () => {
    createRoomRevisionMarker();
  });
  el.roomCommentFilter?.addEventListener("change", () => {
    const selected = String(el.roomCommentFilter?.value || "all").trim();
    state.room.commentFilterRole = (selected === "all" || ROLE_KEYS.includes(selected)) ? selected : "all";
    clearRoomCommentReply();
    renderRoomCommentPanel();
  });
  el.roomCommentReplyCancel?.addEventListener("click", () => {
    clearRoomCommentReply();
    renderRoomCommentPanel();
  });
  el.roomCommentComposer?.addEventListener("submit", (event) => {
    event.preventDefault();
    submitRoomComment();
  });
  el.roomCommentSubmit?.addEventListener("click", (event) => {
    if (el.roomCommentComposer?.tagName === "FORM") return;
    event.preventDefault();
    submitRoomComment();
  });

  initLibraryUiBindings();
  renderRoomRevisionPanel();
  renderRoomCommentPanel();
  window.addEventListener("pointerup", handleRoomCommitTrigger, true);
  window.addEventListener("mouseup", handleRoomCommitTrigger, true);
  window.addEventListener("touchend", handleRoomCommitTrigger, true);
  window.addEventListener("change", handleRoomCommitTrigger, true);
  const firebaseApi = getFirebaseApi();
  if (typeof firebaseApi?.onAuthStateChanged === "function") {
    firebaseApi.onAuthStateChanged(() => {
      renderRoomFlowGuide();
      loadTeamsForCurrentUser({ silent: true }).then(() => loadLibraryPresets({ silent: true }));
    });
  }
  await loadTeamsForCurrentUser({ silent: true });
  await loadLibraryPresets({ silent: true });
  renderRoomFlowGuide();
  window.setTimeout(() => {
    startPaletteTour({ force: false });
  }, 380);
}

window.addEventListener("beforeunload", cleanupRoomListener);

window.tcPaletteShareStateDebug = {
  buildShareLink(stops, options) {
    return buildShareLink(stops, options);
  },
  async buildShortShareLink(stops, options) {
    return buildShortShareLink(stops, options);
  },
  parseFromHash(hashText) {
    return parsePaletteShareStateFromHash(hashText);
  },
  async parseFromQuery(searchText) {
    return parsePaletteShareStateFromQuery(searchText);
  },
  decodeShareValue(value) {
    return decodePaletteShareState(value);
  },
  setLibraryScope(scope) {
    return setLibraryScope(scope, { refresh: false, silent: true });
  },
  async loadTeams() {
    return loadTeamsForCurrentUser({ silent: true });
  },
  async loadLibrary() {
    return loadLibraryPresets({ silent: true });
  },
  async savePreset(payload = {}) {
    const colors = Array.isArray(payload.colors)
      ? payload.colors.map((hex) => normalizeHex(hex)).filter(Boolean).map((hex) => hex.toUpperCase())
      : [];
    if (colors.length < MIN_STOPS || colors.length > MAX_STOPS) {
      return { ok: false, error: "invalid_colors" };
    }
    const scope = payload.scope === "team" ? "team" : "personal";
    const roleMap = normalizeShareRoles(payload.roles, colors.length) || autoAssignRoleMap(colors);
    if (scope === "team") {
      const teamId = String(payload.teamId || "").trim();
      const teamName = String(payload.teamName || teamId || "");
      const teamRole = normalizeTeamRole(payload.teamRole || TEAM_ROLE_OWNER);
      if (!teamId) return { ok: false, error: "missing_team" };
      state.teams = [{ id: teamId, name: teamName || teamId, role: teamRole }];
      state.selectedTeamId = teamId;
      state.libraryScope = "team";
    } else {
      state.libraryScope = "personal";
    }
    renderTeamScopeControls();
    state.librarySaveDraft = {
      mode: payload.mode === "update" ? "update" : "create",
      sourceScope: scope,
      teamId: scope === "team" ? state.selectedTeamId : "",
      teamRole: scope === "team" ? (state.teams[0]?.role || TEAM_ROLE_VIEWER) : TEAM_ROLE_VIEWER,
      targetPresetId: String(payload.presetId || ""),
      palette: {
        id: String(payload.paletteId || `dbg_${Date.now()}`),
        ten: String(payload.name || "Preset debug"),
        tags: Array.isArray(payload.tags) ? payload.tags.map((tag) => String(tag)) : [],
        stops: colors
      },
      roleMap,
      preview: PREVIEW_TABS.includes(payload.preview) ? payload.preview : PREVIEW_TABS[0],
      visionMode: PREVIEW_VISION_MODES.includes(payload.visionMode) ? payload.visionMode : "normal"
    };
    if (el.libraryNameInput) el.libraryNameInput.value = String(payload.name || "Preset debug");
    if (el.libraryTagsInput) el.libraryTagsInput.value = Array.isArray(payload.tags) ? payload.tags.join(", ") : String(payload.tags || "");
    if (el.libraryNotesInput) el.libraryNotesInput.value = String(payload.notes || "");
    const before = state.libraryPresets.map((item) => item.id);
    await saveLibraryPresetFromModal();
    await loadLibraryPresets({ silent: true });
    const after = state.libraryPresets.map((item) => item.id);
    const changed = before.join("|") !== after.join("|");
    const success = !state.librarySaveDraft;
    return {
      ok: success,
      changed,
      scope: state.libraryScope,
      selectedTeamId: state.selectedTeamId,
      presetCount: state.libraryPresets.length
    };
  },
  async removeTeamPreset(presetId) {
    const target = state.libraryPresets.find((item) => String(item.id) === String(presetId));
    if (!target) return { ok: false, error: "missing_preset" };
    const ok = await deleteTeamPreset(target);
    return { ok };
  },
  async toggleTeamLock(presetId) {
    const target = state.libraryPresets.find((item) => String(item.id) === String(presetId));
    if (!target) return { ok: false, error: "missing_preset" };
    const ok = await toggleTeamPresetLock(target);
    return { ok };
  },
  librarySnapshot() {
    return {
      scope: state.libraryScope,
      selectedTeamId: state.selectedTeamId,
      selectedTeamRole: state.selectedTeamRole,
      teams: state.teams.map((team) => ({ ...team })),
      presets: state.libraryPresets.map((item) => ({
        id: item.id,
        scope: item.scope,
        teamId: item.teamId || "",
        teamRole: item.teamRole || "",
        locked: !!item.locked,
        status: normalizeApprovalStatus(item.status),
        publishedReleaseId: String(item.publishedReleaseId || "")
      }))
    };
  },
  runtimeSnapshot() {
    const paletteId = state.hashPalette?.id || state.selectedPaletteId || "";
    return {
      selectedPaletteId: state.selectedPaletteId,
      hashPalette: state.hashPalette ? { ...state.hashPalette } : null,
      roleMap: paletteId ? state.roleMapByPaletteId.get(paletteId) || null : null,
      preview: paletteId ? state.previewTabByPaletteId.get(paletteId) || null : null,
      visionMode: paletteId ? state.previewVisionModeByPaletteId.get(paletteId) || null : null
    };
  },
  async joinRoom(roomId, options = {}) {
    return enterPaletteRoom(roomId, { silent: options.silent !== false });
  },
  leaveRoom() {
    cleanupRoomListener();
    resetRoomState();
    return { ok: true };
  },
  roomSnapshot() {
    return {
      id: state.room.id,
      name: state.room.name,
      role: state.room.role,
      readOnly: state.room.readOnly,
      status: state.room.status,
      active: state.room.active,
      baseRev: state.room.baseRev,
      currentFingerprint: state.room.currentFingerprint,
      pendingFingerprint: state.room.pendingFingerprint,
      pendingDirty: state.room.pendingDirty
    };
  },
  setPresenceDebug(entries = [], options = {}) {
    if (typeof options.active === "boolean") {
      state.room.active = options.active;
    } else if (!state.room.id && Array.isArray(entries) && entries.length) {
      state.room.active = true;
    }
    if (typeof options.roomId === "string" && options.roomId.trim()) {
      state.room.id = options.roomId.trim();
    }
    if (typeof options.selfUid === "string" && options.selfUid.trim()) {
      state.room.selfUid = options.selfUid.trim();
    }
    const nowIso = new Date().toISOString();
    const next = new Map();
    (Array.isArray(entries) ? entries : []).forEach((entry, idx) => {
      const uid = String(entry?.uid || `debug_${idx + 1}`).trim();
      const normalized = normalizePresenceDoc(uid, {
        displayName: String(entry?.displayName || ""),
        activePaletteIndex: Number.isInteger(entry?.activePaletteIndex) ? entry.activePaletteIndex : null,
        activeRoleKey: ROLE_KEYS.includes(entry?.activeRoleKey) ? entry.activeRoleKey : "",
        activePanel: String(entry?.activePanel || ""),
        lastSeenAt: entry?.lastSeenAt || nowIso
      });
      if (normalized) {
        next.set(uid, normalized);
      }
    });
    state.room.presenceByUid = next;
    renderRoomBanner();
    applyPresenceBadgesInDom();
    return {
      ok: true,
      count: next.size
    };
  },
  roomPresenceSnapshot() {
    return Array.from(state.room.presenceByUid.values()).map((entry) => ({
      uid: entry.uid,
      displayName: entry.displayName,
      activePaletteIndex: entry.activePaletteIndex,
      activeRoleKey: entry.activeRoleKey,
      activePanel: entry.activePanel,
      lastSeenAt: entry.lastSeenAt
    }));
  },
  setRoomRevisionsDebug(revisions = [], options = {}) {
    if (typeof options.roomId === "string" && options.roomId.trim()) {
      state.room.id = options.roomId.trim();
    } else if (!state.room.id) {
      state.room.id = "room_debug";
    }
    if (typeof options.active === "boolean") {
      state.room.active = options.active;
    } else {
      state.room.active = true;
    }
    if (typeof options.readOnly === "boolean") {
      state.room.readOnly = options.readOnly;
    }
    if (typeof options.role === "string") {
      state.room.role = normalizeTeamRole(options.role);
    }
    if (typeof options.selfUid === "string" && options.selfUid.trim()) {
      state.room.selfUid = options.selfUid.trim();
    }
    const nowIso = new Date().toISOString();
    const items = (Array.isArray(revisions) ? revisions : [])
      .map((item, idx) => normalizeRoomRevisionDoc(
        String(item?.id || `rev_debug_${idx + 1}`),
        {
          snapshot: item?.snapshot || {
            v: 1,
            type: "palette",
            colors: Array.isArray(item?.colors) ? item.colors : ["#0EA5E9", "#2563EB", "#0F172A", "#94A3B8", "#F8FAFC"],
            roles: item?.roles || { bg: 4, surface: 3, text: 2, muted: 1, accent: 0 },
            preview: item?.preview || "ui",
            sim: item?.sim || "normal"
          },
          createdByUid: String(item?.createdByUid || "debug_user"),
          createdAt: item?.createdAt || nowIso,
          rev: Number.isFinite(Number(item?.rev)) ? Number(item.rev) : idx + 1,
          label: String(item?.label || "")
        }
      ))
      .filter(Boolean)
      .sort((a, b) => b.rev - a.rev);
    state.room.revisions = items;
    state.room.revisionStatus = items.length ? "ready" : "empty";
    state.room.revisionPreviewId = items[0]?.id || "";
    renderRoomBanner();
    renderRoomRevisionPanel();
    return {
      ok: true,
      count: items.length
    };
  },
  revisionSnapshot() {
    return (Array.isArray(state.room.revisions) ? state.room.revisions : []).map((item) => ({
      id: item.id,
      rev: item.rev,
      createdByUid: item.createdByUid,
      createdAt: item.createdAt,
      label: item.label,
      snapshot: item.snapshot
    }));
  },
  setRoomCommentsDebug(comments = [], options = {}) {
    if (typeof options.roomId === "string" && options.roomId.trim()) {
      state.room.id = options.roomId.trim();
    } else if (!state.room.id) {
      state.room.id = "room_debug";
    }
    if (typeof options.active === "boolean") {
      state.room.active = options.active;
    } else {
      state.room.active = true;
    }
    if (typeof options.readOnly === "boolean") {
      state.room.readOnly = options.readOnly;
    }
    if (typeof options.role === "string") {
      state.room.role = normalizeTeamRole(options.role);
    }
    if (typeof options.selfUid === "string" && options.selfUid.trim()) {
      state.room.selfUid = options.selfUid.trim();
    }
    const nowIso = new Date().toISOString();
    const list = (Array.isArray(comments) ? comments : [])
      .map((item, idx) => normalizeRoomCommentDoc(
        String(item?.id || `comment_debug_${idx + 1}`),
        {
          targetType: "role",
          targetKey: ROLE_KEYS.includes(item?.targetKey) ? item.targetKey : "accent",
          threadRootId: String(item?.threadRootId || item?.id || `comment_debug_${idx + 1}`),
          parentId: String(item?.parentId || ""),
          message: String(item?.message || `Bình luận ${idx + 1}`),
          createdByUid: String(item?.createdByUid || "debug_user"),
          createdByName: String(item?.createdByName || item?.createdByUid || "Debug"),
          createdAt: item?.createdAt || nowIso,
          resolved: item?.resolved === true,
          resolvedByUid: String(item?.resolvedByUid || ""),
          resolvedByName: String(item?.resolvedByName || ""),
          resolvedAt: item?.resolvedAt || null
        }
      ))
      .filter(Boolean)
      .sort((a, b) => {
        if (a.createdAtMs !== b.createdAtMs) return a.createdAtMs - b.createdAtMs;
        return String(a.id).localeCompare(String(b.id));
      });
    state.room.comments = list;
    state.room.commentStatus = list.length ? "ready" : "empty";
    if (typeof options.filterRole === "string") {
      const filter = options.filterRole.trim();
      state.room.commentFilterRole = (filter === "all" || ROLE_KEYS.includes(filter)) ? filter : "all";
    }
    if (typeof options.replyRootId === "string") {
      state.room.commentReplyRootId = options.replyRootId.trim();
    }
    renderRoomBanner();
    renderRoomCommentPanel();
    return {
      ok: true,
      count: list.length
    };
  },
  commentSnapshot() {
    return (Array.isArray(state.room.comments) ? state.room.comments : []).map((item) => ({
      id: item.id,
      targetKey: item.targetKey,
      threadRootId: item.threadRootId,
      parentId: item.parentId || "",
      message: item.message,
      resolved: !!item.resolved,
      resolvedByUid: item.resolvedByUid || "",
      createdByUid: item.createdByUid,
      createdAt: item.createdAt
    }));
  },
  resolveCommentLocalDebug(commentId, nextResolved = true, resolvedBy = "") {
    const targetId = String(commentId || "").trim();
    if (!targetId) return false;
    let changed = false;
    state.room.comments = (Array.isArray(state.room.comments) ? state.room.comments : []).map((item) => {
      if (item.id !== targetId) return item;
      changed = true;
      if (nextResolved) {
        return {
          ...item,
          resolved: true,
          resolvedByUid: state.room.selfUid || "debug_user",
          resolvedByName: String(resolvedBy || state.room.selfDisplayName || "Debug"),
          resolvedAt: new Date().toISOString()
        };
      }
      return {
        ...item,
        resolved: false,
        resolvedByUid: "",
        resolvedByName: "",
        resolvedAt: ""
      };
    });
    if (changed) {
      renderRoomCommentPanel();
    }
    return changed;
  },
  previewRevisionDebug(revisionId) {
    const targetId = String(revisionId || "").trim();
    if (!targetId) return false;
    if (!state.room.revisions.some((item) => item.id === targetId)) return false;
    state.room.revisionPreviewId = targetId;
    renderRoomRevisionPanel();
    return true;
  },
  restoreRevisionLocalDebug(revisionId) {
    const targetId = String(revisionId || "").trim();
    const found = state.room.revisions.find((item) => item.id === targetId);
    if (!found) return { ok: false, reason: "missing_revision" };
    const applied = applyRoomSharedPalette({
      ...found.snapshot,
      rev: Number.isFinite(found.rev) ? found.rev : state.room.baseRev
    });
    return {
      ok: !!applied?.ok,
      changed: !!applied?.changed
    };
  },
  requestRoomSync(options = {}) {
    return queueRoomSync({ final: !!options.final });
  },
  async flushRoomSync(options = {}) {
    return flushRoomSyncQueue({ forceFinal: !!options.forceFinal });
  },
  forceLocalRoomState(payload = {}) {
    const normalized = normalizeShareStatePayload(payload);
    if (!normalized) return false;
    const paletteId = "room-debug-palette";
    state.hashPalette = {
      id: paletteId,
      ten: "Debug room palette",
      tags: ["debug"],
      stops: normalized.colors
    };
    state.selectedPaletteId = paletteId;
    state.roleMapByPaletteId.set(paletteId, { ...normalized.roles });
    state.previewTabByPaletteId.set(paletteId, normalized.preview);
    state.previewVisionModeByPaletteId.set(paletteId, normalized.visionMode);
    renderPalettes();
    return true;
  }
};

Promise.resolve()
  .then(() => init())
  .catch((err) => {
    console.error(err);
  });

function applyHexesFromHub(detail) {
  if (guardRoomReadonlyAction()) return;
  const rawList = Array.isArray(detail?.hexes) ? detail.hexes : [];
  const mode = detail?.mode === "append" ? "append" : "replace";
  const normalized = rawList.map((hex) => normalizeHex(hex)).filter(Boolean);
  if (normalized.length < 2) return;
  window.tcWorkbench?.setContext?.(normalized, { worldKey: "palette", source: detail?.source || "hex-apply" });
  const baseStops = mode === "append"
    ? (getActivePalette()?.stops || [])
    : [];
  const combined = [...baseStops, ...normalized];
  const unique = combined.filter((hex, idx) => combined.indexOf(hex) === idx);
  let nextStops = unique.slice(0, MAX_STOPS);
  if (nextStops.length < MIN_STOPS) {
    while (nextStops.length < MIN_STOPS) {
      nextStops.push(nextStops[nextStops.length - 1] || normalized[0]);
    }
  }
  const palette = {
    id: `hexhub_${Date.now()}`,
    ten: String(detail?.name || "Palette nhanh từ Kho HEX"),
    tags: Array.isArray(detail?.tags) && detail.tags.length ? detail.tags : ["hex", "kho-hex"],
    notes: String(detail?.notes || ""),
    stops: nextStops
  };
  state.palettes.unshift(palette);
  state.selectedPaletteId = palette.id;
  const roleMap = normalizeShareRoles(detail?.roles, nextStops.length);
  if (roleMap) {
    state.roleMapByPaletteId.set(palette.id, roleMap);
  }
  const preview = PREVIEW_TABS.includes(detail?.preview) ? detail.preview : null;
  if (preview) {
    state.previewTabByPaletteId.set(palette.id, preview);
  }
  const visionMode = PREVIEW_VISION_MODES.includes(detail?.visionMode) ? detail.visionMode : null;
  if (visionMode) {
    state.previewVisionModeByPaletteId.set(palette.id, visionMode);
  }
  renderPalettes();
  queueRoomSync();
}

window.addEventListener("tc:hex-apply", (event) => {
  applyHexesFromHub(event?.detail);
});
if (hasStrictIncoming && incomingHandoff?.hexes?.length) {
  let detail = { hexes: incomingHandoff.hexes, mode: "replace" };
  if (incomingHandoff.source === "asset" && incomingHandoff.assetId) {
    const localAsset = loadLocalPaletteAssetById(incomingHandoff.assetId);
    const preset = extractLibraryPresetFromAsset(localAsset);
    if (preset) {
      detail = {
        ...detail,
        name: preset.name,
        tags: preset.tags,
        notes: preset.notes,
        roles: preset.roles,
        preview: preset.preview,
        visionMode: preset.visionMode
      };
    }
  }
  applyHexesFromHub(detail);
  window.tcWorkbench?.setContext?.(incomingHandoff.hexes, { worldKey: "palette", source: incomingHandoff.source });
}
