
async function main() {
  const [signer] = await ethers.getSigners()
  console.log(`Deploying Contracts with the account ${signer.address} ...`)

  const SWTRImplementation = await ethers.deployContract('SWTRImplementation')
  await SWTRImplementation.waitForDeployment()
  console.log(`SWTRImplementation deployed to ${SWTRImplementation.target}`)

  const ProxyAdmin = await ethers.deployContract('ProxyAdmin', [signer.address])
  await ProxyAdmin.waitForDeployment()
  console.log(`ProxyAdmin deployed to ${ProxyAdmin.target}`)

  const SWTRProxy = await ethers.deployContract('SWTRProxy', [
    SWTRImplementation.target,
    ProxyAdmin.target,
    SWTRImplementation.interface.encodeFunctionData('initialize', [signer.address]),
  ])
  await SWTRProxy.waitForDeployment()
  console.log(`SWTRProxy deployed to ${SWTRProxy.target}`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })