import * as path from 'path'
import * as fs from 'fs'
import {Project} from 'ts-morph'
import {extractFunctionsFromFile} from './extractFunctions.js'
import {findTestedFunctions} from './findTestedFunctions.js'

export default async function findUnTestedFunctions(
  fileOrDirectoryPath: string,
  testFolderPath: string,
): Promise<{[fileName: string]: string[]}> {
  const project = new Project()
  const allFunctions: {fileName: string; functionText: string}[] = [] // Store file name and function text
  const stats = fs.statSync(fileOrDirectoryPath)

  if (stats.isDirectory()) {
    const sourceFiles = fs
      .readdirSync(fileOrDirectoryPath)
      .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
      .map((file) => path.join(fileOrDirectoryPath, file))

    for (const file of sourceFiles) {
      const functions = extractFunctionsFromFile(project, file)
      allFunctions.push(...functions.map((func) => ({fileName: file, functionText: func.text})))
    }
  }

  const testedFunctionsMap = await findTestedFunctions(testFolderPath, 'test')

  const untestedFunctions = allFunctions.filter(
    ({fileName, functionText}) => !Object.keys(testedFunctionsMap).includes(`${fileName}:${functionText}`),
  )

  const untestedFunctionsObject: {[fileName: string]: string[]} = {}
  untestedFunctions.forEach(({fileName, functionText}) => {
    if (!untestedFunctionsObject[fileName]) {
      untestedFunctionsObject[fileName] = []
    }
    untestedFunctionsObject[fileName].push(functionText)
  })
  console.log(untestedFunctionsObject)
  return untestedFunctionsObject
}
