const express = require('express')
const app = express()
const morgan = require('morgan')
const users = require('./routes/users')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authcontroller = require('./controllers/authController')
const cors = require('cors')

app.use(morgan('dev'))
app.use(express.json());
dotenv.config()
app.use(cookieParser())
app.use(cors())

app.get('*', authcontroller.checkUser)
app.get('/', (req,res, next) => {
    console.log('get requets to root')
    next()
}, (req,res) => {
    res.send('Server is listening on ' + process.env.PORT + ' Now!')
})

app.get('/rutaprotegida', authcontroller.requireAuth, (req, res) => res.send('La ruta protegida irá aquí'))

app.use('/users', users)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then((res) => console.log('db is connected'))
    .catch((e) => console.log(e))