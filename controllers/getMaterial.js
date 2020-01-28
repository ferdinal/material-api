const dbConnect = require("../db");
const Material = require("../models/material");

module.exports = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    dbConnect().then(async () => {
      const { id } = event.pathParameters;
      const singleMaterial = await Material.findById(id);
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify({
          material: singleMaterial,
          message: "Material query successful."
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
      body: "Could not query material."
    });
  }
};
