const express = require('express')
const Router = require('./routes.js')
const bodyParser = require('body-parser')

const app = express()



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/', Router)
app.use(bodyParser.urlencoded({extended: true}))

const port = 4001

app.listen(port, (e)=>{
    if(e){
        console.log('erro ao ouvir a porta:'+e)
    }
    else{
        console.log('app running on port:'+port)
    }
})