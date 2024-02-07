import express from "express";
import { addUser, deleteUser, getUser, updateUser } from "../controller/user.js";

const router = express.Router()

router.get("/", getUser)

router.post("/", addUser)

router.put("/:id", updateUser)

router.delete("/:id", deleteUser)

export default router