# Python에서 Elastic Search 사용하기 

## AWS Elasticsearch Service 연결하기 

AWS Elasticsearch service의 Access 정책을 IAM으로 설정한다. 그리고 필요한 패키지를 다운 받는다. 

```
pip install elasticsearch
pip install requests
pip install requests-aws4auth
```

아래 코드를 통해 Elasticsearch 에 연결할수있다.

```
from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
import os 

AWS_ACCESS_KEY = os.environ['AWS_ACCESS_KEY']
AWS_SECRET_KEY = os.environ['AWS_SECRET_KEY']
region = 'ap-northeast-2'
service = 'es'

awsauth = AWS4Auth(AWS_ACCESS_KEY, AWS_SECRET_KEY, region, service)

host = os.environ['AWS_ES_HOST']
# ex) tojung.search.net

es = Elasticsearch(
 hosts = [{'host': host, 'port': 443}],
 http_auth = awsauth,
 use_ssl = True,
 verify_certs = True,
 connection_class = RequestsHttpConnection
)
```

## 사용법 

### `Document 조회` GET /itisindex/itistype/itisid

```shell
// shell 

curl -XGET https://search.example.net:9999/itisindex/itistype/100
```

```python
// python 

es.get(index='itisindex', doc_type='itistype', id='100')
```

### `검색 API` GET /_search

```shell
//shell

curl -XGET https://search.example.net:9999/_search
{
  "query": { ... }
}
```

```python
//python 

es.search(body={  
    "query": {
        ...
    }
})

# // example1 
# es.search(body={ 
#   "query": {
#      "match": {
#        "col1": "hello"         
#      }   
#   }   
# })

# // example2 
# es.search(body={ 
#   "query": {
#      "wildcard": {
#        "col1": "*elo*"         
#      }   
#   }   
# })
```

### `Index 추가` PUT /mymyindex 
```shell
// shell

curl -XPUT https://search.example.net:9999/mymyindex
{
    "settings": { ... }, 
    "mappings": { ... }
}
```
```python
// python 

es.indices.create(index='mymyindex', body={
    "settings": { ... }, 
    "mappings": { ... }
})
```
### `Document 추가` PUT /mymyindex/mymytype/myid
```shell
//shell 

curl -XPUT https://search.example.net:9999/mymyindex/mymytype/105
{
   "col1": "hello world",
   "itisfield": "hihi"
}
```

```python
//python 

es.index(index='mymyindex', doc_type='mymytype', id='105', body={ 
   "col1": "hello world",
   "itisfield": "hihi" 
})
```

### `Bulk Insert` 

```python
import elasticsearch

doc1 = {
    '_index': 'mymyindex',
    '_type': 'mymytype',
    '_id': '123',
    '_source': {
        'field1': 'hello world!! ',
        'hello': 'hello world!! dd'
    }
}
doc2 = {
    '_index': 'mymyindex',
    '_type': 'mymytype',
    '_id': '1234',
    '_source': {
        'field1': '22 hello world!! ',
        'hello': '22 hello world!! dd'
    }
}

doc3 = {
    '_index': 'mymyindex',
    '_type': 'mymytype',
    '_id': '456',
    '_source': {
        'field1': '33 hello world!! ',
        'hello': '33 hello world!! dd'
    }
}

elasticsearch.helpers.bulk(es, [doc1, doc2, doc3])
```

### `RAW REST API 호출` perform_request

elasticsearch-py 라이브러리에 원하는 기능이 없다면 perform_request()를 이용하는 것이 편하다. 

```python
es.transport.perform_request(
    method=" ... ", # ex) "PUT", "GET" , ..
    url=" ... ",    # ex) /myindex/mytype/1000
    body={
        ...
    }
)
```

## Reference

[elasticsearch-py 공식문서](https://elasticsearch-py.readthedocs.io/en/master/api.html#elasticsearch)

[AWS Elasticsearch Service 개발자 안내서](https://docs.aws.amazon.com/ko_kr/elasticsearch-service/latest/developerguide/es-indexing-programmatic.html)