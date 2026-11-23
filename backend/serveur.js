const { userRoute } = require("../backend/routes/user.route");
require("dotenv/config");
const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use("/api/users", userRoute);
app.listen(PORT, () => {
  console.log(`Serveur lancer sur http://localhost:${PORT} `);
});
