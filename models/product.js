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
    images:[{
      url: { type:String,
        required:true}
       
    }],
    description: {
        type: String,
        required: true
    },
    costPrice:{
        type:Number,
        requried:true
    },
    availability:{
        type:Number,
        requried:true
    }
    
    
});
module.exports= mongoose.model("Product", productSchema);