<script setup lang="ts">
defineProps(['data'])
function goProfilePage(userId: string) {
  window.open(`https://game.granbluefantasy.jp/#profile/${userId}`)
}
</script>

<template>
  <ElCard :body-style="{ padding: '10px' }">
    <div flex flex-wrap gap-5px text-base>
      <div
        v-for="member, idx in data" :key="idx"
        border="1 black solid"
        relative h-60px w-160px flex cursor-pointer select-none items-center rounded-md bg-slate-3 transition-all hover:scale-105 dark:bg-slate-5
        @click="goProfilePage(member.userId)"
      >
        <div v-if="member.is_dead" class="absolute h-full w-full fc bg-black/40">
          <span font-bold text-red>Dead</span>
        </div>
        <img :src="member.jobIcon" mx-5px h-40px>
        <div flex flex-col justify-center text-start font-medium>
          <span w-100px overflow-hidden text-ellipsis whitespace-nowrap>
            {{ member.nickname }}
          </span>
          <span>
            {{ member.userRank }}
          </span>
        </div>
        <div :class="member.attributeClass" scale-150 />
      </div>
    </div>
  </ElCard>
</template>
