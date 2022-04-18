import { Module } from 'vuex'
import secrets from 'secrets.js'
import { CombiningState, GET_COMBINATION, RootState, SET_COMBINING_INPUT } from './domain'

export default <Module<CombiningState, RootState>>{
  namespaced: true,
  state: () => ({ input: '' }),
  getters: {
    [GET_COMBINATION] (state): [string, string] {
      const shareList = state.input.split('\n').filter(
        (line) => line.trim().length > 0)
      try {
        const combination = secrets.combine(shareList)
        return [secrets.hex2str(combination), '']
      } catch (error: unknown) {
        return ['', `${error}`]
      }
    }
  },
  mutations: {
    [SET_COMBINING_INPUT] (state, payload: string) {
      state.input = payload
    }
  }
}
