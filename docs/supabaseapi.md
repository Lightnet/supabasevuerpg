

- https://dev.to/razvanstatescu/how-to-run-custom-sql-queries-using-functions-in-supabase-2nna


# roles:
- https://www.reddit.com/r/Supabase/comments/rcvppc/creating_user_roles_at_signup/







# sql:
- https://www.youtube.com/watch?v=0LvCOlELs5U
```sql
select * from auth.users;
```

# predefine:
  for sql predefeind for account api and auth checks script and call.


- https://supabase.com/docs/guides/auth/row-level-security


```
(uid() = id)
```


example
```
//access, table name
public.profiles 
//query access
select
// everyone all
true
```

```sql
-- 1. Create table
create table profiles (
  id uuid references auth.users,
  avatar_url text
);

-- 2. Enable RLS
alter table profiles
  enable row level security;

-- 3. Create Policy
create policy "Public profiles are viewable by everyone."
  on profiles for select using (
    true
  );
```


```sql
auth.role <> 'authenticated'
```






## SQL Editor:
```sql
create table Test (
  id uuid default uuid_generate_v4() primary key,
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  group_id uuid,
  user_id uuid,
  alias text,
  message text
);
```