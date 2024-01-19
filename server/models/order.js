const mongoose = require('mongoose'); // Erase if already required
// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
   products:[{
    product:{type:mongoose.Schema.Types.ObjectId, 
        ref:'Product'
    },
    count : Number,
    color: String
   }],
    status:{
       type: String,
       default:'processing',
       enum:['cancelled','processing','success']
    },
    total:{type:Number },
    orderBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    coupon:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Coupon'
    }
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);