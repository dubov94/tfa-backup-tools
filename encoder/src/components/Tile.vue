<style scoped>
  img {
    display: block;
    cursor: pointer;
    width: 100%;
    height: auto;
    image-rendering: pixelated;
    border: 1px solid rgba(0, 0, 0, 0.24);
    border-radius: 4px;
  }

  .chevron--left,
  .chevron--right {
    position: absolute;
    top: 50%;
  }

  .chevron--left {
    left: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }

  .chevron--right {
    right: 0;
    transform: translate(50%, -50%) scale(0.5);
  }
</style>

<template>
  <v-card>
    <v-btn fab small class="chevron--left" @click="placeToLeft"
      v-if="isDndTarget" color="primary">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-card-title>
      <v-text-field hide-details outlined label="Label"
        :value="header" @input="updateHeader">
      </v-text-field>
    </v-card-title>
    <v-card-text>
      <v-responsive :aspect-ratio="1">
        <v-textarea v-if="displayTextArea" hide-details outlined no-resize
          :rows="10" ref="textArea" :value="content" @input="updateContent"
          @blur="disableEditing">
        </v-textarea>
        <img v-if="displayQrRender" :src="renderUrl" @click="enableEditing">
      </v-responsive>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon v-if="!isDndSource && !isDndTarget" @click="startDnd">
        <v-icon>mdi-arrow-all</v-icon>
      </v-btn>
      <v-btn icon v-if="isDndSource" @click="cancelDnd" color="error">
        <v-icon>mdi-cancel</v-icon>
      </v-btn>
      <v-btn icon @click="remove">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-card-actions>
    <v-btn fab small class="chevron--right" @click="placeToRight"
      v-if="isDndTarget" color="primary">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
  import TileMode from '@/components/tile-mode'
  import QrCode from 'qrcode'

  const isStringEmpty = (string) => string === ''

  export default {
    props: ['header', 'content', 'mode'],
    data () {
      return {
        editing: isStringEmpty(this.content),
        renderUrl: null
      }
    },
    async created () {
      await this.updateRender()
    },
    computed: {
      displayTextArea () {
        return this.editing
      },
      displayQrRender () {
        return this.renderUrl !== null && !this.displayTextArea
      },
      isDndSource () {
        return this.mode === TileMode.DND_SOURCE
      },
      isDndTarget () {
        return this.mode === TileMode.DND_TARGET
      }
    },
    methods: {
      async updateRender () {
        window.QrCode = QrCode
        this.renderUrl = isStringEmpty(this.content)
          ? null : await QrCode.toDataURL(this.content)
      },
      updateHeader (value) {
        this.$emit('new-header', value)
      },
      updateContent (value) {
        this.$emit('new-content', value)
      },
      async disableEditing () {
        await this.updateRender()
        this.editing = false
      },
      async enableEditing () {
        this.editing = true
        this.renderUrl = null
        await this.$nextTick()
        this.$refs.textArea.focus()
      },
      startDnd () {
        this.$emit('start-dnd')
      },
      cancelDnd () {
        this.$emit('cancel-dnd')
      },
      placeToLeft () {
        this.$emit('place-to-left')
      },
      placeToRight () {
        this.$emit('place-to-right')
      },
      remove () {
        this.$emit('remove')
      }
    }
  }
</script>
