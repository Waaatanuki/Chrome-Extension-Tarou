import { onMessage } from 'webext-bridge/background'
import { setupActionListener } from './action'
import { setupContextMenuListener } from './contextMenus'
import { setupDebuggerListener } from './debugger'
import { setupRuntimeListener } from './runtime'
import { setupTabsListener } from './tabs'
import { setupWebRequestListener } from './webRequest'

(() => {
  onMessage('express', (res) => {
    try {
      unpack(res.data as string)
    }
    catch (error) {
      console.log(String(error))
    }
  })

  setupWebRequestListener()
  setupRuntimeListener()
  setupTabsListener()
  setupActionListener()
  setupDebuggerListener()
  setupContextMenuListener()
})()
