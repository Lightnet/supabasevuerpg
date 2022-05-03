
- https://supabase.com/docs/guides/auth/row-level-security
- https://supabase.com/docs/guides/auth/managing-user-data

```sql
create table public.profiles (
  id uuid references auth.users not null,
  first_name text,
  last_name text,

  primary key (id)
);

--alter table public.profiles enable row level security;

alter table profiles
  enable row level security;

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );


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