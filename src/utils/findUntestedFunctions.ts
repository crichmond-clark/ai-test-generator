import * as path from 'path'
import * as fs from 'fs'
import {Project} from 'ts-morph'
import extractFunctionsFromFile from './extractFunctions.js'
import findTestedFunctions from './findTestedFunctions.js'

export default async function findUnTestedFunctions(
  fileOrDirectoryPath: string,
  testFolderPath: string,
  command: string,
) {
  const project = new Project()
  const allFunctions: {fileName: string; functionText: string; functionName: string}[] = []
  const stats = fs.statSync(fileOrDirectoryPath)

  if (stats.isDirectory()) {
    const sourceFiles = fs
      .readdirSync(fileOrDirectoryPath)
      .filter((file) => file.endsWith('.ts') || file.endsWith('.js'))
      .map((file) => path.join(fileOrDirectoryPath, file))

    for (const file of sourceFiles) {
      const functions = extractFunctionsFromFile(project, file)
      allFunctions.push(
        ...functions.map((func) => ({fileName: file, functionText: func.text, functionName: func.name})),
      )
    }
  }

  if (stats.isFile()) {
    const functions = extractFunctionsFromFile(project, fileOrDirectoryPath)
    allFunctions.push(
      ...functions.map((func) => ({fileName: fileOrDirectoryPath, functionText: func.text, functionName: func.name})),
    )
  }

  const testedFunctionsMap = await findTestedFunctions(testFolderPath)

  const untestedFunctions = allFunctions.filter(({fileName, functionName}) => {
    const potentialTestFileName = fileName.replace(/(\.ts|\.js)$/, '.test$1')
    return !testedFunctionsMap[potentialTestFileName]?.includes(functionName)
  })

  if (command === 'parse') {
    return untestedFunctions
  }

  const untestedFunctionsObject: {[fileName: string]: string[]} = {}
  untestedFunctions.forEach(({fileName, functionText}) => {
    if (!untestedFunctionsObject[fileName]) {
      untestedFunctionsObject[fileName] = []
    }
    untestedFunctionsObject[fileName].push(functionText)
  })

  return untestedFunctionsObject
}
