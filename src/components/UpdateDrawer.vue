<script setup lang="ts">
const { info } = defineProps<{ info: { date: string, version: string, comment: string } }>()
const visible = defineModel<boolean>()

function checkChangelog() {
  window.open(`https://waaatanuki.github.io/tarou-docs/begin/changelog`, '_blank')
}

function getDownloadUrl() {
  window.open(`https://github.com/Waaatanuki/Chrome-Extension-Tarou/releases/download/${info.version}/Chrome-Extension-Tarou.v${info.version}.zip`, '_blank')
}
</script>

<template>
  <el-drawer v-model="visible" :with-header="false" :size="140" direction="btt">
    <div h-full flex flex-col items-center justify-between gap-2>
      <div fc gap-2 text-15px font-bold>
        <div i-openmoji:alien-monster />
        <div>
          New version found {{ info.version }}
        </div>
        <div i-openmoji:alien-monster />
      </div>
      <div text-center text-12px>
        {{ info.comment }}
      </div>
      <div flex justify-end>
        <TheButton @click="checkChangelog">
          Changelog
        </TheButton>
        <TheButton @click="getDownloadUrl">
          Download Extension
        </TheButton>
      </div>
    </div>
  </el-drawer>
</template>
