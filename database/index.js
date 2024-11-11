const mysql = require('mysql')

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'cosmo',
//     port: 3306,
//     database: 'voicetotext' 
// })

const connection = mysql.createConnection({
    host: 'bzochzffqul3hly6dhy5-mysql.services.clever-cloud.com',
    user: 'undjegqdhk7zqilq',
    password: '59tUszeJChwqALzeAsHd',
    port: 3306,
    database: 'bzochzffqul3hly6dhy5'
})

connection.connect((e)=>{
    if(e){
        console.log('erro ao conectar à base de dados')
    }
    else{
        console.log('database connected successfully')
    }
})

module.exports = connection