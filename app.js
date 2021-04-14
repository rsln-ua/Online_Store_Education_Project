const express = require('express')
const express_graphql = require('express-graphql').graphqlHTTP
const multer  = require("multer")
const {models} = require('./model')
const {root, key}= require('./resolver')
const schema = require('./graphqlSchema')
const app = express()
const {verify} = require('jsonwebtoken')

async function verifyReq(req){
    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer ')){

        const token = req.headers.authorization.slice('Bearer '.length)
        if (token) {
            try {
                tokenData = verify(token, key)
                if (tokenData && tokenData.sub.id)
                    return await models.User.findById(tokenData.sub.id)

            }
            catch(e){
                console.log('catch')
            }
        }
    }
}

app.use(express.static(__dirname + "/public"))

app.use('/graphql', express_graphql(async(req, res) => ({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: {user: await verifyReq(req)}
})))

app.use(express.json())

app.get('/', (req, res) => {
    res.send(JSON.stringify('start'))
})

const upload = multer({dest: __dirname + "/public/images"})

app.post("/upload", upload.array("img"), function (req, res, next) {

    const names = req.files.map(f => `/images/${f.filename}`)
    
    if(!names)
        res.send("Ошибка при загрузке файла")
    else
        res.json(names)
})

app.listen(4000)