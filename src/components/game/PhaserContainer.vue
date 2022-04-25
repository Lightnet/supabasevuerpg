<template>
  <div class="phaserviewporti" :id="containerId" v-if="downloaded" />
  <div class="placeholder" v-else>
    Loading ...
  </div>
</template>
<style>
.phaserviewporti{
  width:100%;
  height:100%;
}
</style>
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
    const game = await import(/* webpackChunkName: "game" */ './Game.mjs')
    this.downloaded = true
    this.$nextTick(() => {
      console.log("setup")
      this.gameInstance = game.launch(this.containerId)
      console.log("gameInstance")
      console.log(this.gameInstance)
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