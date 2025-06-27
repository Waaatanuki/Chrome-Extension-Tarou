import { obTabId, obWindowId } from '~/logic/storage'

export function setupWindowsListener() {
  chrome.windows.onRemoved.addListener((windowId) => {
    if (windowId === obWindowId.value) {
      obWindowId.value = 0

      chrome.debugger.detach({ tabId: obTabId.value }).then(() => {
        console.log('断开debugger')
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        obTabId.value = 0
      })
    }
  })
}
