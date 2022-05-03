<script setup>
import { supabase } from "../../supabase"
import { store } from "../../store"
import { ref, onMounted, onUnmounted, onUpdated } from 'vue';
const refScroll = ref()
const message = ref("");
const groupID = ref("");
// cd80b459-4d32-4878-917d-f9e82578e9b3
const groupInfo = ref(null);
const isGroup = ref(false);
const isAdmin = ref(false);

const memberID = ref("");

const messages = ref([]);
let mySubscription = null;

async function createGroupMessage(){
  try{
    store.user = supabase.auth.user()
    let { data, error, status } = await supabase
      .from("groupmessage_info")
      .insert([{
        name:"group test"
      }])
    if(error){
      console.log(error)
      return;
    }
    console.log(data);
    if(data){
      //messages.value=data;
    }
    console.log("create group")
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  }
}

function scrollToElement() {
  //const el = this.$refs.scrollToMe;
  const el = refScroll.value;
  //console.log(refScroll)

  if (el) {
    // Use el.scrollIntoView() to instantly scroll to the element
    //el.scrollIntoView({behavior: 'smooth'});
    //el.scrollTop = el.clientHeight;
    el.scrollTop = el.scrollHeight;
  }
}

async function typingChatMessage(e){
  console.log("enter...")
  console.log(message.value)
  if(!groupInfo.value){
    console.log("null ID")
    return;
  }
  try {
    store.user = supabase.auth.user()
    //console.log(store.user)
    const { data, error } = await supabase
      .from('groupmessages')
      .insert([
        {
          team_id: groupID.value,
          user_id: store.user.id,
          alias: "USERNAME",
          content: message.value
        }
      ])
    if(error){
      console.log(error);
      return;
    }
    //scrollToElement();
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}
// https://github.com/supabase/supabase/discussions/2741
async function getChatMessage(){
  console.log("get messages")
  try{
    store.user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from("groupmessages")
      .select('id, alias, content, user_id, created_at, team_id')
      .eq('team_id',groupID.value)
      .order('created_at', { ascending: false })
      .limit(30);
    if(error){
      console.log(error)
      return;
    }
    console.log(data);
    if(data){
      // https://www.w3schools.com/js/js_array_sort.asp
      //let dd = data.sort((date1, date2) =>  date1.created_at - date2.created_at);
      //let dd = data.reverse();
      //console.log(dd)
      data.reverse();
      messages.value=data;
    }
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  }
}
// https://supabase.com/docs/reference/javascript/subscribe
async function subChatMessage(){
  try{
    mySubscription = supabase
    .from('groupmessages')
    //.select('id, alias, content, user_id, created_at')
    //.eq('team_id',groupID.value)
    .on('INSERT', payload => {
      console.log('Change received!', payload)
      if(payload.new){
        messages.value = [...messages.value, payload.new]
      }
    })
    .subscribe()
  } catch(e){
    console.log("error chat mySubscription")
    console.log(e)
  }
}

async function JoinGroup(){

  try {
    store.user = supabase.auth.user()
    //console.log(store.user)
    console.log(groupID.value)
    const { data, error } = await supabase
      .from('groupmessage_info')
      .select('id, team_id, user_id')
      .match({team_id: groupID.value})
      //.eq('team_id', groupID.value)
      .single();

      console.log("data");
      console.log(data);
      if(data){
        groupInfo.value = data;
        if(store.user.id == data.user_id){
          console.log("ADMIN TRUE")
          isAdmin.value = true;
        }else{
          console.log("ADMIN FALSE")
        }
        //isAdmin
        isGroup.value=true;
        getChatMessage();
        subChatMessage();
      }
      
    if(error){
      console.log(error);
      return;
    }
    //scrollToElement();
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}

async function leaveGroup(){
  supabase.removeSubscription(mySubscription);
  messages.value=[];
  isGroup.value=false;
  isAdmin.value=false;
  groupInfo.value=null;
}

async function grantUser(){

}

async function revokeUser(){

}

onMounted(()=>{
  //getChatMessage();
  //subChatMessage();
})

onUnmounted(()=>{
  console.log("remove...")
  //supabase.removeSubscription(mySubscription);
  //messages.value=[];
  leaveGroup();
})

onUpdated(()=>{
  scrollToElement();
})

</script>
<template>
  <div style="height:calc(100% - 20px);">
    <div>
      <label> Group ID: </label> 
      <template v-if="!isGroup"> 
      <input v-model="groupID" />
      <button @click="JoinGroup"> Join </button>
      <button @click="createGroupMessage"> Create </button>
      <button @click="createGroupMessage"> Add </button>
      <button @click="createGroupMessage"> Delete </button>
      </template>
      <template v-else>
        <label> {{groupID}} </label>
        <button @click="leaveGroup"> Leave </button>
      </template>
      <template v-if="isAdmin">
        <input v-model="memberID" placeholder="User ID" />
        <button @click="grantUser"> Grant </button>
        <button @click="revokeUser"> Revoke </button>
      </template>
    </div>
    <div ref="refScroll" style="height:calc(100% - 40px);overflow-y: scroll;">
      <div v-for="msg in messages">
        <label> {{msg.alias}}: </label>
        <label> {{msg.content}} </label>
      </div>
    </div>
    <div>
      Chat Box <input v-model="message"  v-on:keyup.enter="typingChatMessage" /> <button @click="typingChatMessage"> Send </button>
    </div>
  </div>

</template>