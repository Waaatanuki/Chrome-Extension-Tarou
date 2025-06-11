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
          <el-descriptions :column="3" direction="vertical" size="small" w-100px border>
            <el-descriptions-item label="ID" width="100" align="center">
              123
            </el-descriptions-item>
          </el-descriptions>
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
