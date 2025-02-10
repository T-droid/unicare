import errorHandler from "errorhandler";
import http from "http"; // Use HTTP for non-SSL setup
import https from "https"; // Keep HTTPS if needed
import fs from "fs";
import path from "path";
import app from "./app";

/**
 * Error Handler. Provides full stack
 */
if (process.env.NODE_ENV === "development") {
  app.use(errorHandler());
}

// const httpsOptions = {
//   key: fs.readFileSync(path.join(__dirname, "ssl", "self-signed.key")),
//   cert: fs.readFileSync(path.join(__dirname, "ssl", "self-signed.crt")),
// };

/**
 * Start Express server
 */
const port = app.get("port");
const env = app.get("env");

if (process.env.NODE_ENV === "production") {
  // Use HTTPS in production when we get ssl key
  //   https.createServer(httpsOptions, app).listen(port, () => {
  //     console.log("App is running at https://localhost:%d in %s mode", port, env);
  //     console.log("Press CTRL-C to stop\n");
  //   });
  https.createServer(app).listen(port, () => {
    console.log("App is running at https://localhost:%d in %s mode", port, env);
    console.log("Press CTRL-C to stop\n");
  });
} else {
  // Use HTTP in development
  http.createServer(app).listen(port, () => {
    console.log("App is running at http://localhost:%d in %s mode", port, env);
    console.log("Press CTRL-C to stop\n");
  });
}
