# fastifysupabasevue

# Status:
- Still testing...

# Test:
- Tested on window 10 64 bit.

# supabase:
- supabase for client test limited 500 mb. ( free with limited set.)

# Information:
  Work in progresss. Supabase is SQL database and graph that this app connect directly to client browser using the token system.

  By using the Supabase api and config to set up and connect to database query from browser that is compile to single file.

  To test out the database access. To create simple rpg for save, edit, delete and load tests.

  One is reduce recoding handle from server side handlers.

# Dev:
  Note there two testing for vite server and fastity and config different a bit.

  SQL need to learn as with auth check and events for database access.

# layout:
```
docs // work in progress
src
  - components // vue
  - page // fastify config
  - router // vue router for components
  - views // vue router
  - App.vue // client for vite
  - entry-client // client for vite
  - RoutePage.vue // client for vite
  - store.js // auth / user access
  - supabase.js // auth access
app.mjs // fastify server
index.html // client for vite
vite.config.mjs // client vite config
```
# Config:
.env
```
VITE_SUPABASE_URL=https://<id>.supabase.co
VITE_SUPABASE_ANON_KEY=""
```

```
https://app.supabase.io/project/< project id >/settings/api
Project API keys > anon public > [VITE_SUPABASE_ANON_KEY]

```

# Credits and refs:
- https://github.com/fastify/fastify-vite
- https://vuejsdevelopers.com/2021/03/23/nuxt-vite-fastify/
- https://hire.jonasgalvez.com.br/2022/jan/08/blogging-with-fastify-vite-and-vue-3/
- https://dev.to/rezvitsky/vitejs-ssr-fastify-vuejs-5a40
- https://vitejs.dev/guide/ssr
- https://vueschool.io/articles/vuejs-tutorials/use-supabase-auth-with-vue-js-3/
- https://supabase.com/docs/guides/local-development
- https://vueschool.io/articles/vuejs-tutorials/use-supabase-auth-with-vue-js-3/
- https://supabase.com/docs/reference/javascript/insert