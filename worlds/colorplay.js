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
const NEXT_COUNT = 3;
const BEST_SCORE_KEY = "tc_colorplay_best";
const PILL_WIDTH = 8;
const PILL_HEIGHT = 16;
const PILL_COLORS = [
  "#ef4444",
  "#3b82f6",
  "#facc15",
  "#22c55e"
];
const PILL_DROP_MS = 650;
const PILL_BEST_KEY = "tc_colorplay_pill_best_v1";
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

let lobbyCards = [];
let lobbyTriggers = [];
let lobbyLine98Mount = null;
let lobbyPillMount = null;

let el = {};

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
  helpOpen: false
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
  helpOpen: false
};

function clampNumber(value, min, max) {
  const num = Number(value);
  if (Number.isNaN(num)) return min;
  return Math.max(min, Math.min(max, num));
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

function createEmptyBoard() {
  return Array.from({ length: BOARD_SIZE }, () => Array.from({ length: BOARD_SIZE }, () => null));
}

function generateNextQueue() {
  return Array.from({ length: NEXT_COUNT }, () => Math.floor(Math.random() * COLORS.length));
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
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const cell = state.cells[row][col];
      const colorIndex = state.board[row][col];
      const isSelected = state.selected && state.selected.row === row && state.selected.col === col;
      cell.classList.toggle("is-selected", isSelected);
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
      ball.style.background = COLORS[colorIndex];
    }
  }
}

function renderStats() {
  if (el.score) el.score.textContent = String(state.score);
  if (el.combo) el.combo.textContent = String(state.combo);
  if (el.best) el.best.textContent = String(state.best);
  if (el.moves) el.moves.textContent = state.moves ? String(state.moves) : "--";
}

function renderUpcoming() {
  if (!el.next) return;
  el.next.innerHTML = "";
  state.nextQueue.forEach((colorIndex) => {
    const dot = document.createElement("span");
    dot.className = "tc-colorplay-next-dot";
    dot.style.background = COLORS[colorIndex];
    dot.setAttribute("aria-label", `Màu sắp ra ${COLORS[colorIndex].toUpperCase()}`);
    el.next.appendChild(dot);
  });
}

function updateBestScore() {
  if (state.score > state.best) {
    state.best = state.score;
    saveBestScore(state.best);
  }
}

function snapshotState() {
  return {
    board: state.board.map((row) => row.slice()),
    score: state.score,
    combo: state.combo,
    moves: state.moves,
    nextQueue: [...state.nextQueue],
    gameOver: state.gameOver
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
  state.selected = null;
  renderBoardState();
  renderStats();
  renderUpcoming();
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
  const tag = event.target?.tagName || "";
  if (tag === "INPUT" || tag === "TEXTAREA") return;
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
    const pickIndex = Math.floor(Math.random() * available.length);
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
  state.nextQueue = generateNextQueue();
  if (!cleared) {
    renderBoardState();
  }
  renderUpcoming();
  renderStats();
  if (!cleared && getEmptyCells().length === 0) {
    handleGameOver();
  }
}

function applyMove(from, to) {
  const colorIndex = state.board[from.row][from.col];
  state.board[from.row][from.col] = null;
  state.board[to.row][to.col] = colorIndex;
  state.moves += 1;
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
}

function handleGameOver() {
  state.gameOver = true;
  showStatus("Hết ô trống. Game over.");
  showToast("Game over. Nhấn Ván mới để bắt đầu.");
}

function handleCellClick(event) {
  if (!line98Mounted) return;
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
  state.board = createEmptyBoard();
  state.score = 0;
  state.combo = 0;
  state.moves = 0;
  state.selected = null;
  state.gameOver = false;
  state.locked = false;
  state.undo = null;
  toggleHelp(false);
  updateUndoState();
  state.nextQueue = generateNextQueue();
  spawnBalls(Array.from({ length: INITIAL_BALLS }, () => Math.floor(Math.random() * COLORS.length)));
  renderBoardState();
  renderStats();
  renderUpcoming();
  showStatus("Chạm bi để bắt đầu.");
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
              <button data-line98-action="help" class="tc-icon-btn" type="button" data-tooltip="Hướng dẫn" aria-label="Hướng dẫn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"></circle>
                  <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
                  <circle cx="12" cy="17" r="1" fill="currentColor"></circle>
                </svg>
              </button>
              <button data-line98-action="shortcuts" class="tc-icon-btn" type="button" data-tooltip="N/U/H/M" aria-label="Phím tắt">
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
              <p>Phím tắt: N (ván mới), U (undo), H (hướng dẫn).</p>
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
    newGame: line98Root.querySelector('[data-line98-action="new"]'),
    undo: line98Root.querySelector('[data-line98-action="undo"]'),
    helpBtn: line98Root.querySelector('[data-line98-action="help"]'),
    shortcuts: line98Root.querySelector('[data-line98-action="shortcuts"]'),
    help: line98Root.querySelector('[data-line98="help"]'),
    sound: line98Root.querySelector('[data-line98-action="sound"]')
  };

  state.best = loadBestScore();
  renderBoardShell();
  resetGame();
  if (el.board) {
    el.board.addEventListener("click", handleCellClick);
  }
  el.newGame?.addEventListener("click", resetGame);
  el.undo?.addEventListener("click", undoMove);
  el.helpBtn?.addEventListener("click", toggleHelp);
  el.shortcuts?.addEventListener("click", toggleHelp);
  el.sound?.addEventListener("click", toggleSound);
  window.addEventListener("keydown", handleKeydown);
  setupTooltipLongPress(line98Root);
  line98Mounted = true;
}

