<template>
  <q-page class="flex flex-center">
    <div>
      <div class="row">
        <div class="col">
          <Solution v-for="file in allFiles" :key="file.name" :solutionFile="file"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

import Solution from '@/components/Solution.vue'
import {SolutionFile} from '@/models'

@Component({
  components: {
    Solution
  }
})
export default class Home extends Vue {
  private get allFiles(): SolutionFile {
    return this.$store.getters.allFiles
  }
}
</script>
