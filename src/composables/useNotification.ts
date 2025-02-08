import { notificationSound } from '~/constants'
import { notificationSetting } from '~/logic'

async function playSoundInTab(sound: keyof typeof notificationSound) {
  const [tab] = await chrome.tabs.query({ url: ['*://*.granbluefantasy.jp/*', '*://gbf.game.mbga.jp/*'] })

  if (tab && tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: playSound,
      args: [`https://prd-game-a5-granbluefantasy.akamaized.net/assets/sound/se/${notificationSound[sound]}.mp3`],
    }).catch((err) => {
      console.log(err)
    })
  }
}

function playSound(audioUrl: string) {
  const audio = new Audio(audioUrl)
  audio.play()
}

export function createNotification(options: NotificationOptions) {
  const { message, iconUrl = '/assets/icon-48.png', sound } = options

  if (sound && !notificationSetting.value.silent)
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

interface NotificationOptions {
  message: string
  iconUrl?: string
  sound?: keyof typeof notificationSound
}
