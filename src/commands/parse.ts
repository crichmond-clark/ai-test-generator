import {Args, Command} from '@oclif/core'
import {Project} from 'ts-morph'
import * as path from 'path'
import {extractFunctionsFromFile} from '../utils/extractFunctions.js'
import GeminiClient from '../gemini/client.js'

const apiKey = process.env.API_KEY || ''

export default class ParseFile extends Command {
  static override args = {
    file: Args.string({description: 'file to read', required: true}),
  }

  static override description =
    'this command will take a given file, find all functions and return a new file containing those functions'

  public async run(): Promise<void> {
    const {args} = await this.parse(ParseFile)

    const project = new Project()
    const functionsArray = extractFunctionsFromFile(project, args.file)

    // Create a new source file
    const outputFilePath = path.join(path.dirname(args.file), `extracted_functions_${path.basename(args.file)}`)
    const outputFile = project.createSourceFile(outputFilePath)

    const client = new GeminiClient('AIzaSyBx--3eNjtzV0JBbAyzTuBCLNW2qr13N34')
    const prompt = `write passing tests for these functions --- ${JSON.stringify(functionsArray)} `
    const tests = await client.generateTests(prompt)
    await outputFile.addStatements(tests)
    await outputFile.save()

    this.log(`Extracted functions saved to: ${outputFile.getFilePath()}`)
  }
}
