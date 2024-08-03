const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  // Get the RPC link from the network configuration
  const rpcLink = hre.network.config.url;
  const [encryptedData] = await encryptDataField(rpcLink, data)

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
    gasLimit: 2000000,
  })
}

async function main() {
  const [signer] = await ethers.getSigners()
  const SWTRProxy = await ethers.getContractAt('SWTRProxy', "0x5Cb6dd99CA161CE2cDd20ffab1da1d7BCa6375cd")

  const SWTRImplementation = await ethers.deployContract('SWTRImplementation')
  await SWTRImplementation.waitForDeployment()
  console.log(`SWTRImplementation deployed to ${SWTRImplementation.target}`)

  const proxyAdmin = await ethers.getContractAt('ProxyAdmin', "0x65737f7b0E1aC3bE13A2b19b8243E5A5c59c57A0")

  const tx = await sendShieldedTransaction(
    signer,
    proxyAdmin.target,
    proxyAdmin.interface.encodeFunctionData('upgradeTo', [
      SWTRProxy.target,
      SWTRImplementation.target,
    ]),
    '0'
  )

  const upgradeTx = await tx.wait();
  console.log("Tx hash:", upgradeTx.hash);
  console.log('Contract upgraded successfully!');
console.log("Transaction hash: ", `https://explorer-evm.testnet.swisstronik.com/tx/${upgradeTx.hash}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
