const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    stocks: [
      {
        material: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Material",
          required: [true, "stocks.material 0"]
        },
        quantity: {
          type: Number,
          required: [true, "stocks.quantity 0"]
        }
      }
    ],
    outlet: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Outlet",
      required: [true, "outlet 0"]
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

global.OutletStockSchema =
  global.OutletStockSchema || mongoose.model("OutletStock", Schema);
module.exports = global.OutletStockSchema;
