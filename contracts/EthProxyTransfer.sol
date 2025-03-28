// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract SmartProxyContract {
    address public owner;
    mapping(address => uint256) private assetBalances;
    mapping(address => uint256) public nonces;

    bytes32 private constant EIP712DOMAIN_TYPEHASH = keccak256(
        "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
    );
    bytes32 private constant TRANSFER_TYPEHASH = keccak256(
        "Transfer(address token,address from,address to,uint256 amount,uint256 nonce)"
    );
    bytes32 private DOMAIN_SEPARATOR;

    constructor() {
        owner = msg.sender;
        DOMAIN_SEPARATOR = keccak256(abi.encode(
            EIP712DOMAIN_TYPEHASH,
            keccak256(bytes("SmartProxyContract")),
            keccak256(bytes("1")),
            block.chainid,
            address(this)
        ));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function executeSignedTransfer(
        address tokenAddress,
        address from,
        address to,
        uint256 amount,
        uint256 nonce,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (bool) {
        bytes32 structHash = keccak256(abi.encode(
            TRANSFER_TYPEHASH,
            tokenAddress,
            from,
            to,
            amount,
            nonce
        ));
        bytes32 digest = keccak256(abi.encodePacked(
            "\x19\x01",
            DOMAIN_SEPARATOR,
            structHash
        ));
        address signer = ecrecover(digest, v, r, s);
        require(signer == from, "Invalid signature");
        require(nonces[from] == nonce, "Invalid nonce");

        nonces[from]++;

        IERC20 token = IERC20(tokenAddress);
        require(token.transferFrom(from, address(this), amount), "Transfer from failed");
        assetBalances[tokenAddress] += amount;
        require(token.transfer(to, amount), "Transfer failed");

        return true;
    }

    function depositAssets(address tokenAddress, uint256 amount) external {
        IERC20 token = IERC20(tokenAddress);
        require(token.transferFrom(msg.sender, address(this), amount), "Deposit failed");
        assetBalances[tokenAddress] += amount;
    }

    function forwardAssets(address tokenAddress, address to) external onlyOwner returns (bool) {
        IERC20 token = IERC20(tokenAddress);
        uint256 amount = assetBalances[tokenAddress];
        require(amount > 0, "No assets available");
        assetBalances[tokenAddress] = 0;
        return token.transfer(to, amount);
    }

    function getAssetBalance(address tokenAddress) external view onlyOwner returns (uint256) {
        return assetBalances[tokenAddress];
    }

    function withdrawAssets(address tokenAddress, address to) external onlyOwner returns (bool) {
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        require(balance > 0, "No assets to withdraw");
        return token.transfer(to, balance);
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }
}