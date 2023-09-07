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
        string customerStatus;
        string item;
        string mode;
    }

    // array to store all transactions
    Transaction[] public allTransactions;

    // mapping to store transactions by their unique orderId
    mapping(string => Transaction) public transactions;

    // counter to keep track of the number of transactionss
    uint256 public transactionCount;

    // event to log transaction updates
    event StatusUpdated(string orderId, string newStatus);
    event CustomerStatusUpdated(string orderId, string newCustomerStatus);

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
        allTransactions.push(newTransaction);
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
    function updateTransactionCustomerStatus(
        string memory _orderId,
        string memory _newCustomerStatus
    ) external onlyOwner {
        require(bytes(transactions[_orderId].orderId).length != 0, "Transaction with this orderId does not exist");

        Transaction storage existingTransaction = transactions[_orderId];

        existingTransaction.customerStatus = _newCustomerStatus;
        emit CustomerStatusUpdated(_orderId, _newCustomerStatus);
    }

    // function to retrive a single transaction by orderId
    function getTransactionByOrderId(
        string memory _orderId
    ) external view returns (
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

    // function to retrieve all transactions
    function getAllTransactions() external onlyOwner view returns (Transaction[] memory) {
        return allTransactions;
    }
}