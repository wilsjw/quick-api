import express from "express";
import { createUser, getUsers, getUser } from "../controllers/user.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);

export default router;
