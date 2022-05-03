



```sql




create policy "Individuals can view their own todos." 
  on todos for select 
  using ( auth.uid() = user_id );
```