# Listenfree Golang SDK



The Golang SDK for the Listenfree API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.ListeningRoom(nil)` — each with the same small set of operations (`List`, `Load`, `Create`, `Update`, `Remove`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/listenfree-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/listenfree-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/listenfree-sdk/go=../listenfree-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/listenfree-sdk/go"
)

func main() {
    client := sdk.NewListenfreeSDK(map[string]any{
        "apikey": os.Getenv("LISTENFREE_APIKEY"),
    })

    // List listeningRoom records — the value is the array of records itself.
    listeningRooms, err := client.ListeningRoom(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range listeningRooms.([]any) {
        fmt.Println(item)
    }

    // Load a single listeningRoom — the value is the loaded record.
    listeningRoom, err := client.ListeningRoom(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(listeningRoom)

    // Create a listeningRoom.
    created, err := client.ListeningRoom(nil).Create(map[string]any{"createdAt": "example_createdAt", "currentSong": map[string]any{}}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
musics, err := client.Music(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = musics
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

music, err := client.Music(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(music) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewListenfreeSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewListenfreeSDK

```go
func NewListenfreeSDK(options map[string]any) *ListenfreeSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *ListenfreeSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### ListenfreeSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `ListeningRoom` | `(data map[string]any) ListenfreeEntity` | Create a ListeningRoom entity instance. |
| `Music` | `(data map[string]any) ListenfreeEntity` | Create a Music entity instance. |
| `OfflineDownload` | `(data map[string]any) ListenfreeEntity` | Create an OfflineDownload entity instance. |
| `Playlist` | `(data map[string]any) ListenfreeEntity` | Create a Playlist entity instance. |
| `Search` | `(data map[string]any) ListenfreeEntity` | Create a Search entity instance. |
| `Song` | `(data map[string]any) ListenfreeEntity` | Create a Song entity instance. |
| `Stream` | `(data map[string]any) ListenfreeEntity` | Create a Stream entity instance. |
| `Video` | `(data map[string]any) ListenfreeEntity` | Create a Video entity instance. |

### Entity interface (ListenfreeEntity)

