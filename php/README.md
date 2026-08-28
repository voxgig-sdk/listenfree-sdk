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
        echo $item["id"] . " " . $item["createdAt"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a stream

Stream is nested under song, so provide the `song_id`.

```php
try {
    // load() returns the ENTITY — call data_get() for the Stream record (throws on error).
    $stream = $client->Stream()->load(["song_id" => "example_song_id"]);
    print_r($stream);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// create() returns the ENTITY — call data_get() for the created ListeningRoom record.
$created = $client->ListeningRoom()->create(["createdAt" => "example_createdAt", "currentSong" => []]);

```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $musics = $client->Music()->list();
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

Create a mock client for unit testing — no server required:

```php
$client = ListenfreeSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$music = $client->Music()->list();
print_r($music);
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

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
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
| `createdAt` | `string` |  |
| `currentSong` | `array` |  |
| `description` | `string` | Room description |
| `host` | `string` | User ID of room host |
| `id` | `string` | Unique identifier for the listening room |
| `isPublic` | `bool` | Whether room is public |
| `maxParticipants` | `int` | Maximum number of participants |
| `name` | `string` | Room name |
| `participants` | `array` |  |
| `queue` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ListeningRoom record (throws on error).
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
| `downloadedAt` | `string` | Download completion timestamp |
| `expiresAt` | `string` | Offline availability expiration |
| `id` | `string` | Download ID |
| `progress` | `int` | Download progress percentage |
| `song` | `array` |  |
| `status` | `string` | Download status |

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
| `songId` | `string` | ID of the song to download |

#### Example: Create

```php
$offline_download = $client->OfflineDownload()->create([
    "songId" => null, // string
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
| `createdAt` | `string` | Creation timestamp |
| `description` | `string` | Playlist description |
| `id` | `string` | Unique identifier for the playlist |
| `isPublic` | `bool` | Whether playlist is public |
| `isSmart` | `bool` | Whether playlist is a smart playlist |
| `name` | `string` | Playlist name |
| `owner` | `string` | User ID of playlist owner |
| `smartCriteria` | `array` | Criteria for smart playlist generation |
| `songCount` | `int` | Number of songs in playlist |
| `songId` | `string` | ID of the song to add |
| `songs` | `array` |  |
| `updatedAt` | `string` | Last update timestamp |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Playlist record (throws on error).
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
    "songId" => null, // string
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
| `albums` | `array` |  |
| `artists` | `array` |  |
| `playlists` | `array` |  |
| `songs` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Search record (throws on error).
$search = $client->Search()->load(["q" => "q"]);
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
| `album` | `string` | Album name |
| `artist` | `string` | Artist name |
| `coverArt` | `string` | URL to cover art image |
| `duration` | `int` | Duration in seconds |
| `genres` | `array` | Music genres |
| `hasVideo` | `bool` | Whether video preview is available |
| `id` | `string` | Unique identifier for the song |
| `releaseDate` | `string` | Release date |
| `title` | `string` | Song title |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Song record (throws on error).
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
| `bitrate` | `int` | Audio bitrate in kbps |
| `expiresAt` | `string` | Expiration time of the stream URL |
| `quality` | `string` | Audio quality |
| `streamUrl` | `string` | URL for streaming the song |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Stream record (throws on error).
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
| `duration` | `int` | Video duration in seconds |
| `thumbnailUrl` | `string` | Video thumbnail URL |
| `videoUrl` | `string` | URL for video preview |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Video record (throws on error).
$video = $client->Video()->load(["song_id" => "song_id"]);
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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
$music = $client->Music();
$music->list();

// $music->data_get() now returns the music data from the last list
// $music->match_get() returns the last match criteria
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
