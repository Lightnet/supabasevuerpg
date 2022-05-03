
- https://stackoverflow.com/questions/1921627/multiple-insert-update-statements-inside-trigger

```sql
create or replace function public.handle_new_groupmessage()
--returns trigger 
returns void  
language plpgsql 
security definer set search_path = public
as $$
--declare
  --s_id uuid;
begin
  WITH groupmessage_team AS(
  insert into groupmessage_team( id)
    values(new.team_id);
    --returning id into s_id;
    return new
  ),
  groupmessage_members AS(
    insert into groupmessage_members(team_id)
    values (new.team_id);
    return new
  );
end;
$$;
```














```sql

create table if not exists groupmessage_team (
  id uuid primary key,
  name text
);

create table if not exists groupmessage_members (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references groupmessage_team,
  user_id uuid references auth.users
);

create table if not exists groupmessage_info (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  name text,
  isPublic boolean default false,
  team_id uuid default uuid_generate_v4() references groupmessage_team,
  created_at timestamptz default now()
);

create table if not exists groupmessages (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references groupmessage_team,
  user_id uuid references auth.users not null default auth.uid(),
  alias text,
  content text,
  created_at timestamptz default now()
);

-- inserts a row event
create or replace function public.handle_new_groupmessage()
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
--declare
  --s_id uuid;
begin

  insert into groupmessage_team( id)
  values(new.team_id);
  --returning id into s_id;
  return new;

  insert into groupmessage_members(team_id)
  values (new.team_id);
  return new;
end;
$$;


DROP TRIGGER IF EXISTS on_groupmessage_info_created on groupmessage_info;

-- trigger the function every time a user is created
create trigger on_groupmessage_info_created
  after insert on groupmessage_info
  for each row execute procedure public.handle_new_groupmessage();

```




```sql

create table if not exists groupmessage_team (
  id serial primary key,
  name text
);

-- 2. Create many to many join
create table groupmessage_members (
  team_id bigint references groupmessage_team,
  user_id uuid references auth.users
);

-- 3. Enable RLS
alter table groupmessage_team
  enable row level security;

-- 4. Create Policy
create policy "Team members can update team details if they belong to the team."
  on groupmessage_team
  for update using (
    auth.uid() in (
      select user_id from groupmessage_members
      where team_id = id
    )
  );

-- 2.  Enable RLS
alter table groupmessage_members
  enable row level security;

-- 3.  Create security definer function
create or replace function get_groupmessage_teams_for_authenticated_user()
returns setof bigint
language sql
security definer
set search_path = public
stable
as $$
  select team_id
  from groupmessage_members
  where user_id = auth.uid()
$$;

-- 4. Create Policy
create policy "Team members can update team members if they belong to the team."
  on groupmessage_members
  for all using (
    team_id in (
      select get_groupmessage_teams_for_authenticated_user()
    )
  );
```

