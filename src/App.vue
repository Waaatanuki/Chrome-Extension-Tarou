<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'

const visible = ref(false)

const viewList: { key: string, icon: string }[] = [
  { key: 'Dashborad', icon: 'material-symbols:dashboard' },
  { key: 'Drop', icon: 'material-symbols:bookmark-star-sharp' },
  { key: 'Setting', icon: 'carbon:settings' },
]

const currentView = ref('Dashborad')
</script>

<template>
  <div flex flex-wrap gap-3 p-10>
    <Contact absolute right-15px top-15px />
    <div>
      <TheButton @click="visible = true">
        ceshi
      </TheButton>
    </div>

    <div h-150 w-200 flex rounded-xl bg-neutral>
      <div flex-1 bg-rose />
      <div w-50px flex flex-col justify-between class="bg-#3C3C3C" p-10px>
        <div flex flex-col items-center gap-10px>
          <el-tooltip
            v-for="view in viewList" :key="view.key"
            effect="dark"
            :content="view.key"
            placement="left"
          >
            <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 :class="{ 'bg-neutral-8!': view.key === currentView }">
              <Icon :icon="view.icon" text-20px />
            </div>
          </el-tooltip>
        </div>
        <div flex flex-col items-center gap-10px>
          <el-tooltip
            v-for="view in viewList" :key="view.key"
            effect="dark"
            :content="view.key"
            placement="left"
          >
            <div h-30px w-30px fc cursor-pointer rounded-md hover:bg-neutral-6 :class="{ 'bg-neutral-8!': view.key === currentView }">
              <Icon :icon="view.icon" text-20px />
            </div>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
