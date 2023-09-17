const express = require("express");
const app = express();
const cors = require("cors");
const sha256 = require('ethereum-cryptography/sha256');
const secp256k1 = require("ethereum-cryptography/secp256k1");
const utils = require("ethereum-cryptography/utils")
const port = 3042;

app.use(cors());
app.use(express.json());
/*
private keys
[
  '23b4fdeba8c7a9c3f5afb3f008670eb4e693815a84379b362fcaadf902f1c997',
  '5a5179169df6500dc6d4e432bcdfb30ab29e2dbb3efad345c4f84ea7443a4382',
  'e57d215a016a69bdefa7d02586bc98e9bbde6628cf72428173af225b86605cf7'
]
addresses
[
  '0284ab6bbe9241676db7463576c60573f35a7b08eb495a4b2c3a55901f4aa09349',
  '031266dadb81de507ccc9c24189a56451a4382369f3e95d743e57abdeb27c2efdd',
  '02f444ad255fc8dca4dff4cda61a50b8256c886f007a074ffd8c41b16a24c530b0'
]
*/
const balances = {
  "0284ab6bbe9241676db7463576c60573f35a7b08eb495a4b2c3a55901f4aa09349": 100,
  "031266dadb81de507ccc9c24189a56451a4382369f3e95d743e57abdeb27c2efdd": 50,
  "02f444ad255fc8dca4dff4cda61a50b8256c886f007a074ffd8c41b16a24c530b0": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, signature } = req.body;
  const payload = {sender, amount, recipient};
  const payloadBytes = utils.utf8ToBytes(JSON.stringify(payload));
  const hash = sha256.sha256(payloadBytes);
  if(!secp256k1.secp256k1.verify(signature, hash, sender)){
    res.status(403).send({ message: "Verification failed!" });
    return
  }
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
