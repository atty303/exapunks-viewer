<template>
  <q-page class="flex flex-center">
    <q-uploader
      url=""
      extensions=".solution"
      multiple
      hide-upload-button
      hide-upload-progress
      webkitDirectory
      @add="addFiles"
      @remove:cancel="cancelFile"
    />

    <Solution v-for="file in allFiles" :solutionFile="file"/>
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Vue, } from 'vue-property-decorator'
import { KaitaiStream } from 'kaitai-struct'

import { ExapunksSolution } from '@/ksy/ExapunksSolution'
import Solution from '@/components/Solution.vue'
import { SolutionFile } from '@/models'

@Component({
  components: {
    Solution
  }
})
export default class Home extends Vue {
  private get allFiles(): SolutionFile {
    return this.$store.getters.allFiles
  }

  public addFiles(files: FileList): void {
    for (const file of files) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const stream = new KaitaiStream(e.target.result)
        let sol
        let err
        try {
          sol = new ExapunksSolution(stream)
        } catch (e) {
          console.error(e)
          err = '' + e
        }
        this.$store.dispatch('addFile', { name: file.name, solution: sol, error: err })
      }
      reader.readAsArrayBuffer(file)
    }
  }

  public cancelFile(file: File): void {
    return
  }
}
</script>
