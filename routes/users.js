const app = require('express')
const router = app.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
  });

  router.get('/', (req, res) => {
      res.send('Users page')
  })

  module.exports = router