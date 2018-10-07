<template>
  <q-card>
    <q-card-title>
      {{ solutionFile.name }}
    </q-card-title>
    <q-card-separator/>
    <q-card-main>
      <prism language="markdown">{{ markdown }}</prism>
    </q-card-main>
  </q-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SolutionFile } from '@/models'
  import * as _ from 'lodash'
  import Prism from 'vue-prism-component'

  const mdTemplate = _.template(`
<% _.each(exaInstances, function(exa) { %>
## <%= exa.name.string %>

\`\`\`
<%= exa.code.string %>
\`\`\`
<% }) %>
`)

  @Component({
    components: {
      Prism
    }
  })
  export default class Solution extends Vue {
    @Prop() private solutionFile!: SolutionFile

    private mdTemplate: any

    private get markdown(): string {
      return mdTemplate({
        exaInstances: this.solutionFile.solution.exaInstances
      })
    }
  }
</script>

<style lang="stylus">
pre
  font-family monospace
</style>
