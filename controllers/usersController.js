const User = require('../models/users.model')

module.exports.signup_get = (req, res) => {
    res.send('signup get route from controller');
  }

module.exports.signup_post = async (req, res) => {
    const { username, password } = req.body;



    try {
      const user = await new User({ username, password })
      user.save((e) => {
        if (e) {
          console.log(e)
        }
      })
      res.send('SignUp Post route Welcome ' + username + ' ' + password)
    }
    catch (err) {
      res.status(201)
    }
}

module.exports.login_post = async (req,res) => {
  const { username , password } = req.body
  
  
  try {
    const user = await User.login(username, password)
    res.send('Welcome ' + user.username)

  }
  catch (err){
    console.log(err)
    res.status(400).send(err.message)
  }
}



/* module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}*/