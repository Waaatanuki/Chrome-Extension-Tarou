import { isSidePanelOpened, obTabId, obWindowId } from '~/logic'

export function setupRuntimeListener() {
  const { registerContextMenu } = useContextMenu()

  chrome.runtime.onInstalled.addListener(() => {
    registerContextMenu()
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false })
    obTabId.value = 0
    obWindowId.value = 0
    isSidePanelOpened.value = false
  })

  chrome.runtime.onConnect.addListener((port) => {
    if (port.name === 'mySidepanel') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          obTabId.value = tabs[0].id!
          isSidePanelOpened.value = true
        }
      })
      port.onDisconnect.addListener(() => {
        isSidePanelOpened.value = false

        if (!obWindowId.value) {
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
  })
}
