<script setup lang="ts">
import { gachaRecord } from '~/logic'

const { height } = useWindowSize()
const resultFilter = reactive({
  type: ['weapon', 'summon'],
})

const summary = computed(() =>
  gachaRecord.value.reduce<{ count: number, ssrNum: number }>((pre, cur) => {
    pre.count += cur.count
    pre.ssrNum += cur.ssrList.length
    return pre
  }, { count: 0, ssrNum: 0 }),
)
</script>

<template>
  <ElCard w-740px>
    <div mb-15px flex items-center justify-between>
      <div>
        <ElCheckboxGroup v-model="resultFilter.type">
          <ElCheckboxButton label="weapon">
            Weapon
          </ElCheckboxButton>
          <ElCheckboxButton label="summon">
            Summon
          </ElCheckboxButton>
        </ElCheckboxGroup>
      </div>
      <ElTag v-if="summary.count" effect="dark" size="large" round>
        {{ `Total Pulls: ${summary.count} (${summary.ssrNum} SSR) SSR Rate: ${(summary.ssrNum / summary.count * 100).toFixed(1)}%` }}
      </ElTag>
      <ElTag v-else type="info" effect="dark" size="large" round>
        No gacha data yet
      </ElTag>
    </div>
    <ElScrollbar :max-height="height - 100">
      <div v-for="data in gachaRecord" :key="data.random_key" mb-15px>
        <ElCard>
          <template #header>
            <div flex items-center justify-between>
              <div>
                <img w-200px :src="getGachaBanner(data.random_key)">
              </div>
              <div flex flex-col items-end justify-center gap-10px>
                <div>{{ `${data.service_start} - ${data.service_end}` }}</div>
                <div>{{ `Pulled: ${data.count} (${data.ssrList.length} SSR) SSR Rate: ${(data.ssrList.length / data.count * 100).toFixed(1)}%` }}</div>
              </div>
            </div>
          </template>
          <div flex flex-wrap gap-10px>
            <div
              v-for="item, idx in data.ssrList.filter(ssr => resultFilter.type.includes(ssr.type))"
              :key="idx" relative w-100px
            >
              <img :src="getAssetImg(item.type, item.id)">
              <ElTag v-if="item.is_new" absolute right--8px top--8px type="warning" size="small">
                NEW
              </ElTag>
            </div>
            <div w-full fc>
              <ElTag v-if="data.ssrList.length === 0" type="info" effect="dark" round>
                No SSR pulled
              </ElTag>
            </div>
          </div>
        </ElCard>
      </div>
    </ElScrollbar>
  </ElCard>
</template>
