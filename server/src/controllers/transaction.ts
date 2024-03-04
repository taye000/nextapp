import { Request, Response } from "express";
import Transaction, {
  IAppealStatus,
  ITransactionStatus,
} from "../models/transactions";
import User from "../models/users";
import {
  newTransaction,
  getAllTransactions,
  updateComment,
  updateStatus,
  updateCustomerStatus,
} from "./blockchain";

const orderID = () => {
  return Math.random().toString(35).substring(2, 7);
};

//controller to create new transaction
export const createTransactionController = async (
  req: Request,
  res: Response
) => {
  console.log("body", req.body);

  let { clientId, amount, mode, item, txPhoto, description } = req.body;

  const user = await User.findById(req.currentUser!.id);

  if (!user) {
    return res.status(401).json({ msg: "Unauthorised access." });
  }
  if (!amount.trim()) {
    return res.status(400).json({ amount: "amount is required" });
  }
  if (!item.trim()) {
    return res.status(400).json({ item: "item is required" });
  }
  if (!description.trim()) {
    return res.status(400).json({ description: "description is required" });
  }

  let orderId = orderID();

  // TODO: Add photo upload to the transaction
  // TODO: Add the transaction to the blockchain
  try {
    // write to blockchain
    // await newTransaction(
    //   orderId,
    //   clientId,
    //   req.currentUser!.id,
    //   amount,
    //   item,
    //   mode,
    //   ITransactionStatus.PENDING,
    //   ITransactionStatus.PENDING
    // );

    // write to database
    let transaction = await Transaction.create({
      orderId,
      mode,
      amount,
      clientId,
      description,
      photos: [txPhoto],
      userId: req.currentUser!.id,
      item,
      status: ITransactionStatus.PENDING,
      customerStatus: ITransactionStatus.PENDING,
    });

    console.log({ transaction });
    return res.status(201).json({
      status: true,
      transaction,
      msg: "Transaction Initiated Successfully.",
    });
    
  } catch (error: any) {
    return res
      .status(400)
      .json({ msg: "Error creating transaction", error: error.message });
  }
};

//controller to get all transactions from the blockchain
export const getTransactions = async (_req: Request, res: Response) => {
  try {
    // get all transactions from the blockchain
    const transactions = await getAllTransactions();
    res.status(200).json({ transactions });
  } catch (error: any) {
    return res.status(404).json({ msg: error.message });
  }
};

//controller to get a single transaction
export const getTransaction = async (id: any) => {
  try {
    const transaction = await Transaction.findOne(id);
    return transaction;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }
};

// controller to get transactions of signed-in user
export const getUserTransactions = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  try {
    const transactions = await Transaction.find({
      $or: [{ userId }, { clientId: userId }],
    }); // Retrieve transactions that match either the user ID or the client ID
    res.status(200).json({ transactions });
  } catch (error: any) {
    return res.status(404).json({ msg: error.message });
  }
};

// controller to get a single transaction of signed-in user
export const getUserTransaction = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    const transaction = await Transaction.findOne({
      _id: id,
    });
    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }
    res.status(200).json({ transaction });
  } catch (error: any) {
    res.status(500).json({ msg: error.message });
  }
};

//controller to update a transaction status
export const updateTransactionStatus = async (req: Request, res: Response) => {
  try {
    // get the transaction id from the request body
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: "transaction not found" });
    }

    const status = ITransactionStatus.COMPLETED;

    // update the transaction status on the blockchain
    if (transaction?.orderId) {
      await updateStatus(transaction.orderId, status);
    }

    // update the transaction status on the database
    await Transaction.findByIdAndUpdate(req.params.id, {
      status: status,
    });

    res
      .status(200)
      .json({ success: true, msg: "Transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error updating transaction", error });
  }
};
//controller to update a transaction status
export const updateCustomerTransactionStatus = async (
  req: Request,
  res: Response
) => {
  try {
    // get the transaction id from the request body
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: "transaction not found" });
    }

    const customerStatus = ITransactionStatus.COMPLETED;

    // update the transaction status on the blockchain
    if (transaction?.orderId) {
      await updateCustomerStatus(transaction.orderId, customerStatus);
    }

    // update the transaction status on the database
    await Transaction.findByIdAndUpdate(req.params.id, {
      customerStatus: customerStatus,
    });

    res
      .status(200)
      .json({ success: true, msg: "Transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error updating transaction", error });
  }
};

