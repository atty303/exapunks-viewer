<template>
  <q-card inline class="bigger q-ma-md">
    <q-card-title>
      {{ solutionFile.name }}
      <q-icon slot="right" name="more_vert">
        <q-popover>
          <q-list link class="no-border">
            <q-item v-close-overlay>
              <q-item-main label="Remove Solution" />
            </q-item>
          </q-list>
        </q-popover>
      </q-icon>
    </q-card-title>
    <q-card-main>
      <prism language="markdown">{{ markdown }}</prism>
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
      return this.solutionFile.solution.codeMarkdown
    }
  }
</script>

<style lang="stylus">
pre
  font-family monospace
</style>
