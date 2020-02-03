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
    description: {
      type: String,
      required: [true, "description 0"]
    },
    category: {
      type: String,
      required: [true, "category 0"]
    },
    price: {
      cogs: {
        type: Number,
        default: 0,
        required: [true, "cogs 0"]
      },
      sellingPrice: {
        type: Number,
        required: [true, "sellingPrice 0"]
      }
    },
    materials: [
      {
        material: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Material",
          required: [true, "materials.material 0"]
        },
        quantity: {
          type: Number,
          default: 1,
          required: [true, "materials.quantity 0"]
        }
      }
    ],
    options: [
      {
        field: {
          type: String,
          required: [true, "options.$.field 0"]
        },
        options: [
          {
            addPrice: {
              type: Number,
              required: [true, "options.$.options.$.addPrice 0"]
            },
            value: {
              type: String,
              required: [true, "options.$.options.$.value 0"]
            },
            materials: [
              {
                material: {
                  type: mongoose.SchemaTypes.ObjectId,
                  ref: "Material",
                  required: [true, "options.$.options.$.materials.$.material 0"]
                },
                quantity: {
                  type: Number,
                  default: 1,
                  required: [
                    true,
                    "options.$.options.$.materials.$.materials.quantity 0"
                  ]
                }
              }
            ]
          }
        ]
      }
    ],
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

Schema.pre("save", async function(next) {
  whiteSpaceRemover: this.name = await this.name
    .split(" ")
    .reduce((acc, cur) => (cur.length ? acc + cur + " " : acc))
    .trim();

  firstLetterUppercase: this.name = await this.name
    .split(" ")
    .map(name => name.charAt(0).toUpperCase() + name.slice(1))
    .join(" ");

  next();
});

global.MaterialSchema =
  global.MaterialSchema || mongoose.model("Product", Schema);
module.exports = global.MaterialSchema;
