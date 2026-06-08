import type { BattleExport } from 'battle'
import type { BattleRecord } from 'extension'
import dayjs from 'dayjs'
import { userInfo } from '~/logic'

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

// 将HH:mm:ss 格式时间转化为时间戳
export function formatRemainingTime(remaining_time: string): number {
  const [hours, minutes, seconds] = remaining_time.split(':').map(Number)
  const totalSeconds = hours * 3600 + minutes * 60 + seconds
  return Date.now() + totalSeconds * 1000
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

export function formatEventDate(timestamp: number): string {
  const time = dayjs(timestamp).format('HH:mm')

  let prefix = ''
  if (dayjs().subtract(1, 'day').isSame(dayjs(timestamp), 'day')) {
    prefix = '昨天 '
  }
  else if (dayjs().subtract(2, 'day').isSame(dayjs(timestamp), 'day')) {
    prefix = '前天 '
  }
  else if (dayjs().isAfter(dayjs(timestamp), 'day')) {
    prefix = `${dayjs(timestamp).format('MM-DD')} `
  }

  return `${prefix}${time}`
}

export function getRealTimeSpeed(row: BattleRecord) {
  const seconds = row.startTimer - row.endTimer
  if (!seconds || !row.damage)
    return { time: '', speed: 0, set: '-' }
  const damage = Number(row.damage?.split(',').join(''))
  const time = formatTime(seconds)
  const speed = Number((damage / (seconds / 60) / 1000000).toFixed(0))
  return { time, speed, set: `${time} / ${speed}` }
}

export function getFullTimeSpeed(row: BattleRecord) {
  if (!row.duration || !row.damage)
    return '-'

  const damage = Number(row.damage?.split(',').join(''))
  let formatted_time = row.duration

  if (row.duration.split(':').length === 2)
    formatted_time = `00:${formatted_time}`

  const hour = Number(formatted_time.split(':')[0])
  const minute = Number(formatted_time.split(':')[1])
  const second = Number(formatted_time.split(':')[2])
  const seconds = hour * 3600 + minute * 60 + second

  return `${row.duration} / ${(damage / (seconds / 60) / 1000000).toFixed(0)}`
}

export function formatBuild(record: BattleRecord): BattleExport {
  const { time, speed } = getRealTimeSpeed(record)
  const partyKey = record.deck!.leader.masterId + record.deck?.npcs.reduce((acc, npc) => acc + npc.masterId, '')
  return {
    partyKey,
    userName: userInfo.value.name || '',
    questId: record.quest_id,
    raidId: record.raid_id,
    raidName: record.raid_name,
    bossImage: record.imgId,
    turn: record.turn,
    startTime: Math.floor((record.startTimestamp ?? Date.now()) / 1000),
    realTime: time,
    realSpeed: speed,
    fullSpeed: getFullTimeSpeed(record),
    point: record.point,
    damage: record.damage,
    deck: record.deck,
    detail: {
      player: record.player?.map((player) => {
        const { condition, ...rest } = player
        return rest
      }),
      actionQueue: record.actionQueue,
    },
  }
}
