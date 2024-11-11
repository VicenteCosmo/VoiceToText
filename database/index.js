const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'cosmo',
    port: 3306
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