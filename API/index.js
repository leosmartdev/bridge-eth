const Web3 = require("web3");
require("dotenv").config();
const Tx = require("ethereumjs-transaction");
const bridgeAddresses = require("./addresses.js");
const web3 = {
  "1": new Web3(process.env.ETH_ENDPOINT),
  "56": new Web3(process.env.BSC_ENDPOINT),
  "137": new Web3(process.env.POLYGON_ENDPOINT),
  "3": new Web3(process.env.ROPSTEN_TESTENT_ENDPOINT),
  "97": new Web3(process.env.BSC_TESTNET_ENDPOINT)
}

let startRunning = async () => {
  let txCount = await web3[network].eth.getTransactionCount(address);
  txCount--;
  var privKey = Buffer.from(process.env.ADMIN_WALLET, "hex");// Genesis private key
  const { address } = web3["1"].eth.accounts.privateKeyToAccount(process.env.ADMIN_WALLET);
  const BridgeABI = require("./abi/bridge.json");
  const bridgeContracts = {
    "1": new web3["1"].eth.Contract(BridgeABI, bridgeAddresses["1"]),
    "56": new web3["56"].eth.Contract(BridgeABI, bridgeAddresses["56"]),
    "137": new web3["137"].eth.Contract(BridgeABI, bridgeAddresses["137"]),
    "3": new web3["3"].eth.Contract(BridgeABI, bridgeAddresses["3"]),
    "97": new web3["97"].eth.Contract(BridgeABI, bridgeAddresses["97"])
  };

  for (prop in bridgeContracts) {
    bridgeContracts[prop].events.Convert(async (err, events) => {
      if (err) {
        console.log(err);
      } else {
        var returnValues = events.returnValues;
        console.log(returnValues);
        const { from, network, to, amount, date, nonce } = returnValues;

        txCount++;
        const gasPrice = await web3[network].eth.getGasPrice()
        let txObject = {
          chainId: network,
          nonce: web3[network].utils.toHex(txCount),
          gasLimit: web3[network].utils.toHex(900000), // Raise the gas limit to a much higher amount
          gasPrice: web3[network].utils.toHex(gasPrice),
          to: bridgeAddresses[network],
          data: bridgeContracts[network].methods.mint(to, amount, nonce).encodeABI()
        };
        let tx = new Tx(txObject);
        tx.sign(privKey);
        txHash = await web3[network].eth.sendSignedTransaction("0x" + tx.serialize().toString("hex"));
      }
    });
  }
};

startRunning();

console.log("running ....");
