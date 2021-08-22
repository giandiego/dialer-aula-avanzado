import app from "./app";
import fs from "fs";
import https from "https";
import "./database";
import "./controllers/createDefaultUser";

// settings API 
//HTTPS
if (app.get("ssl") === "true") {
  //Certificados
  const options = {
    key: fs.readFileSync(app.get("key")),
    cert: fs.readFileSync(app.get("cert")),
  };

  https.createServer(options, app).listen(app.get("port"));
  console.log(
    "HTTPS Server listening on %s:%s",
    app.get("domain"),
    app.get("port")
  );
//HTTTP
} else {
  app.listen(app.get("port"));
  console.log("Server started at %s:%s", app.get("domain"), app.get("port"));
}

process.once('SIGHUP', function (code) {
  console.log('SIGHUP  received...');
  process.exit(1);
  //app.close();
});