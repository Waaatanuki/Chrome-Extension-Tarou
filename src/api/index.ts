import type { DropData, DropInfo, StartJsonBoss } from 'api'
import request from './request'

// 更新引继码
export function updateCode(data: { code: string }) {
  return request<{ code: string }>('/code', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// 发送掉落信息
export function sendDropInfo(data: DropInfo) {
  return request('/drop', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// 发送startJson中的boss信息
export function sendBossInfo(data: StartJsonBoss) {
  return request('/drop', {
    method: 'post',
    body: JSON.stringify(data),
  })
}

// 获取掉落统计信息
export function listDrop(str: string) {
  return request<{ data: DropData[] }>(`/drop?${str}`, {
    method: 'get',
  })
}
