const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);

const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    phone: Number
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;