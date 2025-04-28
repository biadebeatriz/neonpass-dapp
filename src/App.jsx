import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MintNeonToken from "./components/MintNeonToken";
import MintNeonPass from "./components/MintNeonPass";
import CanvasBackground from "./components/CanvasBackground";
import { connectWallet } from "./components/ConnectWallet";
import { useNeonBalance } from "./hooks/useNeonBalance";
import { useUserNFTs } from "./hooks/useUserNFTs";
import { Toaster } from "react-hot-toast";
import { ethers } from "ethers";

import "./App.css";

export default function App() {
  const [wallet, setWallet] = useState(null);

  const { balance: neonBalance, fetchBalance } = useNeonBalance(wallet);
  const { owned, tokenURI, tokenId, fetchUserNFTs } = useUserNFTs(wallet);

  return (
    <>
      {/* Canvas Background */}
      <CanvasBackground />

      {/* Toaster for Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen text-white flex flex-col items-center pt-24 px-6 font-poppins overflow-hidden">
        {/* Navbar */}
        <Navbar
          wallet={wallet}
          connectWallet={() => connectWallet(setWallet)}
        />

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center gap-6 mt-20 fade-up">
          <h1 className="text-6xl font-bold tracking-widest text-white">
            NeonPass
          </h1>
          <p className="text-lg text-gray-300 leading-relaxed font-light max-w-xl">
            Your gateway to exclusive digital experiences.
          </p>

          <button
            onClick={() => {
              document
                .getElementById("about-section")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-10 animate-bounce text-4xl text-white opacity-70 hover:opacity-100 transition"
          >
            ↓
          </button>
        </section>

        {/* About Section */}
        <section
          id="about-section"
          className="flex flex-col items-center text-center gap-16 mt-24 max-w-5xl px-4"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-purple-600 shadow-md">
              <span className="text-4xl text-white">⚡</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-wide">
              What is NeonToken (NEON)?
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light max-w-3xl">
              NeonToken (NEON) is a digital unit of energy fueling exclusive
              access within the NeonPass ecosystem. Each NEON represents a spark
              of futuristic power, enabling holders to mint their personal
              NeonPass NFT.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-pink-500 shadow-md">
              <span className="text-4xl text-white">🎟️</span>
            </div>
            <h2 className="text-3xl font-bold text-white tracking-wide">
              What is NeonPass NFT?
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light max-w-3xl">
              The NeonPass is an exclusive NFT symbolizing membership in a
              premium, forward-thinking digital community. Minted with NEON
              tokens, it unlocks unique virtual events, premium experiences,
              insider privileges, and future innovations.
            </p>
          </div>
        </section>

        {/* Wallet Info */}
        {wallet && (
          <section className="flex flex-col items-center gap-4 mt-24 w-full max-w-4xl border-t border-gray-700 pt-8">
            <p className="text-sm text-gray-500">Connected Wallet:</p>
            <p className="text-md break-all text-white">{wallet.address}</p>
            {neonBalance !== null && (
              <p className="text-cyan-300 text-xl mt-2 tracking-wide">
                Balance:{" "}
                <strong>
                  {Number(ethers.utils.formatEther(neonBalance)).toFixed(2)}{" "}
                  NEON
                </strong>
              </p>
            )}
          </section>
        )}

        {/* Mint Actions */}
        {wallet && (
          <section className="flex flex-col md:flex-row gap-12 my-16 justify-center w-full max-w-5xl">
            <div className="card-neon w-80">
              <MintNeonToken wallet={wallet} fetchBalance={fetchBalance} />
            </div>

            <div className="card-neon w-80">
              <MintNeonPass wallet={wallet} fetchUserNFTs={fetchUserNFTs} />
            </div>
          </section>
        )}

        {/* NFT Showcase */}
        {wallet && (
          <section className="flex flex-col items-center justify-center my-12 border-t border-gray-700 pt-12 w-full max-w-4xl">
            {owned ? (
              <div className="flex flex-col items-center fade-in">
                <img
                  src={tokenURI}
                  alt="My NeonPass NFT"
                  className="w-64 h-64 object-cover rounded-lg shadow-lg border-2 border-cyan-400"
                />
                <p className="mt-4 text-cyan-300 text-center text-lg">
                  You own a NeonPass NFT!
                </p>

                {}
                <a
                  href={`https://testnets.opensea.io/assets/sepolia/0x38F78e5939492A92aC60f641131eAe902755Cf12/${tokenId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-blue-400 underline hover:text-blue-600"
                >
                  View on OpenSea
                </a>
              </div>
            ) : (
              <div className="flex flex-col items-center fade-in">
                <img
                  src="locked-placeholder.png"
                  alt="Locked NeonPass"
                  className="w-64 h-64 object-cover rounded-lg shadow-lg border-2 border-gray-600"
                />
                <p className="mt-4 text-gray-400 text-center text-lg">
                  No NeonPass minted yet.
                </p>
              </div>
            )}
          </section>
        )}

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
