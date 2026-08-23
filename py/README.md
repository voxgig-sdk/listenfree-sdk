# Listenfree Python SDK



The Python SDK for the Listenfree API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.ListeningRoom()` — each
carrying a small, uniform set of operations (`list`, `load`, `create`, `update`, `remove`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/listenfree-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
import os
from listenfree_sdk import ListenfreeSDK

client = ListenfreeSDK({
    "apikey": os.environ.get("LISTENFREE_APIKEY"),
})
```

### 2. List listeningroom records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    listeningrooms = client.ListeningRoom().list()
    for listeningroom in listeningrooms:
        print(listeningroom)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a stream

Stream is nested under song, so provide the `song_id`.
`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    stream = client.Stream().load({"song_id": "example_song_id"})
    print(stream)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the ENTITY (call data_get() for the record)
created = client.ListeningRoom().create({"createdAt": "example_createdAt", "currentSong": {}})

```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    musics = client.Music().list()
    print(musics)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = ListenfreeSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
music = client.Music().list()
# music contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = ListenfreeSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### ListenfreeSDK

```python
from listenfree_sdk import ListenfreeSDK

client = ListenfreeSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `str` | API key for authentication. |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = ListenfreeSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### ListenfreeSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `update` | `(reqdata, ctrl) -> any` | Update an existing entity. Raises on error. |
| `remove` | `(reqmatch, ctrl) -> any` | Remove an entity. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `listening_room = client.ListeningRoom()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` |  |
| `currentSong` | `dict` |  |
| `description` | `str` | Room description |
| `host` | `str` | User ID of room host |
| `id` | `str` | Unique identifier for the listening room |
| `isPublic` | `bool` | Whether room is public |
| `maxParticipants` | `int` | Maximum number of participants |
| `name` | `str` | Room name |
| `participants` | `list` |  |
| `queue` | `list` |  |

#### Example: Load

```python
listening_room = client.ListeningRoom().load({"id": "listening_room_id"})
```

#### Example: List

```python
listening_rooms = client.ListeningRoom().list()
```

#### Example: Create

```python
listening_room = client.ListeningRoom().create({
})
```


### Music

Create an instance: `music = client.Music()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `downloadedAt` | `str` | Download completion timestamp |
| `expiresAt` | `str` | Offline availability expiration |
| `id` | `str` | Download ID |
| `progress` | `int` | Download progress percentage |
| `song` | `dict` |  |
| `status` | `str` | Download status |

#### Example: List

```python
musics = client.Music().list()
```


### OfflineDownload

Create an instance: `offline_download = client.OfflineDownload()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `songId` | `str` | ID of the song to download |

#### Example: Create

```python
offline_download = client.OfflineDownload().create({
    "songId": "example_songId",  # str
})
```


### Playlist

Create an instance: `playlist = client.Playlist()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |
| `remove(match)` | Remove the matching entity. |
| `update(data)` | Update an existing entity. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `createdAt` | `str` | Creation timestamp |
| `description` | `str` | Playlist description |
| `id` | `str` | Unique identifier for the playlist |
| `isPublic` | `bool` | Whether playlist is public |
| `isSmart` | `bool` | Whether playlist is a smart playlist |
| `name` | `str` | Playlist name |
| `owner` | `str` | User ID of playlist owner |
| `smartCriteria` | `dict` | Criteria for smart playlist generation |
| `songCount` | `int` | Number of songs in playlist |
| `songId` | `str` | ID of the song to add |
| `songs` | `list` |  |
| `updatedAt` | `str` | Last update timestamp |

#### Example: Load

```python
playlist = client.Playlist().load({"id": "playlist_id"})
```

#### Example: List

```python
playlists = client.Playlist().list()
```

#### Example: Create

```python
playlist = client.Playlist().create({
    "songId": "example_songId",  # str
})
```


### Search

Create an instance: `search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `albums` | `list` |  |
| `artists` | `list` |  |
| `playlists` | `list` |  |
| `songs` | `list` |  |

#### Example: Load

```python
search = client.Search().load()
```


### Song

Create an instance: `song = client.Song()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `str` | Album name |
| `artist` | `str` | Artist name |
| `coverArt` | `str` | URL to cover art image |
| `duration` | `int` | Duration in seconds |
| `genres` | `list` | Music genres |
| `hasVideo` | `bool` | Whether video preview is available |
| `id` | `str` | Unique identifier for the song |
| `releaseDate` | `str` | Release date |
| `title` | `str` | Song title |

#### Example: Load

```python
song = client.Song().load({"id": "song_id"})
```


### Stream

Create an instance: `stream = client.Stream()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bitrate` | `int` | Audio bitrate in kbps |
| `expiresAt` | `str` | Expiration time of the stream URL |
| `quality` | `str` | Audio quality |
| `streamUrl` | `str` | URL for streaming the song |

#### Example: Load

```python
stream = client.Stream().load({"song_id": "song_id"})
```


### Video

Create an instance: `video = client.Video()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `int` | Video duration in seconds |
| `thumbnailUrl` | `str` | Video thumbnail URL |
| `videoUrl` | `str` | URL for video preview |

#### Example: Load

```python
video = client.Video().load({"song_id": "song_id"})
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── listenfree_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`listenfree_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
music = client.Music()
music.list()

# music.data_get() now returns the music data from the last list
# music.match_get() returns the last match criteria
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
