import {Command, Flags} from '@oclif/core'
import * as fs from 'fs/promises'
import * as path from 'path'

export default class SetApiKey extends Command {
  static description = 'Set your API key'

  static flags = {
    k: Flags.string({char: 'k', description: 'Your API key', required: true}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(SetApiKey)

    const configFilePath = path.join(this.config.configDir, 'config.json')

    // 1. Ensure the config directory exists
    try {
      await fs.access(this.config.configDir)
    } catch (err) {
      // If the directory doesn't exist, create it
      await fs.mkdir(this.config.configDir, {recursive: true})
    }

    let configData: {apiKey?: string} = {}

    // 2. Check if the config file exists (using fs.access)
    try {
      await fs.access(configFilePath)
      const data = await fs.readFile(configFilePath, 'utf-8')
      configData = JSON.parse(data)
    } catch (err) {
      // File doesn't exist, so configData remains an empty object
    }

    // 3. Set the API key in the config data
    configData.apiKey = flags.k

    // 4. Write the updated config back to the file
    await fs.writeFile(configFilePath, JSON.stringify(configData, null, 2))

    this.log('API key set successfully!')
  }
}
