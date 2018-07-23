var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "LXCXcs70wrLpSTS1z3Yb"; // Either use this key or get yours at https://infura.io/signup. It's free.
var mnemonic = "badge mirror pottery hospital lobster power guilt cabbage clerk power truly interest";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      // gas: 2000000,
      // gasPrice: 10000000000,
      network_id: 1993
    },
    ropsten:  {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey),
      network_id: 3,
      gas: 4500000
    },
    vpncash: {
      host: "https://network.vpncash.org",
      // port: 8545,
      gas: 4712388,
      network_id: '13131'
    },   
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};