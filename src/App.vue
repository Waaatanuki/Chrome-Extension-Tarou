<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'
import Battle from '~/views/sidePanel/views/battle/index.vue'
import ActionList from '~/views/sidePanel/views/combat/components/ActionList.vue'

const visible = ref(false)
const currentView = ref('Dashborad')
const foo = ref(123)
const upViewList = [
  { key: 'Dashborad', lable: '基础信息', icon: 'material-symbols:dashboard' },
  { key: 'Drop', lable: '掉落信息', icon: 'material-symbols:bookmark-star-sharp' },
]
const downViewList = [
  { key: 'Setting', lable: '设置', icon: 'carbon:settings' },
]

function handle() {
  console.log(foo.value)
  console.log(typeof foo.value)

  ElMessageBox.prompt('请输入新的的引继码', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        console.log(instance.inputValue)

        instance.confirmButtonLoading = true
        setTimeout(() => {
          done()
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
        }, 3000)
      }
      else {
        done()
      }
    },
  })
    .then(({ value }) => {
      ElMessage({
        type: 'success',
        message: `Your email is:${value}`,
      })
    })
    .catch(() => {})
}
</script>

<template>
  <div flex flex-wrap gap-3 p-10>
    <Contact absolute right-15px top-15px />
    <div>
      <TheButton @click="handle">
        ceshi
      </TheButton>
    </div>

    <div h-600px w-360px flex rounded-xl>
      <el-scrollbar flex-1 ring-1>
        <div p-10px>
          <Battle />
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
