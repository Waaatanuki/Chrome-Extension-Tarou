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
      relative w-40 h-15 m-1 flex items-center
      border="1 black solid"
      rounded-md bg-slate cursor-pointer select-none hover:scale-105 transition-all
      @click="goProfilePage(member.userId)"
    >
      <div v-if="member.is_dead" class="absolute w-full h-full bg-black/40 fc">
        <span text-red text-base font-bold>Dead</span>
      </div>
      <img :src="member.jobIcon" mx-1 h-10>
      <div flex flex-col justify-center>
        <span text-start text-base font-500 whitespace-nowrap text-ellipsis overflow-hidden w-25>
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
