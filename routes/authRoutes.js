const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Example: hardcoded clients (you can load these from DB or config file)
const clients = [
  {
    clientId: "ebc-guest",
    clientSecret:
      "6459dc8d72bdfb8aa5ca66193d15d9ff74c4466f7df82a7236a5e57797d16af396b7e43cfd6f26819d8ef0fa89ac6360e8251623d1907009e31433eabc6acf98",
  },
];

router.post("/token", (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Missing client credentials" });
  }
  const { clientId, clientSecret } = req.body;
  if (!clientId || !clientSecret) {
    return res.status(400).json({ message: "Missing client credentials" });
  }
  const client = clients.find(
    (c) => c.clientId === clientId && c.clientSecret === clientSecret
  );
  if (!client) {
    return res.status(401).json({ message: "Invalid client credentials" });
  }

  const token = jwt.sign(
    { clientId: client.clientId },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

module.exports = router;
