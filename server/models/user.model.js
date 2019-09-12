const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

var userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: 'this field is required'
    },
    username: {
        type: String,
        required: 'this field is required'
    },
    password: {
        type: String,
        required: 'this field is required'
    },
    // confirmpassword: {
    //     type: String,
    //     required: 'this field is required'
    // },
    email: {
        type: String,
        required: 'this field is required'
    },
    country: {
        type: String,
        required: 'this field is required'
    },
    city: {
        type: String,
        required: 'this field is required'
    },
    address: {
        type: String,
        required: 'this field is required'
    }
    // points: {
    //     type: String,
    //     required: 'this field is required'
    // },
    // notes: {
    //     type: String,
    //     required: 'this field is required'
    // }
});


userSchema.pre('save',async function(next){
    try {
    //Genrate  a salt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.password,salt)
    console.log('salt',salt)
    console.log('Normal password', this.password)
    console.log( 'Hashed Password', passwordHash)
    this.password = passwordHash;
    next();
    }catch (err) {
     next(err)
    }
});


userSchema.methods.invalidPassword = async function(newPassword) {
    try {
        return await bcrypt.compare(newPassword,this.password)
        // return await bcrypt.compare(req.body.password,this.password)

    }catch(err) {
        throw new Error(err);
    }
}


mongoose.model('User', userSchema);
// mongoose.model('newUser', userSchema); 