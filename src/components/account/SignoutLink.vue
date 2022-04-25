<template>
  <a href="#" @click="clickSignOut">Sign Out</a>
</template>
<script setup>
import { supabase } from "../../supabase"
//import { store } from "../../store"
import { ref } from "vue"
const loading = ref(true)

async function clickSignOut(e){
  e.preventDefault();
  //console.log(store)
  try {
    loading.value = true
    let { error } = await supabase.auth.signOut()
    if (error) throw error
    console.log("signout");
    //store.user = null;
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>