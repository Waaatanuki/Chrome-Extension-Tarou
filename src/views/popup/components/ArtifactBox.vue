<script setup lang="ts">
import { artifactList } from '~/logic'
</script>

<template>
  <div grid grid-cols-4 my-10px w-full justify-items-center gap-10px>
    <ArtifactCard
      v-for="artifact, idx in artifactList" :key="artifact.id"
      :artifact="artifact"
      :position="`${Math.floor(idx / 5 + 1)}-${idx % 5 + 1}`"
    />
  </div>
</template>
