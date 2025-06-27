import { obTabId, obWindowId } from '~/logic'

export function setupRuntimeListener() {
  const { registerContextMenu } = useContextMenu()

  chrome.runtime.onInstalled.addListener(() => {
    registerContextMenu()
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false })
    chrome.tabs.remove(obTabId.value).catch(() => {})
    chrome.windows.remove(obWindowId.value).catch(() => {})
  })
}
