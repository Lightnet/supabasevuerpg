<template>
  <form class="row flex flex-center" >
    <div class="col-6 form-widget">
      <h1 class="header">Supabase + Vue 3</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        
        <input
          class="checkbox"
          type="checkbox"
          placeholder="passphrase"
          :checked="passwordless"
          @change="(e)=>passwordless=e.target.checked"
        />
        <label> Passwordless </label>
      </div>
      <div>
        <input
          class="inputField"
          type="email"
          placeholder="Your email"
          v-model="email"
        />
      </div>
      <div v-if="passwordless==false">
        <input
          class="inputField"
          type="password"
          placeholder="passphrase"
          v-model="passphrase"
        />
      </div>
      <div >
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
          @click="handleLogin"
        />

        <button
          class="button block"
          :disabled="loading"
          @click="handleSignup"
        >
        Sign up
        </button>
      </div>
    </div>
  </form>
</template>

<script>
// https://supabase.com/docs/reference/javascript/auth-signup#sign-up-with-additional-user-meta-data
//@submit.prevent="handleLogin"
import { ref } from "vue"
import { supabase } from "../../supabase"

export default {
  setup() {
    const loading = ref(false)
    const email = ref("")
    const passwordless = ref(false);
    const passphrase = ref("");

    const handleLogin = async (e) => {
      e.preventDefault();
      if(passwordless.value==true){
        try {
          loading.value = true
          const { error } = await supabase.auth.signIn({ email: email.value })
          if (error) throw error
          //alert("Check your email for the login link!")
        } catch (error) {
          //alert(error.error_description || error.message)
        } finally {
          loading.value = false
        }
      }else{
        try {
          loading.value = true
          const { error } = await supabase.auth.signIn({
            email: email.value,
            password: passphrase.value
          })
          if (error) throw error
          //alert("Check your email for the login link!")
        } catch (error) {
          //alert(error.error_description || error.message)
        } finally {
          loading.value = false
        }
      }
      console.log("???")
    }

    const handleSignup = async (e) => {
      e.preventDefault();
      console.log("signup")
      if(passwordless.value==true){

      }else{
        try {
          loading.value = true
          const {user, session ,error } = await supabase.auth.signUp({
            email: email.value,
            password: passphrase.value
            
            },{
              data:{
                username:"test",
                age:"20"
              }
            })
          if (error) throw error
          //alert("Check your email for the login link!")
          console.log("user");
          console.log(user);
          console.log("session");
          console.log(session);


        } catch (error) {
          //alert(error.error_description || error.message)
        } finally {
          loading.value = false
        }
      }
    }

    return {
      passwordless,
      loading,
      email,
      passphrase,
      handleLogin,
      handleSignup,
    }
  },
}
</script>