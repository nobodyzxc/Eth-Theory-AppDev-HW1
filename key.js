// npm-library
const Wallet = require('ethereumjs-wallet');
const keccak256 = require('js-sha3').keccak256;

// keypair
const wallet = Wallet.generate();

// privKey
console.log("privKey:", wallet.getPrivateKeyString());

// pubKey
console.log("pubKey:", wallet.getPublicKeyString());

// address
let address = wallet.getAddressString();
console.log("address:", address);
