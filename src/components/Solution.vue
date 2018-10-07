<template>
  <q-card>
    <q-card-title>
      {{ solutionFile.name }}
    </q-card-title>
    <q-card-separator/>
    <q-card-main>
      <pre>
        {{ markdown }}
      </pre>
      <div v-for="exa in solutionFile.solution.exaInstances">
        <VueMarkdown>
## {{ exa.name.string}}

```
{{ exa.code.string }}
```
        </VueMarkdown>
      </div>
    </q-card-main>
  </q-card>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { SolutionFile } from '@/models'
  import VueMarkdown from 'vue-markdown'
  import * as _ from 'lodash'

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
      VueMarkdown
    }
  })
  export default class Solution extends Vue {
    @Prop() private solutionFile!: SolutionFile

    private mdTemplate: any

    private get markdown(): string {
      if (mdTemplate) {
        return mdTemplate({
          exaInstances: this.solutionFile.solution.exaInstances
        })
      } else {
        return 'none'
      }
    }
  }
</script>

<style lang="stylus">
pre
  font-family monospace
</style>
