# Listenfree Python SDK



The Python SDK for the Listenfree API — an entity-oriented client following Pythonic conventions.

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
    listeningrooms = client.ListeningRoom().list({})
    for listeningroom in listeningrooms:
        print(listeningroom)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a listeningroom

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    listeningroom = client.ListeningRoom().load({"id": "example_id"})
    print(listeningroom)
except Exception as err:
    print(f"load failed: {err}")
```

### 4. Create, update, and remove

```python
# Create — returns the bare created record (a dict)
created = client.ListeningRoom().create({"name": "Example"})

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
    print(result["err"])     # error value
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

# Entity ops return the bare record and raise on error.
listeningroom = client.ListeningRoom().load({"id": "test01"})
# listeningroom contains the mock response record
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

Entity operations return the bare result data (a `dict` for single-entity
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
| `created_at` |  |
| `current_song` |  |
| `description` |  |
| `host` |  |
| `id` |  |
| `is_public` |  |
| `max_participant` |  |
| `name` |  |
| `participant` |  |
| `queue` |  |

Operations: Create, List, Load.

API path: `/listening-rooms/{roomId}/join`

#### Music

| Field | Description |
| --- | --- |
| `downloaded_at` |  |
| `expires_at` |  |
| `id` |  |
| `progress` |  |
| `song` |  |
| `status` |  |

Operations: List.

API path: `/offline/downloads`

#### OfflineDownload

| Field | Description |
| --- | --- |
| `song_id` |  |

Operations: Create.

API path: `/offline/downloads`

#### Playlist

| Field | Description |
| --- | --- |
| `created_at` |  |
| `description` |  |
| `id` |  |
| `is_public` |  |
| `is_smart` |  |
| `name` |  |
| `owner` |  |
| `smart_criterion` |  |
| `song` |  |
| `song_count` |  |
| `song_id` |  |
| `updated_at` |  |

Operations: Create, List, Load, Remove, Update.

API path: `/playlists/{playlistId}/songs`

#### Search

| Field | Description |
| --- | --- |
| `limit` |  |
| `offset` |  |
| `result` |  |
| `total` |  |

Operations: Load.

API path: `/search`

#### Song

| Field | Description |
| --- | --- |
| `album` |  |
| `artist` |  |
| `cover_art` |  |
| `duration` |  |
| `genre` |  |
| `has_video` |  |
| `id` |  |
| `release_date` |  |
| `title` |  |

Operations: Load.

API path: `/songs/{songId}`

#### Stream

| Field | Description |
| --- | --- |
| `bitrate` |  |
| `expires_at` |  |
| `quality` |  |
| `stream_url` |  |

Operations: Load.

API path: `/songs/{songId}/stream`

#### Video

| Field | Description |
| --- | --- |
| `duration` |  |
| `thumbnail_url` |  |
| `video_url` |  |

Operations: Load.

API path: `/songs/{songId}/video`



## Entities


### ListeningRoom

Create an instance: `listening_room = client.ListeningRoom()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

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

```python
listening_room = client.ListeningRoom().load({"id": "listening_room_id"})
```

#### Example: List

```python
listening_rooms = client.ListeningRoom().list({})
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
| `list(match)` | List entities matching the criteria. |

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

```python
musics = client.Music().list({})
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
| `song_id` | ``$STRING`` |  |

#### Example: Create

```python
offline_download = client.OfflineDownload().create({
    "song_id": ...,  # `$STRING`
})
```


### Playlist

Create an instance: `playlist = client.Playlist()`

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

```python
playlist = client.Playlist().load({"id": "playlist_id"})
```

#### Example: List

```python
playlists = client.Playlist().list({})
```

#### Example: Create

```python
playlist = client.Playlist().create({
    "song_id": ...,  # `$STRING`
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
| `limit` | ``$INTEGER`` |  |
| `offset` | ``$INTEGER`` |  |
| `result` | ``$OBJECT`` |  |
| `total` | ``$INTEGER`` |  |

#### Example: Load

```python
search = client.Search().load({"id": "search_id"})
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
| `bitrate` | ``$INTEGER`` |  |
| `expires_at` | ``$STRING`` |  |
| `quality` | ``$STRING`` |  |
| `stream_url` | ``$STRING`` |  |

#### Example: Load

```python
stream = client.Stream().load({"id": "stream_id"})
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
| `duration` | ``$INTEGER`` |  |
| `thumbnail_url` | ``$STRING`` |  |
| `video_url` | ``$STRING`` |  |

#### Example: Load

```python
video = client.Video().load({"id": "video_id"})
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
error is returned to the caller as the second element in the return tuple.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
listeningroom = client.ListeningRoom()
listeningroom.load({"id": "example_id"})

# listeningroom.data_get() now returns the loaded listeningroom data
# listeningroom.match_get() returns the last match criteria
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
