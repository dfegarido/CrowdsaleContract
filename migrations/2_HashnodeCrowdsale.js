var HashnodeCrowdsale = artifacts.require("./HashnodeCrowdsale.sol");

module.exports = function(deployer) {
  const startTime = Math.round((new Date(Date.now() - 86400000).getTime())/1000); // Yesterday
  const endTime = Math.round((new Date().getTime() + (86400000 * 20))/1000); // Today + 20 days
  deployer.deploy(HashnodeCrowdsale, 
    startTime, 
    endTime,
    100, //token rate per ETH
    "0x8dF06Ff3C9505Ef56Fb739B909e7f67fF7c9D2dB", // Replace this wallet address. This will be treated as the beneficiary address. 
    20, // 20 ETH
    50, // 50 ETH
    100000, // max token
    [10000, // distribute token for ecosystem
    10000, // distribute token for team
    30000, // distribute token for bounty and airdrop
    50000, // distribute token for Sale
    20000], // distribute token and for during ICO
    [40, // bonus rate on first stage
    30, // bonus rate on second stage
    20, // bonus rate on third stage
    10] // bonus rate on final stage
  );
};