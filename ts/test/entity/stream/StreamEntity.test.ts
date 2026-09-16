

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


describe('StreamEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LISTENFREE_TEST_LIVE=TRUE.
  afterEach(liveDelay('LISTENFREE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ListenfreeSDK.test()
    const ent = testsdk.Stream()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LISTENFREE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'stream.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"bitrate","req":false,"short":"Audio bitrate in kbps","type":"`$INTEGER`","index$":0},{"active":true,"format":"date-time","name":"expiresAt","req":false,"short":"Expiration time of the stream URL","type":"`$STRING`","index$":1},{"active":true,"name":"quality","req":false,"short":"Audio quality","type":"`$STRING`","index$":2},{"active":true,"format":"uri","name":"streamUrl","req":false,"short":"URL for streaming the song","type":"`$STRING`","index$":3}],"name":"stream","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"song_id","orig":"song_id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"example":"high","kind":"query","name":"quality","orig":"quality","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /songs/{songId}/stream","json":"{\"operationId\":\"streamSong\",\"parameters\":[{\"description\":\"Unique identifier of the song\",\"in\":\"path\",\"name\":\"songId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Audio quality preference\",\"in\":\"query\",\"name\":\"quality\",\"required\":false,\"schema\":{\"default\":\"high\",\"enum\":[\"low\",\"medium\",\"high\"],\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"bitrate\":{\"description\":\"Audio bitrate in kbps\",\"type\":\"integer\"},\"expiresAt\":{\"description\":\"Expiration time of the stream URL\",\"format\":\"date-time\",\"type\":\"string\"},\"quality\":{\"description\":\"Audio quality\",\"enum\":[\"low\",\"medium\",\"high\"],\"type\":\"string\"},\"streamUrl\":{\"description\":\"URL for streaming the song\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Stream URL retrieved successfully\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Song not found\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/songs/{songId}/stream","rename":{"param":{"songId":"song_id"}},"segments":[{"lit":"songs"},{"var":"song_id"},{"lit":"stream"}],"select":{"exist":["quality","song_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["song"]]},"key$":"stream","name__orig":"stream","Name":"Stream","name_":"stream","name-":"stream","NAME":"STREAM","index$":6}, {"active":true,"entity":"stream","key$":"BasicStreamFlow","kind":"basic","name":"BasicStreamFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"stream_ref01","srcdatavar":"stream_ref01_data","suffix":"_dt0"},"match":{"id":"stream01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-stream_ref01"}}],"index$":0}]}, 'Stream')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let stream_ref01_data = Object.values(setup.data.existing.stream)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const stream_ref01_ent = client.Stream()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/stream/StreamTestData.json')

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
    ['stream01','stream02','stream03','song01','song02','song03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LISTENFREE_TEST_STREAM_ENTID': idmap,
    'LISTENFREE_TEST_LIVE': 'FALSE',
    'LISTENFREE_TEST_EXPLAIN': 'FALSE',
    'LISTENFREE_APIKEY': '',
  })

  idmap = env['LISTENFREE_TEST_STREAM_ENTID']

  const live = 'TRUE' === env.LISTENFREE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LISTENFREE_TEST_STREAM_ENTID']
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
  
