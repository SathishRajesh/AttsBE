const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    metal: { type: String, required: true },
    purity: { type: String, required: true },
    amount: { type: Number, required: true },
    date:{type: Date,required:true},
    parentId:{type: mongoose.Schema.Types.ObjectId},
    status: {type: String,required:true},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
