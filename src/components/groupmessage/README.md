
# Information:
  Work in progress. Not yet set up permission.


# Table:

## Layout:
```
Name id, Type uuid, Default uuid_generate_v4()
Name created_at, Type timestamptz, Default NOW()
Name user_id, Type uuid, Default 
Name group_id, Type uuid, Default 
Name alias, Type text, Default 
Name message, Type text, Default 
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