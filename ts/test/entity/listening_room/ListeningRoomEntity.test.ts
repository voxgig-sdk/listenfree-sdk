

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
      if (!live && maybeSkipControl(t, 'entityOp', 'listening_room.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"createdAt","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"currentSong","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"description","req":false,"short":"Room description","type":"`$STRING`","index$":2},{"active":true,"name":"host","req":false,"short":"User ID of room host","type":"`$STRING`","index$":3},{"active":true,"name":"id","req":false,"short":"Unique identifier for the listening room","type":"`$STRING`","index$":4},{"active":true,"name":"isPublic","req":false,"short":"Whether room is public","type":"`$BOOLEAN`","index$":5},{"active":true,"name":"maxParticipants","req":false,"short":"Maximum number of participants","type":"`$INTEGER`","index$":6},{"active":true,"name":"name","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"short":"Room name","type":"`$STRING`","index$":7},{"active":true,"name":"participants","req":false,"type":"`$ARRAY`","index$":8},{"active":true,"name":"queue","req":false,"type":"`$ARRAY`","index$":9}],"id":{"field":"id","name":"id"},"name":"listening_room","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"room_id","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"POST /listening-rooms/{roomId}/join","json":"{\"operationId\":\"joinListeningRoom\",\"parameters\":[{\"description\":\"Unique identifier of the listening room\",\"in\":\"path\",\"name\":\"roomId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"currentSong\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":{\"description\":\"Room description\",\"type\":\"string\"},\"host\":{\"description\":\"User ID of room host\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the listening room\",\"type\":\"string\"},\"isPublic\":{\"description\":\"Whether room is public\",\"type\":\"boolean\"},\"maxParticipants\":{\"description\":\"Maximum number of participants\",\"type\":\"integer\"},\"name\":{\"description\":\"Room name\",\"type\":\"string\"},\"participants\":{\"items\":{\"properties\":{\"userId\":{\"type\":\"string\"},\"username\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"queue\":{\"items\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successfully joined the room\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Listening room not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/listening-rooms/{roomId}/join","rename":{"param":{"roomId":"id"}},"segments":[{"lit":"listening-rooms"},{"var":"id"},{"lit":"join"}],"select":{"$action":"join","exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /listening-rooms","json":"{\"operationId\":\"createListeningRoom\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Room description\",\"maxLength\":500,\"type\":\"string\"},\"isPublic\":{\"default\":true,\"description\":\"Whether room should be public\",\"type\":\"boolean\"},\"maxParticipants\":{\"default\":10,\"description\":\"Maximum number of participants\",\"maximum\":100,\"minimum\":2,\"type\":\"integer\"},\"name\":{\"description\":\"Room name\",\"maxLength\":100,\"minLength\":1,\"type\":\"string\"}},\"required\":[\"name\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"currentSong\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":{\"description\":\"Room description\",\"type\":\"string\"},\"host\":{\"description\":\"User ID of room host\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the listening room\",\"type\":\"string\"},\"isPublic\":{\"description\":\"Whether room is public\",\"type\":\"boolean\"},\"maxParticipants\":{\"description\":\"Maximum number of participants\",\"type\":\"integer\"},\"name\":{\"description\":\"Room name\",\"type\":\"string\"},\"participants\":{\"items\":{\"properties\":{\"userId\":{\"type\":\"string\"},\"username\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"queue\":{\"items\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Listening room created successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/listening-rooms","segments":[{"lit":"listening-rooms"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /listening-rooms","json":"{\"operationId\":\"listListeningRooms\",\"parameters\":[{\"description\":\"Maximum number of rooms to return\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"default\":20,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"rooms\":{\"items\":{\"properties\":{\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"currentSong\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":{\"description\":\"Room description\",\"type\":\"string\"},\"host\":{\"description\":\"User ID of room host\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the listening room\",\"type\":\"string\"},\"isPublic\":{\"description\":\"Whether room is public\",\"type\":\"boolean\"},\"maxParticipants\":{\"description\":\"Maximum number of participants\",\"type\":\"integer\"},\"name\":{\"description\":\"Room name\",\"type\":\"string\"},\"participants\":{\"items\":{\"properties\":{\"userId\":{\"type\":\"string\"},\"username\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"queue\":{\"items\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"List of listening rooms\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/listening-rooms","segments":[{"lit":"listening-rooms"}],"select":{"exist":["limit"]},"transform":{"req":"`reqdata`","res":"`body.rooms`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"room_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /listening-rooms/{roomId}","json":"{\"operationId\":\"getListeningRoom\",\"parameters\":[{\"description\":\"Unique identifier of the listening room\",\"in\":\"path\",\"name\":\"roomId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"format\":\"date-time\",\"type\":\"string\"},\"currentSong\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"description\":{\"description\":\"Room description\",\"type\":\"string\"},\"host\":{\"description\":\"User ID of room host\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the listening room\",\"type\":\"string\"},\"isPublic\":{\"description\":\"Whether room is public\",\"type\":\"boolean\"},\"maxParticipants\":{\"description\":\"Maximum number of participants\",\"type\":\"integer\"},\"name\":{\"description\":\"Room name\",\"type\":\"string\"},\"participants\":{\"items\":{\"properties\":{\"userId\":{\"type\":\"string\"},\"username\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"queue\":{\"items\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Listening room details\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Listening room not found\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/listening-rooms/{roomId}","rename":{"param":{"roomId":"id"}},"segments":[{"lit":"listening-rooms"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"listening_room","name__orig":"listening_room","Name":"ListeningRoom","name_":"listening_room","name-":"listening-room","NAME":"LISTENING_ROOM","index$":0}, {"active":true,"entity":"listening_room","key$":"BasicListeningRoomFlow","kind":"basic","name":"BasicListeningRoomFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"listening_room_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"listening_room_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"listening_room_ref01","srcdatavar":"listening_room_ref01_data","suffix":"_dt0"},"match":{"id":"listening_room01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-listening_room_ref01"}}],"index$":2}]}, 'ListeningRoom')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const listening_room_ref01_ent = client.ListeningRoom()
    let listening_room_ref01_data = setup.data.new.listening_room['listening_room_ref01']

    listening_room_ref01_data = (await listening_room_ref01_ent.create(listening_room_ref01_data)).data()
    assert(null != listening_room_ref01_data.id)


    // LIST
    const listening_room_ref01_match: any = {}

    const listening_room_ref01_list = (await listening_room_ref01_ent.list(listening_room_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(listening_room_ref01_list, { id: listening_room_ref01_data.id })))


    // LOAD
    const listening_room_ref01_match_dt0: any = {}
    listening_room_ref01_match_dt0.id = listening_room_ref01_data.id
    const listening_room_ref01_data_dt0 = (await listening_room_ref01_ent.load(listening_room_ref01_match_dt0)).data()
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

  const env = envOverride({
    'LISTENFREE_TEST_LISTENING_ROOM_ENTID': idmap,
    'LISTENFREE_TEST_LIVE': 'FALSE',
    'LISTENFREE_TEST_EXPLAIN': 'FALSE',
    'LISTENFREE_APIKEY': '',
  })

  idmap = env['LISTENFREE_TEST_LISTENING_ROOM_ENTID']

  const live = 'TRUE' === env.LISTENFREE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LISTENFREE_TEST_LISTENING_ROOM_ENTID']
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
  
