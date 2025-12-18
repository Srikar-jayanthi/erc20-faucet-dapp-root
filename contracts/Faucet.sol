// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Faucet {
    IERC20 public token;
    uint256 public constant amountPerRequest = 10 * 10**18; 
    uint256 public constant lockTime = 24 hours;

    mapping(address => uint256) public nextAccessTime;

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function requestTokens() external {
        require(block.timestamp >= nextAccessTime[msg.sender], "Rate limit: Please wait 24 hours");
        require(token.balanceOf(address(this)) >= amountPerRequest, "Faucet empty");

        nextAccessTime[msg.sender] = block.timestamp + lockTime;
        token.transfer(msg.sender, amountPerRequest);
    }
}