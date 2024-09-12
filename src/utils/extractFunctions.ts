import {Project} from 'ts-morph'

interface FunctionData {
  name: string
  text: string
  filePath: string
}

export default function extractFunctionsFromFile(project: Project, filePath: string): FunctionData[] {
  const sourceFile = project.addSourceFileAtPath(filePath)
  const functionsArray = sourceFile.getFunctions()

  const functions: FunctionData[] = []
  for (const func of functionsArray) {
    functions.push({
      name: func.getName() || '',
      text: func.getText(),
      filePath: filePath,
    })
  }

  return functions
}
