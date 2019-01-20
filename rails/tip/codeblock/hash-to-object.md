---
description: 루비에서의 해시를 객체로 변환하기
---
# 코드조각. foo[:key] to foo.key

```ruby
foo = { :mykey => "myvalue", :hello => "world" }

foo = JSON.parse(foo.to_json, object_class: OpenStruct)

# foo.hello
# => "world"
```
