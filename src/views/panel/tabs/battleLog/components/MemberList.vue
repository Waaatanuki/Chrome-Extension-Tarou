<script setup lang="ts">
defineProps(['data'])
function goProfilePage(userId: string) {
  window.open(`https://game.granbluefantasy.jp/#profile/${userId}`)
}
</script>

<template>
  <div class="member-list" border="2 black solid" flex flex-wrap>
    <div
      v-for="member, idx in data"
      :key="idx"
      border="1 black solid"
      relative m-1 h-15 w-40 flex cursor-pointer select-none items-center rounded-md bg-slate transition-all hover:scale-105
      @click="goProfilePage(member.userId)"
    >
      <div v-if="member.is_dead" class="absolute h-full w-full fc bg-black/40">
        <span text-base font-bold text-red>Dead</span>
      </div>
      <img :src="member.jobIcon" mx-1 h-10>
      <div flex flex-col justify-center>
        <span w-25 overflow-hidden text-ellipsis whitespace-nowrap text-start text-base font-500>
          {{ member.nickname }}
        </span>
        <span text-start text-base font-500>
          {{ member.userRank }}
        </span>
      </div>
      <div :class="member.attributeClass" scale-150 />
    </div>
  </div>
</template>
