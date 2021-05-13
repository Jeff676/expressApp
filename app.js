const express = require('express')
const app = express()
const morgan = require('morgan')
const users = require('./routes/users')
const PORT = 3000

app.use(morgan('dev'))

app.get('/', (req,res, next) => {
    console.log('get requets to root')
    next()
}, (req,res) => {
    res.send('Server is listening on ' + PORT + ' Now!')
})

app.use('/users', users)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})