# Listenfree Ruby SDK



The Ruby SDK for the Listenfree API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.ListeningRoom` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/listenfree-sdk/releases](https://github.com/voxgig-sdk/listenfree-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Listenfree_sdk"

client = ListenfreeSDK.new({
  "apikey" => ENV["LISTENFREE_APIKEY"],
})
```

### 2. List listeningroom records

```ruby
begin
  # list returns an Array of ListeningRoom records — iterate directly.
  listeningrooms = client.ListeningRoom.list
  listeningrooms.each do |item|
    puts "#{item["id"]} #{item["createdAt"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a stream

Stream is nested under song, so provide the `song_id`.

```ruby
begin
  # load returns the ENTITY — call data_get for the Stream record (raises on error).
  stream = client.Stream.load({ "song_id" => "example_song_id" })
  puts stream
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created ListeningRoom record.
created = client.ListeningRoom.create({ "createdAt" => "example_createdAt", "currentSong" => {} })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  musics = client.Music.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = ListenfreeSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
music = client.Music.list()
puts music
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = ListenfreeSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### ListenfreeSDK

```ruby
require_relative "Listenfree_sdk"
client = ListenfreeSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = ListenfreeSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ListenfreeSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `ListenfreeError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `listening_room = client.ListeningRoom`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `String` |  |
| `currentSong` | `Hash` |  |
| `description` | `String` | Room description |
| `host` | `String` | User ID of room host |
| `id` | `String` | Unique identifier for the listening room |
| `isPublic` | `Boolean` | Whether room is public |
| `maxParticipants` | `Integer` | Maximum number of participants |
| `name` | `String` | Room name |
| `participants` | `Array` |  |
| `queue` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ListeningRoom record (raises on error).
listening_room = client.ListeningRoom.load({ "id" => "listening_room_id" })
```

#### Example: List

```ruby
# list returns an Array of ListeningRoom records (raises on error).
listening_rooms = client.ListeningRoom.list
```

#### Example: Create

```ruby
listening_room = client.ListeningRoom.create({
})
```


### Music

Create an instance: `music = client.Music`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `downloadedAt` | `String` | Download completion timestamp |
| `expiresAt` | `String` | Offline availability expiration |
| `id` | `String` | Download ID |
| `progress` | `Integer` | Download progress percentage |
| `song` | `Hash` |  |
| `status` | `String` | Download status |

#### Example: List

```ruby
# list returns an Array of Music records (raises on error).
musics = client.Music.list
```


### OfflineDownload

Create an instance: `offline_download = client.OfflineDownload`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `songId` | `String` | ID of the song to download |

#### Example: Create

```ruby
offline_download = client.OfflineDownload.create({
  "songId" => "example_songId", # String
})
```


### Playlist

Create an instance: `playlist = client.Playlist`

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
| `createdAt` | `String` | Creation timestamp |
| `description` | `String` | Playlist description |
| `id` | `String` | Unique identifier for the playlist |
| `isPublic` | `Boolean` | Whether playlist is public |
| `isSmart` | `Boolean` | Whether playlist is a smart playlist |
| `name` | `String` | Playlist name |
| `owner` | `String` | User ID of playlist owner |
| `smartCriteria` | `Hash` | Criteria for smart playlist generation |
| `songCount` | `Integer` | Number of songs in playlist |
| `songId` | `String` | ID of the song to add |
| `songs` | `Array` |  |
| `updatedAt` | `String` | Last update timestamp |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Playlist record (raises on error).
playlist = client.Playlist.load({ "id" => "playlist_id" })
```

#### Example: List

```ruby
# list returns an Array of Playlist records (raises on error).
playlists = client.Playlist.list
```

#### Example: Create

```ruby
playlist = client.Playlist.create({
  "songId" => "example_songId", # String
})
```


### Search

Create an instance: `search = client.Search`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `Array` |  |
| `artists` | `Array` |  |
| `playlists` | `Array` |  |
| `songs` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Search record (raises on error).
search = client.Search.load()
```


### Song

Create an instance: `song = client.Song`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `String` | Album name |
| `artist` | `String` | Artist name |
| `coverArt` | `String` | URL to cover art image |
| `duration` | `Integer` | Duration in seconds |
| `genres` | `Array` | Music genres |
| `hasVideo` | `Boolean` | Whether video preview is available |
| `id` | `String` | Unique identifier for the song |
| `releaseDate` | `String` | Release date |
| `title` | `String` | Song title |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Song record (raises on error).
song = client.Song.load({ "id" => "song_id" })
```


### Stream

Create an instance: `stream = client.Stream`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bitrate` | `Integer` | Audio bitrate in kbps |
| `expiresAt` | `String` | Expiration time of the stream URL |
| `quality` | `String` | Audio quality |
| `streamUrl` | `String` | URL for streaming the song |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Stream record (raises on error).
stream = client.Stream.load({ "song_id" => "song_id" })
```


### Video

Create an instance: `video = client.Video`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `Integer` | Video duration in seconds |
| `thumbnailUrl` | `String` | Video thumbnail URL |
| `videoUrl` | `String` | URL for video preview |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Video record (raises on error).
video = client.Video.load({ "song_id" => "song_id" })
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Listenfree_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Listenfree_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
music = client.Music
music.list()

# music.data_get now returns the music data from the last list
# music.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
