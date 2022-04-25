

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












