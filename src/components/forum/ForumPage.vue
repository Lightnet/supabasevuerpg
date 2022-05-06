<script setup>
// 
import { supabase } from "../../supabase"
import { store } from "../../store"
import { onMounted, ref } from "vue"
import ViewBoard from "./ViewBoard.vue"

const forumData = ref(null);
const forumName = ref("gforum");
const forumDescription = ref("gdescription");

async function checkForum(){
  try {
    //loading.value = true
    //store.user = supabase.auth.user()
    //console.log("store.user.id");
    console.log(store.user.id);

    let { data, error, status } = await supabase
      .from("forum")
      .select(`id, user_id, title, content`)
      .eq("user_id", store.user.id)
      .single()

    if (error && status !== 406) throw error
    console.log(data)
    if (data) {
      forumData.value = data;
      store.forum = data;
    }
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}

async function createForum(){

  try {
    console.log("store.user.id");
    console.log(store.user.id);

    let { data, error, status } = await supabase
      .from("forum")
      .insert({
        title:forumName.value,
        content:forumDescription.value,
      })

    if (error && status !== 406) throw error
    console.log(data)
    if (data) {
      forumData.value = data;
      store.forum = data;
    }
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}

onMounted(()=>{
  checkForum();
})
</script>
<template>
  <div>
    <label> Home </label><br/>
    <template v-if="forumData">
      <label> ID:{{forumData.id}} </label><br/>
      <label> Name:{{forumData.title}} </label><br/>
      <label> Description:{{forumData.content}} </label><br/>
      <view-board></view-board>

    </template>
    <template v-else>
      <label> Create Forum </label>
      <input v-model="forumName" placeholder="Name"/>
      <input v-model="forumDescription" placeholder="Description"/>
      <button @click="createForum"> Create </button>
    </template>

  </div>
</template>