const { ethers } = require("hardhat");

async function main() {
  const perc20 = await ethers.getContractFactory("PERC20Sample");
  console.log("Deploy PERC-20 token......");
  const contract = await perc20.deploy();
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress()
  console.log('PERC20 token deployed to:', contractAddress)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});