import { MissingNumberService } from "../src/services/MissingNumberService";
import { createVirtualSequence } from "../src/utils/VirtualSequence";

describe("MissingNumberService - Correctness tests", () => {
  const service = new MissingNumberService();

  test("findMissingNumbers (binary method) - correctly identifies missing numbers", () => {
    // Full range: [1, 10] with missing numbers 2 and 3
    const sequence = [1, 4, 5, 6, 7, 8, 9, 10];
    const result = service.findMissingNumbers(sequence, "binary");
    expect(result.sort((a, b) => a - b)).toEqual([2, 3]);
  });

  test("findMissingNumbers (binary_golden method) - correctly identifies missing numbers", () => {
    const sequence = [1, 4, 5, 6, 7, 8, 9, 10];
    const result = service.findMissingNumbers(sequence, "binary_golden");
    expect(result.sort((a, b) => a - b)).toEqual([2, 3]);
  });
});

describe("MissingNumberService - Performance tests", () => {
  const service = new MissingNumberService();
  // Use a very large upperBound for performance testing
  const upperBound = 10000000000;
  const missingNumbers = [12345, 987654321];
  // Create a virtual sequence to avoid huge memory allocation
  const sequence = createVirtualSequence(
    upperBound,
    missingNumbers as [number, number]
  );

  test("Performance: binary method", () => {
    const start = process.hrtime.bigint();
    const result = service.findMissingNumbers(sequence, "binary");
    const end = process.hrtime.bigint();
    console.log(
      `Binary method result: ${result}, Time: ${Number(end - start) / 1e6} ms`
    );
    expect(result.sort((a, b) => a - b)).toEqual(missingNumbers);
  });

  test("Performance: binary_golden method", () => {
    const start = process.hrtime.bigint();
    const result = service.findMissingNumbers(sequence, "binary_golden");
    const end = process.hrtime.bigint();
    console.log(
      `Binary Golden method result: ${result}, Time: ${
        Number(end - start) / 1e6
      } ms`
    );
    expect(result.sort((a, b) => a - b)).toEqual(missingNumbers);
  });
});
