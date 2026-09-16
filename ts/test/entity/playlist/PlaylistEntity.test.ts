

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


describe('PlaylistEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when LISTENFREE_TEST_LIVE=TRUE.
  afterEach(liveDelay('LISTENFREE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = ListenfreeSDK.test()
    const ent = testsdk.Playlist()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.LISTENFREE_TEST_LIVE
    for (const op of ['create', 'list', 'update', 'load', 'remove']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'playlist.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"format":"date-time","name":"createdAt","req":false,"short":"Creation timestamp","type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"short":"Playlist description","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Unique identifier for the playlist","type":"`$STRING`","index$":2},{"active":true,"name":"isPublic","req":false,"short":"Whether playlist is public","type":"`$BOOLEAN`","index$":3},{"active":true,"name":"isSmart","req":false,"short":"Whether playlist is a smart playlist","type":"`$BOOLEAN`","index$":4},{"active":true,"name":"name","op":{"create":{"req":true,"type":"`$STRING`"}},"req":false,"short":"Playlist name","type":"`$STRING`","index$":5},{"active":true,"name":"owner","req":false,"short":"User ID of playlist owner","type":"`$STRING`","index$":6},{"active":true,"name":"smartCriteria","req":false,"short":"Criteria for smart playlist generation","type":"`$OBJECT`","index$":7},{"active":true,"name":"songCount","req":false,"short":"Number of songs in playlist","type":"`$INTEGER`","index$":8},{"active":true,"name":"songId","req":true,"short":"ID of the song to add","type":"`$STRING`","index$":9},{"active":true,"name":"songs","req":false,"type":"`$ARRAY`","index$":10},{"active":true,"format":"date-time","name":"updatedAt","req":false,"short":"Last update timestamp","type":"`$STRING`","index$":11}],"id":{"field":"id","name":"id"},"name":"playlist","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"playlist_id","reqd":true,"type":"`$STRING`"}]},"contract":{"id":"POST /playlists/{playlistId}/songs","json":"{\"operationId\":\"addSongToPlaylist\",\"parameters\":[{\"description\":\"Unique identifier of the playlist\",\"in\":\"path\",\"name\":\"playlistId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"songId\":{\"description\":\"ID of the song to add\",\"type\":\"string\"}},\"required\":[\"songId\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"Creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Playlist description\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the playlist\",\"type\":\"string\"},\"isPublic\":{\"description\":\"Whether playlist is public\",\"type\":\"boolean\"},\"isSmart\":{\"description\":\"Whether playlist is a smart playlist\",\"type\":\"boolean\"},\"name\":{\"description\":\"Playlist name\",\"type\":\"string\"},\"owner\":{\"description\":\"User ID of playlist owner\",\"type\":\"string\"},\"songCount\":{\"description\":\"Number of songs in playlist\",\"type\":\"integer\"},\"songs\":{\"items\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"updatedAt\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Song added to playlist successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Playlist or song not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/playlists/{playlistId}/songs","rename":{"param":{"playlistId":"id"}},"segments":[{"lit":"playlists"},{"var":"id"},{"lit":"songs"}],"select":{"$action":"song","exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /playlists","json":"{\"operationId\":\"createPlaylist\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Playlist description\",\"maxLength\":500,\"type\":\"string\"},\"isPublic\":{\"default\":false,\"description\":\"Whether playlist should be public\",\"type\":\"boolean\"},\"isSmart\":{\"default\":false,\"description\":\"Whether to create a smart playlist\",\"type\":\"boolean\"},\"name\":{\"description\":\"Playlist name\",\"maxLength\":100,\"minLength\":1,\"type\":\"string\"},\"smartCriteria\":{\"description\":\"Criteria for smart playlist generation\",\"properties\":{\"artists\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"genres\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"maxDuration\":{\"type\":\"integer\"},\"minDuration\":{\"type\":\"integer\"}},\"type\":\"object\"}},\"required\":[\"name\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"201\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"Creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Playlist description\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the playlist\",\"type\":\"string\"},\"isPublic\":{\"description\":\"Whether playlist is public\",\"type\":\"boolean\"},\"isSmart\":{\"description\":\"Whether playlist is a smart playlist\",\"type\":\"boolean\"},\"name\":{\"description\":\"Playlist name\",\"type\":\"string\"},\"owner\":{\"description\":\"User ID of playlist owner\",\"type\":\"string\"},\"songCount\":{\"description\":\"Number of songs in playlist\",\"type\":\"integer\"},\"songs\":{\"items\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"updatedAt\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Playlist created successfully\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Invalid request\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/playlists","segments":[{"lit":"playlists"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /playlists","json":"{\"operationId\":\"listPlaylists\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"playlists\":{\"items\":{\"properties\":{\"createdAt\":{\"description\":\"Creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Playlist description\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the playlist\",\"type\":\"string\"},\"isPublic\":{\"description\":\"Whether playlist is public\",\"type\":\"boolean\"},\"isSmart\":{\"description\":\"Whether playlist is a smart playlist\",\"type\":\"boolean\"},\"name\":{\"description\":\"Playlist name\",\"type\":\"string\"},\"owner\":{\"description\":\"User ID of playlist owner\",\"type\":\"string\"},\"songCount\":{\"description\":\"Number of songs in playlist\",\"type\":\"integer\"},\"songs\":{\"items\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"updatedAt\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"List of playlists\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/playlists","segments":[{"lit":"playlists"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.playlists`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"playlist_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /playlists/{playlistId}","json":"{\"operationId\":\"getPlaylist\",\"parameters\":[{\"description\":\"Unique identifier of the playlist\",\"in\":\"path\",\"name\":\"playlistId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"Creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Playlist description\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the playlist\",\"type\":\"string\"},\"isPublic\":{\"description\":\"Whether playlist is public\",\"type\":\"boolean\"},\"isSmart\":{\"description\":\"Whether playlist is a smart playlist\",\"type\":\"boolean\"},\"name\":{\"description\":\"Playlist name\",\"type\":\"string\"},\"owner\":{\"description\":\"User ID of playlist owner\",\"type\":\"string\"},\"songCount\":{\"description\":\"Number of songs in playlist\",\"type\":\"integer\"},\"songs\":{\"items\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"updatedAt\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Playlist details retrieved successfully\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Playlist not found\"}},\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/playlists/{playlistId}","rename":{"param":{"playlistId":"id"}},"segments":[{"lit":"playlists"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"},"remove":{"input":"data","name":"remove","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"playlist_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"DELETE /playlists/{playlistId}","json":"{\"operationId\":\"deletePlaylist\",\"parameters\":[{\"description\":\"Unique identifier of the playlist\",\"in\":\"path\",\"name\":\"playlistId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"204\":{\"description\":\"Playlist deleted successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Playlist not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"DELETE","orig":"/playlists/{playlistId}","rename":{"param":{"playlistId":"id"}},"segments":[{"lit":"playlists"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"remove"},"update":{"input":"data","name":"update","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"playlist_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"PUT /playlists/{playlistId}","json":"{\"operationId\":\"updatePlaylist\",\"parameters\":[{\"description\":\"Unique identifier of the playlist\",\"in\":\"path\",\"name\":\"playlistId\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Playlist description\",\"maxLength\":500,\"type\":\"string\"},\"isPublic\":{\"description\":\"Whether playlist should be public\",\"type\":\"boolean\"},\"name\":{\"description\":\"Playlist name\",\"maxLength\":100,\"minLength\":1,\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"createdAt\":{\"description\":\"Creation timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"description\":{\"description\":\"Playlist description\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the playlist\",\"type\":\"string\"},\"isPublic\":{\"description\":\"Whether playlist is public\",\"type\":\"boolean\"},\"isSmart\":{\"description\":\"Whether playlist is a smart playlist\",\"type\":\"boolean\"},\"name\":{\"description\":\"Playlist name\",\"type\":\"string\"},\"owner\":{\"description\":\"User ID of playlist owner\",\"type\":\"string\"},\"songCount\":{\"description\":\"Number of songs in playlist\",\"type\":\"integer\"},\"songs\":{\"items\":{\"properties\":{\"album\":{\"description\":\"Album name\",\"type\":\"string\"},\"artist\":{\"description\":\"Artist name\",\"type\":\"string\"},\"coverArt\":{\"description\":\"URL to cover art image\",\"format\":\"uri\",\"type\":\"string\"},\"duration\":{\"description\":\"Duration in seconds\",\"type\":\"integer\"},\"genres\":{\"description\":\"Music genres\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"hasVideo\":{\"description\":\"Whether video preview is available\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the song\",\"type\":\"string\"},\"releaseDate\":{\"description\":\"Release date\",\"format\":\"date\",\"type\":\"string\"},\"title\":{\"description\":\"Song title\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"updatedAt\":{\"description\":\"Last update timestamp\",\"format\":\"date-time\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Playlist updated successfully\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized\"},\"404\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"details\":{\"description\":\"Additional error details\",\"type\":\"object\"},\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Playlist not found\"}},\"security\":[{\"bearerAuth\":[]}],\"securitySchemes\":{\"bearerAuth\":{\"bearerFormat\":\"JWT\",\"description\":\"JWT authentication token\",\"scheme\":\"bearer\",\"type\":\"http\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"PUT","orig":"/playlists/{playlistId}","rename":{"param":{"playlistId":"id"}},"segments":[{"lit":"playlists"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"update"}},"relations":{"ancestors":[]},"key$":"playlist","name__orig":"playlist","Name":"Playlist","name_":"playlist","name-":"playlist","NAME":"PLAYLIST","index$":3}, {"active":true,"entity":"playlist","key$":"BasicPlaylistFlow","kind":"basic","name":"BasicPlaylistFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"playlist_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"playlist_ref01"}}],"index$":1},{"active":true,"data":{},"input":{"ref":"playlist_ref01","srcdatavar":"playlist_ref01_data","suffix":"_up0","textfield":"createdAt"},"match":{},"op":"update","spec":[{"apply":"TextFieldMark","def":{"mark":"Mark01-playlist_ref01"}}],"valid":[],"index$":2},{"active":true,"data":{},"input":{"ref":"playlist_ref01","srcdatavar":"playlist_ref01_data","suffix":"_dt0"},"match":{"id":"playlist01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-playlist_ref01"}}],"index$":3},{"active":true,"data":{},"input":{"ref":"playlist_ref01","suffix":"_rm0"},"match":{"id":"playlist01"},"op":"remove","spec":[],"valid":[],"index$":4},{"active":true,"data":{},"input":{"suffix":"_rt0"},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemNotExists","def":{"ref":"playlist_ref01"}}],"index$":5}]}, 'Playlist')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const playlist_ref01_ent = client.Playlist()
    let playlist_ref01_data = setup.data.new.playlist['playlist_ref01']

    playlist_ref01_data = (await playlist_ref01_ent.create(playlist_ref01_data)).data()
    assert(null != playlist_ref01_data.id)


    // LIST
    const playlist_ref01_match: any = {}

    const playlist_ref01_list = (await playlist_ref01_ent.list(playlist_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(playlist_ref01_list, { id: playlist_ref01_data.id })))


    // UPDATE
    const playlist_ref01_data_up0: any = {}
    playlist_ref01_data_up0.id = playlist_ref01_data.id

    const playlist_ref01_markdef_up0 = { name: 'createdAt', value: 'Mark01-playlist_ref01_' + setup.now }
    ;(playlist_ref01_data_up0 as any)[playlist_ref01_markdef_up0.name] = playlist_ref01_markdef_up0.value

    const playlist_ref01_resdata_up0 = (await playlist_ref01_ent.update(playlist_ref01_data_up0)).data()
    assert(playlist_ref01_resdata_up0.id === playlist_ref01_data_up0.id)

    assert((playlist_ref01_resdata_up0 as any)[playlist_ref01_markdef_up0.name] === playlist_ref01_markdef_up0.value)


    // LOAD
    const playlist_ref01_match_dt0: any = {}
    playlist_ref01_match_dt0.id = playlist_ref01_data.id
    const playlist_ref01_data_dt0 = (await playlist_ref01_ent.load(playlist_ref01_match_dt0)).data()
    assert(playlist_ref01_data_dt0.id === playlist_ref01_data.id)


    // REMOVE
    const playlist_ref01_match_rm0: any = { id: playlist_ref01_data.id }
    await playlist_ref01_ent.remove(playlist_ref01_match_rm0)
  

    // LIST
    const playlist_ref01_match_rt0: any = {}

    const playlist_ref01_list_rt0 = (await playlist_ref01_ent.list(playlist_ref01_match_rt0)).map((e: any) => e.data())

    assert(isempty(select(playlist_ref01_list_rt0, { id: playlist_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/playlist/PlaylistTestData.json')

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
    ['playlist01','playlist02','playlist03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'LISTENFREE_TEST_PLAYLIST_ENTID': idmap,
    'LISTENFREE_TEST_LIVE': 'FALSE',
    'LISTENFREE_TEST_EXPLAIN': 'FALSE',
    'LISTENFREE_APIKEY': '',
  })

  idmap = env['LISTENFREE_TEST_PLAYLIST_ENTID']

  const live = 'TRUE' === env.LISTENFREE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['LISTENFREE_TEST_PLAYLIST_ENTID']
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
  
