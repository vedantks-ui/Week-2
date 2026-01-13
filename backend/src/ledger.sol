// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Ledger {
    mapping(address => uint256) public balances;
    event Deposit(address indexed user, uint256 amount);

    function deposit() public payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function getBalance(address user) public view returns (uint256) {
        return balances[user];
    }
}