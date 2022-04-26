alter table "your_table" replica identity full;


alter table "publicchat" replica identity full;

```
https://supabase.com/docs/reference/javascript/subscribe
https://app.supabase.io/project/<id>/database/replication
- click table
- select public chat enable
```

https://supabase.com/docs/guides/auth/managing-user-data

```sql
-- inserts a row into public.users
create function public.handle_new_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```















https://supabase.com/docs/guides/auth/row-level-security

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
create table teams (
  id serial primary key,
  name text
);

-- 2. Create many to many join
create table members (
  team_id bigint references teams,
  user_id uuid references auth.users
);

-- 3. Enable RLS
alter table teams
  enable row level security;

-- 4. Create Policy
create policy "Team members can update team details if they belong to the team."
  on teams
  for update using (
    auth.uid() in (
      select user_id from members
      where team_id = id
    )
  );
```

```sql
-- 1. Follow example for 'Policies with joins' above

-- 2.  Enable RLS
alter table members
  enable row level security

-- 3.  Create security definer function
create or replace function get_teams_for_authenticated_user()
returns setof bigint
language sql
security definer
set search_path = public
stable
as $$
    select team_id
    from members
    where user_id = auth.uid()
$$;

-- 4. Create Policy
create policy "Team members can update team members if they belong to the team."
  on members
  for all using (
    team_id in (
      select get_teams_for_authenticated_user()
    )
  );
```
















