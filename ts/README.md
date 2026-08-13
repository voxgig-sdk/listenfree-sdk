# Listenfree TypeScript SDK



The TypeScript SDK for the Listenfree API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.ListeningRoom()` — each with a small set of operations (`list`, `load`, `create`, `update`, `remove`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/listenfree-sdk/releases](https://github.com/voxgig-sdk/listenfree-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { ListenfreeSDK } from '@voxgig-sdk/listenfree'

const client = new ListenfreeSDK({
  apikey: process.env.LISTENFREE_APIKEY,
})
```

### 2. List listeningroom records

`list()` resolves to an array of ListeningRoom ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const listeningrooms = await client.ListeningRoom().list()

for (const listeningroom of listeningrooms) {
  console.log(listeningroom)
}
```

### 3. Load a stream

Stream is nested under song, so provide the `song_id`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const stream = await client.Stream().load({
    song_id: 'example_song_id',
  })
  console.log(stream)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created ListeningRoom ENTITY (.data() for the record)
const created = await client.ListeningRoom().create({
  createdAt: 'example_createdAt',
  currentSong: {},
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const musics = await client.Music().list()
  console.log(musics)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = ListenfreeSDK.test()

const music = await client.Music().list()
// music is the entity, populated with mock response data
// — call music.data() for the record itself
console.log(music)
```

You can also use the instance method:

```ts
const client = new ListenfreeSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Music()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new ListenfreeSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
LISTENFREE_TEST_LIVE=TRUE
LISTENFREE_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### ListenfreeSDK

#### Constructor

```ts
new ListenfreeSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `ListeningRoom(data?)` | `ListeningRoomEntity` | Create a ListeningRoom entity instance. |
| `Music(data?)` | `MusicEntity` | Create a Music entity instance. |
| `OfflineDownload(data?)` | `OfflineDownloadEntity` | Create an OfflineDownload entity instance. |
| `Playlist(data?)` | `PlaylistEntity` | Create a Playlist entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `Song(data?)` | `SongEntity` | Create a Song entity instance. |
| `Stream(data?)` | `StreamEntity` | Create a Stream entity instance. |
| `Video(data?)` | `VideoEntity` | Create a Video entity instance. |
| `tester(testopts?, sdkopts?)` | `ListenfreeSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `ListenfreeSDK.test(testopts?, sdkopts?)` | `ListenfreeSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Entity>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<void>` | Remove an entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): ListenfreeSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load`, `create` and `update` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).
- `remove` resolves to `void`.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### ListeningRoom

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `currentSong` |  |
| `description` |  |
| `host` |  |
| `id` |  |
| `isPublic` |  |
| `maxParticipants` |  |
| `name` |  |
| `participants` |  |
| `queue` |  |

Operations: create, list, load.

API path: `/listening-rooms/{roomId}/join`

#### Music

| Field | Description |
| --- | --- |
| `downloadedAt` |  |
| `expiresAt` |  |
| `id` |  |
| `progress` |  |
| `song` |  |
| `status` |  |

Operations: list.

API path: `/offline/downloads`

#### OfflineDownload

| Field | Description |
| --- | --- |
| `songId` |  |

Operations: create.

API path: `/offline/downloads`

#### Playlist

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `description` |  |
| `id` |  |
| `isPublic` |  |
| `isSmart` |  |
| `name` |  |
| `owner` |  |
| `smartCriteria` |  |
| `songCount` |  |
| `songId` |  |
| `songs` |  |
| `updatedAt` |  |

Operations: create, list, load, remove, update.

API path: `/playlists/{playlistId}/songs`

#### Search

| Field | Description |
| --- | --- |
| `albums` |  |
| `artists` |  |
| `playlists` |  |
| `songs` |  |

Operations: load.

API path: `/search`

#### Song

| Field | Description |
| --- | --- |
| `album` |  |
| `artist` |  |
| `coverArt` |  |
| `duration` |  |
| `genres` |  |
| `hasVideo` |  |
| `id` |  |
| `releaseDate` |  |
| `title` |  |

