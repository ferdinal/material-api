const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name 0"],
      unique: true
    },
    image: {
      type: String,
      required: [true, "image 0"]
    },
    unit: {
      type: String,
      enum: ["gram", "serving", "mililiter"],
      required: [true, "weight.unit 0"]
    },
    order: {
      multiplier: {
        type: Number,
        required: [true, "stock.orderMultiplier 0"]
      },
      minimum: {
        type: Number,
        required: [true, "stock.minimumOrder 0"]
      },
      maximum: {
        type: Number,
        required: false
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
    },
    flag: {
      isDeleted: {
        type: Boolean,
        default: false
      }
    }
  },
  {
    timestamps: true
  }
);

global.MaterialSchema =
  global.MaterialSchema || mongoose.model("ProductMaterial", Schema);
module.exports = global.MaterialSchema;
