import express from "express";
import "./utils/prisma.util.js";
import { SERVER_PORT } from "./constants/env.constant.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
  return res.status(200).send(`I'm healthy.`);
});

app.listen(SERVER_PORT, () => {
  console.log(`서버가 ${SERVER_PORT}번 포트에서 실행 중입니다.`);
});
