<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'
import BattleAnalysis from '~/views/sidePanel/views/combat/components/BattleAnalysis.vue'
import Npc from '~/views/sidePanel/views/party/components/Npc.vue'

const visible = ref(false)
const currentView = ref('Dashborad')

const upViewList = [
  { key: 'Dashborad', lable: '基础信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落信息', icon: 'material-symbols:bookmark-star-sharp' },
]
const downViewList = [
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]

const { battleInfo, currentRaid } = { battleInfo: { inLobby: false, leaderAttr: '4', bossInfo: { questId: '990071', battleId: '1820539884', imgId: '4200293', name: 'オールド・木人', hp: 1000000000, hpmax: 1000000000, hpPercent: 100, timer: 5399, turn: 1, addition: {}, interrupt_display_text: '' }, summonInfo: { summon: [{ id: '2040425000', image_id: '2040425000', name: 'トリプルゼロ', attribute: '5', skill: 'アガペーグレイス', comment: '<div class=prt-text-small>敵全体に火・水・土・風・光属性合計20倍ダメージ/主人公が即時奥義発動可能/奥義再発動(1回)効果<br>◆このダメージは敵の属性耐性を無視する/敵の属性に関わらず弱点をつく/主人公の約束の羽が12枚のときのみ召喚可能/召喚後、約束の羽が終末の羽に変わり召喚技と加護効果が変化/参戦者が合体召喚不可</div>', recast: '0', start_recast: '3', require: '6', protection_name: '相克の十二枚羽', protection: '全属性攻撃力が120%UP/バトル開始時、主人公に約束の羽を12枚追加<br>◆約束の羽の枚数に応じて主人公の攻撃UP/防御UP/12枚のときバトルメンバーの与ダメージUP', evolution_flag: '0', level: '', quality: '', evolution: '4', sub_skill_flag: false, special_once_flag: false, summon_skin_flag: true, summon_skin_id: '2040216000', is_quick_summon: true, is_full_auto_quick_summon: true, skill_color_type: 2 }, { id: '2040347000', image_id: '2040347000', name: 'ベリアル', attribute: '6', skill: 'パレーズ・ラスト', comment: '4ターンごとに敵全体か味方全体にランダムな効果　◆再召喚不可/参戦者が合体召喚不可', recast: '3', start_recast: '', require: '3', protection_name: 'こういうプレイも悪くないだろう？', protection: '与ダメージが最大30000上昇/最大HP30%DOWN', evolution_flag: '0', level: '', quality: '', evolution: '4', sub_skill_flag: true, special_once_flag: true, summon_skin_flag: false, summon_skin_id: null, is_quick_summon: false, is_full_auto_quick_summon: false, skill_color_type: 2 }, { id: '2040003000', image_id: '2040003000_04', name: 'バハムート', attribute: '6', skill: 'カタストロフィ・ノヴァ＋', comment: '敵全体に自属性20倍ダメージ/味方全体に創世の翼効果/召喚石の再使用間隔を1ターン短縮', recast: '6', start_recast: '', require: '6', protection_name: 'バハムートの加護', protection: '召喚の与ダメージ50%UP/召喚石の使用間隔を1ターン短縮', evolution_flag: '0', level: '', quality: '', evolution: '6', sub_skill_flag: true, special_once_flag: false, summon_skin_flag: false, summon_skin_id: null, is_quick_summon: false, is_full_auto_quick_summon: false, skill_color_type: 4 }, { id: '2040020000', image_id: '2040020000_04', name: 'ティアマト・マグナ', attribute: '4', skill: 'ルイーナ・テンペスタス', comment: '<div class=prt-text-small>敵全体に風属性ダメージ(極大)/風属性追加ダメージ/攻撃DOWN/味方全体に幻影効果(1回)/風属性攻撃UP</div>', recast: '3', start_recast: '', require: '6', protection_name: 'ティアマト・マグナの加護', protection: '風属性キャラの攻防10%UP', evolution_flag: '0', level: '', quality: '', evolution: '6', sub_skill_flag: true, special_once_flag: false, summon_skin_flag: false, summon_skin_id: null, is_quick_summon: false, is_full_auto_quick_summon: false, skill_color_type: 4 }, { id: '2040322000', image_id: '2040322000', name: 'ジャッジメント', attribute: '4', skill: 'サボンスフィア', comment: '<div class=prt-text-small>敵全体に風属性5倍ダメージ/風属性キャラを復活(選択不可)/復活したキャラに審判効果　◆参戦者が合体召喚不可</div>', recast: '0', start_recast: '3', require: '9', protection_name: 'ジャッジメントの加護', protection: '風属性のキャラが土属性の敵に対して与ダメージ10%UP', evolution_flag: '0', level: '', quality: '', evolution: '5', sub_skill_flag: true, special_once_flag: false, summon_skin_flag: false, summon_skin_id: null, is_quick_summon: false, is_full_auto_quick_summon: false, skill_color_type: 3 }], supporter: { recast: '0', start_recast: '', name: 'ジ・オーダー・グランデ', attribute: '5', level: '', quality: '', detail: '<div class=prt-text-small>敵全体に光属性4倍ダメージ/味方全体に調停の翼効果(特殊強化(攻防UP)/吸収効果)/主人公に蒼穹の刃効果</div>', require: '9', id: '2040065000', image_id: '2040065000_02', skill: 'ラストウィッシュ', comment: '<div class=prt-text-small>敵全体に光属性4倍ダメージ/味方全体に調停の翼効果(特殊強化(攻防UP)/吸収効果)/主人公に蒼穹の刃効果</div>', protection_name: 'ジ・オーダー・グランデの加護', protection: '<div class=prt-text-small>バトルメンバーの得意武器の種類が多いほど攻撃力UP(最大200%)/防御力UP(最大50%)<br>◆バトルメンバーの得意武器が5種以上のときバトル開始時にパーティの奥義ゲージ10%UP/主人公に蒼穹の刃効果</div>', friend: true, evolution_flag: 0, available_skill: true, evolution: '5', special_once_flag: false, skill_color_type: 3 } }, buffInfo: { bossBuffs: [{ status: '1609' }], playerBuffs: [{ status: '3295', is_unusable_harb: true, display_priority: 0 }, { status: '7758', is_unusable_harb: true, display_priority: 0 }, { status: '7743_12', is_unusable_harb: true, display_priority: 0 }] }, mvpInfo: [], normalAttackInfo: { hit: 0, ability: 0, special: 0, total: 0 } }, currentRaid: { quest_id: '990071', raid_id: 1820539884, raid_name: 'オールド・木人', imgId: '4200293', turn: 1, startTimestamp: 1749462581900, startTimer: 5399, endTimer: 5399, player: [{ pid: '310901', is_dead: false, is_npc: false, image_id: '310901_01', use_ability_count: 0, use_special_skill_count: 0, damage: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, ability: { comment: '技能伤害', value: 0 }, special: { comment: '奥义伤害', value: 0 }, other: { comment: '其他', value: 0 } }, damageTaken: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, super: { comment: '特动', value: 0 }, other: { comment: '其他', value: 0 } }, condition: { buff: [{ status: '3295', is_unusable_harb: true, display_priority: 0 }, { status: '7758', is_unusable_harb: true, display_priority: 0 }, { status: '7743_12', is_unusable_harb: true, display_priority: 0 }], coating_value: 0 } }, { pid: '3040544000', is_dead: false, is_npc: true, image_id: '3040544000_01', use_ability_count: 0, use_special_skill_count: 0, damage: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, ability: { comment: '技能伤害', value: 0 }, special: { comment: '奥义伤害', value: 0 }, other: { comment: '其他', value: 0 } }, damageTaken: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, super: { comment: '特动', value: 0 }, other: { comment: '其他', value: 0 } }, condition: { buff: [{ status: '3289', is_unusable_harb: true, display_priority: 0 }], coating_value: 0 } }, { pid: '3040335000', is_dead: false, is_npc: true, image_id: '3040335000_01', use_ability_count: 0, use_special_skill_count: 0, damage: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, ability: { comment: '技能伤害', value: 0 }, special: { comment: '奥义伤害', value: 0 }, other: { comment: '其他', value: 0 } }, damageTaken: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, super: { comment: '特动', value: 0 }, other: { comment: '其他', value: 0 } }, condition: { buff: [], coating_value: 0 } }, { pid: '3040288000', is_dead: false, is_npc: true, image_id: '3040288000_01', use_ability_count: 0, use_special_skill_count: 0, damage: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, ability: { comment: '技能伤害', value: 0 }, special: { comment: '奥义伤害', value: 0 }, other: { comment: '其他', value: 0 } }, damageTaken: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, super: { comment: '特动', value: 0 }, other: { comment: '其他', value: 0 } }, condition: { buff: [], coating_value: 0 } }, { pid: '3040143000', is_dead: false, is_npc: true, image_id: '3040143000_01', use_ability_count: 0, use_special_skill_count: 0, damage: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, ability: { comment: '技能伤害', value: 0 }, special: { comment: '奥义伤害', value: 0 }, other: { comment: '其他', value: 0 } }, damageTaken: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, super: { comment: '特动', value: 0 }, other: { comment: '其他', value: 0 } }, condition: { buff: [], coating_value: 0 } }, { pid: '3040166000', is_dead: false, is_npc: true, image_id: '3040166000_01', use_ability_count: 0, use_special_skill_count: 0, damage: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, ability: { comment: '技能伤害', value: 0 }, special: { comment: '奥义伤害', value: 0 }, other: { comment: '其他', value: 0 } }, damageTaken: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, super: { comment: '特动', value: 0 }, other: { comment: '其他', value: 0 } }, condition: { buff: [], coating_value: 0 } }], formation: [0, 1, 2, 3], special_skill_flag: 1, actionQueue: [{ turn: 1, bossHpPercent: 100, special_skill_flag: 1, acitonList: [], guard_status: [{ num: 0, is_guard_status: 0 }, { num: 1, is_guard_status: 0 }, { num: 2, is_guard_status: 0 }, { num: 3, is_guard_status: 0 }], interrupt_display_text: '' }], reserve: false, abilityList: [{ type: 'ability', icon: '1595_3', id: '201171' }, { type: 'ability', icon: '2078_3', id: '8000' }, { type: 'ability', icon: '2401_3', id: '241081' }, { type: 'ability', icon: '2402_1', id: '241101' }, { type: 'ability', icon: '2403_3', id: '241111' }, { type: 'ability', icon: '1460_3', id: '225941' }, { type: 'ability', icon: '1461_3', id: '225961' }, { type: 'ability', icon: '1462_3', id: '225971' }, { type: 'ability', icon: '60_1', id: '222311' }, { type: 'ability', icon: '1235_3', id: '222331' }, { type: 'ability', icon: '1236_3', id: '222341' }], point: 0 } }

