import {Command, Args} from '@oclif/core'
import * as fs from 'fs/promises'
import * as path from 'path'

export default class SetTestDirectory extends Command {
  static description = 'Set your test directory'

  static args = {
    directory: Args.string({description: 'Your test directory', required: true}),
  }

  public async run(): Promise<void> {
    const {args} = await this.parse(SetTestDirectory)

    const configFilePath = path.join(this.config.configDir, 'config.json') // 1. Ensure the config directory exists

    try {
      await fs.access(this.config.configDir)
    } catch (err) {
      // If the directory doesn't exist, create it
      await fs.mkdir(this.config.configDir, {recursive: true})
    }

    let configData: {testDirectory?: string} = {} // 2. Check if the config file exists

    try {
      await fs.access(configFilePath)
      const data = await fs.readFile(configFilePath, 'utf-8')
      configData = JSON.parse(data)
    } catch (err) {
      // File doesn't exist, so configData remains an empty object
    } // 3. Set the test directory in the config data

    configData.testDirectory = args.directory // 4. Write the updated config back to the file

    await fs.writeFile(configFilePath, JSON.stringify(configData, null, 2))

    this.log('Test directory set successfully!')
  }
}
