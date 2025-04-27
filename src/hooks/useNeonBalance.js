import { useState, useEffect } from "react";
import { getContracts } from "./useContracts";

export function useNeonBalance(wallet) {
  const [balance, setBalance] = useState(0n);
  async function fetchBalance() {
    if (!wallet || !wallet.signer) return;

    try {
      const { neonToken } = getContracts(wallet.signer);
      const address = await wallet.signer.getAddress();
      const balance = await neonToken.balanceOf(address);
      setBalance(balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
      setBalance(0n);
    }
  }

  useEffect(() => {
    if (!wallet) return;

    fetchBalance();

    const interval = setInterval(() => {
      fetchBalance();
    }, 15000);

    return () => clearInterval(interval);
  }, [wallet]);

  return { balance, fetchBalance };
}
