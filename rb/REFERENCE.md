# Listenfree Ruby SDK Reference

Complete API reference for the Listenfree Ruby SDK.


## ListenfreeSDK

### Constructor

```ruby
require_relative 'listenfree_sdk'

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
listening_room = client.listening_room
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `current_song` | ``$OBJECT`` | No |  |
| `description` | ``$STRING`` | No |  |
| `host` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `is_public` | ``$BOOLEAN`` | No |  |
| `max_participant` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `participant` | ``$ARRAY`` | No |  |
| `queue` | ``$ARRAY`` | No |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `created_at` | - | - | - | - | - |
| `current_song` | - | - | - | - | - |
| `description` | - | - | - | - | - |
| `host` | - | - | - | - | - |
| `id` | - | - | - | - | - |
| `is_public` | - | - | - | - | - |
| `max_participant` | - | - | - | - | - |
| `name` | - | - | Yes | - | - |
| `participant` | - | - | - | - | - |
| `queue` | - | - | - | - | - |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.listening_room.create({
})
```

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.listening_room.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.listening_room.load({ "id" => "listening_room_id" })
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
music = client.music
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloaded_at` | ``$STRING`` | No |  |
| `expires_at` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `progress` | ``$INTEGER`` | No |  |
| `song` | ``$OBJECT`` | No |  |
| `status` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.music.list(nil)
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
offline_download = client.offline_download
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `song_id` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.offline_download.create({
  "song_id" => # `$STRING`,
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
playlist = client.playlist
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `created_at` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `is_public` | ``$BOOLEAN`` | No |  |
| `is_smart` | ``$BOOLEAN`` | No |  |
| `name` | ``$STRING`` | No |  |
| `owner` | ``$STRING`` | No |  |
| `smart_criterion` | ``$OBJECT`` | No |  |
| `song` | ``$ARRAY`` | No |  |
| `song_count` | ``$INTEGER`` | No |  |
| `song_id` | ``$STRING`` | Yes |  |
| `updated_at` | ``$STRING`` | No |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.playlist.create({
  "song_id" => # `$STRING`,
})
```

#### `list(reqmatch, ctrl = nil) -> Array`

List entities matching the given criteria. Returns an array. Raises on error.

```ruby
results = client.playlist.list(nil)
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.playlist.load({ "id" => "playlist_id" })
```

#### `remove(reqmatch, ctrl = nil) -> result`

Remove the entity matching the given criteria. Raises on error.

```ruby
result = client.playlist.remove({ "id" => "playlist_id" })
```

#### `update(reqdata, ctrl = nil) -> result`

Update an existing entity. The data must include the entity `id`. Raises on error.

```ruby
result = client.playlist.update({
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
search = client.search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `limit` | ``$INTEGER`` | No |  |
| `offset` | ``$INTEGER`` | No |  |
| `result` | ``$OBJECT`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.search.load({ "id" => "search_id" })
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
song = client.song
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | ``$STRING`` | No |  |
| `artist` | ``$STRING`` | No |  |
| `cover_art` | ``$STRING`` | No |  |
| `duration` | ``$INTEGER`` | No |  |
| `genre` | ``$ARRAY`` | No |  |
| `has_video` | ``$BOOLEAN`` | No |  |
| `id` | ``$STRING`` | No |  |
| `release_date` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.song.load({ "id" => "song_id" })
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
stream = client.stream
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bitrate` | ``$INTEGER`` | No |  |
| `expires_at` | ``$STRING`` | No |  |
| `quality` | ``$STRING`` | No |  |
| `stream_url` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.stream.load({ "id" => "stream_id" })
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
video = client.video
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | ``$INTEGER`` | No |  |
| `thumbnail_url` | ``$STRING`` | No |  |
| `video_url` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.video.load({ "id" => "video_id" })
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

