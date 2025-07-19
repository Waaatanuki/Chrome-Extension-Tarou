<script setup lang="ts">
import type { MemberInfo } from 'battleLog'
import { battleInfo, markedUserList, userInfo } from '~/logic'

const props = defineProps<{
  memberInfo?: MemberInfo[]
  mvpInfo?: {
    userId: string
    rank: number
    point: number
  }[]
}>()

const MAX_RANK = '400'
const targetStamp = ['stamp44.png', 'stamp191.png']

const stampList = computed(() => {
  return battleInfo.value.chatList?.filter(c => c.isStamp && targetStamp.includes(c.content))
    .reduce<{ userId: string, timestamp: number, nickname: string, isStamp: boolean, content: string }[]>((pre, cur) => {
      if (pre.some(s => s.userId === cur.userId) || !cur.userId)
        pre = []

      pre.push(cur)
      return pre
    }, []) || []
})

const data = computed(() =>
  props.memberInfo?.reduce<MemberInfo[]>((pre, cur) => {
    const hit = props.mvpInfo?.find(m => m.userId === cur.userId)
    const info = hit ? { rank: hit.rank, point: hit.point } : { rank: 999 }
    const stamp = stampList.value.find(s => s.userId === cur.userId)
    pre.push({ ...cur, ...info, stamp: stamp?.content })
    return pre
  }, []).sort((a, b) => Number(a.rank) - Number(b.rank)),
)

function clearStamp() {
  battleInfo.value.chatList!.push({
    isStamp: true,
    content: 'stamp44.png',
    userId: '',
    timestamp: 0,
    nickname: '',
  })
}

function handleMark(member: MemberInfo) {
  const hit = markedUserList.value.find(user => user.id === member.userId)
  if (hit) {
    hit.name = member.nickname
    hit.rank = member.userRank
    ElMessage.info('该玩家已标记，更新玩家昵称与等级')
  }
  else {
    markedUserList.value.unshift({
      name: member.nickname,
      id: member.userId,
      rank: member.userRank,
      rate: 0,
      comment: `标记于${useDateFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss').value}`,
    })
    ElMessage.success('成功标记该玩家')
  }
}
</script>

<template>
  <div v-if="data" mt-10px flex flex-wrap gap-20px text-12px>
    <el-tooltip v-for="member, idx in data" :key="idx" placement="top">
      <template #content>
        <div mb-10px w-100px>
          {{ markedUserList.find(user => user.id === member.userId)?.comment }}
        </div>
        <div flex items-center justify-end gap-10px text-xl>
          <div i-carbon:identification icon-btn @click="goProfilePage(member.userId)" />
          <div i-carbon:bookmark-add icon-btn @click="handleMark(member)" />
        </div>
      </template>
      <div
        :class="{ myself: member.userId === userInfo.uid, host: member.is_host }"
        relative mb-10px h-65px w-140px flex cursor-pointer select-none items-center rounded-md bg-neutral-7 transition-all
      >
        <div v-if="member.is_dead" class="absolute h-full w-full fc bg-black/40">
          <span text-red font-bold>Dead</span>
        </div>
        <div ml-35px flex flex-col justify-center text-start font-medium>
          <span w-100px overflow-hidden text-ellipsis whitespace-nowrap>
            {{ member.nickname }}
          </span>
          <span>
            {{ member.point ? Math.floor(member.point).toLocaleString() : '' }}
          </span>
        </div>

        <ElTag effect="dark" size="small" :type="member.userRank === MAX_RANK ? 'warning' : 'info'" absolute left-5px top--10px>
          {{ `Lv${member.userRank}` }}
        </ElTag>
        <ElTag v-if="member.rank && member.rank !== 999" effect="dark" size="small" type="danger" absolute left--8px my-auto>
          {{ `#${member.rank}` }}
        </ElTag>
        <img :src="member.jobIcon" absolute bottom--10px left-5px h-24px>
        <img v-if="member.stamp" :src="getStamp(member.stamp)" absolute right-5px top--15px h-30px @click="clearStamp">
        <div :class="member.attributeClass" scale-150 />
        <div v-if="markedUserList.some(user => user.id === member.userId)" i-carbon:bookmark-filled absolute bottom--10px right-25px text-orange />
      </div>
    </el-tooltip>
  </div>
</template>

<style  scoped>
.myself {
  box-shadow: 0 0 3px 3px #dc2626;
}

.host {
  box-shadow: 0 0 3px 3px #059669;
}
</style>
