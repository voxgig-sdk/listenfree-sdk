

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { ListenfreeSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('MusicEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LISTENFREE_TEST_LIVE=TRUE.
  afterEach(liveDelay('LISTENFREE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ListenfreeSDK.test()
    const ent = testsdk.Music()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LISTENFREE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'music.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"downloadedAt","req":false,"short":"Download completion timestamp","type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"expiresAt","req":false,"short":"Offline availability expiration","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Download ID","type":"`$STRING`","index$":2},{"active":true,"name":"progress","req":false,"short":"Download progress percentage","type":"`$INTEGER`","index$":3},{"active":true,"name":"song","req":false,"type":"`$OBJECT`","index$":4},{"active":true,"name":"status","req":false,"short":"Download status","type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"music","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /offline/downloads","json":"{\"operationId\":\"listOfflineDownloads\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"downloads\":{\"items\":{\"properties\":{\"downloadedAt\":{\"description\":\"Download completion timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"expiresAt\":{\"description\":\"Offline availability expiration\",\"format\":\"date-time\",\"type\":\"string\"},\"id\":{\"description\":\"Download ID\",\"type\":\"string\"},\"progress\":{\"description\":\"Download progress percentage\",\"maximum\":100,\"minimum\":0,\"type\":\"integer\"},\"song\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"status\":{\"description\":\"Download status\",\"enum\":[\"pending\",\"downloading\",\"completed\",\"failed\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"List of downloaded songs\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/offline/downloads","segments":[{"lit":"offline"},{"lit":"downloads"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.downloads`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"music","name__orig":"music","Name":"Music","name_":"music","name-":"music","NAME":"MUSIC","index$":1}, {"active":true,"entity":"music","key$":"BasicMusicFlow","kind":"basic","name":"BasicMusicFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"music_ref01"}}],"index$":0}]}, 'Music')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let music_ref01_data = Object.values(setup.data.existing.music)[0] as any

    // LIST
    const music_ref01_ent = client.Music()
    const music_ref01_match: any = {}

    const music_ref01_list = (await music_ref01_ent.list(music_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/music/MusicTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = ListenfreeSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['music01','music02','music03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LISTENFREE_TEST_MUSIC_ENTID': idmap,
    'LISTENFREE_TEST_LIVE': 'FALSE',
    'LISTENFREE_TEST_EXPLAIN': 'FALSE',
    'LISTENFREE_APIKEY': '',
  })

  idmap = env['LISTENFREE_TEST_MUSIC_ENTID']

  const live = 'TRUE' === env.LISTENFREE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LISTENFREE_TEST_MUSIC_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new ListenfreeSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.LISTENFREE_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.LISTENFREE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
