const {Command, Config} = require('@oclif/core')

class SetApiKeyCommand extends Command {
  async run() {
    const {flags} = this.parse(SetApiKeyCommand)
    const apiKey = flags.apiKey

    if (!apiKey) {
      this.error('API key is required. Use --api-key=<key> to provide it.')
    }

    const config = new Config({root: this.config.configDir})
    await config.load()

    config.set('apiKey', apiKey)
    await config.save()

    this.log('API key has been set.')
  }
}

SetApiKeyCommand.description = 'Set your Google Gemini API key'
SetApiKeyCommand.flags = {
  apiKey: {
    char: 'k',
    description: 'Google Gemini API key',
    required: true,
  },
}

module.exports = SetApiKeyCommand
