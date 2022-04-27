<template>
  <div style="height:calc(100% - 20px);">
    <div ref="refScroll" style="height:calc(100% - 20px);overflow-y: scroll;">
      <div v-for="msg in messages">
        <button @click="deleteMessage(msg.id)"> X </button>
        <label> {{msg.alias}}: </label>
        <label> {{msg.content}} </label>
        
      </div>
    </div>
    <div>
      Chat Box <input v-model="message"  v-on:keyup.enter="typingChatMessage" />
    </div>
  </div>
</template>
<script setup>
import { supabase } from "../../supabase"
import { store } from "../../store"
import { ref, onMounted, onUnmounted, onUpdated } from 'vue';
const refScroll = ref()
const message = ref("");
const messages = ref([]);
let mySubscription = null;

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
  //console.log("enter...")
  //console.log(message.value)
  try {
    store.user = supabase.auth.user()
    //console.log(store.user)
    const { data, error } = await supabase
      .from('chatmessages')
      .insert([
        {
          //user_id: store.user.id,
          alias: "USERNAME",
          content: message.value
        }
      ])
    if(error){
      console.log(error);
      return;
    }
    //scrollToElement();
    console.log("send message")
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
  }
}

async function getChatMessage(){
  //console.log("get messages")
  try{
    store.user = supabase.auth.user()

    let { data, error, status } = await supabase
      .from("chatmessages")
      .select('id, alias, content, user_id, created_at')
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
    .from('chatmessages')
    .on('INSERT', payload => {
      console.log('Change received!', payload)
      if(payload.new){
        messages.value = [...messages.value, payload.new]
      }
    })
    .on('DELETE', payload => {
      console.log('Change received!', payload)
      if(payload.new){
        //console.log(payload)
        messages.value = messages.value.filter(item=>item.id!=payload.old.id)
        //messages.value = [...messages.value, payload.new]
      }
    })
    .subscribe()
  } catch(e){
    console.log("error chat mySubscription")
    console.log(e)
  }
}

async function deleteMessage(id){
  try {
    store.user = supabase.auth.user()
    //console.log(store.user)
    const { data, error } = await supabase
      .from('chatmessages')
      .delete()
      .match({ id: id })
    if(error){
      console.log(error);
      return;
    }
    //scrollToElement();
    console.log("send message")
  } catch (error) {
    console.log(error.message)
    //alert(error.message)
  } finally {
    //loading.value = false
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