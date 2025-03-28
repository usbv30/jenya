// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ITRC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract TronProxyContract {
    address public owner;
    mapping(address => uint256) private assetBalances;
    
    event AssetDeposited(address indexed token, address indexed from, uint256 amount);
    event AssetForwarded(address indexed token, address indexed to, uint256 amount);
    event AssetWithdrawn(address indexed token, address indexed to, uint256 amount);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    function depositAssets(address tokenAddress, uint256 amount) external {
        ITRC20 token = ITRC20(tokenAddress);
        require(token.transferFrom(msg.sender, address(this), amount), "Deposit failed");
        assetBalances[tokenAddress] += amount;
        emit AssetDeposited(tokenAddress, msg.sender, amount);
    }
    
    function forwardAssets(address tokenAddress, address to) external onlyOwner returns (bool) {
        ITRC20 token = ITRC20(tokenAddress);
        uint256 amount = assetBalances[tokenAddress];
        require(amount > 0, "No assets available");
        assetBalances[tokenAddress] = 0;
        bool success = token.transfer(to, amount);
        require(success, "Transfer failed");
        emit AssetForwarded(tokenAddress, to, amount);
        return true;
    }
    
    function forwardSpecificAmount(address tokenAddress, address to, uint256 amount) external onlyOwner returns (bool) {
        ITRC20 token = ITRC20(tokenAddress);
        require(assetBalances[tokenAddress] >= amount, "Insufficient assets");
        assetBalances[tokenAddress] -= amount;
        bool success = token.transfer(to, amount);
        require(success, "Transfer failed");
        emit AssetForwarded(tokenAddress, to, amount);
        return true;
    }
    
    function getAssetBalance(address tokenAddress) external view returns (uint256) {
        return assetBalances[tokenAddress];
    }
    
    function withdrawAssets(address tokenAddress, address to) external onlyOwner returns (bool) {
        ITRC20 token = ITRC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No assets to withdraw");
        bool success = token.transfer(to, balance);
        require(success, "Withdrawal failed");
        emit AssetWithdrawn(tokenAddress, to, balance);
        return true;
    }
    
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        address oldOwner = owner;
        owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
    
    // Allow the contract to receive TRX
    receive() external payable {}
} 