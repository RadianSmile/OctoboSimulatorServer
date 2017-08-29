const express = require('express')
const app = express()

var action
app.get('/set', function (req, res) {
  console.log("set action : " + action)
  action = req.params.action + ""
})
app.get('/action',function (req,res){
  console.log("sent action : " + action)
  res.set('Content-Type', 'text/html')
  res.send(action)
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
