import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 5000;

import getPostRouter from "./routes/getPostRouter.js";
import sendMailRouter from "./routes/sendMailRouter.js";

app.use("/api", getPostRouter);
app.use("/api", sendMailRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
