<script setup lang="ts">
import { markedUserList } from '~/logic'

const { height } = useWindowSize()

function goProfilePage(userId: string) {
  window.open(`https://game.granbluefantasy.jp/#profile/${userId}`)
}
</script>

<template>
  <el-scrollbar :height="height - 71">
    <div fc flex-wrap gap-20px>
      <div v-for="user, idx in markedUserList" :key="user.id">
        <el-descriptions :column="3" border direction="vertical" size="small">
          <el-descriptions-item label="ID" width="100" align="center">
            <el-link type="primary" @click="goProfilePage(user.id)">
              {{ user.id }}
            </el-link>
          </el-descriptions-item>
          <el-descriptions-item label="昵称" width="150" align="center">
            {{ user.name }}
          </el-descriptions-item>
          <el-descriptions-item label="等级" width="100" align="center">
            {{ user.rank }}
          </el-descriptions-item>
          <el-descriptions-item label="备注">
            <template #label>
              <div flex items-center justify-between>
                <div fc gap-10px>
                  备注 <el-rate v-model="user.rate" clearable size="small" />
                </div>
                <div i-carbon:trash-can icon-btn @click="markedUserList.splice(idx, 1)" />
              </div>
            </template>
            <el-input v-model="user.comment" type="textarea" size="small" :rows="3" />
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </el-scrollbar>
</template>
