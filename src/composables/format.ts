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
