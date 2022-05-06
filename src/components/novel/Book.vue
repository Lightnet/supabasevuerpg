<script setup>
// https://router.vuejs.org/guide/advanced/composition-api.html
// https://router.vuejs.org/guide/essentials/passing-props.html
import { useRoute } from 'vue-router';
import { ref, watch, watchEffect, onUpdated } from 'vue';

const route = useRoute();
const books = ref([]);
//const userData = ref();
console.log(route)

// fetch the user information when params change
watch(
  () => route.query.id,
  async newId => {
    console.log("newId")
    console.log(newId)
    //userData.value = await fetchUser(newId)
  }
)

//console.log(route.params)
//console.log(route.query)
onUpdated(()=>{
  //console.log(route.params)
  //console.log(route.query)
  //console.log(route)
})

function newBook(){

}

function editBook(id){

}
function deleteBook(id){

}
</script>
<template>
  <div>
    <label> Book </label> | 
    <button @click="newBook"> New </button> | 
    <!--
    <router-link to="/novel/book?id=test1"> Test1 </router-link> | 
    <router-link to="/novel/book?id=test2"> Test2 </router-link> | 
    -->
  </div>
  <div>
    <div v-for="book in books">
      <label> {{book.title}} </label>
      <button @click="editBook(book.id)"> Edit </button>
      <button @click="deleteBook(book.id)"> Delete </button>
    </div>
  </div>
  
</template>