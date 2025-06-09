<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'
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
const deck = { priority: '23', weapons: [{ seriesId: 3, masterId: 1040415000, imageId: '1040415000_02', level: '230', arousalForm: 0, skill: [{ type: 'skill1', description: '<span class=text-small>水属性キャラの攻撃力と最大HPが上昇(大)/与ダメージUP(大)</span>', image: 'skill_atk_hp_rise_2_3' }, { type: 'skill2', description: 'アビリティのダメージ上限上昇/アビリティ命中確率上昇', image: 'skill_ability_limit_2' }, { type: 'skill3', description: '自属性追撃効果/奥義ゲージ上昇量大幅DOWN', image: 'skill_job_weapon' }], isMain: true }, { seriesId: 29, masterId: 1040215100, imageId: '1040215100', level: '150', arousalForm: 0, skill: [{ type: 'skill1', description: '水属性キャラのクリティカル確率上昇(特大)', image: 'skill_tec_2_4' }, { type: 'skill2', description: '水属性キャラがクリティカル発動時に与ダメージ上昇', image: 'skill_job_weapon' }], isMain: false }, { seriesId: 29, masterId: 1040215100, imageId: '1040215100', level: '150', arousalForm: 0, skill: [{ type: 'skill1', description: '水属性キャラのクリティカル確率上昇(特大)', image: 'skill_tec_2_4' }, { type: 'skill2', description: '水属性キャラがクリティカル発動時に与ダメージ上昇', image: 'skill_job_weapon' }], isMain: false }, { seriesId: 5, masterId: 1040606000, imageId: '1040606000', level: '150', arousalForm: 0, skill: [{ type: 'skill1', description: '<span class=text-small>水属性キャラの攻撃力上昇(大)/水属性キャラの最大HP-10%</span>', image: 'skill_tyrant_2' }, { type: 'skill2', description: '水属性キャラのクリティカル確率上昇(中)', image: 'skill_tec_2_2' }], isMain: false }, { seriesId: 0, masterId: 1040705000, imageId: '1040705000', level: '150', arousalForm: 0, skill: [{ type: 'skill1', description: '水属性キャラのHPが多いほど攻撃力が上昇(大)', image: 'skill_whole_2_3' }, { type: 'skill2', description: '水属性キャラの最大HP上昇(小)', image: 'skill_hp_2_1' }], isMain: false }, { seriesId: 0, masterId: 1040705000, imageId: '1040705000', level: '150', arousalForm: 0, skill: [{ type: 'skill1', description: '水属性キャラのHPが多いほど攻撃力が上昇(大)', image: 'skill_whole_2_3' }, { type: 'skill2', description: '水属性キャラの最大HP上昇(小)', image: 'skill_hp_2_1' }], isMain: false }, { seriesId: 2, masterId: 1040708700, imageId: '1040708700', level: '150', arousalForm: 4, skill: [{ type: 'skill1', description: '<span class=text-small>水属性キャラの攻撃力上昇(大)/クリティカル確率上昇(大)</span>', image: 'skill_moment_2_3' }, { type: 'skill2', description: '水属性キャラの攻撃力上昇(小)', image: 'skill_atk_2_1' }], isMain: false }, { seriesId: 6, masterId: 1040306800, imageId: '1040306800', level: '200', arousalForm: 0, skill: [{ type: 'skill1', description: '水属性キャラの攻撃力上昇(大)', image: 'skill_atk_2_3_2' }, { type: 'skill2', description: '水属性キャラのダメージ上限上昇', image: 'skill_job_weapon' }], isMain: false }, { seriesId: 26, masterId: 1040019700, imageId: '1040019700', level: '200', arousalForm: 0, skill: [{ type: 'skill1', description: '水属性キャラの攻撃力上昇(極大)', image: 'skill_atk_a_2_5' }, { type: 'skill2', description: '水属性キャラが弱体効果が5個以上付与された敵に対して通常攻撃ダメージ上限UP', image: 'skill_job_weapon' }], isMain: false }, { seriesId: 13, masterId: 1040209000, imageId: '1040209000', level: '200', arousalForm: 0, skill: [{ type: 'skill1', description: '得意武器が「槍」のキャラの攻撃力とHP上昇(大)/HPが多いほど攻撃力が上昇(大)', image: 'skill_weapon_whole_3' }, { type: 'skill2', description: '通常攻撃のダメージ上限上昇', image: 'skill_normal_limit' }, { type: 'skill3', description: '有利な属性の敵に対して与ダメージUP', image: 'skill_job_weapon' }], isMain: false }, { seriesId: 0, masterId: 0, imageId: '', level: '', arousalForm: 0, skill: [], isMain: false }, { seriesId: 0, masterId: 0, imageId: '', level: '', arousalForm: 0, skill: [], isMain: false }, { seriesId: 0, masterId: 0, imageId: '', level: '', arousalForm: 0, skill: [], isMain: false }], summons: [{ paramId: 914607048, masterId: 2040100000, rarity: 4, imageId: '2040100000_02', isMain: true, isQuick: false }, { paramId: 1050886434, masterId: 2040347000, rarity: 4, imageId: '2040347000', isMain: false, isQuick: false }, { paramId: 1086724451, masterId: 2040313000, rarity: 4, imageId: '2040313000', isMain: false, isQuick: false }, { paramId: 1196916969, masterId: 2040408000, rarity: 4, imageId: '2040408000', isMain: false, isQuick: false }, { paramId: 981545188, masterId: 2040320000, rarity: 4, imageId: '2040320000', isMain: false, isQuick: true }, { paramId: 1164501285, masterId: 2040311000, rarity: 4, imageId: '2040311000', isMain: false, isQuick: false }, { paramId: 1280654937, masterId: 2040413000, rarity: 4, imageId: '2040413000', isMain: false, isQuick: false }], leader: { masterId: '130401', imageId: '130401_wa_1_01', familiarId: 8, normalDamage: 294312, advantageDamage: 851047, ability: [{ jobParamId: 25112365, actionId: '201841', iconId: '1921_1', name: 'エーテルサクション', iconType: '1', fa: false }, { jobParamId: 0, name: 'ミゼラブルミスト', actionId: '1600', iconId: '44_4', iconType: '4', fa: true }, { jobParamId: 0, name: 'シークレットトライアド', actionId: '201861', iconId: '', iconType: '', fa: false }, { jobParamId: 0, name: 'オーバートランス', actionId: '201871', iconId: '', iconType: '', fa: false }] }, npcs: [{ paramId: 215903047, masterId: 3040479000, imageId: '3040479000_01', isAugment: false, arousalForm: 0, ability: [] }, { paramId: 188580324, masterId: 3040348000, imageId: 'skin/3710202000_01_s2', isAugment: false, arousalForm: 0, ability: [] }, { paramId: 218006177, masterId: 3040492000, imageId: '3040492000_01', isAugment: false, arousalForm: 0, ability: [] }, { paramId: 169760388, masterId: 3040168000, imageId: 'skin/3710178000_01_s2', isAugment: false, arousalForm: 0, ability: [] }, { paramId: 162738880, masterId: 3040283000, imageId: '3040283000_02', isAugment: false, arousalForm: 0, ability: [] }], effects: [{ iconImg: '01_icon_might_01.png', isMax: false, value: '423％' }, { iconImg: '01_icon_might_03.png', isMax: false, value: '37％' }, { iconImg: '01_icon_stamina_01.png', isMax: false, value: '138％' }, { iconImg: '01_icon_critical.png', isMax: true, value: '100％' }, { iconImg: '03_icon_hp.png', isMax: false, value: '230％' }, { iconImg: '03_icon_hp_cut.png', isMax: false, value: '10％' }, { iconImg: '04_icon_na_dmg_cap.png', isMax: false, value: '10％' }, { iconImg: '04_icon_skill_dmg_cap.png', isMax: false, value: '50％' }, { iconImg: '04_icon_dmg_cap.png', isMax: false, value: '10％' }, { iconImg: '04_icon_dmg_supp.png', isMax: true, value: '＋100000' }, { iconImg: '04_icon_elem_amplify.png', isMax: false, value: '25％' }, { iconImg: '04_icon_amplify.png', isMax: false, value: '8.05％' }, { iconImg: '04_icon_ca_gage.png', isMax: false, value: '-100％' }, { iconImg: '06_icon_critical_dmg.png', isMax: false, value: '7.95％' }, { iconImg: '05_icon_atk.png', isMax: false, value: '1.5％' }, { iconImg: '05_icon_stamina.png', isMax: false, value: '9％' }, { iconImg: '05_icon_hp.png', isMax: false, value: '12％' }, { iconImg: '05_icon_skill_dmg_cap.png', isMax: false, value: '2％' }] }
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
          <Npc :leader="deck.leader" :npcs="deck.npcs" />
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
