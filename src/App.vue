<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'

const visible = ref(false)
const currentView = ref('Dashborad')

const upViewList = [
  { key: 'Dashborad', lable: '基础信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落信息', icon: 'material-symbols:bookmark-star-sharp' },
]
const downViewList = [
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]

const foo = {
  memberInfo: [
    {
      nickname: '高宮',
      userId: '18857488',
      userRank: '366',
      jobIcon: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/110301.png',
      attributeClass: 'ico-attribute ico-attribute-4',
      is_dead: false,
      is_host: false,
    },
    {
      nickname: '四月一日',
      userId: '25246588',
      userRank: '400',
      jobIcon: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/110301.png',
      attributeClass: 'ico-attribute ico-attribute-4',
      is_dead: false,
      is_host: false,
    },
    {
      nickname: '果',
      userId: '28211776',
      userRank: '240',
      jobIcon: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/160401.png',
      attributeClass: 'ico-attribute ico-attribute-4',
      is_dead: false,
      is_host: false,
    },
    {
      nickname: 'Dちゃん',
      userId: '36518523',
      userRank: '371',
      jobIcon: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/130401.png',
      attributeClass: 'ico-attribute ico-attribute-4',
      is_dead: false,
      is_host: true,
    },
    {
      nickname: 'セイルズ',
      userId: '3164112',
      userRank: '400',
      jobIcon: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/130401.png',
      attributeClass: 'ico-attribute ico-attribute-4',
      is_dead: false,
    },
    {
      nickname: '笹塚',
      userId: '15359464',
      userRank: '367',
      jobIcon: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/270301.png',
      attributeClass: 'ico-attribute ico-attribute-4',
      is_dead: false,
    },
    {
      nickname: 'ルマンド',
      userId: '16588892',
      userRank: '400',
      jobIcon: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/130401.png',
      attributeClass: 'ico-attribute ico-attribute-4',
      is_dead: false,
    },
    {
      nickname: '想定ガイジ',
      userId: '15154472',
      userRank: '387',
      jobIcon: 'https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/ui/icon/job/130401.png',
      attributeClass: 'ico-attribute ico-attribute-4',
      is_dead: false,
    },
  ],
  mvpInfo: [
    {
      userId: '25246588',
      rank: 1,
      point: 1182514,
    },
    {
      userId: '36518523',
      rank: 2,
      point: 1000842,
    },
    {
      userId: '18857488',
      rank: 3,
      point: 645835,
    },
    {
      userId: '3164112',
      rank: 4,
      point: 315874,
    },
    {
      userId: '16588892',
      rank: 5,
      point: 148807,
    },
    {
      userId: '28211776',
      rank: 6,
      point: 0,
    },
    {
      userId: '15154472',
      rank: 7,
      point: 0,
    },
    {
      userId: '15359464',
      rank: 8,
      point: 0,
    },
  ],
}

const data = computed(() =>
  foo.memberInfo?.reduce<any[]>((pre, cur) => {
    const hit = foo.mvpInfo?.find(m => m.userId === cur.userId)
    const info = hit ? { rank: hit.rank, point: hit.point } : { rank: 999 }
    pre.push({ ...cur, ...info })
    return pre
  }, []).sort((a, b) => Number(a.rank) - Number(b.rank)),
)
</script>

