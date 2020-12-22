const express = require('express')
const app = express()
const userRouter = require('./router/users.router')
const mainRouter = require('./router/main.router')
const page404 = require('./router/404.router')


var morgan = require('morgan')


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))
app.use(morgan("tiny"))


//router
app.use('/',mainRouter)
app.use('/users',userRouter)
app.use(page404)




app.listen(3000,() => {
    console.log('server is listening on 3000 port')
})


