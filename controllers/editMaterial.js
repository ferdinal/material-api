const dbConnect = require("../db");
const Material = require("../models/material");

module.exports = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    dbConnect().then(async () => {
      const { id } = event.pathParameters;
      const updateBody = JSON.parse(event.body);
      const updatedMaterial = await Material.findByIdAndUpdate(id, updateBody, {
        new: true,
        runValidators: true
      });

      if (!updatedMaterial) {
        callback(null, {
          statusCode: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({
            message: "Product material does not exist."
          })
        });
      } else {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({
            material: updatedMaterial,
            message: "Product material updates successful."
          })
        });
      }
    });
  } catch (err) {
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "text/plain"
      },
      body: "Could not update material."
    });
  }
};
