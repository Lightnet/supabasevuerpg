<script setup>
import { supabase } from "../../supabase"
import { store } from "../../store"
import { ref, onMounted, onUnmounted, onUpdated } from 'vue';
const refScroll = ref()
const message = ref("");
const groupID = ref("");

const memberID = ref("");

const messages = ref([]);
let mySubscription = null;

async function createGroupMessage(){
  try{
    store.user = supabase.auth.user()
    let { data, error, status } = await supabase
      .from("groupmessage")
      .select('id, alias, message, user_id, created_at')
      .order('created_at', { ascending: false })
      .limit(30);
    if(error){
      console.log(error)
      return;
    }
    console.log(data);
    if(data){
      //messages.value=data;
    }
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  }
}


function scrollToElement() {
  //const el = this.$refs.scrollToMe;
  const el = refScroll.value;
  console.log(refScroll)

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
  try {
    store.user = supabase.auth.user()
    //console.log(store.user)
    const { data, error } = await supabase
      .from('groupmessage')
      .insert([
        {
          user_id: store.user.id,
          alias: "USERNAME",
          message: message.value
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

async function getChatMessage(){
  console.log("get messages")
  try{
    store.user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from("groupmessage")
      .select('id, alias, message, user_id, created_at')
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
    .from('groupmessage')
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

onMounted(()=>{
  getChatMessage();
  subChatMessage();
})

onUnmounted(()=>{
  console.log("remove...")
  supabase.removeSubscription(mySubscription)
})

onUpdated(()=>{
  scrollToElement();
})

</script>
<template>
  <div style="height:calc(100% - 20px);">
    <div>
      <label> Group ID: </label> <input v-model="groupID" /> <button> Join </button>
      <button> Create </button>

      <input v-model="memberID" />
      <button> Grant </button>
      <button> Revoke </button>
    </div>
    <div ref="refScroll" style="height:calc(100% - 40px);overflow-y: scroll;">
      <div v-for="msg in messages">
        <label> {{msg.alias}}: </label>
        <label> {{msg.message}} </label>
      </div>
    </div>
    <div>
      Chat Box <input v-model="message"  v-on:keyup.enter="typingChatMessage" /> <button> Send </button>
    </div>
  </div>

</template>