const bossImgSrc = computed(() => getBossImg('enemy', battleInfo.bossInfo!.imgId, 's'))

const operationSecond = computed(() => currentRaid ? currentRaid.startTimer - currentRaid.endTimer : 0)
const remainderSecond = ref<number>(0)
const timerValue = computed(() => Date.now() + battleInfo.bossInfo!.timer * 1000)
function handleTimeChange(millisecond: number) {
  remainderSecond.value = Math.round(millisecond / 1000)
}

const record = { quest_id: '990071', raid_id: 1820619963, raid_name: 'オールド・木人', imgId: '4200293', turn: 2, startTimestamp: 1749475184431, startTimer: 5399, endTimer: 5396, player: [{ pid: '310901', is_dead: false, is_npc: false, image_id: '310901_01', use_ability_count: 0, use_special_skill_count: 0, damage: { total: { comment: '总计', value: 1332023 }, attack: { comment: '通常攻击&反击', value: 1332023 }, ability: { comment: '技能伤害', value: 0 }, special: { comment: '奥义伤害', value: 0 }, other: { comment: '其他', value: 0 } }, damageTaken: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, super: { comment: '特动', value: 0 }, other: { comment: '其他', value: 0 } }, condition: { buff: [], coating_value: 0 }, attackInfo: { total: 1, sa: 0, da: 0, ta: 1 } }, { pid: '3040502000', is_dead: false, is_npc: true, image_id: '3040502000_01', use_ability_count: 0, use_special_skill_count: 0, damage: { total: { comment: '总计', value: 4034462 }, attack: { comment: '通常攻击&反击', value: 4034462 }, ability: { comment: '技能伤害', value: 0 }, special: { comment: '奥义伤害', value: 0 }, other: { comment: '其他', value: 0 } }, damageTaken: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, super: { comment: '特动', value: 0 }, other: { comment: '其他', value: 0 } }, condition: { buff: [], coating_value: 0 }, attackInfo: { total: 1, sa: 0, da: 0, ta: 1 } }, { pid: '3040492000', is_dead: false, is_npc: true, image_id: '3040492000_01', use_ability_count: 0, use_special_skill_count: 0, damage: { total: { comment: '总计', value: 461313 }, attack: { comment: '通常攻击&反击', value: 461313 }, ability: { comment: '技能伤害', value: 0 }, special: { comment: '奥义伤害', value: 0 }, other: { comment: '其他', value: 0 } }, damageTaken: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, super: { comment: '特动', value: 0 }, other: { comment: '其他', value: 0 } }, condition: { buff: [{ status: '77262', personal_buff_user_id: false, personal_status: '77262', personal_buff_end_turn: false, icon_add_turn_flag: '', display_priority: 0 }], coating_value: 0 }, attackInfo: { total: 1, sa: 1, da: 0, ta: 0 } }, { pid: '3040030000', is_dead: false, is_npc: true, image_id: '3040030000_01', use_ability_count: 0, use_special_skill_count: 0, damage: { total: { comment: '总计', value: 1736764 }, attack: { comment: '通常攻击&反击', value: 1736764 }, ability: { comment: '技能伤害', value: 0 }, special: { comment: '奥义伤害', value: 0 }, other: { comment: '其他', value: 0 } }, damageTaken: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, super: { comment: '特动', value: 0 }, other: { comment: '其他', value: 0 } }, condition: { buff: [{ status: '1244_13', personal_buff_user_id: false, personal_status: '1244_13', personal_buff_end_turn: false, icon_add_turn_flag: '', display_priority: 0 }, { status: '1073_1', personal_buff_user_id: false, personal_status: '1073_1', personal_buff_end_turn: false, icon_add_turn_flag: '', display_priority: 0 }], coating_value: 0 }, attackInfo: { total: 1, sa: 0, da: 1, ta: 0 } }, { pid: '3040168000', is_dead: false, is_npc: true, image_id: '3040168000_01', use_ability_count: 0, use_special_skill_count: 0, damage: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, ability: { comment: '技能伤害', value: 0 }, special: { comment: '奥义伤害', value: 0 }, other: { comment: '其他', value: 0 } }, damageTaken: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, super: { comment: '特动', value: 0 }, other: { comment: '其他', value: 0 } }, condition: { buff: [], coating_value: 0 } }, { pid: '3040160000', is_dead: false, is_npc: true, image_id: '3040160000_01', use_ability_count: 0, use_special_skill_count: 0, damage: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, ability: { comment: '技能伤害', value: 0 }, special: { comment: '奥义伤害', value: 0 }, other: { comment: '其他', value: 0 } }, damageTaken: { total: { comment: '总计', value: 0 }, attack: { comment: '通常攻击&反击', value: 0 }, super: { comment: '特动', value: 0 }, other: { comment: '其他', value: 0 } }, condition: { buff: [], coating_value: 0 } }], formation: [0, 1, 2, 3], special_skill_flag: 0, actionQueue: [{ turn: 1, bossHpPercent: 100, special_skill_flag: 0, acitonList: [{ icon: 'attack', id: 'attack', type: 'attack' }], guard_status: [{ num: 0, is_guard_status: 0 }, { num: 1, is_guard_status: 0 }, { num: 2, is_guard_status: 0 }, { num: 3, is_guard_status: 0 }], interrupt_display_text: '', normalAttackInfo: { hit: 18, ability: 0, special: 0, total: 7564562 } }, { turn: 2, bossHpPercent: 100, special_skill_flag: 0, acitonList: [], guard_status: [{ num: 0, is_guard_status: 0 }, { num: 1, is_guard_status: 0 }, { num: 2, is_guard_status: 0 }, { num: 3, is_guard_status: 0 }] }], reserve: false, abilityList: [{ type: 'ability', icon: '2110_3', id: '202721' }, { type: 'ability', icon: '2112_3', id: '8000' }, { type: 'ability', icon: '2113_3', id: '8001' }, { type: 'ability', icon: '2248_1', id: '238991' }, { type: 'ability', icon: '2249_3', id: '239011' }, { type: 'ability', icon: '2250_3', id: '239021' }, { type: 'ability', icon: '2192_1', id: '237891' }, { type: 'ability', icon: '2193_3', id: '237921' }, { type: 'ability', icon: '2194_1', id: '237901' }, { type: 'ability', icon: '389_1', id: '243511' }, { type: 'ability', icon: '1454_3', id: '243521' }, { type: 'ability', icon: '1455_3', id: '243531' }, { type: 'ability', icon: '360_3', id: '243541' }], point: 0, damage: '7,564,562' }
</script>

