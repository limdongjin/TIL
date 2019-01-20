---
description: 레일즈 콘솔에서 sql 파일을 실행시켜보자.
tags: ["rails", "코드조각", "팁"]
---
# 코드조각.Rails Console에서 sql파일 실행시키기

```ruby
$ rails console
> ActiveRecord::Base.connection.execute(IO.read(“your_file.sql”))
```
