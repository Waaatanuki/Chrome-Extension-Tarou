<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { snapdom } from '@zumer/snapdom'
import Npc from '~/views/sidePanel/views/party/components/Npc.vue'

const visible = ref(false)
const foo = ref('')
const currentView = ref('Dashborad')

const upViewList = [
  { key: 'Dashborad', lable: '基础信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落信息', icon: 'material-symbols:bookmark-star-sharp' },
]
const downViewList = [
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]

async function handleClick() {
  console.log('handleClick')
  try {
    const element = document.querySelector(`.foo`)!
    const result = await snapdom(element)
    await result.download({ quality: 3, scale: 3, format: 'png', filename: `配置截图${Date.now()}` })
  }
  catch (error) {
    console.error(error)
  }
}
const gachaInfo = ref({
  id: '12',
})
const deck = ref({
  leader: {
    masterId: '130401',
    imageId: '130401_kn_1_01',
    familiarId: 8,
    normalDamage: 493785,
    advantageDamage: 1077083,
    ability: [
      {
        jobParamId: 25112365,
        actionId: '201841',
        iconId: '1921_1',
        name: 'エーテルサクション',
        iconType: '1',
        fa: false,
      },
      {
        jobParamId: 0,
        name: 'シークレットトライアド',
        actionId: '201861',
        iconId: '1923_3',
        iconType: '3',
        fa: true,
      },
      {
        jobParamId: 0,
        name: 'ワイルドマギカ',
        actionId: '201851',
        iconId: '1922_1',
        iconType: '1',
        fa: true,
      },
    ],
  },
  npcs: [
    {
      paramId: 134622921,
      masterId: 3040197000,
      imageId: '3030279000_81',
      isAugment: false,
      arousalForm: 1,
      attribute: 5,
      ability: [
        {
          iconType: '1',
          fa: true,
        },
        {
          iconType: '1',
          fa: true,
        },
        {
          iconType: '3',
          fa: true,
        },
        {
          iconType: '1',
          fa: true,
        },
      ],
      artifact: [],
    },
    {
      paramId: 199370676,
      masterId: 3040349000,
      imageId: '3040349000_01',
      isAugment: false,
      arousalForm: 1,
      attribute: 5,
      ability: [
        {
          iconType: '3',
          fa: true,
        },
        {
          iconType: '5',
          fa: true,
        },
        {
          iconType: '3',
          fa: true,
        },
      ],
      artifact: [],
    },
    {
      paramId: 207667879,
      masterId: 3040441000,
      imageId: '3710208000_01',
      isAugment: false,
      arousalForm: 4,
      attribute: 5,
      ability: [
        {
          iconType: '3',
          fa: true,
        },
        {
          iconType: '3',
          fa: true,
        },
        {
          iconType: '3',
          fa: true,
        },
      ],
      artifact: [
        {
          value: '+4.8%',
          icon: 'bonus_28',
          level: 1,
          name: '有利属性軽減',
        },
        {
          value: '+840',
          icon: 'bonus_28',
          level: 1,
          name: 'HP',
        },
        {
          value: '+8.4%',
          icon: 'bonus_29',
          level: 1,
          name: 'HPが50%以上の時、トリプルアタック確率UP',
        },
        {
          value: '1個',
          icon: 'bonus_30',
          level: 1,
          name: '1回攻撃発動時、自分に一定個数ランダムな強化効果',
        },
      ],
    },
    {
      paramId: 162348338,
      masterId: 3040141000,
      imageId: '3040141000_03',
      isAugment: true,
      arousalForm: 1,
      attribute: 5,
      ability: [
        {
          iconType: '3',
          fa: true,
        },
        {
          iconType: '1',
          fa: false,
        },
        {
          iconType: '3',
          fa: false,
        },
        {
          iconType: '3',
          fa: true,
        },
      ],
      artifact: [],
    },
    { paramId: 177124537, masterId: 3040162000, imageId: '3040162000_03', attribute: 5, isAugment: false, arousalForm: 1, ability: [{ iconType: '1', fa: true }, { iconType: '3', fa: true }, { iconType: '3', fa: true }, { iconType: '3', fa: true }], artifact: [] },
    { paramId: 177124537, masterId: 3040162000, imageId: '3040162000_03', attribute: 5, isAugment: false, arousalForm: 1, ability: [{ iconType: '1', fa: true }, { iconType: '3', fa: true }, { iconType: '3', fa: true }, { iconType: '3', fa: true }], artifact: [] },
    { paramId: 177124537, masterId: 3040162000, imageId: '3040162000_03', attribute: 5, isAugment: false, arousalForm: 1, ability: [{ iconType: '1', fa: true }, { iconType: '3', fa: true }, { iconType: '3', fa: true }, { iconType: '3', fa: true }], artifact: [] },
    { paramId: 177124537, masterId: 3040162000, imageId: '3040162000_03', attribute: 5, isAugment: false, arousalForm: 1, ability: [{ iconType: '1', fa: true }, { iconType: '3', fa: true }, { iconType: '3', fa: true }, { iconType: '3', fa: true }], artifact: [] },
  ],
})
</script>

<template>
  <div fc flex-wrap gap-3 p-10>
    <div h-600px w-600px ring-1>
      <div fc gap-2 p-2>
        <el-input v-model="foo" type="text" style="width: 200px;" />
        <TheButton title="测试" @click="handleClick">
          按钮
        </TheButton>
      </div>
    </div>

    <div h-600px w-360px flex rounded-xl>
      <el-scrollbar flex-1 ring-1>
        <div p-10px class="foo">
          <!-- <Npc :leader="deck.leader" :npcs="deck.npcs" /> -->
        </div>
      </el-scrollbar>
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
