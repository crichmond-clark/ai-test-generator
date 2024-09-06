import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('mangto', () => {
  it('runs mangto cmd', async () => {
    const {stdout} = await runCommand('mangto')
    expect(stdout).to.contain('hello world')
  })

  it('runs mangto --name oclif', async () => {
    const {stdout} = await runCommand('mangto --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
