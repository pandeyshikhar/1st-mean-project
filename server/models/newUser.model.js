const mongoose = require('mongoose');

var newUserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: 'this field is required'
    },
    username: {
        type: String,
        required: 'this field is required'
    },
    dob: {
        type: String,
        required: 'this field is required'
    },
    points: {
        type: String,
        required: 'this field is required'
    },
    notes: {
        type: String,
        required: 'this field is required'
    },
    images: {
        type: String,
    }
});

mongoose.model('newUser', newUserSchema);
