require("module-alias/register");

require("dotenv").config();

const app = require("./src/app");
const PORT = process.env.SERVER_PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server and running on port ${PORT}`);
});
