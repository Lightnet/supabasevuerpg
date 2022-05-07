<script setup>
// 
import { useRoute } from 'vue-router';
import { supabase } from "../../supabase"
import { store } from "../../store"
import { onMounted, onUpdated, ref, watch } from "vue"
import Modal1 from '../modal/Modal.vue';

const dataName = ref("data");
const dataContent = ref("dataContent");
const route = useRoute();

const boards = ref([]);
//const boardID = ref("");
const topics = ref([]);

const isOpenTopic = ref(false);

function onCloseModalTopic(){
  isOpenTopic.value=false;
}

async function showCreateTopic(){
  isOpenTopic.value=true;
}
store.board.id = route.query.id;

//console.log("route.query")
//console.log(route.query)
//onUpdated(()=>{
  //console.log(route.query)
//})
watch(()=>route.query.id,newVal=>{
  console.log("board newVal")
  console.log(newVal)
  store.board.id=newVal;
})

async function getTopics(){
  try {
    console.log("store.user.id");
    console.log(store.user.id);
    //console.log(store.forum.id)

    let { data, error, status } = await supabase
      .from("graph_topics")
      .select(`id, graph_id, user_id, title, content`)
      .eq("graph_id", store.board.id)

    if (error && status !== 406) throw error
    console.log(data)
    if (data) {
      topics.value = data;
    }
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}

async function createTopic(){
  try {
    console.log("store.user.id");
    console.log(store.user.id);
    console.log(store.forum.id)

    let { data, error, status } = await supabase
      .from("graph_topics")
      .insert({
        graph_id:store.board.id,
        title:dataName.value,
        content:dataContent.value,
      })

    if (error && status !== 406) throw error
    console.log(data)
    if (data) {
      //forumData.value = data;
    }
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}
onMounted(()=>{
  getTopics();
})
</script>
<template>
  <div>
    <label> Boards </label>
    <button @click="showCreateTopic"> Create Topic </button>
  </div>
  <div>
    <div v-for="topic in topics" :key="topic.id" style="background:gray;">
      <label> Topic: </label>
      <router-link :to="'/forum/topic?id='+topic.id"> {{topic.title}} </router-link> 
      <span style="float:right;">
        <button> Edit </button>
        <button> Delete </button>
      </span>
    </div>
  </div>
  <Modal1 :isOpen="isOpenTopic" @onClose="onCloseModalTopic">
    <label> Topic Name: </label> <input /> <br/>
    <label> Content: </label> <textarea /> <br/>
    <button @click="createTopic"> Create Topic </button>
  </Modal1>
  
</template>