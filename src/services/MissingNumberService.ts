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
        return this.findMissingNumbersBinary(sequence);
      case "binary_golden":
        return this.findMissingNumbersBinaryGolden(sequence);
      default:
        throw new Error(`Unknown algorithm variant: ${algorithm}`);
    }
  }

  /**
   * Classic binary search method.
   * Complexity: O(log n)
   */
  private findMissingNumbersBinary(
    sequence: ArrayLike<number>,
    lowerBound: number = 1
  ): [number, number] {
    const findMissingAt = (target: number): number => {
      let lo = 0,
        hi = sequence.length - 1;
      let index = sequence.length;
      while (lo <= hi) {
        const mid = Math.floor((lo + hi) / 2);
        const missingCount = sequence[mid] - (lowerBound + mid);
        if (missingCount >= target) {
          index = mid;
          hi = mid - 1;
        } else {
          lo = mid + 1;
        }
      }
      return index === sequence.length
        ? lowerBound + sequence.length + (target - 1)
        : lowerBound + index + (target - 1);
    };

    const missing1 = findMissingAt(1);
    const missing2 = findMissingAt(2);
    return missing1 < missing2 ? [missing1, missing2] : [missing2, missing1];
  }

  /**
   * Binary search method using the golden ratio.
   * Complexity: O(log n)
   */
  private findMissingNumbersBinaryGolden(
    sequence: ArrayLike<number>,
    lowerBound: number = 1
  ): [number, number] {
    const phi = (Math.sqrt(5) - 1) / 2;
    const findMissingAtGolden = (target: number): number => {
      let lo = 0,
        hi = sequence.length - 1;
      let index = sequence.length;
      while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) * phi);
        const missingCount = sequence[mid] - (lowerBound + mid);
        if (missingCount >= target) {
          index = mid;
          hi = mid - 1;
        } else {
          lo = mid + 1;
        }
      }
      return index === sequence.length
        ? lowerBound + sequence.length + (target - 1)
        : lowerBound + index + (target - 1);
    };

    const missing1 = findMissingAtGolden(1);
    const missing2 = findMissingAtGolden(2);
    return missing1 < missing2 ? [missing1, missing2] : [missing2, missing1];
  }
}
