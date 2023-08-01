/* eslint-disable no-alert */
/* eslint-disable no-console */
const raidUrlREG = /granbluefantasy.jp\/#raid_multi\/[0-9]+/
const resultUrlREG = /granbluefantasy.jp\/#result_multi\/[0-9]+/

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message)

  if (message.todo === 'getRaidName') {
    const start = setInterval(() => {
      if (!raidUrlREG.test(document.URL))
        clearInterval(start)

      console.log('监测到战斗开始')
      const targetEl = document.querySelector('.enemy-info .name')
      if (targetEl && targetEl.innerHTML) {
        clearInterval(start)
        sendResponse({ questName: targetEl.innerHTML })
      }
    }, 200)
  }

  if (message.todo === 'getBattleResult') {
    const start = setInterval(() => {
      // if (!document.URL.includes('foo'))
      if (!resultUrlREG.test(document.URL))
        clearInterval(start)

      console.log('监测到结算')
      const targetEl = document.querySelector('.prt-item-list')

      if (targetEl) {
        clearInterval(start)
        sendResponse({ domStr: targetEl.outerHTML })
      }
    }, 200)
  }

  if (message.todo === 'importData') {
    console.log('开始导入...')
    const DBOpenRequest = window.indexedDB.open('gbfApp')
    let db: IDBDatabase

    DBOpenRequest.onupgradeneeded = function (event) {
      const request = event.target as IDBOpenDBRequest
      db = request.result
      if (!db.objectStoreNames.contains('GoldBrick'))
        db.createObjectStore('GoldBrick')
    }
    DBOpenRequest.onsuccess = async function (event) {
      const request = event.target as IDBOpenDBRequest
      db = request.result

      chrome.storage.local.get('goldBrickData', (result) => {
        importFromJson(db, 'GoldBrick', JSON.parse(result.goldBrickData), (err: any) => {
          if (!err) {
            sendResponse({ isDone: true })
            alert('成功导入')
            location.reload()
          }
          else { console.log(err) }
        })
      })
    }
  }

  return true
})

function importFromJson(idbDatabase: IDBDatabase, storeName: string, data: GoldBrickData[] = [], cb: any) {
  const length = idbDatabase.objectStoreNames.length

  if (length === 0 || data.length === 0) {
    cb(null)
  }
  else {
    const transaction = idbDatabase.transaction(storeName, 'readwrite')
    transaction.oncomplete = () => cb(null)
    transaction.onerror = event => cb(event)
    const objectStore = transaction.objectStore(storeName)
    data.forEach((item) => {
      const value: any = { ...item }
      const key = item.battleId
      delete value.battleId
      const request = objectStore.put(value, key)
      request.onerror = (event) => {
        cb(event)
      }
    })
  }
}

interface GoldBrickData {
  timestamp: number
  raidName: string
  battleId: string
  blueChests?: string
  goldBrick?: string
}
