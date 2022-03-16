// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ChigozieToken is ERC20 {
    uint256 constant _initial_supply = 1000000;

    constructor() ERC20("Chigozie", "CHETK") {
        _mint(msg.sender, _initial_supply);
    }

    function buyToken(address receiver) public payable {
        uint256 amtTokens = ((msg.value) / (1 ether)) * 1000;
        transfer(receiver, amtTokens);
    }
}
