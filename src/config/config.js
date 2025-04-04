const { verifiedAddress } = require("../utils/address");
const { verifiedTokens } = require("../utils/tokens");

module.exports = {
    minAmount: 0.01, // ETH
    maxAmount: 0.05, // ETH
    minDelay: 10,     // Second
    maxDelay: 11,    // Second
    recipientAddresses: verifiedAddress,
    TokenSenderContractAddress :"0x113DaeDE9704A6759e4C7442fc7cb6790Ec185CD",
    tokensContractAddress:verifiedTokens
};
