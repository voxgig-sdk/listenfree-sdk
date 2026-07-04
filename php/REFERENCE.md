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

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

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
$listening_room = $client->listening_room();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->listening_room()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->listening_room()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->listening_room()->load(["id" => "listening_room_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ListeningRoomEntity`

Create a new `ListeningRoomEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## MusicEntity

```php
$music = $client->music();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->music()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MusicEntity`

Create a new `MusicEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## OfflineDownloadEntity

```php
$offline_download = $client->offline_download();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `song_id` | ``$STRING`` | Yes |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->offline_download()->create([
  "song_id" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): OfflineDownloadEntity`

Create a new `OfflineDownloadEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PlaylistEntity

```php
$playlist = $client->playlist();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->playlist()->create([
  "song_id" => /* `$STRING` */,
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->playlist()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->playlist()->load(["id" => "playlist_id"]);
```

#### `remove(array $reqmatch, ?array $ctrl = null): mixed`

Remove the entity matching the given criteria. Throws on error.

```php
$result = $client->playlist()->remove(["id" => "playlist_id"]);
```

#### `update(array $reqdata, ?array $ctrl = null): mixed`

Update an existing entity. The data must include the entity `id`. Throws on error.

```php
$result = $client->playlist()->update([
  "id" => "playlist_id",
  // Fields to update
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PlaylistEntity`

Create a new `PlaylistEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->search();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `limit` | ``$INTEGER`` | No |  |
| `offset` | ``$INTEGER`` | No |  |
| `result` | ``$OBJECT`` | No |  |
| `total` | ``$INTEGER`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->search()->load(["id" => "search_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SongEntity

```php
$song = $client->song();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->song()->load(["id" => "song_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SongEntity`

Create a new `SongEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StreamEntity

```php
$stream = $client->stream();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bitrate` | ``$INTEGER`` | No |  |
| `expires_at` | ``$STRING`` | No |  |
| `quality` | ``$STRING`` | No |  |
| `stream_url` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->stream()->load(["id" => "stream_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StreamEntity`

Create a new `StreamEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## VideoEntity

```php
$video = $client->video();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `duration` | ``$INTEGER`` | No |  |
| `thumbnail_url` | ``$STRING`` | No |  |
| `video_url` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->video()->load(["id" => "video_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): VideoEntity`

Create a new `VideoEntity` instance with the same client and
options.

#### `getName(): string`

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

