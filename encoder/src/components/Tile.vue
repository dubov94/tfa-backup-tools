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
        v-model="dataHeader" @change="updateHeader">
      </v-text-field>
    </v-card-title>
    <v-card-text>
      <v-responsive :aspect-ratio="1">
        <v-textarea v-if="displayTextArea" hide-details outlined no-resize
          :rows="10" ref="textArea" v-model="dataContent"
          @change="updateContent" @blur="blurContent">
        </v-textarea>
        <img v-if="displayQrRender" :src="renderUrl" @click="focusContent">
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
    computed: {
      canSwithToRender () {
        return !isStringEmpty(this.dataContent)
      },
      displayTextArea () {
        return this.showSource
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