Operations: load.

API path: `/songs/{songId}`

#### Stream

| Field | Description |
| --- | --- |
| `bitrate` |  |
| `expiresAt` |  |
| `quality` |  |
| `streamUrl` |  |

Operations: load.

API path: `/songs/{songId}/stream`

#### Video

| Field | Description |
| --- | --- |
| `duration` |  |
| `thumbnailUrl` |  |
| `videoUrl` |  |

Operations: load.

API path: `/songs/{songId}/video`



## Entities


### ListeningRoom

Create an instance: `const listening_room = client.ListeningRoom()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `currentSong` | `Record<string, any>` |  |
| `description` | `string` |  |
| `host` | `string` |  |
| `id` | `string` |  |
| `isPublic` | `boolean` |  |
| `maxParticipants` | `number` |  |
| `name` | `string` |  |
| `participants` | `any[]` |  |
| `queue` | `any[]` |  |

#### Example: Load

```ts
const listening_room = await client.ListeningRoom().load({ id: 'listening_room_id' })
```

#### Example: List

```ts
const listening_rooms = await client.ListeningRoom().list()
```

#### Example: Create

```ts
const listening_room = await client.ListeningRoom().create({
})
```


### Music

Create an instance: `const music = client.Music()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `downloadedAt` | `string` |  |
| `expiresAt` | `string` |  |
| `id` | `string` |  |
| `progress` | `number` |  |
| `song` | `Record<string, any>` |  |
| `status` | `string` |  |

#### Example: List

```ts
const musics = await client.Music().list()
```


### OfflineDownload

Create an instance: `const offline_download = client.OfflineDownload()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `songId` | `string` |  |

#### Example: Create

```ts
const offline_download = await client.OfflineDownload().create({
  songId: 'example_songId',
})
```


### Playlist

Create an instance: `const playlist = client.Playlist()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `isPublic` | `boolean` |  |
| `isSmart` | `boolean` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `smartCriteria` | `Record<string, any>` |  |
| `songCount` | `number` |  |
| `songId` | `string` |  |
| `songs` | `any[]` |  |
| `updatedAt` | `string` |  |

#### Example: Load

```ts
const playlist = await client.Playlist().load({ id: 'playlist_id' })
```

#### Example: List

```ts
const playlists = await client.Playlist().list()
```

#### Example: Create

```ts
const playlist = await client.Playlist().create({
  songId: 'example_songId',
})
```


### Search

Create an instance: `const search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `any[]` |  |
| `artists` | `any[]` |  |
| `playlists` | `any[]` |  |
| `songs` | `any[]` |  |

#### Example: Load

```ts
const search = await client.Search().load()
```


### Song

Create an instance: `const song = client.Song()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `string` |  |
| `artist` | `string` |  |
| `coverArt` | `string` |  |
| `duration` | `number` |  |
| `genres` | `any[]` |  |
| `hasVideo` | `boolean` |  |
| `id` | `string` |  |
| `releaseDate` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```ts
const song = await client.Song().load({ id: 'song_id' })
```


### Stream

Create an instance: `const stream = client.Stream()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bitrate` | `number` |  |
| `expiresAt` | `string` |  |
| `quality` | `string` |  |
| `streamUrl` | `string` |  |

#### Example: Load

```ts
const stream = await client.Stream().load({ song_id: 'song_id' })
```


### Video

Create an instance: `const video = client.Video()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `number` |  |
| `thumbnailUrl` | `string` |  |
| `videoUrl` | `string` |  |

#### Example: Load

```ts
const video = await client.Video().load({ song_id: 'song_id' })
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
listenfree/
├── src/
│   ├── ListenfreeSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { ListenfreeSDK } from '@voxgig-sdk/listenfree'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const music = client.Music()
await music.list()

// music.data() now returns the music data from the last `list`
// music.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
