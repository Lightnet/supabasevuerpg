
```sql
create table if not exists forum_teams (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  inserted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists forum (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  title text,
  content text,
  isLocked boolean,
  isPublic boolean,
  created_at timestamptz default now()
);

create table if not exists graph_boards (
  id uuid default uuid_generate_v4() primary key,
  graph_id uuid not null,
  graph_type text,
  user_id uuid references auth.users not null default auth.uid(),
  alias text,
  title text,
  content text,
  isLocked boolean,
  isPublic boolean,
  created_at timestamptz default now()
);

create table if not exists graph_topics (
  id uuid default uuid_generate_v4() primary key,
  graph_id uuid not null,
  graph_type text,
  user_id uuid references auth.users not null default auth.uid(),
  alias text,
  title text,
  content text,
  isLocked boolean,
  isPublic boolean,
  created_at timestamptz default now()
);

create table if not exists graph_comments (
  id uuid default uuid_generate_v4() primary key,
  graph_id uuid not null,
  graph_type text,
  user_id uuid references auth.users not null default auth.uid(),
  alias text,
  title text,
  content text,
  isLocked boolean,
  isPublic boolean,
  created_at timestamptz default now()
);


```

