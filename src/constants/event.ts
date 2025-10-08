const eventGachaInfo = [
  {
    name: '古战场',
    type: 'teamraid',
    boxToken: [
      [1600, 1],
      [2400, 3],
      [2000, 41],
      [10000, 35],
    ],
    last: 15000,
  },
  {
    name: '月末战货',
    type: 'treasureraid',
    boxToken: [
      [1200, 1],
      [1580, 1],
      [1980, 1],
      [2112, 17],
    ],
    last: 2104,
  },
  {
    name: '公会战',
    type: 'teamforce',
    boxToken: [
      [1600, 1],
      [2400, 3],
      [2000, 16],
      [10000, 20],
    ],
    last: 15000,
  },
]

export function getEventGachaBoxNum(opt: { eventType: string, currentToken: number, drawnBox: number }) {
  const { eventType, currentToken, drawnBox } = opt

  const event = eventGachaInfo.find(e => e.type === eventType)
  if (!event) {
    return 0
  }

  const tokenList = event.boxToken.flatMap(([token, count]) => Array.from<number>({ length: count }).fill(token))
  let remainingToken = currentToken
  let totalBox = drawnBox

  for (let i = drawnBox; i < tokenList.length; i++) {
    const token = tokenList[i]
    if (remainingToken >= token) {
      totalBox++
      remainingToken -= token
    }
    else {
      break
    }
  }

  // 计算额外可开启的宝箱数量
  if (totalBox >= tokenList.length) {
    totalBox += Math.floor(remainingToken / event.last)
  }

  return totalBox
}
