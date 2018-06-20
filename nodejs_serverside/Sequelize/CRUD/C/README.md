## Create data
```js
const models = require('./../models')
var router = express.Router()

router.post('/', (req, res)=>{
  models.Post.build({
    title: req.body.title,
    content: req.body.content
  }).save().then(()=>{
    res.json("build ok!")
  })
})
```