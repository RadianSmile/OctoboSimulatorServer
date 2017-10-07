const express = require('express')
const app = express()

var deviceActionDictionary = {}

app.get('/set/:device/', function (req, res) {
  const device = req.params.device + ""
  const action = req.query.action + ""
  const time = Date.now

  if typeof deviceActionDictionary[device] !== "object"
      deviceActionDictionary[device] = {time , action }
  else {
    deviceActionDictionary[device].time = time
    deviceActionDictionary[device].action = action
  }
  console.log("Set device:" , device , "action:", action, "time:",time)

  res.set('Content-Type', 'text/html')
  res.send(action_id + "," + global_action)

})
app.get('/get/:device/',function (req,res){
  const device = req.params.device + ""

  if typeof deviceActionDictionary[device] !== "object"
    deviceActionDictionary[device] = {
      action : "Idle" ,
      time : Date.now
    }

  const deviceData = deviceActionDictionary[device]
  const action = deviceData.action
  const time   = action.time
  console.log("Get device:" , device , "action:", action, "time:",time)

  res.set('Content-Type', 'text/html')
  res.send(action_id + "," + global_action)
})

app.get('/devices/',function(req,res){
  res.json({
    devices : Object.keys(deviceActionDictionary)
  })
})




var Spreadsheet = require('edit-google-spreadsheet');
app.get("/tokens/",function(req,res){


  Spreadsheet.load({
    debug: true,
    // spreadsheetName: 'OctoboTokens',
    // worksheetName: 'maps',
    spreadsheetId: "1YvODw9D9QBLuPIYMC2ZTXm_5-kRLgbta4pDLiDFUmnY",
    worksheetId: "od6",

    "oauth2": {
      "client_id": "803071845861-mqokvlva1i0nvkoh3o4hkl9cjebaqf2o.apps.googleusercontent.com",
      "client_secret": "AncJ0pgfaOMVOVMEvNYcaIjg",
      "refresh_token": "1/mypVUFxVOFt_gyUMNAY1eDNKWnZZSv8FQ2hqJMt7LDs"
    }
  }, function sheetReady(err, spreadsheet) {
    if(err) throw err;

    spreadsheet.receive(function(err, rows, info) {
      if(err) throw err;
      var data =  obj2csv(rows)
      console.log("Found rows:",data);


      res.set('Content-Type', 'text/html')
      res.send(data)

    });

  });
})


app.use("/", express.static(__dirname + "/public/"));

app.listen(process.env.PORT || 60000, process.env.IP || "0.0.0.0", function(){
  console.log(process.env.PORT,process.env.IP)
  // var addr = app.address();
  // console.log("Chat server listening at", addr.address + ":" + addr.port);
});






function obj2csv(o) {
    var csvRow = 1;
    var csv = "";
    for(var key in o) {
        var row = parseInt(key,10);
        while(row > csvRow) {
            csv += "\n";
            csvRow++;
        }
        var csvCol = 1;
        for(var key in o[row]) {
            var col = parseInt(key,10);
            while(col > csvCol) {
                csv += ",";
                csvCol++;
            }
            csv += o[row][col];
        }
    }
    return csv;
}
