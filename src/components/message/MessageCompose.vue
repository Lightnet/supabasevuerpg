<template>
  <div>
    <label>Compose</label>
  </div>
  <div>
    <label> Alias: </label><input v-model="alias" />
  </div>
  <div>
    <label> Message: </label><br />
    <textarea v-model="message" />
  </div>

  <div>
    <button @click="sendMessage"> Sent Message  </button>
  </div>
</template>
<script setup>
import { supabase } from "../../supabase"
import { store } from "../../store"
import { ref } from "vue";
const alias = ref("");
const message = ref("");

async function sendMessage(){
  console.log("sent message");
  console.log(alias.value);
  console.log(message.value);
  try {
    store.user = supabase.auth.user()
    console.log(store.user)

    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          uid: store.user.id,
          alias: alias.value,
          message: message.value
        }
      ])
    if(error){
      console.log(error);
      return;
    }
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}
</script>