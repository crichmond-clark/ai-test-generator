import * as path from 'path'
import * as fs from 'fs/promises'
import {Args, Command} from '@oclif/core'
import {Project} from 'ts-morph'

import {extractFunctionByName} from '../utils/extractFunctionByName.js'
import GeminiClient from '../gemini/client.js'

export default class TestFunction extends Command {
  static override args = {
    path: Args.string({description: 'file containing the function', required: true}),
    functionName: Args.string({description: 'name of the function to test', required: true}),
  }

  static override description = 'Generates a test for a specific function within a file'

  public async run(): Promise<void> {
    const {args} = await this.parse(TestFunction)

    const project = new Project()
    const func = extractFunctionByName(project, args.path, args.functionName)

    if (!func) {
      this.error(`Function '${args.functionName}' not found in ${args.path}`)
      return
    }

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

    const client = new GeminiClient(apiKey)
    const prompt = `**Please provide the response without any additional formatting, such as backticks or headings.**. 
    *** add the full path provided for the import statements with ./ at the start of the path ***.Write tests for the functions 
    after the triple dash delimiter, they are in object format with the function name, test and filepath to help you with imports. 
    Do not return anything other than the tests. The tests will be oranised via their file names using comments as the headers for each section, 
    also you will use industry best practices and standards as well as keeping the tests as simple as possible, but with multiple assertions where 
    necessary to ensure test integrity if their are external dependancies in the function you will attempt to mock the function using jest.  --- ${JSON.stringify(func)}`
    const tests = await client.generateTests(prompt)
    const outputFilePath = path.join(path.dirname(args.path), `extracted_functions_${path.basename(args.path)}.ts`)
    const outputFile = project.createSourceFile(outputFilePath)
    await outputFile.addStatements(tests)
    await outputFile.save()

    // Display the generated tests to the user
    console.log(`Generated test for ${args.functionName}:\n\n${tests}`)
  }
}
