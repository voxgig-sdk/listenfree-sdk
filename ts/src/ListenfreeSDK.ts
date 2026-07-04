// Listenfree Ts SDK

import { ListeningRoomEntity } from './entity/ListeningRoomEntity'
import { MusicEntity } from './entity/MusicEntity'
import { OfflineDownloadEntity } from './entity/OfflineDownloadEntity'
import { PlaylistEntity } from './entity/PlaylistEntity'
import { SearchEntity } from './entity/SearchEntity'
import { SongEntity } from './entity/SongEntity'
import { StreamEntity } from './entity/StreamEntity'
import { VideoEntity } from './entity/VideoEntity'

export type * from './ListenfreeTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { ListenfreeEntityBase } from './ListenfreeEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class ListenfreeSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _listening_room?: ListeningRoomEntity

  // Idiomatic facade: `client.listening_room.list()` / `client.listening_room.load({ id })`.
  get listening_room(): ListeningRoomEntity {
    return (this._listening_room ??= new ListeningRoomEntity(this, undefined))
  }

  /** @deprecated Use `client.listening_room` instead. */
  ListeningRoom(data?: any) {
    const self = this
    return new ListeningRoomEntity(self,data)
  }


  _music?: MusicEntity

  // Idiomatic facade: `client.music.list()` / `client.music.load({ id })`.
  get music(): MusicEntity {
    return (this._music ??= new MusicEntity(this, undefined))
  }

  /** @deprecated Use `client.music` instead. */
  Music(data?: any) {
    const self = this
    return new MusicEntity(self,data)
  }


  _offline_download?: OfflineDownloadEntity

  // Idiomatic facade: `client.offline_download.list()` / `client.offline_download.load({ id })`.
  get offline_download(): OfflineDownloadEntity {
    return (this._offline_download ??= new OfflineDownloadEntity(this, undefined))
  }

  /** @deprecated Use `client.offline_download` instead. */
  OfflineDownload(data?: any) {
    const self = this
    return new OfflineDownloadEntity(self,data)
  }


  _playlist?: PlaylistEntity

  // Idiomatic facade: `client.playlist.list()` / `client.playlist.load({ id })`.
  get playlist(): PlaylistEntity {
    return (this._playlist ??= new PlaylistEntity(this, undefined))
  }

  /** @deprecated Use `client.playlist` instead. */
  Playlist(data?: any) {
    const self = this
    return new PlaylistEntity(self,data)
  }


  _search?: SearchEntity

  // Idiomatic facade: `client.search.list()` / `client.search.load({ id })`.
  get search(): SearchEntity {
    return (this._search ??= new SearchEntity(this, undefined))
  }

  /** @deprecated Use `client.search` instead. */
  Search(data?: any) {
    const self = this
    return new SearchEntity(self,data)
  }


  _song?: SongEntity

  // Idiomatic facade: `client.song.list()` / `client.song.load({ id })`.
  get song(): SongEntity {
    return (this._song ??= new SongEntity(this, undefined))
  }

  /** @deprecated Use `client.song` instead. */
  Song(data?: any) {
    const self = this
    return new SongEntity(self,data)
  }


  _stream?: StreamEntity

  // Idiomatic facade: `client.stream.list()` / `client.stream.load({ id })`.
  get stream(): StreamEntity {
    return (this._stream ??= new StreamEntity(this, undefined))
  }

  /** @deprecated Use `client.stream` instead. */
  Stream(data?: any) {
    const self = this
    return new StreamEntity(self,data)
  }


  _video?: VideoEntity

  // Idiomatic facade: `client.video.list()` / `client.video.load({ id })`.
  get video(): VideoEntity {
    return (this._video ??= new VideoEntity(this, undefined))
  }

  /** @deprecated Use `client.video` instead. */
  Video(data?: any) {
    const self = this
    return new VideoEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new ListenfreeSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return ListenfreeSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'Listenfree' }
  }

  toString() {
    return 'Listenfree ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = ListenfreeSDK


export {
  stdutil,

  BaseFeature,
  ListenfreeEntityBase,

  ListenfreeSDK,
  SDK,
}


