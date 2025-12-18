# ERC-20 Token Faucet DApp (Sepolia Testnet)

A full-stack decentralized application (DApp) that allows users to claim free FTK (Faucet Tokens). This project features an ERC-20 smart contract, a Faucet contract with a 24-hour rate limit, and a React frontend integrated with Viem.

## 🚀 Live Links

* Live DApp: https://erc20-faucet-dapp-root-q8s5.vercel.app/
* Video Demo: https://drive.google.com/file/d/1UJ25BQszTZQMarOtHqFsdioChaONAKGL/view?usp=sharing

## 🛠 Deployed Addresses (Sepolia)

* FauceterToken (ERC-20): 0x6242FfE329996a7C17898e441C7115d59E56b0b5
* Faucet Contract: 0x7E59A5e1Dc4abfDD83A55d8C0402F3DA315d5788

## 🧠 Skills & Features

* Smart Contract Security: Implemented ERC-20 standards using OpenZeppelin.
* Rate Limiting: On-chain logic prevents a single wallet from claiming tokens more than once every 24 hours.
* Secure Key Management: Utilized Hardhat Keystore to manage deployment secrets without exposing private keys in code.
* Frontend Integration: Built with React, TypeScript, and Vite, using Viem for high-performance blockchain interactions.

## 💻 Tech Stack

* Blockchain: Solidity, Hardhat, OpenZeppelin
* Frontend: React (TS), Vite, Viem
* Deployment: Hardhat Ignition & Vercel

graph TD
    User((User)) -->|Connect Wallet| ReactApp[React Frontend]
    ReactApp -->|Check Health| HealthEndpoint[/health]
    ReactApp -->|window.__EVAL__| Grader[Automated Evaluator]
    ReactApp -->|requestTokens| FaucetContract[Faucet Smart Contract]
    FaucetContract -->|Transfer FTK| User
    FaucetContract -.->|24h Rate Limit| User

## ⚙️ Local Setup

### Prerequisites

* Node.js (v18+)
* MetaMask Browser Extension

### Installation

1. Clone the repo:
   git clone https://github.com/Srikar-jayanthi/erc20-faucet-dapp-root.git
   cd erc20-faucet-dapp-root

2. Install dependencies:
   npm install
   cd frontend && npm install

3. Run locally:
   npm run dev

## 📝 License

This project is for educational purposes under the MIT License.

---

### Final Submission Steps

1. Paste this entire block into your README.md file.
2. Replace the [Insert Your YouTube/Loom Link Here] text with your actual video link.
3. Submit your GitHub Repo URL, Vercel Live URL, and Video Link to Partnr.
