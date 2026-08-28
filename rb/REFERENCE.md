# Listenfree Ruby SDK Reference

Complete API reference for the Listenfree Ruby SDK.


## ListenfreeSDK

### Constructor

```ruby
require_relative 'Listenfree_sdk'

client = ListenfreeSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ListenfreeSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = ListenfreeSDK.test
```


### Instance Methods

#### `ListeningRoom(data = nil)`

Create a new `ListeningRoom` entity instance. Pass `nil` for no initial data.

#### `Music(data = nil)`

Create a new `Music` entity instance. Pass `nil` for no initial data.

#### `OfflineDownload(data = nil)`

Create a new `OfflineDownload` entity instance. Pass `nil` for no initial data.

#### `Playlist(data = nil)`

Create a new `Playlist` entity instance. Pass `nil` for no initial data.

#### `Search(data = nil)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `Song(data = nil)`

Create a new `Song` entity instance. Pass `nil` for no initial data.

#### `Stream(data = nil)`

Create a new `Stream` entity instance. Pass `nil` for no initial data.

#### `Video(data = nil)`

Create a new `Video` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ListeningRoomEntity

```ruby
listening_room = client.ListeningRoom
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | No |  |
| `currentSong` | `Hash` | No |  |
| `description` | `String` | No | Room description |
| `host` | `String` | No | User ID of room host |
| `id` | `String` | No | Unique identifier for the listening room |
| `isPublic` | `Boolean` | No | Whether room is public |
| `maxParticipants` | `Integer` | No | Maximum number of participants |
| `name` | `String` | No | Room name |
| `participants` | `Array` | No |  |
| `queue` | `Array` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.ListeningRoom.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ListeningRoom.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ListeningRoom.load({ "id" => "listening_room_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ListeningRoomEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MusicEntity

```ruby
music = client.Music
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloadedAt` | `String` | No | Download completion timestamp |
| `expiresAt` | `String` | No | Offline availability expiration |
| `id` | `String` | No | Download ID |
| `progress` | `Integer` | No | Download progress percentage |
| `song` | `Hash` | No |  |
| `status` | `String` | No | Download status |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Music.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MusicEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## OfflineDownloadEntity

```ruby
offline_download = client.OfflineDownload
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `songId` | `String` | Yes | ID of the song to download |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.OfflineDownload.create({
  "songId" => "example_songId", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `OfflineDownloadEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PlaylistEntity

```ruby
playlist = client.Playlist
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `String` | No | Creation timestamp |
| `description` | `String` | No | Playlist description |
| `id` | `String` | No | Unique identifier for the playlist |
| `isPublic` | `Boolean` | No | Whether playlist is public |
| `isSmart` | `Boolean` | No | Whether playlist is a smart playlist |
| `name` | `String` | No | Playlist name |
| `owner` | `String` | No | User ID of playlist owner |
| `smartCriteria` | `Hash` | No | Criteria for smart playlist generation |
| `songCount` | `Integer` | No | Number of songs in playlist |
| `songId` | `String` | Yes | ID of the song to add |
| `songs` | `Array` | No |  |
| `updatedAt` | `String` | No | Last update timestamp |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Playlist.create({
  "songId" => "example_songId", # String
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Playlist.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Playlist.load({ "id" => "playlist_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.Playlist.remove({ "id" => "playlist_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.Playlist.update({
  "id" => "playlist_id",
  # Fields to update
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PlaylistEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchEntity

```ruby
search = client.Search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `Array` | No |  |
| `artists` | `Array` | No |  |
| `playlists` | `Array` | No |  |
| `songs` | `Array` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Search.load({ "q" => "q" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SongEntity

```ruby
song = client.Song
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `String` | No | Album name |
| `artist` | `String` | No | Artist name |
| `coverArt` | `String` | No | URL to cover art image |
| `duration` | `Integer` | No | Duration in seconds |
| `genres` | `Array` | No | Music genres |
| `hasVideo` | `Boolean` | No | Whether video preview is available |
| `id` | `String` | No | Unique identifier for the song |
| `releaseDate` | `String` | No | Release date |
| `title` | `String` | No | Song title |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Song.load({ "id" => "song_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SongEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## StreamEntity

```ruby
stream = client.Stream
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bitrate` | `Integer` | No | Audio bitrate in kbps |
| `expiresAt` | `String` | No | Expiration time of the stream URL |
| `quality` | `String` | No | Audio quality |
| `streamUrl` | `String` | No | URL for streaming the song |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Stream.load({ "song_id" => "song_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `StreamEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VideoEntity

```ruby
video = client.Video
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | `Integer` | No | Video duration in seconds |
| `thumbnailUrl` | `String` | No | Video thumbnail URL |
| `videoUrl` | `String` | No | URL for video preview |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Video.load({ "song_id" => "song_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VideoEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = ListenfreeSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

