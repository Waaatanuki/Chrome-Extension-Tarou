import { obWindowId } from '~/logic/storage'

export function setupWindowsListener() {
  chrome.windows.onRemoved.addListener((windowId) => {
    if (windowId === obWindowId.value) {
      obWindowId.value = 0
    }
  })
}
