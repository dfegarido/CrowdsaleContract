pragma solidity ^0.4.18;

import './HashnodeToken.sol';
import '../node_modules/zeppelin-solidity/contracts/crowdsale/CappedCrowdsale.sol';
import '../node_modules/zeppelin-solidity/contracts/crowdsale/RefundableCrowdsale.sol';

contract HashnodeCrowdsale is CappedCrowdsale, RefundableCrowdsale,  HashnodeToken{

  // ICO Stage
  // ============
  enum CrowdsaleStage { PreICO, FirstBonus, SecondBonus, FinalBonus, ICO }
  CrowdsaleStage public stage = CrowdsaleStage.PreICO; // By default it's Pre Sale
  // =============

  // Token Distribution
  // =============================
  uint256 public maxTokens;// = 100000000000000000000; // There will be total 100 VPN Tokens 000000000000000000
  uint256 public tokensForEcosystem;// = 20000000000000000000; // 10 VPN
  uint256 public tokensForTeam;// = 10000000000000000000; // 10 VPN
  uint256 public tokensForBountyAndAirDrop;// = 10000000000000000000; //30 VPN
  uint256 public totalTokensForSale;// = 40000000000000000000; // 50 VPNs will be sold in Crowdsale
  uint256 public totalTokensForSaleDuringPreICO;// = 20000000000000000000; // 20 VPN out of 60 VPN will be sold during PreICO
  // ==============================

  // Amount raised in PreICO
  // ==================
  uint256 public totalWeiRaisedDuringPreICO;
  // ===================



  // Events
  event EthTransferred(string text);
  event EthRefunded(string text);


  // Constructor
  // ============
  function HashnodeCrowdsale(
  uint256 _startTime, //Start Date for CrowdSale
  uint256 _endTime, //End of CrowdSale
  uint256 _rate, // rate per ETH
  address _wallet, // beneficiary address
  uint256 _goal, // Goal funds for ETH or Minimum Capital answer in wei (ex 10000000000000000000 = 10 ETH)
  uint256 _cap, // Max Capital for ETH, answer in wei (ex 500000000000000000000 wei = 500 ETH)
  
  // Total Supply
  uint256 _maxTokens, // 100  
  //Token Distribution
  uint256 _tokenForEcosystem, // ex 10
  uint256 _tokenForTeam, // ex 10
  uint256 _tokenForBountyAndAirdrop, // ex 30
  uint256 _totalTokenForSale, // ex 50
  uint256 _totalTokenForSaleDuringPreICO, //ex 20


  // ICO Specs
  string _name, // VPN Cash Coin
  string _symbol, // VPN
  uint256 _decimals // Decimals (ex 18)



  ) CappedCrowdsale(_cap) FinalizableCrowdsale() RefundableCrowdsale(_goal) Crowdsale(_startTime, _endTime, _rate, _wallet) public {
      require(_goal <= _cap);
      maxTokens = valueInWei(_maxTokens);
      tokensForEcosystem = valueInWei(_tokenForEcosystem);
      tokensForTeam = valueInWei(_tokenForTeam);
      tokensForBountyAndAirDrop = valueInWei(_tokenForBountyAndAirdrop);
      totalTokensForSale = valueInWei(_totalTokenForSale);
      totalTokensForSaleDuringPreICO = valueInWei(_totalTokenForSaleDuringPreICO);
      name = _name;
      symbol = _symbol;
      decimals = _decimals
      
  }

  function valueInWei(uint256 _value) internal returns(uint256){
      
      return _value * 10 ** uint256(decimals);
  }
  // =============
  




  // Token Deployment
  // =================
  function createTokenContract() internal returns (MintableToken) {
    return new HashnodeToken(); // Deploys the ERC20 token. Automatically called when crowdsale contract is deployed
  }
  // ==================

  // Crowdsale Stage Management
  // =========================================================

  // Change Crowdsale Stage. Available Options: PreICO, ICO
  function setCrowdsaleStage(uint value) public onlyOwner {

      CrowdsaleStage _stage;

      if (uint(CrowdsaleStage.PreICO) == value) {
        _stage = CrowdsaleStage.PreICO;
      } else if (uint(CrowdsaleStage.ICO) == value) {
        _stage = CrowdsaleStage.ICO;
      }

      stage = _stage;

      if (stage == CrowdsaleStage.PreICO) {
        setCurrentRate(rate);
      } else if (stage == CrowdsaleStage.FirstBonus) {
        setCurrentRate(rate);
      } else if (stage == CrowdsaleStage.SecondBonus) {
        setCurrentRate(rate);
      } else if (stage == CrowdsaleStage.FinalBonus) {
        setCurrentRate(rate);
      } else if (stage == CrowdsaleStage.ICO) {
        setCurrentRate(2);
      }
  }

  // Change the current rate
  function setCurrentRate(uint256 _rate) private {
      rate = _rate;
  }

  // ================ Stage Management Over =====================

  // Token Purchase
  // =========================
  function () external payable {
      uint256 tokensThatWillBeMintedAfterPurchase = msg.value.mul(rate);
      if ((stage == CrowdsaleStage.PreICO) && (token.totalSupply() + tokensThatWillBeMintedAfterPurchase > totalTokensForSaleDuringPreICO)) {
        msg.sender.transfer(msg.value); // Refund them
        EthRefunded("PreICO Limit Hit");
        return;
      }

      buyTokens(msg.sender);

      if (stage == CrowdsaleStage.PreICO) {
          totalWeiRaisedDuringPreICO = totalWeiRaisedDuringPreICO.add(msg.value);
      }
  }

  function forwardFunds() internal {
      if (stage == CrowdsaleStage.PreICO) {
          wallet.transfer(msg.value);
          EthTransferred("forwarding funds to wallet");
      } else if (stage == CrowdsaleStage.ICO) {
          EthTransferred("forwarding funds to refundable vault");
          super.forwardFunds();
      }
  }
  // ===========================

  // Finish: Mint Extra Tokens as needed before finalizing the Crowdsale.
  // ====================================================================

  function finish(address _teamFund, address _ecosystemFund, address _bountyFund) public onlyOwner {

      require(!isFinalized);
      uint256 alreadyMinted = token.totalSupply();
      require(alreadyMinted < maxTokens);

      uint256 unsoldTokens = totalTokensForSale - alreadyMinted;
      if (unsoldTokens > 0) {
        tokensForEcosystem = tokensForEcosystem + unsoldTokens;
      }

      token.mint(_teamFund,tokensForTeam);
      token.mint(_ecosystemFund,tokensForEcosystem);
      token.mint(_bountyFund,tokensForBountyAndAirDrop);
      finalize();
  }
  // ===============================

  // REMOVE THIS FUNCTION ONCE YOU ARE READY FOR PRODUCTION
  // USEFUL FOR TESTING `finish()` FUNCTION
  //function hasEnded() public view returns (bool) {
  //  return true;
  //}
}