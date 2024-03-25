import type { DropData, DropInfo, StartJsonBoss } from 'api'
import request from './request'

// 更新引继码
export function updateCode(data: { code: string }) {
  return request<{ code: string }>('/ext/code', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// 发送掉落信息
export function sendDropInfo(data: DropInfo) {
  return request('/ext/drop', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// 批量发送掉落信息
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
    body: JSON.stringify({ quest: data }),
  })
}

// 获取掉落统计信息
export function listDrop() {
  return request<{ data: DropData[] }>('/ext/drop', {
    method: 'get',
  })
}
