<template>
  <q-layout view="hHh Lpr fFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          EXAPUNKS Solution Viewer
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer side="left" v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-item>
          <q-item-side icon="input"/>
          <q-item-main label="Upload solution files" />
          <Uploader/>
        </q-item>
        <q-item>
          <q-item-side icon="get_app"/>
          <q-item-main label="Download as markdown" @click="download"/>
        </q-item>

        <q-list v-if="problems.length > 0" no-border link inset-delimiter>
          <q-list-header>Solutions</q-list-header>
          <q-item v-for="problem in problems" @click="jumpToProblem(problem.fileId)">
            <q-item-main>
              <q-item-tile label>{{ problem.fileId }}</q-item-tile>
              <q-item-tile sublabel>{{ problem.name }}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Uploader from '@/components/Uploader.vue'
import {Problem} from '@/models'

@Component({
  components: {
    Uploader
  }
})
export default class LayoutDefault extends Vue {
  private $q: any
  private leftDrawerOpen: boolean = this.$q.platform.is.desktop

  private get problems(): Problem {
    return this.$store.getters.problems
  }

  private jumpToProblem(fileId: string): void {
    window.location.hash = fileId
  }

  private download(): void {

  }
}
</script>
