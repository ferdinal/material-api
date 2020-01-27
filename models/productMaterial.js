const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name 0"]
    },
    image: {
      type: String,
      required: [true, "image 0"]
    },
    weight: {
      value: {
        type: Number,
        required: [true, "weight.value 0"]
      },
      unit: {
        type: String,
        enum: ["gram", "serving", "mililiter"],
        required: [true, "weight.unit 0"]
      }
    },
    stock: {
      orderMultiplier: {
        type: Number,
        required: [true, "stock.orderMultiplier 0"]
      },
      minimumOrder: {
        type: Number,
        required: [true, "stock.minimumOrder 0"]
      }
    },
    price: {
      cogs: {
        type: Number,
        required: [true, "cogs 0"]
      },
      sellingPrice: {
        type: Number,
        required: [true, "sellingPrice 0"]
      }
    }
  },
  {
    timestamps: true
  }
);

global.ProductMaterialSchema =
  global.ProductMaterialSchema || mongoose.model("ProductMaterial", Schema);
module.exports = global.ProductMaterialSchema;
