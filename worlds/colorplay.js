import { resolveIncoming, normalizeHexList } from "../scripts/workbench_context.js";
import { uploadImage } from "../scripts/storage/storage_client.js";
const BOARD_SIZE = 9;
const COLORS = [
  "#ef4444",
  "#f97316",
  "#facc15",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#a855f7"
];
const INITIAL_BALLS = 5;
const LINE98_NEXT_COUNT = 3;
const BEST_SCORE_KEY = "tc_colorplay_best";
const LINE98_SAVE_KEY = "tc_colorplay_line98_save_v1";
const PILL_SAVE_KEY = "tc_colorplay_pill_save_v1";
const SUDOKU_SAVE_KEY = "tc_colorplay_sudoku_save_v1";
const COLORPLAY_SETTINGS_KEY = "tc_colorplay_settings_v1";
const LINE98_LAST_KEY = "tc_colorplay_line98_last_v1";
const PILL_LAST_KEY = "tc_colorplay_pill_last_v1";
const SUDOKU_LAST_KEY = "tc_colorplay_sudoku_last_v1";
const COLORPLAY_ASSET_KEY = "tc_asset_library_v1";
const LINE98_DAILY_BEST_KEY = "tc_colorplay_line98_daily_best_v1";
const COLORPLAY_ACHIEVEMENTS_KEY = "tc_colorplay_achievements_v1";
const LINE98_SAVE_VERSION = 1;
const PILL_SAVE_VERSION = 1;
const SUDOKU_SAVE_VERSION = 1;
const SUDOKU_BEST_KEY = "tc_colorplay_sudoku_best_v1";
const HINT_COOLDOWN_MS = 5000;
const PILL_WIDTH = 8;
const PILL_HEIGHT = 16;
const PILL_COLORS = [
  "#ef4444",
  "#3b82f6",
  "#facc15",
  "#22c55e",
  "#ec4899",
  "#f97316"
];
const PILL_BEST_KEY = "tc_colorplay_pill_best_v1";
const SUDOKU_COLORS = [
  "#ef4444",
  "#f97316",
  "#facc15",
  "#22c55e",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b"
];
const SUDOKU_SYMBOLS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const PILL_ORIENTS = [
  [{ dr: 0, dc: 0 }, { dr: 0, dc: 1 }],
  [{ dr: 0, dc: 0 }, { dr: 1, dc: 0 }],
  [{ dr: 0, dc: 0 }, { dr: 0, dc: -1 }],
  [{ dr: 0, dc: 0 }, { dr: -1, dc: 0 }]
];

let line98Root = null;
let line98Mounted = false;
let tooltipCleanup = [];

let pillRoot = null;
let pillMounted = false;
let pillDropTimer = null;
let pillEl = {};
let pillControlCleanup = [];

let sudokuRoot = null;
let sudokuMounted = false;
let sudokuTimer = null;
let sudokuSaveTimer = null;
let sudokuHintTimer = null;
let sudokuStatusTimer = null;
let sudokuEl = {};

let lobbyCards = [];
let lobbyTriggers = [];
let lobbyLine98Mount = null;
let lobbyPillMount = null;
let lobbySudokuMount = null;
let lobbyRoot = null;
let line98ResumeRequested = false;
let pillResumeRequested = false;
let sudokuResumeRequested = false;
let focusCard = null;
let achievementListEl = null;
let hintFrame = null;

let el = {};

const LINE98_PRESETS = {
  easy: { label: "Dễ", colorCount: 5, spawnCount: 2, movesLimit: 28 },
  medium: { label: "Vừa", colorCount: 6, spawnCount: 3, movesLimit: 22 },
  hard: { label: "Khó", colorCount: 7, spawnCount: 4, movesLimit: 18 }
};

const PILL_PRESETS = {
  easy: { label: "Chậm", dropMs: 700, colorCount: 4 },
  medium: { label: "Vừa", dropMs: 520, colorCount: 5 },
  hard: { label: "Nhanh", dropMs: 380, colorCount: 6 }
};

const SUDOKU_PRESETS = {
  easy: { label: "Dễ", min: 42, max: 45 },
  medium: { label: "Vừa", min: 34, max: 36 },
  hard: { label: "Khó", min: 28, max: 30 },
  expert: { label: "Siêu khó", min: 22, max: 26 }
};

const settings = {
  line98Difficulty: "medium",
  pillDifficulty: "medium",
  colorBlind: false
};

const incomingHandoff = resolveIncoming({ search: window.location.search, hash: window.location.hash });

const state = {
  board: [],
  cells: [],
  selected: null,
  score: 0,
  combo: 0,
  best: 0,
  moves: 0,
  nextQueue: [],
  gameOver: false,
  locked: false,
  undo: null,
  soundOn: true,
  helpOpen: false,
  paused: false,
  autoPaused: false,
  colorCount: LINE98_PRESETS.medium.colorCount,
  spawnCount: LINE98_PRESETS.medium.spawnCount,
  movesLimit: LINE98_PRESETS.medium.movesLimit,
  startedAt: null,
  elapsedMs: 0,
  mode: "normal",
  dailySeed: "",
  rng: null,
  rngState: 0,
  hintOn: false,
  hintCooldownUntil: 0,
  hintPath: [],
  hintMove: null,
  customPalette: null
};

const pillState = {
  grid: [],
  cells: [],
  active: null,
  next: null,
  score: 0,
  best: 0,
  gameOver: false,
  locked: false,
  helpOpen: false,
  paused: false,
  autoPaused: false,
  dropMs: PILL_PRESETS.medium.dropMs,
  colorCount: PILL_PRESETS.medium.colorCount,
  startedAt: null,
  elapsedMs: 0,
  hardDrops: 0,
  piecesLocked: 0,
  customPalette: null
};

const sudokuState = {
  difficulty: "easy",
  colors: [...SUDOKU_COLORS],
  solution: [],
  current: [],
  givens: [],
  selectedColor: 0,
  selectedCell: null,
  eraseMode: false,
  showSymbols: false,
  mistakes: 0,
  elapsedSeconds: 0,
  elapsedBase: 0,
  startedAt: null,
  paused: false,
  autoPaused: false,
  gameOver: false,
  hintCooldownUntil: 0,
  lastMistakeAt: 0,
  hintsLeft: null
};

function clampNumber(value, min, max) {
  const num = Number(value);
  if (Number.isNaN(num)) return min;
  return Math.max(min, Math.min(max, num));
}

function formatDuration(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function getLinePreset(key) {
  return LINE98_PRESETS[key] || LINE98_PRESETS.medium;
}

function getPillPreset(key) {
  return PILL_PRESETS[key] || PILL_PRESETS.medium;
}

function getSudokuPreset(key) {
  return SUDOKU_PRESETS[key] || SUDOKU_PRESETS.easy;
}

function getSudokuHintLimit(difficulty) {
  switch (difficulty) {
    case "medium":
      return 3;
    case "hard":
      return 2;
    case "expert":
      return 1;
    default:
      return Infinity;
  }
}

function getSudokuInitialHints(difficulty) {
  const limit = getSudokuHintLimit(difficulty);
  return Number.isFinite(limit) ? limit : null;
}

function loadSettings() {
  try {
    const raw = localStorage.getItem(COLORPLAY_SETTINGS_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (parsed && typeof parsed === "object") {
      if (LINE98_PRESETS[parsed.line98Difficulty]) settings.line98Difficulty = parsed.line98Difficulty;
      if (PILL_PRESETS[parsed.pillDifficulty]) settings.pillDifficulty = parsed.pillDifficulty;
      settings.colorBlind = Boolean(parsed.colorBlind);
    }
  } catch (_err) {
    // ignore
  }
}

function saveSettings() {
  try {
    localStorage.setItem(COLORPLAY_SETTINGS_KEY, JSON.stringify({
      line98Difficulty: settings.line98Difficulty,
      pillDifficulty: settings.pillDifficulty,
      colorBlind: settings.colorBlind
    }));
  } catch (_err) {
    // ignore
  }
}

function applyColorBlindMode() {
  document.body.classList.toggle("colorplay-colorblind", settings.colorBlind);
}

const buildPaletteForCount = (list, count, fallback) => {
  const base = Array.isArray(list) && list.length ? list : fallback;
  if (!Array.isArray(base) || !base.length) return [];
  const total = Math.max(1, Number(count) || 1);
  const output = [];
  for (let i = 0; i < total; i += 1) {
    output.push(base[i] || base[base.length - 1]);
  }
  return output;
};

function getLineColors() {
  return buildPaletteForCount(state.customPalette, state.colorCount, COLORS);
}

function getPillColors() {
  return buildPaletteForCount(pillState.customPalette, pillState.colorCount, PILL_COLORS);
}

const applyHexPalette = (hexes) => {
  const normalized = normalizeHexList(hexes);
  if (!normalized.length) return false;
  state.customPalette = normalized;
  pillState.customPalette = normalized;
  window.tcWorkbench?.setContext?.(normalized, { worldKey: "colorplay", source: "hex-apply" });
  renderBoardState();
  renderUpcoming();
  renderPillBoard();
  renderPillNext();
  return true;
};

function safeParseJSON(raw, fallback = null) {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (_err) {
    return fallback;
  }
}

function isTypingContext(target) {
  const el = target;
  if (!el || typeof el !== "object") return false;
  const tag = el.tagName || "";
  if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) return true;
  if (el.isContentEditable) return true;
  return false;
}

async function copyText(text) {
  if (!text) return false;
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_err) {
      // fallback below
    }
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "readonly");
  textarea.style.position = "fixed";
  textarea.style.top = "-1000px";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (_err) {
    ok = false;
  }
  textarea.remove();
  return ok;
}

function downloadBlob(data, filename, type = "application/octet-stream") {
  const blob = data instanceof Blob ? data : new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "download";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 200);
}

function downloadCanvas(canvas, filename) {
  if (!canvas) return;
  if (canvas.toBlob) {
    canvas.toBlob((blob) => {
      if (blob) downloadBlob(blob, filename, "image/png");
    }, "image/png");
    return;
  }
  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "colorplay.png";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

const captureCanvasImage = (canvas, type = "image/png") => new Promise((resolve) => {
  if (!canvas) {
    resolve(null);
    return;
  }
  if (canvas.toBlob) {
    canvas.toBlob((blob) => resolve(blob || null), type);
    return;
  }
  try {
    resolve(canvas.toDataURL(type));
  } catch (_err) {
    resolve(null);
  }
});

function formatDateSeed(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function hashSeed(value) {
  const text = String(value || "");
  let hash = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createSeededRng(seed) {
  let stateValue = hashSeed(seed);
  return {
    next() {
      stateValue += 0x6D2B79F5;
      let t = Math.imul(stateValue ^ (stateValue >>> 15), 1 | stateValue);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
    getState() {
      return stateValue >>> 0;
    },
    setState(value) {
      const num = Number(value);
      if (Number.isFinite(num)) {
        stateValue = num >>> 0;
      }
    }
  };
}

function lineRandom() {
  if (state.rng) {
    const value = state.rng.next();
    state.rngState = state.rng.getState();
    return value;
  }
  return Math.random();
}

function getTodaySeed() {
  return formatDateSeed(new Date());
}

function applyLine98Mode(mode, seed, rngState) {
  state.mode = mode === "daily" ? "daily" : "normal";
  state.dailySeed = state.mode === "daily" ? String(seed || getTodaySeed()) : "";
  if (state.mode === "daily") {
    state.rng = createSeededRng(state.dailySeed);
    if (Number.isFinite(rngState) && rngState) {
      state.rng.setState(rngState);
    }
    state.rngState = state.rng.getState();
  } else {
    state.rng = null;
    state.rngState = 0;
  }
  updateDailyUI();
}

function loadDailyBestMap() {
  const raw = safeParseJSON(localStorage.getItem(LINE98_DAILY_BEST_KEY), {});
  return raw && typeof raw === "object" ? raw : {};
}

function getDailyBest(seed) {
  const map = loadDailyBestMap();
  const value = Number(map[seed]);
  return Number.isFinite(value) ? value : 0;
}

function setDailyBest(seed, score) {
  const map = loadDailyBestMap();
  const current = Number(map[seed]) || 0;
  if (score > current) {
    map[seed] = score;
    try {
      localStorage.setItem(LINE98_DAILY_BEST_KEY, JSON.stringify(map));
    } catch (_err) {
      // ignore
    }
  }
}

const ACHIEVEMENTS = [
  { id: "line98_first_move", name: "Bước mở màn", desc: "Thực hiện 1 nước đi đầu tiên (Line 98)." },
  { id: "line98_combo_2", name: "Combo đôi", desc: "Tạo combo 2 lần liên tiếp." },
  { id: "line98_combo_3", name: "Combo ba", desc: "Tạo combo 3 lần liên tiếp." },
  { id: "line98_score_200", name: "200 điểm", desc: "Đạt 200 điểm trong Line 98." },
  { id: "line98_score_500", name: "500 điểm", desc: "Đạt 500 điểm trong Line 98." },
  { id: "line98_long_clear", name: "Chuỗi dài", desc: "Xoá một chuỗi 7+ bi." },
  { id: "line98_survive_30", name: "Sống dai", desc: "Đi được 30 bước trong một ván." },
  { id: "line98_daily_complete", name: "Hoàn thành thử thách", desc: "Kết thúc thử thách hôm nay." },
  { id: "pill_first_clear", name: "Dọn hàng", desc: "Xoá 1 cụm màu trong Xếp thuốc." },
  { id: "pill_score_200", name: "200 điểm (Pill)", desc: "Đạt 200 điểm trong Xếp thuốc." },
  { id: "pill_score_500", name: "500 điểm (Pill)", desc: "Đạt 500 điểm trong Xếp thuốc." },
  { id: "pill_hard_drop_10", name: "Thả nhanh 10 lần", desc: "Dùng thả nhanh 10 lần." },
  { id: "pill_survive_40", name: "Trụ lâu", desc: "Khoá 40 viên thuốc." }
];

let achievementState = safeParseJSON(localStorage.getItem(COLORPLAY_ACHIEVEMENTS_KEY), {});
if (!achievementState || typeof achievementState !== "object") {
  achievementState = {};
}
if (!achievementState.unlocked) {
  achievementState.unlocked = {};
}

function saveAchievementState() {
  try {
    localStorage.setItem(COLORPLAY_ACHIEVEMENTS_KEY, JSON.stringify(achievementState));
  } catch (_err) {
    // ignore
  }
}

function isAchievementUnlocked(id) {
  return Boolean(achievementState?.unlocked?.[id]);
}

function unlockAchievement(id) {
  if (!id) return;
  achievementState.unlocked = achievementState.unlocked || {};
  if (achievementState.unlocked[id]) return;
  achievementState.unlocked[id] = {
    unlockedAt: new Date().toISOString()
  };
  saveAchievementState();
  const meta = ACHIEVEMENTS.find((item) => item.id === id);
  if (meta) showToast(`Mở khoá: ${meta.name}.`);
  renderAchievements();
}

function renderAchievements() {
  if (!achievementListEl) return;
  achievementListEl.textContent = "";
  ACHIEVEMENTS.forEach((item) => {
    const card = document.createElement("div");
    card.className = "tc-achievement-card" + (isAchievementUnlocked(item.id) ? "" : " is-locked");
    const meta = document.createElement("div");
    meta.className = "tc-achievement-meta";
    const title = document.createElement("div");
    title.className = "tc-achievement-title";
    title.textContent = item.name;
    const status = document.createElement("span");
    status.className = "tc-muted";
    status.textContent = isAchievementUnlocked(item.id) ? "Đã mở" : "Chưa mở";
    meta.appendChild(title);
    meta.appendChild(status);
    const desc = document.createElement("p");
    desc.className = "tc-muted text-xs";
    desc.textContent = item.desc;
    card.appendChild(meta);
    card.appendChild(desc);
    achievementListEl.appendChild(card);
  });
}

function showStatus(message) {
  if (!el.status) return;
  el.status.textContent = message;
}

function showToast(message) {
  if (!message) return;
  let toast = document.getElementById("colorplayToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "colorplayToast";
    toast.className = "tc-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast._timer);
  showToast._timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1600);
}

function loadBestScore() {
  try {
    const raw = localStorage.getItem(BEST_SCORE_KEY);
    const value = Number(raw);
    return Number.isFinite(value) ? value : 0;
  } catch (_err) {
    return 0;
  }
}

function saveBestScore(score) {
  try {
    localStorage.setItem(BEST_SCORE_KEY, String(score));
  } catch (_err) {
    // ignore
  }
}

function getLineElapsedMs() {
  if (!state.startedAt) return state.elapsedMs || 0;
  if (state.paused) return state.elapsedMs || 0;
  return (state.elapsedMs || 0) + (Date.now() - state.startedAt);
}

function getPillElapsedMs() {
  if (!pillState.startedAt) return pillState.elapsedMs || 0;
  if (pillState.paused) return pillState.elapsedMs || 0;
  return (pillState.elapsedMs || 0) + (Date.now() - pillState.startedAt);
}

function getSudokuElapsedSeconds() {
  if (!sudokuState.startedAt) return sudokuState.elapsedSeconds || 0;
  if (sudokuState.paused) return sudokuState.elapsedSeconds || 0;
  const delta = Math.floor((Date.now() - sudokuState.startedAt) / 1000);
  return (sudokuState.elapsedSeconds || 0) + delta;
}

function pauseLine98(isAuto = false) {
  if (state.paused || state.gameOver) return;
  state.elapsedMs = getLineElapsedMs();
  state.startedAt = null;
  state.paused = true;
  state.autoPaused = isAuto;
  if (isAuto) showStatus("Tạm dừng do rời tab.");
  clearHint();
}

function resumeLine98(isAuto = false) {
  if (!state.paused || state.gameOver) return;
  state.paused = false;
  state.autoPaused = false;
  state.startedAt = Date.now();
  if (isAuto) showStatus("Đã tiếp tục.");
  scheduleHint();
}

function pausePill(isAuto = false) {
  if (pillState.paused || pillState.gameOver) return;
  pillState.elapsedMs = getPillElapsedMs();
  pillState.startedAt = null;
  pillState.paused = true;
  pillState.autoPaused = isAuto;
  stopPillLoop();
  if (isAuto) showPillStatus("Tạm dừng do rời tab.");
}

function resumePill(isAuto = false) {
  if (!pillState.paused || pillState.gameOver) return;
  pillState.paused = false;
  pillState.autoPaused = false;
  pillState.startedAt = Date.now();
  startPillLoop();
  if (isAuto) showPillStatus("Đã tiếp tục.");
}

function startSudokuTimer() {
  stopSudokuTimer();
  sudokuTimer = window.setInterval(() => {
    if (!sudokuMounted || sudokuState.paused || sudokuState.gameOver) return;
    renderSudokuMetrics();
  }, 1000);
}

function stopSudokuTimer() {
  if (sudokuTimer) {
    window.clearInterval(sudokuTimer);
    sudokuTimer = null;
  }
}

function pauseSudoku(isAuto = false) {
  if (sudokuState.paused || sudokuState.gameOver) return;
  sudokuState.elapsedSeconds = getSudokuElapsedSeconds();
  sudokuState.startedAt = null;
  sudokuState.paused = true;
  sudokuState.autoPaused = isAuto;
  stopSudokuTimer();
  if (isAuto) showSudokuStatus("Tạm dừng do rời tab.");
}

function resumeSudoku(isAuto = false) {
  if (!sudokuState.paused || sudokuState.gameOver) return;
  sudokuState.paused = false;
  sudokuState.autoPaused = false;
  sudokuState.startedAt = Date.now();
  startSudokuTimer();
  if (isAuto) showSudokuStatus("Đã tiếp tục.");
}

function createEmptyBoard() {
  return Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => null));
}

function generateNextQueue(count) {
  const palette = getLineColors();
  const total = palette.length || COLORS.length;
  const size = count || LINE98_NEXT_COUNT;
  return Array.from({ length: size }, () => Math.floor(lineRandom() * total));
}

function getEmptyCells() {
  const empty = [];
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      if (state.board[row][col] == null) {
        empty.push({ row, col });
      }
    }
  }
  return empty;
}

