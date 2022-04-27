



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

