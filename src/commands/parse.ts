import {Command, Args} from '@oclif/core'
import * as fs from 'fs/promises'
import * as path from 'path'
import {Project} from 'ts-morph'
import findUnTestedFunctions from '../utils/findUntestedFunctions.js'
import GeminiClient from '../gemini/client.js'

export default class Parse extends Command {
  static override args = {
    path: Args.string({description: 'file to read', required: true}),
    testFolderPath: Args.string({description: 'path to the test folder', required: true}),
  }

  static override description =
    'this command will take a given file, find all functions and return a new file containing those functions'

  public async run(): Promise<void> {
    const {args} = await this.parse(Parse)

    const project = new Project()
    const untestedFunctions = await findUnTestedFunctions(args.path, args.testFolderPath, 'parse')

    // Create a new source file
    const outputFilePath = path.join(path.dirname(args.path), `extracted_functions_${path.basename(args.path)}.ts`)
    const outputFile = project.createSourceFile(outputFilePath)

    // 1. Read the API key from the config file
    const configFilePath = path.join(this.config.configDir, 'config.json')
    let apiKey: string | undefined

    try {
      const data = await fs.readFile(configFilePath, 'utf-8')
      const configData = JSON.parse(data)
      apiKey = configData.apiKey
    } catch (err) {
      this.error('Error reading API key from config. Please make sure you have set it using the "set-api-key" command.')
    }

    // 2. Check if the API key is available
    if (!apiKey) {
      this.error('API key not found in config. Please set it using the "set-api-key" command.')
    }

    // 3. Use the API key to create the GeminiClient
    const client = new GeminiClient(apiKey)
    const prompt = `**Please provide the response without any additional formatting, such as backticks or headings.**. *** add the full path provided for the import statements with ./ at the start of the path ***.Write tests for the functions after the triple dash delimiter, they are in object format with the function name, test and filepath to help you with imports. Do not return anything other than the tests. The tests will be oranised via their file names using comments as the headers for each section, also you will use industry best practices and standards as well as keeping the tests as simple as possible, but with multiple assertions wehre necessary to ensure test integrity if their are external dependancies in the function you will attempt to mock the function using jest.  --- ${JSON.stringify(untestedFunctions)} `
    const tests = await client.generateTests(prompt)
    await outputFile.addStatements(tests)
    await outputFile.save()

    this.log(`Extracted functions saved to: ${outputFile.getFilePath()}`)
  }
}
