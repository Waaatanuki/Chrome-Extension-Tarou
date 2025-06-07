<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { eventList } from '~/logic'

const eventInfo = computed(() => eventList.value.find(event => event.type === 'godslayer'))
</script>

<template>
  <el-card v-if="eventInfo && eventInfo.isActive" body-style="padding: 10px" header-class="my-card-header" h-full w-300px>
    <template #header>
      <div flex justify-between>
        <div>
          神灭战(印章Lv{{ eventInfo?.count }})
        </div>
        <div>
          {{ useDateFormat(eventInfo.updateTime, 'MM-DD HH:mm') }}
        </div>
      </div>
    </template>
    <div flex flex-col gap-3 text-12px>
      <div v-for="mission, index in eventInfo?.mission" :key="index" flex items-start justify-between>
        <el-tooltip
          effect="dark"
          :content="mission.reward"
          :disabled="!mission.reward"
          raw-content
          placement="top-start"
        >
          <div fc gap-1>
            <Icon
              :icon="mission.isAllComplete ? 'material-symbols:check-box' : 'material-symbols:check-box-outline-blank'"
              :color="mission.isDailyMission ? '#60a5fa' : '#f0cb4f'"
              size="5"
            />
            <div v-html="mission.desc" />
          </div>
        </el-tooltip>

        <div fc gap-1>
          <Icon
            v-for="i in mission.limit"
            :key="i"
            color="#f0cb4f"
            size="5"
            :icon="String(mission.number).padStart(mission.limit, '0').charAt(i - 1) === '1' ? 'material-symbols:star-rounded' : 'material-symbols:star-outline-rounded' "
          />
        </div>
      </div>
    </div>
  </el-card>
</template>