function renderBoardShell() {
  if (!el.board) return;
  el.board.innerHTML = "";
  state.cells = [];
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    const rowCells = [];
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "tc-colorplay-cell";
      cell.setAttribute("aria-label", `Ô hàng ${row + 1}, cột ${col + 1}`);
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);
      el.board.appendChild(cell);
      rowCells.push(cell);
    }
    state.cells.push(rowCells);
  }
}

function renderBoardState() {
  if (!state.cells.length) return;
  let hintMap = null;
  let hintLastIndex = -1;
  if (Array.isArray(state.hintPath) && state.hintPath.length) {
    hintMap = new Map();
    state.hintPath.forEach((step, idx) => {
      hintMap.set(`${step.row}:${step.col}`, idx);
    });
    hintLastIndex = state.hintPath.length - 1;
  }
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const cell = state.cells[row][col];
      const colorIndex = state.board[row][col];
      const isSelected = state.selected && state.selected.row === row && state.selected.col === col;
      cell.classList.toggle("is-selected", isSelected);
      const hintIndex = hintMap ? hintMap.get(`${row}:${col}`) : null;
      cell.classList.toggle("tc-colorplay-hint", hintIndex != null);
      cell.classList.toggle("is-hint-from", hintIndex === 0);
      cell.classList.toggle("is-hint-to", hintIndex === hintLastIndex && hintLastIndex >= 0);
      if (colorIndex == null) {
        cell.classList.remove("has-ball");
        cell.innerHTML = "";
        continue;
      }
      cell.classList.add("has-ball");
      let ball = cell.querySelector(".tc-colorplay-ball");
      if (!ball) {
        ball = document.createElement("span");
        ball.className = "tc-colorplay-ball";
        cell.appendChild(ball);
      }
      ball.classList.remove("is-clearing");
      const palette = getLineColors();
      ball.style.background = palette[colorIndex] || COLORS[colorIndex] || COLORS[0];
      ball.dataset.color = String(colorIndex);
    }
  }
}

function renderStats() {
  if (el.score) el.score.textContent = String(state.score);
  if (el.combo) el.combo.textContent = String(state.combo);
  if (el.best) el.best.textContent = String(state.best);
  if (el.moves) {
    if (state.movesLimit) {
      const left = Math.max(0, state.movesLimit - state.moves);
      el.moves.textContent = String(left);
    } else {
      el.moves.textContent = state.moves ? String(state.moves) : "--";
    }
  }
}

function updateDailyUI() {
  if (el.dailySeed) {
    const seed = state.dailySeed || getTodaySeed();
    el.dailySeed.textContent = seed;
  }
  if (el.dailyBest) {
    const seed = state.dailySeed || getTodaySeed();
    el.dailyBest.textContent = String(getDailyBest(seed));
  }
  if (el.dailyMode) {
    el.dailyMode.textContent = state.mode === "daily" ? "Đang thử thách" : "Chế độ thường";
  }
  if (el.dailyBtn) {
    el.dailyBtn.textContent = state.mode === "daily" ? "Chơi thường" : "Thử thách hôm nay";
  }
}

function renderUpcoming() {
  if (!el.next) return;
  el.next.innerHTML = "";
  const palette = getLineColors();
  state.nextQueue.forEach((colorIndex) => {
    const dot = document.createElement("span");
    dot.className = "tc-colorplay-next-dot";
    const hex = palette[colorIndex] || COLORS[colorIndex] || COLORS[0];
    dot.style.background = hex;
    dot.setAttribute("aria-label", `Màu sắp ra ${hex.toUpperCase()}`);
    el.next.appendChild(dot);
  });
}

function updateBestScore() {
  if (state.score > state.best) {
    state.best = state.score;
    saveBestScore(state.best);
    updateLobbyStats();
  }
}

function formatLastRun(run) {
  if (!run) return "--";
  const score = Number(run.score || 0);
  const durationMs = Number(run.durationMs || 0);
  const parts = [`${score} điểm`];
  if (durationMs > 0) parts.push(formatDuration(durationMs));
  return parts.join(" · ");
}

function getLine98LastRun() {
  return safeParseJSON(localStorage.getItem(LINE98_LAST_KEY), null);
}

function getPillLastRun() {
  return safeParseJSON(localStorage.getItem(PILL_LAST_KEY), null);
}

function saveLine98LastRun(payload) {
  if (!payload) return;
  try {
    localStorage.setItem(LINE98_LAST_KEY, JSON.stringify(payload));
  } catch (_err) {
    // ignore
  }
}

function savePillLastRun(payload) {
  if (!payload) return;
  try {
    localStorage.setItem(PILL_LAST_KEY, JSON.stringify(payload));
  } catch (_err) {
    // ignore
  }
}

function formatSudokuDuration(seconds) {
  return formatDuration(Math.max(0, Number(seconds) || 0) * 1000);
}

function formatSudokuLastRun(run) {
  if (!run) return "--";
  const preset = getSudokuPreset(run.difficulty);
  const durationSec = Number(run.durationSec || 0);
  const mistakes = Number(run.mistakes || 0);
  const parts = [preset.label];
  if (durationSec > 0) parts.push(formatSudokuDuration(durationSec));
  if (mistakes > 0) parts.push(`${mistakes} lỗi`);
  return parts.join(" · ");
}

function getSudokuLastRun() {
  return safeParseJSON(localStorage.getItem(SUDOKU_LAST_KEY), null);
}

function saveSudokuLastRun(payload) {
  if (!payload) return;
  try {
    localStorage.setItem(SUDOKU_LAST_KEY, JSON.stringify(payload));
  } catch (_err) {
    // ignore
  }
}

function loadSudokuBestMap() {
  const raw = safeParseJSON(localStorage.getItem(SUDOKU_BEST_KEY), {});
  return raw && typeof raw === "object" ? raw : {};
}

function getSudokuBestOverall() {
  const map = loadSudokuBestMap();
  let best = null;
  let bestDifficulty = "";
  Object.keys(SUDOKU_PRESETS).forEach((key) => {
    const value = Number(map[key]);
    if (!Number.isFinite(value) || value <= 0) return;
    if (best == null || value < best) {
      best = value;
      bestDifficulty = key;
    }
  });
  if (best == null) return null;
  return { seconds: best, difficulty: bestDifficulty };
}

function updateSudokuBest(seconds, difficulty) {
  const presetKey = SUDOKU_PRESETS[difficulty] ? difficulty : "easy";
  const map = loadSudokuBestMap();
  const value = Math.max(1, Math.floor(Number(seconds) || 0));
  const current = Number(map[presetKey]) || 0;
  if (!current || value < current) {
    map[presetKey] = value;
    try {
      localStorage.setItem(SUDOKU_BEST_KEY, JSON.stringify(map));
    } catch (_err) {
      // ignore
    }
    return true;
  }
  return false;
}

function snapshotState() {
  return {
    board: state.board.map((row) => row.slice()),
    score: state.score,
    combo: state.combo,
    moves: state.moves,
    nextQueue: [...state.nextQueue],
    gameOver: state.gameOver,
    rngState: state.rngState
  };
}

function restoreSnapshot(snapshot) {
  if (!snapshot) return;
  state.board = snapshot.board.map((row) => row.slice());
  state.score = snapshot.score;
  state.combo = snapshot.combo;
  state.moves = snapshot.moves;
  state.nextQueue = [...snapshot.nextQueue];
  state.gameOver = snapshot.gameOver;
  if (state.rng && Number.isFinite(snapshot.rngState)) {
    state.rng.setState(snapshot.rngState);
    state.rngState = snapshot.rngState;
  }
  state.selected = null;
  renderBoardState();
  renderStats();
  renderUpcoming();
  scheduleHint();
}

function buildLine98Summary(data = {}) {
  const score = Number(data.score ?? state.score ?? 0);
  const best = Number(data.best ?? state.best ?? 0);
  const difficulty = data.difficulty || settings.line98Difficulty;
  const mode = data.mode || state.mode;
  const modeLabel = mode === "daily" ? "Thử thách" : "Thường";
  const preset = getLinePreset(difficulty);
  const durationMs = Number(data.durationMs ?? getLineElapsedMs() ?? 0);
  const moves = Number(data.moves ?? state.moves ?? 0);
  const limit = Number(data.movesLimit ?? state.movesLimit ?? 0);
  const moveLabel = limit ? `${moves}/${limit} bước` : `${moves} bước`;
  return `Line 98 • ${modeLabel} • Điểm: ${score} • Kỷ lục: ${best} • Độ khó: ${preset.label} • ${moveLabel} • ${formatDuration(durationMs)}`;
}

function buildPillSummary(data = {}) {
  const score = Number(data.score ?? pillState.score ?? 0);
  const best = Number(data.best ?? pillState.best ?? 0);
  const difficulty = data.difficulty || settings.pillDifficulty;
  const preset = getPillPreset(difficulty);
  const durationMs = Number(data.durationMs ?? getPillElapsedMs() ?? 0);
  return `Xếp thuốc • Điểm: ${score} • Kỷ lục: ${best} • Tốc độ: ${preset.label} • ${formatDuration(durationMs)}`;
}

function normalizeLine98Board(board, colorCount) {
  if (!Array.isArray(board) || board.length !== BOARD_SIZE) return null;
  const normalized = [];
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    const sourceRow = board[row];
    if (!Array.isArray(sourceRow) || sourceRow.length !== BOARD_SIZE) return null;
    const nextRow = sourceRow.map((cell) => {
      if (cell == null) return null;
      const num = Number(cell);
      if (!Number.isInteger(num)) return null;
      if (num < 0 || num >= colorCount) return null;
      return num;
    });
    normalized.push(nextRow);
  }
  return normalized;
}

function normalizeLine98Queue(queue, colorCount, spawnCount) {
  const size = clampNumber(spawnCount, 1, 8);
  if (!Array.isArray(queue)) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * colorCount));
  }
  const list = queue
    .map((value) => Number(value))
    .filter((value) => Number.isInteger(value) && value >= 0 && value < colorCount);
  while (list.length < size) {
    list.push(Math.floor(Math.random() * colorCount));
  }
  return list.slice(0, size);
}

function readLine98Save() {
  const parsed = safeParseJSON(localStorage.getItem(LINE98_SAVE_KEY), null);
  if (!parsed || parsed.version !== LINE98_SAVE_VERSION) return null;
  const data = parsed.data || parsed.state;
  if (!data) return null;
  const mode = data.mode === "daily" ? "daily" : "normal";
  const seed = typeof data.seed === "string" && data.seed ? data.seed : (mode === "daily" ? getTodaySeed() : "");
  const rngState = Number.isFinite(data.rngState) ? Number(data.rngState) : 0;
  const colorCount = clampNumber(data.colorCount, 3, COLORS.length);
  const spawnCount = clampNumber(data.spawnCount, 1, 6);
  const board = normalizeLine98Board(data.board, colorCount);
  if (!board) return null;
  const nextQueue = normalizeLine98Queue(data.nextQueue, colorCount, spawnCount);
  return {
    version: parsed.version,
    savedAt: parsed.savedAt || "",
    difficulty: parsed.difficulty || settings.line98Difficulty,
    data: {
      board,
      score: clampNumber(data.score, 0, 1000000),
      combo: clampNumber(data.combo, 0, 99),
      moves: clampNumber(data.moves, 0, 9999),
      nextQueue,
      colorCount,
      spawnCount,
      movesLimit: clampNumber(data.movesLimit, 0, 999),
      elapsedMs: clampNumber(data.elapsedMs, 0, 1000 * 60 * 300),
      mode,
      seed,
      rngState
    }
  };
}

function hasLine98Save() {
  return Boolean(readLine98Save());
}

function applyLine98Save(payload) {
  if (!payload?.data) return false;
  const data = payload.data;
  applyLine98Mode(data.mode, data.seed, data.rngState);
  if (LINE98_PRESETS[payload.difficulty]) {
    settings.line98Difficulty = payload.difficulty;
  }
  saveSettings();
  if (el.difficulty) el.difficulty.value = settings.line98Difficulty;
  state.colorCount = data.colorCount;
  state.spawnCount = data.spawnCount;
  state.movesLimit = data.movesLimit;
  state.board = data.board.map((row) => row.slice());
  state.score = data.score;
  state.combo = data.combo;
  state.moves = data.moves;
  state.best = loadBestScore();
  state.nextQueue = [...data.nextQueue];
  state.selected = null;
  state.gameOver = false;
  state.locked = false;
  state.undo = null;
  state.paused = false;
  state.autoPaused = false;
  state.elapsedMs = data.elapsedMs || 0;
  state.startedAt = Date.now();
  closeLine98Endscreen();
  updateUndoState();
  renderBoardState();
  renderStats();
  renderUpcoming();
  showStatus("Đã khôi phục ván đang chơi.");
  scheduleHint();
  return true;
}

function saveLine98Progress() {
  if (!line98Root) return;
  if (state.gameOver) {
    clearLine98Progress();
    return;
  }
  const payload = {
    version: LINE98_SAVE_VERSION,
    savedAt: new Date().toISOString(),
    difficulty: settings.line98Difficulty,
    data: {
      board: state.board.map((row) => row.slice()),
      score: state.score,
      combo: state.combo,
      moves: state.moves,
      nextQueue: [...state.nextQueue],
      colorCount: state.colorCount,
      spawnCount: state.spawnCount,
      movesLimit: state.movesLimit,
      elapsedMs: getLineElapsedMs(),
      mode: state.mode,
      seed: state.dailySeed,
      rngState: state.rngState
    }
  };
  try {
    localStorage.setItem(LINE98_SAVE_KEY, JSON.stringify(payload));
  } catch (_err) {
    // ignore
  }
  updateLobbyStats();
}

function clearLine98Progress() {
  try {
    localStorage.removeItem(LINE98_SAVE_KEY);
  } catch (_err) {
    // ignore
  }
  updateLobbyStats();
}

function normalizePillGrid(grid, colorCount) {
  if (!Array.isArray(grid) || grid.length !== PILL_HEIGHT) return null;
  const normalized = [];
  for (let row = 0; row < PILL_HEIGHT; row += 1) {
    const sourceRow = grid[row];
    if (!Array.isArray(sourceRow) || sourceRow.length !== PILL_WIDTH) return null;
    normalized.push(sourceRow.map((cell) => {
      if (!cell) return null;
      const idx = Number(cell.colorIndex);
      if (!Number.isInteger(idx) || idx < 0 || idx >= colorCount) return null;
      return { colorIndex: idx };
    }));
  }
  return normalized;
}

function normalizePillPiece(piece, colorCount) {
  if (!piece || typeof piece !== "object") return null;
  const row = clampNumber(piece.row, 0, PILL_HEIGHT);
  const col = clampNumber(piece.col, -1, PILL_WIDTH);
  const orientation = clampNumber(piece.orientation, 0, PILL_ORIENTS.length - 1);
  const colors = Array.isArray(piece.colors) ? piece.colors : [];
  if (colors.length !== 2) return null;
  const normColors = colors
    .map((value) => Number(value))
    .map((value) => (Number.isInteger(value) && value >= 0 && value < colorCount ? value : 0));
  return {
    row,
    col,
    orientation,
    colors: normColors
  };
}

