<script setup lang="ts">
import type { BattleRecord } from 'myStorage'

// 天元六龙
const props = defineProps<{ battleRecord: BattleRecord }>()

// 奥义或技能每造成5kw伤害下一回合就会触发特动
const limit = ref(50000000)

const specialDamageTotal = computed(() =>
  props.battleRecord.player.reduce((pre, cur) => {
    pre += cur.damage.special.value
    return pre
  }, 0),
)

const abilityDamageTotal = computed(() =>
  props.battleRecord.player.reduce((pre, cur) => {
    pre += cur.damage.ability.value
    return pre
  }, 0))
</script>

<template>
  <ElCard w-full>
    <ElCard w-250px fc>
      <div mb-10px w-200px>
        <div mx-5px mb-10px flex items-center justify-between>
          <div>
            奥伤
          </div>
          <div text-base>
            {{ `${(limit - specialDamageTotal % limit).toLocaleString()}` }}
          </div>
        </div>
        <ElProgress :percentage=" specialDamageTotal % limit / limit * 100 " color="#e6a23c" text-inside>
          <div />
        </ElProgress>
      </div>
      <div w-200px>
        <div mx-5px mb-10px flex items-center justify-between>
          <div>
            技伤
          </div>
          <div text-base>
            {{ `${(limit - abilityDamageTotal % limit).toLocaleString()}` }}
          </div>
        </div>
        <ElProgress :percentage="abilityDamageTotal % limit / limit * 100" color="#e6a23c" text-inside>
          <div />
        </ElProgress>
      </div>
    </ElCard>
  </ElCard>
</template>
