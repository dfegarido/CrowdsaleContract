pragma solidity ^0.4.18;

import '../node_modules/zeppelin-solidity/contracts/token/MintableToken.sol';

contract HashnodeToken is MintableToken {
  string public name = "VPNCashC";
  string public symbol = "VPN";
  uint8 public decimals = 18;
}