function readPillSave() {
  const parsed = safeParseJSON(localStorage.getItem(PILL_SAVE_KEY), null);
  if (!parsed || parsed.version !== PILL_SAVE_VERSION) return null;
  const data = parsed.data || parsed.state;
  if (!data) return null;
  const colorCount = clampNumber(data.colorCount, 3, PILL_COLORS.length);
  const grid = normalizePillGrid(data.grid, colorCount);
  if (!grid) return null;
  const active = normalizePillPiece(data.active, colorCount);
  const next = Array.isArray(data.next)
    ? data.next.map((value) => Number(value)).filter((value) => Number.isInteger(value) && value >= 0 && value < colorCount)
    : [];
  if (next.length !== 2) return null;
  return {
    version: parsed.version,
    savedAt: parsed.savedAt || "",
    difficulty: parsed.difficulty || settings.pillDifficulty,
    data: {
      grid,
      active,
      next,
      score: clampNumber(data.score, 0, 1000000),
      dropMs: clampNumber(data.dropMs, 200, 1200),
      colorCount,
      elapsedMs: clampNumber(data.elapsedMs, 0, 1000 * 60 * 300),
      hardDrops: clampNumber(data.hardDrops, 0, 9999),
      piecesLocked: clampNumber(data.piecesLocked, 0, 9999)
    }
  };
}

function hasPillSave() {
  return Boolean(readPillSave());
}

function applyPillSave(payload) {
  if (!payload?.data) return false;
  if (PILL_PRESETS[payload.difficulty]) {
    settings.pillDifficulty = payload.difficulty;
  }
  saveSettings();
  if (pillEl.difficulty) pillEl.difficulty.value = settings.pillDifficulty;
  const data = payload.data;
  pillState.grid = data.grid.map((row) => row.map((cell) => (cell ? { ...cell } : null)));
  pillState.active = data.active;
  pillState.next = data.next;
  pillState.score = data.score;
  pillState.best = loadPillBestScore();
  pillState.dropMs = data.dropMs;
  pillState.colorCount = data.colorCount;
  pillState.gameOver = false;
  pillState.locked = false;
  pillState.helpOpen = false;
  pillState.paused = false;
  pillState.autoPaused = false;
  pillState.elapsedMs = data.elapsedMs || 0;
  pillState.hardDrops = data.hardDrops || 0;
  pillState.piecesLocked = data.piecesLocked || 0;
  pillState.startedAt = Date.now();
  renderPillStats();
  renderPillNext();
  renderPillBoard();
  if (!pillState.active) {
    spawnPillPiece();
  }
  closePillEndscreen();
  startPillLoop();
  showPillStatus("Đã khôi phục ván đang chơi.");
  return true;
}

function savePillProgress() {
  if (!pillRoot) return;
  if (pillState.gameOver) {
    clearPillProgress();
    return;
  }
  const payload = {
    version: PILL_SAVE_VERSION,
    savedAt: new Date().toISOString(),
    difficulty: settings.pillDifficulty,
    data: {
      grid: pillState.grid.map((row) => row.map((cell) => (cell ? { ...cell } : null))),
      active: pillState.active ? { ...pillState.active, colors: [...pillState.active.colors] } : null,
      next: pillState.next ? [...pillState.next] : createPillPiece(),
      score: pillState.score,
      dropMs: pillState.dropMs,
      colorCount: pillState.colorCount,
      elapsedMs: getPillElapsedMs(),
      hardDrops: pillState.hardDrops,
      piecesLocked: pillState.piecesLocked
    }
  };
  try {
    localStorage.setItem(PILL_SAVE_KEY, JSON.stringify(payload));
  } catch (_err) {
    // ignore
  }
  updateLobbyStats();
}

function clearPillProgress() {
  try {
    localStorage.removeItem(PILL_SAVE_KEY);
  } catch (_err) {
    // ignore
  }
  updateLobbyStats();
}

function updateUndoState() {
  if (!el.undo) return;
  el.undo.disabled = !state.undo || state.locked;
}

function setUndo(snapshot) {
  state.undo = snapshot;
  updateUndoState();
}

function undoMove() {
  if (!state.undo || state.locked) return;
  restoreSnapshot(state.undo);
  state.undo = null;
  updateUndoState();
  showStatus("Đã hoàn tác 1 bước.");
  saveLine98Progress();
}

function clearHint(render = true) {
  state.hintPath = [];
  state.hintMove = null;
  if (render && line98Mounted) renderBoardState();
}

function shouldComputeHint() {
  if (!state.hintOn) return false;
  if (!line98Mounted) return false;
  if (state.paused || state.gameOver || state.locked) return false;
  if (state.selected) return false;
  if (Date.now() < state.hintCooldownUntil) return false;
  return true;
}

function scheduleHint() {
  if (!shouldComputeHint()) {
    if (!state.hintOn) clearHint();
    return;
  }
  if (hintFrame) return;
  hintFrame = window.requestAnimationFrame(() => {
    hintFrame = null;
    computeHint();
  });
}

function getHintColorAt(row, col, from, to, colorIndex) {
  if (row === from.row && col === from.col) return null;
  if (row === to.row && col === to.col) return colorIndex;
  return state.board[row][col];
}

function countHintDirection(from, to, colorIndex, row, col, dr, dc) {
  let count = 0;
  let r = row + dr;
  let c = col + dc;
  while (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
    const value = getHintColorAt(r, c, from, to, colorIndex);
    if (value !== colorIndex) break;
    count += 1;
    r += dr;
    c += dc;
  }
  return count;
}

function evaluateHintMove(from, to, colorIndex) {
  const dirs = [
    { dr: 0, dc: 1 },
    { dr: 1, dc: 0 },
    { dr: 1, dc: 1 },
    { dr: 1, dc: -1 }
  ];
  let bestLine = 1;
  let clearLine = 0;
  dirs.forEach(({ dr, dc }) => {
    const total = 1
      + countHintDirection(from, to, colorIndex, to.row, to.col, dr, dc)
      + countHintDirection(from, to, colorIndex, to.row, to.col, -dr, -dc);
    bestLine = Math.max(bestLine, total);
    if (total >= 5) clearLine = Math.max(clearLine, total);
  });
  const distance = Math.abs(from.row - to.row) + Math.abs(from.col - to.col);
  const base = clearLine ? 1200 + clearLine * 15 : bestLine * 10;
  return base - distance;
}

function getReachableEmpties(start) {
  const visited = Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => false));
  const queue = [start];
  visited[start.row][start.col] = true;
  const empties = [];
  const dirs = [
    { dr: -1, dc: 0 },
    { dr: 1, dc: 0 },
    { dr: 0, dc: -1 },
    { dr: 0, dc: 1 }
  ];
  while (queue.length) {
    const current = queue.shift();
    dirs.forEach(({ dr, dc }) => {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (nr < 0 || nr >= BOARD_SIZE || nc < 0 || nc >= BOARD_SIZE) return;
      if (visited[nr][nc]) return;
      if (state.board[nr][nc] != null) return;
      visited[nr][nc] = true;
      const next = { row: nr, col: nc };
      empties.push(next);
      queue.push(next);
    });
  }
  return empties;
}

function computeHint() {
  if (!shouldComputeHint()) return;
  let best = null;
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const colorIndex = state.board[row][col];
      if (colorIndex == null) continue;
      const start = { row, col };
      const reachable = getReachableEmpties(start);
      if (!reachable.length) continue;
      reachable.forEach((target) => {
        const score = evaluateHintMove(start, target, colorIndex);
        if (!best || score > best.score) {
          best = { from: start, to: target, score };
        }
      });
    }
  }
  if (!best) {
    clearHint();
    return;
  }
  const path = bfsPath(best.from, best.to);
  if (!path || path.length < 2) {
    clearHint();
    return;
  }
  state.hintMove = best;
  state.hintPath = path;
  state.hintCooldownUntil = Date.now() + HINT_COOLDOWN_MS;
  renderBoardState();
}

function toggleHelp(force) {
  if (!el.help) return;
  if (typeof force === "boolean") {
    state.helpOpen = force;
  } else {
    state.helpOpen = !state.helpOpen;
  }
  el.help.classList.toggle("is-open", state.helpOpen);
  el.help.setAttribute("aria-hidden", state.helpOpen ? "false" : "true");
}

function toggleSound() {
  state.soundOn = !state.soundOn;
  if (el.sound) {
    el.sound.classList.toggle("is-muted", !state.soundOn);
  }
  showToast(state.soundOn ? "Âm thanh bật." : "Âm thanh tắt.");
}

function handleKeydown(event) {
  if (!line98Mounted) return;
  if (isTypingContext(event.target)) return;
  if (event.key === "Escape") {
    event.preventDefault();
    saveLine98Progress();
    setLobbyOpen("");
    showToast("Đã đóng Line 98.");
    return;
  }
  if (state.paused) return;
  if (event.key === "n" || event.key === "N") {
    event.preventDefault();
    resetGame();
  }
  if (event.key === "u" || event.key === "U") {
    event.preventDefault();
    undoMove();
  }
  if (event.key === "h" || event.key === "H") {
    event.preventDefault();
    toggleHelp();
  }
  if (event.key === "m" || event.key === "M") {
    event.preventDefault();
    toggleSound();
  }
}

function setupTooltipLongPress(rootEl) {
  tooltipCleanup.forEach((cleanup) => cleanup());
  tooltipCleanup = [];
  const buttons = rootEl.querySelectorAll("[data-tooltip]");
  buttons.forEach((button) => {
    let timer = null;
    const clearTimer = () => {
      if (timer) {
        window.clearTimeout(timer);
        timer = null;
      }
    };
    const onPointerDown = (event) => {
      if (event.pointerType !== "touch") return;
      clearTimer();
      timer = window.setTimeout(() => {
        showToast(button.dataset.tooltip || "");
      }, 450);
    };
    const onPointerUp = () => clearTimer();
    const onPointerCancel = () => clearTimer();
    const onPointerLeave = () => clearTimer();
    button.addEventListener("pointerdown", onPointerDown);
    button.addEventListener("pointerup", onPointerUp);
    button.addEventListener("pointercancel", onPointerCancel);
    button.addEventListener("pointerleave", onPointerLeave);
    tooltipCleanup.push(() => {
      button.removeEventListener("pointerdown", onPointerDown);
      button.removeEventListener("pointerup", onPointerUp);
      button.removeEventListener("pointercancel", onPointerCancel);
      button.removeEventListener("pointerleave", onPointerLeave);
    });
  });
}

function bfsPath(start, target) {
  if (!start || !target) return null;
  if (start.row === target.row && start.col === target.col) return [start];
  const visited = Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => false));
  const parent = Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => null));
  const queue = [];
  queue.push(start);
  visited[start.row][start.col] = true;
  const dirs = [
    { dr: -1, dc: 0 },
    { dr: 1, dc: 0 },
    { dr: 0, dc: -1 },
    { dr: 0, dc: 1 }
  ];
  while (queue.length) {
    const current = queue.shift();
    if (current.row === target.row && current.col === target.col) {
      const path = [];
      let cursor = current;
      while (cursor) {
        path.push(cursor);
        cursor = parent[cursor.row][cursor.col];
      }
      return path.reverse();
    }
    dirs.forEach(({ dr, dc }) => {
      const nextRow = current.row + dr;
      const nextCol = current.col + dc;
      if (nextRow < 0 || nextRow >= BOARD_SIZE || nextCol < 0 || nextCol >= BOARD_SIZE) return;
      if (visited[nextRow][nextCol]) return;
      if (state.board[nextRow][nextCol] != null && !(nextRow === target.row && nextCol === target.col)) return;
      if (nextRow === target.row && nextCol === target.col) {
        visited[nextRow][nextCol] = true;
        parent[nextRow][nextCol] = current;
        queue.push({ row: nextRow, col: nextCol });
        return;
      }
      if (state.board[nextRow][nextCol] != null) return;
      visited[nextRow][nextCol] = true;
      parent[nextRow][nextCol] = current;
      queue.push({ row: nextRow, col: nextCol });
    });
  }
  return null;
}

function detectLines() {
  const toClear = new Set();
  const directions = [
    { dr: 0, dc: 1 },
    { dr: 1, dc: 0 },
    { dr: 1, dc: 1 },
    { dr: 1, dc: -1 }
  ];
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const colorIndex = state.board[row][col];
      if (colorIndex == null) continue;
      directions.forEach(({ dr, dc }) => {
        const prevRow = row - dr;
        const prevCol = col - dc;
        if (prevRow >= 0 && prevRow < BOARD_SIZE && prevCol >= 0 && prevCol < BOARD_SIZE) {
          if (state.board[prevRow][prevCol] === colorIndex) return;
        }
        const line = [];
        let cursorRow = row;
        let cursorCol = col;
        while (cursorRow >= 0 && cursorRow < BOARD_SIZE && cursorCol >= 0 && cursorCol < BOARD_SIZE) {
          if (state.board[cursorRow][cursorCol] !== colorIndex) break;
          line.push({ row: cursorRow, col: cursorCol });
          cursorRow += dr;
          cursorCol += dc;
        }
        if (line.length >= 5) {
          line.forEach((pos) => toClear.add(`${pos.row}:${pos.col}`));
        }
      });
    }
  }
  return Array.from(toClear).map((key) => {
    const [row, col] = key.split(":").map(Number);
    return { row, col };
  });
}

function clearLines(lines, { fromSpawn = false, onCleared } = {}) {
  if (!lines.length) return false;
  state.locked = true;
  lines.forEach(({ row, col }) => {
    const cell = state.cells[row]?.[col];
    const ball = cell?.querySelector(".tc-colorplay-ball");
    if (ball) ball.classList.add("is-clearing");
  });
  const gained = lines.length * 10;
  state.score += gained;
  if (fromSpawn) {
    state.combo = 0;
  } else {
    state.combo += 1;
  }
  if (state.combo >= 2) unlockAchievement("line98_combo_2");
  if (state.combo >= 3) unlockAchievement("line98_combo_3");
  if (lines.length >= 7) unlockAchievement("line98_long_clear");
  if (state.score >= 200) unlockAchievement("line98_score_200");
  if (state.score >= 500) unlockAchievement("line98_score_500");
  updateBestScore();
  renderStats();
  updateUndoState();
  window.setTimeout(() => {
    lines.forEach(({ row, col }) => {
      state.board[row][col] = null;
    });
    state.locked = false;
    renderBoardState();
    updateUndoState();
    saveLine98Progress();
    if (typeof onCleared === "function") onCleared();
  }, 220);
  return true;
}

function spawnBalls(colors) {
  const empty = getEmptyCells();
  if (!empty.length) return false;
  const available = [...empty];
  colors.forEach((colorIndex) => {
    if (!available.length) return;
    const pickIndex = Math.floor(lineRandom() * available.length);
    const pick = available.splice(pickIndex, 1)[0];
    state.board[pick.row][pick.col] = colorIndex;
  });
  return true;
}

function spawnNext() {
  const empty = getEmptyCells();
  if (!empty.length) {
    handleGameOver();
    return;
  }
  spawnBalls(state.nextQueue);
  const lines = detectLines();
  const cleared = clearLines(lines, {
    fromSpawn: true,
    onCleared: () => {
      if (getEmptyCells().length === 0) {
        handleGameOver();
      }
    }
  });
  state.nextQueue = generateNextQueue(state.spawnCount);
  if (!cleared) {
    renderBoardState();
  }
  renderUpcoming();
  renderStats();
  if (!cleared && getEmptyCells().length === 0) {
    handleGameOver();
  }
  scheduleHint();
}

function applyMove(from, to) {
  const colorIndex = state.board[from.row][from.col];
  state.board[from.row][from.col] = null;
  state.board[to.row][to.col] = colorIndex;
  state.moves += 1;
  if (state.moves === 1) unlockAchievement("line98_first_move");
  if (state.moves >= 30) unlockAchievement("line98_survive_30");
  state.selected = null;
  renderBoardState();
  const lines = detectLines();
  const cleared = clearLines(lines, {
    onCleared: () => {
      renderStats();
    }
  });
  if (!cleared) {
    state.combo = 0;
    spawnNext();
  } else {
    renderStats();
  }
  if (state.movesLimit && state.moves >= state.movesLimit) {
    handleGameOver();
  }
  saveLine98Progress();
  scheduleHint();
}

function buildLine98RunPayload() {
  return {
    score: state.score,
    best: state.best,
    moves: state.moves,
    movesLimit: state.movesLimit,
    difficulty: settings.line98Difficulty,
    mode: state.mode,
    seed: state.dailySeed || "",
    durationMs: getLineElapsedMs(),
    endedAt: new Date().toISOString()
  };
}

