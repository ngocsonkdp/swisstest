
async function main() {
  const [signer] = await ethers.getSigners()
  const initalOwner = signer.address

  const Contract = await ethers.getContractFactory('PrivateNFT')

  console.log('Deploying NFT...')
  const contract = await Contract.deploy(initalOwner)

  await contract.waitForDeployment()
  const contractAddress = await contract.getAddress()

  console.log('NFT deployed to:', contractAddress)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })