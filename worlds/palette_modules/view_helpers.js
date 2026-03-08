export function toIsoString(value) {
  if (!value) return "";
  if (typeof value === "string") {
    const stamp = Date.parse(value);
    return Number.isNaN(stamp) ? "" : new Date(stamp).toISOString();
  }
  if (typeof value?.toDate === "function") {
    try {
      const date = value.toDate();
      return date instanceof Date && !Number.isNaN(date.getTime()) ? date.toISOString() : "";
    } catch (_err) {
      return "";
    }
  }
  if (typeof value?.seconds === "number") {
    const date = new Date(value.seconds * 1000);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString();
  }
  return "";
}

export function formatStampVi(value, locale = "vi-VN") {
  const iso = toIsoString(value);
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString(locale);
  } catch (_err) {
    return iso;
  }
}

export function formatRoomRevisionTime(isoText, options = {}) {
  const { locale = "vi-VN", unknownText = "Không rõ thời gian" } = options;
  if (!isoText) return unknownText;
  const stamp = Date.parse(isoText);
  if (!Number.isFinite(stamp)) return isoText;
  try {
    return new Date(stamp).toLocaleString(locale, {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch (_err) {
    return isoText;
  }
}

export function formatTuneValue(value, { isOffset = false } = {}) {
  const num = Math.round(Number(value) || 0);
  if (!isOffset) return String(num);
  if (num > 0) return `+${num}`;
  return String(num);
}
