# Listenfree Lua SDK



The Lua SDK for the Listenfree API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:ListeningRoom()` — each with the same small set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/listenfree-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("listenfree_sdk")

local client = sdk.new({
  apikey = os.getenv("LISTENFREE_APIKEY"),
})
```

### 2. List listeningroom records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local listeningrooms, err = client:ListeningRoom():list()
if err then error(err) end

for _, item in ipairs(listeningrooms) do
  print(item["id"], item["createdAt"])
end
```

### 3. Load a stream

Stream is nested under song, so provide the `song_id`.

```lua
local stream, err = client:Stream():load({ song_id = "example_song_id" })
if err then error(err) end
print(stream)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:ListeningRoom():create({ createdAt = "example_createdAt", currentSong = {} })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local musics, err = client:Music():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Music():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
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
cd lua && busted test/
```


## Reference

### ListenfreeSDK

```lua
local sdk = require("listenfree_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ListenfreeSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `ListeningRoom` | `(data) -> ListeningRoomEntity` | Create a ListeningRoom entity instance. |
| `Music` | `(data) -> MusicEntity` | Create a Music entity instance. |
| `OfflineDownload` | `(data) -> OfflineDownloadEntity` | Create an OfflineDownload entity instance. |
| `Playlist` | `(data) -> PlaylistEntity` | Create a Playlist entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |
| `Song` | `(data) -> SongEntity` | Create a Song entity instance. |
| `Stream` | `(data) -> StreamEntity` | Create a Stream entity instance. |
| `Video` | `(data) -> VideoEntity` | Create a Video entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local listening_room, err = client:ListeningRoom():load({ id = "example_id" })
    if err then error(err) end
    -- listening_room is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### ListeningRoom

| Field | Description |
| --- | --- |
| `createdAt` |  |
| `currentSong` |  |
| `description` | Room description |
| `host` | User ID of room host |
| `id` | Unique identifier for the listening room |
| `isPublic` | Whether room is public |
| `maxParticipants` | Maximum number of participants |
| `name` | Room name |
| `participants` |  |
| `queue` |  |

Operations: Create, List, Load.

API path: `/listening-rooms/{roomId}/join`

#### Music

| Field | Description |
| --- | --- |
| `downloadedAt` | Download completion timestamp |
| `expiresAt` | Offline availability expiration |
| `id` | Download ID |
| `progress` | Download progress percentage |
| `song` |  |
| `status` | Download status |

Operations: List.

API path: `/offline/downloads`

#### OfflineDownload

| Field | Description |
| --- | --- |
| `songId` | ID of the song to download |

Operations: Create.

API path: `/offline/downloads`

#### Playlist

| Field | Description |
| --- | --- |
| `createdAt` | Creation timestamp |
| `description` | Playlist description |
| `id` | Unique identifier for the playlist |
| `isPublic` | Whether playlist is public |
| `isSmart` | Whether playlist is a smart playlist |
| `name` | Playlist name |
| `owner` | User ID of playlist owner |
| `smartCriteria` | Criteria for smart playlist generation |
| `songCount` | Number of songs in playlist |
| `songId` | ID of the song to add |
| `songs` |  |
| `updatedAt` | Last update timestamp |

Operations: Create, List, Load, Remove, Update.

API path: `/playlists/{playlistId}/songs`

#### Search

| Field | Description |
| --- | --- |
| `albums` |  |
| `artists` |  |
| `playlists` |  |
| `songs` |  |

Operations: Load.

API path: `/search`

#### Song

| Field | Description |
| --- | --- |
| `album` | Album name |
| `artist` | Artist name |
| `coverArt` | URL to cover art image |
| `duration` | Duration in seconds |
| `genres` | Music genres |
| `hasVideo` | Whether video preview is available |
| `id` | Unique identifier for the song |
| `releaseDate` | Release date |
| `title` | Song title |

Operations: Load.

API path: `/songs/{songId}`

#### Stream

| Field | Description |
| --- | --- |
| `bitrate` | Audio bitrate in kbps |
| `expiresAt` | Expiration time of the stream URL |
| `quality` | Audio quality |
| `streamUrl` | URL for streaming the song |

Operations: Load.

API path: `/songs/{songId}/stream`

#### Video

| Field | Description |
| --- | --- |
| `duration` | Video duration in seconds |
| `thumbnailUrl` | Video thumbnail URL |
| `videoUrl` | URL for video preview |

Operations: Load.

API path: `/songs/{songId}/video`



## Entities


### ListeningRoom

Create an instance: `local listening_room = client:ListeningRoom(nil)`

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
| `currentSong` | `table` |  |
| `description` | `string` | Room description |
| `host` | `string` | User ID of room host |
| `id` | `string` | Unique identifier for the listening room |
| `isPublic` | `boolean` | Whether room is public |
| `maxParticipants` | `number` | Maximum number of participants |
| `name` | `string` | Room name |
| `participants` | `table` |  |
| `queue` | `table` |  |

#### Example: Load

```lua
local listening_room, err = client:ListeningRoom():load({ id = "listening_room_id" })
```

#### Example: List

```lua
local listening_rooms, err = client:ListeningRoom():list()
```

#### Example: Create

```lua
local listening_room, err = client:ListeningRoom():create({
})
```


### Music

Create an instance: `local music = client:Music(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `downloadedAt` | `string` | Download completion timestamp |
| `expiresAt` | `string` | Offline availability expiration |
| `id` | `string` | Download ID |
| `progress` | `number` | Download progress percentage |
| `song` | `table` |  |
| `status` | `string` | Download status |

#### Example: List

```lua
local musics, err = client:Music():list()
```


### OfflineDownload

Create an instance: `local offline_download = client:OfflineDownload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `songId` | `string` | ID of the song to download |

#### Example: Create

```lua
local offline_download, err = client:OfflineDownload():create({
  songId = "example_songId", -- string
})
```


### Playlist

Create an instance: `local playlist = client:Playlist(nil)`

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
| `createdAt` | `string` | Creation timestamp |
| `description` | `string` | Playlist description |
| `id` | `string` | Unique identifier for the playlist |
| `isPublic` | `boolean` | Whether playlist is public |
| `isSmart` | `boolean` | Whether playlist is a smart playlist |
| `name` | `string` | Playlist name |
| `owner` | `string` | User ID of playlist owner |
| `smartCriteria` | `table` | Criteria for smart playlist generation |
| `songCount` | `number` | Number of songs in playlist |
| `songId` | `string` | ID of the song to add |
| `songs` | `table` |  |
| `updatedAt` | `string` | Last update timestamp |

#### Example: Load

```lua
local playlist, err = client:Playlist():load({ id = "playlist_id" })
```

#### Example: List

```lua
local playlists, err = client:Playlist():list()
```

#### Example: Create

```lua
local playlist, err = client:Playlist():create({
  songId = "example_songId", -- string
})
```


### Search

Create an instance: `local search = client:Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `table` |  |
| `artists` | `table` |  |
| `playlists` | `table` |  |
| `songs` | `table` |  |

#### Example: Load

```lua
local search, err = client:Search():load()
```


### Song

Create an instance: `local song = client:Song(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `string` | Album name |
| `artist` | `string` | Artist name |
| `coverArt` | `string` | URL to cover art image |
| `duration` | `number` | Duration in seconds |
| `genres` | `table` | Music genres |
| `hasVideo` | `boolean` | Whether video preview is available |
| `id` | `string` | Unique identifier for the song |
| `releaseDate` | `string` | Release date |
| `title` | `string` | Song title |

#### Example: Load

```lua
local song, err = client:Song():load({ id = "song_id" })
```


### Stream

Create an instance: `local stream = client:Stream(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bitrate` | `number` | Audio bitrate in kbps |
| `expiresAt` | `string` | Expiration time of the stream URL |
| `quality` | `string` | Audio quality |
| `streamUrl` | `string` | URL for streaming the song |

#### Example: Load

```lua
local stream, err = client:Stream():load({ song_id = "song_id" })
```


### Video

Create an instance: `local video = client:Video(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `number` | Video duration in seconds |
| `thumbnailUrl` | `string` | Video thumbnail URL |
| `videoUrl` | `string` | URL for video preview |

#### Example: Load

```lua
local video, err = client:Video():load({ song_id = "song_id" })
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── listenfree_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`listenfree_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local music = client:Music()
music:list()

-- music:data_get() now returns the music data from the last list
-- music:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
