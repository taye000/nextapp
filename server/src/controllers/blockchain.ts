import { Contract, JsonRpcProvider, Wallet } from "ethers";
import imaniescrowABI from "../../abi/imaniescrowABI.json";
import { config } from "../config/config";

// connect to the blockchain using a provider
export const provider = new JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/C03hF-P4h8wmJHdUh6CjRI0QLB_UKr5w");

// create a signer instance using the private key
export const signer = new Wallet(config.privateKey, provider).connect(provider);

// create a contract instance using the ABI and the contract address
export const imaniEscrowContract = new Contract(
  config.imaniEscrowAddress,
  imaniescrowABI,
  signer
  );

export const newTransaction = async (
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
    const nonce = await provider.getTransactionCount(signer.address, "latest");

    const transaction = await imaniEscrowContract.createTransaction(
      orderId,
      clientId,
      userId,
      amount,
      item,
      mode,
      status,
      customerStatus,
      {
        nonce: nonce,
        gasLimit: 3000000,
      }

    );

    console.log("transaction", transaction);
    

    // sign the transaction
    const signedTransaction: any = await signer.signTransaction(transaction);

    console.log("signed transaction", signedTransaction);
    

    // populate the transaction
    const populatedTransaction = await signer.populateTransaction(signedTransaction);

    // send the signed transaction to the blockchain
    const transactionResponse = await signer.sendTransaction(
      populatedTransaction
    );

    console.log("transaction hash", transactionResponse.hash);
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

export const updateCustomerStatus = async (
  orderId: string,
  customerStatus: string
) => {
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

export const updateComment = async (
  orderId: string,
  comment: string
) => {
  try {
    const transaction = await imaniEscrowContract.updateComment(
      orderId,
      comment
    );
    console.log("transaction", transaction);
    return transaction;
  } catch (error) {
    console.log("error updating comment", error);
  }
};

export const appealTransaction = async (
  orderId: string,
  appeal: string
) => {
  try {
    const transaction = await imaniEscrowContract.appealTransaction(
      orderId,
      appeal
    );
    console.log("transaction", transaction);
    return transaction;
  } catch (error) {
    console.log("error updating appeal status", error);
  }
};

export const appealCustomerTransaction = async (
  orderId: string,
  customerAppeal: string
) => {
  try {
    const transaction = await imaniEscrowContract.appealCustomerTransaction(
      orderId,
      customerAppeal
    );
    console.log("transaction", transaction);
    return transaction;
  } catch (error) {
    console.log("error updating appeal status", error);
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
