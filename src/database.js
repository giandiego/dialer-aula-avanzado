import mongoose from "mongoose";
import config from "./config";

(async () => {
  try {
    const db = await mongoose.connect(config.mongodbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      poolSize: 10,
      //autoIndex: true,
    });
    console.log("Database is connected to: ", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();