<template>
  <div flex flex-wrap gap-3 p-10>
    <Contact absolute right-15px top-15px />
    <div>
      <img w-60px src="https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/quest/assets/lobby/303141.png" alt="" srcset="">
      <TheButton @click="visible = true">
        ceshi
      </TheButton>
    </div>

    <div h-320px w-360px flex rounded-xl>
      <el-scrollbar flex-1 ring-1>
        <div p-10px>
          <div flex flex-wrap gap-20px text-12px>
            <el-tooltip v-for="member, idx in data" :key="idx">
              <template #content>
                <div mb-10px w-100px>
                  {{ 123 }}
                </div>
                <div flex items-center justify-end gap-10px text-xl>
                  <div i-carbon:identification icon-btn />
                  <div i-carbon:bookmark-add icon-btn />
                </div>
              </template>
              <div
                :class="{ host: member.is_host }"
                relative mb-10px h-65px w-140px flex cursor-pointer select-none items-center rounded-md bg-neutral-7 transition-all
              >
                <div v-if="member.is_dead" class="absolute h-full w-full fc bg-black/40">
                  <span text-red font-bold>Dead</span>
                </div>
                <div ml-30px flex flex-col justify-center gap-5px text-start font-medium>
                  <span w-100px overflow-hidden text-ellipsis whitespace-nowrap>
                    {{ member.nickname }}
                  </span>
                  <span>
                    {{ member.point ? Math.floor(member.point).toLocaleString() : '' }}
                  </span>
                </div>

                <ElTag effect="dark" size="small" :type="member.userRank === '400' ? 'warning' : 'info'" absolute right--1px top--10px>
                  {{ `Lv${member.userRank}` }}
                </ElTag>
                <ElTag v-if="member.rank && member.rank !== 999" effect="dark" size="small" type="danger" absolute left--8px my-auto>
                  {{ `#${member.rank}` }}
                </ElTag>
                <img :src="member.jobIcon" absolute left-5px top--12px h-24px>
                <div :class="member.attributeClass" scale-150 />
                <div i-carbon:bookmark-filled absolute bottom--10px right-25px text-orange />
              </div>
            </el-tooltip>
            <el-popover v-for="member, idx in data" :key="idx" placement="top" :width="150" trigger="hover" effect="dark">
              <template #reference>
                <div
                  :class="{ host: member.is_host }"
                  relative mb-10px h-65px w-140px flex cursor-pointer select-none items-center rounded-md bg-neutral-7 transition-all
                >
                  <div v-if="member.is_dead" class="absolute h-full w-full fc bg-black/40">
                    <span text-red font-bold>Dead</span>
                  </div>
                  <div ml-30px flex flex-col justify-center gap-5px text-start font-medium>
                    <span w-100px overflow-hidden text-ellipsis whitespace-nowrap>
                      {{ member.nickname }}
                    </span>
                    <span>
                      {{ member.point ? Math.floor(member.point).toLocaleString() : '' }}
                    </span>
                  </div>

                  <ElTag effect="dark" size="small" :type="member.userRank === '400' ? 'warning' : 'info'" absolute right--1px top--10px>
                    {{ `Lv${member.userRank}` }}
                  </ElTag>
                  <ElTag v-if="member.rank && member.rank !== 999" effect="dark" size="small" type="danger" absolute left--8px my-auto>
                    {{ `#${member.rank}` }}
                  </ElTag>
                  <img :src="member.jobIcon" absolute left-5px top--12px h-24px>
                  <div :class="member.attributeClass" scale-150 />
                  <div i-carbon:bookmark-filled absolute bottom--10px right-25px text-orange />
                </div>
              </template>
              <div mb-10px>
                {{ 123 }}
              </div>
              <div flex items-center justify-end gap-10px text-xl>
                <div i-carbon:identification icon-btn />
                <div i-carbon:bookmark-add icon-btn />
              </div>
            </el-popover>
          </div>
        </div>
      </el-scrollbar>
      <!-- <div flex-1 bg-rose>

      </div> -->
      <div class="bg-#3C3C3C" w-40px flex shrink-0 flex-col justify-between p-5px>
        <div flex flex-col items-center gap-10px>
          <el-tooltip v-for="view in upViewList" :key="view.key" effect="dark" :content="view.lable" placement="left">
            <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 :class="{ 'bg-neutral-8!': view.key === currentView }" @click="currentView = view.key">
              <Icon :icon="view.icon" text-20px />
            </div>
          </el-tooltip>
        </div>
        <div flex flex-col items-center gap-10px>
          <el-tooltip v-for="view in downViewList" :key="view.key" effect="dark" :content="view.lable" placement="left">
            <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 :class="{ 'bg-neutral-8!': view.key === currentView }" @click="currentView = view.key">
              <Icon :icon="view.icon" text-20px />
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
