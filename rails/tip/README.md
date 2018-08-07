## 레일즈 팁 모음

## 테이블 하나 날리기

```bash
$ rails console
> ActiveRecord::Migration.drop_table(:table_name)
```