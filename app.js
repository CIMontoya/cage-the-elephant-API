const port = 3000
const express = require("express")
const app = express()
const data = require("./data.json")
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res, next)=>{
  res.status(200).send(data)
})

app.get("/tags", (req, res, next) => {
  res.send(data.tags)
})

app.get("/movie/:tag", (req, res, next) => {
  const tag = req.params.tag
  if(!data.tags.includes(tag)) {
    res.status(404).send("Sorry, that tag does not exist.")
  }
  const matching = data.movies.filter(movie => movie.tags.includes(tag))
  res.status(200).send(matching)
})

app.post("/", (req, res, next) => {
  console.log(req.body)
  let newData = data.movies.push(req.body)
  res.status(200).send(data)
})

app.use((req, res, next) => {
  res.status(404).send("This route does not exist")
})

app.use((req, res, next) => {
  res.status(500).send("Something went wrong")
})

app.listen(process.env.PORT || port, ()=>{
  console.log(`viddy well then, droogs ${port}`)
})
