import { code, uid } from '~/logic'

async function request<T>(api: string, options?: RequestInit, maxCount = 0): Promise<T> {
  const baseURL = import.meta.env.VITE_APP_BASE_API

  const defaultOptions = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'code': code.value,
      'uid': uid.value,
    },
  }

  const fetchOptions = { ...defaultOptions, ...options }

  return fetch(baseURL + api, fetchOptions).then((response) => {
    if (!response.ok)
      throw new Error(response.statusText || '请求失败')
    return response.json()
  }).catch(err => maxCount > 0
    ? request(api, options, maxCount - 1)
    : Promise.reject(err))
}

export default request
