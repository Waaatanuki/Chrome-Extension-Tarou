<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Contact from '~/views/debugger/tabs/dashboard/components/Contact.vue'
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

const data = [{ turn: 1, bossHpPercent: 99.84, special_skill_flag: 0, acitonList: [{ type: 'summon', id: '2040425000', icon: '2040425000' }, { icon: 'attack', id: 'attack', type: 'attack' }], guard_status: [{ num: 0, is_guard_status: 0 }, { num: 1, is_guard_status: 0 }, { num: 2, is_guard_status: 0 }, { num: 3, is_guard_status: 0 }], interrupt_display_text: '', normalAttackInfo: { hit: 86, ability: 73720740, special: 29607166, total: 128553236 } }, { turn: 2, bossHpPercent: 40.58, special_skill_flag: 0, acitonList: [], guard_status: [{ num: 0, is_guard_status: 0 }, { num: 1, is_guard_status: 0 }, { num: 2, is_guard_status: 0 }, { num: 4, is_guard_status: 0 }] }]
</script>

<template>
  <div flex flex-wrap gap-3 p-10>
    <Contact absolute right-15px top-15px />
    <div>
      <img w-60px src="https://prd-game-a1-granbluefantasy.akamaized.net/assets/img/sp/quest/assets/lobby/303141.png" alt="" srcset="">
      <TheButton @click="handle">
        ceshi
      </TheButton>
    </div>

    <div h-320px w-360px flex rounded-xl>
      <el-scrollbar flex-1 ring-1>
        <div p-10px>
          <el-descriptions :column="1" :border="true" direction="vertical" w-300px>
            <el-descriptions-item label="玩家ID">
              123123
            </el-descriptions-item>
            <el-descriptions-item label="引继码">
              <template #label>
                <div flex justify-between>
                  <div>引继码</div>
                  <TheButton @click="handle">
                    迁移
                  </TheButton>
                </div>
              </template>
              <div hover="text-teal-6" cursor-pointer>
                6c1cac85-d062-4dfe-919f-a5b3e32959eb
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="权限">
              <div flex flex-col>
                <div flex justify-between>
                  <div>通知权限</div>
                  <el-tag type="success">
                    正常
                  </el-tag>
                </div>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="插件版本">
              <div flex flex-col>
                <div flex justify-between>
                  <div>通知权限</div>
                  <el-tag type="success">
                    正常
                  </el-tag>
                </div>
              </div>
            </el-descriptions-item>
            <el-descriptions-item label="UserAgent">
              <div flex flex-col>
                <div flex justify-between>
                  <div>通知权限</div>
                  <el-tag type="success">
                    正常
                  </el-tag>
                </div>
              </div>
            </el-descriptions-item>
          </el-descriptions>
          <el-popover placement="top" width="300">
            <template #reference>
              <div hover="text-teal-6" m-auto mt-20px w-150px fc cursor-pointer gap-2>
                <div i-carbon:help-filled />
                <div>常见问题处理</div>
              </div>
            </template>
            <img src="./assets/image/common/reload.jpg" alt="">
          </el-popover>
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