function buildLine98Canvas() {
  const cellSize = 28;
  const padding = 18;
  const header = 46;
  const boardSizePx = BOARD_SIZE * cellSize;
  const canvas = document.createElement("canvas");
  canvas.width = boardSizePx + padding * 2;
  canvas.height = boardSizePx + padding * 2 + header;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(padding, padding + header, boardSizePx, boardSizePx);
  ctx.strokeStyle = "rgba(15, 23, 42, 0.08)";
  for (let i = 0; i <= BOARD_SIZE; i += 1) {
    const offset = padding + header + i * cellSize + 0.5;
    ctx.beginPath();
    ctx.moveTo(padding, offset);
    ctx.lineTo(padding + boardSizePx, offset);
    ctx.stroke();
    const vOffset = padding + i * cellSize + 0.5;
    ctx.beginPath();
    ctx.moveTo(vOffset, padding + header);
    ctx.lineTo(vOffset, padding + header + boardSizePx);
    ctx.stroke();
  }
  const palette = getLineColors();
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const colorIndex = state.board[row][col];
      if (colorIndex == null) continue;
      const centerX = padding + col * cellSize + cellSize / 2;
      const centerY = padding + header + row * cellSize + cellSize / 2;
      const radius = cellSize * 0.36;
      ctx.beginPath();
      ctx.fillStyle = palette[colorIndex] || COLORS[colorIndex] || COLORS[0];
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(15, 23, 42, 0.15)";
      ctx.stroke();
    }
  }
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "600 16px Inter, sans-serif";
  ctx.fillText("Line 98", padding, padding + 18);
  ctx.font = "12px Inter, sans-serif";
  ctx.fillText(`Điểm: ${state.score} • Kỷ lục: ${state.best}`, padding, padding + 36);
  return canvas;
}

function exportLine98Png() {
  const canvas = buildLine98Canvas();
  const stamp = new Date().toISOString().slice(0, 10);
  downloadCanvas(canvas, `line98_${stamp}.png`);
}

function openLine98Endscreen(payload) {
  if (!el.end) return;
  const summary = buildLine98Summary(payload);
  if (el.endSummary) el.endSummary.textContent = summary;
  el.end.classList.add("is-open");
  el.end.setAttribute("aria-hidden", "false");
}

function closeLine98Endscreen() {
  if (!el.end) return;
  el.end.classList.remove("is-open");
  el.end.setAttribute("aria-hidden", "true");
}

async function saveLine98RunToLibrary(payload) {
  const colors = getLineColors();
  const createdAt = new Date().toISOString();
  const canvas = buildLine98Canvas();
  const snapshot = await captureCanvasImage(canvas, "image/png");
  let thumbnail = "";
  if (snapshot) {
    try {
      const stored = await uploadImage(snapshot, {
        sourceWorld: "colorplay",
        purpose: "line98-thumbnail",
        game: "line98"
      });
      thumbnail = stored?.key || "";
    } catch (_err) {
      thumbnail = "";
    }
  }
  const asset = {
    id: `colorplay_line98_${Date.now()}`,
    type: "colorplay_run",
    name: `Line 98 · ${new Date().toLocaleDateString("vi-VN")}`,
    tags: ["colorplay", "line98", `difficulty:${payload.difficulty}`],
    payload: {
      game: "line98",
      colors,
      score: payload.score,
      best: payload.best,
      moves: payload.moves,
      movesLimit: payload.movesLimit,
      durationMs: payload.durationMs,
      mode: payload.mode,
      seed: payload.seed,
      summary: buildLine98Summary(payload),
      thumbnail
    },
    notes: "Thế giới trò chơi màu",
    createdAt,
    updatedAt: createdAt,
    sourceWorld: "colorplay",
    project: ""
  };
  try {
    const raw = localStorage.getItem(COLORPLAY_ASSET_KEY);
    const list = safeParseJSON(raw, []);
    const next = Array.isArray(list) ? list : [];
    next.unshift(asset);
    localStorage.setItem(COLORPLAY_ASSET_KEY, JSON.stringify(next));
    showToast("Đã lưu vào Thư viện.");
    return true;
  } catch (_err) {
    showToast("Không thể lưu vào Thư viện.");
    return false;
  }
}

function handleLine98DifficultyChange() {
  const value = el.difficulty?.value || "medium";
  if (!LINE98_PRESETS[value]) return;
  settings.line98Difficulty = value;
  saveSettings();
  resetGame();
}

function handleLine98ColorblindToggle() {
  settings.colorBlind = !settings.colorBlind;
  applyColorBlindMode();
  el.colorblind?.classList.toggle("is-active", settings.colorBlind);
  saveSettings();
}

async function handleLine98EndCopy() {
  const summary = buildLine98Summary();
  const ok = await copyText(summary);
  showToast(ok ? "Đã sao chép tóm tắt." : "Không thể sao chép.");
}

function handleLine98EndPng() {
  exportLine98Png();
}

async function handleLine98EndSave() {
  const payload = buildLine98RunPayload();
  await saveLine98RunToLibrary(payload);
}

function handleDailyChallenge() {
  clearHint();
  if (state.mode === "daily") {
    applyLine98Mode("normal", "");
    resetGame();
    showToast("Đã trở về chế độ thường.");
    return;
  }
  const seed = getTodaySeed();
  applyLine98Mode("daily", seed);
  resetGame();
  showToast("Đã vào thử thách hôm nay.");
}

async function handleCopySeed() {
  const seed = state.dailySeed || getTodaySeed();
  const ok = await copyText(seed);
  showToast(ok ? "Đã sao chép seed." : "Không thể sao chép seed.");
}

function handleHintToggle() {
  state.hintOn = !state.hintOn;
  if (el.hintBtn) {
    el.hintBtn.classList.toggle("is-active", state.hintOn);
  }
  if (!state.hintOn) {
    clearHint();
    return;
  }
  state.hintCooldownUntil = 0;
  scheduleHint();
}

function handleGameOver() {
  state.gameOver = true;
  state.elapsedMs = getLineElapsedMs();
  state.startedAt = null;
  state.paused = true;
  state.autoPaused = false;
  clearHint();
  showStatus("Hết ô trống. Game over.");
  showToast("Game over. Nhấn Ván mới để bắt đầu.");
  const payload = buildLine98RunPayload();
  if (state.mode === "daily") {
    setDailyBest(state.dailySeed || getTodaySeed(), payload.score);
    updateDailyUI();
    unlockAchievement("line98_daily_complete");
  }
  saveLine98LastRun(payload);
  clearLine98Progress();
  openLine98Endscreen(payload);
  updateLobbyStats();
}

function handleCellClick(event) {
  if (!line98Mounted) return;
  if (state.paused) {
    showToast("Đang tạm dừng.");
    return;
  }
  if (state.hintOn) {
    clearHint(false);
  }
  if (state.gameOver) {
    showToast("Game over. Nhấn Ván mới để bắt đầu.");
    return;
  }
  if (state.locked) return;
  const cell = event.target.closest(".tc-colorplay-cell");
  if (!cell || !el.board || !el.board.contains(cell)) return;
  const row = Number(cell.dataset.row);
  const col = Number(cell.dataset.col);
  if (Number.isNaN(row) || Number.isNaN(col)) return;
  const hasBall = state.board[row][col] != null;
  if (hasBall) {
    if (state.selected && state.selected.row === row && state.selected.col === col) {
      state.selected = null;
      renderBoardState();
      showStatus("Đã bỏ chọn.");
      return;
    }
    state.selected = { row, col };
    renderBoardState();
    showStatus("Chọn ô trống để di chuyển.");
    return;
  }
  if (!state.selected) return;
  const path = bfsPath(state.selected, { row, col });
  if (!path) {
    showToast("Không có đường đi.");
    return;
  }
  setUndo(snapshotState());
  applyMove(state.selected, { row, col });
  showStatus("Đã di chuyển.");
}

function resetGame() {
  applyLine98Mode(state.mode, state.dailySeed);
  const preset = getLinePreset(settings.line98Difficulty);
  state.colorCount = preset.colorCount;
  state.spawnCount = preset.spawnCount;
  state.movesLimit = preset.movesLimit;
  state.board = createEmptyBoard();
  state.score = 0;
  state.combo = 0;
  state.moves = 0;
  state.selected = null;
  state.gameOver = false;
  state.locked = false;
  state.undo = null;
  state.paused = false;
  state.autoPaused = false;
  state.startedAt = Date.now();
  state.elapsedMs = 0;
  state.hintPath = [];
  state.hintMove = null;
  state.hintCooldownUntil = 0;
  toggleHelp(false);
  updateUndoState();
  state.nextQueue = generateNextQueue(state.spawnCount);
  spawnBalls(Array.from({ length: INITIAL_BALLS }, () => Math.floor(lineRandom() * state.colorCount)));
  renderBoardState();
  renderStats();
  renderUpcoming();
  showStatus("Chạm bi để bắt đầu.");
  closeLine98Endscreen();
  saveLine98Progress();
  scheduleHint();
}

function mountLine98(rootEl) {
  if (!rootEl) return;
  unmountLine98();
  line98Root = rootEl;
  line98Root.innerHTML = `
    <div class="tc-colorplay-game">
      <div class="tc-colorplay-hud">
        <div class="tc-colorplay-hud-section tc-colorplay-hud-next">
          <p class="tc-colorplay-hud-title">Điểm số</p>
          <div class="tc-colorplay-score mt-3">
            <div class="tc-colorplay-score-item">
              <span class="tc-muted text-xs">Điểm hiện tại</span>
              <span data-line98="score" class="text-2xl font-semibold">0</span>
            </div>
            <div class="tc-colorplay-score-item">
              <span class="tc-muted text-xs">Combo</span>
              <span data-line98="combo" class="text-xl font-semibold">0</span>
            </div>
            <div class="tc-colorplay-score-item">
              <span class="tc-muted text-xs">Kỷ lục</span>
              <span data-line98="best" class="text-xl font-semibold">0</span>
            </div>
            <div class="tc-colorplay-score-item">
              <span class="tc-muted text-xs">Bước còn lại</span>
              <span data-line98="moves" class="text-xl font-semibold">--</span>
            </div>
          </div>
          <div class="tc-colorplay-tools mt-4">
            <p data-line98="status" class="tc-muted text-xs">Chạm bi để bắt đầu.</p>
            <div class="tc-colorplay-config">
              <label class="tc-muted text-[10px] uppercase tracking-[0.2em]">Độ khó</label>
              <select data-line98="difficulty" class="tc-input tc-colorplay-select">
                <option value="easy">Dễ</option>
                <option value="medium" selected>Vừa</option>
                <option value="hard">Khó</option>
              </select>
              <button data-line98-action="colorblind" class="tc-icon-btn" type="button" data-tooltip="Hỗ trợ mù màu" aria-label="Hỗ trợ mù màu">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z" fill="none" stroke="currentColor" stroke-width="2"></path>
                  <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"></circle>
                </svg>
              </button>
            </div>
            <div class="tc-colorplay-daily">
              <div class="tc-colorplay-daily-row">
                <div class="tc-colorplay-daily-meta">
                  <span class="tc-muted text-[10px] uppercase tracking-[0.2em]">Thử thách hôm nay</span>
                  <span data-line98="daily-mode" class="tc-chip px-2 py-1 text-[10px]">Chế độ thường</span>
                  <span class="tc-muted">Seed</span>
                  <strong data-line98="daily-seed">0000-00-00</strong>
                  <span class="tc-muted">Best</span>
                  <strong data-line98="daily-best">0</strong>
                </div>
                <div class="flex items-center gap-2">
                  <button data-line98-action="daily" class="tc-btn tc-chip px-3 py-2 text-xs" type="button">Thử thách hôm nay</button>
                  <button data-line98-action="seed" class="tc-icon-btn" type="button" data-tooltip="Sao chép seed" aria-label="Sao chép seed">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 9h10v10H9z" fill="none" stroke="currentColor" stroke-width="2"></path>
                      <path d="M5 5h10v10H5z" fill="none" stroke="currentColor" stroke-width="2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="tc-colorplay-controls">
              <button data-line98-action="new" class="tc-icon-btn" type="button" data-tooltip="Ván mới" aria-label="Ván mới">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 4v4h4M19 20v-4h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M19 10a7 7 0 0 0-12-4M5 14a7 7 0 0 0 12 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
              <button data-line98-action="undo" class="tc-icon-btn" type="button" data-tooltip="Undo" aria-label="Undo" disabled>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9 7H4v5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M20 12a7 7 0 0 0-12-5l-4 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
              <button data-line98-action="hint" class="tc-icon-btn" type="button" data-tooltip="Gợi ý nước đi" aria-label="Gợi ý">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3a7 7 0 0 0-4 12.8V19a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3.2A7 7 0 0 0 12 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                  <path d="M9 21h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                </svg>
              </button>
              <button data-line98-action="help" class="tc-icon-btn" type="button" data-tooltip="Hướng dẫn" aria-label="Hướng dẫn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"></circle>
                  <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                  <circle cx="12" cy="17" r="1" fill="currentColor"></circle>
                </svg>
              </button>
              <button data-line98-action="shortcuts" class="tc-icon-btn" type="button" data-tooltip="N/U/H/M/Esc" aria-label="Phím tắt">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
                  <path d="M7 10h2M11 10h2M15 10h2M7 14h10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                </svg>
              </button>
              <button data-line98-action="sound" class="tc-icon-btn" type="button" data-tooltip="Âm thanh" aria-label="Âm thanh">
                <svg class="tc-icon-sound-on" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 10v4h4l5 4V6l-5 4H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path>
                  <path d="M16 9a4 4 0 0 1 0 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                  <path d="M18.5 7a7 7 0 0 1 0 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                </svg>
                <svg class="tc-icon-sound-off" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 10v4h4l5 4V6l-5 4H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path>
                  <path d="M18 8l-6 8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                </svg>
              </button>
            </div>
            <div data-line98="help" class="tc-colorplay-help" aria-hidden="true">
              <p>Chạm bi → chạm ô trống để di chuyển.</p>
              <p>Tạo 5+ cùng màu để xoá và ghi điểm.</p>
              <p>Phím tắt: N (ván mới), U (undo), H (hướng dẫn), M (âm thanh), Esc (đóng).</p>
            </div>
          </div>
        </div>
        <div class="tc-colorplay-hud-section">
          <p class="tc-colorplay-hud-title">Sắp ra</p>
          <p class="tc-muted text-xs mt-1">Ba màu kế tiếp để chủ động chiến thuật.</p>
          <div data-line98="next" class="tc-colorplay-next mt-3"></div>
        </div>
      </div>
      <div class="tc-colorplay-board-wrap">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold">Bàn cờ 9×9</p>
          <span class="tc-muted text-xs">Line 98</span>
        </div>
        <div data-line98="board" class="tc-colorplay-board mt-3" aria-label="Bàn cờ 9×9"></div>
      </div>
      <div data-line98-end class="tc-colorplay-end" aria-hidden="true">
        <div class="tc-colorplay-end-card">
          <div class="tc-colorplay-end-title">Tổng kết Line 98</div>
          <p data-line98-end-summary class="tc-muted text-xs"></p>
          <div class="tc-colorplay-end-actions">
            <button data-line98-end-action="copy" class="tc-btn tc-chip px-3 py-2 text-xs" type="button">Sao chép tóm tắt</button>
            <button data-line98-end-action="png" class="tc-btn tc-chip px-3 py-2 text-xs" type="button">Xuất PNG</button>
            <button data-line98-end-action="save" class="tc-btn tc-btn-primary px-3 py-2 text-xs" type="button">Lưu vào Thư viện</button>
          </div>
        </div>
      </div>
    </div>
  `;

  el = {
    board: line98Root.querySelector('[data-line98="board"]'),
    next: line98Root.querySelector('[data-line98="next"]'),
    score: line98Root.querySelector('[data-line98="score"]'),
    combo: line98Root.querySelector('[data-line98="combo"]'),
    best: line98Root.querySelector('[data-line98="best"]'),
    moves: line98Root.querySelector('[data-line98="moves"]'),
    status: line98Root.querySelector('[data-line98="status"]'),
    difficulty: line98Root.querySelector('[data-line98="difficulty"]'),
    colorblind: line98Root.querySelector('[data-line98-action="colorblind"]'),
    dailyBtn: line98Root.querySelector('[data-line98-action="daily"]'),
    seedBtn: line98Root.querySelector('[data-line98-action="seed"]'),
    dailySeed: line98Root.querySelector('[data-line98="daily-seed"]'),
    dailyBest: line98Root.querySelector('[data-line98="daily-best"]'),
    dailyMode: line98Root.querySelector('[data-line98="daily-mode"]'),
    hintBtn: line98Root.querySelector('[data-line98-action="hint"]'),
    newGame: line98Root.querySelector('[data-line98-action="new"]'),
    undo: line98Root.querySelector('[data-line98-action="undo"]'),
    helpBtn: line98Root.querySelector('[data-line98-action="help"]'),
    shortcuts: line98Root.querySelector('[data-line98-action="shortcuts"]'),
    help: line98Root.querySelector('[data-line98="help"]'),
    sound: line98Root.querySelector('[data-line98-action="sound"]'),
    end: line98Root.querySelector("[data-line98-end]"),
    endSummary: line98Root.querySelector("[data-line98-end-summary]"),
    endCopy: line98Root.querySelector('[data-line98-end-action="copy"]'),
    endPng: line98Root.querySelector('[data-line98-end-action="png"]'),
    endSave: line98Root.querySelector('[data-line98-end-action="save"]')
  };

  updateDailyUI();
  state.best = loadBestScore();
  renderBoardShell();
  if (el.difficulty) el.difficulty.value = settings.line98Difficulty;
  if (el.colorblind) el.colorblind.classList.toggle("is-active", settings.colorBlind);
  if (el.hintBtn) el.hintBtn.classList.toggle("is-active", state.hintOn);
  if (line98ResumeRequested) {
    const saved = readLine98Save();
    if (!saved || !applyLine98Save(saved)) {
      resetGame();
    }
  } else {
    applyLine98Mode("normal", "");
    resetGame();
  }
  line98ResumeRequested = false;
  if (el.board) {
    el.board.addEventListener("click", handleCellClick);
  }
  el.newGame?.addEventListener("click", resetGame);
  el.undo?.addEventListener("click", undoMove);
  el.helpBtn?.addEventListener("click", toggleHelp);
  el.shortcuts?.addEventListener("click", toggleHelp);
  el.sound?.addEventListener("click", toggleSound);
  el.dailyBtn?.addEventListener("click", handleDailyChallenge);
  el.seedBtn?.addEventListener("click", handleCopySeed);
  el.hintBtn?.addEventListener("click", handleHintToggle);
  el.difficulty?.addEventListener("change", handleLine98DifficultyChange);
  el.colorblind?.addEventListener("click", handleLine98ColorblindToggle);
  el.endCopy?.addEventListener("click", handleLine98EndCopy);
  el.endPng?.addEventListener("click", handleLine98EndPng);
  el.endSave?.addEventListener("click", handleLine98EndSave);
  window.addEventListener("keydown", handleKeydown);
  setupTooltipLongPress(line98Root);
  line98Mounted = true;
}

