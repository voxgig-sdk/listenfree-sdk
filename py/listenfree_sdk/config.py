# Listenfree SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "format": "date-time",
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
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "rename": {
                  "param": {
                    "roomId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "listening-rooms",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "join",
                  },
                ],
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
                "parts": [
                  "listening-rooms",
                  "{id}",
                  "join",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/listening-rooms",
                "segments": [
                  {
                    "lit": "listening-rooms",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "listening-rooms",
                ],
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
                "segments": [
                  {
                    "lit": "listening-rooms",
                  },
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
                "parts": [
                  "listening-rooms",
                ],
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
                "rename": {
                  "param": {
                    "roomId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "listening-rooms",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "listening-rooms",
                  "{id}",
                ],
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
            "format": "date-time",
            "name": "downloadedAt",
            "short": "Download completion timestamp",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
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
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "segments": [
                  {
                    "lit": "offline",
                  },
                  {
                    "lit": "downloads",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.downloads`",
                },
                "parts": [
                  "offline",
                  "downloads",
                ],
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
                "segments": [
                  {
                    "lit": "offline",
                  },
                  {
                    "lit": "downloads",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.song`",
                },
                "parts": [
                  "offline",
                  "downloads",
                ],
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
            "format": "date-time",
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
            "name": "songs",
            "type": "`$ARRAY`",
          },
          {
            "format": "date-time",
            "name": "updatedAt",
            "short": "Last update timestamp",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "rename": {
                  "param": {
                    "playlistId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "playlists",
                  },
                  {
                    "var": "id",
                  },
                  {
                    "lit": "songs",
                  },
                ],
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
                "parts": [
                  "playlists",
                  "{id}",
                  "songs",
                ],
              },
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/playlists",
                "segments": [
                  {
                    "lit": "playlists",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "playlists",
                ],
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
                "segments": [
                  {
                    "lit": "playlists",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.playlists`",
                },
                "parts": [
                  "playlists",
                ],
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
                "rename": {
                  "param": {
                    "playlistId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "playlists",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "playlists",
                  "{id}",
                ],
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
                "rename": {
                  "param": {
                    "playlistId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "playlists",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "playlists",
                  "{id}",
                ],
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
                "rename": {
                  "param": {
                    "playlistId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "playlists",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "playlists",
                  "{id}",
                ],
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
                "segments": [
                  {
                    "lit": "search",
                  },
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
                "parts": [
                  "search",
                ],
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
            "format": "uri",
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
            "format": "date",
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
        "id": {
          "field": "id",
          "name": "id",
        },
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
                "rename": {
                  "param": {
                    "songId": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "songs",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "songs",
                  "{id}",
                ],
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
            "format": "date-time",
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
            "format": "uri",
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
                "rename": {
                  "param": {
                    "songId": "song_id",
                  },
                },
                "segments": [
                  {
                    "lit": "songs",
                  },
                  {
                    "var": "song_id",
                  },
                  {
                    "lit": "stream",
                  },
                ],
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
                "parts": [
                  "songs",
                  "{song_id}",
                  "stream",
                ],
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
            "format": "uri",
            "name": "thumbnailUrl",
            "short": "Video thumbnail URL",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
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
                "rename": {
                  "param": {
                    "songId": "song_id",
                  },
                },
                "segments": [
                  {
                    "lit": "songs",
                  },
                  {
                    "var": "song_id",
                  },
                  {
                    "lit": "video",
                  },
                ],
                "select": {
                  "exist": [
                    "song_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "songs",
                  "{song_id}",
                  "video",
                ],
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
