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
