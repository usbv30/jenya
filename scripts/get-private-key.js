// Script to derive private key from mnemonic
const { ethers } = require("ethers");

// Replace with your mnemonic phrase
const mnemonic = process.env.MNEMONIC;

// Derive the wallet from the mnemonic - simpler approach
const wallet = ethers.Wallet.fromPhrase(mnemonic);
// Log the private key (without 0x prefix)
console.log("Your private key (for .env file):", wallet.privateKey.slice(2));
console.log("Your wallet address:", wallet.address);
