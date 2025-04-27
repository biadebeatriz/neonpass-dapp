export default function Navbar({ wallet, connectWallet }) {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-b from-black/80 to-transparent fixed top-0 z-50">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 drop-shadow-lg">
        NeonPass
      </h1>

      {/* Right side: Connect button or Wallet address */}
      {wallet ? (
        <div className="text-sm text-gray-300 bg-gray-800 px-4 py-2 rounded-full shadow-inner">
          {wallet.address.substring(0, 6)}...{wallet.address.slice(-4)}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-md hover:scale-105 transition-all"
        >
          🔗 Connect Wallet
        </button>
      )}
    </nav>
  );
}
