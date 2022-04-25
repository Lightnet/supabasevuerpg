<template>
  <div :id="containerId" v-if="downloaded" />
  <div class="placeholder" v-else>
    Downloading ...
  </div>
</template>

<script>
export default {
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: 'game-container'
    }
  },
  async mounted() {
    const game = await import(/* webpackChunkName: "game" */ './GameTest.mjs')
    this.downloaded = true
    this.$nextTick(() => {
      console.log("setup")
      this.gameInstance = game.launch(this.containerId)
    })
  },
  unmounted() {
    this.gameInstance.destroy(false)
  }
}
</script>

<style>
.placeholder {
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
}
</style>