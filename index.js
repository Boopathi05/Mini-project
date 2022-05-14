const express = require('express');
const mongoclient = require('mongodb').MongoClient;
const bodyParser = require('body-parser')
const cors = require('cors')

const url = 'mongodb://localhost'


const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

app.post('/insert',function(req,res){
    const dta = req.body
    console.log(dta)
        mongoclient.connect(url,function(error,client){
            var db = client.db('testdb')
            db.collection("OrderDetails").insertOne(dta);
    })
    res.send({"status":"success"})
})

app.post('/retrieve',function(req,res){
    const dta = req.body
    console.log("the data is ",dta)
    mongoclient.connect(url,function(error,client){
        var db = client.db('testdb')
        db.collection("OrderDetails").find(dta).toArray(function(err,result){
            console.log(result)
            res.send(result)
        })
    })
})

app.post('/delete',function(req,res){
    const dta = req.body
    console.log("the data is ",dta)
    mongoclient.connect(url,function(error,client){
        var db = client.db('testdb')
        db.collection("OrderDetails").deleteOne(dta, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");

          });
    })
    res.send({"status":"success"})
})

app.post('/authenticate',function(req,res){
    const dta = req.body
    console.log(dta)
    if(dta.username==="admin"&dta.password==="123"){
        res.send({
            "res":"0"
        })
    }
    else if(dta.username==="unit"&dta.password==="abc"){
        res.send({
            "res":"1"
        })
    }
    else{
        res.send({
            "res":"-1"
        })
    }
})

app.listen(9000)