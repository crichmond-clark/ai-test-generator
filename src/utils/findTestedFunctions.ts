import path from 'path'
import {Project, SyntaxKind} from 'ts-morph'
import * as fs from 'fs'

export async function findTestedFunctions(testFolderPath: string, testPrefix: string): Promise<Map<string, string[]>> {
  const project = new Project()
  const testFiles = fs
    .readdirSync(testFolderPath)
    .filter((file) => (file.includes(testPrefix) && file.endsWith('.ts')) || file.endsWith('.js'))
    .map((file) => path.join(testFolderPath, file))

  const testedFunctions = new Map<string, string[]>()

  for (const filePath of testFiles) {
    const sourceFile = project.addSourceFileAtPath(filePath)
    const funtionCalls = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)

    for (const call of funtionCalls) {
      const expression = call.getExpression()
      if (expression.getKind() === SyntaxKind.Identifier) {
        const functionName = expression.getText()

        if (functionName.startsWith(testPrefix)) {
          const testedFunctionName = functionName.replace(/^test/, '')

          if (!testedFunctions.has(testedFunctionName)) {
            testedFunctions.set(testedFunctionName, [])
          }

          testedFunctions.get(testedFunctionName)!.push(filePath)
        }
      }
    }
  }

  return testedFunctions
}
