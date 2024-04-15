import { validate as uuidValidate, v4 as uuidv4 } from 'uuid'
import { code, uid } from '~/logic'

export default function useUser() {
  function checkUser(url: string) {
    const searchParams = new URLSearchParams(url)
    uid.value = searchParams.get('uid') || ''
    if (!uuidValidate(code.value))
      code.value = uuidv4()
  }

  return {
    checkUser,
  }
}
