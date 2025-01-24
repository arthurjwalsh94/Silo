// scripts/generateWallet.ts
import { ethers } from "ethers";

async function main() {
  const wallet = ethers.Wallet.createRandom();
  console.log("Address:", wallet.address);
  console.log("Private Key:", wallet.privateKey);
  if (wallet.mnemonic) {
    console.log("Mnemonic:", wallet.mnemonic.phrase);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});