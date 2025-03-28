const TronWeb = require('tronweb').TronWeb;
require('dotenv').config();

async function main() {
  try {
    console.log('Deploying TronProxyContract...');
    
    // Initialize TronWeb with full configuration
    const tronWeb = new TronWeb({
      fullHost: process.env.TRON_FULL_HOST || 'https://api.trongrid.io',
      headers: { "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY },
      privateKey: process.env.TRON_PRIVATE_KEY
    });

    const deployer = tronWeb.address.fromPrivateKey(process.env.TRON_PRIVATE_KEY);
    console.log(`Deploying contracts with the account: ${deployer}`);
    
    // Get contract bytecode and ABI
    const contractJSON = require('../build/contracts/TronProxyContract.json');
    
    // Deploy the contract
    const contract = await tronWeb.contract().new({
      abi: contractJSON.abi,
      bytecode: contractJSON.bytecode,
      feeLimit: 100000000,
      callValue: 0,
      parameters: []
    });
    
    console.log(`TronProxyContract deployed to: ${contract.address}`);
    console.log('Deployment completed successfully!');
    
    // Save the contract address to .env file
    const fs = require('fs');
    const envContent = fs.readFileSync('.env', 'utf8');
    const updatedEnvContent = envContent + `\nNEXT_PUBLIC_PROXY_CONTRACT_TRC20=${contract.address}\n`;
    fs.writeFileSync('.env', updatedEnvContent);
    console.log('Contract address saved to .env file');
    
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  }); 