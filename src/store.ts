import Vue from 'vue'
import Vuex from 'vuex'

import {Problem, ProblemCollection, SolutionFile} from '@/models'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    problemCollection: new ProblemCollection(),
  },
  getters: {
    allFiles(state): SolutionFile[] {
      return state.problemCollection.problems.flatMap((_) => _.solutionFiles)
    },
    problems(state): Problem[] {
      return state.problemCollection.problems
    }
  },
  mutations: {
    addFile(state, file: SolutionFile): void {
      state.problemCollection.addSolutionFile(file)
    },
  },
  actions: {
    addFile(context, file: SolutionFile): void {
      context.commit('addFile', file)
    },
  },
})