function unmountLine98() {
  if (!line98Root) return;
  if (el.board) {
    el.board.removeEventListener("click", handleCellClick);
  }
  el.newGame?.removeEventListener("click", resetGame);
  el.undo?.removeEventListener("click", undoMove);
  el.helpBtn?.removeEventListener("click", toggleHelp);
  el.shortcuts?.removeEventListener("click", toggleHelp);
  el.sound?.removeEventListener("click", toggleSound);
  window.removeEventListener("keydown", handleKeydown);
  tooltipCleanup.forEach((cleanup) => cleanup());
  tooltipCleanup = [];
  state.helpOpen = false;
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
  return Math.floor(Math.random() * PILL_COLORS.length);
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
      block.style.background = PILL_COLORS[data.colorIndex];
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
  pillState.next.forEach((colorIndex) => {
    const block = document.createElement("span");
    block.className = "tc-pill-next-block";
    block.style.background = PILL_COLORS[colorIndex];
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
  pillState.active = null;
  renderPillBoard();
  resolvePillMatches(() => {
    if (!pillState.gameOver) {
      spawnPillPiece();
    }
  });
}

function handlePillGameOver() {
  pillState.gameOver = true;
  showPillStatus("Hết ô trống. Game over.");
  showToast("Game over. Nhấn Ván mới để chơi lại.");
}

function startPillLoop() {
  if (pillDropTimer) {
    window.clearInterval(pillDropTimer);
  }
  pillDropTimer = window.setInterval(() => {
    if (!pillMounted || pillState.gameOver || pillState.locked) return;
    if (!pillState.active) return;
    if (!movePill(1, 0)) {
      lockPillPiece();
    }
  }, PILL_DROP_MS);
}

function stopPillLoop() {
  if (!pillDropTimer) return;
  window.clearInterval(pillDropTimer);
  pillDropTimer = null;
}

function resetPillGame() {
  pillState.grid = createPillGrid();
  pillState.score = 0;
  pillState.gameOver = false;
  pillState.locked = false;
  pillState.helpOpen = false;
  pillState.active = null;
  pillState.next = createPillPiece();
  renderPillStats();
  renderPillBoard();
  spawnPillPiece();
  showPillStatus("Dùng phím để điều khiển viên thuốc.");
  startPillLoop();
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
  if (!pillMounted || pillState.gameOver || pillState.locked) return;
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
  const tag = event.target?.tagName || "";
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  if (event.key === "Escape") {
    event.preventDefault();
    setLobbyOpen("");
    showToast("Đã đóng Xếp thuốc.");
    return;
  }
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
    </div>
  `;

  pillEl = {
    board: pillRoot.querySelector('[data-pill="board"]'),
    next: pillRoot.querySelector('[data-pill="next"]'),
    score: pillRoot.querySelector('[data-pill="score"]'),
    best: pillRoot.querySelector('[data-pill="best"]'),
    status: pillRoot.querySelector('[data-pill="status"]'),
    newGame: pillRoot.querySelector('[data-pill-action="new"]'),
    helpBtn: pillRoot.querySelector('[data-pill-action="help"]'),
    shortcuts: pillRoot.querySelector('[data-pill-action="shortcuts"]'),
    help: pillRoot.querySelector('[data-pill="help"]')
  };

  pillState.best = loadPillBestScore();
  renderPillBoardShell();
  resetPillGame();
  pillEl.newGame?.addEventListener("click", resetPillGame);
  pillEl.helpBtn?.addEventListener("click", togglePillHelp);
  pillEl.shortcuts?.addEventListener("click", togglePillHelp);
  window.addEventListener("keydown", handlePillKeydown);
  setupTooltipLongPress(pillRoot);
  bindPillMobileControls();
  pillMounted = true;
}

function unmountPill() {
  if (!pillRoot) return;
  pillEl.newGame?.removeEventListener("click", resetPillGame);
  pillEl.helpBtn?.removeEventListener("click", togglePillHelp);
  pillEl.shortcuts?.removeEventListener("click", togglePillHelp);
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

function setLobbyOpen(key) {
  const activeKey = key || "";
  lobbyCards.forEach((card) => {
    const isOpen = activeKey && card.dataset.gameCard === activeKey;
    card.classList.toggle("is-open", isOpen);
    card.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
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
}

function initLobby() {
  lobbyCards = Array.from(document.querySelectorAll("[data-game-card]"));
  lobbyTriggers = Array.from(document.querySelectorAll('[data-game-action="open"]'));
  lobbyLine98Mount = document.querySelector('[data-game-mount="line98"]');
  lobbyPillMount = document.querySelector('[data-game-mount="pillstack"]');

  lobbyTriggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.game || "";
      if (!key) return;
      setLobbyOpen(key);
    });
  });

  setLobbyOpen("line98");
}

initLobby();
