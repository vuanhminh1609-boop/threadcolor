import localProvider from "./providers/local_provider.js";

const providers = {
  local: localProvider
};

let activeProvider = "local";

const resolveProviderKey = () => {
  if (typeof window !== "undefined") {
    const override = window.SC_STORAGE_PROVIDER || window.tcStorageProvider;
    if (typeof override === "string" && override.trim()) {
      return override.trim();
    }
  }
  return activeProvider;
};

const resolveProvider = () => {
  const key = resolveProviderKey();
  return providers[key] || providers.local;
};

export const registerProvider = (key, provider) => {
  if (!key || !provider) return false;
  providers[key] = provider;
  return true;
};

export const setProvider = (key) => {
  if (!providers[key]) return false;
  activeProvider = key;
  return true;
};

export const uploadImage = (file, meta) => resolveProvider().uploadImage(file, meta);
export const getUrl = (key) => resolveProvider().getUrl(key);
const removeImage = (key) => resolveProvider().delete(key);
export { removeImage as delete };
export const list = (metaFilter) => resolveProvider().list(metaFilter);
