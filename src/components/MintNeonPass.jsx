import { getContracts } from "../hooks/useContracts";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import { NEON_PASS_NFT_ADDRESS } from "../utils/constants"; // endereço do contrato de NFT

export default function MintNeonPass({ wallet, fetchUserNFTs }) {
  async function mintPass() {
    if (!wallet || !wallet.signer) {
      toast.error("Wallet not connected yet.");
      return;
    }

    try {
      const { neonToken, neonPass } = getContracts(wallet.signer);

      // Primeiro: dar approve
      const allowance = await neonToken.allowance(
        await wallet.signer.getAddress(),
        NEON_PASS_NFT_ADDRESS
      );

      if (allowance.lt(ethers.utils.parseEther("10"))) {
        // supondo que o mint custa 10 NEON
        const approveTx = await neonToken.approve(
          NEON_PASS_NFT_ADDRESS,
          ethers.constants.MaxUint256
        );
        toast("⏳ Approving NEON tokens...");
        await approveTx.wait();
        toast.success("✅ NEON tokens approved!");
      }

      // Segundo: fazer mint
      const tx = await neonPass.mint();
      toast("⏳ Minting NeonPass...");
      await tx.wait();

      toast.success("✅ NeonPass minted!");

      if (fetchUserNFTs) {
        await fetchUserNFTs();
      }
    } catch (err) {
      console.error("Error minting NeonPass:", err);
      if (err?.error?.message) {
        toast.error(`❌ ${err.error.message}`);
      } else if (err?.message) {
        toast.error(`❌ ${err.message}`);
      } else {
        toast.error("❌ Failed to mint NeonPass");
      }
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
