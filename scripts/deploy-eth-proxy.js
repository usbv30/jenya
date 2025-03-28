const { ethers } = require("hardhat");
require('dotenv').config();

async function main() {
  console.log("Deploying SmartProxyContract contract...");
  
  // Get the deployer's address
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Deploy the contract
  const ProxyContract = await ethers.getContractFactory("SmartProxyContract");
  const proxy = await ProxyContract.deploy();
  await proxy.deployed();
  
  console.log("SmartProxyContract deployed to:", proxy.address);
  
  // Save the contract address to .env file
  const fs = require('fs');
  const envContent = fs.readFileSync('.env', 'utf8');
  const updatedEnvContent = envContent + `\nNEXT_PUBLIC_PROXY_CONTRACT_ERC20=${proxy.address}\n`;
  fs.writeFileSync('.env', updatedEnvContent);
  console.log('Contract address saved to .env file');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 