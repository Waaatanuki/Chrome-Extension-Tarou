<script setup lang="ts">
import { dailyCost, joinedRaid } from '~/logic'

const showList = computed(() => {
  const list = dailyCost.value.quest?.filter(q => q.bossImgId)
  return [...list?.filter(q => q.pinned) || [], ...list?.filter(q => !q.pinned) || []]
})
</script>

<template>
  <el-card v-if="dailyCost.dateTime" h-full w-300px class="daily-cost">
    <template #header>
      <div flex items-center justify-between>
        <el-tooltip content="点击显示每日掉落统计" placement="top">
          <div cursor-pointer text-12px text-teal-6 hover:text-teal-4 @click="openPopupWindow('RewardList')">
            {{ `每日统计(${useDateFormat(dailyCost.dateTime, 'MM-DD').value})` }}
          </div>
        </el-tooltip>

        <div fc gap-1>
          <el-tooltip :content="`AP(${Math.ceil((dailyCost.ap || 0) / 75)}小红)`" placement="top">
            <el-tag type="success">
              {{ dailyCost.ap }}
            </el-tag>
          </el-tooltip>
          <el-tooltip content="AAP" placement="top">
            <el-tag type="primary">
              {{ dailyCost.aap }}
            </el-tag>
          </el-tooltip>
          <el-tooltip content="BP" placement="top">
            <el-tag type="danger">
              {{ dailyCost.bp }}
            </el-tag>
          </el-tooltip>
        </div>
      </div>
    </template>
    <el-scrollbar max-height="215">
      <div flex flex-wrap gap-7px text-12px>
        <el-tooltip v-for="quest in showList" :key="quest.questId" :content="quest.bossName" :show-after="1000" placement="top">
          <div relative w-50px fc flex-col>
            <img cursor-pointer :src="getBossImg('enemy', quest.bossImgId, 's')" @click="quest.pinned = !quest.pinned">
            <div>{{ quest.count }}</div>
            <div v-if="quest.pinned" i-twemoji:pushpin absolute right-0 top-0 />
          </div>
        </el-tooltip>
      </div>
    </el-scrollbar>

    <template v-if="joinedRaid.length">
      <el-divider>
        <div class="ico-enter" />
      </el-divider>

      <div grid grid-cols-3 gap-15px>
        <div v-for="raid in joinedRaid" :key="raid.raidId" relative fc flex-col>
          <img :src="getBossImg('summon', raid.imgId, 'qm')">
          <el-countdown class="mt--5px" value-style="font-size: 12px" :value="raid.remainingTimestamp" />
          <div class="absolute right-1px top-1px rounded bg-black/70 px-2px text-end text-10px">
            <NumberLimitDisplay class="daily-cost-member-txt" :value="raid.member" />
            <div class="daily-cost-hp-txt">
              {{ `${raid.hpWidth}%` }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-card>
</template>

<style>
.daily-cost .ico-enter {
  display: block;
  background: url('~/assets/image/common/parts_assist.png') no-repeat 0 -1613px;
  -webkit-background-size: 303px 1796px;
  background-size: 303px 1796px;
  width: 56px;
  height: 18px;
}

.daily-cost .el-divider__text {
  background-color: rgb(29, 30, 31);
  padding: 0 10px;
}

.daily-cost-member-txt {
  color: #f2eee2;
  text-shadow:
    0 0 1px #258eb5,
    0 0 1px #258eb5,
    0 0 1px #258eb5,
    0 0 1px #258eb5,
    0 0 2px #258eb5,
    0 0 2px #258eb5,
    0 0 2px #258eb5,
    0 0 2px #258eb5;
}

.daily-cost-hp-txt {
  color: #f2eee2;
  text-shadow:
    0 0 1px #c73636,
    0 0 1px #c73636,
    0 0 1px #c73636,
    0 0 1px #c73636,
    0 0 2px #c73636,
    0 0 2px #c73636,
    0 0 2px #c73636,
    0 0 2px #c73636;
}
</style>
