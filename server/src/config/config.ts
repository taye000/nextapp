// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config()

export const config = {
  mongoDbUri: process.env.MONGODBURI!,
  PORT: process.env.PORT!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_SECRET_EXPIRY: 360000, //expires in 1 hour
  alchemyRPC: process.env.ALCHEMY_RPC!,
  imaniEscrowAddress: process.env.IMANI_ESCROW_ADDRESS!,
  privateKey: process.env.PRIVATE_KEY!,
};
