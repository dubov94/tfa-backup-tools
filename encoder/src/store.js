import { print } from '@/printer'
import uuid from 'uuid/v1'
import Vue from 'vue'
import Vuex from 'vuex'
import VuexUndoRedo from 'vuex-undo-redo';

Vue.use(Vuex)
Vue.use(VuexUndoRedo)

const getTileIndex = (tiles, id) => tiles.findIndex((tile) => tile.id === id)
const getTileObject = (tiles, id) => tiles.find((tile) => tile.id === id)
const isOptionalPresent = (optional) => optional !== undefined

const createInitialState = () => ({
  tiles: []
})

export default new Vuex.Store({
  state: createInitialState(),
  mutations: {
    emptyState () {
      this.replaceState(createInitialState())
    },
    pushTile (state, id) {
      state.tiles.push({
        id,
        header: '',
        content: ''
      })
    },
    deleteTile (state, id) {
      let index = getTileIndex(state.tiles, id)
      state.tiles.splice(index, 1)
    },
    updateTile (state, { id, header, content }) {
      let tile = getTileObject(state.tiles, id)
      if (isOptionalPresent(header)) {
        tile.header = header
      }
      if (isOptionalPresent(content)) {
        tile.content = content
      }
    },
    moveTile (state, { from, to, delta }) {
      let fromIndex = getTileIndex(state.tiles, from)
      let tile = state.tiles.splice(fromIndex, 1)[0]
      let toIndex = getTileIndex(state.tiles, to)
      let indexAdj = delta === -1 ? 0 : 1
      state.tiles.splice(toIndex + indexAdj, 0, tile)
    }
  },
  actions: {
    createTile ({ commit }) {
      commit('pushTile', uuid())
    },
    deleteTile ({ commit }, id) {
      commit('deleteTile', id)
    },
    updateTile ({ commit }, { id, header, content }) {
      commit('updateTile', { id, header, content })
    },
    moveTile ({ commit }, { from, to, delta }) {
      commit('moveTile', { from, to, delta })
    },
    print ({ state }) {
      print(state.tiles)
    }
  }
})
