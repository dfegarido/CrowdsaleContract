var HashnodeCrowdsale = artifacts.require("./HashnodeCrowdsale.sol");

module.exports = function(deployer) {
  const startTime = Math.round((new Date(Date.now() - 86400000).getTime())/1000); // Yesterday
  const endTime = Math.round((new Date().getTime() + (86400000 * 20))/1000); // Today + 20 days
  deployer.deploy(HashnodeCrowdsale, 
    startTime, 
    endTime,
    5,  // => Rate
    "0x9fDbD1B03b8cF475a68CE50e40dcf1d085abEfc0", // Replace this wallet address with the last one (10th account) from Ganache UI. This will be treated as the beneficiary address. 
    2000000000000000000, // 2 ETH => Goal
    50000000000000000000 // 50 ETH => Cap
  );
};