const dbConnect = require("../db");
const Material = require("../models/material");

module.exports = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    dbConnect().then(async () => {
      const newMaterialBody = JSON.parse(event.body);

      let {
        name,
        image,
        unit,
        order: { multiplier, minimum, maximum },
        price: { cogs, sellingPrice }
      } = newMaterialBody;

      let newMaterial = await new Material({
        name,
        image,
        unit,
        order: {
          multiplier,
          minimum,
          maximum
        },
        price: {
          cogs,
          sellingPrice
        }
      });

      await newMaterial.save();

      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
          productMaterial: newMaterial,
          message: "New material created successfully."
        })
      });
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "text/plain"
      },
      body: "Could not create material."
    });
  }
};
