import path from 'path'
import * as ts from 'typescript'
import {minimatch} from 'minimatch'
import {Project, SyntaxKind} from 'ts-morph'
import * as fs from 'fs'

export default async function findTestedFunctions(
  testFolderPath: string,
  testFilePatterns: string[] = ['*.test.ts', '*.spec.ts'],
): Promise<{[filePath: string]: string[]}> {
  const project = new Project()
  const testedFunctionsByFile: {[filePath: string]: string[]} = {}

  const entries = fs.readdirSync(testFolderPath)

  for (const entry of entries) {
    const fullPath = path.join(testFolderPath, entry)
    const stats = fs.statSync(fullPath)

    if (stats.isDirectory()) {
      // Recursively process subdirectories
      const subdirectoryResults = await findTestedFunctions(fullPath, testFilePatterns)
      Object.assign(testedFunctionsByFile, subdirectoryResults)
    } else if (stats.isFile() && testFilePatterns.some((pattern) => minimatch(entry, pattern))) {
      const sourceFile = project.addSourceFileAtPath(fullPath)
      const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression)

      const testedFunctionsInFile: string[] = []

      for (const call of callExpressions) {
        const expression = call.getExpression()
        if (
          expression.getKind() === SyntaxKind.Identifier &&
          (expression.getText() === 'describe' || expression.getText() === 'it')
        ) {
          const args = call.getArguments()
          if (args.length >= 2) {
            const firstArg = args[0]
            if (firstArg.getKind() === SyntaxKind.StringLiteral) {
              const stringLiteralNode = firstArg.compilerNode as ts.StringLiteral
              const potentialFunctionName = stringLiteralNode.text
              testedFunctionsInFile.push(potentialFunctionName)
            }
          }
        }
      }

      testedFunctionsByFile[fullPath] = testedFunctionsInFile
    }
  }

  return testedFunctionsByFile
}
