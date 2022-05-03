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
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue')
  },
  {
    path: '/moderator',
    name: 'Moderator',
    component: () => import('../views/Moderator.vue')
  },
  {
    path: '/gamemaster',
    name: 'GameMaster',
    component: () => import('../views/GameMaster.vue')
  },
  {
    path: '/novel',
    name: 'Novel',
    component: () => import('../views/Novel.vue'),
    children: [
      { path: '', component: () => import('../components/novel/NovelPage.vue') },
      { path: 'book', component: () => import('../components/novel/Book.vue') },
      { path: 'novels', component: () => import('../components/novel/Novels.vue') },
      { path: 'bookmark', component: () => import('../components/novel/NovelBookmark.vue') },
      { path: 'options', component: () => import('../components/novel/NovelOptions.vue') },
    ]
  },
  {
    path: '/forum',
    name: 'Forum',
    component: () => import('../views/Forum.vue'),
    children: [
      { path: '', component: () => import('../components/forum/ForumPage.vue') },
      { path: 'board', component: () => import('../components/forum/ForumBoard.vue') },
      { path: 'topic', component: () => import('../components/forum/ForumTopic.vue') },
      { path: 'comment', component: () => import('../components/forum/ForumComment.vue') },
      { path: 'bookmark', component: () => import('../components/forum/ForumBookmark.vue') },
      { path: 'options', component: () => import('../components/forum/ForumOptions.vue') },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;