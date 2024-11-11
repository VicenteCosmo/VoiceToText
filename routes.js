const router = require('express').Router()
const { query, application } = require('express')
const DB = require('./database/index')
const bodyParser = require('body-parser')
const pdf = require('html-pdf')
const path = require('path')

const puppeteer = require('puppeteer')

const encoder = bodyParser.urlencoded()

const options = {
    phantomPath: path.resolve(__dirname, './node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs')
}

router.get('/', (req, res)=>{
    res.render('home')
})

router.post('/', encoder, (req, res)=>{
    const texto = req.body.texto
    
    const query = "INSERT INTO bzochzffqul3hly6dhy5.voicetext (`content`) VALUES (?)"
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


router.get('/baixar', async (req, res) => { 
    const query = "SELECT content FROM bzochzffqul3hly6dhy5.voicetext ORDER BY id DESC LIMIT 1"; 
    DB.query(query, async (err, result) => { 
        if (err) { 
        console.log('Erro ao apresentar o texto'); 
        res.status(500).send('Erro ao apresentar o texto'); } 
        else { 
            const content = result[0].content; 
            console.log(content); 
            try { const browser = await puppeteer.launch(); 
                const page = await browser.newPage(); 
                await page.setContent(`<html><body>${content}</body></html>`); 
                const buffer = await page.pdf({ format: 'A4' }); 
                await browser.close(); res.setHeader('Content-Disposition', 'attachment; filename=file.pdf'); 
                res.setHeader('Content-Type', 'application/pdf'); 
                res.send(buffer);
                console.log('pdf gerado')
             } 
                catch (e) { 
                    console.log('Erro ao gerar o PDF:', e); 
                    res.status(500).send('Erro ao gerar o PDF'); } 
} 
})
});


// router.get('/baixar', (req, res)=>{

//     const query = "SELECT content FROM bzochzffqul3hly6dhy5.voicetext ORDER BY id DESC LIMIT 1"
//     DB.query(query, (err, result)=>{
//         if(err){
//             console.log('erro ao aprensentar o texto')
//         }
//         else{
//             const content = result[0].content
//             console.log(content)

//             pdf.create(content, options).toBuffer((e, buffer)=>{
//                 if(e){
//                     console.log('erro ao gerar o pdf:'+e)
//                 }
//                 else{
//                     console.log('pdf gerado')

//                     res.setHeader('Content-Disposition', 'attachment ; filename=file.pdf')
//                     res.setHeader('Content-Type', application/pdf)

//                     res.send(buffer)
//                 }
//             })
//         }

//     })
// })

module.exports = router

