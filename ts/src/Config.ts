
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'Listenfree',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://listenfree.in/api",

    auth: {
      prefix: 'Bearer',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      listening_room: {
      },

      music: {
      },

      offline_download: {
      },

      playlist: {
      },

      search: {
      },

      song: {
      },

      stream: {
      },

      video: {
      },

    }
  }


  entity = {
    "listening_room": {
      "fields": [
        {
          "name": "createdAt",
          "type": "`$STRING`"
        },
        {
          "name": "currentSong",
          "type": "`$OBJECT`"
        },
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "host",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "isPublic",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "maxParticipants",
          "type": "`$INTEGER`"
        },
        {
          "name": "name",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "type": "`$STRING`"
        },
        {
          "name": "participants",
          "type": "`$ARRAY`"
        },
        {
          "name": "queue",
          "type": "`$ARRAY`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/listening-rooms/{roomId}/join",
              "parts": [
                "listening-rooms",
                "{id}",
                "join"
              ],
              "rename": {
                "param": {
                  "roomId": "id"
                }
              },
              "select": {
                "$action": "join",
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/listening-rooms",
              "parts": [
                "listening-rooms"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/listening-rooms",
              "parts": [
                "listening-rooms"
              ],
              "select": {
                "exist": [
                  "limit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.rooms`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/listening-rooms/{roomId}",
              "parts": [
                "listening-rooms",
                "{id}"
              ],
              "rename": {
                "param": {
                  "roomId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "music": {
      "fields": [
        {
          "name": "downloadedAt",
          "type": "`$STRING`"
        },
        {
          "name": "expiresAt",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "progress",
          "type": "`$INTEGER`"
        },
        {
          "name": "song",
          "type": "`$OBJECT`"
        },
        {
          "name": "status",
          "type": "`$STRING`"
        }
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
                "downloads"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.downloads`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "offline_download": {
      "fields": [
        {
          "name": "songId",
          "req": true,
          "type": "`$STRING`"
        }
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
                "downloads"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.song`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "playlist": {
      "fields": [
        {
          "name": "createdAt",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "type": "`$STRING`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "isPublic",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "isSmart",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "name",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "type": "`$STRING`"
        },
        {
          "name": "owner",
          "type": "`$STRING`"
        },
        {
          "name": "smartCriteria",
          "type": "`$OBJECT`"
        },
        {
          "name": "songCount",
          "type": "`$INTEGER`"
        },
        {
          "name": "songId",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "songs",
          "type": "`$ARRAY`"
        },
        {
          "name": "updatedAt",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "POST",
              "orig": "/playlists/{playlistId}/songs",
              "parts": [
                "playlists",
                "{id}",
                "songs"
              ],
              "rename": {
                "param": {
                  "playlistId": "id"
                }
              },
              "select": {
                "$action": "song",
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            },
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/playlists",
              "parts": [
                "playlists"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                "playlists"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.playlists`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/playlists/{playlistId}",
              "parts": [
                "playlists",
                "{id}"
              ],
              "rename": {
                "param": {
                  "playlistId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "DELETE",
              "orig": "/playlists/{playlistId}",
              "parts": [
                "playlists",
                "{id}"
              ],
              "rename": {
                "param": {
                  "playlistId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "PUT",
              "orig": "/playlists/{playlistId}",
              "parts": [
                "playlists",
                "{id}"
              ],
              "rename": {
                "param": {
                  "playlistId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "search": {
      "fields": [
        {
          "name": "albums",
          "type": "`$ARRAY`"
        },
        {
          "name": "artists",
          "type": "`$ARRAY`"
        },
        {
          "name": "playlists",
          "type": "`$ARRAY`"
        },
        {
          "name": "songs",
          "type": "`$ARRAY`"
        }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "offset",
                    "orig": "offset",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "imagine dragons",
                    "kind": "query",
                    "name": "q",
                    "orig": "q",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "all",
                    "kind": "query",
                    "name": "type",
                    "orig": "type",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/search",
              "parts": [
                "search"
              ],
              "select": {
                "exist": [
                  "limit",
                  "offset",
                  "q",
                  "type"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.results`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "song": {
      "fields": [
        {
          "name": "album",
          "type": "`$STRING`"
        },
        {
          "name": "artist",
          "type": "`$STRING`"
        },
        {
          "name": "coverArt",
          "type": "`$STRING`"
        },
        {
          "name": "duration",
          "type": "`$INTEGER`"
        },
        {
          "name": "genres",
          "type": "`$ARRAY`"
        },
        {
          "name": "hasVideo",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        },
        {
          "name": "releaseDate",
          "type": "`$STRING`"
        },
        {
          "name": "title",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/songs/{songId}",
              "parts": [
                "songs",
                "{id}"
              ],
              "rename": {
                "param": {
                  "songId": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "stream": {
      "fields": [
        {
          "name": "bitrate",
          "type": "`$INTEGER`"
        },
        {
          "name": "expiresAt",
          "type": "`$STRING`"
        },
        {
          "name": "quality",
          "type": "`$STRING`"
        },
        {
          "name": "streamUrl",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ],
                "query": [
                  {
                    "example": "high",
                    "kind": "query",
                    "name": "quality",
                    "orig": "quality",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/songs/{songId}/stream",
              "parts": [
                "songs",
                "{song_id}",
                "stream"
              ],
              "rename": {
                "param": {
                  "songId": "song_id"
                }
              },
              "select": {
                "exist": [
                  "quality",
                  "song_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "song"
          ]
        ]
      }
    },
    "video": {
      "fields": [
        {
          "name": "duration",
          "type": "`$INTEGER`"
        },
        {
          "name": "thumbnailUrl",
          "type": "`$STRING`"
        },
        {
          "name": "videoUrl",
          "type": "`$STRING`"
        }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/songs/{songId}/video",
              "parts": [
                "songs",
                "{song_id}",
                "video"
              ],
              "rename": {
                "param": {
                  "songId": "song_id"
                }
              },
              "select": {
                "exist": [
                  "song_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "song"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

