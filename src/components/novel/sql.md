
# Set Up:

```sql


create table if not exists books (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  title text,
  content text,
  isLocked boolean,
  isPublic boolean,
  created_at timestamptz default now()
);


create table if not exists chapters (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  novel_id uuid not null,
  title text,
  content text,
  page Int4,
  isLocked boolean,
  isPublic boolean,
  created_at timestamptz default now()
);


create table if not exists novels (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null default auth.uid(),
  title text,
  content text,
  isLocked boolean,
  isPublic boolean,
  created_at timestamptz default now()
);




```


