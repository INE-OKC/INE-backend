const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide your name'],
        minLength: 2,
        maxLength: 40,
    },
    email:{
        type: String,
        required: [true, 'Please provide an email'],
    },
    password:{
        type: String,
        required: [true, 'Please provide a password'],
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
};

module.exports = mongoose.model('User', UserSchema);
