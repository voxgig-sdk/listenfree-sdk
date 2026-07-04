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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.listening_room.create({
})
```

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.listening_room.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.listening_room.load({"id": "listening_room_id"})
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

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.music.list({})
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
offline_download = client.offline_download
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `song_id` | ``$STRING`` | Yes |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.offline_download.create({
    "song_id": # `$STRING`,
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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.playlist.create({
    "song_id": # `$STRING`,
})
```

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.playlist.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.playlist.load({"id": "playlist_id"})
```

#### `remove(reqmatch, ctrl=None) -> dict`

Remove the entity matching the given criteria. Raises on error.

```python
result = client.playlist.remove({"id": "playlist_id"})
```

#### `update(reqdata, ctrl=None) -> dict`

Update an existing entity. The data must include the entity `id`. Returns the updated entity data and raises on error.

```python
result = client.playlist.update({
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.search.load({"id": "search_id"})
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.song.load({"id": "song_id"})
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

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.stream.load({"id": "stream_id"})
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
video = client.video
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | ``$INTEGER`` | No |  |
| `thumbnail_url` | ``$STRING`` | No |  |
| `video_url` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.video.load({"id": "video_id"})
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

