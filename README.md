

# Documentation

**Overview**

This CLI tool provides a suite of commands to streamline code analysis and unit testing within your TypeScript projects. It leverages the Gemini AI model to generate test cases and offers functionality to identify untested functions.

**Installation**

```bash
npm install -g ai-auto-testgen
```

## Usage
### Commands

#### set-api-key
This command must be run on initial use and  will permanently set your Gemini API Key

```bash
ai-auto-testgen set-api-key -k <api-key>
```

#### analyse


This command will count the number of untested functions in a given file or directory and return the information to the console
```bash
ai-auto-testgen analyse <path> <test-folder-path>
```

**parse**

This command will take a given file or directory path, find all untested functions and return a list of tests in a new file name gemini_tests.ts
```bash
ai-auto-testgen parse <path> <test-folder-path>
```

#### set-test-directory

This command will set your test directory path

```bash
ai-auto-testgen set-test-directory <test-directory-path>
```

#### test-function

This command will return a test for a single function

```bash
ai-auto-testgen test-function <path> <function-name>
```

