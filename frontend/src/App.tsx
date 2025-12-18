import 'viem/window'; // Fixes "Property ethereum does not exist on type Window"
import { useState } from 'react'
import { createWalletClient, custom, getAddress } from 'viem'
import { sepolia } from 'viem/chains'
import { FAUCET_ADDRESS, FAUCET_ABI } from './constants'

function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function claim() {
    // Check if window.ethereum exists
    if (!window.ethereum) return alert("Please install MetaMask");
    setLoading(true);
    setMessage("");

    try {
      // 1. Request accounts from MetaMask
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0]; // Get the first connected address
      
      // 2. Initialize the Wallet Client
      const client = createWalletClient({
        account,
        chain: sepolia,
        transport: custom(window.ethereum)
      });

      // 3. Execute the contract write
      // We explicitly pass the 'account' here to satisfy TypeScript
      const hash = await client.writeContract({
        account, 
        address: getAddress(FAUCET_ADDRESS),
        abi: FAUCET_ABI,
        functionName: 'requestTokens',
      });

      setMessage(`Success! Tx Hash: ${hash.slice(0, 20)}...`);
    } catch (err: any) {
      // Generic error handling; checks for common rejection or contract errors
      if (err.message && err.message.includes("Wait")) {
        setMessage("❌ Error: You must wait 24 hours between claims.");
      } else {
        setMessage("❌ Transaction failed or rejected.");
      }
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div style={{ textAlign: 'center', padding: '50px', fontFamily: 'Arial' }}>
      <h1>FTK Token Faucet</h1>
      <p>Contract: {FAUCET_ADDRESS}</p>
      <button 
        onClick={claim} 
        disabled={loading}
        style={{ padding: '15px 30px', fontSize: '18px', cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? "Processing..." : "Claim 10 FTK Tokens"}
      </button>
      {message && <p style={{ marginTop: '20px', fontWeight: 'bold' }}>{message}</p>}
    </div>
  );
}

export default App;