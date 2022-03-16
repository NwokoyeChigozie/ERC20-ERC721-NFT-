const { ethers } = require("hardhat");
const hre = require("hardhat");
const { deploy, verifyContract, sleep } = require("./helpful_scripts");
const { pinFileToIPFS } = require("./ipfs");

async function main() {
  const chigozie_token = await deploy("ChigozieToken");
  const chigozie_nft = await deploy("ChigozieNft");

  await sleep(1500 * 60);

  // await verifyContract("ChigozieToken", chigozie_token.address);
  // await verifyContract("ChigozieNft", chigozie_nft.address);

  console.log("current count", await chigozie_nft.tokenCounter());

  console.log("minting nft...");
  let URI = await pinFileToIPFS();
  let tx = await chigozie_nft.mint(URI);
  tx.wait(3);
  console.log("minted nft");

  await sleep(1500 * 60);
  console.log("current count", await chigozie_nft.tokenCounter());

  console.log("minting nft...");
  let URI2 = await pinFileToIPFS();
  let tx2 = await chigozie_nft.mint(URI2);
  tx2.wait(3);
  console.log("minted nft");

  console.log("current count", await chigozie_nft.tokenCounter());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// https://rinkeby.etherscan.io/address/0xCc0db21c5d52bE9073FeeaB0f45420719e3b23e4#code Token
// https://rinkeby.etherscan.io/address/0xB3099B189E11DFA78A9D4d96393FCbf233A6591F#code NFT
