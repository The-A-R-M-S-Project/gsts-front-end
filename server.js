let express = require("express");
let serveStatic = require("serve-static");
app = express();
app.use(serveStatic(__dirname + "/dist"));
let port = process.env.PORT || 5001;
app.listen(port);
console.log("Server started " + port);
