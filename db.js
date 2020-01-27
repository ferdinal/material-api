const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let cachedDb;

module.exports = connectToDatabase = () => {
  if (cachedDb) {
    console.log("=> using existing database connection");
    return Promise.resolve(cachedDb);
  }

  console.log("=> using new database connection");
  return mongoose
    .connect(
      "mongodb+srv://dmeals:1234@clusterbebek0-kt7ii.mongodb.net/test?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        dbName: "dailybox"
      }
    )
    .then(db => {
      cachedDb = db;
      return cachedDb;
    })
    .catch(err => {
      console.log(err);
    });
};
