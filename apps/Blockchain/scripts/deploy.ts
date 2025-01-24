// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // 1. Get the ContractFactory
  const MyNFT = await hre.ethers.getContractFactory("MyNFT");

  // 2. Deploy the contract
  const myNft = await MyNFT.deploy();
  await myNft.deployed();

  console.log("MyNFT deployed to:", myNft.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});