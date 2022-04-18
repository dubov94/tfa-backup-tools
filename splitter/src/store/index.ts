import Vue from 'vue'
import Vuex from 'vuex'
import { COMBINING_NAMESPACE, RootState, SNACKBAR_NAMESPACE, SPLITTING_NAMESPACE } from './domain'
import SplittingModule from './splitting'
import CombiningModule from './combining'
import SnackbarModule from './snackbar'

Vue.use(Vuex)

export default new Vuex.Store<RootState>({
  modules: {
    [SPLITTING_NAMESPACE]: SplittingModule,
    [COMBINING_NAMESPACE]: CombiningModule,
    [SNACKBAR_NAMESPACE]: SnackbarModule
  }
})
