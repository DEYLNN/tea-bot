const config = require('./src/config/config');
const TokenAirdrop = require('./src/modules/distribute-tokens');
const MultiSender = require('./src/modules/multi-sender');
require('dotenv').config();

const rpcUrl = process.env.INFURA_RPC || ""

const sender = new MultiSender(rpcUrl);
const MultiSenderTokens = new TokenAirdrop(rpcUrl, config.TokenSenderContractAddress);

const modules = [
    sender.runAll.bind(sender),
    MultiSenderTokens.runAll.bind(MultiSenderTokens)
];

async function runModules() {
    while (true) {
        const selectedModule = modules.length > 1 ? modules[Math.floor(Math.random() * modules.length)] : modules[0];

        console.log("Executing module...");
        await selectedModule();  // Menunggu sampai semua transaksi selesai
        console.log("All transactions completed.");

        const delay = 10000;  // 10 seconds
        console.log(`Waiting ${delay / 1000} seconds before next execution...`);
        await new Promise(resolve => setTimeout(resolve, delay));  // Jeda setelah eksekusi selesai
    }
}

console.log("Starting multi-wallet ETH sender process...");
runModules();
