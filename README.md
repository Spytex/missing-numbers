# Missing Numbers API

A REST API to find two missing numbers in a sorted sequence.

## Endpoints

### POST `/find-missing`

- **Description:** Returns the two missing numbers from a sequence.  
  Full range is [1, sequence.length + 2].
- **Request Example:**

  ```json
  {
    "sequence": [1, 2, 4, 5, 6, 8, 9, 10],
    "algorithm": "binary" // Optional: "binary" or "binary_golden"
  }
  ```

- **Response Example:**
  ```json
  {
    "missingNumbers": [3, 7]
  }
  ```

### POST `/simulate-missing`

- **Description:** Generates a sequence from 1 to `upperBound` with specified numbers missing, then finds the missing numbers.
- **Request Example:**
  ```json
  {
    "upperBound": 100002,
    "missingNumbers": [12345, 67890],
    "algorithm": "binary" // Optional: "binary" or "binary_golden"
  }
  ```
- **Response Example:**
  ```json
  {
    "missingNumbers": [12345, 67890]
  }
  ```

## Algorithms

- **binary (default):** Classic binary search. Complexity: O(log n)
- **binary_golden:** Binary search using the golden ratio. Complexity: O(log n)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Start the server:
   ```bash
   npm start
   ```

API documentation is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Testing

Run tests with:

```bash
npm test
```
