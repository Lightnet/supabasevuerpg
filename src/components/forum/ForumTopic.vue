<script setup>
// 
import { useRoute } from 'vue-router';
import { supabase } from "../../supabase"
import { store } from "../../store"
import { onMounted, onUpdated, ref, watch } from "vue"
import Modal1 from '../modal/Modal.vue';

const isOpenComment = ref(false);

const route = useRoute();
store.topic.id = route.query.id;
const topic = ref(null);
const comments = ref([])
const dataName = ref("data");
const dataContent = ref("dataContent");
//console.log("store.topic.id")
//console.log(store.topic.id)

async function getTopic(){
  try {
    console.log("store.user.id");
    console.log(store.user.id);
    //console.log(store.forum.id)

    let { data, error, status } = await supabase
      .from("graph_topics")
      .select(`id, graph_id, user_id, title, content`)
      .eq("id", store.topic.id)
      .single();

    if (error && status !== 406) throw error
    console.log("topic data")
    console.log(data)
    if (data) {
      topic.value = data;
    }
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}

async function getComments(){
  try {
    console.log("store.user.id");
    console.log(store.user.id);
    //console.log(store.forum.id)

    let { data, error, status } = await supabase
      .from("graph_comments")
      .select(`id, graph_id, user_id, title, content`)
      .eq("graph_id", store.topic.id)

    if (error && status !== 406) throw error
    console.log("data comments")
    console.log(data)
    if (data) {
      comments.value = data;
    }
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}

function onCloseModalComment(){
  isOpenComment.value=false;
}

async function showCreateComment(){
  isOpenComment.value=true;
}

async function createComment(){
  try {
    console.log("store.user.id");
    console.log(store.user.id);
    //console.log(store.forum.id)

    let { data, error, status } = await supabase
      .from("graph_comments")
      .insert({
        graph_id:store.topic.id,
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
  getTopic();
  getComments();
})
</script>
<template>
  <div>
    <div style="background:gray;">
      <label> Topic {{topic?.title}}</label>
    </div>
    <div>
      <label> Topic {{topic?.content}}</label>
    </div>
  </div>
  <div>
    <div v-for="comment in comments" :key="comment.id" >
      <div style="background:gray;">
        <label> Comment: </label>
        <span style="float:right;">
          <button> Edit </button>
          <button> Delete </button>
        </span>
      </div>
      <div>
        {{comment.content}}
      </div>
    </div>
  </div>
  <div style="background:gray;">
    <button @click="showCreateComment"> Post Comment </button>
  </div>
  <Modal1 :isOpen="isOpenComment" @onClose="onCloseModalComment">
    <label> Title: </label> <input v-model="dataName" /> <br/>
    <label> Content: </label> <textarea v-model="dataContent" /> <br/>
    <button @click="createComment"> Post Comment </button>
  </Modal1>
</template>