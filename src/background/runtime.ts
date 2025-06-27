import { obTabId, obWindowId } from '~/logic'

export function setupRuntimeListener() {
  const { registerContextMenu } = useContextMenu()

  chrome.runtime.onInstalled.addListener(() => {
    registerContextMenu()
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false })
    obTabId.value = 0
    obWindowId.value = 0
  })
}
