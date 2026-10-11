const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  author:{
    type: String,
    required: true
  },
  availableCopies:{
    type:Number,
    required:true,
    default:0,
    min:0
  }
});

const Book = mongoose.model("Book",bookSchema);

module.exports=Book;