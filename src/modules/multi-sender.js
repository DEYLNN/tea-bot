const { ethers } = require('ethers');
const config = require('../config/config');
const wallets = require('../config/wallet');

class MultiSender {
    constructor(rpcUrl) {
        this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    }

    getRandomInRange(min, max) {
        return (Math.random() * (max - min) + min).toFixed(5);
    }

    async sendETH(wallet) {
        const { address, privateKey } = wallet;
        const signer = new ethers.Wallet(privateKey, this.provider);

        const balance = await this.provider.getBalance(address);
        const balanceETH = parseFloat(ethers.utils.formatEther(balance));

        if (balanceETH < 1) {
            console.log(`[${address}] Insufficient balance (${balanceETH} ETH). Transaction canceled.`);
            return;
        }

        const recipient = config.recipientAddresses[
            Math.floor(Math.random() * config.recipientAddresses.length)
        ];
        const amount = this.getRandomInRange(config.minAmount, config.maxAmount);
        const delay = this.getRandomInRange(config.minDelay, config.maxDelay) * 1000;

        console.log(`[${address}] Waiting ${delay / 1000} seconds before sending ${amount} ETH to ${recipient}`);

        await new Promise(resolve => setTimeout(resolve, delay));

        try {
            const tx = {
                to: recipient,
                value: ethers.utils.parseEther(amount),
                gasLimit: 50000,
            };

            const txResponse = await signer.sendTransaction(tx);
            const receipt = await txResponse.wait();

            console.log(`[${address}] Successfully sent ${amount} ETH to ${recipient}. TX Hash: ${receipt.transactionHash}`);
        } catch (error) {
            console.error(`[${address}] Failed to send ETH: ${error.message}`);
        }
    }

    async runAll() {
        for (const wallet of wallets) {
            await this.sendETH(wallet);  // Menunggu hingga transaksi selesai untuk setiap wallet
        }
    }
}

module.exports = MultiSender;
