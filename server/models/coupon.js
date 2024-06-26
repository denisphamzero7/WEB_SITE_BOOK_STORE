const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        upperCase: true
    },
    discount:{
       type:Number,
       required:true,
    },
    expiry:{
        type:Date,
        required:true,
       
    },
    
},{
    timestamps:true,
});
couponSchema.pre('save', function (next) {
    if (this.name) {
      this.name = this.name.toUpperCase();
    }
    next();
  });
//Export the model
module.exports = mongoose.model('Coupon', couponSchema);