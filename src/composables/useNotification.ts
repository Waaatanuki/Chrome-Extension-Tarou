import type { Action } from 'extension'
import { notificationSound } from '~/constants'
import { actionTriggerList, notificationSetting, volume } from '~/logic'

async function playSoundInTab(sound: keyof typeof notificationSound) {
  const [tab] = await chrome.tabs.query({ url: ['*://*.granbluefantasy.jp/*', '*://gbf.game.mbga.jp/*'] })

  if (tab && tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: playSound,
      args: [`https://prd-game-a-granbluefantasy.akamaized.net/assets/sound/se/${notificationSound[sound]}.mp3`, volume.value],
    }).catch((err) => {
      console.log(err)
    })
  }
}

function playSound(audioUrl: string, volume: number) {
  const audio = new Audio(audioUrl)
  audio.volume = volume
  audio.play()
}

export function createNotification(options: NotificationOptions) {
  const { message, iconUrl = '/assets/icon-48.png', sound } = options

  if (sound)
    playSoundInTab(sound)
  chrome.notifications.create({
    iconUrl,
    message,
    silent: true,
    type: 'basic',
    title: '通知',
  }, () => {
    if (chrome.runtime.lastError) {
      chrome.notifications.create({
        iconUrl: '/assets/icon-48.png',
        message,
        silent: true,
        type: 'basic',
        title: '通知',
      })
    }
  })
}

export function checkActionTrigger(action?: Action) {
  if (!notificationSetting.value.actionTrigger || !action)
    return

  const key = `${action.type}_${action.id}`
  if (actionTriggerList.value.includes(key))
    createNotification({ message: '动作触发提示', sound: 'tip', iconUrl: getActionIcon(action) })
}

export function toggleActionTrigger(action: Action) {
  const key = `${action.type}_${action.id}`
  const index = actionTriggerList.value.indexOf(key)
  if (index >= 0)
    actionTriggerList.value.splice(index, 1)
  else
    actionTriggerList.value.push(key)
}

interface NotificationOptions {
  message: string
  iconUrl?: string
  sound?: keyof typeof notificationSound
}
