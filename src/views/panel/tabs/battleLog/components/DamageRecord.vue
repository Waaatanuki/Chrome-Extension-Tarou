<script setup lang="ts">
import type { BattleRecord, Player } from 'myStorage'

const props = defineProps<{ battleRecord: BattleRecord }>()

const tabName = ref('damage')
const damageType = ref<'total' | 'attack' | 'ability' | 'special' | 'other'>('total')
const damageTakenType = ref<'total' | 'attack' | 'super' | 'other'>('total')

const hasDamageTaken = computed(() => props.battleRecord.player.every(p => p.damageTaken))

const damageTypeOptions = ref([
  { value: 'total', label: '总计' },
  { value: 'attack', label: '通常攻击&反击' },
  { value: 'ability', label: '技能伤害' },
  { value: 'special', label: '奥义伤害' },
  { value: 'other', label: '其他' },
])

const damageTakenTypeOptions = ref([
  { value: 'total', label: '总计' },
  { value: 'attack', label: '通常攻击&反击' },
  { value: 'super', label: '特动' },
  { value: 'other', label: '其他' },
])

const maxDamage = computed(() =>
  props.battleRecord.player.reduce((pre, cur) =>
    pre > cur.damage[damageType.value].value ? pre : cur.damage[damageType.value].value
  , 1),
)

const totalDamage = computed(() =>
  props.battleRecord.player.reduce((pre, cur) => {
    pre += cur.damage[damageType.value].value
    return pre
  }, 0),
)

const maxDamageTaken = computed(() =>
  props.battleRecord.player.reduce((pre, cur) =>
    pre > cur.damageTaken[damageTakenType.value].value ? pre : cur.damageTaken[damageTakenType.value].value
  , 1),
)

const totalDamageTaken = computed(() =>
  props.battleRecord.player.reduce((pre, cur) => {
    pre += cur.damageTaken[damageTakenType.value].value
    return pre
  }, 0),
)

function getImg(player: Player) {
  return `https://prd-game-a-granbluefantasy.akamaized.net/assets/img/sp/assets/${player.is_npc ? 'npc' : 'leader'}/m/${player.image_id}.jpg`
}

function getRengeki(type: 'sa' | 'da' | 'ta', info: { total: number; sa: number; da: number; ta: number }) {
  return `${Math.floor(info[type] / info.total * 100)}%`
}
</script>

<template>
  <el-card v-if="battleRecord" w-420px shrink-0>
    <el-tabs v-model="tabName" stretch>
      <el-tab-pane label="伤害统计" name="damage">
        <div h-500px>
          <div fc pb-20px pt-5px>
            <el-select v-model="damageType" w-150px>
              <el-option
                v-for="item in damageTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div fc flex-col gap-10px>
            <div v-for="player in battleRecord.player" :key="player.pid" fc gap-10px>
              <div relative w-100px>
                <div v-if="player.is_dead" class="absolute h-full w-full fc bg-black/40">
                  <span text-base font-bold text-red>Dead</span>
                </div>
                <img w-full :src="getImg(player)">
              </div>
              <div fc flex-col gap-5px>
                <div relative w-60px>
                  <img w-full :src="getLocalImg('ability-count-bg')">
                  <div absolute bottom-0 right-7px top-0 fc text-sm>
                    {{ player.use_ability_count }}
                  </div>
                </div>
                <div relative w-60px>
                  <img w-full :src="getLocalImg('special-count-bg')">
                  <div absolute bottom-0 right-7px top-0 fc text-sm>
                    {{ player.use_special_skill_count }}
                  </div>
                </div>
              </div>
              <div w-200px>
                <el-progress :percentage=" player.damage[damageType].value / maxDamage * 100" color="#e6a23c" text-inside>
                  <div />
                </el-progress>
                <div mx-5px mt-10px flex items-center justify-between>
                  <div>
                    <el-tooltip
                      v-if="player.attackInfo"
                      :content="`总次数: ${player.attackInfo.total} TA: ${getRengeki('ta', player.attackInfo)} DA: ${getRengeki('da', player.attackInfo)}  SA: ${getRengeki('sa', player.attackInfo)}`"
                      placement="top" effect="dark"
                    >
                      <div text-xs>
                        {{ `TA: ${getRengeki('ta', player.attackInfo)}` }}
                      </div>
                    </el-tooltip>
                  </div>
                  <div text-base>
                    {{ player.damage[damageType].value.toLocaleString() }}
                  </div>
                </div>
              </div>
            </div>
            <div mr-5px mt-10px w-full text-end text-xl>
              合计： {{ totalDamage.toLocaleString() }}
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="承伤统计" name="damageTaken">
        <div h-500px>
          <div fc pb-20px pt-5px>
            <el-select v-model="damageTakenType" w-150px>
              <el-option
                v-for="item in damageTakenTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>

          <div v-if="hasDamageTaken" fc flex-col gap-10px>
            <div v-for="player in battleRecord.player" :key="player.pid" fc gap-10px>
              <div relative w-100px>
                <div v-if="player.is_dead" class="absolute h-full w-full fc bg-black/40">
                  <span text-base font-bold text-red>Dead</span>
                </div>
                <img w-full :src="getImg(player)">
              </div>
              <div fc flex-col gap-5px>
                <div relative w-60px>
                  <img w-full :src="getLocalImg('ability-count-bg')">
                  <div absolute bottom-0 right-7px top-0 fc text-sm>
                    {{ player.use_ability_count }}
                  </div>
                </div>
                <div relative w-60px>
                  <img w-full :src="getLocalImg('special-count-bg')">
                  <div absolute bottom-0 right-7px top-0 fc text-sm>
                    {{ player.use_special_skill_count }}
                  </div>
                </div>
              </div>
              <div w-200px>
                <el-progress :percentage=" player.damageTaken[damageTakenType].value / maxDamageTaken * 100" color="#be123c" text-inside>
                  <div />
                </el-progress>
                <div mx-5px mt-10px flex items-center justify-between>
                  <div />
                  <div text-base>
                    {{ player.damageTaken[damageTakenType].value.toLocaleString() }}
                  </div>
                </div>
              </div>
            </div>
            <div mr-5px mt-10px w-full text-end text-xl>
              合计： {{ totalDamageTaken.toLocaleString() }}
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
