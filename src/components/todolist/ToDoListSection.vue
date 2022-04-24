<template>
  <div>
    <div>
      <label> Content: </label>
      <input v-model="content"/>
      <button> Add </button>
    </div>
    <div>
      <div v-for="item in toDoList" :key="item.id">
        <label> {{item.content}} </label>
        <input :name="item.id" :checked="item.isFinish" @change="toggleFinish" /> <label> Is Finish </label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { supabase } from "../../supabase"
import { store } from "../../store"
import { ref, onMounted, onUnmounted, onUpdated } from 'vue';

const content = ref("");
const toDoList = ref([]);

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

function toggleFinish(e){

}


function addToDoList(e){

}
</script>