All entities implement the `ListenfreeEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` / `Update` / `Remove` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    listeningRoom, err := client.ListeningRoom(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // listeningRoom is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### ListeningRoom

| Field | Description |
| --- | --- |
| `"createdAt"` |  |
| `"currentSong"` |  |
| `"description"` | Room description |
| `"host"` | User ID of room host |
| `"id"` | Unique identifier for the listening room |
| `"isPublic"` | Whether room is public |
| `"maxParticipants"` | Maximum number of participants |
| `"name"` | Room name |
| `"participants"` |  |
| `"queue"` |  |

Operations: Create, List, Load.

API path: `/listening-rooms/{roomId}/join`

#### Music

| Field | Description |
| --- | --- |
| `"downloadedAt"` | Download completion timestamp |
| `"expiresAt"` | Offline availability expiration |
| `"id"` | Download ID |
| `"progress"` | Download progress percentage |
| `"song"` |  |
| `"status"` | Download status |

Operations: List.

API path: `/offline/downloads`

#### OfflineDownload

| Field | Description |
| --- | --- |
| `"songId"` | ID of the song to download |

Operations: Create.

API path: `/offline/downloads`

#### Playlist

| Field | Description |
| --- | --- |
| `"createdAt"` | Creation timestamp |
| `"description"` | Playlist description |
| `"id"` | Unique identifier for the playlist |
| `"isPublic"` | Whether playlist is public |
| `"isSmart"` | Whether playlist is a smart playlist |
| `"name"` | Playlist name |
| `"owner"` | User ID of playlist owner |
| `"smartCriteria"` | Criteria for smart playlist generation |
| `"songCount"` | Number of songs in playlist |
| `"songId"` | ID of the song to add |
| `"songs"` |  |
| `"updatedAt"` | Last update timestamp |

Operations: Create, List, Load, Remove, Update.

API path: `/playlists/{playlistId}/songs`

#### Search

| Field | Description |
| --- | --- |
| `"albums"` |  |
| `"artists"` |  |
| `"playlists"` |  |
| `"songs"` |  |

Operations: Load.

API path: `/search`

#### Song

| Field | Description |
| --- | --- |
| `"album"` | Album name |
| `"artist"` | Artist name |
| `"coverArt"` | URL to cover art image |
| `"duration"` | Duration in seconds |
| `"genres"` | Music genres |
| `"hasVideo"` | Whether video preview is available |
| `"id"` | Unique identifier for the song |
| `"releaseDate"` | Release date |
| `"title"` | Song title |

Operations: Load.

API path: `/songs/{songId}`

#### Stream

| Field | Description |
| --- | --- |
| `"bitrate"` | Audio bitrate in kbps |
| `"expiresAt"` | Expiration time of the stream URL |
| `"quality"` | Audio quality |
| `"streamUrl"` | URL for streaming the song |

Operations: Load.

API path: `/songs/{songId}/stream`

#### Video

| Field | Description |
| --- | --- |
| `"duration"` | Video duration in seconds |
| `"thumbnailUrl"` | Video thumbnail URL |
| `"videoUrl"` | URL for video preview |

Operations: Load.

API path: `/songs/{songId}/video`



## Entities


### ListeningRoom

Create an instance: `listeningRoom := client.ListeningRoom(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` |  |
| `currentSong` | `map[string]any` |  |
| `description` | `string` | Room description |
| `host` | `string` | User ID of room host |
| `id` | `string` | Unique identifier for the listening room |
| `isPublic` | `bool` | Whether room is public |
| `maxParticipants` | `int` | Maximum number of participants |
| `name` | `string` | Room name |
| `participants` | `[]any` |  |
| `queue` | `[]any` |  |

#### Example: Load

```go
listeningRoom, err := client.ListeningRoom(nil).Load(map[string]any{"id": "listening_room_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(listeningRoom) // the loaded record
```

#### Example: List

```go
listeningRooms, err := client.ListeningRoom(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(listeningRooms) // the array of records
```

#### Example: Create

```go
result, err := client.ListeningRoom(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Music

Create an instance: `music := client.Music(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `downloadedAt` | `string` | Download completion timestamp |
| `expiresAt` | `string` | Offline availability expiration |
| `id` | `string` | Download ID |
| `progress` | `int` | Download progress percentage |
| `song` | `map[string]any` |  |
| `status` | `string` | Download status |

#### Example: List

```go
musics, err := client.Music(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(musics) // the array of records
```


### OfflineDownload

Create an instance: `offlineDownload := client.OfflineDownload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `songId` | `string` | ID of the song to download |

#### Example: Create

```go
result, err := client.OfflineDownload(nil).Create(map[string]any{
    "songId": "example_songId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Playlist

Create an instance: `playlist := client.Playlist(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `Update(data, ctrl)` | Update an existing entity. |
| `Remove(match, ctrl)` | Remove the matching entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `string` | Creation timestamp |
| `description` | `string` | Playlist description |
| `id` | `string` | Unique identifier for the playlist |
| `isPublic` | `bool` | Whether playlist is public |
| `isSmart` | `bool` | Whether playlist is a smart playlist |
| `name` | `string` | Playlist name |
| `owner` | `string` | User ID of playlist owner |
| `smartCriteria` | `map[string]any` | Criteria for smart playlist generation |
| `songCount` | `int` | Number of songs in playlist |
| `songId` | `string` | ID of the song to add |
| `songs` | `[]any` |  |
| `updatedAt` | `string` | Last update timestamp |

#### Example: Load

```go
playlist, err := client.Playlist(nil).Load(map[string]any{"id": "playlist_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(playlist) // the loaded record
```

#### Example: List

```go
playlists, err := client.Playlist(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(playlists) // the array of records
```

#### Example: Create

```go
result, err := client.Playlist(nil).Create(map[string]any{
    "songId": "example_songId",
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### Search

Create an instance: `search := client.Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `[]any` |  |
| `artists` | `[]any` |  |
| `playlists` | `[]any` |  |
| `songs` | `[]any` |  |

#### Example: Load

```go
search, err := client.Search(nil).Load(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(search) // the loaded record
```


### Song

Create an instance: `song := client.Song(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `string` | Album name |
| `artist` | `string` | Artist name |
| `coverArt` | `string` | URL to cover art image |
| `duration` | `int` | Duration in seconds |
| `genres` | `[]any` | Music genres |
| `hasVideo` | `bool` | Whether video preview is available |
| `id` | `string` | Unique identifier for the song |
| `releaseDate` | `string` | Release date |
| `title` | `string` | Song title |

#### Example: Load

```go
song, err := client.Song(nil).Load(map[string]any{"id": "song_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(song) // the loaded record
```


### Stream

Create an instance: `stream := client.Stream(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bitrate` | `int` | Audio bitrate in kbps |
| `expiresAt` | `string` | Expiration time of the stream URL |
| `quality` | `string` | Audio quality |
| `streamUrl` | `string` | URL for streaming the song |

#### Example: Load

```go
stream, err := client.Stream(nil).Load(map[string]any{"song_id": "song_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(stream) // the loaded record
```


### Video

Create an instance: `video := client.Video(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `int` | Video duration in seconds |
| `thumbnailUrl` | `string` | Video thumbnail URL |
| `videoUrl` | `string` | URL for video preview |

#### Example: Load

```go
video, err := client.Video(nil).Load(map[string]any{"song_id": "song_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(video) // the loaded record
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/listenfree-sdk/go/
├── listenfree.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/listenfree-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
music := client.Music(nil)
music.List(nil, nil)

// music.Data() now returns the music data from the last list
// music.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
