var HDWalletProvider = require("truffle-hdwallet-provider");
var infura_apikey = "LXCXcs70wrLpSTS1z3Yb"; // Either use this key or get yours at https://infura.io/signup. It's free.
var mnemonic = "replace eager finger theme walnut eight early unlock joke audit result lawn";

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      gas: 6500000,
      network_id: "5777"
    },
    ropsten:  {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/" + infura_apikey),
      network_id: 3,
      gas: 4500000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};