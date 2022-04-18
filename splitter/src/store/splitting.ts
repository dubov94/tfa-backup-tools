import { Module } from 'vuex'
import secrets from 'secrets.js'
import { GET_SHARES, RootState, SET_SECRET, SET_SHARE_COUNT, SET_THRESHOLD, SplittingState } from './domain'

const PAD_LENGTH = 1024

export default <Module<SplittingState, RootState>>{
  namespaced: true,
  state: () => ({
      secret: 'EXAMPLE_SECRET',
      shareCount: 3,
      threshold: 2
  }),
  getters: {
    [GET_SHARES] (state): string[] {
      return secrets.share(
        secrets.str2hex(state.secret),
        state.shareCount,
        state.threshold,
        PAD_LENGTH
      )
    }
  },
  mutations: {
    [SET_SECRET] (state, payload: string) {
      state.secret = payload
    },
    [SET_SHARE_COUNT] (state, payload: number) {
      state.shareCount = Math.max(2, payload)
      state.threshold = Math.min(state.threshold, state.shareCount)
    },
    [SET_THRESHOLD] (state, payload: number) {
      state.threshold = Math.max(2, payload)
    }
  }
}
