// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Portal {
	uint256 pingMe;

    constructor() {
        console.log("This is printed inside of a contract's constucter. Contract is like Class in OOP");
    }

	function ping() public {
        pingMe += 1;
        console.log("%s has pinged!", msg.sender);
    }

    function getTotalPings() public view returns (uint256) {
        console.log("We have %d total pings!", pingMe);
        return pingMe;
    }
}
