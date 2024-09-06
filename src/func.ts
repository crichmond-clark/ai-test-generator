// functions.ts

// 1. Simple arithmetic
function add(a: number, b: number): number {
  return a + b
}

// 2. String manipulation
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 3. Array operations
function filterEvenNumbers(arr: number[]): number[] {
  return arr.filter((num) => num % 2 === 0)
}

// 4. Object manipulation
function extractProperty<T, K extends keyof T>(obj: T, propName: K): T[K] {
  return obj[propName]
}

// 5. Date/time functions
function isWeekend(date: Date): boolean {
  const dayOfWeek = date.getDay()
  return dayOfWeek === 0 || dayOfWeek === 6
}

// 6. Validation functions
function isValidEmail(email: string): boolean {
  // Basic email validation regex (you can use a more robust one)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 7. Sorting functions
function sortNumbersAscending(arr: number[]): number[] {
  return arr.slice().sort((a, b) => a - b)
}

// 8. Transformation functions
function doubleNumbers(arr: number[]): number[] {
  return arr.map((num) => num * 2)
}

// 9. Conditional logic
function getGrade(score: number): string {
  if (score >= 90) return 'A'
  if (score >= 80) return 'B'
  if (score >= 70) return 'C'
  if (score >= 60) return 'D'
  return 'F'
}

// 10. Asynchronous functions (using Promises)
function fetchData(url: string): Promise<{message: string}> {
  return new Promise((resolve, reject) => {
    // Simulate fetching data (replace with actual fetch logic)
    setTimeout(() => {
      const data = {message: 'Data fetched successfully!'}
      resolve(data)
    }, 1000)
  })
}

export {
  add,
  capitalize,
  filterEvenNumbers,
  extractProperty,
  isWeekend,
  isValidEmail,
  sortNumbersAscending,
  doubleNumbers,
  getGrade,
  fetchData,
}
