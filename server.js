const express = require('express')
const app = express()

app.use("/", express.static(__dirname + "public"));


var action = "Idle"
app.get('/set', function (req, res) {
  console.log("set action : " + action)
  action = req.params.action + "";

  res.set('Content-Type', 'text/html')
  res.send(action)

})
app.get('/action',function (req,res){
  console.log("sent action : " + action)
  res.set('Content-Type', 'text/html')
  res.send(action)
})


app.listen(3000, function () {
  console.log("static folder : " + __dirname + "public" );
  console.log('Example app listening on port 3000!')
})
