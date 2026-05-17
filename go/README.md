# Listenfree Golang SDK

The Golang SDK for the Listenfree API. Provides an entity-oriented interface using standard Go conventions — no generics required, data flows as `map[string]any`.


## Install
```bash
go get github.com/voxgig-sdk/listenfree-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/listenfree-sdk/go=../path/to/github.com/voxgig-sdk/listenfree-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/listenfree-sdk/go"
    "github.com/voxgig-sdk/listenfree-sdk/go/core"
)

func main() {
    client := sdk.NewListenfreeSDK(map[string]any{
        "apikey": os.Getenv("LISTENFREE_APIKEY"),
    })
```

### 2. List listeningrooms

```go
    result, err := client.ListeningRoom(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a listeningroom

```go
    result, err = client.ListeningRoom(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
```

### 4. Create, update, and remove

```go
// Create
created, _ := client.ListeningRoom(nil).Create(
    map[string]any{"name": "Example"}, nil,
)
cm := core.ToMapAny(created)
newID := core.ToMapAny(cm["data"])["id"]

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
client := sdk.TestSDK(nil, nil)

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
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
| `OfflineDownload` | `(data map[string]any) ListenfreeEntity` | Create a OfflineDownload entity instance. |
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

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### ListeningRoom

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"current_song"` |  |
| `"description"` |  |
| `"host"` |  |
| `"id"` |  |
| `"is_public"` |  |
| `"max_participant"` |  |
| `"name"` |  |
| `"participant"` |  |
| `"queue"` |  |

Operations: Create, List, Load.

API path: `/listening-rooms/{roomId}/join`

#### Music

| Field | Description |
| --- | --- |
| `"downloaded_at"` |  |
| `"expires_at"` |  |
| `"id"` |  |
| `"progress"` |  |
| `"song"` |  |
| `"status"` |  |

Operations: List.

API path: `/offline/downloads`

#### OfflineDownload

| Field | Description |
| --- | --- |
| `"song_id"` |  |

Operations: Create.

API path: `/offline/downloads`

#### Playlist

| Field | Description |
| --- | --- |
| `"created_at"` |  |
| `"description"` |  |
| `"id"` |  |
| `"is_public"` |  |
| `"is_smart"` |  |
| `"name"` |  |
| `"owner"` |  |
| `"smart_criterion"` |  |
| `"song"` |  |
| `"song_count"` |  |
| `"song_id"` |  |
| `"updated_at"` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/playlists/{playlistId}/songs`

#### Search

| Field | Description |
| --- | --- |
| `"limit"` |  |
| `"offset"` |  |
| `"result"` |  |
| `"total"` |  |

Operations: Load.

API path: `/search`

#### Song

| Field | Description |
| --- | --- |
| `"album"` |  |
| `"artist"` |  |
| `"cover_art"` |  |
| `"duration"` |  |
| `"genre"` |  |
| `"has_video"` |  |
| `"id"` |  |
| `"release_date"` |  |
| `"title"` |  |

Operations: Load.

API path: `/songs/{songId}`

#### Stream

| Field | Description |
| --- | --- |
| `"bitrate"` |  |
| `"expires_at"` |  |
| `"quality"` |  |
| `"stream_url"` |  |

Operations: Load.

API path: `/songs/{songId}/stream`

#### Video

| Field | Description |
| --- | --- |
| `"duration"` |  |
| `"thumbnail_url"` |  |
| `"video_url"` |  |

Operations: Load.

API path: `/songs/{songId}/video`



## Entities


### ListeningRoom

Create an instance: `listening_room := client.ListeningRoom(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | ``$STRING`` |  |
| `current_song` | ``$OBJECT`` |  |
| `description` | ``$STRING`` |  |
| `host` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `is_public` | ``$BOOLEAN`` |  |
| `max_participant` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `participant` | ``$ARRAY`` |  |
| `queue` | ``$ARRAY`` |  |

#### Example: Load

```go
result, err := client.ListeningRoom(nil).Load(map[string]any{"id": "listening_room_id"}, nil)
```

#### Example: List

```go
results, err := client.ListeningRoom(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.ListeningRoom(nil).Create(map[string]any{
}, nil)
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
| `downloaded_at` | ``$STRING`` |  |
| `expires_at` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `progress` | ``$INTEGER`` |  |
| `song` | ``$OBJECT`` |  |
| `status` | ``$STRING`` |  |

#### Example: List

```go
results, err := client.Music(nil).List(nil, nil)
```


### OfflineDownload

Create an instance: `offline_download := client.OfflineDownload(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `song_id` | ``$STRING`` |  |

#### Example: Create

```go
result, err := client.OfflineDownload(nil).Create(map[string]any{
    "song_id": /* `$STRING` */,
}, nil)
```


### Playlist

Create an instance: `playlist := client.Playlist(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Create(data, ctrl)` | Create a new entity with the given data. |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Remove(match, ctrl)` | Remove the matching entity. |
| `Update(data, ctrl)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `is_public` | ``$BOOLEAN`` |  |
| `is_smart` | ``$BOOLEAN`` |  |
| `name` | ``$STRING`` |  |
| `owner` | ``$STRING`` |  |
| `smart_criterion` | ``$OBJECT`` |  |
| `song` | ``$ARRAY`` |  |
| `song_count` | ``$INTEGER`` |  |
| `song_id` | ``$STRING`` |  |
| `updated_at` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Playlist(nil).Load(map[string]any{"id": "playlist_id"}, nil)
```

#### Example: List

```go
results, err := client.Playlist(nil).List(nil, nil)
```

#### Example: Create

```go
result, err := client.Playlist(nil).Create(map[string]any{
    "song_id": /* `$STRING` */,
}, nil)
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
| `limit` | ``$INTEGER`` |  |
| `offset` | ``$INTEGER`` |  |
| `result` | ``$OBJECT`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Search(nil).Load(map[string]any{"id": "search_id"}, nil)
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
| `album` | ``$STRING`` |  |
| `artist` | ``$STRING`` |  |
| `cover_art` | ``$STRING`` |  |
| `duration` | ``$INTEGER`` |  |
| `genre` | ``$ARRAY`` |  |
| `has_video` | ``$BOOLEAN`` |  |
| `id` | ``$STRING`` |  |
| `release_date` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Song(nil).Load(map[string]any{"id": "song_id"}, nil)
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
| `bitrate` | ``$INTEGER`` |  |
| `expires_at` | ``$STRING`` |  |
| `quality` | ``$STRING`` |  |
| `stream_url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Stream(nil).Load(map[string]any{"id": "stream_id"}, nil)
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
| `duration` | ``$INTEGER`` |  |
| `thumbnail_url` | ``$STRING`` |  |
| `video_url` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Video(nil).Load(map[string]any{"id": "video_id"}, nil)
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

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

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
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
