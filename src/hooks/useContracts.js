import { ethers } from "ethers";
import NeonTokenAbi from "../abi/NeonToken.json";
import NeonPassNFTAbi from "../abi/NeonPassNFT.json";
import { NEON_TOKEN_ADDRESS, NEON_PASS_NFT_ADDRESS } from "../utils/constants";

export function getContracts(signer) {
  const neonToken = new ethers.Contract(
    NEON_TOKEN_ADDRESS,
    NeonTokenAbi.abi,
    signer
  );
  const neonPassNFT = new ethers.Contract(
    NEON_PASS_NFT_ADDRESS,
    NeonPassNFTAbi.abi,
    signer
  );
  return { neonToken, neonPass: neonPassNFT };
}
