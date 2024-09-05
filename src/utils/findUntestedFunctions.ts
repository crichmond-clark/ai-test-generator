import * as path from 'path'
import * as fs from 'fs'
import {Project} from 'ts-morph'
import {extractFunctionsFromFile} from './extractFunctions.js'
import {findTestedFunctions} from './findTestedFunctions.js'

export default async function findUnTestedFunctions(
  fileOrDirectoryPath: string,
  testFolderPath: string,
): Promise<Map<string, string[]>> {
  const project = new Project()
  const allFunctions: string[] = []
  const stats = fs.statSync(fileOrDirectoryPath)

  if (stats.isDirectory()) {
    const sourceFiles = fs
      .readdirSync(fileOrDirectoryPath)
      .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
      .map((file) => path.join(fileOrDirectoryPath, file))

    for (const file of sourceFiles) {
      const functions = extractFunctionsFromFile(project, file)
      allFunctions.push(...functions.map((func) => func.name as string))
    }
  }

  const testedFunctionsMap = await findTestedFunctions(testFolderPath, 'test')

  const untestedFunctions = allFunctions.filter((funcName) => !testedFunctionsMap.has(funcName))
  const untestedFunctionsMap = new Map<string, string[]>()
  untestedFunctions.forEach((funcName) => {
    untestedFunctionsMap.set(funcName, [])
  })
  return untestedFunctionsMap
}
