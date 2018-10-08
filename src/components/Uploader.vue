<template>
  <input type="file" accept=".solution" multiple class="q-uploader-input absolute-full cursor-pointer" @change="addFiles">
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { KaitaiStream } from 'kaitai-struct'

import { ExapunksSolution } from '@/ksy/ExapunksSolution'
import { SolutionFile } from '@/models'

@Component({
  components: {
  }
})
export default class Uploader extends Vue {
  public addFiles(evt: any): void {
    for (const file of evt.target.files) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        const solutionFile = new SolutionFile(file.name, e.target.result)
        this.$store.dispatch('addFile', solutionFile)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  public cancelFile(file: File): void {
    return
  }
}
</script>
