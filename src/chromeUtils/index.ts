import { log } from "../utils";
import STORAGE_NAMESPACES from "./constants";

/**
 * get the current tab from chrome
 * @returns 
 */
export async function getCurrentTab() {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

/**
 * Get item from local storage by key
 * @param key 
 * @returns 
 */
export async function getItemFromStorageByKey(key: string) {
  const item = await chrome.storage.local.get(key);
  return item?.[key] || null;
}

/**
 * 
 * @param key 
 * @param value 
 * @returns 
 */
export function setItemToStorageByKey(key: string, value: any) {
  const objToStore = {
    [key]: value
  };
  return chrome.storage?.local.set(objToStore);
}

/**
 * run the util function with try-catch
 * @param asyncChromeUtilRunner 
 */
export async function runChromeUtilWithSafeGaurdAsync<T>(asyncChromeUtilRunner: () => Promise<T>) {
  try {
    return await asyncChromeUtilRunner();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`chrome util function failed with reason: [${errorMessage}]`);
    return Promise.resolve(null);
  }
}

/**
 * run the util function with try-catch
 * @param chromeUtilRunner 
 */
export function runChromeUtilWithSafeGaurd<T>(chromeUtilRunner: () => T) {
  try {
    return chromeUtilRunner();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`chrome util function failed with reason: [${errorMessage}]`);
    return null;
  }
}

export { STORAGE_NAMESPACES };

