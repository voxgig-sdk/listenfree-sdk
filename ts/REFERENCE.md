# Listenfree TypeScript SDK Reference

Complete API reference for the Listenfree TypeScript SDK.


## ListenfreeSDK

### Constructor

```ts
new ListenfreeSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ListenfreeSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = ListenfreeSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `ListenfreeSDK` instance in test mode.


### Instance Methods

#### `ListeningRoom(data?: object)`

Create a new `ListeningRoom` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ListeningRoomEntity` instance.

#### `Music(data?: object)`

Create a new `Music` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MusicEntity` instance.

#### `OfflineDownload(data?: object)`

Create a new `OfflineDownload` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `OfflineDownloadEntity` instance.

#### `Playlist(data?: object)`

Create a new `Playlist` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlaylistEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `Song(data?: object)`

Create a new `Song` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SongEntity` instance.

#### `Stream(data?: object)`

Create a new `Stream` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `StreamEntity` instance.

#### `Video(data?: object)`

Create a new `Video` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VideoEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `ListenfreeSDK.test()`.

**Returns:** `ListenfreeSDK` instance in test mode.


---

## ListeningRoomEntity

```ts
const listening_room = client.ListeningRoom()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `current_song` | `Record<string, any>` | No |  |
| `description` | `string` | No |  |
| `host` | `string` | No |  |
| `id` | `string` | No |  |
| `is_public` | `boolean` | No |  |
| `max_participant` | `number` | No |  |
| `name` | `string` | No |  |
| `participant` | `any[]` | No |  |
| `queue` | `any[]` | No |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `created_at` | - | - | - |
| `current_song` | - | - | - |
| `description` | - | - | - |
| `host` | - | - | - |
| `id` | - | - | - |
| `is_public` | - | - | - |
| `max_participant` | - | - | - |
| `name` | - | - | Yes |
| `participant` | - | - | - |
| `queue` | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.ListeningRoom().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ListeningRoom().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ListeningRoom().load({ id: 'listening_room_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ListeningRoomEntity` instance with the same client and
options.

#### `client()`

Return the parent `ListenfreeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MusicEntity

```ts
const music = client.Music()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloaded_at` | `string` | No |  |
| `expires_at` | `string` | No |  |
| `id` | `string` | No |  |
| `progress` | `number` | No |  |
| `song` | `Record<string, any>` | No |  |
| `status` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Music().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MusicEntity` instance with the same client and
options.

#### `client()`

Return the parent `ListenfreeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## OfflineDownloadEntity

```ts
const offline_download = client.OfflineDownload()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `song_id` | `string` | Yes |  |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.OfflineDownload().create({
  song_id: /* string */,
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `OfflineDownloadEntity` instance with the same client and
options.

#### `client()`

Return the parent `ListenfreeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlaylistEntity

```ts
const playlist = client.Playlist()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `string` | No |  |
| `is_public` | `boolean` | No |  |
| `is_smart` | `boolean` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | No |  |
| `smart_criterion` | `Record<string, any>` | No |  |
| `song` | `any[]` | No |  |
| `song_count` | `number` | No |  |
| `song_id` | `string` | Yes |  |
| `updated_at` | `string` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `is_public` | - | - | - | - | - |
| `is_smart` | - | - | - | - | - |
| `name` | - | - | Yes | - | - |
| `owner` | - | - | - | - | - |
| `smart_criterion` | - | - | - | - | - |
| `song` | - | - | - | - | - |
| `song_count` | - | - | - | - | - |
| `song_id` | - | - | - | - | - |
| `updated_at` | - | - | - | - | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Playlist().create({
  song_id: /* string */,
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Playlist().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Playlist().load({ id: 'playlist_id' })
```

#### `remove(match: object, ctrl?: object)`

Remove the entity matching the given criteria.

```ts
const result = await client.Playlist().remove({ id: 'playlist_id' })
```

#### `update(data: object, ctrl?: object)`

Update an existing entity. The data must include the entity `id`.

```ts
const result = await client.Playlist().update({
  id: 'playlist_id',
  // Fields to update
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlaylistEntity` instance with the same client and
options.

#### `client()`

Return the parent `ListenfreeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `limit` | `number` | No |  |
| `offset` | `number` | No |  |
| `result` | `Record<string, any>` | No |  |
| `total` | `number` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Search().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `ListenfreeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SongEntity

```ts
const song = client.Song()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `string` | No |  |
| `artist` | `string` | No |  |
| `cover_art` | `string` | No |  |
| `duration` | `number` | No |  |
| `genre` | `any[]` | No |  |
| `has_video` | `boolean` | No |  |
| `id` | `string` | No |  |
| `release_date` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Song().load({ id: 'song_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SongEntity` instance with the same client and
options.

#### `client()`

Return the parent `ListenfreeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## StreamEntity

```ts
const stream = client.Stream()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bitrate` | `number` | No |  |
| `expires_at` | `string` | No |  |
| `quality` | `string` | No |  |
| `stream_url` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Stream().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `StreamEntity` instance with the same client and
options.

#### `client()`

Return the parent `ListenfreeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VideoEntity

```ts
const video = client.Video()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | `number` | No |  |
| `thumbnail_url` | `string` | No |  |
| `video_url` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Video().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VideoEntity` instance with the same client and
options.

#### `client()`

Return the parent `ListenfreeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new ListenfreeSDK({
  feature: {
    test: { active: true },
  }
})
```

