<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>2FA Backup Encoder</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :disabled="!canUndo" @click="undo">
        <v-icon>mdi-undo</v-icon>
      </v-btn>
      <v-btn icon :disabled="!canRedo" @click="redo">
        <v-icon>mdi-redo</v-icon>
      </v-btn>
      <v-btn icon @click="print">
        <v-icon>mdi-printer</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <v-row>
          <v-col cols="4" v-for="tile in tiles" :key="tile.id">
            <tile :header="tile.header" :content="tile.content"
              :mode="idToMode[tile.id]"
              @new-header="updateHeader(tile.id, $event)"
              @new-content="updateContent(tile.id, $event)"
              @start-dnd="startDnd(tile.id)"
              @cancel-dnd="cancelDnd"
              @place-to-left="placeToSide(tile.id, -1)"
              @place-to-right="placeToSide(tile.id, 1)"
              @remove="removeTile(tile.id)">
            </tile>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-btn fab fixed bottom right color="primary" @click="createTile">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import jsPdf from 'jspdf'
  import Tile from '@/components/Tile'
  import TileMode from '@/components/tile-mode'
  import {mapState, mapActions} from 'vuex'

  export default {
    components: {
      tile: Tile
    },
    created () {
      this.onKeydown = this.onKeydown.bind(this)
      this.onBeforeUnload = this.onBeforeUnload.bind(this)
    },
    mounted () {
      window.addEventListener('keydown', this.onKeydown)
      window.addEventListener('beforeunload', this.onBeforeUnload)
    },
    beforeDestroy () {
      window.removeEventListener('beforeunload', this.onBeforeUnload)
      window.removeEventListener('keydown', this.onKeydown)
    },
    data () {
      return { dndTile: null }
    },
    computed: {
      ...mapState(['tiles']),
      idToMode () {
        let ret = {}
        for (let { id } of this.tiles) {
          if (this.dndTile === null) {
            ret[id] = TileMode.DEFAULT
          } else {
            ret[id] = this.dndTile === id
              ? TileMode.DND_SOURCE
              : TileMode.DND_TARGET
          }
        }
        return ret
      },
      isSafeToQuit () {
        return this.tiles.length === 0
      }
    },
    methods: {
      ...mapActions([
        'createTile',
        'deleteTile',
        'updateTile',
        'moveTile'
      ]),
      updateHeader (id, header) {
        this.updateTile({ id, header })
      },
      updateContent (id, content) {
        this.updateTile({ id, content })
      },
      removeTile (id) {
        this.deleteTile(id)
        if (id === this.dndTile) {
          this.cancelDnd()
        }
      },
      startDnd (id) {
        this.dndTile = id
      },
      cancelDnd () {
        this.dndTile = null
      },
      placeToSide(id, delta) {
        this.moveTile({ from: this.dndTile, to: id, delta })
        this.cancelDnd()
      },
      print () {
        let document = new jsPdf()
        document.text('Hello, world!', 10, 10)
        document.autoPrint()
        document.output('dataurlnewwindow')
      },
      onKeydown (event) {
        if (event.ctrlKey) {
          if (event.keyCode === 90 && this.canUndo) {
            this.undo()
          } else if (event.keyCode === 89 && this.canRedo) {
            this.redo()
          }
        } else if (event.keyCode === 27 && this.dndTile !== null) {
          this.cancelDnd()
        }
      },
      onBeforeUnload (event) {
        if (!this.isSafeToQuit) {
          event.returnValue = true
          return true
        } else {
          return null
        }
      }
    }
  }
</script>
