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
// orderSchema.post('save', async function (doc, next) {
//     for (const item of doc.products) {
//       await Product.findByIdAndUpdate(item.product, {
//         $inc: { sold: item.quantity, quantity: -item.quantity },
//       });
//     }
//     next();
//   });
//Export the model
module.exports = mongoose.model('Order', orderSchema);