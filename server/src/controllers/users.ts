import { Request, Response } from "express";
import User from "../models/users";
import validator from "validator";

//create a new user
export const signUp = async (req: any, res: any) => {
  const { name, email, phoneNumber, password, confirmPassword, account_type } =
    req.body;

  if (!email.trim()) {
    return res.status(400).json({ email: "email is required" });
  }
  if (!name.trim()) {
    return res.status(400).json({ name: "name is required" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ email: "Please enter a valid email" });
  }
  if (!password.trim()) {
    return res.status(400).json({ password: "Password is required" });
  }
  if (!confirmPassword.trim()) {
    return res
      .status(400)
      .json({ confirmPassword: "Password confirmation is required" });
  }

  try {
    //check if user email already exist in db
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ email: "User email already exists" });

    //check if user password and confirm password match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({
          confirmPassword: "Password and Confirm Password do not match",
        });
    }

    //create new user
    const createUser = await User.create({
      name,
      email,
      phoneNumber,
      password,
      account_type,
    });
    //save user
    let newUser = await createUser.save();

    //remove password from newUser
    let sanitizedUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber,
      account_type: newUser.account_type,
    };

    res.status(201).json({
      success: true,
      msg: "New User Created Successfully.",
      sanitizedUser,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

//create a new admin user
export const adminSignUp = async (req: any, res: any) => {
  const { email, phoneNumber, password } = req.body;

  if (!email.trim()) {
    return res.status(400).json({ email: "email is required" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ email: "Please enter a valid email" });
  }
  if (!phoneNumber) {
    return res.status(400).json({ phoneNumber: "Phone Number is required" });
  }
  if (!password.trim()) {
    return res.status(400).json({ password: "Password is required" });
  }

  try {
    //check if user email already exist in db
    const emailExists = await User.findOne({ email });
    if (emailExists)
      return res.status(400).json({ email: "User email already exists" });

    //check if user phone number already exist in db
    const phoneNoExists = await User.findOne({ phoneNumber });
    if (phoneNoExists) {
      return res
        .status(400)
        .json({ phoneNumber: "User phone Number already exists" });
    }

    //create new user
    const createUser = await User.create({
      email,
      phoneNumber,
      password,
      is_admin: true,
    });
    //save user
    let newUser = await createUser.save();

    res.status(201).json({
      success: true,
      msg: "New Admin User Created Successfully. Please Login to continue.",
      newUser,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

//get a user by id
export const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (user) {
      console.log("user found", user);

      res.status(200).json({ user });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//get a username by id
export const getUserNameById = async (userId: any) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      return user.name;
    } else {
      throw new Error("User not found");
    }
  } catch (error: any) {
    console.log("error fetching user by id", error);
    throw new Error("error fetching user by id");
  }
};
