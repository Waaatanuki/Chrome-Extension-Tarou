<script setup lang="ts">
import type { BattleRecord } from 'myStorage'

const props = defineProps<{ battleRecord: BattleRecord }>()

const damageTakenType = ref<'total' | 'attack' | 'super' | 'other'>('total')

const hasDamageTaken = computed(() => props.battleRecord.player.every(p => p.damageTaken))

const damageTakenTypeOptions = ref([
  { value: 'total', label: '总计' },
  { value: 'attack', label: '通常攻击&反击' },
  { value: 'super', label: '特动' },
  { value: 'other', label: '其他' },
])

const maxDamageTaken = computed(() =>
  props.battleRecord.player.reduce((pre, cur) => pre > cur.damageTaken[damageTakenType.value].value ? pre : cur.damageTaken[damageTakenType.value].value, 1),
)

const totalDamageTaken = computed(() =>
  props.battleRecord.player.reduce((pre, cur) => {
    pre += cur.damageTaken[damageTakenType.value].value
    return pre
  }, 0),
)
</script>

<template>
  <div h-500px>
    <div h-60px w-full fc>
      <ElSelect v-model="damageTakenType" style="width:150px">
        <ElOption
          v-for="item in damageTakenTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </div>

    <div v-if="hasDamageTaken" flex flex-col items-start justify-center gap-10px>
      <div v-for="player in battleRecord.player" :key="player.pid" fc gap-10px>
        <div relative w-100px>
          <div v-if="player.is_dead" class="absolute h-full w-full fc bg-black/40">
            <span text-base text-red font-bold>Dead</span>
          </div>
          <img w-full :src="getAssetImg(player.is_npc ? 'npc' : 'leader', player.image_id)">
        </div>
        <div fc flex-col gap-5px>
          <div relative w-60px>
            <img w-full :src="getLocalImg('ability-count-bg')">
            <div absolute inset-y-0 right-7px fc text-sm>
              {{ player.use_ability_count }}
            </div>
          </div>
          <div relative w-60px>
            <img w-full :src="getLocalImg('special-count-bg')">
            <div absolute inset-y-0 right-7px fc text-sm>
              {{ player.use_special_skill_count }}
            </div>
          </div>
        </div>
        <div w-200px>
          <ElProgress :percentage=" player.damageTaken[damageTakenType].value / maxDamageTaken * 100" color="#be123c" text-inside>
            <div />
          </ElProgress>
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
</template>
