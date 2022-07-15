const mongoose = require("mongoose");

const Itemschema = new mongoose.Schema({
  sku: {
    type: String,
    required: true,
  },
  itemname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const ItemModel = mongoose.model("items", Itemschema);
module.exports = ItemModel;
