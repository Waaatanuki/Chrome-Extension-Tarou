import type { DropInfo, StartJsonBoss } from 'api'
import request from './request'

// 更新引继码
export function updateCode(data: { code: string }) {
  return request('/code', {
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
