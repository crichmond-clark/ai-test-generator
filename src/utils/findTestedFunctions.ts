import path from 'path'
import {Project, SyntaxKind} from 'ts-morph'
import * as fs from 'fs'

export async function findTestedFunctions(
  testFolderPath: string,
  testPrefix: string,
): Promise<{[filePath: string]: string[]}> {
  const project = new Project()
  const testFiles = fs
    .readdirSync(testFolderPath)
    .filter((file) => (file.includes(testPrefix) && file.endsWith('.ts')) || file.endsWith('.js'))
    .map((file) => path.join(testFolderPath, file))

  const testedFunctionsByFile: {[filePath: string]: string[]} = {} // Object to store tested functions

  for (const filePath of testFiles) {
    const sourceFile = project.addSourceFileAtPath(filePath)
    const functionCalls = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)

    const testedFunctionsInFile: string[] = [] // Array to store tested functions in this file

    for (const call of functionCalls) {
      const expression = call.getExpression()
      if (expression.getKind() === SyntaxKind.Identifier) {
        const functionName = expression.getText()

        if (functionName.startsWith(testPrefix)) {
          const testedFunctionName = functionName.replace(/^test/, '')
          testedFunctionsInFile.push(testedFunctionName)
        }
      }
    }

    testedFunctionsByFile[filePath] = testedFunctionsInFile // Assign array to object property
  }

  return testedFunctionsByFile
}
