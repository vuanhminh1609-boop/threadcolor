#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "${ROOT_DIR}" ]]; then
  echo "Không tìm thấy repo Git. Hãy chạy script trong repo." >&2
  exit 1
fi

cd "${ROOT_DIR}"

MANIFEST="repo_manifest.txt"
SNAPSHOT_ZIP="repo_snapshot.zip"
REPO_BUNDLE="repo.bundle"

EXCLUDE_PATTERNS=(
  ".git/*"
  "node_modules/*"
  "functions/node_modules/*"
  "functions/lib/*"
  "dist/*"
  "build/*"
  ".next/*"
  "coverage/*"
  ".cache/*"
  ".firebase/*"
  "functions/.firebase/*"
  "*.log"
)

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

echo "Tạo snapshot zip (không chứa lịch sử Git)..."
ZIP_EXCLUDES=()
for pattern in "${EXCLUDE_PATTERNS[@]}"; do
  ZIP_EXCLUDES+=("-x" "${pattern}")
done
zip -r "${SNAPSHOT_ZIP}" . "${ZIP_EXCLUDES[@]}" >/dev/null

echo "Tạo git bundle (có lịch sử)..."
git bundle create "${REPO_BUNDLE}" --all

echo "Hoàn tất:"
echo " - ${SNAPSHOT_ZIP}"
echo " - ${REPO_BUNDLE}"
echo " - ${MANIFEST}"
