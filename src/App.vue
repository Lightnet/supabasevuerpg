<script>
import { store } from "./store"
import { supabase } from "./supabase"
import Auth from "./components/account/Auth.vue"
import Profile from "./components/account/Profile.vue"
import RoutePage from "./RoutePage.vue";

export default {
  components: {
    Auth,
    Profile,
    RoutePage,
  },

  setup() {
    store.user = supabase.auth.user()
    supabase.auth.onAuthStateChange((_, session) => {
      console.log("session")
      console.log(session)
      //if(!session){
        //store.user = {}
        //return;
      //}
      store.user = session.user
    })

    return {
      store,
    }
  },
}
</script>

<template>
  <div class="routecontent">
    <!--
    <Profile v-if="store.user" />
    -->
    <route-page v-if="store.user" />
    <Auth v-else />
  </div>
</template>

<style>
.routecontent{
  height:100%;
}
</style>