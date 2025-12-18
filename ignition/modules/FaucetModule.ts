import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

export default buildModule("FaucetModule", (m) => {
  // 1. Deploy the Token
  const token = m.contract("FauceterToken");

  // 2. Deploy the Faucet, passing the token's address
  const faucet = m.contract("Faucet", [token]);

  // 3. Fund the Faucet with 100,000 tokens
  m.call(token, "transfer", [faucet, parseEther("100000")]);

  return { token, faucet };
});