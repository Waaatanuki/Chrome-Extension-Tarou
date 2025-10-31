<script setup lang="ts">
import type { Buff } from 'source'

const battleInfo = ref({
  inLobby: false,
  leaderAttr: '3',
  bossInfo: {
    questId: '305671',
    battleId: '43559079033',
    shareId: '6ED0E97D',
    imgId: '6206033',
    name: 'Lv275 オムニスマギア・ウィッチ',
    hp: 411683337,
    hpmax: 2500000000,
    hpPercent: 16.47,
    timer: 1241,
    countDownTime: 1761898896919,
    turn: 14,
    addition: { restTime: 1761954421000 },
    lv: '275',
    attribute: '火',
    limitNum: 6,
    fellow: 4,
  },
  summonInfo: {
    summon: [
      {
        id: '2040084000',
        image_id: '2040084000_04',
        name: 'ティターン',
        attribute: '3',
        skill: 'アガペーグレイス',
        comment: '<div class=prt-text-small>敵全体に土属性12倍ダメージ/HPが0になるダメージに耐える/味方全体にブロック効果/与ダメージ上昇</div>',
        recast: '0',
        start_recast: '',
        require: '7',
        protection_name: 'ティターンの加護',
        protection: 'スキル「土」「大地」「地裂」の効果が170%UP<br>◆メイン召喚石に装備時、土属性攻撃力が30%UP',
        evolution_flag: '0',
        level: '',
        quality: '',
        evolution: '6',
        sub_skill_flag: false,
        special_once_flag: false,
        summon_skin_flag: true,
        summon_skin_id: '2040216000',
        is_quick_summon: false,
        is_full_auto_quick_summon: false,
        skill_color_type: 4,
      },
      {
        id: '2040408000',
        image_id: '2040408000',
        name: 'ベルゼバブ',
        attribute: '6',
        skill: 'ケイオス・レギオン',
        comment: '<div class=prt-text-small>敵全体に自属性20倍ダメージ/防御DOWN/弱体耐性DOWN/主人公のトランスLvに応じた追加効果　◆参戦者が合体召喚不可</div>',
        recast: '0',
        start_recast: '3',
        require: '12',
        protection_name: '一にして全、全にして一',
        protection: '<div class=prt-text-small>主人公が奥義発動時に主人公のトランスLvが1上昇(最大3) ◆トランスLvに応じて主人公の連続攻撃確率UP/Lv3の時ステータス大幅UP</div>',
        evolution_flag: '0',
        level: '',
        quality: '',
        evolution: '4',
        sub_skill_flag: true,
        special_once_flag: false,
        summon_skin_flag: false,
        summon_skin_id: null,
        is_quick_summon: false,
        is_full_auto_quick_summon: false,
        skill_color_type: 2,
      },
      {
        id: '2040056000',
        image_id: '2040056000_04',
        name: 'ルシフェル',
        attribute: '5',
        skill: 'パラダイス・ロスト＋',
        comment: '敵全体に自属性20倍ダメージ/味方全体に純白の翼効果/HP回復/強化効果が無効化されない',
        recast: '0',
        start_recast: '',
        require: '6',
        protection_name: 'ルシフェルの加護',
        protection: '回復性能30%UP',
        evolution_flag: '0',
        level: '',
        quality: '',
        evolution: '6',
        sub_skill_flag: true,
        special_once_flag: false,
        summon_skin_flag: false,
        summon_skin_id: null,
        is_quick_summon: false,
        is_full_auto_quick_summon: false,
        skill_color_type: 4,
      },
      {
        id: '2040347000',
        image_id: '2040347000',
        name: 'ベリアル',
        attribute: '6',
        skill: 'パレーズ・ラスト',
        comment: '4ターンごとに敵全体か味方全体にランダムな効果　◆再召喚不可/参戦者が合体召喚不可',
        recast: '0',
        start_recast: '',
        require: '3',
        protection_name: 'こういうプレイも悪くないだろう？',
        protection: '与ダメージが最大30000上昇/最大HP30%DOWN',
        evolution_flag: '0',
        level: '',
        quality: '',
        evolution: '4',
        sub_skill_flag: true,
        special_once_flag: true,
        summon_skin_flag: false,
        summon_skin_id: null,
        is_quick_summon: false,
        is_full_auto_quick_summon: false,
        skill_color_type: 2,
      },
      {
        id: '2040203000',
        image_id: '2040203000',
        name: 'ウリエル',
        attribute: '3',
        skill: '光炎',
        comment: '<div class=prt-text-small>敵全体に土属性4倍ダメージ/土属性キャラの攻防UP(特大)/味方全体の奥義ゲージUP(30%)/奥義ゲージ上昇量UP</div>',
        recast: '0',
        start_recast: '3',
        require: '9',
        protection_name: 'ウリエルの加護',
        protection: '土属性キャラのダメージ上限15%UP',
        evolution_flag: '0',
        level: '',
        quality: '',
        evolution: '4',
        sub_skill_flag: true,
        special_once_flag: false,
        summon_skin_flag: false,
        summon_skin_id: null,
        is_quick_summon: false,
        is_full_auto_quick_summon: false,
        skill_color_type: 2,
      },
    ],
    supporter: {
      recast: '0',
      start_recast: '',
      name: 'ティターン',
      attribute: '3',
      level: '',
      quality: '',
      detail: '<div class=prt-text-small>敵全体に土属性12倍ダメージ/HPが0になるダメージに耐える/味方全体にブロック効果/与ダメージ上昇</div>',
      require: '7',
      id: '2040084000',
      image_id: '2040084000_04',
      skill: 'ティタノマキア＋',
      comment: '<div class=prt-text-small>敵全体に土属性12倍ダメージ/HPが0になるダメージに耐える/味方全体にブロック効果/与ダメージ上昇</div>',
      protection_name: 'ティターンの加護',
      protection: 'スキル「土」「大地」「地裂」の効果が170%UP<br>◆メイン召喚石に装備時、土属性攻撃力が30%UP',
      friend: true,
      evolution_flag: 0,
      available_skill: true,
      evolution: '6',
      special_once_flag: false,
      skill_color_type: 4,
    },
  },
  buffInfo: {
    bossBuffs: [
      {
        status: '6553_2',
        personal_buff_user_id: '25246588',
        personal_status: '6553_2',
        personal_buff_end_turn: '10003',
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '3326',
        personal_buff_user_id: '25246588',
        personal_status: '3326',
        personal_buff_end_turn: '10009',
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1486_210',
        personal_buff_user_id: '25246588',
        personal_status: '1486_2',
        personal_buff_end_turn: '17',
        icon_add_turn_flag: '1',
        display_priority: 0,
      },
      {
        status: '1001_410',
        personal_buff_user_id: '25246588',
        personal_status: '1001_4',
        personal_buff_end_turn: '17',
        icon_add_turn_flag: '1',
        display_priority: 0,
      },
      {
        status: '1931_110',
        personal_buff_user_id: '25246588',
        personal_status: '1931_1',
        personal_buff_end_turn: '17',
        icon_add_turn_flag: '1',
        display_priority: 0,
      },
      {
        status: '3328',
        personal_buff_user_id: '25246588',
        personal_status: '3328',
        personal_buff_end_turn: '10012',
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '3329',
        personal_buff_user_id: '25246588',
        personal_status: '3329',
        personal_buff_end_turn: '10012',
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '6552',
        personal_buff_user_id: '25246588',
        personal_status: '6552',
        personal_buff_end_turn: '10012',
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '3324',
        personal_buff_user_id: '25246588',
        personal_status: '3324',
        personal_buff_end_turn: '10012',
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '72972',
        is_unusable_harb: true,
        personal_debuff_user_id: false,
        personal_status: '72972',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
      {
        status: '7435_1',
        is_unusable_harb: true,
        personal_debuff_user_id: false,
        personal_status: '7435_1',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
      {
        status: '1010',
        is_unusable_harb: false,
        personal_debuff_user_id: false,
        personal_status: '1010',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
      {
        status: '1020',
        is_unusable_harb: false,
        personal_debuff_user_id: false,
        personal_status: '1020',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
      {
        status: '1032',
        is_unusable_harb: false,
        personal_debuff_user_id: false,
        personal_status: '1032',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
      {
        status: '1430',
        is_unusable_harb: false,
        personal_debuff_user_id: false,
        personal_status: '1430',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
      {
        status: '1524',
        is_unusable_harb: false,
        personal_debuff_user_id: false,
        personal_status: '1524',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
      {
        status: '1428',
        is_unusable_harb: false,
        personal_debuff_user_id: false,
        personal_status: '1428',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
      {
        status: '1427',
        is_unusable_harb: false,
        personal_debuff_user_id: false,
        personal_status: '1427',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
    ],
    playerBuffs: [
      {
        status: '7225',
        personal_buff_user_id: false,
        personal_status: '7225',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1074',
        personal_buff_user_id: false,
        personal_status: '1074',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1069',
        personal_buff_user_id: false,
        personal_status: '1069',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '3088',
        personal_buff_user_id: false,
        personal_status: '3088',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1476',
        personal_buff_user_id: false,
        personal_status: '1476',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '6082',
        personal_buff_user_id: false,
        personal_status: '6082',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1019_2_20',
        personal_buff_user_id: false,
        personal_status: '1019_2_20',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1334',
        personal_buff_user_id: false,
        personal_status: '1334',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1477',
        personal_buff_user_id: false,
        personal_status: '1477',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1104',
        personal_buff_user_id: false,
        personal_status: '1104',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1486',
        personal_buff_user_id: false,
        personal_status: '1486',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '7472',
        personal_buff_user_id: false,
        personal_status: '7472',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1484',
        personal_buff_user_id: false,
        personal_status: '1484',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '7035',
        personal_buff_user_id: false,
        personal_status: '7035',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1378',
        personal_buff_user_id: false,
        personal_status: '1378',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1658',
        personal_buff_user_id: false,
        personal_status: '1658',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '1561',
        personal_buff_user_id: false,
        personal_status: '1561',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '15024',
        personal_buff_user_id: false,
        personal_status: '15024',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: 0,
      },
      {
        status: '7758',
        personal_buff_user_id: false,
        personal_status: '7758',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: '100',
      },
      {
        status: '6707_3',
        personal_buff_user_id: false,
        personal_status: '6707_3',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: '1000',
      },
      {
        status: '7294_3',
        personal_buff_user_id: false,
        personal_status: '7294_3',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: '1000',
      },
      {
        status: '7743_12',
        personal_buff_user_id: false,
        personal_status: '7743_12',
        personal_buff_end_turn: false,
        icon_add_turn_flag: '',
        display_priority: '1030',
      },
      {
        status: '1083',
        is_unusable_harb: false,
        personal_debuff_user_id: false,
        personal_status: '1083',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
      {
        status: '1103',
        is_unusable_harb: false,
        personal_debuff_user_id: false,
        personal_status: '1103',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
      {
        status: '1023',
        is_unusable_harb: false,
        personal_debuff_user_id: false,
        personal_status: '1023',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
      {
        status: '1123',
        is_unusable_harb: false,
        personal_debuff_user_id: false,
        personal_status: '1123',
        personal_debuff_end_turn: false,
        icon_add_turn_flag: '',
      },
    ],
  },
  mvpInfo: [
    {
      userId: '25246588',
      rank: 1,
      point: 9905131,
    },
    {
      userId: '5058333',
      rank: 2,
      point: 7338242,
    },
    {
      userId: '6568663',
      rank: 3,
      point: 3445194,
    },
    {
      userId: '11675192',
      rank: 4,
      point: 363580,
    },
  ],
  normalAttackInfo: {
    hit: 30,
    ability: 49025329,
    special: 92008738,
    total: 147007091,
  },
  lobbyMemberList: [
    {
      nickname: '九条',
      userId: '13639092',
      userRank: '400',
      jobIcon: 'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/100501.png',
      attributeClass: 'ico-attribute ico-attribute-6',
      isDead: false,
      groupNum: null,
    },
    {
      nickname: '高橋松餅',
      userId: '17881337',
      userRank: '400',
      jobIcon: 'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/220301.png',
      attributeClass: 'ico-attribute ico-attribute-4',
      isDead: false,
      groupNum: null,
    },
    {
      nickname: '花色',
      userId: '19240060',
      userRank: '400',
      jobIcon: 'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/150401.png',
      attributeClass: 'ico-attribute ico-attribute-2',
      isDead: false,
      groupNum: null,
    },
    {
      nickname: '柳 貫 一',
      userId: '15323765',
      userRank: '400',
      jobIcon: 'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/100501.png',
      attributeClass: 'ico-attribute ico-attribute-5',
      isDead: false,
      groupNum: null,
    },
    {
      nickname: '四月一日',
      userId: '25246588',
      userRank: '400',
      jobIcon: 'https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/270301.png',
      attributeClass: 'ico-attribute ico-attribute-3',
      isDead: false,
      groupNum: null,
    },
  ],
  chatList: [],
  memberInfo: [
    {
      nickname: 'みゆーく',
      userId: '5058333',
      userRank: '366',
      jobIcon: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/470301.png',
      attributeClass: 'ico-attribute ico-attribute-2',
      isDead: false,
      isHost: true,
      groupNum: null,
    },
    {
      nickname: 'ＳＥＧＡ',
      userId: '6568663',
      userRank: '394',
      jobIcon: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/140401.png',
      attributeClass: 'ico-attribute ico-attribute-2',
      isDead: false,
      isHost: false,
      groupNum: null,
    },
    {
      nickname: 'はねくろ',
      userId: '11675192',
      userRank: '207',
      jobIcon: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/130401.png',
      attributeClass: 'ico-attribute ico-attribute-2',
      isDead: false,
      isHost: false,
      groupNum: null,
    },
    {
      nickname: '四月一日',
      userId: '25246588',
      userRank: '400',
      jobIcon: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/270301.png',
      attributeClass: 'ico-attribute ico-attribute-3',
      isDead: false,
      isHost: false,
      groupNum: null,
    },
  ],
})

const specBossBuff = ref([
  '7479',
  '7478',
  '3323',
  '3325',
  '3324',
  '3327',
  '7637',
  '7696',
  '3326',
  '3245',
  '3246',
  '3265',
  '3253',
  '3264',
  '3263',
  '7781',
  '3252',
  '1374',
  '6107',
  '7038',
  '3342',
  '3345',
  '1019',
  '4052',
  '4055',
  '3354',
  '3357',
  '3355',
  '3353',
  '3356',
  '3348',
  '3330',
])

const bossImgSrc = computed(() => getBossImg('enemy', battleInfo.value.bossInfo!.imgId, 's'))

const importantBossBuffs = ref<Buff[]>([])
const commonBossBuffs = ref<Buff[]>([])

watchEffect(() => {
  if (!battleInfo.value.buffInfo?.bossBuffs)
    return

  importantBossBuffs.value = []
  commonBossBuffs.value = []
  for (const buff of battleInfo.value.buffInfo?.bossBuffs) {
    if (specBossBuff.value.some(specBuff => buff.status.startsWith(specBuff)))
      importantBossBuffs.value.push(buff)
    else
      commonBossBuffs.value.push(buff)
  }
})

function toggleImage(specBuff: string[], buffId: string) {
  const index = specBuff.indexOf(buffId)
  if (index >= 0)
    specBuff.splice(index, 1)
  else
    specBuff.push(buffId)
}
</script>

<template>
  <div class="w-385px fc flex-col text-rose">
    <div mb-10px fc gap-5 text-20px>
      {{ `TURN ${battleInfo.bossInfo.turn}` }}
      <div v-if="battleInfo.bossInfo.hp === 0">
        {{ formatTime(battleInfo.bossInfo.timer) }}
      </div>
      <ElCountdown v-else :value="battleInfo.bossInfo.countDownTime" />
    </div>
    <div class="w-full flex items-center justify-between">
      <div fc gap-4px>
        <el-tooltip :content="battleInfo.bossInfo.name" placement="right">
          <img w-45px :src="bossImgSrc">
        </el-tooltip>
        <ElCountdown
          v-if="typeof battleInfo.bossInfo.addition?.restTime === 'number'"
          value-style="color: #b91c1c" format="mm:ss" :value="battleInfo.bossInfo.addition.restTime"
        />
        <div v-if="battleInfo.bossInfo.addition.genesis">
          {{ battleInfo.bossInfo.addition.genesis }}
        </div>
      </div>
      <div>
        <div text-end text-18px>
          {{ battleInfo.bossInfo.hpPercent }}%
        </div>
        <div text-12px>
          {{ `${battleInfo.bossInfo.hp.toLocaleString()}/${battleInfo.bossInfo.hpmax.toLocaleString()}` }}
        </div>
      </div>
    </div>

    <div class="w-full">
      <el-progress :percentage="battleInfo.bossInfo.hpPercent" :stroke-width="10" status="exception" :show-text="false" />
    </div>

    <div v-if="battleInfo.buffInfo?.bossBuffs.length" mt-10px w-full flex flex-wrap>
      <img
        v-for="buff in importantBossBuffs"
        :key="buff.status"
        h-48px w-48px cursor-pointer
        :src="getBuffIcon(buff, battleInfo.bossInfo!.turn)"
        @click="toggleImage(specBossBuff, buff.status.split('_')[0])"
      >
      <div v-for="i in Math.ceil(commonBossBuffs.length / 2)" :key="i" flex flex-col>
        <img
          v-if="commonBossBuffs[(i - 1) * 2]"
          h-24px w-24px cursor-pointer
          :src="getBuffIcon(commonBossBuffs[(i - 1) * 2], battleInfo.bossInfo!.turn)"
          @click="toggleImage(specBossBuff, commonBossBuffs[(i - 1) * 2].status.split('_')[0])"
        >
        <img
          v-if="commonBossBuffs[(i - 1) * 2 + 1]"
          h-24px w-24px cursor-pointer
          :src="getBuffIcon(commonBossBuffs[(i - 1) * 2 + 1], battleInfo.bossInfo!.turn)"
          @click="toggleImage(specBossBuff, commonBossBuffs[(i - 1) * 2 + 1].status.split('_')[0])"
        >
      </div>
      <div v-for="i in Math.ceil(commonBossBuffs.length / 2)" :key="i" flex flex-col>
        <img
          v-if="commonBossBuffs[(i - 1) * 2]"
          h-24px w-24px cursor-pointer
          :src="getBuffIcon(commonBossBuffs[(i - 1) * 2], battleInfo.bossInfo!.turn)"
          @click="toggleImage(specBossBuff, commonBossBuffs[(i - 1) * 2].status.split('_')[0])"
        >
        <img
          v-if="commonBossBuffs[(i - 1) * 2 + 1]"
          h-24px w-24px cursor-pointer
          :src="getBuffIcon(commonBossBuffs[(i - 1) * 2 + 1], battleInfo.bossInfo!.turn)"
          @click="toggleImage(specBossBuff, commonBossBuffs[(i - 1) * 2 + 1].status.split('_')[0])"
        >
      </div>
      <div v-for="i in Math.ceil(commonBossBuffs.length / 2)" :key="i" flex flex-col>
        <img
          v-if="commonBossBuffs[(i - 1) * 2]"
          h-24px w-24px cursor-pointer
          :src="getBuffIcon(commonBossBuffs[(i - 1) * 2], battleInfo.bossInfo!.turn)"
          @click="toggleImage(specBossBuff, commonBossBuffs[(i - 1) * 2].status.split('_')[0])"
        >
        <img
          v-if="commonBossBuffs[(i - 1) * 2 + 1]"
          h-24px w-24px cursor-pointer
          :src="getBuffIcon(commonBossBuffs[(i - 1) * 2 + 1], battleInfo.bossInfo!.turn)"
          @click="toggleImage(specBossBuff, commonBossBuffs[(i - 1) * 2 + 1].status.split('_')[0])"
        >
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
