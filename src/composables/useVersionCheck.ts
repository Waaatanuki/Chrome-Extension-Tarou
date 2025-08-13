import { notificationSetting } from '~/logic'

export function useVersionCheck() {
  const updateInfo = ref({
    visible: false,
    date: '',
    version: '',
    comment: '',
  })

  // 比较版本号
  function compareVersions(local: string, remote: string) {
    const localParts = local.split('.').map(Number)
    const remoteParts = remote.split('.').map(Number)

    for (let i = 0; i < Math.max(localParts.length, remoteParts.length); i++) {
      const localNum = localParts[i] || 0
      const remoteNum = remoteParts[i] || 0

      if (remoteNum > localNum)
        return true
      if (remoteNum < localNum)
        return false
    }

    return false
  }

  // 检查更新
  async function checkForUpdates() {
    try {
      const manifest = chrome.runtime.getManifest()
      const localVersion = manifest.version
      const response = await fetch('https://hub.gitmirror.com/https://raw.githubusercontent.com/Waaatanuki/Chrome-Extension-Tarou/main/changelog.json')
      const changelogData = await response.json()

      if (changelogData.length > 0) {
        const remoteVersion = changelogData[0].version
        const hasUpdate = compareVersions(localVersion, remoteVersion)

        if (hasUpdate && notificationSetting.value.checkUpdate) {
          updateInfo.value = {
            visible: true,
            ...changelogData[0],
          }
        }
      }
    }
    catch (error) {
      console.error('检查更新失败:', error)
    }
  }

  return {
    updateInfo,
    checkForUpdates,
  }
}
