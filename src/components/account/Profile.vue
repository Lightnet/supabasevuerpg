<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="store.user.email" disabled />
    </div>
    <div>
      <label for="username">Name</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="website" v-model="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button block primary"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">
        Sign Out
      </button>
    </div>
  </form>
  <div>
    <button @click="getData"> Test get </button>
    <button @click="getsetData"> Test set get </button>
  </div>
</template>

<script>
// https://supabase.com/docs/guides/with-vue-3
// https://supabase.com/docs/reference/javascript/auth-update#update-a-users-metadata
import { supabase } from "../../supabase"
import { store } from "../../store"
import { onMounted, ref } from "vue"

export default {
  setup() {
    const loading = ref(true)
    const username = ref("")
    const website = ref("")
    const avatar_url = ref("")

    async function getProfile() {
      try {
        loading.value = true
        store.user = supabase.auth.user()
        console.log("store.user.id");
        console.log(store.user.id);

        let { data, error, status } = await supabase
          .from("profiles")
          .select(`username, website, avatar_url`)
          .eq("id", store.user.id)
          .single()

        if (error && status !== 406) throw error

        if (data) {
          username.value = data.username
          website.value = data.website
          avatar_url.value = data.avatar_url
        }
      } catch (error) {
        console.log(error.message)
        //alert(error.message)
      } finally {
        loading.value = false
      }
    }

    async function updateProfile() {
      console.log("update profile");
      try {
        loading.value = true
        store.user = supabase.auth.user()

        const updates = {
          id: store.user.id,
          username: username.value,
          website: website.value,
          avatar_url: avatar_url.value,
          updated_at: new Date(),
        }

        let { error } = await supabase.from("profiles").upsert(updates, {
          returning: "minimal", // Don't return the value after inserting
        })

        if (error) throw error
      } catch (error) {
        //alert(error.message)
        console.log(error.message)
      } finally {
        loading.value = false
      }
    }

    async function signOut() {
      console.log("signout");
      try {
        loading.value = true
        let { error } = await supabase.auth.signOut()
        if (error) throw error
      } catch (error) {
        console.log(error.message)
        //alert(error.message)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      getProfile()
    })

    async function getData(){
      console.log("get data test")
      const { data, error } = await supabase
        .from('cities')
        .select()

        console.log(data)
        console.log(error)
    }

    async function getsetData(){
      console.log("set data test")
      const { data, error } = await supabase
        .from('cities')
        .insert([
          { name: 'The Shire' }
        ])

        console.log(data)
        console.log(error)
    }

    return {
      store,
      loading,
      username,
      website,
      avatar_url,

      updateProfile,
      signOut,

      getData,
      getsetData,
    }
  },
}
</script>
