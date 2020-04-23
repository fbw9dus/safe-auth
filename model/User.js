
const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  userName:  { type: String, required: true  },
  firstName: { type: String, required: false },
  lastName:  { type: String, required: false },
  email:     { type: String, required: true  },
  password:  { type: String, required: true  },
  regDate:   { type: Date,   default: Date.now },
  logDate:   { type: Date,   default: Date.now },
  groups:    { type: Array,  default: () => [] }
},{
  toObject: { virtuals:true },
  toJSON:   { virtuals:true }
});

UserSchema.virtual('fullName').get(function(){
  return this.firstName +' '+ this.lastName;
});

module.exports = mongoose.model( 'User', UserSchema );
