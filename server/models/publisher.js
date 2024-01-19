const mongoose = require('mongoose');

// Define the Publisher schema
const PublisherSchema = new mongoose.Schema({
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

// Create the Publisher model

module.exports = mongoose.model('Publisher', PublisherSchema);

