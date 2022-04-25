<template>
  <div class='phaser'>
    <div class='phaserviewport'>
      <phaser-container ref="phaserInstance" />
    </div>
  </div>
</template>
<style>
.phaser{
  height: 100%;
}

.phaserviewport{
  width: 800px;
  height: 480px;
}


</style>
<script setup>
//import Phaser from "phaser";
import { ref, onMounted } from "vue";
import PhaserContainer from "./PhaserContainer.vue";

const phaserInstance = ref();

onMounted(()=>{
  console.log(phaserInstance)
  console.log(phaserInstance.value)
  console.log(phaserInstance.value.downloaded)
  console.log(phaserInstance.value.gameInstance)
})

</script>