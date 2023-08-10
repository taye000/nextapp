import { Application } from "express";

export const configureRoutes = (app: Application) => {
  app.get("/", async (_req, res) => {
    res.send({ message: "imaniescrow!" });
  });
  app.use("/api/users", require("./api/users"));
  app.use("/api/admin", require("./api/admin"));
  app.use("/api/transactions", require("./api/transactions"));
  app.use("/api/subscribers", require("./api/subscribers"));
};
