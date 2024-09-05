import {Project} from 'ts-morph'

export function extractFunctionByName(project: Project, filePath: string, functionName: string): string | null {
  const sourceFile = project.addSourceFileAtPath(filePath)
  const functionDeclaration = sourceFile.getFunction(functionName)

  if (functionDeclaration) {
    return functionDeclaration.getText()
  } else {
    return null
  }
}
