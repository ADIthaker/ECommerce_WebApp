const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    password:{
        type:String,
        required:true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    cart:{
        items:[
            {productId:{type: mongoose.SchemaTypes.ObjectId,
                ref:"Product",
                required: true},
            quantity:{
                type:Number,required:true
            }
            }
        ]
    },
    Address:{
        type:String,
        required:true
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    PinCode:{
        type:String,
        required:true
    }

});
module.exports = mongoose.model("User",userSchema);