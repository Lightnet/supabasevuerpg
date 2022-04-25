<script setup>
import SignoutLink from './components/account/SignoutLink.vue';

</script>
<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/profile">Profile</router-link> |
    <router-link to="/message">Message</router-link> |
    <router-link to="/publicchat">Public Chat</router-link> |
    <router-link to="/groupchat">Group Chat</router-link> |
    <router-link to="/game">Game</router-link> |
    <router-link to="/todolist"> To Do List</router-link> |
    <signout-link/>
  </div>
  <router-view/>
</template>