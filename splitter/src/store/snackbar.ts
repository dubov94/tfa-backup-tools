import { Module } from 'vuex'
import { HIDE_SNACKBAR, RootState, SHOW_SNACKBAR, SnackbarState } from './domain'

export default <Module<SnackbarState, RootState>>{
  namespaced: true,
  state: () => ({
    text: '',
    indicator: false
  }),
  mutations: {
    [SHOW_SNACKBAR] (state, payload: string) {
      state.text = payload
      state.indicator = true
    },
    [HIDE_SNACKBAR] (state) {
      state.text = ''
      state.indicator = false
    }
  }
}
