# supabasevuerpg

# Status:
- Still testing...
- working on setup.

# Test:
- Tested on window 10 64 bit.

# supabase:
- supabase for client test limited 500 mb. ( free with limited set.)

# Information:
  Work in progresss. Supabase is SQL database as it use client browser token system to query data.

  Supabase has built in features like database trigger, auth, function and other api calls.

  This is prototype project build game developement. As creating the role playing game and application for required access and permission for update, edit, delete, create, ref and other things. By scripting in sql language and other format in database server api.

# Supabase:
  Please note that there will be a lot sql scripts. For setup tables, permissions, functions, triggers and other things to have data query access checks.

  More info on link: 
  - https://supabase.com/docs
  - https://supabase.com/docs/reference/javascript/supabase-client
  - https://postgrest.org/en/stable/

  It base on postgrest database.

  One of the reason is to test the limits of the sql query call from api sql.

Database function call in sql have easy way to check and query access.

# Features:
  Note some are examples base on the supabase turtorials, github, refs and other sites.

  Simple query for debug.

- global chat room (testing)
  - user post id but can't edit others
  - need to remove user id and user proxy id
  - add (added)
  - remove (added)
  - update 
  - filter 
- group message (work in progress)
  - permission
  - view to group id only
  - add
  - remove
  - update
- to do list (testing)
  - add
  - remove
  - update
- forum (not build yet)
- novels (not build yet)
- home base building game (work in progress)
- role playing game (unknown)
- forum (unknown)

# game modes:
- moblie home base
  - building base
  - base defense
  
- role playing game
  - dungeon?
  - explore?

# Dev:
- Note there two testing for vite server and fastity and config different a bit.
- SQL need to learn as with auth check and events for database api access.

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
# sql database and design:
  Design and testing.

  Either by using the function sql to check permission for create, update, delete and views data. By using user id check with auth api.

  One example is delete user account.
  Two example is create their home base or home.

```
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