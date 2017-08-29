const express = require('express')
const app = express()




var action = "Idle"
app.get('/set/', function (req, res) {
  console.log("set action : " + action)
  action = req.params.action + "";

  res.set('Content-Type', 'text/html')
  res.send(action)

})
app.get('/action/',function (req,res){
  console.log("sent action : " + action)
  res.set('Content-Type', 'text/html')
  res.send(action)
})

app.use("/", express.static(__dirname + "/public/"));

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log(process.env.PORT,process.env.IP)
  // var addr = app.address();
  // console.log("Chat server listening at", addr.address + ":" + addr.port);
});
