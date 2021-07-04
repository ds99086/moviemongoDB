const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// define the structure of the document that 
// we're going to store inside a collection. A thing model wraps around. 

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

//create a model based on schema. Schema defines structure of our document. 
//Model surrounds that and provides interface to communicate with database. 
const User = mongoose.model('User', userSchema);

module.exports = User;