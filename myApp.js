require('dotenv').config()
let bodyParser = require("body-parser")

var express = require('express');
var app = express();
console.log("Hello World")
console.log(process.env.MESSAGE_STYLE, 'test')


// app.get("/", (req,res) => {
//     res.send("Hello Express")
// })
//
//app.use(express.static(__dirname + "/public"))

app.use('/',(req,res,next) => {
    let string = req.method+' '+req.path+' - '+req.ip
    console.log(string)
    next()
})

app.use("/public", express.static(__dirname + "/public"))

app.get('/', (req,res) => {
    let path = __dirname + "/views/index.html"
    res.sendFile(path)
})

app.use(bodyParser.urlencoded({extended: false}))

app.get('/json', (req,res) => {
    let data = {"message": "Hello json"}
    if(process.env.MESSAGE_STYLE==='uppercase'){
        res.json({"message": "HELLO JSON"})
    }
    res.json(data)
})

app.get('/now',(req,res,next) => {
    req.time = new Date().toString()
    next()
}, (req,res) => {
    res.json({time: req.time})
})

app.get('/:word/echo',(req,res) => {
    let word = req.params.word
    res.json({echo: word})
})

app.get('/name', (req,res) => {
    let firstName = req.query.first
    let lastName = req.query.last
    res.json({name: `${firstName} ${lastName}`})
})

app.post('/name', (req,res) => {
    let firstName = req.body.first
    let lastName = req.body.last
    res.json({name: `${firstName} ${lastName}`})
})



















 module.exports = app;
