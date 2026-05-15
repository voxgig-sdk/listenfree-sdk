
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { ListenfreeSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await ListenfreeSDK.test()
    equal(null !== testsdk, true)
  })

})
