import type { BuildResponse, DropInfo, StartJsonBoss, Stat } from 'api'
import type { Quest } from 'extension'
import request from './request'

// 更新引继码
export function updateCode(data: { code: string }) {
  return request<{ code: string }>('/ext/code', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// 发送Drop Info
export function sendDropInfo(data: DropInfo) {
  return request('/ext/drop', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// 批量发送Drop Info
export function sendMultiDropInfo(data: DropInfo[]) {
  return request('/ext/multiDrop', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// 发送startJson中的boss信息
export function sendBossInfo(data: StartJsonBoss) {
  return request('/ext/startJson', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// 获取Quest信息
export function listQuest() {
  return request<{ data: (Omit<Quest, 'visible'> & { deprecated?: boolean })[] }>('/ext/quest', {
    method: 'get',
  })
}

// 获取Drop Statistics信息
export function listDrop(questIds: string[]) {
  return request<{ data: Stat[] }>('/ext/stat', {
    method: 'post',
    body: JSON.stringify(questIds),
  })
}

// UploadSetup
export function uploadBuild(data: any) {
  return request<{ key: string }>('/ext/build', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// SearchSetup
export function listBuild(data: { questId: string, npcFilter: number[] }) {
  return request<{ data: { list: BuildResponse[], total: number } }>('/ext/getBuild', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// Upload用户插件Setup
export function setConfig(data: any) {
  return request('/ext/config/set', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// Search用户插件Setup
export function getConfig() {
  return request<{ data: any }>('/ext/config/get', {
    method: 'post',
  })
}
