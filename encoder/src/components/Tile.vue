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

  .v-textarea,
  .v-textarea >>> .v-input__control,
  .v-textarea >>> .v-input__control > .v-input__slot,
  .v-textarea >>> .v-input__control > .v-input__slot > .v-text-field__slot,
  .v-textarea >>> .v-input__control > .v-input__slot > .v-text-field__slot > textarea {
    height: 100%;
  }
</style>

<template>
  <v-card>
    <v-btn fab small class="chevron--left" @click="placeToLeft"
      v-if="isDndTarget" color="primary">
      <v-icon>chevron_left</v-icon>
    </v-btn>
    <v-card-title>
      <v-text-field ref="label" hide-details outlined label="Label"
        v-model="dataHeader" @change="updateHeader">
      </v-text-field>
    </v-card-title>
    <v-card-text>
      <v-responsive :aspect-ratio="1">
        <v-textarea hide-details outlined no-resize
          :rows="4" v-if="displayTextArea" ref="textArea" label="Data to encode" v-model="dataContent"
          @change="updateContent" @blur="blurContent">
        </v-textarea>
        <img v-if="displayQrRender" :src="renderUrl" @click="focusContent">
      </v-responsive>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon v-if="!isDndSource && !isDndTarget" @click="startDnd">
        <v-icon>open_with</v-icon>
      </v-btn>
      <v-btn icon v-if="isDndSource" @click="cancelDnd" color="error">
        <v-icon>block</v-icon>
      </v-btn>
      <v-btn icon @click="remove">
        <v-icon>delete</v-icon>
      </v-btn>
    </v-card-actions>
    <v-btn fab small class="chevron--right" @click="placeToRight"
      v-if="isDndTarget" color="primary">
      <v-icon>chevron_right</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
  import qrCode from 'qrcode'
  import TileMode from '@/components/tile-mode'

  const isStringEmpty = (string) => string === ''

  export default {
    props: ['header', 'content', 'mode'],
    data () {
      return {
        showSource: isStringEmpty(this.content),
        dataHeader: this.header,
        dataContent: this.content,
        renderUrl: null
      }
    },
    async created () {
      if (this.canSwithToRender) {
        await this.updateRender()
      }
    },
    mounted () {
      this.$refs.label.focus()
    },
    computed: {
      canSwithToRender () {
        return !isStringEmpty(this.dataContent)
      },
      displayTextArea () {
        return true // this.showSource
      },
      displayQrRender () {
        return false // this.renderUrl !== null && !this.displayTextArea
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
        this.renderUrl = await qrCode.toDataURL(this.dataContent)
      },
      updateHeader (value) {
        this.$emit('new-header', value)
      },
      updateContent (value) {
        this.$emit('new-content', value)
      },
      async blurContent () {
        if (this.canSwithToRender) {
          await this.updateRender()
          this.showSource = false
        }
      },
      async focusContent () {
        this.showSource = true
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
    },
    watch: {
      async content (newValue) {
        if (newValue !== this.dataContent) {
          this.dataContent = newValue
          this.showSource = isStringEmpty(newValue)
          if (!this.showSource) {
            await this.updateRender()
          }
        }
      },
      header (newValue) {
        if (newValue !== this.dataHeader) {
          this.dataHeader = newValue
        }
      }
    }
  }
</script>
