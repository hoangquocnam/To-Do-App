const mongoose = require('mongoose')
const  Schema  = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: false,
    minLength: [3, 'name must have at least 3 characters, got {VALUE}'],
    maxLength: [30, 'name must not have more than 30 characters, got {VALUE}'],
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: [3, 'username must have at least 3 characters, got {VALUE}'],
    maxLength: [30, 'username must not have more than 30 characters, got {VALUE}'],
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: [10, 'must be at least 10 years old, got {VALUE}'],
    max: [144, 'probably fake information, , got {VALUE}'],
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  taskList:{
    type : [{type: String}],
    required: false
  },
  isAdmin:{
    type: Boolean,
    required: false
  },
  isDeleted:{
    type: Boolean,
    default: false,
  },
  isOnline:{
    type: Boolean,
    default: false,
  }
})

userSchema.statics.deleteByID = (_id) => {
  return this.deleteOne({_id: _id});
}

const Users = mongoose.model('users', userSchema);
module.exports = Users;