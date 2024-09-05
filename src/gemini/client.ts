import {GoogleGenerativeAI} from '@google/generative-ai'

export default class GeminiClient {
  private GenAI: GoogleGenerativeAI

  constructor(apiKey: string) {
    this.GenAI = new GoogleGenerativeAI(apiKey)
  }

  async generateTests(prompt: string): Promise<string> {
    const model = this.GenAI.getGenerativeModel({model: 'gemini-1.5-pro'})
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  }
}
