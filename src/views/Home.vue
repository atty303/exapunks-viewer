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
  </q-page>
</template>

<style>
</style>

<script lang="ts">
import { Component, Vue, } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue'
import { KaitaiStream } from 'kaitai-struct'

import { ExapunksSolution } from '@/ksy/ExapunksSolution'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  public addFiles(files: FileList): void {
    console.log(files)
    for (const file of files) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        console.log(e)
        const s = new KaitaiStream(e.target.result)
        const sol = new ExapunksSolution(s)
        console.log(sol)
      }
      reader.readAsArrayBuffer(file)
    }
  }

  public cancelFile(file: File): void {
    console.log(file)
  }
}
</script>
