# Listenfree PHP SDK



The PHP SDK for the Listenfree API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/listenfree-sdk/releases](https://github.com/voxgig-sdk/listenfree-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'listenfree_sdk.php';

$client = new ListenfreeSDK([
    "apikey" => getenv("LISTENFREE_APIKEY"),
]);
```

### 2. List listeningrooms

```php
try {
    $result = $client->listeningroom()->list();
    if (is_array($result)) {
        foreach ($result as $item) {
            $d = $item->data_get();
            echo $d["id"] . " " . $d["name"] . "\n";
        }
    }
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a listeningroom

```php
try {
    $result = $client->listeningroom()->load(["id" => "example_id"]);
    print_r($result);
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// Create
$created = $client->listeningroom()->create(["name" => "Example"]);

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = ListenfreeSDK::test();

$result = $client->listeningroom()->load(["id" => "test01"]);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new ListenfreeSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
LISTENFREE_TEST_LIVE=TRUE
LISTENFREE_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### ListenfreeSDK

```php
require_once 'listenfree_sdk.php';
$client = new ListenfreeSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = ListenfreeSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### ListenfreeSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `ListeningRoom` | `($data): ListeningRoomEntity` | Create a ListeningRoom entity instance. |
| `Music` | `($data): MusicEntity` | Create a Music entity instance. |
| `OfflineDownload` | `($data): OfflineDownloadEntity` | Create a OfflineDownload entity instance. |
| `Playlist` | `($data): PlaylistEntity` | Create a Playlist entity instance. |
| `Search` | `($data): SearchEntity` | Create a Search entity instance. |
| `Song` | `($data): SongEntity` | Create a Song entity instance. |
| `Stream` | `($data): StreamEntity` | Create a Stream entity instance. |
| `Video` | `($data): VideoEntity` | Create a Video entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `const listening_room = client.listening_room`

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

```ts
const listening_room = await client.listening_room.load({ id: 'listening_room_id' })
```

#### Example: List

```ts
const listening_rooms = await client.listening_room.list()
```

#### Example: Create

```ts
const listening_room = await client.listening_room.create({
})
```


### Music

Create an instance: `const music = client.music`

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

```ts
const musics = await client.music.list()
```


### OfflineDownload

Create an instance: `const offline_download = client.offline_download`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `song_id` | ``$STRING`` |  |

#### Example: Create

```ts
const offline_download = await client.offline_download.create({
  song_id: /* `$STRING` */,
})
```


### Playlist

Create an instance: `const playlist = client.playlist`

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

```ts
const playlist = await client.playlist.load({ id: 'playlist_id' })
```

#### Example: List

```ts
const playlists = await client.playlist.list()
```

#### Example: Create

```ts
const playlist = await client.playlist.create({
  song_id: /* `$STRING` */,
})
```


### Search

Create an instance: `const search = client.search`

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

```ts
const search = await client.search.load({ id: 'search_id' })
```


### Song

Create an instance: `const song = client.song`

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

```ts
const song = await client.song.load({ id: 'song_id' })
```


### Stream

Create an instance: `const stream = client.stream`

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

```ts
const stream = await client.stream.load({ id: 'stream_id' })
```


### Video

Create an instance: `const video = client.video`

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

```ts
const video = await client.video.load({ id: 'video_id' })
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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── listenfree_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`listenfree_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$listeningroom = $client->listeningroom();
$listeningroom->load(["id" => "example_id"]);

// $listeningroom->dataGet() now returns the loaded listeningroom data
// $listeningroom->matchGet() returns the last match criteria
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
