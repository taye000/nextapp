import { Request, Response } from "express";
import Subscriber from "../models/subscribers";

export const subscribe = async (req: Request, res: Response) => {
  let { email } = req.body;

  if (!email.trim()) {
    return res.status(400).json({ email: "email is required" });
  }
  try {
    //check if subscriber email already exist in db
    const subscriberExists = await Subscriber.findOne({ email });
    if (subscriberExists)
      return res.status(400).json({ email: "subscriber email already exists" });

    //create new subscriber
    const createsubscriber = await Subscriber.create({
      email,
    });
    //save subscriber
    let newsubscriber = await createsubscriber.save();

    return res.status(201).json({
      status: true,
      newsubscriber,
      msg: "newsubscriber saved Successfully.",
    });
  } catch (error: any) {
    console.log(error);
  }
};
