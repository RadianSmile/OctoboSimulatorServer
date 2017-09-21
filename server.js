const express = require('express')
const app = express()


var action_id = 0

var global_action = "Idle"
app.get('/set/', function (req, res) {
  action_id += 1 ;
  global_action = req.query.action + "";

  console.log("set action : " + global_action )
  res.set('Content-Type', 'text/html')
  res.send(action_id + "," + global_action)

})
app.get('/action/',function (req,res){
  console.log("sent action  " + action_id + ","+ global_action)
  res.set('Content-Type', 'text/html')
  res.send(action_id + "," + global_action)
})

app.use("/", express.static(__dirname + "/public/"));

app.listen(process.env.PORT || 60000, process.env.IP || "0.0.0.0", function(){
  console.log(process.env.PORT,process.env.IP)
  // var addr = app.address();
  // console.log("Chat server listening at", addr.address + ":" + addr.port);
});