<template>
  <div flex flex-wrap gap-3 p-10>
    <Contact absolute right-15px top-15px />
    <div>
      <img w-60px src="https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/quest/assets/lobby/303141.png" alt="" srcset="">
      <TheButton @click="visible = true">
        ceshi
      </TheButton>
    </div>

    <div h-320px w-360px flex rounded-xl>
      <el-scrollbar flex-1 ring-1>
        <div p-10px>
          <el-descriptions direction="vertical" :border="true" size="small" :column="2">
            <el-descriptions-item :rowspan="2" :width="70" :label="`TURN ${battleInfo.bossInfo.turn}`" align="center">
              <div fc flex-col>
                <img :src="bossImgSrc">
                <div>{{ `${battleInfo.bossInfo.hpPercent}%` }}</div>
              </div>
            </el-descriptions-item>
            <el-descriptions-item align="center">
              <template #label>
                <div v-if="battleInfo.bossInfo.hp === 0">
                  {{ formatTime(remainderSecond) }}
                </div>
                <ElCountdown v-else value-style="font-size: 15px" :value="timerValue" @change="handleTimeChange" />
              </template>
              {{ battleInfo.bossInfo.name }}
            </el-descriptions-item>
            <el-descriptions-item align="center">
              <template #label>
                {{ `${battleInfo.bossInfo.hp.toLocaleString()}/${battleInfo.bossInfo.hpmax.toLocaleString()}` }}
              </template>
              <div flex justify-between :style="{ 'justify-content': currentRaid.point ? 'space-between' : 'center' }">
                <el-tag v-if="currentRaid.point" type="success" effect="light">
                  {{ Math.floor(currentRaid.point).toLocaleString() }}
                </el-tag>
                <el-tag type="danger">
                  {{ Math.floor(currentRaid.point).toLocaleString() }}
                </el-tag>
              </div>
            </el-descriptions-item>

            <el-descriptions-item :label="battleInfo.bossInfo.interrupt_display_text" :span="2">
              123
            </el-descriptions-item>
          </el-descriptions>
          <BattleAnalysis :battle-record="record" />
        </div>
      </el-scrollbar>
      <!-- <div flex-1 bg-rose>

      </div> -->
      <div class="bg-#3C3C3C" w-40px flex shrink-0 flex-col justify-between p-5px>
        <div flex flex-col items-center gap-10px>
          <el-tooltip v-for="view in upViewList" :key="view.key" effect="dark" :content="view.lable" placement="left">
            <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 :class="{ 'bg-neutral-8!': view.key === currentView }" @click="currentView = view.key">
              <Icon :icon="view.icon" text-20px />
            </div>
          </el-tooltip>
        </div>
        <div flex flex-col items-center gap-10px>
          <el-tooltip v-for="view in downViewList" :key="view.key" effect="dark" :content="view.lable" placement="left">
            <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 :class="{ 'bg-neutral-8!': view.key === currentView }" @click="currentView = view.key">
              <Icon :icon="view.icon" text-20px />
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
