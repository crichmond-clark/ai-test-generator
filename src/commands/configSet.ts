import {Command, Flags} from '@oclif/core' // Correct import
import * as fs from 'fs-extra'
import * as path from 'path'

export default class SetApiKey extends Command {
  static description = 'Set your API key'

  static flags = {
    key: Flags.string({char: 'k', description: 'Your API key', required: true}),
  }

  public async run(): Promise<void> {
    const {flags} = await this.parse(SetApiKey)

    const configFilePath = path.join(this.config.configDir, 'config.json')

    let configData: {apiKey?: string} = {}
    if (await fs.pathExists(configFilePath)) {
      configData = await fs.readJSON(configFilePath)
    }

    configData.apiKey = flags.key

    await fs.writeJSON(configFilePath, configData)

    this.log('API key set successfully!')
  }
}
