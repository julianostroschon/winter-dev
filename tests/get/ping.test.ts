import { describe, it } from 'node:test'
import { strictEqual } from 'node:assert'

import { ping } from '../../src/http/get/ping/index'

describe('ping', () => {
  it('should return `pong!`', async () => {
    const response = await ping.handler()
    strictEqual(response, 'pong!')
  })
})