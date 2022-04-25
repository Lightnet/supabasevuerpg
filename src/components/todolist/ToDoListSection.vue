<template>
  <div>
    <div>
      <label> Content: </label>
      <input v-model="content"/>
      <button @click="addToDoList"> Add </button>
    </div>
    <div>
      <div v-for="item in toDoList" :key="item.id">
        <label @click="toggleEdit(item.id)"> [ :Edit: ] </label>
        <template v-if="editid==item.id">
          <input v-model="item.content" :name="item.id" @change="updateContent"/>
        </template>
        <template v-else>
          <label> {{item.content}} </label>
        </template>
        <input type="checkbox" :name="item.id" :checked="item.isFinish" @change="toggleFinish" /> <label> Is Finish </label>
        <button @click="deleteToDoList(item.id)"> Delete? </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { supabase } from "../../supabase"
import { store } from "../../store"
import { ref, onMounted, onUnmounted, onUpdated } from 'vue';

const editid = ref("")
const content = ref("");
const toDoList = ref([]);

function toggleEdit(id){
  console.log(id)
  if(editid.value == id){
    editid.value = "";
  }else{
    //editid.value = "";
    editid.value = id;
  }
}

async function getToDoList(){
  console.log("get messages")
  try{
    store.user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from("todolist")
      //.select('id, alias, message, user_id, created_at')
      //.order('created_at', { ascending: false })
      //.limit(30)
      ;

    if(error){
      console.log(error)
      return;
    }
    console.log(data);
    if(data){
      toDoList.value=data
    }
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  }
}

async function updateContent(e){
  try{
    const updates = {
      id: e.target.name,
      user_id: store.user.id,
      content: e.target.value
    }

    let { error } = await supabase.from("todolist").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    })
  }catch(e){
    console.log("update error...")
  }
}

async function toggleFinish(e){

  try{
    const updates = {
      id: e.target.name,
      user_id: store.user.id,
      isFinish: e.target.checked
    }

    let { error } = await supabase.from("todolist").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    })
  }catch(e){
    console.log("update error...")
  }
}

async function addToDoList(e){
  console.log("add?")
  try {
    store.user = supabase.auth.user()
    //console.log(store.user)
    const { data, error } = await supabase
      .from('todolist')
      .insert([
        {
          user_id: store.user.id,
          content: content.value,
          isFinish:false
        }
      ])
    if(error){
      console.log(error);
      return;
    }
    console.log(data)
    getToDoList();
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}

async function deleteToDoList(id){
  console.log("delete?")
  try {
    store.user = supabase.auth.user()
    //console.log(store.user)
    const { data, error } = await supabase
      .from('todolist')
      .delete()
      .match({id:id})
    if(error){
      console.log(error);
      return;
    }
    console.log(data)
    getToDoList();
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}

onMounted(()=>{
  getToDoList();
})
</script>