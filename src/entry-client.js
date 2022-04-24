

import "./styles/global.css"

import { createApp } from 'vue'
import App from './App.vue'
import Routes from "./router";
// https://market.ionicframework.com/plugins/ionphaser
// https://vuedose.tips/build-a-game-in-vuejs-with-phaser
// https://github.com/proyecto26/ion-phaser/issues/29
// https://github.com/Sun0fABeach/vue-phaser3
//import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
//const { defineCustomElements as defineIonPhaser } = import('@ion-phaser/core/loader');

//defineIonPhaser(window);

const app = createApp(App)
app.use(Routes)
//console.log("app");
//console.log(app);
//app.config
// treat all tags starting with 'ion-' as custom elements
//app.config.compilerOptions.isCustomElement = (tag) => {
  //return tag.startsWith('ion-')
//}

// Only works if using in-browser compilation.
// If using build tools, see config examples below.
//app.config.compilerOptions.isCustomElement = (tag) => tag.includes('ion-')
//app.config.productionTip = false;
//app.config.ignoredElements = [/ion-\w*/];

//app.config.ignoredElements = [/ion-\w*/];
//app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith("ion-")

app.mount('#app');
console.log("vue finish setup...")