function unmountLine98() {
  if (!line98Root) return;
  saveLine98Progress();
  if (el.board) {
    el.board.removeEventListener("click", handleCellClick);
  }
  el.newGame?.removeEventListener("click", resetGame);
  el.undo?.removeEventListener("click", undoMove);
  el.helpBtn?.removeEventListener("click", toggleHelp);
  el.shortcuts?.removeEventListener("click", toggleHelp);
  el.sound?.removeEventListener("click", toggleSound);
  el.dailyBtn?.removeEventListener("click", handleDailyChallenge);
  el.seedBtn?.removeEventListener("click", handleCopySeed);
  el.hintBtn?.removeEventListener("click", handleHintToggle);
  el.difficulty?.removeEventListener("change", handleLine98DifficultyChange);
  el.colorblind?.removeEventListener("click", handleLine98ColorblindToggle);
  el.endCopy?.removeEventListener("click", handleLine98EndCopy);
  el.endPng?.removeEventListener("click", handleLine98EndPng);
  el.endSave?.removeEventListener("click", handleLine98EndSave);
  window.removeEventListener("keydown", handleKeydown);
  tooltipCleanup.forEach((cleanup) => cleanup());
  tooltipCleanup = [];
  state.helpOpen = false;
  state.hintOn = false;
  state.hintPath = [];
  state.hintMove = null;
  if (hintFrame) {
    window.cancelAnimationFrame(hintFrame);
    hintFrame = null;
  }
  line98Root.innerHTML = "";
  line98Root = null;
  line98Mounted = false;
  el = {};
}

function loadPillBestScore() {
  try {
    const raw = localStorage.getItem(PILL_BEST_KEY);
    const value = Number(raw);
    return Number.isFinite(value) ? value : 0;
  } catch (_err) {
    return 0;
  }
}

function savePillBestScore(score) {
  try {
    localStorage.setItem(PILL_BEST_KEY, String(score));
  } catch (_err) {
    // ignore
  }
}

function updatePillBestScore() {
  if (pillState.score > pillState.best) {
    pillState.best = pillState.score;
    savePillBestScore(pillState.best);
    updateLobbyStats();
  }
}

function showPillStatus(message) {
  if (!pillEl.status) return;
  pillEl.status.textContent = message;
}

function createPillGrid() {
  return Array.from({ length: PILL_HEIGHT }, () => Array.from({ length: PILL_WIDTH }, () => null));
}

function randomPillColor() {
  const palette = getPillColors();
  const total = palette.length || PILL_COLORS.length;
  return Math.floor(Math.random() * total);
}

function createPillPiece() {
  return [randomPillColor(), randomPillColor()];
}

function getPillCells(piece, rowOffset = 0, colOffset = 0, orientation = piece.orientation) {
  const orient = PILL_ORIENTS[orientation] || PILL_ORIENTS[0];
  return [
    {
      row: piece.row + rowOffset + orient[0].dr,
      col: piece.col + colOffset + orient[0].dc,
      colorIndex: piece.colors[0],
      part: 0
    },
    {
      row: piece.row + rowOffset + orient[1].dr,
      col: piece.col + colOffset + orient[1].dc,
      colorIndex: piece.colors[1],
      part: 1
    }
  ];
}

function isValidPillPiece(piece, rowOffset = 0, colOffset = 0, orientation = piece.orientation) {
  return getPillCells(piece, rowOffset, colOffset, orientation).every(({ row, col }) => {
    if (row < 0 || row >= PILL_HEIGHT || col < 0 || col >= PILL_WIDTH) return false;
    return !pillState.grid[row][col];
  });
}

function renderPillBoardShell() {
  if (!pillEl.board) return;
  pillEl.board.innerHTML = "";
  pillState.cells = [];
  for (let row = 0; row < PILL_HEIGHT; row += 1) {
    const rowCells = [];
    for (let col = 0; col < PILL_WIDTH; col += 1) {
      const cell = document.createElement("div");
      cell.className = "tc-pill-cell";
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);
      pillEl.board.appendChild(cell);
      rowCells.push(cell);
    }
    pillState.cells.push(rowCells);
  }
}

function renderPillBoard() {
  if (!pillState.cells.length) return;
  const activeMap = new Map();
  if (pillState.active) {
    getPillCells(pillState.active).forEach((cell) => {
      activeMap.set(`${cell.row}:${cell.col}`, cell);
    });
  }
  for (let row = 0; row < PILL_HEIGHT; row += 1) {
    for (let col = 0; col < PILL_WIDTH; col += 1) {
      const cell = pillState.cells[row][col];
      const active = activeMap.get(`${row}:${col}`) || null;
      const locked = pillState.grid[row][col];
      const data = active || locked;
      if (!data) {
        cell.classList.remove("has-pill", "is-active", "is-locked");
        cell.innerHTML = "";
        continue;
      }
      cell.classList.add("has-pill");
      cell.classList.toggle("is-active", Boolean(active));
      cell.classList.toggle("is-locked", Boolean(locked && !active));
      let block = cell.querySelector(".tc-pill-block");
      if (!block) {
        block = document.createElement("span");
        block.className = "tc-pill-block";
        cell.appendChild(block);
      }
      block.classList.remove("is-clearing");
      const palette = getPillColors();
      block.style.background = palette[data.colorIndex] || PILL_COLORS[data.colorIndex] || PILL_COLORS[0];
      block.dataset.color = String(data.colorIndex);
    }
  }
}

function renderPillStats() {
  if (pillEl.score) pillEl.score.textContent = String(pillState.score);
  if (pillEl.best) pillEl.best.textContent = String(pillState.best);
}

function renderPillNext() {
  if (!pillEl.next) return;
  pillEl.next.innerHTML = "";
  if (!pillState.next) return;
  const palette = getPillColors();
  pillState.next.forEach((colorIndex) => {
    const block = document.createElement("span");
    block.className = "tc-pill-next-block";
    block.style.background = palette[colorIndex] || PILL_COLORS[colorIndex] || PILL_COLORS[0];
    block.dataset.color = String(colorIndex);
    pillEl.next.appendChild(block);
  });
}

function spawnPillPiece() {
  if (!pillState.next) {
    pillState.next = createPillPiece();
  }
  const startCol = Math.max(0, Math.floor(PILL_WIDTH / 2) - 1);
  const piece = {
    row: 0,
    col: startCol,
    orientation: 0,
    colors: pillState.next
  };
  pillState.next = createPillPiece();
  if (!isValidPillPiece(piece)) {
    handlePillGameOver();
    return;
  }
  pillState.active = piece;
  renderPillNext();
  renderPillBoard();
}

function movePill(dr, dc) {
  if (!pillState.active || pillState.locked) return false;
  if (!isValidPillPiece(pillState.active, dr, dc)) return false;
  pillState.active.row += dr;
  pillState.active.col += dc;
  renderPillBoard();
  return true;
}

function rotatePill() {
  if (!pillState.active || pillState.locked) return false;
  const nextOrientation = (pillState.active.orientation + 1) % PILL_ORIENTS.length;
  const kicks = [
    { dr: 0, dc: 0 },
    { dr: 0, dc: -1 },
    { dr: 0, dc: 1 },
    { dr: -1, dc: 0 },
    { dr: 1, dc: 0 }
  ];
  for (const kick of kicks) {
    if (isValidPillPiece(pillState.active, kick.dr, kick.dc, nextOrientation)) {
      pillState.active.row += kick.dr;
      pillState.active.col += kick.dc;
      pillState.active.orientation = nextOrientation;
      renderPillBoard();
      return true;
    }
  }
  return false;
}

function hardDropPill() {
  if (!pillState.active || pillState.locked) return;
  pillState.hardDrops += 1;
  if (pillState.hardDrops >= 10) unlockAchievement("pill_hard_drop_10");
  let steps = 0;
  while (isValidPillPiece(pillState.active, steps + 1, 0)) {
    steps += 1;
  }
  if (steps) {
    pillState.active.row += steps;
  }
  renderPillBoard();
  lockPillPiece();
}

function detectPillMatches() {
  const visited = Array.from({ length: PILL_HEIGHT }, () => Array.from({ length: PILL_WIDTH }, () => false));
  const matches = [];
  const dirs = [
    { dr: -1, dc: 0 },
    { dr: 1, dc: 0 },
    { dr: 0, dc: -1 },
    { dr: 0, dc: 1 }
  ];
  for (let row = 0; row < PILL_HEIGHT; row += 1) {
    for (let col = 0; col < PILL_WIDTH; col += 1) {
      const cell = pillState.grid[row][col];
      if (!cell || visited[row][col]) continue;
      const queue = [{ row, col }];
      const group = [];
      visited[row][col] = true;
      while (queue.length) {
        const current = queue.shift();
        group.push(current);
        dirs.forEach(({ dr, dc }) => {
          const nextRow = current.row + dr;
          const nextCol = current.col + dc;
          if (nextRow < 0 || nextRow >= PILL_HEIGHT || nextCol < 0 || nextCol >= PILL_WIDTH) return;
          if (visited[nextRow][nextCol]) return;
          const nextCell = pillState.grid[nextRow][nextCol];
          if (!nextCell || nextCell.colorIndex !== cell.colorIndex) return;
          visited[nextRow][nextCol] = true;
          queue.push({ row: nextRow, col: nextCol });
        });
      }
      if (group.length >= 4) {
        matches.push(...group);
      }
    }
  }
  return matches;
}

function applyPillGravity() {
  for (let col = 0; col < PILL_WIDTH; col += 1) {
    let writeRow = PILL_HEIGHT - 1;
    for (let row = PILL_HEIGHT - 1; row >= 0; row -= 1) {
      const cell = pillState.grid[row][col];
      if (!cell) continue;
      if (writeRow !== row) {
        pillState.grid[writeRow][col] = cell;
        pillState.grid[row][col] = null;
      }
      writeRow -= 1;
    }
    for (let row = writeRow; row >= 0; row -= 1) {
      pillState.grid[row][col] = null;
    }
  }
}

function resolvePillMatches(onComplete) {
  const matches = detectPillMatches();
  if (!matches.length) {
    if (typeof onComplete === "function") onComplete();
    return;
  }
  pillState.locked = true;
  matches.forEach(({ row, col }) => {
    const cell = pillState.cells[row]?.[col];
    const block = cell?.querySelector(".tc-pill-block");
    if (block) block.classList.add("is-clearing");
  });
  pillState.score += matches.length * 10;
  if (matches.length >= 4) unlockAchievement("pill_first_clear");
  if (pillState.score >= 200) unlockAchievement("pill_score_200");
  if (pillState.score >= 500) unlockAchievement("pill_score_500");
  updatePillBestScore();
  renderPillStats();
  window.setTimeout(() => {
    matches.forEach(({ row, col }) => {
      pillState.grid[row][col] = null;
    });
    applyPillGravity();
    pillState.locked = false;
    renderPillBoard();
    resolvePillMatches(onComplete);
  }, 220);
}

function lockPillPiece() {
  if (!pillState.active) return;
  const cells = getPillCells(pillState.active);
  cells.forEach(({ row, col, colorIndex }) => {
    pillState.grid[row][col] = { colorIndex };
  });
  pillState.piecesLocked += 1;
  if (pillState.piecesLocked >= 40) unlockAchievement("pill_survive_40");
  pillState.active = null;
  renderPillBoard();
  resolvePillMatches(() => {
    if (!pillState.gameOver) {
      spawnPillPiece();
    }
    savePillProgress();
  });
}

function buildPillRunPayload() {
  return {
    score: pillState.score,
    best: pillState.best,
    difficulty: settings.pillDifficulty,
    dropMs: pillState.dropMs,
    colorCount: pillState.colorCount,
    durationMs: getPillElapsedMs(),
    endedAt: new Date().toISOString()
  };
}

function buildPillCanvas() {
  const cellSize = 22;
  const padding = 18;
  const header = 46;
  const boardWidth = PILL_WIDTH * cellSize;
  const boardHeight = PILL_HEIGHT * cellSize;
  const canvas = document.createElement("canvas");
  canvas.width = boardWidth + padding * 2;
  canvas.height = boardHeight + padding * 2 + header;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(padding, padding + header, boardWidth, boardHeight);
  ctx.strokeStyle = "rgba(15, 23, 42, 0.08)";
  for (let i = 0; i <= PILL_HEIGHT; i += 1) {
    const y = padding + header + i * cellSize + 0.5;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(padding + boardWidth, y);
    ctx.stroke();
  }
  for (let i = 0; i <= PILL_WIDTH; i += 1) {
    const x = padding + i * cellSize + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, padding + header);
    ctx.lineTo(x, padding + header + boardHeight);
    ctx.stroke();
  }
  const grid = pillState.grid.map((row) => row.map((cell) => (cell ? cell.colorIndex : null)));
  if (pillState.active) {
    getPillCells(pillState.active).forEach(({ row, col, colorIndex }) => {
      if (row < 0 || row >= PILL_HEIGHT || col < 0 || col >= PILL_WIDTH) return;
      grid[row][col] = colorIndex;
    });
  }
  const palette = getPillColors();
  for (let row = 0; row < PILL_HEIGHT; row += 1) {
    for (let col = 0; col < PILL_WIDTH; col += 1) {
      const colorIndex = grid[row][col];
      if (colorIndex == null) continue;
      const x = padding + col * cellSize + 2;
      const y = padding + header + row * cellSize + 2;
      ctx.fillStyle = palette[colorIndex] || PILL_COLORS[colorIndex] || PILL_COLORS[0];
      ctx.fillRect(x, y, cellSize - 4, cellSize - 4);
      ctx.strokeStyle = "rgba(15, 23, 42, 0.12)";
      ctx.strokeRect(x, y, cellSize - 4, cellSize - 4);
    }
  }
  ctx.fillStyle = "#e2e8f0";
  ctx.font = "600 16px Inter, sans-serif";
  ctx.fillText("Xếp thuốc", padding, padding + 18);
  ctx.font = "12px Inter, sans-serif";
  ctx.fillText(`Điểm: ${pillState.score} • Kỷ lục: ${pillState.best}`, padding, padding + 36);
  return canvas;
}

function exportPillPng() {
  const canvas = buildPillCanvas();
  const stamp = new Date().toISOString().slice(0, 10);
  downloadCanvas(canvas, `pillstack_${stamp}.png`);
}

function openPillEndscreen(payload) {
  if (!pillEl.end) return;
  const summary = buildPillSummary(payload);
  if (pillEl.endSummary) pillEl.endSummary.textContent = summary;
  pillEl.end.classList.add("is-open");
  pillEl.end.setAttribute("aria-hidden", "false");
}

function closePillEndscreen() {
  if (!pillEl.end) return;
  pillEl.end.classList.remove("is-open");
  pillEl.end.setAttribute("aria-hidden", "true");
}

async function savePillRunToLibrary(payload) {
  const colors = getPillColors();
  const createdAt = new Date().toISOString();
  const canvas = buildPillCanvas();
  const snapshot = await captureCanvasImage(canvas, "image/png");
  let thumbnail = "";
  if (snapshot) {
    try {
      const stored = await uploadImage(snapshot, {
        sourceWorld: "colorplay",
        purpose: "pillstack-thumbnail",
        game: "pillstack"
      });
      thumbnail = stored?.key || "";
    } catch (_err) {
      thumbnail = "";
    }
  }
  const asset = {
    id: `colorplay_pill_${Date.now()}`,
    type: "colorplay_run",
    name: `Xếp thuốc · ${new Date().toLocaleDateString("vi-VN")}`,
    tags: ["colorplay", "pillstack", `difficulty:${payload.difficulty}`],
    payload: {
      game: "pillstack",
      colors,
      score: payload.score,
      best: payload.best,
      dropMs: payload.dropMs,
      durationMs: payload.durationMs,
      summary: buildPillSummary(payload),
      thumbnail
    },
    notes: "Thế giới trò chơi màu",
    createdAt,
    updatedAt: createdAt,
    sourceWorld: "colorplay",
    project: ""
  };
  try {
    const raw = localStorage.getItem(COLORPLAY_ASSET_KEY);
    const list = safeParseJSON(raw, []);
    const next = Array.isArray(list) ? list : [];
    next.unshift(asset);
    localStorage.setItem(COLORPLAY_ASSET_KEY, JSON.stringify(next));
    showToast("Đã lưu vào Thư viện.");
    return true;
  } catch (_err) {
    showToast("Không thể lưu vào Thư viện.");
    return false;
  }
}

