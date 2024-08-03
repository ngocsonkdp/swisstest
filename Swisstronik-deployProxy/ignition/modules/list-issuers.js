const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/utils");

const readContractData = async (provider, contract, method, args) => {
  const res = await sendShieldedQuery(
    provider,
    contract.target,
    contract.interface.encodeFunctionData(method, args),
    '0'
  )

  return contract.interface.decodeFunctionResult(method, res)
}

const sendShieldedQuery = async (provider, destination, data, value) => {
    // Get the RPC link from the network configuration
  const rpcLink = hre.network.config.url;
  const [encryptedData, usedEncryptedKey] = await encryptDataField(rpcLink, data)

  const response = await provider.call({
    to: destination,
    data: encryptedData,
    value,
  })

  if (response.startsWith('0x08c379a0')) {
    return response
  }

  return await decryptNodeResponse(rpcLink, response, usedEncryptedKey)
}

async function main() {
  const [signer] = await ethers.getSigners()
  const contract = await ethers.getContractAt('SWTRImplementation', "0xd5416b833Ba691e2D089486Fb25F448B97f7FE89")

  const issuerCount = (await readContractData(signer.provider, contract, 'issuerRecordCount'))[0]

  console.log('Issuer Count:', issuerCount.toString())

  if (issuerCount === 0n) return

  const issuers = await readContractData(signer.provider, contract, 'listIssuersRecord', [0, issuerCount])

  console.log('Issuers:', issuers)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
