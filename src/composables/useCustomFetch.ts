import { uid } from '~/logic'

export default function useCustomFetch() {
  function send(data: any) {
    console.log(data)
  }

  function getUid(url: string) {
    const searchParams = new URLSearchParams(url)
    uid.value = searchParams.get('uid') || ''
    return uid.value
  }

  return {
    send,
    getUid,
  }
}
