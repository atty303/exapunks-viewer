import Vue from 'vue'
import Vuex from 'vuex'
import * as lodash from 'lodash'

import {Problem, ProblemCollection, SolutionFile} from '@/models'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    problemCollection: new ProblemCollection(),
    files: [] as SolutionFile[],
  },
  getters: {
    allFiles(state): SolutionFile[] {
      //return state.files
      return state.problemCollection.problems.flatMap((_) => _.solutionFiles)
    },
    problems(state): Problem[] {
      return state.problemCollection.problems
      // const filesById = lodash.groupBy(state.files, (sf) => sf.solution.fileId)
      // return lodash.sortBy(Object.keys(filesById), ['fileId']).map((fileId) => {
      //   return new Problem(fileId, lodash.sortBy(filesById[fileId], ['index']))
      // })
    }
  },
  mutations: {
    addFile(state, file: SolutionFile): void {
      //state.files.push(file)
      state.problemCollection.addSolutionFile(file)
    },
    removeFile(state, fileName: string): void {
      const idx = state.files.findIndex((v) => v.fileName === fileName)
      if (idx >= 0) {
        state.files.splice(idx, 1)
      }
    }
  },
  actions: {
    addFile(context, file: SolutionFile): void {
      context.commit('addFile', file)
      // const idx = context.state.files.findIndex((v) => v.fileName === file.fileName)
      // if (idx < 0) {
      //   context.commit('addFile', file)
      // }
    }
  },
})
