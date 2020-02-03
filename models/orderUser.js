const mongoose = require("mongoose");
const { ObjectId } = mongoose.SchemaTypes;
const {
  orderStatus,
  orderPaymentStatus,
  orderPaidWith,
  orderBy
} = require("./orderStatusEnums");

const Schema = new mongoose.Schema(
  {
    outlet: {
      type: ObjectId,
      ref: "Outlet",
      required: [true, "outlet 0"]
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
          required: [true, "products.$.product 0"]
        },
        options: [
          {
            field: {
              type: String,
              required: [true, "products.$.options.$.field 0"]
            },
            value: {
              type: String,
              required: [true, "products.$.options.$.value 0"]
            },
            addPrice: {
              type: Number,
              required: [true, "products.$.options.$.addPrice 0"]
            }
          }
        ],
        quantity: {
          type: Number,
          default: 1
        },
        snapshotPrice: {
          type: Number
        },
        notes: {
          type: String,
          default: ""
        }
      }
    ],
    totalPriceSnapshot: {
      type: Number,
      required: [true, "totalPriceSnapshot 0"]
    },
    orderId: {
      type: String,
      // unique?
      required: [true, "orderId 0"]
    },
    notes: String,
    orderStatus: {
      type: String,
      enum: orderStatus,
      required: [true, "orderStatus 0"]
    },
    orderPaymentStatus: {
      type: String,
      enum: orderPaymentStatus,
      required: [true, "orderPaymentStatus 0"]
    },
    dineLocation: {
      type: String,
      enum: ["dine-in", "take away"],
      required: [true, "dineLocation 0"]
    },
    flags: {
      isDeleted: {
        type: Boolean,
        default: false
      }
    },
    orderBy: {
      type: String,
      enum: orderBy,
      required: [true, "orderedBy 0"]
    },
    paidWith: {
      type: String,
      enum: orderPaidWith,
      required: [true, "paidWith 0"]
    },
    midTrans: {
      snapToken: {
        type: String,
        required: function() {
          return this.paidWith == "gopay";
        }
      },
      redirectUrl: {
        type: String,
        required: function() {
          return this.paidWith == "gopay";
        }
      }
    },
    edc: {
      cardNumber: String,
      cardPaymentType: {
        type: String,
        enum: ["debit", "credit"],
        required: false
      },
      cardProvider: String
    }
  },
  {
    timestamps: true
  }
);

global.OrderUserSchema =
  global.OrderUserSchema || mongoose.model("OrderUser", Schema);
module.exports = global.OrderUserSchema;
