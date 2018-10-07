import Vue from 'vue'
import Vuex from 'vuex'

import { SolutionFile } from '@/models'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    files: [] as SolutionFile[]
  },
  getters: {
    allFiles(state): SolutionFile[] {
      return state.files
    }
  },
  mutations: {
    addFile(state, file: SolutionFile): void {
      state.files.push(file)
    },
    removeFile(state, name: string): void {
      const idx = state.files.findIndex((v) => v.name === name)
      if (idx >= 0) {
        state.files.splice(idx, 1)
      }
    }
  },
  actions: {
    addFile(context, file: SolutionFile): void {
      const idx = context.state.files.findIndex((v) => v.name === name)
      if (idx < 0) {
        context.commit('addFile', file)
      }
    }
  },
})
