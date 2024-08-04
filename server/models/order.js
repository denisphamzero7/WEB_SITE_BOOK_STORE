const mongoose = require('mongoose'); 
// Erase if already required
// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
   products:[{
    product:{type: mongoose.Schema.Types.ObjectId, ref:'Product'},
    quantity:Number,
    price:Number,
    name:String,
    images:String,
   }],

    status:{
       type: String,
       default:'cancelled',
       enum:['cancelled','processing','success']
    },
    total:Number ,
    orderBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    address:String
   
},{
    timestamps: true,
   
});

//Export the model
module.exports = mongoose.model('Order', orderSchema);