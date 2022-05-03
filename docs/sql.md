

https://stackoverflow.com/questions/69595895/how-to-insert-in-multiple-tables-with-a-single-api-call-in-supabase

https://stackoverflow.com/questions/18130424/creating-trigger-that-runs-on-two-tables

https://stackoverflow.com/questions/70626513/editing-values-before-inserting-a-row-supabase


https://stackoverflow.com/questions/69595895/how-to-insert-in-multiple-tables-with-a-single-api-call-in-supabase


```sql
CREATE OR REPLACE FUNCTION public.insert_book_and_genre(book_name text, genre_name text)
    RETURNS void language SQL AS
$$
  WITH genre AS (
    insert into genre (name) values (genre_name) returning id
  ),
  book AS (
    insert into book (name) values (book_name) returning id
  )
  insert into book_genre_rel (genre_id, book_id) 
    select genre.id, book.id from genre, book
$$
```














- https://www.youtube.com/watch?v=qxgZf4EelLg

- https://www.youtube.com/watch?v=MJZCCpCYEqk
  - Create PostgreSQL Functions with Supabase
- https://www.youtube.com/watch?v=0N6M5BBe9AE
  - Using PostgreSQL triggers to automate processes with Supabase




# :
https://supabase.com/docs/guides/database/replication

```sql
create publication publication_name 
for all tables;


create publication publication_name 
for all tables
with (publish = 'insert');
```


# sql functions:
- https://www.youtube.com/watch?v=MJZCCpCYEqk&t=1s
- https://supabase.com/docs/guides/database/functions

```sql
create or replace function hello() returns text as $$
  select 'hello world';
$$ language sql;
```

```sql
select hello()
```

https://supabase.com/blog/2021/07/30/supabase-functions-updates

https://www.youtube.com/watch?v=codAs9-NeHM


https://database.dev/handle-new-user



```sql
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, avatar_url, full_name)
  values (new.id, new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;
```
```sql
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```




