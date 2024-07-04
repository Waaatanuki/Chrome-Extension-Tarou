import { validate as uuidValidate, v4 as uuidv4 } from 'uuid'
import type { DropInfo } from 'api'
import { sendMultiDropInfo } from '~/api'
import { code, failedDropInfoList, uid } from '~/logic'

export default function useUser() {
  function checkUser(url: string) {
    const searchParams = new URLSearchParams(url)
    uid.value = searchParams.get('uid') || ''
    if (!uuidValidate(code.value))
      code.value = uuidv4()
  }

  function sendInfo(dropInfo: DropInfo[]) {
    beforeSend(dropInfo)
    const array = JSON.parse(JSON.stringify(failedDropInfoList.value))

    return new Promise<void>((resolve) => {
      function handel() {
        if (array.length === 0) {
          setBadge()
          resolve()
          return
        }

        const batch = array.splice(0, 1000)

        sendMultiDropInfo(batch)
          .then(() => afterSend(batch))
          .catch((err) => { console.log(err) })
          .finally(() => handel())
      }

      handel()
    })
  }

  function beforeSend(array: DropInfo[]) {
    array.forEach((b) => {
      if (!failedDropInfoList.value.some(i => i.battleId === b.battleId))
        failedDropInfoList.value.push(b)
    })
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
