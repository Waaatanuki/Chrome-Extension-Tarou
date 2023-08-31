export const weaponSkill = [
  {
    id: '4048',
    name: '強壮のペンデュラム',
    alias: '浑身',
    comment: 'キャラのHPが多いほど攻撃力が上昇(大)',
  },
  {
    id: '4049',
    name: '激情のペンデュラム',
    alias: '背水',
    comment: 'キャラのHPが少ないほど攻撃力が上昇(大)',
  },
  {
    id: '4050',
    name: '闘争のペンデュラム',
    alias: '连击',
    comment: 'キャラの連続攻撃確率上昇(中)',
  },
  {
    id: '4051',
    name: '隆盛のペンデュラム',
    alias: '进境',
    comment: 'キャラの属性攻撃力が上昇(大)',
  },
  {
    id: '6153',
    name: '技錬のチェイン',
    alias: '暴击',
    comment: 'キャラの攻撃力上昇(中)/クリティカル確率上昇(中)',
  },
  {
    id: '6154',
    name: '賦活のチェイン',
    alias: '神威',
    comment: 'キャラの攻撃力と最大HPが上昇(中)',
  },
  {
    id: '6155',
    name: '謳歌のチェイン',
    alias: '讴歌',
    comment: 'キャラの奥義性能UP(大)/チェインバースト性能UP(大)',
  },
  {
    id: '6156',
    name: '誘惑のチェイン',
    alias: '诱惑',
    comment: 'バトル開始時に様々な強化効果/最大HP-30%',
  },
  {
    id: '6157',
    name: '禁忌のチェイン',
    alias: '禁忌',
    comment: '奥義性能UP/奥義発動時にダメージを受ける',
  },
  {
    id: '6158',
    name: '邪罪のチェイン',
    alias: '邪罪',
    comment: '自分のHPが50%以下の時、ターン終了時敵全体に無属性ダメージ/毎ターンダメージを受ける',
  },
  {
    id: '6159',
    name: '虚詐のチェイン',
    alias: '虚诈',
    comment: '自属性追撃効果/奥義ゲージ上昇量大幅DOWN',
  },
  {
    id: '6549',
    name: 'ガフスキー【エナ】',
    alias: '上限',
    comment: 'ダメージ上限上昇',
  },
  {
    id: '6550',
    name: 'ガフスキー【ディオ】',
    alias: '回复',
    comment: '回復上限上昇',
  },
  {
    id: '6551',
    name: 'ガフスキー【トリア】',
    alias: '天司',
    comment: '有利な属性の敵に対して与ダメージUP',
  },
  {
    id: '6552',
    name: 'ガフスキー【テーセラ】',
    alias: '奥义',
    comment: '奥義ゲージ上昇量UP',
  },

]

const a = {
  condition: {
    debuff: [
      {
        status: '1020',
        class: 'time',
        remain: '02:47',
        name: '防御力DOWN',
        detail: '防御力が減少した状態',
        is_unusable_harb: false,
      },
      {
        status: '1011',
        class: 'time',
        remain: '02:47',
        name: '弱体耐性DOWN',
        detail: '弱体耐性が減少した状態',
        is_unusable_harb: false,
      },
      {
        status: '3136',
        class: 'turn',
        remain: 1,
        name: '穿孔',
        detail: '防御力が大幅に減少し、被ダメージが大幅に上昇した状態(消去不可/延長不可)',
        is_unusable_harb: true,
      },
    ],
  },
}

const b = {
  condition: {
    buff: [
      {
        status: '1609',
        class: 'time',
        remain: 0,
        name: '頑強',
        detail: '毎ターンHPが回復する状態',
        is_unusable_harb: true,
      },
    ],
    debuff: [
      {
        status: '1020',
        class: 'time',
        remain: '02:57',
        name: '防御力DOWN',
        detail: '防御力が減少した状態',
        is_unusable_harb: false,
      },
      {
        status: '1011',
        class: 'time',
        remain: '02:57',
        name: '弱体耐性DOWN',
        detail: '弱体耐性が減少した状態',
        is_unusable_harb: false,
      },
      {
        status: '3136',
        class: 'turn',
        remain: 1,
        name: '穿孔',
        detail: '防御力が大幅に減少し、被ダメージが大幅に上昇した状態(消去不可/延長不可)',
        is_unusable_harb: true,
      },
      {
        status: '1609',
        class: 'time',
        remain: 0,
        name: '頑強',
        detail: '毎ターンHPが回復する状態',
      },
    ],
  },
}
