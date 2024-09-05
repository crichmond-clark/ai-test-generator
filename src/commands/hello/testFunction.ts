import {Args, Command} from '@oclif/core'
import {Project} from 'ts-morph'
import * as path from 'path'
import {extractFunctionByName} from '../../utils/extractFunctionByName.js'
import GeminiClient from '../../gemini/client.js'
const apiKey = process.env.API_KEY || ''

export default class TestFunction extends Command {
  static override args = {
    file: Args.string({description: 'file containing the function', required: true}),
    functionName: Args.string({description: 'name of the function to test', required: true}),
  }

  static override description = 'Generates a test for a specific function within a file'

  public async run(): Promise<void> {
    const {args} = await this.parse(TestFunction)

    const project = new Project()
    const functionSource = extractFunctionByName(project, args.file, args.functionName)

    if (!functionSource) {
      this.error(`Function '${args.functionName}' not found in ${args.file}`)
      return
    }

    const client = new GeminiClient(apiKey)
    const prompt = `Write a passing test for this function:\n\n${functionSource}`
    const tests = await client.generateTests(prompt)

    // Display the generated tests to the user
    this.log(`Generated test for ${args.functionName}:\n\n${tests}`)
  }
}
