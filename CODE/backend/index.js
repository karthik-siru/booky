const app = require("./app");
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server up and running at port :${PORT}`);
});
