const express = require('express')
const router = express.Router()
const Joi = require('@hapi/joi')


//database
const users = [
    {id : 1, name : 'Furkan', age : 22},
    {id : 2, name : 'Cagatay', age : 25},
    {id : 3, name : 'Selcuk', age : 20},
    {id : 4, name : 'Bugra', age : 18}
]


router.get('/', (req,res) => {
    console.log(req.query)

    if(req.query.ters) {
        res.send(users.reverse())
    }else {
        console.log('Users page')
        res.send(users)
    }
})

router.get('/:id', (req,res) => {
    // console.log(req.params.id) // id -> /:id query
    const findUser = users.find((user => user.id == parseInt(req.params.id)))

    if (findUser) {
        res.send(findUser)
    } else {
        res.status(404).send(req.params.id + "user not found")
    }

})

router.post('/', (req, res) => {

    const {result} = okayUser(req.body)

    if(result){
        res.status(400).send(error.details[0].message)
    }else {
        const newUser = {
            id : users.length + 1,
            name : req.body.name,
            age : req.body.age
        }

        users.push(newUser)
        res.send(newUser)
    }
})


router.put('/:id', (req, res) => {
    const findUser = users.find((user) => user.id === parseInt(req.params.id))

    if(!findUser) {
        return res.status(404).send(`${req.params.id} id users not found`)
    }

    const {result} = okayUser(req.body)

    if(result){
        res.status(400).send(error.details[0].message)
    }else {
        //else kullandıgımız için return yapmadık if kullanıp else yapmıcaksak return ile dondur!
        findUser.name = req.body.name
        findUser.age = req.body.age

        res.send(findUser)
    }

})


router.delete('/:id', (req,res) => {
    const findUser = users.find((user) => user.id === parseInt(req.params.id))

    if(findUser) {
        const index = users.indexOf(findUser)
        users.splice(index,1) // indexten basla 1 elemanı sil yani user sil
        res.send(findUser)
    }else {
        res.status(404).send(`${req.params.id} id users not found`)
    }

})



function okayUser(user) {
    const schema = Joi.object({
        name : Joi.string().min(3).max(30).required(),
        age : Joi.number().integer().min(10).max(99).required()
    })

    return schema.validate(user)
}

 module.exports = router