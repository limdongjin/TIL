## 레일즈 팁 모음

### 테이블 하나 날리기

```bash
$ rails console
> ActiveRecord::Migration.drop_table(:table_name)
```

### rails console에서 sql파일 실행시키기

```ruby
> ActiveRecord::Base.connection.execute(IO.read(“your_file.sql”))
```

### rails console에서 이미지 다운 받기

```ruby
> require 'open-uri'
> open('image.png', 'wb') do |file|
>  file << open('http://example.com/image.png').read
> end
```