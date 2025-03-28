// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title BscProxyContract
 * @dev A proxy contract for handling token transfers on Binance Smart Chain
 * Allows users to deposit BEP20 tokens and forward them to another address
 */
contract BscProxyContract is Ownable, ReentrancyGuard {
    // Events
    event AssetsDeposited(address indexed tokenAddress, address indexed from, uint256 amount);
    event AssetsForwarded(address indexed tokenAddress, address indexed to, uint256 amount);
    event AssetsWithdrawn(address indexed tokenAddress, address indexed to, uint256 amount);

    constructor() Ownable(msg.sender) {}

    /**
     * @dev Deposits BEP20 tokens into the contract
     * @param tokenAddress The address of the BEP20 token contract
     * @param amount The amount of tokens to deposit
     */
    function depositAssets(address tokenAddress, uint256 amount) external nonReentrant {
        require(tokenAddress != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");
        
        IERC20 token = IERC20(tokenAddress);
        
        // Transfer tokens from sender to this contract
        bool success = token.transferFrom(msg.sender, address(this), amount);
        require(success, "Token transfer failed");
        
        emit AssetsDeposited(tokenAddress, msg.sender, amount);
    }
    
    /**
     * @dev Forwards all tokens of a specific type to another address
     * @param tokenAddress The address of the BEP20 token contract
     * @param to The recipient address
     * @return success Whether the operation was successful
     */
    function forwardAssets(address tokenAddress, address to) external nonReentrant returns (bool) {
        require(tokenAddress != address(0), "Invalid token address");
        require(to != address(0), "Invalid recipient address");
        
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        
        require(balance > 0, "No tokens to forward");
        
        bool success = token.transfer(to, balance);
        require(success, "Token transfer failed");
        
        emit AssetsForwarded(tokenAddress, to, balance);
        return true;
    }
    
    /**
     * @dev Forwards a specific amount of tokens to another address
     * @param tokenAddress The address of the BEP20 token contract
     * @param to The recipient address
     * @param amount The amount of tokens to forward
     * @return success Whether the operation was successful
     */
    function forwardSpecificAmount(address tokenAddress, address to, uint256 amount) external nonReentrant returns (bool) {
        require(tokenAddress != address(0), "Invalid token address");
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than 0");
        
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        
        require(balance >= amount, "Insufficient token balance");
        
        bool success = token.transfer(to, amount);
        require(success, "Token transfer failed");
        
        emit AssetsForwarded(tokenAddress, to, amount);
        return true;
    }
    
    /**
     * @dev Gets the balance of a specific token in the contract
     * @param tokenAddress The address of the BEP20 token contract
     * @return The balance of tokens
     */
    function getAssetBalance(address tokenAddress) external view returns (uint256) {
        require(tokenAddress != address(0), "Invalid token address");
        return IERC20(tokenAddress).balanceOf(address(this));
    }
    
    /**
     * @dev Allows the owner to withdraw tokens in case of emergency
     * @param tokenAddress The address of the BEP20 token contract
     * @param to The recipient address
     * @param amount The amount of tokens to withdraw
     */
    function withdrawAssets(address tokenAddress, address to, uint256 amount) external onlyOwner nonReentrant {
        require(tokenAddress != address(0), "Invalid token address");
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than 0");
        
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        
        require(balance >= amount, "Insufficient token balance");
        
        bool success = token.transfer(to, amount);
        require(success, "Token transfer failed");
        
        emit AssetsWithdrawn(tokenAddress, to, amount);
    }
} 