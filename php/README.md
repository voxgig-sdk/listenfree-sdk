# Listenfree PHP SDK



The PHP SDK for the Listenfree API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->ListeningRoom()` — with named operations (`list`/`load`/`create`/`update`/`remove`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

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

### 2. List listeningroom records

```php
try {
    // list() returns an array of ListeningRoom records — iterate directly.
    $listeningrooms = $client->ListeningRoom()->list();
    foreach ($listeningrooms as $item) {
        echo $item["id"] . " " . $item["created_at"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a stream

Stream is nested under song, so provide the `song_id`.

```php
try {
    // load() returns the bare Stream record (throws on error).
    $stream = $client->Stream()->load(["song_id" => "example_song_id"]);
    print_r($stream);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the bare created ListeningRoom record.
$created = $client->ListeningRoom()->create(["created_at" => "example_created_at", "current_song" => []]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $listeningrooms = $client->ListeningRoom()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
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
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
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

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = ListenfreeSDK::test([
    "entity" => ["listeningroom" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the bare mock record (throws on error).
$listeningroom = $client->ListeningRoom()->list();
print_r($listeningroom);
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
| `OfflineDownload` | `($data): OfflineDownloadEntity` | Create an OfflineDownload entity instance. |
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
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
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

Create an instance: `$listening_room = $client->ListeningRoom();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `created_at` | `string` |  |
| `current_song` | `array` |  |
| `description` | `string` |  |
| `host` | `string` |  |
| `id` | `string` |  |
| `is_public` | `bool` |  |
| `max_participant` | `int` |  |
| `name` | `string` |  |
| `participant` | `array` |  |
| `queue` | `array` |  |

#### Example: Load

```php
// load() returns the bare ListeningRoom record (throws on error).
$listening_room = $client->ListeningRoom()->load(["id" => "listening_room_id"]);
```

#### Example: List

```php
// list() returns an array of ListeningRoom records (throws on error).
$listening_rooms = $client->ListeningRoom()->list();
```

#### Example: Create

```php
$listening_room = $client->ListeningRoom()->create([
]);
```


### Music

Create an instance: `$music = $client->Music();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `downloaded_at` | `string` |  |
| `expires_at` | `string` |  |
| `id` | `string` |  |
| `progress` | `int` |  |
| `song` | `array` |  |
| `status` | `string` |  |

#### Example: List

```php
// list() returns an array of Music records (throws on error).
$musics = $client->Music()->list();
```


### OfflineDownload

Create an instance: `$offline_download = $client->OfflineDownload();`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `song_id` | `string` |  |

#### Example: Create

```php
$offline_download = $client->OfflineDownload()->create([
    "song_id" => null, // string
]);
```


### Playlist

Create an instance: `$playlist = $client->Playlist();`

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
| `created_at` | `string` |  |
| `description` | `string` |  |
| `id` | `string` |  |
| `is_public` | `bool` |  |
| `is_smart` | `bool` |  |
| `name` | `string` |  |
| `owner` | `string` |  |
| `smart_criterion` | `array` |  |
| `song` | `array` |  |
| `song_count` | `int` |  |
| `song_id` | `string` |  |
| `updated_at` | `string` |  |

#### Example: Load

```php
// load() returns the bare Playlist record (throws on error).
$playlist = $client->Playlist()->load(["id" => "playlist_id"]);
```

#### Example: List

```php
// list() returns an array of Playlist records (throws on error).
$playlists = $client->Playlist()->list();
```

#### Example: Create

```php
$playlist = $client->Playlist()->create([
    "song_id" => null, // string
]);
```


### Search

Create an instance: `$search = $client->Search();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `limit` | `int` |  |
| `offset` | `int` |  |
| `result` | `array` |  |
| `total` | `int` |  |

#### Example: Load

```php
// load() returns the bare Search record (throws on error).
$search = $client->Search()->load();
```


### Song

Create an instance: `$song = $client->Song();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `album` | `string` |  |
| `artist` | `string` |  |
| `cover_art` | `string` |  |
| `duration` | `int` |  |
| `genre` | `array` |  |
| `has_video` | `bool` |  |
| `id` | `string` |  |
| `release_date` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```php
// load() returns the bare Song record (throws on error).
$song = $client->Song()->load(["id" => "song_id"]);
```


### Stream

Create an instance: `$stream = $client->Stream();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bitrate` | `int` |  |
| `expires_at` | `string` |  |
| `quality` | `string` |  |
| `stream_url` | `string` |  |

#### Example: Load

```php
// load() returns the bare Stream record (throws on error).
$stream = $client->Stream()->load(["song_id" => "song_id"]);
```


### Video

Create an instance: `$video = $client->Video();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `duration` | `int` |  |
| `thumbnail_url` | `string` |  |
| `video_url` | `string` |  |

#### Example: Load

```php
// load() returns the bare Video record (throws on error).
$video = $client->Video()->load(["song_id" => "song_id"]);
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$listeningroom = $client->ListeningRoom();
$listeningroom->list();

// $listeningroom->data_get() now returns the listeningroom data from the last list
// $listeningroom->match_get() returns the last match criteria
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
