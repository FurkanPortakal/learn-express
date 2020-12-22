const express = require('express')
const app = express()

const m1 = (req,res,next) => {
    console.log("m1");
    next()
}   
app.use(m1)

app.use((req, res, next) => {
    console.log("m2");
    // res.send("m2 finished")

    req.zaman = Date.now()

    next()
})

console.log("Here!");

app.use((req, res, next) => {
    console.log("m3 yani roottayız req zamano -> "+req.zaman);
    // res.send("m3 finished")
    res.send(" "+req.zaman)

})

app.use('/user', (req,res,next) => {
    console.log("m4");
})

app.listen(3000, () => {
    console.log("3000 listening");
})