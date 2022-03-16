//imports needed for this function

const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
const path = require("path");
require("dotenv").config();
console.log(process.env.PINATA_API_KEY);

async function pinFileToIPFS() {
  let imagedata = new FormData();
  imagedata.append("file", fs.createReadStream(`${__dirname}/chigozie.jpeg`));
  let response = await pushToIpfs(imagedata);
  imageuri = `https://ipfs.io/ipfs/${response.data.IpfsHash}`;
  console.log("imageuri", imageuri);

  let metadata = JSON.stringify({
    name: "ChigozieNFT",
    image: imageuri,
    description: "My first NFT project",
  });

  fs.writeFileSync(`${__dirname}/meta.json`, metadata, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });

  let jsondata = new FormData();
  jsondata.append("file", fs.createReadStream(`${__dirname}/meta.json`));
  let jresponse = await pushToIpfs(jsondata);
  let jsonuri = `https://ipfs.io/ipfs/${jresponse.data.IpfsHash}`;
  console.log("imageuri", jsonuri);

  //   let mresponse = await pushJsonToIpfs(metadata);
  //   datauri = `https://ipfs.io/ipfs/${mresponse.data.IpfsHash}`;
  //   console.log("datauri", datauri);

  return jsonuri;
}

async function pushToIpfs(data) {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  return await axios
    .post(url, data, {
      maxContentLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      },
    })
    .catch((error) => {
      console.error(error.message);
    });
}

async function pushJsonToIpfs(data) {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  return await axios.post(url, data, {
    maxContentLength: "Infinity",
    headers: {
      pinata_api_key: process.env.PINATA_API_KEY,
      pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
    },
  });
}

// let link = pinFileToIPFS();

module.exports = { pinFileToIPFS };
// https://ipfs.io/ipfs/
