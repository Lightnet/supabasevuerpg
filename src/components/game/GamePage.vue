<template>
  <div class='game'>
    <GameRoute />
    <template v-if="isExist">
      <GameRoute />
      <!--
      <div class='gameviewport'>
        <phaser-container ref="phaserInstance" />
      </div>
      -->
    </template>
    <template v-else>
      <label> Home Base Name: </label> <input /> <button> Create </button>

    </template>
  </div>
</template>
<style>
.game{
  height: 100%;
}

.gameviewport{
  width: 800px;
  height: 480px;
}
</style>
<script setup>
//import Phaser from "phaser";
import GameRoute from "./GameRoute.vue"
import { supabase } from "../../supabase"
import { store } from "../../store"
import { ref, onMounted } from "vue";
import PhaserContainer from "./PhaserContainer.vue";

const phaserInstance = ref();
const isExist = ref(false);

const homeBaseInfo = ref(null);

async function getHomeBase(){
  try {
    let { data, error, status } = await supabase
      .from("homebase")
      .select(`user_id, name`)
      .eq("user_id", store.user.id)
      .single()
    if (error && status !== 406) throw error

    if (data) {
      //username.value = data.username
    }

  } catch (error) {
    console.log(error.message)
  }
}

async function createHomeBase(){
  try {
    let { data, error, status } = await supabase
      .from("homebase")
      .select(`user_id, name`)
      .eq("user_id", store.user.id)
      .single()
    if (error && status !== 406) throw error

    if (data) {
      //username.value = data.username
    }

  } catch (error) {
    console.log(error.message)
  }
}

onMounted(()=>{
  console.log(isExist.value)
  //console.log(phaserInstance)
  //console.log(phaserInstance.value)
  //console.log(phaserInstance.value.downloaded)
  //console.log(phaserInstance.value.gameInstance)
  console.log(store.user)
})

</script>