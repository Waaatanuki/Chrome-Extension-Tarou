export function createNotification(message: string, iconUrl?: string) {
  chrome.notifications.create({
    iconUrl: iconUrl ?? '/assets/icon-48.png',
    message,
    type: 'basic',
    title: '通知',
    silent: false,
  })
}
