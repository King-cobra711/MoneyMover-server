const app = require("./index.js");
const Port = process.env.PORT || 3001;

app.listen(Port, () => {
  console.log("App is running on port " + Port);
});
