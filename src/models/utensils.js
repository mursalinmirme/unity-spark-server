import mongoose from "mongoose";
const utensilsSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  cost: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// users model making
const utensils = mongoose.model("Utensils", utensilsSchema);

export default utensils;
