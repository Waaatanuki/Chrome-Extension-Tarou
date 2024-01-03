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
  <ElCard m-3 w-full>
    <template #header>
      <div flex justify-between>
        <div text-xl>
          Record Selection
        </div>
        <div>
          <ElButton type="danger" link @click="reset">
            Reset
          </ElButton>
          <ElButton type="primary" link @click="handleCopy">
            Duplicate
          </ElButton>
        </div>
      </div>
    </template>
    <ElTable :data="recoveryItemList" cell-class-name="cell-class-name">
      <ElTableColumn prop="timeStamp" label="Date" align="center">
        <template #default="{ row }">
          {{ dayjs(row.timeStamp).format("YYYY-MM-DD") }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="Full Elixir" align="center">
        <template #default="{ row }">
          <ElBadge
            :value="(row.fullElixirDiff >= 0 ? '+' : '') + row.fullElixirDiff"
            :type="row.fullElixirDiff >= 0 ? 'success' : 'danger'"
          >
            <div w-70px>
              {{ row.fullElixir }}
            </div>
          </ElBadge>
        </template>
      </ElTableColumn>
      <ElTableColumn label="Half Elixir" align="center">
        <template #default="{ row }">
          <ElBadge
            :value="(row.halfElixirDiff >= 0 ? '+' : '') + row.halfElixirDiff"
            :type="row.halfElixirDiff >= 0 ? 'success' : 'danger'"
          >
            <div w-70px>
              {{ row.halfElixir }}
            </div>
          </ElBadge>
        </template>
      </ElTableColumn>
      <ElTableColumn label="Soul Balm" align="center">
        <template #default="{ row }">
          <ElBadge
            :value="(row.soulBalmDiff >= 0 ? '+' : '') + row.soulBalmDiff"
            :type="row.soulBalmDiff >= 0 ? 'success' : 'danger'"
          >
            <div w-70px>
              {{ row.soulBalm }}
            </div>
          </ElBadge>
        </template>
      </ElTableColumn>
      <ElTableColumn label="Soul Berry" align="center">
        <template #default="{ row }">
          <ElBadge
            :value="(row.soulBerryDiff >= 0 ? '+' : '') + row.soulBerryDiff"
            :type="row.soulBerryDiff >= 0 ? 'success' : 'danger'"
          >
            <div w-70px>
              {{ row.soulBerry }}
            </div>
          </ElBadge>
        </template>
      </ElTableColumn>
    </ElTable>
  </ElCard>
  <ElDialog v-model="dialogVisible" @opened="handleOpen">
    <ElInput ref="inputRef" v-model="textarea" :rows="4" type="textarea" />
  </ElDialog>
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
