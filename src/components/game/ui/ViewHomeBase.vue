<script setup>
import { shallowRef, ref } from 'vue';
import ViewBase from "../homebase/ViewBase.vue";
import ViewBuildings from "../homebase/ViewBuildings.vue";
import ViewConstruction from "../homebase/ViewConstruction.vue";
import ViewUnits from "../homebase/ViewUnits.vue";

const view = shallowRef(ViewBase);

const tabs = [
  {name:'Info',comp:ViewBase},
  {name:'Buildings',comp:ViewBuildings},
  {name:'Construction',comp:ViewConstruction},
  {name:'Units',comp:ViewUnits},
]
</script>
<template>
<div>
    <template v-for="tab in tabs">
      <a href="#" @click="view = tab.comp">{{tab.name}}</a> |  
    </template>
  </div>
  <div>
    <component :is="view"></component>
  </div>
</template>