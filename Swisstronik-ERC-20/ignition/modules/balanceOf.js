// Import necessary modules from Hardhat and SwisstronikJS
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

// Function to send a shielded query using the provided provider, destination, and data
const sendShieldedQuery = async (provider, destination, data) => {
  // Get the RPC link from the network configuration
  const rpcLink = hre.network.config.url;

  // Encrypt the call data using the SwisstronikJS function
  const [encryptedData, usedEncryptionKey] = await encryptDataField(rpcLink, data);

  // Execute the call/query using the provider
  const response = await provider.call({
    to: destination,
    data: encryptedData,
  });

  // Decrypt the call result using the SwisstronikJS function
  return await decryptNodeResponse(rpcLink, response, usedEncryptionKey);
};

async function main() {
  // Address of the deployed contract
  //Default addr
  //const replace_contractAddress = "0x7D804090e7a1FF0709d743d115bccE6757Bbe208";
  //Custom addr
  const replace_contractAddress = "0xdFB8AA56866269331F64305bE9aF1DcE6b9ffd7c";

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners();

  // Create a contract instance
  const replace_contractFactory = await hre.ethers.getContractFactory("TestToken");
  const contract = replace_contractFactory.attach(replace_contractAddress);

  // Send a shielded query to retrieve balance data from the contract
  const replace_functionName = "balanceOf";
//Default wallet
  //const replace_functionArgs = ["0x87Ea036731B7Bef166b6bC76943EC64848eB2492"];
//1s wallet
  //const replace_functionArgs = ["0x6dBD3d2C6BC116ED9a07f9684C1Df613551F9eF5"];
//2nd wallet
  const replace_functionArgs = ["0x324ac09a8Df5EbCCA862A716f4ABEf4f6bec446c"];
  const responseMessage = await sendShieldedQuery(signer.provider, replace_contractAddress, contract.interface.encodeFunctionData(replace_functionName, replace_functionArgs));

  // Decode the Uint8Array response into a readable string
  console.log("Check token:", replace_contractAddress);
  console.log("Target wallet:", replace_functionArgs);
  console.log("Result:", contract.interface.decodeFunctionResult(replace_functionName, responseMessage)[0]);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});