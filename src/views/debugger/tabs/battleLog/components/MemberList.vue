<script setup lang="ts">
import type { MemberInfo } from 'battleLog'

const props = defineProps<{
  userId?: string
  memberInfo?: MemberInfo[]
  mvpInfo?: {
    userId: string
    rank: number
    point: number
  }[]
}>()
function goProfilePage(userId: string) {
  window.open(`https://game.granbluefantasy.jp/#profile/${userId}`)
}

const data = computed(() =>
  props.memberInfo?.reduce<MemberInfo[]>((pre, cur) => {
    const hit = props.mvpInfo?.find(m => m.userId === cur.userId)
    pre.push({ ...cur, ...hit })
    return pre
  }, []).sort((a, b) => Number(a.rank) - Number(b.rank)),
)
</script>

<template>
  <ElCard v-if="data" :body-style="{ padding: '15px' }">
    <div flex flex-wrap gap-20px text-base>
      <div
        v-for="member, idx in data" :key="idx"
        :class="{ me: member.userId === userId, host: member.is_host }"
        relative h-65px w-160px flex cursor-pointer select-none items-center rounded-md bg-gray-2 transition-all hover:scale-105 dark:bg-gray-7
        @click="goProfilePage(member.userId)"
      >
        <div v-if="member.is_dead" class="absolute h-full w-full fc bg-black/40">
          <span font-bold text-red>Dead</span>
        </div>
        <div ml-30px flex flex-col justify-center text-start font-medium>
          <span w-100px overflow-hidden text-ellipsis whitespace-nowrap>
            {{ member.nickname }}
          </span>
          <span>
            {{ member.point?.toLocaleString() }}
          </span>
        </div>

        <ElTag effect="dark" size="small" :type="member.userRank === '350' ? 'warning' : 'info'" absolute right--1px top--10px>
          {{ `Lv${member.userRank}` }}
        </ElTag>
        <ElTag v-if="member.rank" effect="dark" size="small" type="danger" absolute left--15px my-auto>
          {{ `#${member.rank}` }}
        </ElTag>
        <img :src="member.jobIcon" absolute left-5px top--12px h-24px>
        <div :class="member.attributeClass" scale-150 />
      </div>
    </div>
  </ElCard>
</template>

<style  scoped>
.me {
  box-shadow: 0 0 3px 3px rgba(255, 0, 0, 0.8);
}

.host {
  box-shadow: 0 0 3px 3px rgba(77, 230, 97, 0.8);
}
</style>
