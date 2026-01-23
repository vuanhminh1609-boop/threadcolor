const HANDOFF_KEYS = ["assetId", "projectId", "from", "intent", "shade"];

const normalizeSearch = (search) => {
  if (!search) return "";
  if (search.startsWith("?")) return search;
  return `?${search}`;
};

export const parseHandoff = (search = "") => {
  const params = new URLSearchParams(normalizeSearch(search || window.location.search));
  const result = {};
  HANDOFF_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value !== null && value !== "") {
      result[key] = value;
    }
  });
  return result;
};

export const composeHandoff = (payload = {}) => {
  const params = new URLSearchParams();
  HANDOFF_KEYS.forEach((key) => {
    const value = payload[key];
    if (value === undefined || value === null || value === "") return;
    params.set(key, String(value));
  });
  const query = params.toString();
  return query ? `?${query}` : "";
};

export const withHandoff = (url, payload = {}) => {
  if (!url) return composeHandoff(payload);
  const [base, hash] = String(url).split("#");
  const query = composeHandoff(payload);
  return `${base}${query}${hash ? `#${hash}` : ""}`;
};
