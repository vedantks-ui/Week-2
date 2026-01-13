const contractAddress = "0x882677a45148d97aA087b50d9DDBe9d7F301A459";

const abi = [
    "function deposit() public payable",
    "function getBalance(address user) public view returns (uint256)"
];

let provider;
let signer;
let contract;

async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        document.getElementById("connectBtn").innerText = "Connected";
        document.getElementById("userAddress").innerText = address;
        
        contract = new ethers.Contract(contractAddress, abi, signer);
        getBalance(address);
    } else {
        alert("Please install MetaMask");
    }
}

async function getBalance(address) {
    const balance = await contract.getBalance(address);
    document.getElementById("balance").innerText = ethers.formatEther(balance);
}

async function deposit() {
    const amount = document.getElementById("amount").value;
    
    try {
        const tx = await contract.deposit({ value: ethers.parseEther(amount) });
        document.getElementById("depositBtn").innerText = "Processing...";
        await tx.wait();
        alert("Deposit Successful!");
        document.getElementById("depositBtn").innerText = "Deposit ETH";
        
        const address = await signer.getAddress();
        getBalance(address);
    } catch (error) {
        console.error(error);
        alert("Transaction Failed");
    }
}