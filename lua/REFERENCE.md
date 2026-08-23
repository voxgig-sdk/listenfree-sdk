# Listenfree Lua SDK Reference

Complete API reference for the Listenfree Lua SDK.


## ListenfreeSDK

### Constructor

```lua
local sdk = require("listenfree_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `ListeningRoom(data)`

Create a new `ListeningRoom` entity instance. Pass `nil` for no initial data.

#### `Music(data)`

Create a new `Music` entity instance. Pass `nil` for no initial data.

#### `OfflineDownload(data)`

Create a new `OfflineDownload` entity instance. Pass `nil` for no initial data.

#### `Playlist(data)`

Create a new `Playlist` entity instance. Pass `nil` for no initial data.

#### `Search(data)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `Song(data)`

Create a new `Song` entity instance. Pass `nil` for no initial data.

#### `Stream(data)`

Create a new `Stream` entity instance. Pass `nil` for no initial data.

#### `Video(data)`

Create a new `Video` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## ListeningRoomEntity

```lua
local listening_room = client:ListeningRoom(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `currentSong` | `table` | No |  |
| `description` | `string` | No | Room description |
| `host` | `string` | No | User ID of room host |
| `id` | `string` | No | Unique identifier for the listening room |
| `isPublic` | `boolean` | No | Whether room is public |
| `maxParticipants` | `number` | No | Maximum number of participants |
| `name` | `string` | No | Room name |
| `participants` | `table` | No |  |
| `queue` | `table` | No |  |

### Field Usage by Operation

| Field | load | list | create |
| --- | --- | --- | --- |
| `createdAt` | - | - | - |
| `currentSong` | - | - | - |
| `description` | - | - | - |
| `host` | - | - | - |
| `id` | - | - | - |
| `isPublic` | - | - | - |
| `maxParticipants` | - | - | - |
| `name` | - | - | Yes |
| `participants` | - | - | - |
| `queue` | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:ListeningRoom():create({
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ListeningRoom():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ListeningRoom():load({ id = "listening_room_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListeningRoomEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MusicEntity

```lua
local music = client:Music(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloadedAt` | `string` | No | Download completion timestamp |
| `expiresAt` | `string` | No | Offline availability expiration |
| `id` | `string` | No | Download ID |
| `progress` | `number` | No | Download progress percentage |
| `song` | `table` | No |  |
| `status` | `string` | No | Download status |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Music():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MusicEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## OfflineDownloadEntity

```lua
local offline_download = client:OfflineDownload(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `songId` | `string` | Yes | ID of the song to download |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:OfflineDownload():create({
  songId = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OfflineDownloadEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PlaylistEntity

```lua
local playlist = client:Playlist(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | Creation timestamp |
| `description` | `string` | No | Playlist description |
| `id` | `string` | No | Unique identifier for the playlist |
| `isPublic` | `boolean` | No | Whether playlist is public |
| `isSmart` | `boolean` | No | Whether playlist is a smart playlist |
| `name` | `string` | No | Playlist name |
| `owner` | `string` | No | User ID of playlist owner |
| `smartCriteria` | `table` | No | Criteria for smart playlist generation |
| `songCount` | `number` | No | Number of songs in playlist |
| `songId` | `string` | Yes | ID of the song to add |
| `songs` | `table` | No |  |
| `updatedAt` | `string` | No | Last update timestamp |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `createdAt` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `isPublic` | - | - | - | - | - |
| `isSmart` | - | - | - | - | - |
| `name` | - | - | Yes | - | - |
| `owner` | - | - | - | - | - |
| `smartCriteria` | - | - | - | - | - |
| `songCount` | - | - | - | - | - |
| `songId` | - | - | - | - | - |
| `songs` | - | - | - | - | - |
| `updatedAt` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Playlist():create({
  songId = --[[ string ]],
})
```

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Playlist():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Playlist():load({ id = "playlist_id" })
```

#### `remove(reqmatch, ctrl) -> any, err`

Remove the entity matching the given criteria.

```lua
local result, err = client:Playlist():remove({ id = "playlist_id" })
```

#### `update(reqdata, ctrl) -> any, err`

Update an existing entity. The data must include the entity `id`.

```lua
local result, err = client:Playlist():update({
  id = "playlist_id",
  -- Fields to update
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlaylistEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SearchEntity

```lua
local search = client:Search(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `table` | No |  |
| `artists` | `table` | No |  |
| `playlists` | `table` | No |  |
| `songs` | `table` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Search():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SongEntity

```lua
local song = client:Song(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `string` | No | Album name |
| `artist` | `string` | No | Artist name |
| `coverArt` | `string` | No | URL to cover art image |
| `duration` | `number` | No | Duration in seconds |
| `genres` | `table` | No | Music genres |
| `hasVideo` | `boolean` | No | Whether video preview is available |
| `id` | `string` | No | Unique identifier for the song |
| `releaseDate` | `string` | No | Release date |
| `title` | `string` | No | Song title |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Song():load({ id = "song_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SongEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## StreamEntity

```lua
local stream = client:Stream(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bitrate` | `number` | No | Audio bitrate in kbps |
| `expiresAt` | `string` | No | Expiration time of the stream URL |
| `quality` | `string` | No | Audio quality |
| `streamUrl` | `string` | No | URL for streaming the song |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Stream():load({ song_id = "song_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StreamEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VideoEntity

```lua
local video = client:Video(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | `number` | No | Video duration in seconds |
| `thumbnailUrl` | `string` | No | Video thumbnail URL |
| `videoUrl` | `string` | No | URL for video preview |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Video():load({ song_id = "song_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VideoEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

