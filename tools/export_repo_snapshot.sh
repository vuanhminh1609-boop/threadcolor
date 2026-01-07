#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage: tools/export_repo_snapshot.sh [--mode snapshot|bundle|both] [--include-dirty]

Tùy chọn:
  --mode           Chọn kiểu xuất: snapshot, bundle, hoặc both (mặc định: both)
  --include-dirty  Kèm patch diff (git diff HEAD) nếu repo đang có thay đổi
  -h, --help       Hiển thị trợ giúp
EOF
}

MODE="both"
INCLUDE_DIRTY=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    -m|--mode)
      MODE="${2:-}"
      shift 2
      ;;
    --include-dirty)
      INCLUDE_DIRTY=1
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Tham số không hợp lệ: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
done

case "${MODE}" in
  snapshot|bundle|both) ;;
  *)
    echo "Giá trị --mode không hợp lệ: ${MODE}" >&2
    exit 1
    ;;
esac

ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "${ROOT_DIR}" ]]; then
  echo "Không tìm thấy repo Git. Hãy chạy script trong repo." >&2
  exit 1
fi

cd "${ROOT_DIR}"

MANIFEST="repo_manifest.txt"
SNAPSHOT_ZIP="repo_snapshot.zip"
REPO_BUNDLE="repo.bundle"
DIRTY_PATCH="repo_dirty.patch"

SENSITIVE_PATTERNS=(
  ".env"
  "*.pem"
  "*key*"
  "serviceAccount*.json"
  "*token*"
  "*credential*"
  "*credentials*"
)

redact_remote() {
  sed -E 's#(https?://)[^/@]+@#\1***@#g'
}

echo "Tạo manifest: ${MANIFEST}"
{
  echo "==== REPO MANIFEST ===="
  echo "Thời điểm: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  echo "Commit: $(git rev-parse HEAD)"
  echo
  echo "=== Branches ==="
  git branch -a
  echo
  echo "=== Remotes ==="
  git remote -v | redact_remote
  echo
  echo "=== Status ==="
  git status --porcelain
  echo
  echo "=== Tracked files ==="
  git ls-files
  echo
  echo "=== Tree ==="
  if command -v tree >/dev/null 2>&1; then
    tree -a -I '.git|node_modules|dist|build|.next|coverage|.cache|functions/lib|functions/node_modules|.firebase|functions/.firebase'
  else
    find . -maxdepth 4 -print
  fi
} > "${MANIFEST}"

if [[ "${INCLUDE_DIRTY}" -eq 1 ]]; then
  DIRTY_DIFF="$(git diff HEAD || true)"
  if [[ -n "${DIRTY_DIFF}" ]]; then
    printf "%s\n" "${DIRTY_DIFF}" > "${DIRTY_PATCH}"
  else
    rm -f "${DIRTY_PATCH}"
  fi
fi

echo "Quét file nhạy cảm (chỉ cảnh báo)..."
SENSITIVE_FOUND=()
while IFS= read -r file; do
  [[ -z "${file}" ]] && continue
  SENSITIVE_FOUND+=("${file}")
done < <(
  find . -type f \( \
    -iname "${SENSITIVE_PATTERNS[0]}" -o \
    -iname "${SENSITIVE_PATTERNS[1]}" -o \
    -iname "${SENSITIVE_PATTERNS[2]}" -o \
    -iname "${SENSITIVE_PATTERNS[3]}" -o \
    -iname "${SENSITIVE_PATTERNS[4]}" -o \
    -iname "${SENSITIVE_PATTERNS[5]}" -o \
    -iname "${SENSITIVE_PATTERNS[6]}" \
  \)
)

if [[ "${#SENSITIVE_FOUND[@]}" -gt 0 ]]; then
  echo "CẢNH BÁO: phát hiện file có thể nhạy cảm. Hãy kiểm tra trước khi chia sẻ:"
  printf ' - %s\n' "${SENSITIVE_FOUND[@]}"
  echo "Nếu cần, hãy loại bỏ hoặc che nội dung trước khi gửi."
else
  echo "Không phát hiện file nhạy cảm theo pattern cơ bản."
fi

if [[ "${MODE}" == "snapshot" || "${MODE}" == "both" ]]; then
  echo "Tạo snapshot zip (ưu tiên file tracked)..."
  rm -f "${SNAPSHOT_ZIP}"
  tmp_list="$(mktemp)"
  git ls-files | grep -v -E '^(repo_snapshot\.zip|repo\.bundle|repo_manifest\.txt|repo_dirty\.patch)$' > "${tmp_list}"
  zip -q "${SNAPSHOT_ZIP}" -@ < "${tmp_list}"
  rm -f "${tmp_list}"
  if [[ -f "${MANIFEST}" ]]; then
    zip -q "${SNAPSHOT_ZIP}" "${MANIFEST}"
  fi
  if [[ "${INCLUDE_DIRTY}" -eq 1 && -f "${DIRTY_PATCH}" ]]; then
    zip -q "${SNAPSHOT_ZIP}" "${DIRTY_PATCH}"
  fi
fi

if [[ "${MODE}" == "bundle" || "${MODE}" == "both" ]]; then
  echo "Tạo git bundle (có lịch sử)..."
  rm -f "${REPO_BUNDLE}"
  git bundle create "${REPO_BUNDLE}" --all
fi

echo "Hoàn tất:"
if [[ "${MODE}" == "snapshot" || "${MODE}" == "both" ]]; then
  echo " - ${SNAPSHOT_ZIP}"
fi
if [[ "${MODE}" == "bundle" || "${MODE}" == "both" ]]; then
  echo " - ${REPO_BUNDLE}"
fi
echo " - ${MANIFEST}"
if [[ "${INCLUDE_DIRTY}" -eq 1 && -f "${DIRTY_PATCH}" ]]; then
  echo " - ${DIRTY_PATCH}"
fi
