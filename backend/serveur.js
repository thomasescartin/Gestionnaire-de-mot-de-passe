const { userRoute } = require("../backend/routes/user.route");
require("dotenv/config");
const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.post("/test-json", (req, res) => {
  console.log("Données reçues :", req.body);

  return res.status(200).json({
    message: "JSON reçu correctement",
    data: req.body,
  });
});
app.use("/api/users", userRoute);
app.listen(PORT, () => {
  console.log("Route de test enregistrée : POST /test-json");
  console.log(`Serveur lancer sur http://localhost:${PORT} `);
});
