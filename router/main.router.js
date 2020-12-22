const express = require('express')
const router = express.Router()

router.get('/',(req,res) => {
    console.log('Home page')
    res.send('Hello from home page')
})

module.exports = router