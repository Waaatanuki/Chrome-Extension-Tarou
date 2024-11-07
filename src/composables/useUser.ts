import type { DropInfo } from 'api'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'
import { sendMultiDropInfo } from '~/api'
import { code, failedDropInfoList, uid } from '~/logic'

export default function useUser() {
  function checkUser(url: string) {
    const searchParams = new URLSearchParams(url)
    uid.value = searchParams.get('uid') || ''
    if (!uuidValidate(code.value))
      code.value = uuidv4()
  }

  function sendInfo(dropInfo: DropInfo[], upload = false) {
    if (!upload)
      beforeSend(dropInfo)
    const array = JSON.parse(JSON.stringify(upload ? dropInfo : failedDropInfoList.value))

    return new Promise<void>((resolve, reject) => {
      function handel() {
        if (array.length === 0) {
          setBadge()
          resolve()
          return
        }

        const batch = array.splice(0, 1000)

        sendMultiDropInfo(batch)
          .then(() => {
            afterSend(batch)
            handel()
          })
          .catch(() => {
            setBadge()
            reject(new Error('上传失败'))
          })
      }

      handel()
    })
  }

  function beforeSend(array: DropInfo[]) {
    const total = [...array, ...failedDropInfoList.value]
    const map = new Map()

    for (const item of total) {
      if (!map.has(item.battleId))
        map.set(item.battleId, item)
    }

    failedDropInfoList.value = [...map.values()]
  }

  function afterSend(array: DropInfo[]) {
    const battleIds = array.map(a => a.battleId)
    failedDropInfoList.value = failedDropInfoList.value.filter((info) => {
      return !battleIds.includes(info.battleId)
    })
  }

  function setBadge() {
    const total = failedDropInfoList.value.length
    chrome.action.setBadgeText({ text: total ? total.toString() : '' }, () => {
      chrome.action.setBadgeBackgroundColor({ color: '#be0000' })
    })
  }

  return {
    checkUser,
    sendInfo,
  }
}
