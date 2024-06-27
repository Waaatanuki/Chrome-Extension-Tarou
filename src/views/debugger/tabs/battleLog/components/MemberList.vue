<script setup lang="ts">
import type { MemberInfo } from 'battleLog'
import { markedUserList, uid } from '~/logic'

const props = defineProps<{
  memberInfo?: MemberInfo[]
  mvpInfo?: {
    userId: string
    rank: number
    point: number
  }[]
}>()

const maxRank = '375'

function goProfilePage(userId: string) {
  window.open(`https://game.granbluefantasy.jp/#profile/${userId}`)
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

const data = computed(() =>
  props.memberInfo?.reduce<MemberInfo[]>((pre, cur) => {
    const hit = props.mvpInfo?.find(m => m.userId === cur.userId)
    const info = hit ? { rank: hit.rank, point: hit.point } : { rank: 999 }
    pre.push({ ...cur, ...info })
    return pre
  }, []).sort((a, b) => Number(a.rank) - Number(b.rank)),
)
</script>

<template>
  <ElCard v-if="data" :body-style="{ padding: '20px' }">
    <div flex flex-wrap gap-25px text-base>
      <el-popover
        v-for="member, idx in data" :key="idx"
        placement="top" :width="150" trigger="hover" effect="dark"
      >
        <template #reference>
          <div
            :class="{ myself: member.userId === uid, host: member.is_host }"
            relative h-65px w-160px flex cursor-pointer select-none items-center rounded-md bg-gray-2 transition-all dark:bg-gray-7
          >
            <div v-if="member.is_dead" class="absolute h-full w-full fc bg-black/40">
              <span text-red font-bold>Dead</span>
            </div>
            <div ml-30px flex flex-col justify-center text-start font-medium>
              <span w-100px overflow-hidden text-ellipsis whitespace-nowrap>
                {{ member.nickname }}
              </span>
              <span>
                {{ member.point ? Math.floor(member.point).toLocaleString() : '' }}
              </span>
            </div>

            <ElTag effect="dark" size="small" :type="member.userRank === maxRank ? 'warning' : 'info'" absolute right--1px top--10px>
              {{ `Lv${member.userRank}` }}
            </ElTag>
            <ElTag v-if="member.rank && member.rank !== 999" effect="dark" size="small" type="danger" absolute left--15px my-auto>
              {{ `#${member.rank}` }}
            </ElTag>
            <img :src="member.jobIcon" absolute left-5px top--12px h-24px>
            <div :class="member.attributeClass" scale-150 />
            <div v-if="markedUserList.some(user => user.id === member.userId)" i-carbon:bookmark-filled absolute bottom--10px right-25px text-orange />
          </div>
        </template>
        <div mb-10px>
          {{ markedUserList.find(user => user.id === member.userId)?.comment }}
        </div>
        <div flex items-center justify-end gap-10px text-xl>
          <div i-carbon:identification icon-btn @click="goProfilePage(member.userId)" />
          <div i-carbon:bookmark-add icon-btn @click="handleMark(member)" />
        </div>
      </el-popover>
    </div>
  </ElCard>
</template>

<style  scoped>
.myself {
  box-shadow: 0 0 3px 3px #dc2626;
}

.host {
  box-shadow: 0 0 3px 3px #059669;
}
</style>
