





```
user_id

```



- https://app.supabase.io/project/nawyjmqwacwkefocaene/api?page=tables-intro#

# managing-user-data:
- https://daily-dev-tips.com/posts/adding-a-user-profile-to-our-supabase-user/
- https://supabase.com/docs/guides/auth/managing-user-data
- https://github.com/supabase/supabase/discussions/2729
- https://github.com/supabase/supabase/discussions/3491
 - register
























- https://community.redwoodjs.com/t/redwood-and-supabase-auth-example/2022/8
```
enum Roles {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}
```
```
model TeamMember {
  id     String  @id @default(cuid())
  user   User    @relation(fields: [userId], references: [id])
  userId String
  role   Roles
#. hide other attributes for brevity
}
```



```
```

