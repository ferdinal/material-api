const mongoose = require("mongoose");
const OutletStock = require("./outletStock");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name 0"]
    },
    shortName: {
      type: String,
      required: false
    },
    phoneNumber: {
      type: String,
      required: false
    },
    address: {
      type: String,
      required: [true, "address 0"]
    },
    latitude: {
      type: String,
      required: [true, "latitude 0"]
    },
    longitude: {
      type: String,
      required: [true, "longitude 0"]
    },
    flag: {
      isPartner: {
        type: Boolean,
        default: false
      },
      isDeleted: {
        type: Boolean,
        default: false
      }
    },
    outletStock: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "OutletStock",
      required: [true, "outletStock 0"]
    }
  },
  {
    timestamps: true
  }
);

Schema.pre("validate", async function(next) {
  if (this.isNew) {
    const targetOutletStock = await new OutletStock({
      stocks: [],
      outlet: this._id
    }).save();

    this.outletStock = targetOutletStock._id;
    next();
  } else {
    next();
  }
});

global.OutletSchema = global.OutletSchema || mongoose.model("Outlet", Schema);
module.exports = global.OutletSchema;