function handlePillDifficultyChange() {
  const value = pillEl.difficulty?.value || "medium";
  if (!PILL_PRESETS[value]) return;
  settings.pillDifficulty = value;
  saveSettings();
  resetPillGame();
}

function handlePillColorblindToggle() {
  settings.colorBlind = !settings.colorBlind;
  applyColorBlindMode();
  pillEl.colorblind?.classList.toggle("is-active", settings.colorBlind);
  saveSettings();
}

async function handlePillEndCopy() {
  const summary = buildPillSummary();
  const ok = await copyText(summary);
  showToast(ok ? "Đã sao chép tóm tắt." : "Không thể sao chép.");
}

function handlePillEndPng() {
  exportPillPng();
}

async function handlePillEndSave() {
  const payload = buildPillRunPayload();
  await savePillRunToLibrary(payload);
}

function handlePillGameOver() {
  pillState.gameOver = true;
  pillState.elapsedMs = getPillElapsedMs();
  pillState.startedAt = null;
  pillState.paused = true;
  pillState.autoPaused = false;
  showPillStatus("Hết ô trống. Game over.");
  showToast("Game over. Nhấn Ván mới để chơi lại.");
  stopPillLoop();
  const payload = buildPillRunPayload();
  savePillLastRun(payload);
  clearPillProgress();
  openPillEndscreen(payload);
  updateLobbyStats();
}

function startPillLoop() {
  if (pillDropTimer) {
    window.clearInterval(pillDropTimer);
  }
  pillDropTimer = window.setInterval(() => {
    if (!pillMounted || pillState.gameOver || pillState.locked || pillState.paused) return;
    if (!pillState.active) return;
    if (!movePill(1, 0)) {
      lockPillPiece();
    }
  }, pillState.dropMs);
}

function stopPillLoop() {
  if (!pillDropTimer) return;
  window.clearInterval(pillDropTimer);
  pillDropTimer = null;
}

function resetPillGame() {
  const preset = getPillPreset(settings.pillDifficulty);
  pillState.dropMs = preset.dropMs;
  pillState.colorCount = preset.colorCount;
  pillState.grid = createPillGrid();
  pillState.score = 0;
  pillState.gameOver = false;
  pillState.locked = false;
  pillState.helpOpen = false;
  pillState.active = null;
  pillState.paused = false;
  pillState.autoPaused = false;
  pillState.startedAt = Date.now();
  pillState.elapsedMs = 0;
  pillState.hardDrops = 0;
  pillState.piecesLocked = 0;
  pillState.next = createPillPiece();
  renderPillStats();
  renderPillBoard();
  spawnPillPiece();
  showPillStatus("Dùng phím để điều khiển viên thuốc.");
  startPillLoop();
  closePillEndscreen();
  savePillProgress();
  if (pillEl.help) {
    pillEl.help.classList.remove("is-open");
    pillEl.help.setAttribute("aria-hidden", "true");
  }
}

function togglePillHelp(force) {
  if (!pillEl.help) return;
  if (typeof force === "boolean") {
    pillState.helpOpen = force;
  } else {
    pillState.helpOpen = !pillState.helpOpen;
  }
  pillEl.help.classList.toggle("is-open", pillState.helpOpen);
  pillEl.help.setAttribute("aria-hidden", pillState.helpOpen ? "false" : "true");
}

function runPillControl(action) {
  if (!pillMounted || pillState.gameOver || pillState.locked || pillState.paused) return;
  switch (action) {
    case "left":
      movePill(0, -1);
      break;
    case "right":
      movePill(0, 1);
      break;
    case "down":
      if (!movePill(1, 0)) {
        lockPillPiece();
      }
      break;
    case "rotate":
      rotatePill();
      break;
    case "drop":
      hardDropPill();
      break;
    default:
      break;
  }
}

function bindPillMobileControls() {
  pillControlCleanup.forEach((cleanup) => cleanup());
  pillControlCleanup = [];
  const controls = pillRoot?.querySelectorAll("[data-pill-control]") || [];
  controls.forEach((button) => {
    const action = button.dataset.pillControl;
    if (!action) return;
    let holdTimer = null;
    const isRepeat = action === "left" || action === "right" || action === "down";
    const clearHold = () => {
      if (holdTimer) {
        window.clearInterval(holdTimer);
        holdTimer = null;
      }
    };
    const onPointerDown = (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      runPillControl(action);
      if (isRepeat) {
        clearHold();
        holdTimer = window.setInterval(() => runPillControl(action), 90);
      }
    };
    const onPointerUp = () => clearHold();
    const onPointerLeave = () => clearHold();
    const onPointerCancel = () => clearHold();
    button.addEventListener("pointerdown", onPointerDown);
    button.addEventListener("pointerup", onPointerUp);
    button.addEventListener("pointerleave", onPointerLeave);
    button.addEventListener("pointercancel", onPointerCancel);
    pillControlCleanup.push(() => {
      button.removeEventListener("pointerdown", onPointerDown);
      button.removeEventListener("pointerup", onPointerUp);
      button.removeEventListener("pointerleave", onPointerLeave);
      button.removeEventListener("pointercancel", onPointerCancel);
      clearHold();
    });
  });
}

function handlePillKeydown(event) {
  if (!pillMounted) return;
  if (isTypingContext(event.target)) return;
  if (event.key === "Escape") {
    event.preventDefault();
    savePillProgress();
    setLobbyOpen("");
    showToast("Đã đóng Xếp thuốc.");
    return;
  }
  if (pillState.paused) return;
  if (pillState.gameOver) {
    if (event.key === "n" || event.key === "N") {
      event.preventDefault();
      resetPillGame();
    }
    return;
  }
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    movePill(0, -1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    movePill(0, 1);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    if (!movePill(1, 0)) {
      lockPillPiece();
    }
  } else if (event.key === "ArrowUp" || event.key === "x" || event.key === "X") {
    event.preventDefault();
    rotatePill();
  } else if (event.code === "Space") {
    event.preventDefault();
    hardDropPill();
  }
}

function mountPill(rootEl) {
  if (!rootEl) return;
  unmountPill();
  pillRoot = rootEl;
  pillRoot.innerHTML = `
    <div class="tc-colorplay-game tc-pill-game">
      <div class="tc-colorplay-hud tc-pill-hud">
        <div class="tc-colorplay-hud-section">
          <p class="tc-colorplay-hud-title">Điểm số</p>
          <div class="tc-colorplay-score mt-3">
            <div class="tc-colorplay-score-item">
              <span class="tc-muted text-xs">Điểm hiện tại</span>
              <span data-pill="score" class="text-2xl font-semibold">0</span>
            </div>
            <div class="tc-colorplay-score-item">
              <span class="tc-muted text-xs">Kỷ lục</span>
              <span data-pill="best" class="text-xl font-semibold">0</span>
            </div>
          </div>
          <div class="tc-colorplay-tools mt-4">
            <p data-pill="status" class="tc-muted text-xs">Dùng phím để điều khiển viên thuốc.</p>
            <div class="tc-colorplay-config">
              <label class="tc-muted text-[10px] uppercase tracking-[0.2em]">Tốc độ rơi</label>
              <select data-pill="difficulty" class="tc-input tc-colorplay-select">
                <option value="easy">Chậm</option>
                <option value="medium" selected>Vừa</option>
                <option value="hard">Nhanh</option>
              </select>
              <button data-pill-action="colorblind" class="tc-icon-btn" type="button" data-tooltip="Hỗ trợ mù màu" aria-label="Hỗ trợ mù màu">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6-10-6-10-6z" fill="none" stroke="currentColor" stroke-width="2"></path>
                  <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"></circle>
                </svg>
              </button>
            </div>
            <div class="tc-colorplay-controls">
              <button data-pill-action="new" class="tc-icon-btn" type="button" data-tooltip="Ván mới" aria-label="Ván mới">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 4v4h4M19 20v-4h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M19 10a7 7 0 0 0-12-4M5 14a7 7 0 0 0 12 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </button>
              <button data-pill-action="help" class="tc-icon-btn" type="button" data-tooltip="Hướng dẫn" aria-label="Hướng dẫn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"></circle>
                  <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                  <circle cx="12" cy="17" r="1" fill="currentColor"></circle>
                </svg>
              </button>
              <button data-pill-action="shortcuts" class="tc-icon-btn" type="button" data-tooltip="←/→/↓/↑/Space" aria-label="Phím tắt">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2"></rect>
                  <path d="M7 10h2M11 10h2M15 10h2M7 14h10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                </svg>
              </button>
            </div>
            <div data-pill="help" class="tc-colorplay-help" aria-hidden="true">
              <p>←/→: di chuyển, ↓: rơi nhanh, Space: thả nhanh.</p>
              <p>↑ hoặc X: xoay viên thuốc, Esc: đóng game.</p>
              <p>Tạo 4+ ô cùng màu để xoá và cộng điểm.</p>
            </div>
          </div>
        </div>
        <div class="tc-colorplay-hud-section tc-colorplay-hud-next">
          <p class="tc-colorplay-hud-title">Sắp ra</p>
          <p class="tc-muted text-xs mt-1">Cặp màu kế tiếp.</p>
          <div data-pill="next" class="tc-pill-next mt-3"></div>
        </div>
      </div>
      <div class="tc-colorplay-board-wrap">
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold">Bàn 8×16</p>
          <span class="tc-muted text-xs">Xếp thuốc</span>
        </div>
        <div data-pill="board" class="tc-pill-board mt-3" aria-label="Bàn 8×16"></div>
        <div class="tc-pill-mobile" aria-label="Điều khiển nhanh">
          <div class="tc-pill-mobile-row">
            <button class="tc-icon-btn tc-pill-btn" type="button" data-pill-control="left" data-tooltip="Trái" aria-label="Trái">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <button class="tc-icon-btn tc-pill-btn" type="button" data-pill-control="rotate" data-tooltip="Xoay" aria-label="Xoay">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 13a6 6 0 1 0 3-5.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                <path d="M6 4v4h4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <button class="tc-icon-btn tc-pill-btn" type="button" data-pill-control="right" data-tooltip="Phải" aria-label="Phải">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M10 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
          </div>
          <div class="tc-pill-mobile-row">
            <button class="tc-icon-btn tc-pill-btn" type="button" data-pill-control="down" data-tooltip="Rơi" aria-label="Rơi nhanh">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 5v12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                <path d="M7 12l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <button class="tc-icon-btn tc-pill-btn" type="button" data-pill-control="drop" data-tooltip="Thả" aria-label="Thả nhanh">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 4v10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                <path d="M7 12l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M7 20h10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div data-pill-end class="tc-colorplay-end" aria-hidden="true">
        <div class="tc-colorplay-end-card">
          <div class="tc-colorplay-end-title">Tổng kết Xếp thuốc</div>
          <p data-pill-end-summary class="tc-muted text-xs"></p>
          <div class="tc-colorplay-end-actions">
            <button data-pill-end-action="copy" class="tc-btn tc-chip px-3 py-2 text-xs" type="button">Sao chép tóm tắt</button>
            <button data-pill-end-action="png" class="tc-btn tc-chip px-3 py-2 text-xs" type="button">Xuất PNG</button>
            <button data-pill-end-action="save" class="tc-btn tc-btn-primary px-3 py-2 text-xs" type="button">Lưu vào Thư viện</button>
          </div>
        </div>
      </div>
    </div>
  `;

  pillEl = {
    board: pillRoot.querySelector('[data-pill="board"]'),
    next: pillRoot.querySelector('[data-pill="next"]'),
    score: pillRoot.querySelector('[data-pill="score"]'),
    best: pillRoot.querySelector('[data-pill="best"]'),
    status: pillRoot.querySelector('[data-pill="status"]'),
    difficulty: pillRoot.querySelector('[data-pill="difficulty"]'),
    colorblind: pillRoot.querySelector('[data-pill-action="colorblind"]'),
    newGame: pillRoot.querySelector('[data-pill-action="new"]'),
    helpBtn: pillRoot.querySelector('[data-pill-action="help"]'),
    shortcuts: pillRoot.querySelector('[data-pill-action="shortcuts"]'),
    help: pillRoot.querySelector('[data-pill="help"]'),
    end: pillRoot.querySelector("[data-pill-end]"),
    endSummary: pillRoot.querySelector("[data-pill-end-summary]"),
    endCopy: pillRoot.querySelector('[data-pill-end-action="copy"]'),
    endPng: pillRoot.querySelector('[data-pill-end-action="png"]'),
    endSave: pillRoot.querySelector('[data-pill-end-action="save"]')
  };

  pillState.best = loadPillBestScore();
  renderPillBoardShell();
  if (pillEl.difficulty) pillEl.difficulty.value = settings.pillDifficulty;
  if (pillEl.colorblind) pillEl.colorblind.classList.toggle("is-active", settings.colorBlind);
  if (pillResumeRequested) {
    const saved = readPillSave();
    if (!saved || !applyPillSave(saved)) {
      resetPillGame();
    }
  } else {
    resetPillGame();
  }
  pillResumeRequested = false;
  pillEl.newGame?.addEventListener("click", resetPillGame);
  pillEl.helpBtn?.addEventListener("click", togglePillHelp);
  pillEl.shortcuts?.addEventListener("click", togglePillHelp);
  pillEl.difficulty?.addEventListener("change", handlePillDifficultyChange);
  pillEl.colorblind?.addEventListener("click", handlePillColorblindToggle);
  pillEl.endCopy?.addEventListener("click", handlePillEndCopy);
  pillEl.endPng?.addEventListener("click", handlePillEndPng);
  pillEl.endSave?.addEventListener("click", handlePillEndSave);
  window.addEventListener("keydown", handlePillKeydown);
  setupTooltipLongPress(pillRoot);
  bindPillMobileControls();
  pillMounted = true;
}

function unmountPill() {
  if (!pillRoot) return;
  savePillProgress();
  pillEl.newGame?.removeEventListener("click", resetPillGame);
  pillEl.helpBtn?.removeEventListener("click", togglePillHelp);
  pillEl.shortcuts?.removeEventListener("click", togglePillHelp);
  pillEl.difficulty?.removeEventListener("change", handlePillDifficultyChange);
  pillEl.colorblind?.removeEventListener("click", handlePillColorblindToggle);
  pillEl.endCopy?.removeEventListener("click", handlePillEndCopy);
  pillEl.endPng?.removeEventListener("click", handlePillEndPng);
  pillEl.endSave?.removeEventListener("click", handlePillEndSave);
  window.removeEventListener("keydown", handlePillKeydown);
  tooltipCleanup.forEach((cleanup) => cleanup());
  tooltipCleanup = [];
  pillControlCleanup.forEach((cleanup) => cleanup());
  pillControlCleanup = [];
  stopPillLoop();
  pillRoot.innerHTML = "";
  pillRoot = null;
  pillMounted = false;
  pillEl = {};
}

