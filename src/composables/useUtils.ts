import { cloneDeep } from 'lodash-es'
import { combatPanelSetting } from '~/logic'

export function isGamePage(url?: string) {
  if (!url)
    return false

  const urlObj = new URL(url)
  const HOST = ['game.granbluefantasy.jp', 'gbf.game.mbga.jp']
  return HOST.includes(urlObj.host)
}

export function goProfilePage(userId: string) {
  window.open(`https://game.granbluefantasy.jp/#profile/${userId}`)
}

export function deepClone<T>(obj: T): T {
  return cloneDeep(obj)
}

/**
 * 深度合并默认配置和用户配置
 * @param defaultConfig 默认配置
 * @param userConfig 用户当前配置
 * @returns 合并后的新配置
 */
export function mergeConfig<T extends Record<string, any>>(defaultConfig: T, userConfig: Partial<T>): T {
  const result = {} as T

  // 只遍历默认配置，构建结果对象
  for (const key in defaultConfig) {
    const defaultValue = defaultConfig[key]
    const userValue = userConfig[key]

    if (isPlainObject(defaultValue) && isPlainObject(userValue)) {
      // 如果都是对象，递归合并
      result[key] = mergeConfig(defaultValue, userValue as any)
    }
    else if (userValue !== undefined) {
      // 如果用户有这个值，使用用户的值
      result[key] = userValue
    }
    else {
      // 否则使用默认值
      result[key] = defaultValue
    }
  }

  return result
}

/**
 * 检查是否为纯对象
 */
function isPlainObject(obj: any): obj is Record<string, any> {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && obj.constructor === Object
}

export function openPopupWindow(key: string) {
  const windowSize: Record<string, { height: number, width: number }> = {
    ArtifactBox: { height: 1000, width: 1580 },
    ArtifactRule: { height: 700, width: 700 },
    BuildCompare: { height: 900, width: 1100 },
    ExportRecord: { height: 800, width: 800 },
    RecoveryItem: { height: 1000, width: 900 },
    SampoSetup: { height: 900, width: 600 },
    SupportSummon: { height: 400, width: 600 },
  }

  const getWindowSize = (key: string) => {
    if (key.startsWith('WindowPanel')) {
      return { height: 800, width: 360 }
    }
    return windowSize[key] ?? { height: 800, width: 800 }
  }

  chrome.windows.create({ url: `src/views/popup/main.html?${key}`, type: 'popup', ...getWindowSize(key) })
    .catch((err) => { createNotification({ message: String(err) }) })
}

export function openCombatPanel() {
  chrome.windows.create({
    url: 'src/views/combatPanel/main.html',
    type: 'popup',
    width: combatPanelSetting.value.Container.width,
    height: combatPanelSetting.value.Container.height,
  })
    .catch((err) => { createNotification({ message: String(err) }) })
}
