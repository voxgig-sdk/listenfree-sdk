# Listenfree Python SDK Reference

Complete API reference for the Listenfree Python SDK.


## ListenfreeSDK

### Constructor

```python
from listenfree_sdk import ListenfreeSDK

client = ListenfreeSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ListenfreeSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = ListenfreeSDK.test()
```


### Instance Methods

#### `ListeningRoom(data=None)`

Create a new `ListeningRoomEntity` instance. Pass `None` for no initial data.

#### `Music(data=None)`

Create a new `MusicEntity` instance. Pass `None` for no initial data.

#### `OfflineDownload(data=None)`

Create a new `OfflineDownloadEntity` instance. Pass `None` for no initial data.

#### `Playlist(data=None)`

Create a new `PlaylistEntity` instance. Pass `None` for no initial data.

#### `Search(data=None)`

Create a new `SearchEntity` instance. Pass `None` for no initial data.

#### `Song(data=None)`

Create a new `SongEntity` instance. Pass `None` for no initial data.

#### `Stream(data=None)`

Create a new `StreamEntity` instance. Pass `None` for no initial data.

#### `Video(data=None)`

Create a new `VideoEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ListeningRoomEntity

```python
listening_room = client.ListeningRoom()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | No |  |
| `currentSong` | `dict` | No |  |
| `description` | `str` | No | Room description |
| `host` | `str` | No | User ID of room host |
| `id` | `str` | No | Unique identifier for the listening room |
| `isPublic` | `bool` | No | Whether room is public |
| `maxParticipants` | `int` | No | Maximum number of participants |
| `name` | `str` | No | Room name |
| `participants` | `list` | No |  |
| `queue` | `list` | No |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.ListeningRoom().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ListeningRoom().list()
for listening_room in results:
    print(listening_room)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ListeningRoom().load({"id": "listening_room_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ListeningRoomEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MusicEntity

```python
music = client.Music()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloadedAt` | `str` | No | Download completion timestamp |
| `expiresAt` | `str` | No | Offline availability expiration |
| `id` | `str` | No | Download ID |
| `progress` | `int` | No | Download progress percentage |
| `song` | `dict` | No |  |
| `status` | `str` | No | Download status |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Music().list()
for music in results:
    print(music)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MusicEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## OfflineDownloadEntity

```python
offline_download = client.OfflineDownload()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `songId` | `str` | Yes | ID of the song to download |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.OfflineDownload().create({
    "songId": "example_songId",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `OfflineDownloadEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlaylistEntity

```python
playlist = client.Playlist()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `str` | No | Creation timestamp |
| `description` | `str` | No | Playlist description |
| `id` | `str` | No | Unique identifier for the playlist |
| `isPublic` | `bool` | No | Whether playlist is public |
| `isSmart` | `bool` | No | Whether playlist is a smart playlist |
| `name` | `str` | No | Playlist name |
| `owner` | `str` | No | User ID of playlist owner |
| `smartCriteria` | `dict` | No | Criteria for smart playlist generation |
| `songCount` | `int` | No | Number of songs in playlist |
| `songId` | `str` | Yes | ID of the song to add |
| `songs` | `list` | No |  |
| `updatedAt` | `str` | No | Last update timestamp |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Playlist().create({
    "songId": "example_songId",  # str
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Playlist().list()
for playlist in results:
    print(playlist)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Playlist().load({"id": "playlist_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.Playlist().remove({"id": "playlist_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.Playlist().update({
    "id": "playlist_id",
    # Fields to update
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlaylistEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchEntity

```python
search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `list` | No |  |
| `artists` | `list` | No |  |
| `playlists` | `list` | No |  |
| `songs` | `list` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Search().load({"q": "q"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SongEntity

```python
song = client.Song()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `str` | No | Album name |
| `artist` | `str` | No | Artist name |
| `coverArt` | `str` | No | URL to cover art image |
| `duration` | `int` | No | Duration in seconds |
| `genres` | `list` | No | Music genres |
| `hasVideo` | `bool` | No | Whether video preview is available |
| `id` | `str` | No | Unique identifier for the song |
| `releaseDate` | `str` | No | Release date |
| `title` | `str` | No | Song title |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Song().load({"id": "song_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SongEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## StreamEntity

```python
stream = client.Stream()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bitrate` | `int` | No | Audio bitrate in kbps |
| `expiresAt` | `str` | No | Expiration time of the stream URL |
| `quality` | `str` | No | Audio quality |
| `streamUrl` | `str` | No | URL for streaming the song |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Stream().load({"song_id": "song_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `StreamEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VideoEntity

```python
video = client.Video()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | `int` | No | Video duration in seconds |
| `thumbnailUrl` | `str` | No | Video thumbnail URL |
| `videoUrl` | `str` | No | URL for video preview |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Video().load({"song_id": "song_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VideoEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = ListenfreeSDK({
    "feature": {
        "test": {"active": True},
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

