<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>2FA Backup Encoder</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon :disabled="!canUndo" @click="undo">
        <v-icon>undo</v-icon>
      </v-btn>
      <v-btn icon :disabled="!canRedo" @click="redo">
        <v-icon>redo</v-icon>
      </v-btn>
      <v-btn icon @click="output">
        <v-icon>print</v-icon>
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
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import Tile from '@/components/Tile'
  import TileMode from '@/components/tile-mode'
  import {mapState, mapActions} from 'vuex'
  import {print} from '@/components/printer'

  export default {
    components: {
      tile: Tile
    },
    mounted () {
      window.addEventListener('beforeunload', this.onBeforeUnload)
      window.addEventListener('keydown', this.onKeyDown)
    },
    beforeDestroy () {
      window.removeEventListener('keydown', this.onKeyDown)
      window.removeEventListener('beforeunload', this.onBeforeUnload)
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
      async output () {
        await print(this.tiles.map((tile) => ({
          header: tile.header,
          content: tile.content
        })))
      },
      onKeyDown (event) {
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
