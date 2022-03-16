const { ethers } = require("hardhat");
const hre = require("hardhat");

let sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function deploy(contractName) {
  const cContract = await ethers.getContractFactory(contractName);
  let c_contract;
  if (contractName == "ChigozieNft") {
    c_contract = await cContract.deploy("Chigozie", "CHENft");
  } else {
    c_contract = await cContract.deploy();
  }
  await c_contract.deployed(5);
  console.log(
    `Contract ${contractName} deployed to address: ${c_contract.address}`
  );
  return c_contract;
}

async function verifyContract(contract, _address) {
  //   await sleep(1500 * 60);
  let contructor_arguments = [];

  if (contract == "ChigozieNft") {
    contructor_arguments = ["Chigozie", "CHENft"];
  }
  verify = await hre.run("verify:verify", {
    address: _address,
    constructorArguments: contructor_arguments,
  });
  console.log(`successfuly verified`);
  return verify;
}

module.exports = { deploy, verifyContract, sleep };