//controller to update a transaction
export const createComment = async (req: Request, res: Response) => {
  const { comment } = req.body;
  try {
    // get the transaction id from the request body
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: "transaction not found" });
    }

    // update the comment to the blockchain
    if (transaction?.orderId) {
      await updateComment(transaction.orderId, comment);
    }

    // get the transaction id from the request body and update
    const updatedtransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        comment: comment,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      msg: "Comment updated successfully",
      response: updatedtransaction,
    });
  } catch (error: any) {
    return res.status(500).json({ msg: "error updating comment", error });
  }
};

// controller to appeal a transaction
export const appealTransaction = async (req: Request, res: Response) => {
  try {
    // get the transaction id from the request body
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: "transaction not found" });
    }

    const appeal = IAppealStatus.PENDING;

    await Transaction.findByIdAndUpdate(req.params.id, {
      appeal: appeal,
    });
    res
      .status(200)
      .json({ success: true, msg: "Transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error updating transaction", error });
  }
};

// controller to appeal a customer's transaction
export const appealCustomerTransaction = async (
  req: Request,
  res: Response
) => {
  try {
    // get the transaction id from the request body
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ msg: "transaction not found" });
    }

    const customerAppeal = IAppealStatus.PENDING;

    await Transaction.findByIdAndUpdate(req.params.id, {
      customerAppeal: customerAppeal,
    });
    res
      .status(200)
      .json({ success: true, msg: "Transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error updating transaction", error });
  }
};

//update transaction photo controller
export const updateTransactionPhoto = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  console.log({ userId });

  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      clientId: userId,
    });
    if (!transaction) {
      return res.status(401).json({ msg: "Transaction not found" });
    }
    if (!req?.file?.path) {
      return res.status(400).json({ msg: "Photo is required" });
    }
    const photo = req?.file?.path;

    transaction.photos = transaction.photos || [];
    transaction.photos?.push(photo);
    await transaction.save();

    console.log("photo", photo);

    res
      .status(200)
      .json({ success: true, msg: "Transaction photo uploaded successfully" });
  } catch (error) {
    res.send({ msg: "Error uploading photo" });
  }
};

// upload tx photo
export const uploadTxPhoto = async (req: Request, res: Response) => {
  const userId = req.currentUser?.id;
  console.log({ userId });

  try {
    if (!req?.file?.path) {
      return res.status(400).json({ msg: "Photo is required" });
    }
    const photo = req?.file?.path;

    console.log("photo", photo);

    res
      .status(200)
      .json({
        success: true,
        msg: "Transaction photo uploaded successfully",
        photo,
      });
  } catch (error) {
    res.send({ msg: "Error uploading photo" });
  }
};

//update customer transaction photo controller
export const updateCustomerTransactionPhoto = async (
  req: Request,
  res: Response
) => {
  const userId = req.currentUser?.id;

  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      userId,
    });
    if (!transaction) {
      return res.status(401).json({ msg: "Transaction not found" });
    }
    if (!req?.file?.path) {
      return res.status(400).json({ msg: "Photo is required" });
    }
    const customerPhoto = req.file.path;

    transaction.customerPhotos?.push(customerPhoto);

    await transaction.save();
    console.log("customerPhoto", customerPhoto);

    res.status(200).json({
      success: true,
      msg: "Customer transaction photo uploaded successfully",
    });
  } catch (error) {
    res.send({ msg: "Error uploading customer photo" });
  }
};
