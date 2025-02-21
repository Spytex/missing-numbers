import { Request, Response } from "express";
import {
  MissingNumberService,
  AlgorithmVariant,
} from "../services/MissingNumberService";
import { createVirtualSequence } from "../utils/VirtualSequence";

export class NumberController {
  private missingNumberService: MissingNumberService;

  constructor() {
    this.missingNumberService = new MissingNumberService();
  }

  /**
   * Handles a POST request to find missing numbers from a provided sequence.
   * Full range is [1, sequence.length + 2].
   */
  public findMissingNumbers = (req: Request, res: Response): void => {
    try {
      const { sequence, algorithm } = req.body;
      if (!Array.isArray(sequence)) {
        res
          .status(400)
          .json({ error: 'Invalid input data. "sequence" must be an array.' });
        return;
      }
      const algoVariant: AlgorithmVariant = algorithm || "binary";
      const result = this.missingNumberService.findMissingNumbers(
        sequence,
        algoVariant
      );
      const missingTuple: [number, number] = result as [number, number];
      res.json({ missingNumbers: missingTuple });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  /**
   * Handles a POST request to simulate a sequence and find missing numbers.
   * Expects:
   * {
   *   "upperBound": <number>,
   *   "missingNumbers": [<number>, <number>],
   *   "algorithm": "binary" | "binary_golden"
   * }
   * Uses a virtual sequence to support very large upperBound values.
   */
  public simulateAndFindMissing = (req: Request, res: Response): void => {
    try {
      const { upperBound, missingNumbers, algorithm } = req.body;
      if (typeof upperBound !== "number" || !Array.isArray(missingNumbers)) {
        res
          .status(400)
          .json({
            error:
              'Invalid input data. "upperBound" must be a number and "missingNumbers" must be an array.',
          });
        return;
      }
      if (missingNumbers.length !== 2) {
        res
          .status(400)
          .json({
            error: '"missingNumbers" array must contain exactly 2 numbers.',
          });
        return;
      }
      // Use virtual sequence to avoid allocating huge arrays in memory
      const sequence = createVirtualSequence(
        upperBound,
        missingNumbers as [number, number]
      );
      const algoVariant: AlgorithmVariant = algorithm || "binary";
      const result = this.missingNumberService.findMissingNumbers(
        sequence,
        algoVariant
      );
      const missingTuple: [number, number] = result as [number, number];
      res.json({ missingNumbers: missingTuple });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };
}
