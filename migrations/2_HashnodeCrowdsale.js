var HashnodeCrowdsale = artifacts.require("./HashnodeCrowdsale.sol");

module.exports = function(deployer) {
  const startTime = Math.round((new Date(Date.now() - 86400000).getTime())/1000); // Yesterday
  const endTime = Math.round((new Date().getTime() + (86400000 * 20))/1000); // Today + 20 days
  //const endTime = 1529484677000 / 1000;
  deployer.deploy(HashnodeCrowdsale, 
    startTime, //Start Date for Crowdsale
    endTime, // End date for Crowdsale
    500,  // => Rate per 1 ETH
    "0x7ffe86a3a466908df2b6d035bd4d62b500147456", //  This will be treated as the beneficiary address. 
    10000000000000000000, // 10 ETH => Goal 
    500000000000000000000, // 500 ETH => Cap 
    100000, // max tokens
    [ 10000, // tokens to be distributed for Ecosystem
      10000, // tokens to be distributed for Team
      30000, // tokens to be distributed for Airdrop
      50000, // tokens for Sale
      20000 ], // No of Token to be sale on PreICO
      /*
    "VPNCashCoin", // name of the Token
    "VPN", // Symbol
    18, // decimals
    */
    [ 40, //for PreSale ICO
      30, // for PreSale SecondRound Bonus
      20, // for PreSale ThirdRound Bonus
      10 ] // for PreSale FinalRound Bonus

  );
};