function shuffleArray(list) {
  const output = Array.isArray(list) ? list.slice() : [];
  for (let i = output.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
}

function randomInt(min, max) {
  const low = Math.ceil(Number(min));
  const high = Math.floor(Number(max));
  if (!Number.isFinite(low) || !Number.isFinite(high)) return 0;
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

function normalizeSudokuValues(list, allowEmpty = false) {
  if (!Array.isArray(list) || list.length !== 81) return null;
  const output = [];
  for (let i = 0; i < 81; i += 1) {
    const value = list[i];
    if (value == null) {
      if (!allowEmpty) return null;
      output.push(-1);
      continue;
    }
    const num = Number(value);
    if (!Number.isInteger(num)) return null;
    if (num < 0 || num > 8) {
      if (allowEmpty && num === -1) {
        output.push(-1);
        continue;
      }
      return null;
    }
    output.push(num);
  }
  return output;
}

function normalizeSudokuGivens(list) {
  if (!Array.isArray(list) || list.length !== 81) return null;
  return list.map((value) => Boolean(value));
}

function normalizeSudokuColors(list) {
  if (!Array.isArray(list) || list.length !== 9) return [...SUDOKU_COLORS];
  return list.map((value, index) => {
    if (typeof value === "string" && value.trim()) return value;
    return SUDOKU_COLORS[index] || "#94a3b8";
  });
}

function readSudokuSave() {
  const parsed = safeParseJSON(localStorage.getItem(SUDOKU_SAVE_KEY), null);
  if (!parsed || parsed.version !== SUDOKU_SAVE_VERSION) return null;
  const data = parsed.data || parsed.state;
  if (!data) return null;
  const difficulty = SUDOKU_PRESETS[data.difficulty] ? data.difficulty : sudokuState.difficulty;
  const colors = normalizeSudokuColors(data.colors);
  const solution = normalizeSudokuValues(data.solution, false);
  const current = normalizeSudokuValues(data.current, true);
  const givens = normalizeSudokuGivens(data.givens);
  if (!solution || !current || !givens) return null;
  return {
    version: parsed.version,
    savedAt: parsed.savedAt || "",
    data: {
      difficulty,
      colors,
      solution,
      current,
      givens,
      elapsedSeconds: clampNumber(data.elapsedSeconds, 0, 3600 * 24),
      mistakes: clampNumber(data.mistakes, 0, 9999),
      selectedColor: clampNumber(data.selectedColor, 0, 8),
      eraseMode: Boolean(data.eraseMode),
      showSymbols: Boolean(data.showSymbols),
      hintsLeft: Number.isFinite(data.hintsLeft) ? clampNumber(data.hintsLeft, 0, 99) : null
    }
  };
}

function hasSudokuSave() {
  return Boolean(readSudokuSave());
}

function applySudokuSave(payload) {
  if (!payload?.data) return false;
  const data = payload.data;
  sudokuState.difficulty = data.difficulty;
  sudokuState.colors = [...data.colors];
  sudokuState.solution = data.solution.slice();
  sudokuState.current = data.current.slice();
  sudokuState.givens = data.givens.map((value) => Boolean(value));
  sudokuState.current = sudokuState.current.map((value, index) => (
    sudokuState.givens[index] ? sudokuState.solution[index] : value
  ));
  sudokuState.selectedColor = Math.round(clampNumber(data.selectedColor ?? 0, 0, 8));
  sudokuState.selectedCell = null;
  sudokuState.eraseMode = Boolean(data.eraseMode);
  sudokuState.showSymbols = Boolean(data.showSymbols);
  sudokuState.mistakes = clampNumber(data.mistakes, 0, 9999);
  sudokuState.elapsedSeconds = clampNumber(data.elapsedSeconds, 0, 3600 * 24);
  sudokuState.startedAt = Date.now();
  sudokuState.paused = false;
  sudokuState.autoPaused = false;
  sudokuState.gameOver = false;
  sudokuState.hintCooldownUntil = 0;
  sudokuState.lastMistakeAt = 0;
  if (data.hintsLeft == null) {
    sudokuState.hintsLeft = getSudokuInitialHints(sudokuState.difficulty);
  } else if (Number.isFinite(data.hintsLeft)) {
    sudokuState.hintsLeft = clampNumber(data.hintsLeft, 0, 99);
  } else {
    sudokuState.hintsLeft = getSudokuInitialHints(sudokuState.difficulty);
  }
  closeSudokuEndscreen();
  if (sudokuEl.difficulty) sudokuEl.difficulty.value = sudokuState.difficulty;
  renderSudokuBoard();
  renderSudokuPalette();
  renderSudokuMetrics();
  updateSudokuControls();
  startSudokuTimer();
  showSudokuStatus("Đã khôi phục ván đang chơi.");
  return true;
}

function saveSudokuProgress() {
  if (!sudokuRoot) return;
  if (sudokuState.gameOver) {
    clearSudokuProgress();
    return;
  }
  if (!sudokuState.current.length || !sudokuState.solution.length) return;
  const payload = {
    version: SUDOKU_SAVE_VERSION,
    savedAt: new Date().toISOString(),
    data: {
      difficulty: sudokuState.difficulty,
      colors: [...sudokuState.colors],
      solution: sudokuState.solution.slice(),
      current: sudokuState.current.slice(),
      givens: sudokuState.givens.slice(),
      elapsedSeconds: getSudokuElapsedSeconds(),
      mistakes: sudokuState.mistakes,
      selectedColor: sudokuState.selectedColor,
      eraseMode: sudokuState.eraseMode,
      showSymbols: sudokuState.showSymbols,
      hintsLeft: sudokuState.hintsLeft
    }
  };
  try {
    localStorage.setItem(SUDOKU_SAVE_KEY, JSON.stringify(payload));
  } catch (_err) {
    // ignore
  }
  updateLobbyStats();
}

function clearSudokuProgress() {
  try {
    localStorage.removeItem(SUDOKU_SAVE_KEY);
  } catch (_err) {
    // ignore
  }
  updateLobbyStats();
}

function buildSudokuSummary(data = {}) {
  const durationSec = Number(data.durationSec ?? getSudokuElapsedSeconds() ?? 0);
  const mistakes = Number(data.mistakes ?? sudokuState.mistakes ?? 0);
  const preset = getSudokuPreset(data.difficulty || sudokuState.difficulty);
  const parts = [`Sudoku màu • ${preset.label}`];
  if (durationSec > 0) parts.push(formatSudokuDuration(durationSec));
  if (mistakes > 0) parts.push(`${mistakes} lỗi`);
  return parts.join(" • ");
}

function openSudokuEndscreen(payload) {
  if (!sudokuEl.end) return;
  const summary = buildSudokuSummary(payload);
  if (sudokuEl.endSummary) sudokuEl.endSummary.textContent = summary;
  sudokuEl.end.classList.add("is-open");
  sudokuEl.end.setAttribute("aria-hidden", "false");
}

function closeSudokuEndscreen() {
  if (!sudokuEl.end) return;
  sudokuEl.end.classList.remove("is-open");
  sudokuEl.end.setAttribute("aria-hidden", "true");
}

function getSudokuColor(index) {
  return sudokuState.colors[index] || SUDOKU_COLORS[index] || "#e2e8f0";
}

function hexToRgb(hex) {
  if (typeof hex !== "string") return null;
  const raw = hex.trim().replace("#", "");
  if (raw.length !== 6 && raw.length !== 3) return null;
  const normalized = raw.length === 3
    ? raw.split("").map((ch) => ch + ch).join("")
    : raw;
  const intVal = Number.parseInt(normalized, 16);
  if (!Number.isFinite(intVal)) return null;
  return {
    r: (intVal >> 16) & 255,
    g: (intVal >> 8) & 255,
    b: intVal & 255
  };
}

function getSudokuTextColor(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#111";
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  return luminance > 0.6 ? "#111" : "#fff";
}

function computeSudokuConflicts(values) {
  const conflicts = new Set();
  if (!Array.isArray(values) || values.length !== 81) return conflicts;
  const mark = (bucket, idx, value) => {
    if (!bucket.has(value)) {
      bucket.set(value, [idx]);
      return;
    }
    const list = bucket.get(value);
    list.push(idx);
    list.forEach((item) => conflicts.add(item));
  };
  for (let row = 0; row < 9; row += 1) {
    const bucket = new Map();
    for (let col = 0; col < 9; col += 1) {
      const idx = row * 9 + col;
      const value = values[idx];
      if (value < 0) continue;
      mark(bucket, idx, value);
    }
  }
  for (let col = 0; col < 9; col += 1) {
    const bucket = new Map();
    for (let row = 0; row < 9; row += 1) {
      const idx = row * 9 + col;
      const value = values[idx];
      if (value < 0) continue;
      mark(bucket, idx, value);
    }
  }
  for (let boxRow = 0; boxRow < 3; boxRow += 1) {
    for (let boxCol = 0; boxCol < 3; boxCol += 1) {
      const bucket = new Map();
      for (let row = 0; row < 3; row += 1) {
        for (let col = 0; col < 3; col += 1) {
          const r = boxRow * 3 + row;
          const c = boxCol * 3 + col;
          const idx = r * 9 + c;
          const value = values[idx];
          if (value < 0) continue;
          mark(bucket, idx, value);
        }
      }
    }
  }
  return conflicts;
}

function renderSudokuBoardShell() {
  if (!sudokuEl.board) return;
  sudokuEl.board.innerHTML = "";
  sudokuEl.cells = [];
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      const idx = row * 9 + col;
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = "tc-sudoku-cell";
      cell.dataset.row = String(row);
      cell.dataset.col = String(col);
      cell.dataset.idx = String(idx);
      cell.setAttribute("aria-label", `Ô hàng ${row + 1}, cột ${col + 1}`);
      if (col === 2 || col === 5) cell.classList.add("block-right");
      if (row === 2 || row === 5) cell.classList.add("block-bottom");
      sudokuEl.board.appendChild(cell);
      sudokuEl.cells.push(cell);
    }
  }
}

function renderSudokuBoard() {
  if (!Array.isArray(sudokuEl.cells) || !sudokuEl.cells.length) return;
  const conflicts = computeSudokuConflicts(sudokuState.current);
  sudokuEl.cells.forEach((cell, idx) => {
    const value = sudokuState.current[idx];
    const isGiven = sudokuState.givens[idx];
    cell.classList.toggle("is-given", isGiven);
    cell.classList.toggle("is-conflict", conflicts.has(idx));
    cell.classList.toggle("is-selected", sudokuState.selectedCell === idx);
    if (value >= 0) {
      const hex = getSudokuColor(value);
      cell.style.background = hex;
      if (sudokuState.showSymbols) {
        cell.textContent = SUDOKU_SYMBOLS[value] || "";
        cell.style.color = getSudokuTextColor(hex);
        cell.style.textShadow = "0 1px 2px rgba(15, 23, 42, 0.25)";
      } else {
        cell.textContent = "";
        cell.style.color = "";
        cell.style.textShadow = "";
      }
    } else {
      cell.style.background = "";
      cell.textContent = "";
      cell.style.color = "";
      cell.style.textShadow = "";
    }
  });
}

function renderSudokuPalette() {
  if (!sudokuEl.palette) return;
  sudokuEl.palette.innerHTML = "";
  sudokuState.colors.forEach((hex, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tc-sudoku-color";
    button.dataset.colorIndex = String(index);
    button.style.background = hex;
    if (sudokuState.showSymbols) {
      button.textContent = SUDOKU_SYMBOLS[index] || "";
      button.style.color = getSudokuTextColor(hex);
      button.style.textShadow = "0 1px 2px rgba(15, 23, 42, 0.25)";
    }
    if (!sudokuState.eraseMode && sudokuState.selectedColor === index) {
      button.classList.add("is-active");
    }
    button.setAttribute("aria-label", `Màu ${index + 1}`);
    sudokuEl.palette.appendChild(button);
  });
}

function renderSudokuMetrics() {
  if (sudokuEl.time) sudokuEl.time.textContent = formatSudokuDuration(getSudokuElapsedSeconds());
  if (sudokuEl.mistakes) sudokuEl.mistakes.textContent = String(sudokuState.mistakes);
  if (sudokuEl.hint) {
    const remaining = sudokuState.hintCooldownUntil - Date.now();
    const hintsLeft = Number.isFinite(sudokuState.hintsLeft) ? Math.max(0, sudokuState.hintsLeft) : Infinity;
    if (remaining > 0) {
      sudokuEl.hint.disabled = true;
      sudokuEl.hint.textContent = `Gợi ý (${Math.ceil(remaining / 1000)}s)`;
    } else {
      sudokuEl.hint.disabled = sudokuState.gameOver || hintsLeft <= 0;
      sudokuEl.hint.textContent = Number.isFinite(hintsLeft)
        ? `Gợi ý (còn ${hintsLeft})`
        : "Gợi ý";
    }
  }
}

function updateSudokuControls() {
  if (sudokuEl.erase) sudokuEl.erase.classList.toggle("is-active", sudokuState.eraseMode);
  if (sudokuEl.symbols) sudokuEl.symbols.checked = sudokuState.showSymbols;
  renderSudokuPalette();
  renderSudokuMetrics();
}

function showSudokuStatus(message, duration = 1600) {
  if (!sudokuEl.status) return;
  if (sudokuStatusTimer) {
    window.clearTimeout(sudokuStatusTimer);
    sudokuStatusTimer = null;
  }
  sudokuEl.status.textContent = message || "";
  if (!message) return;
  sudokuStatusTimer = window.setTimeout(() => {
    if (sudokuEl.status) sudokuEl.status.textContent = "";
  }, duration);
}

function getSudokuCandidates(grid, index) {
  const row = Math.floor(index / 9);
  const col = index % 9;
  const used = Array.from({ length: 9 }, () => false);
  for (let c = 0; c < 9; c += 1) {
    const value = grid[row * 9 + c];
    if (value >= 0) used[value] = true;
  }
  for (let r = 0; r < 9; r += 1) {
    const value = grid[r * 9 + col];
    if (value >= 0) used[value] = true;
  }
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) {
      const value = grid[(boxRow + r) * 9 + (boxCol + c)];
      if (value >= 0) used[value] = true;
    }
  }
  const candidates = [];
  for (let value = 0; value < 9; value += 1) {
    if (!used[value]) candidates.push(value);
  }
  return candidates;
}

function countSudokuSolutions(board, limit = 2) {
  const grid = board.slice();
  let count = 0;
  const search = () => {
    if (count >= limit) return;
    let bestIndex = -1;
    let bestCandidates = null;
    for (let i = 0; i < 81; i += 1) {
      if (grid[i] >= 0) continue;
      const candidates = getSudokuCandidates(grid, i);
      if (!candidates.length) return;
      if (!bestCandidates || candidates.length < bestCandidates.length) {
        bestCandidates = candidates;
        bestIndex = i;
        if (candidates.length === 1) break;
      }
    }
    if (bestIndex === -1) {
      count += 1;
      return;
    }
    for (let i = 0; i < bestCandidates.length; i += 1) {
      grid[bestIndex] = bestCandidates[i];
      search();
      if (count >= limit) break;
    }
    grid[bestIndex] = -1;
  };
  search();
  return count;
}

function generateSudokuSolution() {
  const base = Array.from({ length: 9 }, (_, i) => i);
  const pattern = (r, c) => (r * 3 + Math.floor(r / 3) + c) % 9;
  const rows = shuffleArray([0, 1, 2]).flatMap((band) =>
    shuffleArray([0, 1, 2]).map((row) => band * 3 + row)
  );
  const cols = shuffleArray([0, 1, 2]).flatMap((stack) =>
    shuffleArray([0, 1, 2]).map((col) => stack * 3 + col)
  );
  const nums = shuffleArray(base);
  const board = [];
  rows.forEach((row) => {
    cols.forEach((col) => {
      board.push(nums[pattern(row, col)]);
    });
  });
  return board;
}

function createSudokuPuzzle(difficulty) {
  const preset = getSudokuPreset(difficulty);
  const target = randomInt(preset.min, preset.max);
  const maxAttempts = 1200;
  const maxRegens = 6;
  let fallback = null;
  for (let regen = 0; regen < maxRegens; regen += 1) {
    const solution = generateSudokuSolution();
    const current = solution.slice();
    let givensCount = 81;
    const indices = shuffleArray(Array.from({ length: 81 }, (_, i) => i));
    let attempts = 0;
    while (givensCount > target && indices.length && attempts < maxAttempts) {
      const idx = indices.pop();
      const backup = current[idx];
      current[idx] = -1;
      if (countSudokuSolutions(current, 2) !== 1) {
        current[idx] = backup;
      } else {
        givensCount -= 1;
      }
      attempts += 1;
    }
    const givens = current.map((value) => value >= 0);
    if (givensCount <= target) {
      return { solution, current, givens };
    }
    if (!fallback || givensCount < fallback.givensCount) {
      fallback = { solution, current, givens, givensCount };
    }
  }
  if (fallback) {
    return { solution: fallback.solution, current: fallback.current, givens: fallback.givens };
  }
  const solution = generateSudokuSolution();
  const current = solution.slice();
  return { solution, current, givens: current.map((value) => value >= 0) };
}

function resetSudokuGame(forceDifficulty) {
  const difficulty = SUDOKU_PRESETS[forceDifficulty] ? forceDifficulty : sudokuState.difficulty;
  sudokuState.difficulty = difficulty;
  sudokuState.colors = [...SUDOKU_COLORS];
  const puzzle = createSudokuPuzzle(difficulty);
  sudokuState.solution = puzzle.solution;
  sudokuState.current = puzzle.current;
  sudokuState.givens = puzzle.givens;
  sudokuState.selectedColor = 0;
  sudokuState.selectedCell = null;
  sudokuState.eraseMode = false;
  sudokuState.mistakes = 0;
  sudokuState.elapsedSeconds = 0;
  sudokuState.startedAt = Date.now();
  sudokuState.paused = false;
  sudokuState.autoPaused = false;
  sudokuState.gameOver = false;
  sudokuState.hintCooldownUntil = 0;
  sudokuState.lastMistakeAt = 0;
  sudokuState.hintsLeft = getSudokuInitialHints(difficulty);
  closeSudokuEndscreen();
  if (sudokuEl.difficulty) sudokuEl.difficulty.value = sudokuState.difficulty;
  renderSudokuBoard();
  renderSudokuPalette();
  renderSudokuMetrics();
  updateSudokuControls();
  startSudokuTimer();
  showSudokuStatus("Đã tạo ván mới.");
  saveSudokuProgress();
}

function scheduleSudokuSave() {
  if (sudokuSaveTimer) {
    window.clearTimeout(sudokuSaveTimer);
  }
  sudokuSaveTimer = window.setTimeout(() => {
    sudokuSaveTimer = null;
    saveSudokuProgress();
  }, 300);
}

function handleSudokuDifficultyChange(event) {
  const value = event?.target?.value;
  if (!SUDOKU_PRESETS[value]) return;
  sudokuState.difficulty = value;
  resetSudokuGame(value);
}

function handleSudokuPaletteClick(event) {
  const button = event.target.closest("[data-color-index]");
  if (!button || !sudokuMounted) return;
  const index = Number(button.dataset.colorIndex);
  if (!Number.isInteger(index) || index < 0 || index > 8) return;
  sudokuState.selectedColor = index;
  sudokuState.eraseMode = false;
  updateSudokuControls();
}

function applySudokuValue(idx, nextValue) {
  if (sudokuState.givens[idx]) {
    renderSudokuBoard();
    return;
  }
  if (sudokuState.current[idx] === nextValue) {
    renderSudokuBoard();
    return;
  }
  sudokuState.current[idx] = nextValue;
  if (nextValue >= 0 && sudokuState.solution[idx] !== nextValue) {
    sudokuState.mistakes += 1;
    const now = Date.now();
    if (now - sudokuState.lastMistakeAt > 1200) {
      showSudokuStatus("Ô này chưa đúng.");
      sudokuState.lastMistakeAt = now;
    }
  }
  renderSudokuBoard();
  renderSudokuMetrics();
  scheduleSudokuSave();
  checkSudokuWin();
}

