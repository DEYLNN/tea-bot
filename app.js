const MultiSender = require('./src/modules/multi-sender');
require('dotenv').config();

const sender = new MultiSender(process.env.INFURA_RPC);

const modules = [sender.runAll.bind(sender)];

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
