<script setup>
import { onMounted, ref } from "vue"
import { supabase } from "../../supabase"
import { store } from "../../store"
import Modal1 from "../modal/Modal.vue";

const boards = ref([]);
const forumName = ref("gboard");
const forumDescription = ref("gdescription");

const isOpen = ref(false);

async function getBoards(){
  try {
    console.log("store.user.id");
    console.log(store.user.id);
    console.log(store.forum.id)

    let { data, error, status } = await supabase
      .from("graph_boards")
      .select(`id, graph_id, user_id, title, content`)
      .eq("graph_id", store.forum.id)

    if (error && status !== 406) throw error
    console.log(data)
    if (data) {
      boards.value = data;
    }
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}

async function createBoard(){
  try {
    console.log("store.user.id");
    console.log(store.user.id);
    console.log(store.forum.id)

    let { data, error, status } = await supabase
      .from("graph_boards")
      .insert({
        graph_id:store.forum.id,
        title:forumName.value,
        content:forumDescription.value,
      })

    if (error && status !== 406) throw error
    console.log(data)
    if (data) {
      forumData.value = data;
    }
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}

function openCreateBoard(){
  isOpen.value = true;
}

function onCloseModal(){
  //console.log("CLOSE??")
  isOpen.value = false;
}

onMounted(()=>{
  getBoards();
})

</script>

<template>
  <div>
    <button @click="openCreateBoard"> Create Board</button>
  </div>
  <div>
    <div v-for="board in boards">
      <div style="background:gray;">
        <label> Board:  </label> <router-link :to="'/forum/board?id='+board.id"> {{board.title}} </router-link> 
        <span style="float:right;">
          <button> Edit </button>
          <button> Delete </button>
        </span>
      </div>
      <div>
        <label> {{board.content}} </label>
      </div>
    </div>  
  </div>
  <Modal1 :isOpen="isOpen" @onClose="onCloseModal">
    <label> Create Board:</label><br />
    <label> Name </label> <input v-model="forumName" /><br />
    <label> Description </label> <input v-model="forumDescription" /><br />
    <button @click="createBoard"> Create </button>
  </Modal1>
</template>