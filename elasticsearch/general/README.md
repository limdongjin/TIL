## Elasticsearch 팁

### date_detection으로 에러가 난다면? 

```shell
PUT /mymyindex
{
    "mappings": {
        "mymytype": {
            "date_detection": false
        }
    }
}
```

### AWS Elasticsearch Service 액세스 정책 설정

```
// kibana + cognito 조합을 원한다면

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::xxxxx:user/도메일이름"
      },
      "Action": "es:*",
      "Resource": "arn:aws:iam::xxxxx:user/도메일이름"
    },
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::xxxxx:role/Cognito_xxxAuth_Role"
      },
      "Action": "es:ESHttp*",
      "Resource": "arn:aws:es:ap-northeast-2:xxxxx:domain/도메인이름/*"
    }
  ]
}
```

### AWS Elasticsearch Service 한글 형태소 분석기 붙이기

Index를 처음 생성할때 settings를 다음과 같이 설정하면된다. 

```
{'settings': 
     {'index': 
          {'analysis': 
               {'analyzer': 
                    {'korean': 
                         {
                             'type': 'custom', 
                             'tokenizer': 'seunjeon_default_tokenizer'
                          }
                     }, 
                'tokenizer': 
                    {'seunjeon_default_tokenizer': 
                         {
                             'type': 'seunjeon_tokenizer', 
                             'index_eojeol': False, 
                             'user_words': ['헬로우', '호우']
                         }
                    }
               }
          }
     }
}
```