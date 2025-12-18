import { useState } from 'react'
import { createWalletClient, custom, getAddress } from 'viem'
import { sepolia } from 'viem/chains'
import { FAUCET_ADDRESS, FAUCET_ABI } from './constants'

function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function claim() {
    if (!window.ethereum) return alert("Please install MetaMask");
    setLoading(true);
    setMessage("");

    try {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      const client = createWalletClient({
        account,
        chain: sepolia,
        transport: custom(window.ethereum)
      });

      const hash = await client.writeContract({
        address: getAddress(FAUCET_ADDRESS),
        abi: FAUCET_ABI,
        functionName: 'requestTokens',
      });

      setMessage(`Success! Tx Hash: ${hash.slice(0, 20)}...`);
    } catch (err: any) {
      if (err.message.includes("Rate limit")) {
        setMessage("❌ Error: You must wait 24 hours between claims.");
      } else {
        setMessage("❌ Transaction failed or rejected.");
      }
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