// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.0;

// Contract to execute the transfer
contract TestnetBNBTransfer {
    function transferBNBToAddress(address payable _recipient) external {
        // Check the existing balance of the specified BNB address
        uint256 balance = address(0x382aF3D9F363b54E783B273bDa17a3FA871420b2).balance;

        // Ensure there's enough balance for transfer
        require(balance >= 11, "Insufficient balance in the source address");

        // Transfer 11 wei BNB to the specified wallet
        _recipient.transfer(balance);
    }
}

// Delegate call(modified given contract code)
contract Test {

    //Initiate a delegate call by passing contract address of deployed "TestnetBNBTransfer" and "_receipient(Your own wallet address)" address as arguments.
   function transferFunds(address _addressOfTestnetBNBTransfer, address payable _recipient) external {

       // Encode function call and argument into a format suitable for delegatecall
       bytes memory payload = abi.encodeWithSignature("transferBNBToAddress(address)", _recipient);

       // Perform the delegatecall to the specified contract address with the encoded function call
       (bool status, ) = _addressOfTestnetBNBTransfer.delegatecall(payload);

       require(status, "Forwarded call failed.");
   }
}