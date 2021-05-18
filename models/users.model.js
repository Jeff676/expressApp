const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
  }
});

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(saltRounds);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username })

  if (user) {
    const auth = await bcrypt.compare(password, user.password)

    if (auth) {
      return user
    }
    throw Error('Password incorrect')
  }
  throw Error('User Not Found')
}


const User = mongoose.model('user', userSchema);
  
module.exports = User;