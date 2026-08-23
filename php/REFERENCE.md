# Listenfree PHP SDK Reference

Complete API reference for the Listenfree PHP SDK.


## ListenfreeSDK

### Constructor

```php
require_once __DIR__ . '/listenfree_sdk.php';

$client = new ListenfreeSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `ListenfreeSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = ListenfreeSDK::test();
```


### Instance Methods

#### `ListeningRoom($data = null)`

Create a new `ListeningRoomEntity` instance. Pass `null` for no initial data.

#### `Music($data = null)`

Create a new `MusicEntity` instance. Pass `null` for no initial data.

#### `OfflineDownload($data = null)`

Create a new `OfflineDownloadEntity` instance. Pass `null` for no initial data.

#### `Playlist($data = null)`

Create a new `PlaylistEntity` instance. Pass `null` for no initial data.

#### `Search($data = null)`

Create a new `SearchEntity` instance. Pass `null` for no initial data.

#### `Song($data = null)`

Create a new `SongEntity` instance. Pass `null` for no initial data.

#### `Stream($data = null)`

Create a new `StreamEntity` instance. Pass `null` for no initial data.

#### `Video($data = null)`

Create a new `VideoEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): ListenfreeUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ListeningRoomEntity

```php
$listening_room = $client->ListeningRoom();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `createdAt` | `string` | No |  |
| `currentSong` | `array` | No |  |
| `description` | `string` | No | Room description |
| `host` | `string` | No | User ID of room host |
| `id` | `string` | No | Unique identifier for the listening room |
| `isPublic` | `bool` | No | Whether room is public |
| `maxParticipants` | `int` | No | Maximum number of participants |
| `name` | `string` | No | Room name |
| `participants` | `array` | No |  |
| `queue` | `array` | No |  |

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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->ListeningRoom()->create([
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ListeningRoom()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ListeningRoom()->load(["id" => "listening_room_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ListeningRoomEntity`

Create a new `ListeningRoomEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MusicEntity

```php
$music = $client->Music();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `downloadedAt` | `string` | No | Download completion timestamp |
| `expiresAt` | `string` | No | Offline availability expiration |
| `id` | `string` | No | Download ID |
| `progress` | `int` | No | Download progress percentage |
| `song` | `array` | No |  |
| `status` | `string` | No | Download status |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Music()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MusicEntity`

Create a new `MusicEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## OfflineDownloadEntity

```php
$offline_download = $client->OfflineDownload();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `songId` | `string` | Yes | ID of the song to download |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->OfflineDownload()->create([
  "songId" => null, // string
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): OfflineDownloadEntity`

Create a new `OfflineDownloadEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## PlaylistEntity

```php
$playlist = $client->Playlist();
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
| `smartCriteria` | `array` | No | Criteria for smart playlist generation |
| `songCount` | `int` | No | Number of songs in playlist |
| `songId` | `string` | Yes | ID of the song to add |
| `songs` | `array` | No |  |
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->Playlist()->create([
  "songId" => null, // string
]);
```

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Playlist()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Playlist()->load(["id" => "playlist_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->Playlist()->remove(["id" => "playlist_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->Playlist()->update([
  "id" => "playlist_id",
  // Fields to update
]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): PlaylistEntity`

Create a new `PlaylistEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->Search();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `albums` | `array` | No |  |
| `artists` | `array` | No |  |
| `playlists` | `array` | No |  |
| `songs` | `array` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Search()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SongEntity

```php
$song = $client->Song();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `album` | `string` | No | Album name |
| `artist` | `string` | No | Artist name |
| `coverArt` | `string` | No | URL to cover art image |
| `duration` | `int` | No | Duration in seconds |
| `genres` | `array` | No | Music genres |
| `hasVideo` | `bool` | No | Whether video preview is available |
| `id` | `string` | No | Unique identifier for the song |
| `releaseDate` | `string` | No | Release date |
| `title` | `string` | No | Song title |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Song()->load(["id" => "song_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SongEntity`

Create a new `SongEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## StreamEntity

```php
$stream = $client->Stream();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bitrate` | `int` | No | Audio bitrate in kbps |
| `expiresAt` | `string` | No | Expiration time of the stream URL |
| `quality` | `string` | No | Audio quality |
| `streamUrl` | `string` | No | URL for streaming the song |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Stream()->load(["song_id" => "song_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): StreamEntity`

Create a new `StreamEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VideoEntity

```php
$video = $client->Video();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | `int` | No | Video duration in seconds |
| `thumbnailUrl` | `string` | No | Video thumbnail URL |
| `videoUrl` | `string` | No | URL for video preview |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Video()->load(["song_id" => "song_id"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VideoEntity`

Create a new `VideoEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new ListenfreeSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

