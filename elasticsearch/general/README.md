---
title: Elastic Search 팁 모음
meta:
  - name: description
    content: date_detection 에러, aws elastic search 액세스 정책, 한글 형태소 분석기
  - property: og:title
    content: Elastic Search 팁 모음
  - property: og:description
    content: date_detection 에러, aws elastic search 액세스 정책, 한글 형태소 분석기
  - property: og:url
    content: https://limdongjin.github.io/elasticsearch/general
tags: ["elasticsearch", "팁"]
---
# Elasticsearch 팁

## date_detection으로 에러가 난다면?

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

## AWS Elasticsearch Service 액세스 정책 설정

```
// elasticsearch + kibana + cognito 조합 (1)
// 주의할점: 해당 정책은 cognito를 통해 가입된 유저들은 Elasticsearch에 DELETE, PUT 등의 액션을 수행할수있다.

{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::xxxxx:user/도메인이름"
      },
      "Action": "es:*",
      "Resource": "arn:aws:iam::xxxxx:user/도메인이름"
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

```
// elasticsearch + kibana + cognito 조합 (2)
// cognito 유저들이 ReadOnly로 접근했으면 좋겠다면 해당 정책을 사용하자

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
      "Action": [ "es:ESHttpGet", "es:ESHttpPost", "es:ESHttpHead" ],
      "Resource": "arn:aws:es:ap-northeast-2:xxxxx:domain/도메인이름/*"
    }
  ]
}
```

## AWS Elasticsearch Service 한글 형태소 분석기 붙이기

Index를 처음 생성할때 settings에 형태소 분석기를 설정해주면 된다
(AWS Elasticsearch Service는 seunjeon 형태소 분석기를 지원한다.)
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

## References

[AWS Elasticsearch Service 개발자문서 - 액세스 제어 파트](https://docs.aws.amazon.com/ko_kr/elasticsearch-service/latest/developerguide/es-ac.html)




