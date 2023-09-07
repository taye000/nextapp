import { ethers } from "ethers";
import imaniescrowABI from "../../abi/imaniescrowABI.json";
import { config } from "../config/config";

// connect to the blockchain using a provider
export const provider = new ethers.JsonRpcProvider(config.alchemyRPC);

// create a contract instance using the ABI and the contract address
export const imaniEscrowContract = new ethers.Contract(
  config.imaniEscrowAddress,
  imaniescrowABI,
  provider
);

export const createTransaction = async (
  orderId: string,
  clientId: string,
  userId: string,
  amount: string,
  item: string,
  mode: string,
  status: string,
  customerStatus: string
) => {
  try {
    const transaction = await imaniEscrowContract.createTransaction(
      orderId,
      clientId,
      userId,
      amount,
      item,
      mode,
      status,
      customerStatus
    );
    console.log("transaction", transaction);
    return transaction;
  } catch (error) {
    console.log("error creating tx", error);
  }
};

export const updateStatus = async (orderId: string, status: string) => {
  try {
    const transaction = await imaniEscrowContract.updateStatus(orderId, status);
    console.log("transaction", transaction);
    return transaction;
  } catch (error) {
    console.log("error updating tx", error);
  }
};

export const updateCustomerStatus = async (orderId: string, customerStatus: string) => {
  try {
    const transaction = await imaniEscrowContract.updateCustomerStatus(
      orderId,
      customerStatus
    );
    console.log("transaction", transaction);
    return transaction;
  } catch (error) {
    console.log("error updating tx", error);
  }
};

export const getTransactionByOrderId = async (orderId: string) => {
  try {
    const transaction = await imaniEscrowContract.getTransactionByOrderId(
      orderId
    );
    console.log("transaction", transaction);
    return transaction;
  } catch (error) {
    console.log("error getting tx by orderId", error);
  }
};

export const getAllTransactions = async () => {
  try {
    const transactions = await imaniEscrowContract.getAllTransactions();
    console.log("transactions", transactions);
    return transactions;
  } catch (error) {
    console.log("error getting all tx", error);
  }
};
