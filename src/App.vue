<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'
import ActionList from '~/views/sidePanel/views/combat/components/ActionList.vue'

const visible = ref(false)
const currentView = ref('Dashborad')

const upViewList = [
  { key: 'Dashborad', lable: '基础信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落信息', icon: 'material-symbols:bookmark-star-sharp' },
]
const downViewList = [
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]

const data = [{ turn: 1, bossHpPercent: 99.84, special_skill_flag: 0, acitonList: [{ type: 'summon', id: '2040425000', icon: '2040425000' }, { icon: 'attack', id: 'attack', type: 'attack' }], guard_status: [{ num: 0, is_guard_status: 0 }, { num: 1, is_guard_status: 0 }, { num: 2, is_guard_status: 0 }, { num: 3, is_guard_status: 0 }], interrupt_display_text: '', normalAttackInfo: { hit: 86, ability: 73720740, special: 29607166, total: 128553236 } }, { turn: 2, bossHpPercent: 40.58, special_skill_flag: 0, acitonList: [], guard_status: [{ num: 0, is_guard_status: 0 }, { num: 1, is_guard_status: 0 }, { num: 2, is_guard_status: 0 }, { num: 4, is_guard_status: 0 }] }]
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
          <ActionList :action-queue="data" />
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
