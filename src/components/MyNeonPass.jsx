import { getContracts } from "../hooks/useContracts";
import toast from "react-hot-toast";

export default function MintNeonPass({ wallet, fetchUserNFTs }) {
  async function mintPass() {
    if (!wallet || !wallet.signer) {
      toast.error("Wallet not connected.");
      return;
    }

    try {
      const { neonPass } = getContracts(wallet.signer);
      const tx = await neonPass.mint();
      await tx.wait();

      toast.success("✅ NeonPass minted!");

      if (fetchUserNFTs) {
        await fetchUserNFTs(); // Atualiza a listagem de NFTs
      }
    } catch (err) {
      console.error("Error minting pass:", err);
      toast.error("❌ Failed to mint NeonPass");
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button onClick={mintPass} className="button-solid">
        Mint NeonPass NFT
      </button>
    </div>
  );
}
