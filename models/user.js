const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    // name:{
    //     type:String,
    //     required:true
    // },
    email:{
        type:String,
        required:true
    },
    // location: {
    //     type: {
    //         type: String,
    //         enum: ["Point"],
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },
    password:{
        type:String,
        required:true
    },
    resetToken: String,
    resetTokenExpiration: Date,
});
module.exports = mongoose.model("User",userSchema);