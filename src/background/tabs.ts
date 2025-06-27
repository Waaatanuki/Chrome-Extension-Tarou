import { obTabId, obWindowId } from '~/logic'

export function setupTabsListener() {
  chrome.tabs.onCreated.addListener(() => {
    chrome.tabs.get(obTabId.value).catch(() => {
      obTabId.value = 0
      obWindowId.value = 0
    })
  })

  chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    console.log('wake up!')

    await chrome.sidePanel.setOptions({
      tabId: tab.id,
      path: 'src/views/sidePanel/main.html',
      enabled: isGamePage(tab.url),
    })
  })

  chrome.tabs.onRemoved.addListener((tabId) => {
    if (tabId === obTabId.value) {
      obTabId.value = 0
      chrome.windows.remove(obWindowId.value).catch(() => {})
    }
  })
}
