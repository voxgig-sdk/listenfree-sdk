# ListenFree API

ListenFree API provides a platform for fast, ad-free music streaming, allowing users to create smart playlists, enjoy collaborative listening rooms, and access video previews of songs. The API supports offline playback and prioritizes user privacy, making it a reliable choice for music enthusiasts.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 8 entities and 16 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### ListeningRoom

Results: Successfully joined the room; Listening room created successfully; List of listening rooms; Listening room details.

SDK operations: `create`, `list`, `load`.

Key fields to recognise:

- `description`: Room description
- `host`: User ID of room host
- `id`: Unique identifier for the listening room
- `isPublic`: Whether room is public
- `maxParticipants`: Maximum number of participants

### Music

Results: List of downloaded songs.

SDK operations: `list`.

Key fields to recognise:

- `downloadedAt`: Download completion timestamp
- `expiresAt`: Offline availability expiration
- `id`: Download ID
- `progress`: Download progress percentage
- `status`: Download status

### OfflineDownload

Results: Song queued for offline download.

SDK operations: `create`.

Key fields to recognise:

- `songId`: ID of the song to download

### Playlist

Results: Song added to playlist successfully; Playlist created successfully; List of playlists; Playlist details retrieved successfully; Playlist deleted successfully; Playlist updated successfully.

SDK operations: `create`, `list`, `load`, `remove`, `update`.

Key fields to recognise:

- `createdAt`: Creation timestamp
- `description`: Playlist description
- `id`: Unique identifier for the playlist
- `isPublic`: Whether playlist is public
- `isSmart`: Whether playlist is a smart playlist

### Search

Results: Successful search results.

SDK operations: `load`.

### Song

Results: Song details retrieved successfully.

SDK operations: `load`.

Key fields to recognise:

- `album`: Album name
- `artist`: Artist name
- `coverArt`: URL to cover art image
- `duration`: Duration in seconds
- `genres`: Music genres

### Stream

Results: Stream URL retrieved successfully.

SDK operations: `load`.

Key fields to recognise:

- `bitrate`: Audio bitrate in kbps
- `expiresAt`: Expiration time of the stream URL
- `quality`: Audio quality
- `streamUrl`: URL for streaming the song

### Video

Results: Video preview URL retrieved successfully.

SDK operations: `load`.

Key fields to recognise:

- `duration`: Video duration in seconds
- `thumbnailUrl`: Video thumbnail URL
- `videoUrl`: URL for video preview

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| ListeningRoom | `create` | `POST /listening-rooms/{roomId}/join` | Required |
| ListeningRoom | `create` | `POST /listening-rooms` | Required |
| ListeningRoom | `list` | `GET /listening-rooms` | See reference |
| ListeningRoom | `load` | `GET /listening-rooms/{roomId}` | See reference |
| Music | `list` | `GET /offline/downloads` | Required |
| OfflineDownload | `create` | `POST /offline/downloads` | Required |
| Playlist | `create` | `POST /playlists/{playlistId}/songs` | Required |
| Playlist | `create` | `POST /playlists` | Required |
| Playlist | `list` | `GET /playlists` | Required |
| Playlist | `load` | `GET /playlists/{playlistId}` | See reference |
| Playlist | `remove` | `DELETE /playlists/{playlistId}` | Required |
| Playlist | `update` | `PUT /playlists/{playlistId}` | Required |
| Search | `load` | `GET /search` | See reference |
| Song | `load` | `GET /songs/{songId}` | See reference |
| Stream | `load` | `GET /songs/{songId}/stream` | See reference |
| Video | `load` | `GET /songs/{songId}/video` | See reference |

## Connect to the API

- ListenFree API Server: `https://listenfree.in/api`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

JWT authentication token

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `listenfree_list`: List records for an entity. Supported entities: `listening_room`, `music`, `playlist`.
- `listenfree_load`: Load one record for an entity. Supported entities: `listening_room`, `playlist`, `search`, `song`, `stream`, `video`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

