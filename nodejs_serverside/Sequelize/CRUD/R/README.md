---
prev: /nodejs_serverside/Sequelize/
---
## Read Data by id
```js
router.get('/:id', (req, res)=>{
  models.Post.findById(req.params.id)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
})
```

## Read Datas

just all data
```js
router.get('/', function (req, res, next) {
  models.Post.findAll()
    .then(result => {
       res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
})
```
where query
```js
/* GET posts listing. */
router.get('/', function (req, res, next) {
  models.Post.findAll({ 
  where: {
      author_id: 3
  }
  })
    .then(result => {
       res.json(result)
    })
    .catch(err => {
      res.json(err)
    })
})
```
