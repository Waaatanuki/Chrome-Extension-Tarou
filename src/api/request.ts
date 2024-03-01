import { code, uid } from '~/logic'

async function request(api: string, options?: RequestInit) {
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
  })
    .catch((error) => {
      throw error
    })
}

export default request