function handleSudokuCellClick(event) {
  const button = event.target.closest(".tc-sudoku-cell");
  if (!button || !sudokuMounted) return;
  if (sudokuState.gameOver || sudokuState.paused) return;
  const idx = Number(button.dataset.idx);
  if (!Number.isInteger(idx)) return;
  sudokuState.selectedCell = idx;
  const nextValue = sudokuState.eraseMode ? -1 : sudokuState.selectedColor;
  applySudokuValue(idx, nextValue);
}

function handleSudokuEraseToggle() {
  sudokuState.eraseMode = !sudokuState.eraseMode;
  updateSudokuControls();
  showSudokuStatus(sudokuState.eraseMode ? "Đang bật Xóa." : "Đã tắt Xóa.");
}

function handleSudokuSymbolsToggle(event) {
  sudokuState.showSymbols = Boolean(event?.target?.checked);
  renderSudokuBoard();
  renderSudokuPalette();
}

function handleSudokuHint() {
  if (!sudokuMounted || sudokuState.gameOver || sudokuState.paused) return;
  if (Number.isFinite(sudokuState.hintsLeft) && sudokuState.hintsLeft <= 0) {
    showSudokuStatus("Đã hết gợi ý.");
    renderSudokuMetrics();
    return;
  }
  const now = Date.now();
  if (now < sudokuState.hintCooldownUntil) {
    const remaining = Math.ceil((sudokuState.hintCooldownUntil - now) / 1000);
    showSudokuStatus(`Gợi ý sẽ sẵn sàng sau ${remaining}s.`);
    return;
  }
  const empties = [];
  sudokuState.current.forEach((value, index) => {
    if (value < 0) empties.push(index);
  });
  if (!empties.length) {
    showSudokuStatus("Không còn ô trống.");
    return;
  }
  const idx = empties[Math.floor(Math.random() * empties.length)];
  sudokuState.current[idx] = sudokuState.solution[idx];
  sudokuState.givens[idx] = true;
  sudokuState.selectedCell = idx;
  if (Number.isFinite(sudokuState.hintsLeft)) {
    sudokuState.hintsLeft = Math.max(0, sudokuState.hintsLeft - 1);
  }
  sudokuState.hintCooldownUntil = now + HINT_COOLDOWN_MS;
  showSudokuStatus("Đã gợi ý 1 ô.");
  renderSudokuBoard();
  renderSudokuMetrics();
  scheduleSudokuSave();
  checkSudokuWin();
}

function checkSudokuWin() {
  if (!sudokuState.solution.length || !sudokuState.current.length) return false;
  for (let i = 0; i < 81; i += 1) {
    if (sudokuState.current[i] !== sudokuState.solution[i]) return false;
  }
  const durationSec = getSudokuElapsedSeconds();
  sudokuState.elapsedSeconds = durationSec;
  sudokuState.startedAt = null;
  sudokuState.gameOver = true;
  stopSudokuTimer();
  const payload = {
    durationSec,
    difficulty: sudokuState.difficulty,
    mistakes: sudokuState.mistakes
  };
  saveSudokuLastRun({
    ...payload,
    playedAt: new Date().toISOString()
  });
  updateSudokuBest(durationSec, sudokuState.difficulty);
  clearSudokuProgress();
  updateLobbyStats();
  openSudokuEndscreen(payload);
  showSudokuStatus("Hoàn thành.");
  return true;
}

function handleSudokuNewGame() {
  resetSudokuGame();
}

function handleSudokuEndClose() {
  closeSudokuEndscreen();
}

function handleSudokuEndNew() {
  closeSudokuEndscreen();
  resetSudokuGame();
}

function handleSudokuKeydown(event) {
  if (!sudokuMounted) return;
  if (isTypingContext(event.target)) return;
  if ((sudokuState.gameOver || sudokuState.paused) && event.key !== "Escape") return;
  if (event.key >= "1" && event.key <= "9") {
    event.preventDefault();
    const index = Number(event.key) - 1;
    if (Number.isInteger(index) && index >= 0 && index <= 8) {
      sudokuState.selectedColor = index;
      sudokuState.eraseMode = false;
      if (Number.isInteger(sudokuState.selectedCell)) {
        applySudokuValue(sudokuState.selectedCell, index);
      } else {
        updateSudokuControls();
      }
    }
    return;
  }
  if (event.key === "Escape") {
    event.preventDefault();
    if (Number.isInteger(sudokuState.selectedCell)) {
      sudokuState.selectedCell = null;
      renderSudokuBoard();
      showSudokuStatus("Đã bỏ chọn ô.");
      return;
    }
    saveSudokuProgress();
    setLobbyOpen("");
    showToast("Đã đóng Sudoku màu.");
  }
}

function mountSudoku(rootEl) {
  if (!rootEl) return;
  unmountSudoku();
  sudokuRoot = rootEl;
  sudokuRoot.innerHTML = `
    <div class="tc-colorplay-game tc-sudoku-game">
      <div class="tc-sudoku-hud">
        <div class="tc-sudoku-metrics">
          <div class="tc-sudoku-metric">
            <span class="tc-muted text-[10px] uppercase tracking-[0.2em]">Thời gian</span>
            <span data-sudoku="time" class="text-lg font-semibold">0:00</span>
          </div>
          <div class="tc-sudoku-metric">
            <span class="tc-muted text-[10px] uppercase tracking-[0.2em]">Lỗi</span>
            <span data-sudoku="mistakes" class="text-lg font-semibold">0</span>
          </div>
        </div>
        <div class="tc-sudoku-controls">
          <label class="tc-muted text-[10px] uppercase tracking-[0.2em]">Độ khó</label>
          <select data-sudoku="difficulty" class="tc-input tc-colorplay-select">
            <option value="easy">Dễ</option>
            <option value="medium">Vừa</option>
            <option value="hard">Khó</option>
            <option value="expert">Siêu khó</option>
          </select>
          <button data-sudoku-action="new" class="tc-btn tc-chip px-3 py-2 text-xs" type="button">Ván mới</button>
          <button data-sudoku-action="hint" class="tc-btn tc-chip px-3 py-2 text-xs" type="button">Gợi ý</button>
          <button data-sudoku-action="erase" class="tc-btn tc-chip px-3 py-2 text-xs" type="button">Xóa</button>
          <label class="tc-sudoku-toggle tc-muted">
            <input type="checkbox" data-sudoku-action="symbols">
            <span>Ký hiệu (1–9)</span>
          </label>
        </div>
      </div>
      <p data-sudoku="status" class="tc-sudoku-status tc-muted text-xs"></p>
      <div data-sudoku="board" class="tc-sudoku-board" aria-label="Bàn Sudoku màu"></div>
      <div data-sudoku="palette" class="tc-sudoku-palette" aria-label="Bảng màu Sudoku"></div>
      <div data-sudoku-end class="tc-colorplay-end" aria-hidden="true">
        <div class="tc-colorplay-end-card">
          <div class="tc-colorplay-end-title">Hoàn thành</div>
          <p data-sudoku-end-summary class="tc-muted text-xs"></p>
          <div class="tc-colorplay-end-actions">
            <button data-sudoku-end-action="close" class="tc-btn tc-chip px-3 py-2 text-xs" type="button">Đóng</button>
            <button data-sudoku-end-action="new" class="tc-btn tc-btn-primary px-3 py-2 text-xs" type="button">Ván mới</button>
          </div>
        </div>
      </div>
    </div>
  `;

  sudokuEl = {
    board: sudokuRoot.querySelector('[data-sudoku="board"]'),
    palette: sudokuRoot.querySelector('[data-sudoku="palette"]'),
    time: sudokuRoot.querySelector('[data-sudoku="time"]'),
    mistakes: sudokuRoot.querySelector('[data-sudoku="mistakes"]'),
    difficulty: sudokuRoot.querySelector('[data-sudoku="difficulty"]'),
    newGame: sudokuRoot.querySelector('[data-sudoku-action="new"]'),
    hint: sudokuRoot.querySelector('[data-sudoku-action="hint"]'),
    erase: sudokuRoot.querySelector('[data-sudoku-action="erase"]'),
    symbols: sudokuRoot.querySelector('[data-sudoku-action="symbols"]'),
    status: sudokuRoot.querySelector('[data-sudoku="status"]'),
    end: sudokuRoot.querySelector("[data-sudoku-end]"),
    endSummary: sudokuRoot.querySelector("[data-sudoku-end-summary]"),
    endClose: sudokuRoot.querySelector('[data-sudoku-end-action="close"]'),
    endNew: sudokuRoot.querySelector('[data-sudoku-end-action="new"]'),
    cells: []
  };

  renderSudokuBoardShell();
  renderSudokuPalette();
  if (sudokuEl.symbols) sudokuEl.symbols.checked = sudokuState.showSymbols;
  if (sudokuResumeRequested) {
    const saved = readSudokuSave();
    if (!saved || !applySudokuSave(saved)) {
      resetSudokuGame();
    }
  } else {
    resetSudokuGame();
  }
  sudokuResumeRequested = false;
  sudokuEl.board?.addEventListener("click", handleSudokuCellClick);
  sudokuEl.palette?.addEventListener("click", handleSudokuPaletteClick);
  sudokuEl.newGame?.addEventListener("click", handleSudokuNewGame);
  sudokuEl.hint?.addEventListener("click", handleSudokuHint);
  sudokuEl.erase?.addEventListener("click", handleSudokuEraseToggle);
  sudokuEl.symbols?.addEventListener("change", handleSudokuSymbolsToggle);
  sudokuEl.difficulty?.addEventListener("change", handleSudokuDifficultyChange);
  sudokuEl.endClose?.addEventListener("click", handleSudokuEndClose);
  sudokuEl.endNew?.addEventListener("click", handleSudokuEndNew);
  window.addEventListener("keydown", handleSudokuKeydown);
  sudokuMounted = true;
}

function unmountSudoku() {
  if (!sudokuRoot) return;
  saveSudokuProgress();
  sudokuEl.board?.removeEventListener("click", handleSudokuCellClick);
  sudokuEl.palette?.removeEventListener("click", handleSudokuPaletteClick);
  sudokuEl.newGame?.removeEventListener("click", handleSudokuNewGame);
  sudokuEl.hint?.removeEventListener("click", handleSudokuHint);
  sudokuEl.erase?.removeEventListener("click", handleSudokuEraseToggle);
  sudokuEl.symbols?.removeEventListener("change", handleSudokuSymbolsToggle);
  sudokuEl.difficulty?.removeEventListener("change", handleSudokuDifficultyChange);
  sudokuEl.endClose?.removeEventListener("click", handleSudokuEndClose);
  sudokuEl.endNew?.removeEventListener("click", handleSudokuEndNew);
  window.removeEventListener("keydown", handleSudokuKeydown);
  stopSudokuTimer();
  if (sudokuSaveTimer) {
    window.clearTimeout(sudokuSaveTimer);
    sudokuSaveTimer = null;
  }
  if (sudokuHintTimer) {
    window.clearTimeout(sudokuHintTimer);
    sudokuHintTimer = null;
  }
  if (sudokuStatusTimer) {
    window.clearTimeout(sudokuStatusTimer);
    sudokuStatusTimer = null;
  }
  sudokuRoot.innerHTML = "";
  sudokuRoot = null;
  sudokuMounted = false;
  sudokuEl = {};
}

function updateLobbyStats() {
  const lineBest = document.querySelector('[data-game-best="line98"]');
  if (lineBest) lineBest.textContent = String(loadBestScore());
  const pillBest = document.querySelector('[data-game-best="pillstack"]');
  if (pillBest) pillBest.textContent = String(loadPillBestScore());
  const sudokuBest = document.querySelector('[data-game-best="colorsudoku"]');
  if (sudokuBest) {
    const best = getSudokuBestOverall();
    sudokuBest.textContent = best ? formatSudokuDuration(best.seconds) : "0";
  }
  const lineLast = document.querySelector('[data-game-last="line98"]');
  if (lineLast) lineLast.textContent = formatLastRun(getLine98LastRun());
  const pillLast = document.querySelector('[data-game-last="pillstack"]');
  if (pillLast) pillLast.textContent = formatLastRun(getPillLastRun());
  const sudokuLast = document.querySelector('[data-game-last="colorsudoku"]');
  if (sudokuLast) sudokuLast.textContent = formatSudokuLastRun(getSudokuLastRun());
  const lineResume = document.querySelector('[data-game-action="resume"][data-game="line98"]');
  if (lineResume) lineResume.classList.toggle("is-hidden", !hasLine98Save());
  const pillResume = document.querySelector('[data-game-action="resume"][data-game="pillstack"]');
  if (pillResume) pillResume.classList.toggle("is-hidden", !hasPillSave());
  const sudokuResume = document.querySelector('[data-game-action="resume"][data-game="colorsudoku"]');
  if (sudokuResume) sudokuResume.classList.toggle("is-hidden", !hasSudokuSave());
}

function setFocusMode(card, active) {
  if (!lobbyRoot) return;
  if (active && card) {
    focusCard = card;
    lobbyRoot.classList.add("is-focus");
    card.classList.add("is-focus");
    return;
  }
  lobbyRoot.classList.remove("is-focus");
  if (focusCard) focusCard.classList.remove("is-focus");
  focusCard = null;
}

function handleFullscreenAction(card) {
  if (!card) return;
  const target = card.querySelector(".tc-colorplay-game") || card;
  if (document.fullscreenElement) {
    document.exitFullscreen().catch(() => setFocusMode(null, false));
    return;
  }
  if (target.requestFullscreen) {
    setFocusMode(null, false);
    target.requestFullscreen().catch(() => {
      setFocusMode(card, !card.classList.contains("is-focus"));
    });
  } else {
    setFocusMode(card, !card.classList.contains("is-focus"));
  }
}

function setLobbyOpen(key) {
  const activeKey = key || "";
  lobbyCards.forEach((card) => {
    const isOpen = activeKey && card.dataset.gameCard === activeKey;
    card.classList.toggle("is-open", isOpen);
    card.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  if (!activeKey || (focusCard && focusCard.dataset.gameCard !== activeKey)) {
    setFocusMode(null, false);
  }
  if (activeKey === "line98") {
    mountLine98(lobbyLine98Mount);
  } else {
    unmountLine98();
  }
  if (activeKey === "pillstack") {
    mountPill(lobbyPillMount);
  } else {
    unmountPill();
  }
  if (activeKey === "colorsudoku") {
    mountSudoku(lobbySudokuMount);
  } else {
    unmountSudoku();
  }
}

function initLobby() {
  lobbyCards = Array.from(document.querySelectorAll("[data-game-card]"));
  lobbyTriggers = Array.from(document.querySelectorAll('[data-game-action="open"]'));
  lobbyRoot = document.querySelector(".tc-game-lobby");
  lobbyLine98Mount = document.querySelector('[data-game-mount="line98"]');
  lobbyPillMount = document.querySelector('[data-game-mount="pillstack"]');
  lobbySudokuMount = document.querySelector('[data-game-mount="colorsudoku"]');
  achievementListEl = document.getElementById("colorplayAchievementList");
  renderAchievements();

  lobbyTriggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.game || "";
      if (!key) return;
      if (key === "line98") line98ResumeRequested = false;
      if (key === "pillstack") pillResumeRequested = false;
      if (key === "colorsudoku") sudokuResumeRequested = false;
      setLobbyOpen(key);
    });
  });

  const resumeButtons = Array.from(document.querySelectorAll('[data-game-action="resume"]'));
  resumeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.game || "";
      if (!key) return;
      if (key === "line98") {
        if (!hasLine98Save()) {
          showToast("Chưa có ván để tiếp tục.");
          return;
        }
        line98ResumeRequested = true;
      }
      if (key === "pillstack") {
        if (!hasPillSave()) {
          showToast("Chưa có ván để tiếp tục.");
          return;
        }
        pillResumeRequested = true;
      }
      if (key === "colorsudoku") {
        if (!hasSudokuSave()) {
          showToast("Chưa có ván để tiếp tục.");
          return;
        }
        sudokuResumeRequested = true;
      }
      setLobbyOpen(key);
    });
  });

  const fullscreenButtons = Array.from(document.querySelectorAll('[data-game-action="fullscreen"]'));
  fullscreenButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest("[data-game-card]");
      handleFullscreenAction(card);
    });
  });

  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      setFocusMode(null, false);
    }
  });

  updateLobbyStats();
  setLobbyOpen("line98");
}

function handleVisibilityChange() {
  if (document.hidden) {
    if (line98Mounted) pauseLine98(true);
    if (pillMounted) pausePill(true);
    if (sudokuMounted) pauseSudoku(true);
    saveLine98Progress();
    savePillProgress();
    saveSudokuProgress();
  } else {
    if (line98Mounted && state.autoPaused) resumeLine98(true);
    if (pillMounted && pillState.autoPaused) resumePill(true);
    if (sudokuMounted && sudokuState.autoPaused) resumeSudoku(true);
  }
}

window.addEventListener("visibilitychange", handleVisibilityChange);
window.addEventListener("beforeunload", () => {
  saveLine98Progress();
  savePillProgress();
  saveSudokuProgress();
});

loadSettings();
applyColorBlindMode();
initLobby();

window.addEventListener("tc:hex-apply", (event) => {
  applyHexPalette(event?.detail?.hexes || []);
});

if (incomingHandoff?.hexes?.length) {
  applyHexPalette(incomingHandoff.hexes);
  window.tcWorkbench?.setContext?.(incomingHandoff.hexes, { worldKey: "colorplay", source: incomingHandoff.source });
}
