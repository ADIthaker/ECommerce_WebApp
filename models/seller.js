const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sellerSchema = new Schema({
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"User",
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
});

module.export = mongoose.model(Seller, 'sellerSchema');