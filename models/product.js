const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        requried: true
    },
    price: {
        type: Number,
        required: true
    },
    sellerId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
module.export = mongoose.models(Product, 'productSchema');