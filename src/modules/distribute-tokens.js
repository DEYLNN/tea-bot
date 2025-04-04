const { ethers } = require("ethers");
const config = require("../config/config");
const wallets = require("../config/wallet");
const { distributeTokensABI } = require("../utils/abi");

const tokenABI = distributeTokensABI;

class TokenAirdrop {
    constructor(rpcUrl, contractAddress) {
        this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        this.contract = new ethers.Contract(contractAddress, tokenABI, this.provider);
    }
    getRandomInRange(min, max) {
        return (Math.random() * (max - min) + min).toFixed(5);
    }


    async distributeTokens(wallet) {
        const { address, privateKey } = wallet;
        const signer = new ethers.Wallet(privateKey, this.provider);
        const contractWithSigner = this.contract.connect(signer);

        const recipient = config.recipientAddresses[
                   Math.floor(Math.random() * config.recipientAddresses.length)
               ];
        const tokenContract =  config.tokensContractAddress[
            Math.floor(Math.random() * config.tokensContractAddress.length)
        ]
        const recipientArray = [
               recipient
              ];
              
        const amount = this.getRandomInRange(config.minAmount, config.maxAmount);
        const delay = this.getRandomInRange(config.minDelay, config.maxDelay) * 1000;
        
        console.log(`[${address}] Waiting ${delay / 1000} seconds before sending ${amount} ${tokenContract} to ${recipient}`);

        await new Promise(resolve => setTimeout(resolve, delay));

        try {
            const tx =   await contractWithSigner.MultiSender(
               tokenContract,
                ethers.utils.parseUnits(amount, 18),
                recipientArray
            );
            

            console.log(`[${address}] Transaction sent. Waiting for confirmation...`);
            await tx.wait();
            console.log(`[${address}] Airdrop successful! TX Hash: ${tx.hash}`);
        } catch (error) {
            console.error(`[${address}] Airdrop failed: ${error.message}`);
        }
    }

    async runAll() {
        for (const wallet of wallets) {
            await this.distributeTokens(wallet);
        }
    }
}

module.exports = TokenAirdrop;
