const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/metronic', { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log("connection failed");
    } else {
        console.log("connection succeed");
    }
});

require('./user.model');
require('./newUser.model')