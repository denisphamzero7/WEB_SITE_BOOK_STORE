const mongoose = require('mongoose');

// Define the BookCategory schema
const BookCategorySchema = new mongoose.Schema({
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

// Create the BookCategory model

module.exports = mongoose.model('BookCategory', BookCategorySchema);

