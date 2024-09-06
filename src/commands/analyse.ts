import {Args, Command} from '@oclif/core'
import findUnTestedFunctions from '../utils/findUntestedFunctions.js'

export default class CountUntestedFunctions extends Command {
  static override args = {
    sourcePath: Args.string({description: 'source file or directory to analyze', required: true}),
    testFolderPath: Args.string({description: 'path to the test folder', required: true}),
  }

  static override description = 'This command will count the number of untested functions in a given file or directory'

  public async run(): Promise<void> {
    const {args} = await this.parse(CountUntestedFunctions)

    const untestedFunctionsMap = await findUnTestedFunctions(args.sourcePath, args.testFolderPath)

    // Loop through the untested functions and log file name and count
    for (const [functionName, untestedFunctions] of Object.entries(untestedFunctionsMap)) {
      const fileName = functionName.split(':')[0] // Extract file name from functionName
      const count = untestedFunctions.length

      console.log(`${fileName}: ${count} untested functions`)
    }
  }
}
