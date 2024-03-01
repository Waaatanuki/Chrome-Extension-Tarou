import { validate as uuidValidate, v4 as uuidv4 } from 'uuid'
import { code, uid } from '~/logic'

export default function useUser() {
  function checkUid(url: string) {
    const searchParams = new URLSearchParams(url)
    uid.value = searchParams.get('uid') || ''
  }

  function checkCode() {
    if (!uuidValidate(code.value))
      code.value = uuidv4()
  }

  return {
    checkCode,
    checkUid,
  }
}
