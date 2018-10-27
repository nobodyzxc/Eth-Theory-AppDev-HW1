# Eth-Theory-AppDev HW1

### 1. Please compare hash function and cryptographic hash function and give an example.


##### Hash function

[Hash function](https://en.wikipedia.org/wiki/Hash_function) 是指可以將任意長度資料映對到固定長度資料的函數。Hash function 可以用於加速表或資料庫的查詢，有效降低搜尋資料時的複雜度。

所有的 Hash function 都有一個基本特性：
> 如果兩個 Hash value 不相同，那麼他們的 input data 也不相同。

但一個 Hash function 的 Hash value 卻可能可以由兩個不同的 input data 產生，此稱為 collision，一個好的 Hash function 會盡量避免此種情況。

```
           hash
"input1" ──────── 0x3456 ──┐
                           ├── collision
"input2" ──────── 0x3456 ──┘

"input3" ──────── 0x9345

```

例子：
[Jenkins hash function](https://en.wikipedia.org/wiki/Jenkins_hash_function)(non-cryptografic hash function)
[calculator](https://alexguirre.github.io/jooat/)
```
jenkins("Eth-Theory-AppDev") == "0x6C55A0C1"
```



##### Cryptographic hash function

[Cryptographic hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function) 則是一種 hash function 。

允許簡單快速的驗證一給定 input data 是否為該給定 hash value 的映對，不過一旦 input data 未知，便難以從 hash value 倒推而得，所以是一個「單向」的操作，易於從 input data 推知 Hash value 但難以推回。

此一性質可以用來確認傳輸資料的完整性。Cryptographic hash function 也應該具有 Collision resistance 特性，亦即不易產生碰撞的。

Cryptographic hash function 有以下五種主要特性：

- 同樣的 input data 總是產生同樣的 Hash value
- 能夠從一給定 input data 快速計算 Hash value
- 難以從 Hash value 推回 input data 除非暴力破解
- 雪崩效應，input data 的小改變，將會得到截然不同的 Hash value
- 難以從兩個 input data 得到相同的 hash value (Collision resistance)

例子：

[sha256](https://en.wikipedia.org/wiki/SHA-2)(cryptografic hash function)
[calculator](https://passwordsgenerator.pro/sha256)
```
sha256("Eth-Theory-AppDev") == "DE69333DFB1007B8365F9E08F62D0869C325796FC23A2309DE92981AF9512A76"
```

### 2. Keys and address

##### a. Can you print the private/public key with hex string representation? Please give us an example.

```
privKey:
0xf6f015754629f251802d56ff9efd4b03394bc74356298949d2220654c3439305

pubKey:
0xbeccf818e629e09fa3e8bc3528330861012e6f23afc08a534aacdbd197a2ea92d53fcd8346868dd5fdb7b3e50c190342a3b95fafc1c942f706962c1fe6810e55

address:
0xa155b09d109071515a7b412d04e181ca02a2aad7
```

##### b. In addition, if we don’t want to use the getAddressString() to get the address, how can we obtain the address by hashing the public key?

address.js :
```
/***** address *****/

// step 2:  public_key_hash = Keccak-256(public_key)
public_key_hash = keccak256(wallet.getPublicKey())

// step 3:  address = '0x' + last 20 bytes of public_key_hash
address = '0x' + public_key_hash.substr(public_key_hash.length - 40)

console.log("retrived address:", address);
```

##### c. There is a file called Keystore that is used to encrypt the private key and save in a JSON file. Can you generate a Keystore with the password “nccu”? You can find the details about Keystore below.

```
{
   "address":"8f06d53db548ca867d17b9522f3149ec0a573e49",
   "crypto":{
      "cipher":"aes-128-ctr",
      "ciphertext":"e3481b9b008413b8531ed56c6673b863be18e3462cfa1a5bb26f4164e20dd0ee",
      "cipherparams":{
         "iv":"9d85a0c083fc4ee1d6358c70227ef1dc"
      },
      "kdf":"scrypt",
      "kdfparams":{
         "dklen":32,
         "n":262144,
         "p":1,
         "r":8,
         "salt":"da405be37913a20a4b54447174b5558ff507d46a388d6afcf99fed5438471348"
      },
      "mac":"a48459067193abd73c6ab7ed53d4064aeeeeaf579dfee1e21dbada08e81ad9c6"
   },
   "id":"17a1d68b-f5d4-4a3f-9ea8-ac84cee6824d",
   "version":3
}
```

### Bonus

##### What is HD Wallet, BIP32, BIP39 and BIP44?

> ##### BIP
全名是 Bitcoin Improvement Proposals，是提出 Bitcoin 的新功能或改進措施的文件。可由任何人提出，經過審核後公佈在 [bitcoin/bips](https://github.com/bitcoin/bips) 上。BIP 和 Bitcoin 的關係，就像是 RFC 之於 Internet。

> ##### [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)
定義 Hierarchical Deterministic wallet （簡稱 “HD Wallet”)，是一個系統可以從單一個 seed 產生一樹狀結構儲存多組 keypairs（私鑰和公鑰）。好處是可以方便的備份、轉移到其他相容裝置（因為都只需要 seed），以及分層的權限控制等。

![BIP32 定義的 HD Wallet](https://cdn-images-1.medium.com/max/1000/0*q7O_DreXk8dWeIz9.)

> ##### [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki)
將 seed 用方便記憶和書寫的單字表示。一般由 12 個單字組成，稱為 mnemonic code(phrase)，中文稱為助記詞或助記碼。例如：
```
rose rocket invest real refuse margin festival danger anger border idle brown
```

> ##### [BIP44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki)
基於 BIP32 的系統，賦予樹狀結構中的各層特殊的意義。讓同一個 seed 可以支援多幣種、多帳戶等。各層定義如下：
```
m / purpose' / coin_type' / account' / change / address_index
```
其中的 `purporse'` 固定是 `44'`，代表使用 BIP44。而 `coin_type'` 用來表示不同幣種，例如 Bitcoin 就是 `0'`，Ethereum 是 `60'`。

> ##### Ethereum HD Wallet
Ethereum 的錢包目前均採用以上 Bitcoin HD Wallet 的架構，並訂 `coin_type'` 為 `60'`，可以在 [ethereum/EIPs/issues](https://github.com/ethereum/EIPs/issues/84) 中看到相關的討論。舉例來說，在一個 Ethereum HD Wallet 中，第一個帳戶（這裡的帳戶指 BIP44 中定義的 `account'`）的第一組 keypair，其路徑會是 `m/44'/60'/0'/0/0`。

引用來源：[【加密貨幣錢包】從 BIP32、BIP39、BIP44 到 Ethereum HD Wallet](https://medium.com/taipei-ethereum-meetup/%E8%99%9B%E6%93%AC%E8%B2%A8%E5%B9%A3%E9%8C%A2%E5%8C%85-%E5%BE%9E-bip32-bip39-bip44-%E5%88%B0-ethereum-hd-%EF%BD%97allet-a40b1c87c1f7)

##### What is RFC 6979 for?

在橢圓曲線加密演算法 (ECDSA，比特幣、以太坊區塊鏈所使用的非對稱式金鑰加密技術) 中，有一個僅產生一次性使用的臨時簽名變數 k（Ephemeral Key），因為不夠隨機或是都使用同樣的值，倒致駭客可以透過反推得 k 值。

一旦得到 k 值，持幣者的 private key 也可以被倒推出來。

而 RFC 6979 提出了較佳的 k 值選法，保證 k 值足夠隨機，以免 private key 被倒推回來。

參考來源：[橢圓曲線加密演算法 ECDSA 與 RFC6979 改進提案](https://steemit.com/cryptography/@oneleo/ecdsa-rfc6979)
