// npm-library
const Wallet = require('ethereumjs-wallet');
const keccak256 = require('js-sha3').keccak256;

// keypair
const wallet = Wallet.generate();

// privKey
privKey = wallet.getPrivateKeyString();

// pubKey
pubKey = wallet.getPublicKeyString();


/***** address *****/

// step 2:  public_key_hash = Keccak-256(public_key)
public_key_hash = keccak256(wallet.getPublicKey())

// step 3:  address = '0x' + last 20 bytes of public_key_hash
address = '0x' + public_key_hash.substr(public_key_hash.length - 40)

console.log("retrived address:", address);

console.log("origin   address:", wallet.getAddressString());
