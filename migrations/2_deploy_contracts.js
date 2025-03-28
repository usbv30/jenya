const TronProxyContract = artifacts.require("TronProxyContract");

module.exports = function(deployer) {
  deployer.deploy(TronProxyContract);
}; 