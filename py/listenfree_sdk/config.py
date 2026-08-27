# Listenfree SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "Listenfree",
            "slug": "listenfree",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://listenfree.in/api",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "listening_room": {},
                "music": {},
                "offline_download": {},
                "playlist": {},
                "search": {},
                "song": {},
                "stream": {},
                "video": {},
            },
        },
        "entity": {
      "listening_room": {
        "fields": [
          {
            "name": "createdAt",
            "type": "`$STRING`",
          },
          {
            "name": "currentSong",
            "type": "`$OBJECT`",
          },
          {
            "name": "description",
            "short": "Room description",
            "type": "`$STRING`",
          },
          {
            "name": "host",
            "short": "User ID of room host",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the listening room",
            "type": "`$STRING`",
          },
          {
            "name": "isPublic",
            "short": "Whether room is public",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "maxParticipants",
            "short": "Maximum number of participants",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Room name",
            "type": "`$STRING`",
          },
          {
            "name": "participants",
            "type": "`$ARRAY`",
          },
          {
            "name": "queue",
            "type": "`$ARRAY`",
          },
        ],
        "name": "listening_room",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "room_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/listening-rooms/{roomId}/join",
                "parts": [
                  "listening-rooms",
                  "{id}",
                  "join",
                ],
                "rename": {
                  "param": {
                    "roomId": "id",
                  },
                },
                "select": {
                  "$action": "join",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/listening-rooms",
                "parts": [
                  "listening-rooms",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/listening-rooms",
                "parts": [
                  "listening-rooms",
                ],
                "select": {
                  "exist": [
                    "limit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.rooms`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "room_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/listening-rooms/{roomId}",
                "parts": [
                  "listening-rooms",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "roomId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "music": {
        "fields": [
          {
            "name": "downloadedAt",
            "short": "Download completion timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "expiresAt",
            "short": "Offline availability expiration",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Download ID",
            "type": "`$STRING`",
          },
          {
            "name": "progress",
            "short": "Download progress percentage",
            "type": "`$INTEGER`",
          },
          {
            "name": "song",
            "type": "`$OBJECT`",
          },
          {
            "name": "status",
            "short": "Download status",
            "type": "`$STRING`",
          },
        ],
        "name": "music",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/offline/downloads",
                "parts": [
                  "offline",
                  "downloads",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.downloads`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "offline_download": {
        "fields": [
          {
            "name": "songId",
            "req": True,
            "short": "ID of the song to download",
            "type": "`$STRING`",
          },
        ],
        "name": "offline_download",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/offline/downloads",
                "parts": [
                  "offline",
                  "downloads",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.song`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "playlist": {
        "fields": [
          {
            "name": "createdAt",
            "short": "Creation timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Playlist description",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the playlist",
            "type": "`$STRING`",
          },
          {
            "name": "isPublic",
            "short": "Whether playlist is public",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "isSmart",
            "short": "Whether playlist is a smart playlist",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "name",
            "op": {
              "create": {
                "req": True,
                "type": "`$STRING`",
              },
            },
            "short": "Playlist name",
            "type": "`$STRING`",
          },
          {
            "name": "owner",
            "short": "User ID of playlist owner",
            "type": "`$STRING`",
          },
          {
            "name": "smartCriteria",
            "short": "Criteria for smart playlist generation",
            "type": "`$OBJECT`",
          },
          {
            "name": "songCount",
            "short": "Number of songs in playlist",
            "type": "`$INTEGER`",
          },
          {
            "name": "songId",
            "req": True,
            "short": "ID of the song to add",
            "type": "`$STRING`",
          },
          {
            "name": "songs",
            "type": "`$ARRAY`",
          },
          {
            "name": "updatedAt",
            "short": "Last update timestamp",
            "type": "`$STRING`",
          },
        ],
        "name": "playlist",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "playlist_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "POST",
                "orig": "/playlists/{playlistId}/songs",
                "parts": [
                  "playlists",
                  "{id}",
                  "songs",
                ],
                "rename": {
                  "param": {
                    "playlistId": "id",
                  },
                },
                "select": {
                  "$action": "song",
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/playlists",
                "parts": [
                  "playlists",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/playlists",
                "parts": [
                  "playlists",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.playlists`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "playlist_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/playlists/{playlistId}",
                "parts": [
                  "playlists",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "playlistId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "remove": {
            "input": "data",
            "name": "remove",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "playlist_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "DELETE",
                "orig": "/playlists/{playlistId}",
                "parts": [
                  "playlists",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "playlistId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "update": {
            "input": "data",
            "name": "update",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "playlist_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "PUT",
                "orig": "/playlists/{playlistId}",
                "parts": [
                  "playlists",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "playlistId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "search": {
        "fields": [
          {
            "name": "albums",
            "type": "`$ARRAY`",
          },
          {
            "name": "artists",
            "type": "`$ARRAY`",
          },
          {
            "name": "playlists",
            "type": "`$ARRAY`",
          },
          {
            "name": "songs",
            "type": "`$ARRAY`",
          },
        ],
        "name": "search",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "offset",
                      "orig": "offset",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "imagine dragons",
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": "all",
                      "kind": "query",
                      "name": "type",
                      "orig": "type",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/search",
                "parts": [
                  "search",
                ],
                "select": {
                  "exist": [
                    "limit",
                    "offset",
                    "q",
                    "type",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.results`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "song": {
        "fields": [
          {
            "name": "album",
            "short": "Album name",
            "type": "`$STRING`",
          },
          {
            "name": "artist",
            "short": "Artist name",
            "type": "`$STRING`",
          },
          {
            "name": "coverArt",
            "short": "URL to cover art image",
            "type": "`$STRING`",
          },
          {
            "name": "duration",
            "short": "Duration in seconds",
            "type": "`$INTEGER`",
          },
          {
            "name": "genres",
            "short": "Music genres",
            "type": "`$ARRAY`",
          },
          {
            "name": "hasVideo",
            "short": "Whether video preview is available",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the song",
            "type": "`$STRING`",
          },
          {
            "name": "releaseDate",
            "short": "Release date",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Song title",
            "type": "`$STRING`",
          },
        ],
        "name": "song",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "song_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/songs/{songId}",
                "parts": [
                  "songs",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "songId": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "stream": {
        "fields": [
          {
            "name": "bitrate",
            "short": "Audio bitrate in kbps",
            "type": "`$INTEGER`",
          },
          {
            "name": "expiresAt",
            "short": "Expiration time of the stream URL",
            "type": "`$STRING`",
          },
          {
            "name": "quality",
            "short": "Audio quality",
            "type": "`$STRING`",
          },
          {
            "name": "streamUrl",
            "short": "URL for streaming the song",
            "type": "`$STRING`",
          },
        ],
        "name": "stream",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "song_id",
                      "orig": "song_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "high",
                      "kind": "query",
                      "name": "quality",
                      "orig": "quality",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/songs/{songId}/stream",
                "parts": [
                  "songs",
                  "{song_id}",
                  "stream",
                ],
                "rename": {
                  "param": {
                    "songId": "song_id",
                  },
                },
                "select": {
                  "exist": [
                    "quality",
                    "song_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "song",
            ],
          ],
        },
      },
      "video": {
        "fields": [
          {
            "name": "duration",
            "short": "Video duration in seconds",
            "type": "`$INTEGER`",
          },
          {
            "name": "thumbnailUrl",
            "short": "Video thumbnail URL",
            "type": "`$STRING`",
          },
          {
            "name": "videoUrl",
            "short": "URL for video preview",
            "type": "`$STRING`",
          },
        ],
        "name": "video",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "song_id",
                      "orig": "song_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/songs/{songId}/video",
                "parts": [
                  "songs",
                  "{song_id}",
                  "video",
                ],
                "rename": {
                  "param": {
                    "songId": "song_id",
                  },
                },
                "select": {
                  "exist": [
                    "song_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "song",
            ],
          ],
        },
      },
    },
    }
