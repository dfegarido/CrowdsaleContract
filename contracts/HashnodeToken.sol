pragma solidity ^0.4.18;

import '../node_modules/zeppelin-solidity/contracts/token/MintableToken.sol';

contract HashnodeToken is MintableToken {
  string public name = "VPN Cash Coin";
  string public symbol = "VCC";
  uint8 public decimals = 18;
}