// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract escrow is Ownable {
    // Transaction struct
    struct Transaction {
        string clientId;
        string userId;
        string orderId;
        string amount;
        string status;
        string appeal;
        string customerAppeal;
        string customerStatus;
        string item;
        string mode;
    }

    // mapping to store transactions by their unique orderId
    mapping(string => Transaction) public transactions;

    // mapping to store transactions by orderId and userId
    mapping(string => string[]) private userIdToOrderId;

    // counter to keep track of the number of transactionss
    uint256 public transactionCount;

    // event to log transaction updates
    event StatusUpdated(string orderId, string newStatus);
    event CustomerStatusUpdated(string orderId, string newCustomerStatus);
    event appealStatus(string orderId, string appealStatus);

    // function to create a new transaction
    function createTransaction(
        string memory _clientId,
        string memory _userId,
        string memory _orderId,
        string memory _amount,
        string memory _status,
        string memory _customerStatus,
        string memory _item,
        string memory _mode
    ) external onlyOwner {
        require(bytes(transactions[_orderId].orderId).length == 0, "Transaction with this orderId already exists");

        Transaction storage newTransaction = transactions[_orderId];

        newTransaction.clientId = _clientId;
        newTransaction.userId = _userId;
        newTransaction.orderId = _orderId;
        newTransaction.amount = _amount;
        newTransaction.status = _status;
        newTransaction.customerStatus = _customerStatus;
        newTransaction.item = _item;
        newTransaction.mode = _mode;

        // add the transaction to the array of all transactions
        userIdToOrderId[_userId].push(_orderId);

        transactionCount++;
    }

    // function to update status
    function updateTransactionStatus(
        string memory _orderId,
        string memory _newStatus
    ) external onlyOwner {
        require(bytes(transactions[_orderId].orderId).length != 0, "Transaction with this orderId does not exist");

        Transaction storage existingTransaction = transactions[_orderId];

        existingTransaction.status = _newStatus;
        emit StatusUpdated(_orderId, _newStatus);
    }

        // function to update customerStatus
    function updateCustomerStatus(
        string memory _orderId,
        string memory _newCustomerStatus
    ) external onlyOwner {
        require(bytes(transactions[_orderId].orderId).length != 0, "Transaction with this orderId does not exist");

        Transaction storage existingTransaction = transactions[_orderId];

        existingTransaction.customerStatus = _newCustomerStatus;
        emit CustomerStatusUpdated(_orderId, _newCustomerStatus);
    }

    // function to update appeal status
    function customerAppeal(
        string memory _orderId,
        string memory _customerAppeal
    ) external onlyOwner {
        require(bytes(transactions[_orderId].orderId).length !=0, "Transaction with this orderId does not exist");

        Transaction storage existingTransaction = transactions[_orderId];

        existingTransaction.appeal = _customerAppeal;
        emit appealStatus(_orderId, _customerAppeal);
    }

        // function to update appeal status
    function appeal(
        string memory _orderId,
        string memory _appeal
    ) external onlyOwner {
        require(bytes(transactions[_orderId].orderId).length !=0, "Transaction with this orderId does not exist");

        Transaction storage existingTransaction = transactions[_orderId];

        existingTransaction.appeal = _appeal;
        emit appealStatus(_orderId, _appeal);
    }

    // function to retrive a single transaction by orderId
    function getTransactionByOrderId(
        string memory _orderId
    ) external onlyOwner view returns (
        string memory clientId,
        string memory userId,
        string memory orderId,
        string memory amount,
        string memory status,
        string memory customerStatus,
        string memory item,
        string memory mode
    ) {
        Transaction storage transaction = transactions[_orderId];

        require(bytes(transaction.orderId).length != 0, "Transaction with this orderId does not exist");

        return (
            transaction.clientId,
            transaction.userId,
            transaction.orderId,
            transaction.amount,
            transaction.status,
            transaction.customerStatus,
            transaction.item,
            transaction.mode
        );
    }
    // function to get transaction by orderId and userId
    function getTransactionByOrderIdAndUserId(
        string memory _orderId,
        string memory _userId
    ) external onlyOwner view returns (
        string memory clientId,
        string memory userId,
        string memory orderId,
        string memory amount,
        string memory status,
        string memory customerStatus,
        string memory item,
        string memory mode
    ) {
        require(bytes(_orderId).length > 0, "orderId cannot be empty");
        require(bytes(_userId).length > 0, "userId cannot be empty");

        // Check if the orderId exists
        require(bytes(transactions[_orderId].orderId).length != 0, "Transaction with this orderId does not exist");

        // Check if the userId has any transactions
        string[] storage orderIds = userIdToOrderId[_userId];
        require(orderIds.length > 0, "No transactions found for this userId");

        // Check if the orderId is associated with the provided userId
        bool orderIdFound = false;
        for (uint256 i = 0; i < orderIds.length; i++) {
            if (keccak256(bytes(orderIds[i])) == keccak256(bytes(_orderId))) {
                orderIdFound = true;
                break;
            }
        }

        require(orderIdFound, "Transaction with this orderId does not belong to the provided userId");

        // Retrieve and return the transaction
        Transaction storage transaction = transactions[_orderId];
        return (
            transaction.clientId,
            transaction.userId,
            transaction.orderId,
            transaction.amount,
            transaction.status,
            transaction.customerStatus,
            transaction.item,
            transaction.mode
        );
    }

    // function to retrieve all transactions
    function getAllTransactionsByUserId(string memory _userId) external onlyOwner view returns (string[] memory) {
        return userIdToOrderId[_userId];
    }
}