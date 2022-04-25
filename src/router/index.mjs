import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import('../views/Message.vue'),
    children: [
      { path: '', component: () => import('../components/message/MessagePage.vue') },
      { path: 'inbox', component: () => import('../components/message/MessageInbox.vue') },
      { path: 'compose', component: () => import('../components/message/MessageCompose.vue') },
      { path: 'settings', component: () => import('../components/message/MessageSettings.vue') },
    ]
  },
  {
    path: '/publicchat',
    name: 'PublicChat',
    component: () => import('../views/PublicChat.vue')
  },
  {
    path: '/groupchat',
    name: 'GroupChat',
    component: () => import('../views/GroupChat.vue')
  },
  {
    path: '/todolist',
    name: 'ToDoList',
    component: () => import('../views/ToDoList.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('../views/Game.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;