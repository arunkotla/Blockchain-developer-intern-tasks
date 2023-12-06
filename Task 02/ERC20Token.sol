// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Tang_Token is ERC20 {

constructor () ERC20("Tang Token", "Tang") {
_mint(msg.sender, 1000000 * 10 ** decimals());
}
}