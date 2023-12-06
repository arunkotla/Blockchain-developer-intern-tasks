const { ethers } = require('ethers'); //Using ethers.js library

// Check if MetaMask is installed
if (!window.ethereum) {
  alert('Please install MetaMask extension');
  return;
}

// Connect to MetaMask
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Check if MetaMask is connected
if (!provider.isConnected()) {
  alert('Please connect to MetaMask');
  return;
}


// Define Aave contract address and ABI
//Aave Pool-Proxy contract address for Polygon Mumbai Testnet
const aaveContractAddress = '0xcC6114B983E4Ed2737E9BD3961c9924e6216c704'; 

// ABI of the Aave Pool-Proxy contract
const aaveContractABI = [
    [{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"implementation","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_logic","type":"address"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"initialize","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"}]
];

// Create contract object
const contract = new ethers.Contract(aaveContractAddress, aaveContractABI, signer);

// Define ERC20 token address and deposit amount
const tokenAddress = '0x9ed8De02365FFd8FD5682781be0980dAd47d118C'; // contract address of ERC20Token.sol deployed on Polygon Mumbai Testnet
const amount = ethers.utils.parseEther('1.0'); //Initialising amount to deposit

// Deposit ERC20 tokens
const depositTx = await contract.deposit(tokenAddress, amount, {
  gasLimit: 210000,
});

// Wait for transaction confirmation
const depositReceipt = await depositTx.wait();
console.log('Deposit transaction hash:', depositReceipt.transactionHash);
