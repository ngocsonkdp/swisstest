//Import necessary modules from Hardhat and SwisstronikJS

const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

//Function to send a shielded transaction using the provided signer, destination, data, and value
const sendShieldedTransaction = async (signer, destination, data, value) => {
  // Get the RPC link from the network configuration
  const rpcLink = hre.network.config.url;

  // Encrypt transaction data
  const [encryptedData] = await encryptDataField(rpcLink, data);

  // Construct and sign transaction with encrypted data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
   //Address of the deployed contract
  //Default addr
  //const replace_contractAddress = "0x7D804090e7a1FF0709d743d115bccE6757Bbe208";
  //Custom addr
  const replace_contractAddress = "0xE0A9FF105925B9C1c87880247BB78f19Bdbe47Bc";

  //Get the signer (your account)
  const [signer] = await hre.ethers.getSigners();

  //Create a contract instance
  const replace_contractFactory = await hre.ethers.getContractFactory('TestToken');
  const contract = replace_contractFactory.attach(replace_contractAddress);

  //Send a shielded transaction to execute a transaction in the contract
  const replace_functionName = "transfer";
  //Default wallet + amount
  //const replace_functionArgs = ["0x87Ea036731B7Bef166b6bC76943EC64848eB2492", "100"];
  //Custom wallet + amount
  //const replace_functionArgs = ["0x324ac09a8Df5EbCCA862A716f4ABEf4f6bec446c", "1"];
  const replace_functionArgs = ["0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1", "10"];
  const transaction = await sendShieldedTransaction(signer, replace_contractAddress, contract.interface.encodeFunctionData(replace_functionName, replace_functionArgs), 0);

  await transaction.wait();

  //It should return a TransactionResponse object
  console.log("Transaction hash:", `https://explorer-evm.testnet.swisstronik.com/tx/${transaction.hash}`);
}

//Using asyncawait pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});