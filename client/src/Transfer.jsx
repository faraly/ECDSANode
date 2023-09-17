import { useState } from "react";
import server from "./server";
import { hexToBytes, utf8ToBytes } from "ethereum-cryptography/utils.js"
import { sha256 } from "ethereum-cryptography/sha256.js";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    const payload = {
      sender: address,
      amount: parseInt(sendAmount),
      recipient,
    }
    const payloadBytes = utf8ToBytes(JSON.stringify(payload))
    const hash = sha256(payloadBytes)
    const signature = secp256k1.sign(hash, privateKey).toCompactHex();
    payload.signature = signature;
    try {
      const response = await server.post(`send`, payload);
      const balance = response.data.balance;
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message)
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>
      <label>
        Private Key
        <input
          placeholder="Type your private key"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
