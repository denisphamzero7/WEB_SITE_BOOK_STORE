const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
       
    },
    image: {
        type: Array,
       
    },
    listProduct:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      }
    ]
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Author",authorSchema);
