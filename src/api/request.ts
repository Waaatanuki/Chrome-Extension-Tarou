import { code, userInfo } from '~/logic'

async function request<T>(api: string, options?: RequestInit): Promise<T> {
  const baseURL = import.meta.env.VITE_APP_BASE_API
  const { checkCode } = useUser()

  checkCode()

  const defaultOptions = {
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'code': code.value,
      'uid': userInfo.value.uid || '',
    },
  }

  const fetchOptions = { ...defaultOptions, ...options }

  try {
    const response = await fetch(baseURL + api, fetchOptions)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || '请求失败')
    }
    return data
  }
  catch (err) {
    return Promise.reject(err)
  }
}

export default request
