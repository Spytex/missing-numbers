import { binary } from "./algorithms/Binary";
import { binaryGolden } from "./algorithms/BinaryGolden";

export type AlgorithmVariant = "binary" | "binary_golden";

export class MissingNumberService {
  /**
   * Finds the two missing numbers in a sorted sequence.
   * Full range is defined as [1, sequence.length + 2].
   *
   * @param sequence Sorted array (or ArrayLike) of numbers with exactly two numbers missing.
   * @param algorithm Algorithm to use: "binary" or "binary_golden". Default is "binary".
   * @returns A tuple with the two missing numbers in ascending order.
   */
  public findMissingNumbers(
    sequence: ArrayLike<number>,
    algorithm: AlgorithmVariant = "binary"
  ): [number, number] {
    const upperBound = sequence.length + 2;
    if (sequence.length !== upperBound - 2) {
      throw new Error(
        `Invalid sequence length. Expected ${upperBound - 2} numbers but got ${
          sequence.length
        }.`
      );
    }

    switch (algorithm) {
      case "binary":
        return binary(sequence);
      case "binary_golden":
        return binaryGolden(sequence);
      default:
        throw new Error(`Unknown algorithm variant: ${algorithm}`);
    }
  }
}
