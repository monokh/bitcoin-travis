/**
 * @jest-environment node
 */

const axios = require('axios')

async function get (...args) {
  const result = await axios.post('http://localhost:18443', {
    "jsonrpc":"2.0","method":args[0],"params":[...args.slice(1)],"id":1
  },{ auth: {
    username: 'bitcoin',
    password: 'local321'
  }, json: true })
  return result.data.result
}

test('Network is regtest and starts at block 105', async () => {
  const blockchainInfo = await get('getblockchaininfo')
  expect(blockchainInfo.chain).toBe('regtest')
  expect(blockchainInfo.blocks).toBe(105)
})

test('Generating block works', async () => {
  await get('generate', 1)
  let blockchainInfo = await get('getblockchaininfo')
  expect(blockchainInfo.blocks).toBe(106)

  await get('generate', 1)
  blockchainInfo = await get('getblockchaininfo')
  expect(blockchainInfo.blocks).toBe(107)
})
