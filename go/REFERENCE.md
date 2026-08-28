# Listenfree Golang SDK Reference

Complete API reference for the Listenfree Golang SDK.


## ListenfreeSDK

### Constructor

```go
func NewListenfreeSDK(options map[string]any) *ListenfreeSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *ListenfreeSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *ListenfreeSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `ListeningRoom(data map[string]any) ListenfreeEntity`

Create a new `ListeningRoom` entity instance. Pass `nil` for no initial data.

#### `Music(data map[string]any) ListenfreeEntity`

Create a new `Music` entity instance. Pass `nil` for no initial data.

#### `OfflineDownload(data map[string]any) ListenfreeEntity`

Create a new `OfflineDownload` entity instance. Pass `nil` for no initial data.

#### `Playlist(data map[string]any) ListenfreeEntity`

Create a new `Playlist` entity instance. Pass `nil` for no initial data.

#### `Search(data map[string]any) ListenfreeEntity`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `Song(data map[string]any) ListenfreeEntity`

Create a new `Song` entity instance. Pass `nil` for no initial data.

#### `Stream(data map[string]any) ListenfreeEntity`

Create a new `Stream` entity instance. Pass `nil` for no initial data.

#### `Video(data map[string]any) ListenfreeEntity`

Create a new `Video` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## ListeningRoomEntity

```go
listeningRoom := client.ListeningRoom(nil)
fmt.Println(listeningRoom.GetName()) // "listening_room"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `currentSong` | `map[string]any` | No |  |
| `description` | `string` | No | Room description |
| `host` | `string` | No | User ID of room host |
| `id` | `string` | No | Unique identifier for the listening room |
| `isPublic` | `bool` | No | Whether room is public |
| `maxParticipants` | `int` | No | Maximum number of participants |
| `name` | `string` | No | Room name |
| `participants` | `[]any` | No |  |
| `queue` | `[]any` | No |  |

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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ListeningRoom(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ListeningRoom(nil).Load(map[string]any{"id": "listening_room_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.ListeningRoom(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ListeningRoomEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MusicEntity

```go
music := client.Music(nil)
fmt.Println(music.GetName()) // "music"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloadedAt` | `string` | No | Download completion timestamp |
| `expiresAt` | `string` | No | Offline availability expiration |
| `id` | `string` | No | Download ID |
| `progress` | `int` | No | Download progress percentage |
| `song` | `map[string]any` | No |  |
| `status` | `string` | No | Download status |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Music(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MusicEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## OfflineDownloadEntity

```go
offlineDownload := client.OfflineDownload(nil)
fmt.Println(offlineDownload.GetName()) // "offline_download"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `songId` | `string` | Yes | ID of the song to download |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.OfflineDownload(nil).Create(map[string]any{
    "songId": "example_songId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `OfflineDownloadEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PlaylistEntity

```go
playlist := client.Playlist(nil)
fmt.Println(playlist.GetName()) // "playlist"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No | Creation timestamp |
| `description` | `string` | No | Playlist description |
| `id` | `string` | No | Unique identifier for the playlist |
| `isPublic` | `bool` | No | Whether playlist is public |
| `isSmart` | `bool` | No | Whether playlist is a smart playlist |
| `name` | `string` | No | Playlist name |
| `owner` | `string` | No | User ID of playlist owner |
| `smartCriteria` | `map[string]any` | No | Criteria for smart playlist generation |
| `songCount` | `int` | No | Number of songs in playlist |
| `songId` | `string` | Yes | ID of the song to add |
| `songs` | `[]any` | No |  |
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Playlist(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Playlist(nil).Load(map[string]any{"id": "playlist_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Playlist(nil).Create(map[string]any{
    "songId": "example_songId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Update(reqdata, ctrl map[string]any) (any, error)`

Update an existing entity. The data must include the entity `id`.

```go
result, err := client.Playlist(nil).Update(map[string]any{
    "id": "playlist_id",
    // Fields to update
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Remove(reqmatch, ctrl map[string]any) (any, error)`

Remove the entity matching the given criteria.

```go
result, err := client.Playlist(nil).Remove(map[string]any{"id": "playlist_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlaylistEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SearchEntity

```go
search := client.Search(nil)
fmt.Println(search.GetName()) // "search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `[]any` | No |  |
| `artists` | `[]any` | No |  |
| `playlists` | `[]any` | No |  |
| `songs` | `[]any` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Search(nil).Load(map[string]any{"q": "q"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SongEntity

```go
song := client.Song(nil)
fmt.Println(song.GetName()) // "song"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `string` | No | Album name |
| `artist` | `string` | No | Artist name |
| `coverArt` | `string` | No | URL to cover art image |
| `duration` | `int` | No | Duration in seconds |
| `genres` | `[]any` | No | Music genres |
| `hasVideo` | `bool` | No | Whether video preview is available |
| `id` | `string` | No | Unique identifier for the song |
| `releaseDate` | `string` | No | Release date |
| `title` | `string` | No | Song title |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Song(nil).Load(map[string]any{"id": "song_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SongEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## StreamEntity

```go
stream := client.Stream(nil)
fmt.Println(stream.GetName()) // "stream"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bitrate` | `int` | No | Audio bitrate in kbps |
| `expiresAt` | `string` | No | Expiration time of the stream URL |
| `quality` | `string` | No | Audio quality |
| `streamUrl` | `string` | No | URL for streaming the song |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Stream(nil).Load(map[string]any{"song_id": "song_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `StreamEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## VideoEntity

```go
video := client.Video(nil)
fmt.Println(video.GetName()) // "video"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | `int` | No | Video duration in seconds |
| `thumbnailUrl` | `string` | No | Video thumbnail URL |
| `videoUrl` | `string` | No | URL for video preview |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Video(nil).Load(map[string]any{"song_id": "song_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VideoEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewListenfreeSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
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

