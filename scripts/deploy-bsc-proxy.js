const hre = require("hardhat");
require("dotenv").config();

async function main() {
  console.log("Deploying BSC Proxy Contract...");

  // Get the signer
  const [deployer] = await hre.ethers.getSigners();
  console.log(`Deploying with account: ${await deployer.getAddress()}`);

  // Get the contract factory
  const BscProxyContract = await hre.ethers.getContractFactory("BscProxyContract");
  
  // Deploy the contract
  console.log("Deploying contract...");
  const bscProxy = await BscProxyContract.deploy();
  
  // Wait for deployment to finish
  console.log("Waiting for deployment transaction to be mined...");
  await bscProxy.waitForDeployment();
  const bscProxyAddress = await bscProxy.getAddress();
  
  console.log(`BSC Proxy Contract deployed to: ${bscProxyAddress}`);
  
  // Verify the contract on BSCScan (if API key is provided)
  if (process.env.BSCSCAN_API_KEY) {
    console.log("Waiting for block confirmations...");
    // Wait for 6 block confirmations
    await new Promise(resolve => setTimeout(resolve, 60000)); // Wait 1 minute
    
    console.log("Verifying contract on BSCScan...");
    await hre.run("verify:verify", {
      address: bscProxyAddress,
      constructorArguments: [],
    });
    console.log("Contract verified on BSCScan");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 