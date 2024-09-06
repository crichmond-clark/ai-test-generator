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

    // Iterate over the map and print the results
    for (const [functionName, filePaths] of untestedFunctionsMap) {
      filePaths.forEach((filePath) => {
        console.log(`${filePath} - 1`) // Assuming each function is in one file
      })
    }
  }
}
