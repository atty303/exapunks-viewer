<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-toolbar-title>
          EXAPUNKS Solution Viewer
        </q-toolbar-title>

        <Uploader/>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Uploader from '@/components/Uploader.vue'

@Component({
  components: {
    Uploader
  }
})
export default class LayoutDefault extends Vue {
}
</script>

<style>
</style>
