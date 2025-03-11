// 将秒数转化为HH:mm:ss
export function formatTime(seconds: number): string {
  if (seconds === 0)
    return ''
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  if (hours > 0) {
    const formattedHours = hours.toString().padStart(2, '0')
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
  }
  else {
    return `${formattedMinutes}:${formattedSeconds}`
  }
}

// 将MM/DD HH:mm格式时间转化为时间戳
export function formatFinishTime(finishTime: string) {
  const currentYear = new Date().getFullYear()
  const [monthDay, time] = finishTime.split(' ')
  const [month, day] = monthDay.split('/')
  const finishDate = new Date(`${currentYear}-${month}-${day}T${time}:00+09:00`)
  if (!finishDate.valueOf())
    return Date.now()

  const compareDate = new Date(finishDate.getTime() - 24 * 60 * 60 * 1000)

  if (compareDate.valueOf() > new Date().valueOf())
    finishDate.setFullYear(currentYear - 1)
  return finishDate.valueOf()
}

export function imgSrcToKey(src = '') {
  const arr = src.split(/\/assets(?:_en)?\/img(?:_low|_mid)?\/sp\/assets/)
  if (arr.length === 2) {
    const key = arr[1].replace(/\/(m|b)\//, '/s/').replace('.png', '.jpg').replace(/\/artifact\/s\/\d+(\.[^/]+)$/, '/artifact/s/301010101$1')
    return key
  }
  return ''
}

export function imgSrcToQuestImage(src = '') {
  const separator = '/sp/'
  const index = src.indexOf(separator)
  return index === -1 ? '' : src.substring(index)
}
