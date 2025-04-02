require('dotenv').config();

const wallets = [];

Object.keys(process.env).forEach(key => {
    if (key.startsWith("WALLET_") && key.endsWith("_PRIVATE_KEY")) {
        const walletNumber = key.split("_")[1];
        wallets.push({
            privateKey: process.env[`WALLET_${walletNumber}_PRIVATE_KEY`],
            address: process.env[`WALLET_${walletNumber}_ADDRESS`]
        });
    }
});

module.exports = wallets;
