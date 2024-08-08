  const mongoose = require("mongoose"); // Erase if already required

  // Declare the Schema of the Mongo model
  var productSchema = new mongoose.Schema(
    {
      name:{
        type: String,
        required: true,
        trim: true,
      },
      title: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
      },
      language:{
        type: String,
        
      },
      released:{
        type: Date,
      
      },
    material:{
      type: String,
    }
      ,
      description: {
        type: String,
      
      },
      publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Publisher",
      },
      price: {
        type: Number,
        required: true,
      },
      category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductCategory",
      },
      bookcategory:{
        type :Array
      },
      quantity: {
        type: Number,
        default: 0,
      },
      sold: {
        type: Number,
        default: 0,
      },
      discount: {
        type: Number,
        default: 0,
      },
      discountedPrice: {
        type: Number, 
      },
      images: {
        type: Array,
      },
      color: {
        type: String,
        enum: ["black", "white", "orange", "yellow", "red", "GREEN"],
      },
      rating: [
        {
          start: { type: Number },
          postedBy: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" },
          comments: { type: String },
        },
      ],
      totalRating: [
        {
          type: Number,
          default: 0,
        },
      ],
    
    },
    {
      timestamps: true,
    }
  );


  //Export the model
  module.exports = mongoose.model("Product", productSchema);