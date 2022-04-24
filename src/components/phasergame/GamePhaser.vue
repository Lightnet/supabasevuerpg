<template>
  <div class='phaser'>
    <div  @click="initializeGame"  class="flex" >
      <a  href="#1"  class="btn">Initialize</a>
    </div>
    <div>
      <GameContainer/>
    </div>
    
  </div>
</template>
<style>
.phaser{
  height: 100%;
}
</style>
<script setup>
import Phaser from "phaser";
import GameTest from "./GameContainer.vue";

/*
export default {
  data() {
    return {
      initialize: false,
      game: {
        width: "100%",
        height: "100%",
        type: Phaser.AUTO,
        scene: {
          init() {
            this.cameras.main.setBackgroundColor("#24252A");
          },
          create() {
            this.helloWorld = this.add.text(
              this.cameras.main.centerX,
              this.cameras.main.centerY,
              "Hello World",
              { font: "40px Arial",  fill: "#ffffff" }
            );
            this.helloWorld.setOrigin(0.5);
          },
          update() {
            this.helloWorld.angle += 1;
          }
        }
      }
    };
  },
  methods: {
    initializeGame(e) {
      e.preventDefault();
      console.log("init")
      this.initialize = true;
    }
  }
};
*/
</script>