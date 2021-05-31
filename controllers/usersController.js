const User = require('../models/users.model')
const jwt = require('jsonwebtoken')

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_PRIVATE_KEY, {
    expiresIn: maxAge
  });
};

module.exports.signup_get = (req, res) => {
    res.send('signup get route from controller');
  }

module.exports.signup_post = async (req, res) => {
    const { username, password } = req.body;


    try {
      const user = await new User({ username, password })
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });
      res.json({token, httpOnly: false, maxAge: maxAge * 1000 })
      res.status(201).json({ user: user._id, token: 'test token' });
      res.status(201).json({ token: 'test token' });

      user.save((e) => {
        if (e) {
          console.log(e)
        }
      })
    }
    catch (err) {
      res.status(201)
    }
}

/*module.exports.login_post = async (req,res) => {
  const { username , password } = req.body
  
  try {
    const user = await User.login(username, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ user: user._id, token: token  })
  }
  catch (err){
    console.log(err)
    res.status(400).send(err.message)
  }
}*/

module.exports.login_post = async (req,res) => {
  const { username , password } = req.body
  
  try {
    const user = await User.login(username, password)
    const token = createToken(user._id)
    res.status(200).json({ user: user.username, token: token  })
  }
  catch (err){
    console.log(err)
    res.status(400).send(err.message)
  }
}


module.exports.logout = (req, res) => {
  res.cookie('jwt', '', {maxAge: 1} )
  res.status(200).send('LogOut')
}
