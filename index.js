const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ItemModel = require("./models/Items");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://damithshehan:Damith123@cluster1.o09q1.mongodb.net/itemlist?retryWrites=true&w=majority"
);

app.get("/getItems", (req, res) => {
  ItemModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createItem", async (req, res) => {
  const Item = req.body;
  const newItem = new ItemModel(Item);
  await newItem.save();

  res.json(Item);
});

app.put("/update",  async (req, res)=> {
  const newQuantity = req.body.newQuantity
  const id = req.body.id

  try {
    await ItemModel.findById(id, (error, ItemToUpdate) => {
      ItemToUpdate.quantity = Number(newQuantity);
      ItemToUpdate.save();
    });
  } catch(err){
    console.log(err);
  }
})

app.delete("/delete/:id",  async (req, res)=> {
  const id = req.params.id;
  await ItemModel.findByIdAndRemove(id).exec();
  res.send("Item deleted");
})

app.listen(3001, () => {
  console.log("SERVER RUNS PERFECTLY!");
});
