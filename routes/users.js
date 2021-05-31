const app = require('express')
const router = app.Router()
const userCtrl = require('../controllers/usersController')
const authCtrl = require('../controllers/authController')

// middleware that is specific to this router
router.use((req, res, next)=> {
    var reqLog = new Date(Date.now())
    console.log('Time: '+ reqLog);
    next();
  });

  router.get('/', (req, res) => res.send('Users page'))
  router.get('/signup', userCtrl.signup_get)
  router.post('/signup', userCtrl.signup_post)
  router.post('/login', userCtrl.login_post)
  router.get('/logout', userCtrl.logout)
  router.post('/checkuser', authCtrl.checkUser2)

module.exports = router