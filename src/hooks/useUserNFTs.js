import { useState, useEffect } from "react";
import { getContracts } from "./useContracts";

export function useUserNFTs(wallet) {
  const [owned, setOwned] = useState(false);
  const [tokenURI, setTokenURI] = useState(null);
  const [tokenId, setTokenId] = useState(null);

  async function fetchUserNFTs() {
    if (!wallet || !wallet.signer) return;

    try {
      const { neonPass } = getContracts(wallet.signer);
      const address = await wallet.signer.getAddress();
      const balance = await neonPass.balanceOf(address);

      if (balance > 0n) {
        const tokenIdFetched = await neonPass.tokenOfOwnerByIndex(address, 0);
        const uri = await neonPass.tokenURI(tokenIdFetched);

        const response = await fetch(uri);
        const metadata = await response.json();
        const imageUrl = metadata.image;

        setTokenURI(imageUrl);
        setTokenId(tokenIdFetched.toString());
        setOwned(true);
      } else {
        setOwned(false);
        setTokenURI(null);
        setTokenId(null);
      }
    } catch (error) {
      console.error("Error fetching user's NFTs:", error);
      setOwned(false);
      setTokenURI(null);
      setTokenId(null);
    }
  }

  useEffect(() => {
    fetchUserNFTs();
  }, [wallet]);

  return { owned, tokenURI, tokenId, fetchUserNFTs };
}
