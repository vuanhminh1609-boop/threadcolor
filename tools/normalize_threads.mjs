import { writeFile } from "node:fs/promises";
import { runValidation } from "./validate_threads.mjs";

const threadsPath = new URL("../threads.json", import.meta.url);

const main = async () => {
  const { cleaned, conflicts } = await runValidation();
  if (conflicts.length) {
    console.error(`[normalize_threads] Có ${conflicts.length} xung đột. Vui lòng xử lý threads.conflicts.json trước.`);
    process.exit(1);
  }
  await writeFile(threadsPath, JSON.stringify(cleaned, null, 2), "utf8");
  console.info(`[normalize_threads] Ghi threads.json thành công (${cleaned.length} bản ghi).`);
};

main().catch((err) => {
  console.error("[normalize_threads] failed", err);
  process.exit(1);
});
