<template>
  <q-card>
    <q-card-title>
      {{ solutionFile.name }}
    </q-card-title>
    <q-card-separator/>
    <q-card-main>
      <pre v-for="exa in solutionFile.solution.exaInstances" class="bg-light">{{ exa.code.string }}</pre>
    </q-card-main>
  </q-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SolutionFile } from '@/models'

  @Component
  export default class Solution extends Vue {
    @Prop() private solutionFile!: SolutionFile
  }
</script>

<style lang="stylus">
pre
  font-family monospace
</style>
