<template>
  <div>
    <label>Inbox</label>
  </div>
  <div>
    <div v-for="message in messages" :key="message.id">
      <label>ID: {{message.id}} From: {{message.alias}}</label>
    </div>
  </div>
</template>
<script setup>
import { supabase } from "../../supabase"
import { store } from "../../store"
import { onMounted, ref } from "vue"

const messages = ref([]);

async function getMessages() {
  try {
  const { data, error } = await supabase
    .from('messages')
    .select()
    if(error){
      console.log(error);
      return;
    }

    console.log(data)
    messages.value = data
    
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}


onMounted(() => {
  getMessages()
})
</script>