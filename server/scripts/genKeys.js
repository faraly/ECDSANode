const lib = require("ethereum-cryptography/secp256k1");
const utils = require("ethereum-cryptography/utils")
const random = lib.secp256k1.utils.randomPrivateKey;

const privateKeys = [
    random(),
    random(),
    random(),
]

console.log("private keys")
console.log(privateKeys.map(utils.toHex));

console.log("addresses")
console.log(privateKeys.map(x => lib.secp256k1.getPublicKey(x,true)).map(utils.toHex))
//Example
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