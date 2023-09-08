require("dotenv").config()

export const config = {
  mongoDbUri: process.env.MONGODBURI!,
  PORT: process.env.PORT!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_SECRET_EXPIRY: 360000, //expires in 1 hour
  alchemyRPC: process.env.ALCHEMY_RPC!,
  imaniEscrowAddress: "0xFcf566f1918021F762E4e10eC597dF35B08454E8",
  privateKey: process.env.PRIVATE_KEY!,
};
