const jwt = require('jsonwebtoken')
const User = require('../models/users.model')

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, process.env.SECRET_PRIVATE_KEY, (err, decodedToken) => {
            if (err) {
                console.log(err)
                // to do
                // redirect to login view
                res.send(err)
            } else {
                // console.log(decodedToken);
                next();
            }
        })
    } else {
        // to do
        // redirect to login view
        res.redirect('/')
    }
}

module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.SECRET_PRIVATE_KEY, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          console.log(user.username)
          next();
        }
      });
    } else {
      //res.locals.user = null;
      next();
    }
  };
module.exports.checkUser2 = async (req, res) => {
  const token = req.body.jwt

  try {
    const decodedToken = await jwt.verify(token, process.env.SECRET_PRIVATE_KEY)
    let user = await User.findById(decodedToken.id)
    res.status(200).json(user.username)
  }
  catch(err) {
    res.status(400).send(err)
  }
}