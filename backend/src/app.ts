import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { checkDbConnection } from "../src/middlewares/dbConnectionCheck";
import {
  authenticationRouter,
  departmentRouter,
  employeeRouter,
} from "../src/routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://rkulur-ems.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkDbConnection);
app.use("/department", departmentRouter);
app.use("/employee", employeeRouter);
app.use("/auth", authenticationRouter);

app.get("/", (req, res) => res.send("Hi there!"));
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

export default app;
