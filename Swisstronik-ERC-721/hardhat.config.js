require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    swisstronik: {
      url: "https://json-rpc.testnet.swisstronik.com/", //URL of the RPC node for Swisstronik.
      //2nd wallet
      accounts: ["0x3d925464fb204d13e88c0cc53eccc5c03e5165df271d9b954302690f92a228f8"],
	//Make sure you have enough funds in this wallet to deploy the smart contract
    },
  },
};