
const mongoose = require('mongoose');

// Define the Publisher schema
const ProductCategorySchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    unique: true,
    index: true,
  }
},{
  timestamps:true
}
);

// Create the ProductCategory model

module.exports = mongoose.model('ProductCategory', ProductCategorySchema);

