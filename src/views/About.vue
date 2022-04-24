<script setup>
import { version as vvue3 } from 'vue'
import { getCurrentInstance } from 'vue'
const vvue = vvue3;
const vueroute = "4.0.14";
const vsupabase = "1.35.1";
const ctx = getCurrentInstance();
console.log(ctx)

</script>
<template>
  <div>
    <label>Vue version: {{vvue}}</label>
  </div>
  <div>
    <label>Vue Router version: {{vueroute}}</label>
  </div>
  <div>
    <label>@supabase/supabase-js: {{vsupabase}}</label>
  </div>
</template>