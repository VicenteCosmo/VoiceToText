const router = require('express').Router()
const { query, application } = require('express')
const DB = require('./database/index')
const bodyParser = require('body-parser')
const pdf = require('html-pdf')

const encoder = bodyParser.urlencoded()


router.get('/', (req, res)=>{
    res.render('home')
})

router.post('/', encoder, (req, res)=>{
    const texto = req.body.texto
    
    const query = "INSERT INTO voicetotext.voicetext (`content`) VALUES (?)"
    DB.query(query, (texto), (err, result)=>{
        if(err){
            console.log('erros ao inserir os dados:'+err)
        }
        else{
            console.log('Dados inseridos')
            res.redirect('/baixar')
        }
    })
} )

router.get('/baixar', (req, res)=>{

    const query = "SELECT content FROM voicetotext.voicetext ORDER BY id DESC LIMIT 1"
    DB.query(query, (err, result)=>{
        if(err){
            console.log('erro ao aprensentar o texto')
        }
        else{
            const content = result[0].content
            console.log(content)

            pdf.create(content).toBuffer((e, buffer)=>{
                if(e){
                    console.log('erro ao gerar o pdf:'+e)
                }
                else{
                    console.log('pdf gerado')

                    res.setHeader('Content-Disposition', 'attachment ; filename=file.pdf')
                    res.setHeader('Content-Type', application/pdf)

                    res.send(buffer)
                }
            })
        }

    })
})

module.exports = router

