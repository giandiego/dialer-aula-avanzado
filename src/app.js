import express from "express";
import morgan from "morgan";
import cors from "cors";
import config from "./config";
import ApiBase from "./routes/apibase.routes";
import Auth from "./routes/auth.routes";
import Asterisk from "./routes/asterisk.routes";

// Constantes
const app = express();
const domain = config.ssl === "true" ? "https://" + config.domain : "http://" + config.domain;

//console.log(config);
// settings API
app.set("port", config.port);
app.set("ssl", config.ssl);
app.set("domain", domain);
app.set("key", config.key);
app.set("cert", config.cert);

//middlewares
//const corsOptions = { origin: domain + ":" + config.port };
const corsOptions = { origin: "*" };
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Content-Type-Options, Authorization"
  );
  next();
});

morgan.token("statusColor", (req, res, args) => {
  // get the status code if response written
  const status = (
    typeof res.headersSent !== "boolean" ? Boolean(res.header) : res.headersSent
  )
    ? res.statusCode
    : undefined;

  // get status color
  const color =
    status >= 500
      ? 31 // red
      : status >= 400
      ? 33 // yellow
      : status >= 300
      ? 36 // cyan
      : status >= 200
      ? 32 // green
      : 0; // no color

  return "\x1b[" + color + "m" + status + "\x1b[0m";
});
app.use(
  morgan(
    `\x1b[33m:remote-addr :remote-user :method\x1b[0m \x1b[36m:url\x1b[0m :statusColor \x1b[35m:response-time ms - length|:res[content-length]`,
    { skip: (req, res) => req.url === "/RutaSkyLogMorgan" }
  )
);


app.use(
  express.json({
    limit: '50mb',
  })
);
app.use(
  express.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true,
  })
);
//Routes
app.get("/", (req, res) => {
  res.json({ message: "WELCOME API BASE" });
  // res.status(403).json();
});

app.use("/api/v1/Authorization", Auth);
app.use("/api/v1/Manager", Asterisk);
app.use("/api/v1/ApiBase", ApiBase);


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    let formattedError = {
      success: false,
      message: err.message,
    };
    console.log(formattedError);
    return res.status(err.statusCode).json(formattedError); // Bad request
  }
  next();
});

app.use(function(req, res, next) {
  //console.log("REQ => ",req);
  res.status(404).send('Sorry cant find that!');
});


export default app;
