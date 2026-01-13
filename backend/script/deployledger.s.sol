// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script} from "forge-std/Script.sol";
import {Ledger} from "../src/Ledger.sol";

contract DeployLedger is Script {
    function run() external {
        vm.startBroadcast();
        new Ledger();
        vm.stopBroadcast();
    }
}