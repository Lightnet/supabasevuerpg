<script setup>
import { store } from '../store';
console.log(store)
</script>
<template>
  <div>
    <label> Home </label>
  </div>
  <div>
    <label> User ID: {{store?.user.id}}</label>
  </div>
  <div>
    <label> Role: {{store?.user.role}}</label>
  </div>
</template>