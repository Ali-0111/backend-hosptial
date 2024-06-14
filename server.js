require("module-alias/register");

require("dotenv").config();

const app = require("./src/app");
const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`I am server and running on port ${PORT}`);
});
