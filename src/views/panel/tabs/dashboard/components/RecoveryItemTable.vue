<script setup lang="ts">
import dayjs from 'dayjs'
import { recoveryItemList } from '~/logic'

const inputRef = ref<HTMLTextAreaElement>()
const dialogVisible = ref(false)
const textarea = ref('')

function reset() {
  recoveryItemList.value = []
}

function handleCopy() {
  let str = ''

  for (let index = recoveryItemList.value.length - 1; index >= 0; index--) {
    const row = recoveryItemList.value[index]
    str += `${dayjs(row.timeStamp).format('YYYY-MM-DD')} ${row.fullElixir} ${
      (row.fullElixirDiff >= 0 ? '+' : '') + row.fullElixirDiff
    } ${row.halfElixir} ${
      (row.halfElixirDiff >= 0 ? '+' : '') + row.halfElixirDiff
    } ${row.soulBalm} ${
      (row.soulBalmDiff >= 0 ? '+' : '') + row.soulBalmDiff
    } ${row.soulBerry} ${
      (row.soulBerryDiff >= 0 ? '+' : '') + row.soulBerryDiff
    }`
    str += '\n'
  }
  textarea.value = str
  dialogVisible.value = true
}

function handleOpen() {
  inputRef.value?.select()
}
</script>

<template>
  <el-card m-3 w-full>
    <template #header>
      <div flex justify-between>
        <div text-xl>
          回复道具记录
        </div>
        <div>
          <el-button type="danger" link @click="reset">
            重置
          </el-button>
          <el-button type="primary" link @click="handleCopy">
            复制
          </el-button>
        </div>
      </div>
    </template>
    <el-table :data="recoveryItemList" cell-class-name="cell-class-name">
      <el-table-column prop="timeStamp" label="日期" align="center">
        <template #default="{ row }">
          {{ dayjs(row.timeStamp).format("YYYY-MM-DD") }}
        </template>
      </el-table-column>
      <el-table-column label="大红" align="center">
        <template #default="{ row }">
          <el-badge
            :value="(row.fullElixirDiff >= 0 ? '+' : '') + row.fullElixirDiff"
            :type="row.fullElixirDiff >= 0 ? 'success' : 'danger'"
          >
            <div w-15>
              {{ row.fullElixir }}
            </div>
          </el-badge>
        </template>
      </el-table-column>
      <el-table-column label="半红" align="center">
        <template #default="{ row }">
          <el-badge
            :value="(row.halfElixirDiff >= 0 ? '+' : '') + row.halfElixirDiff"
            :type="row.halfElixirDiff >= 0 ? 'success' : 'danger'"
          >
            <div w-15>
              {{ row.halfElixir }}
            </div>
          </el-badge>
        </template>
      </el-table-column>
      <el-table-column label="粉盒" align="center">
        <template #default="{ row }">
          <el-badge
            :value="(row.soulBalmDiff >= 0 ? '+' : '') + row.soulBalmDiff"
            :type="row.soulBalmDiff >= 0 ? 'success' : 'danger'"
          >
            <div w-15>
              {{ row.soulBalm }}
            </div>
          </el-badge>
        </template>
      </el-table-column>
      <el-table-column label="豆子" align="center">
        <template #default="{ row }">
          <el-badge
            :value="(row.soulBerryDiff >= 0 ? '+' : '') + row.soulBerryDiff"
            :type="row.soulBerryDiff >= 0 ? 'success' : 'danger'"
          >
            <div w-15>
              {{ row.soulBerry }}
            </div>
          </el-badge>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog v-model="dialogVisible" @opened="handleOpen">
    <el-input ref="inputRef" v-model="textarea" :rows="4" type="textarea" />
  </el-dialog>
</template>

<style lang="scss">
.cell-class-name > .cell {
  height: 40px;
  padding: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
