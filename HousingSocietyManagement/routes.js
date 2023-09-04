const express = require("express");
const societyRoutes = require("./routes/societyRoutes");
const residentRoutes = require("./routes/residentRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

const createRoutes = (app) => {
  app.use("/api/societies", societyRoutes);
  app.use("/api/residents", residentRoutes);
  app.use("/api/payments", paymentRoutes);
  app.use("/api/maintenance", maintenanceRoutes);
  app.use("/api/users", userRoutes); // Apply auth middleware to protect user routes
  //app.use('/api/users', authMiddleware, userRoutes); // Apply auth middleware to protect user routes
};

module.exports = createRoutes;
