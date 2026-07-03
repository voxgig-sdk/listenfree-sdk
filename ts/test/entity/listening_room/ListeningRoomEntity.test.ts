
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { ListenfreeSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('ListeningRoomEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LISTENFREE_TEST_LIVE=TRUE.
  afterEach(liveDelay('LISTENFREE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ListenfreeSDK.test()
    const ent = testsdk.ListeningRoom()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LISTENFREE_TEST_LIVE
    for (const op of ['create', 'list', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'listening_room.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set LISTENFREE_TEST_LISTENING_ROOM_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const listening_room_ref01_ent = client.ListeningRoom()
    let listening_room_ref01_data = setup.data.new.listening_room['listening_room_ref01']

    listening_room_ref01_data = await listening_room_ref01_ent.create(listening_room_ref01_data)
    assert(null != listening_room_ref01_data.id)


    // LIST
    const listening_room_ref01_match: any = {}

    const listening_room_ref01_list = await listening_room_ref01_ent.list(listening_room_ref01_match)

    assert(!isempty(select(listening_room_ref01_list, { id: listening_room_ref01_data.id })))


    // LOAD
    const listening_room_ref01_match_dt0: any = {}
    listening_room_ref01_match_dt0.id = listening_room_ref01_data.id
    const listening_room_ref01_data_dt0 = await listening_room_ref01_ent.load(listening_room_ref01_match_dt0)
    assert(listening_room_ref01_data_dt0.id === listening_room_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/listening_room/ListeningRoomTestData.json')

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
    ['listening_room01','listening_room02','listening_room03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['LISTENFREE_TEST_LISTENING_ROOM_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'LISTENFREE_TEST_LISTENING_ROOM_ENTID': idmap,
    'LISTENFREE_TEST_LIVE': 'FALSE',
    'LISTENFREE_TEST_EXPLAIN': 'FALSE',
    'LISTENFREE_APIKEY': 'NONE',
  })

  idmap = env['LISTENFREE_TEST_LISTENING_ROOM_ENTID']

  const live = 'TRUE' === env.LISTENFREE_TEST_LIVE

  if (live) {
    client = new ListenfreeSDK(merge([
      {
        apikey: env.LISTENFREE_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
