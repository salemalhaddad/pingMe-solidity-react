// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Portal {
	uint256 totalPings;

	event NewPing(address indexed from, uint256 timestamp, string message);

	struct Ping {
		address pinger;
		string message;
		uint256 timestamp;
	}

	Ping[] pings;

    constructor() {
        console.log("This is printed inside of a contract's constucter. Contract is like Class in OOP");
    }

	function ping(string memory _message) public {
        totalPings += 1;
        console.log("%s has pinged!", msg.sender, _message);
		pings.push(Ping(msg.sender, _message, block.timestamp));

		emit NewPing(msg.sender, block.timestamp, _message);
    }

	function getAllPings() public view returns (Ping[] memory) {
        return pings;
    }

    function getTotalPings() public view returns (uint256) {
        console.log("We have %d total pings!", totalPings);
        return totalPings;
    }
}
