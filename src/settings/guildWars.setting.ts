export const tableData = [
  {
    type: 'EX+',
    honor: '80,800',
    honorNumber: 80800,
    meat: Number(localStorage.getItem('meatPerCow')) || 6.4,
    ap: 30,
    token: 66,
  },
  {
    type: 'HELL Lv90',
    honor: '260,000',
    honorNumber: 260000,
    meat: 5,
    ap: 30,
    token: 83,
  },
  {
    type: 'HELL Lv95',
    honor: '910,000',
    honorNumber: 910000,
    meat: 10,
    ap: 40,
    token: 111,
  },
  {
    type: 'HELL Lv100',
    honor: '2,680,000',
    honorNumber: 2680000,
    meat: 20,
    ap: 50,
    token: 168,
  },
  {
    type: 'HELL Lv150',
    honor: '4,100,000',
    honorNumber: 4100000,
    meat: 20,
    ap: 50,
    token: 257,
  },
  {
    type: 'HELL Lv200',
    honor: '10,260,000',
    honorNumber: 10260000,
    meat: 30,
    ap: 50,
    token: 338,
  },
]

export const tokenData = [
  { line: 440800, perToken: 15000, drawnBox: 80 },
  { line: 90800, perToken: 10000, drawnBox: 45 },
  { line: 8800, perToken: 2000, drawnBox: 4 },
  { line: 1600, perToken: 2400, drawnBox: 1 },
  { line: 0, perToken: 1600, drawnBox: 0 },
]

export const setOptions = [
  { title: '休息日', selectOptions: ['HELL Lv90'], max: 100 },
  { title: '本战第一天', selectOptions: ['HELL Lv90', 'HELL Lv95'], max: 100 },
  {
    title: '本战第二天',
    selectOptions: ['HELL Lv90', 'HELL Lv95', 'HELL Lv100', 'HELL Lv150'],
    max: 200,
  },
  {
    title: '本战第三天',
    selectOptions: [
      'HELL Lv90',
      'HELL Lv95',
      'HELL Lv100',
      'HELL Lv150',
      'HELL Lv200',
    ],
    max: 200,
  },
  {
    title: '本战第四天',
    selectOptions: [
      'HELL Lv90',
      'HELL Lv95',
      'HELL Lv100',
      'HELL Lv150',
      'HELL Lv200',
    ],
    max: 200,
  },
]

export const apPerHalfElixir = 75
