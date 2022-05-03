

- https://supabase.com/docs/learn/auth-deep-dive/auth-policies
- https://supabase.com/docs/guides/auth/row-level-security#restrict-updates
- https://github.com/supabase/supabase/issues/2443
- https://supabase.com/docs/guides/database/replication#recreate-a-publication
- https://www.postgresql.org/docs/12/sql-alterpolicy.html

```sql
ALTER POLICY "User can only Select organizations where they are member" 


```

```sql
begin; 
  drop policy if exists "Public chat messages are viewable by everyone."
    on public.chatmessages; 

  create policy "Public chat messages are viewable by everyone."
    on public.chatmessages 
    for select using (
      true
    );
commit;

-- replication, listen changes
-- supabase_realtime
begin; 
  -- remove the realtime publication
  drop publication if exists chatmessages_realtime;
  -- re-create the publication but don't enable it for any tables
  create publication chatmessages_realtime 
    for table chatmessages
    --for all tables;
    with (publish = 'insert, update, delete');
commit;
```


# Set up:
simple script for clean and setup table and policy. Note it was dev testing.

note you need to toggle boolean listen event in:
```
supabase url
- database
  - replication
    - supabase_realtime
      - Source
        - chatmessages true
```

```sql
--DROP TABLE if exists chatmessages;

create table if not exists chatmessages (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  alias text,
  content text,
  created_at timestamptz default now()
);

alter table chatmessages
  enable row level security;

begin; 
  drop policy if exists "Public chat messages are viewable by everyone."
    on public.chatmessages; 

  create policy "Public chat messages are viewable by everyone."
    on public.chatmessages 
    for select using (
      true
    );
commit;

begin; 
  drop policy if exists "Public user id only chat messages are insert."
    on public.chatmessages; 

  create policy "Public user id only chat messages are insert."
    on public.chatmessages 
    for insert 
    with check (
      auth.role() = 'authenticated'
    );
commit;

begin; 
  drop policy if exists "Public user id only chat messages are update."
    on public.chatmessages; 

  create policy "Public user id only chat messages are update."
    on public.chatmessages 
    for update using (
      auth.uid() = user_id
    );
commit;

begin; 
  drop policy if exists "Public user id only chat messages are delete."
    on public.chatmessages; 

  create policy "Public user id only chat messages are delete."
    on public.chatmessages 
    for delete using (
      auth.uid() = user_id
    );
commit;
```