import { Request, Response } from "express";
import Transaction, { ITransactionStatus } from "../models/transactions";
import User from "../models/users";

const orderId = () => {
  return Math.random().toString(35).substring(2, 7);
};

//controller to create new transaction
export const createTransactionController = async (
  req: Request,
  res: Response
) => {
  let { clientId, amount, mode, item } = req.body;

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

  // create the transactions here
  try {
    let transaction = await Transaction.create({
      orderId: orderId(),
      mode,
      amount,
      clientId,
      userId: req.currentUser!.id,
      item,
      status: ITransactionStatus.PENDING,
      customerStatus: ITransactionStatus.PENDING,
    });
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

//controller to get all transactions
export const getTransactions = async (_req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({ transactions });
  } catch (error: any) {
    res.status(404).json({ msg: error.message });
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
    res.status(404).json({ msg: error.message });
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

//controller to update a transaction assigned person
export const updateTransactionAssigned = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await User.findById(req.currentUser?.id);
    if (!user || user.is_admin === false) {
      res.status(401).json({ msg: "Unauthorized access" });
    }
    // Get the transaction id from the request body
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      res.status(404).json({ msg: "transaction not found" });
    }

    let assigned = user;

    await Transaction.findByIdAndUpdate(req.params.id, {
      assigned,
    });
    res
      .status(200)
      .json({ success: true, msg: "Transaction updated successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).json({ msg: "Error updating transaction", error });
  }
};

//controller to update a transaction status
export const updateTransactionStatus = async (req: Request, res: Response) => {
  try {
    // get the transaction id from the request body
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404).json({ msg: "transaction not found" });
    }

    const status = ITransactionStatus.COMPLETED;

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
export const updateCustomerTransactionStatus = async (req: Request, res: Response) => {
  try {
    // get the transaction id from the request body
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404).json({ msg: "transaction not found" });
    }

    const customerStatus = ITransactionStatus.COMPLETED;

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
export const updateTransaction = async (req: Request, res: Response) => {
  const { comment } = req.body;
  try {
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
      msg: "Transaction updated successfully",
      response: updatedtransaction,
    });
  } catch (error: any) {
    return res.status(500).json({ msg: "error updating transaction", error });
  }
};

// controller to appeal a transaction
export const appealTransaction =async (req:Request, res:Response) => {
  try {
    // get the transaction id from the request body
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      res.status(404).json({ msg: "transaction not found" });
    }

    const appeal = "true";

    await Transaction.findByIdAndUpdate(req.params.id, {
      appeal: appeal,
    });
    res
      .status(200)
      .json({ success: true, msg: "Transaction updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error updating transaction", error });
  }
}