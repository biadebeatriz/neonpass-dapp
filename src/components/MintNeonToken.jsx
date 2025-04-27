import { getContracts } from "../hooks/useContracts";
import { ethers } from "ethers";
import toast from "react-hot-toast";

export default function MintNeonToken({ wallet, fetchBalance }) {
  async function mintTokens() {
    if (!wallet || !wallet.signer) {
      toast.error("Wallet not connected yet.");
      return;
    }

    try {
      const { neonToken } = getContracts(wallet.signer);
      const address = await wallet.signer.getAddress();

      const tx = await neonToken.faucet(
        address,
        ethers.utils.parseEther("100")
      );
      await tx.wait();

      toast.success("✅ 100 NEON tokens minted!");

      if (fetchBalance) {
        await fetchBalance(); // Atualiza o saldo
      }
    } catch (err) {
      console.error("Error minting tokens:", err);
      if (err?.error?.message) {
        toast.error(`❌ ${err.error.message}`);
      } else if (err?.message) {
        toast.error(`❌ ${err.message}`);
      } else {
        toast.error("❌ Failed to mint tokens");
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button onClick={mintTokens} className="button-solid">
        Mint 100 NEON Tokens
      </button>
    </div>
  );
}
