import { Router } from "express";
import { NumberController } from "../controllers/NumberController";

const router = Router();
const numberController = new NumberController();

// Endpoint to find missing numbers from a provided sequence
router.post("/find-missing", numberController.findMissingNumbers);

// Endpoint to simulate a sequence and find missing numbers
router.post("/simulate-missing", numberController.simulateAndFindMissing);

export default router;
