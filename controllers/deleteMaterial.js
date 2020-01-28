const dbConnect = require("../db");
const Material = require("../models/material");

module.exports = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    dbConnect().then(async () => {
      const { id } = event.pathParameters;
      const deletedMaterial = await Material.findByIdAndRemove(id);
      if (!deletedMaterial) {
        callback(null, {
          statusCode: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify({
            message: "Material does not exist."
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
            material: deletedMaterial,
            message: "Material removal successful."
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
      body: "Could not remove material."
    });
  }
};
