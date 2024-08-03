const hre = require("hardhat");

async function main() {
  const Contract = await ethers.getContractFactory('MintERC721')

  console.log('Deploying ERC721...')
  const contract = await Contract.deploy()

  await contract.waitForDeployment()
  const contractAddress = await contract.getAddress()

  console.log('ERC721 deployed to:', contract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })