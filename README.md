# Listenfree SDK

Ad-free music streaming with playlists, collaborative listening rooms, and offline downloads

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About ListenFree API

[ListenFree](https://listenfree.in/) is an ad-free music streaming service that exposes an HTTP API at `https://listenfree.in/api`. The service focuses on uninterrupted playback alongside features for curated playlists, shared listening sessions, and offline access.

What you get from the API:

- Song search and streaming endpoints for individual tracks
- Playlist resources for organising collections of songs
- Listening room resources for shared/collaborative playback
- Offline download support for cached playback
- Short video previews associated with songs

Operational notes: the [freepublicapis.com listing](https://freepublicapis.com/listenfree-api) reports CORS enabled and sub-300ms average response times. No authentication or rate-limit details are documented on the public landing pages.

## Try it

**TypeScript**
```bash
npm install listenfree
```

**Python**
```bash
pip install listenfree-sdk
```

**PHP**
```bash
composer require voxgig/listenfree-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/listenfree-sdk/go
```

**Ruby**
```bash
gem install listenfree-sdk
```

**Lua**
```bash
luarocks install listenfree-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { ListenfreeSDK } from 'listenfree'

const client = new ListenfreeSDK({})

// List all listeningrooms
const listeningrooms = await client.ListeningRoom().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o listenfree-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "listenfree": {
      "command": "/abs/path/to/listenfree-mcp"
    }
  }
}
```

## Entities

The API exposes 8 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **ListeningRoom** | Shared/collaborative playback sessions where multiple listeners can join the same queue. | `/listening-rooms/{roomId}/join` |
| **Music** | General music resources exposed by the API. | `/offline/downloads` |
| **OfflineDownload** | Endpoints supporting cached/offline playback of tracks. | `/offline/downloads` |
| **Playlist** | User-curated collections of songs. | `/playlists/{playlistId}/songs` |
| **Search** | Lookup endpoints for finding songs, playlists, or other resources. | `/search` |
| **Song** | Individual music track resources. | `/songs/{songId}` |
| **Stream** | Audio streaming endpoints for playing tracks. | `/songs/{songId}/stream` |
| **Video** | Short video previews associated with songs. | `/songs/{songId}/video` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from listenfree_sdk import ListenfreeSDK

client = ListenfreeSDK({})

# List all listeningrooms
listeningrooms, err = client.ListeningRoom(None).list(None, None)

# Load a specific listeningroom
listeningroom, err = client.ListeningRoom(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'listenfree_sdk.php';

$client = new ListenfreeSDK([]);

// List all listeningrooms
[$listeningrooms, $err] = $client->ListeningRoom(null)->list(null, null);

// Load a specific listeningroom
[$listeningroom, $err] = $client->ListeningRoom(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/listenfree-sdk/go"

client := sdk.NewListenfreeSDK(map[string]any{})

// List all listeningrooms
listeningrooms, err := client.ListeningRoom(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Listenfree_sdk"

client = ListenfreeSDK.new({})

# List all listeningrooms
listeningrooms, err = client.ListeningRoom(nil).list(nil, nil)

# Load a specific listeningroom
listeningroom, err = client.ListeningRoom(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("listenfree_sdk")

local client = sdk.new({})

-- List all listeningrooms
local listeningrooms, err = client:ListeningRoom(nil):list(nil, nil)

-- Load a specific listeningroom
local listeningroom, err = client:ListeningRoom(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = ListenfreeSDK.test()
const result = await client.ListeningRoom().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = ListenfreeSDK.test(None, None)
result, err = client.ListeningRoom(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = ListenfreeSDK::test(null, null);
[$result, $err] = $client->ListeningRoom(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.ListeningRoom(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = ListenfreeSDK.test(nil, nil)
result, err = client.ListeningRoom(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:ListeningRoom(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the ListenFree API

- Upstream: [https://listenfree.in/](https://listenfree.in/)
- API docs: [https://listenfree.in/api](https://listenfree.in/api)

---

Generated from the ListenFree API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
