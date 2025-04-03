const { verifiedAddress } = require("../utils/address");

module.exports = {
    minAmount: 0.01, // ETH
    maxAmount: 0.05, // ETH
    minDelay: 60,     // Second
    maxDelay: 120,    // Second
    recipientAddresses: verifiedAddress
};
