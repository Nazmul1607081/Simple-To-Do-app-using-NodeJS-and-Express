const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static('public'))

const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

let data  = []

app.get('/', function(req, res) {
console.log(data)
    res.render('index',{data: data});
})
app.post('/add', urlencodedParser, function(req, res) {
    let response = {
        item : req.body.item,
        date : req.body.date,
        time : req.body.time
    }

    console.log(response)
    data.push(response)
    res.redirect('/')
})
app.get('/delete/:id', urlencodedParser, function(req, res) {
    let id = req.params.id
    let newData = []
    for(var j=0;j<data.length;j++){
        if(data[j].item===id){
            console.log('found')
        }
        else
          newData.push(data[j]);
    }
    data = newData
    console.log(newData.length)
    console.log(id)
    res.redirect('/')
})

var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
