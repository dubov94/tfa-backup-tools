<template>
  <tile :header="tile.header" :content="tile.content" :mode="mode"
    @new-header="updateHeader(tile.id, $event)"
    @new-content="updateContent(tile.id, $event)"
    @start-dnd="startDnd(tile.id)"
    @cancel-dnd="cancelDnd"
    @place-to-left="placeToSide(tile.id, -1)"
    @place-to-right="placeToSide(tile.id, 1)"
    @remove="removeTile(tile.id)"></tile>
</template>

<script>
import Tile from '@/components/Tile'
import TileMode from '@/components/tile-mode'

export default {
  components: {
    tile: Tile
  },
  data () {
    return {
      tile: {
        id: '0',
        header: 'Header',
        content: 'Content'
      },
      mode: TileMode.DEFAULT
    }
  },
  methods: {
    updateHeader (id, value) {
      console.log(id)
      this.tile.header = value
    },
    updateContent (id, value) {
      console.log(id)
      this.tile.content = value
    },
    startDnd (id) {
      console.log(id)
    },
    cancelDnd () {},
    placeToSide (id, delta) {
      console.log(id, delta)
    },
    removeTile (id) {
      console.log(id)
    }
  }
}
</script>
