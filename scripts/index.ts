// 剩余时间字符串
const remaining_time = '01:28:09'

// 1. 拆分 时:分:秒
const [hours, minutes, seconds] = remaining_time.split(':').map(Number)

// 2. 计算总秒数
const totalSeconds = hours * 3600 + minutes * 60 + seconds

// 3. 获取当前时间戳（毫秒）+ 剩余时间毫秒数
const endTimestamp = Date.now() + totalSeconds * 1000

console.log('结束时间戳（毫秒）:', endTimestamp)
