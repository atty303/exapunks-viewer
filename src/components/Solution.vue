<template>
  <q-card inline class="bigger q-ma-sm">
    <q-card-title dark>
      {{ solutionFile.name }}
      <span slot="right">
        <q-btn round flat icon="delete" color="negative"/>
      </span>
    </q-card-title>
    <q-card-main>
      <pre data-src="plugins/toolbar/prism-toolbar.js">
        <prism language="markdown">{{ markdown }}</prism>
      </pre>
    </q-card-main>
  </q-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SolutionFile } from '@/models'
  import Prism from 'vue-prism-component'


  @Component({
    components: {
      Prism
    }
  })
  export default class Solution extends Vue {
    @Prop() private solutionFile!: SolutionFile

    private get markdown(): string {
      if (this.solutionFile.solution) {
        return this.solutionFile.solution.codeMarkdown
      } else {
        return "" + this.solutionFile.error
      }
    }
  }
</script>

<style lang="stylus">
pre
  font-family monospace
</style>
