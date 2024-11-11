const express = require('express')
const http = require('http')
const fs = require('fs')
const Router = require('./routes.js')
const bodyParser = require('body-parser')

const app = express()



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/', Router)
app.use(bodyParser.urlencoded({extended: true}))

app.listen(4000, (e)=>{
    if(e){
        console.log('erro ao ouvir a porta:'+e)
    }
    else{
        console.log('app running...')
    }
})

// const options = {
//     key: fs.readFileSync('./certificates/private.key'),
//     cert: fs.readFileSync('./certificates/certificate.crt')
// }
// http.createServer(options, app).listen(4000, (e)=>{
//     if(e){
//                 console.log('erro ao ouvir a porta:'+e)
//             }
//             else{
//                 console.log('app running...')
//             }
// })