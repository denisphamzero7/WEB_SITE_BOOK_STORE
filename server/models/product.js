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
       enum :['en', 'de']
    },
    released:{
      type: Date,
     
    },
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
    },
    quantity: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
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
    bookcategory:{
      type:Array
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);