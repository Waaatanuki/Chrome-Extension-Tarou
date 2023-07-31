<script setup lang="ts">
defineProps(['tableData'])
</script>

<template>
  <el-table :data="tableData">
    <el-table-column type="expand">
      <template #default="{ row }">
        <div class="prt-result-detail">
          <div class="prt-reward-item">
            <div class="prt-item-list">
              <div
                v-for="treasure, idx in row.treasureList"
                :key="idx"
                class="lis-treasure btn-treasure-item"
              >
                <div class="prt-treasure-image">
                  <img class="img-treasure-item" :src="treasure.src">
                  <div v-if="treasure.number" class="prt-article-count">
                    <span class="txt-small">x</span>{{ treasure.number }}
                  </div>
                </div>
                <div :class="treasure.boxClass" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="raidTime" label="结束时间" align="center" />
    <el-table-column prop="raidName" label="副本" align="center" />
    <el-table-column prop="point" label="伤害" align="center" />
    <el-table-column prop="turn" label="回合数" align="center" width="100" />
    <el-table-column prop="time" label="讨伐时间" align="center" width="100" />
    <el-table-column prop="speed" label="跑速" align="center" width="100" />
  </el-table>
</template>
