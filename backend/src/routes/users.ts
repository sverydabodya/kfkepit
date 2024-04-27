import express from "express";
import multer from "multer";
import * as usersController from "../controllers/users";

const router = express.Router();
const upload = multer();

router.get("/logout", usersController.logout);

router.post("/login", upload.none(), usersController.login);

export default router;
