
<script setup>
//import Phaser from "phaser";
import GameRoute from "./GameRoute.vue"
import { supabase } from "../../supabase"
import { store } from "../../store"
import { ref, onMounted } from "vue";
import {nanoid32} from "../../lib/"
//import PhaserContainer from "./PhaserContainer.vue";

const phaserInstance = ref();
const isExist = ref(false);
const homeBaseInfo = ref(null);
const baseName = ref("")

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
    let genID = nanoid32();
    let { data, error, status } = await supabase
      .from("homebase")
      .insert([{
        id: store.user.id,
        name: baseName.value,
        base_id: genID
      },]);
      //.select(`user_id, name`)
      //.eq("user_id", store.user.id)
      //.single()
    if (error && status !== 406) throw error

    if (data) {
      //username.value = data.username
    }

  } catch (error) {
    console.log(error.message)
  }

  try {
    /*
    outpost
    -id
    -Name
    -isDamage
    -isLocked
    -map_id
    -location
    -x
    -y
    -z
    
    */
    let { data, error, status } = await supabase
      .from("outpost")
      .insert([{
        user_id: store.user.id,
        gameObjectID: genID,
        name: baseName.value,
      },]);
      //.select(`user_id, name`)
      //.eq("user_id", store.user.id)
      //.single()
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
<template>
  <div class='game'>
    <template v-if="isExist">
      <GameRoute />
      <!--
      <div class='gameviewport'>
        <phaser-container ref="phaserInstance" />
      </div>
      -->
    </template>
    <template v-else>
      <label> Home Base Name: </label> <input /> <button @click="createHomeBase"> Create </button>

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