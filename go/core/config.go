package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Listenfree",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://listenfree.in/api",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"listening_room": map[string]any{},
				"music": map[string]any{},
				"offline_download": map[string]any{},
				"playlist": map[string]any{},
				"search": map[string]any{},
				"song": map[string]any{},
				"stream": map[string]any{},
				"video": map[string]any{},
			},
		},
		"entity": map[string]any{
			"listening_room": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currentSong",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "host",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isPublic",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "maxParticipants",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "participants",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "queue",
						"type": "`$ARRAY`",
					},
				},
				"name": "listening_room",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "room_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/listening-rooms/{roomId}/join",
								"parts": []any{
									"listening-rooms",
									"{id}",
									"join",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"roomId": "id",
									},
								},
								"select": map[string]any{
									"$action": "join",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/listening-rooms",
								"parts": []any{
									"listening-rooms",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/listening-rooms",
								"parts": []any{
									"listening-rooms",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.rooms`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "room_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/listening-rooms/{roomId}",
								"parts": []any{
									"listening-rooms",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"roomId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"music": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "downloadedAt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expiresAt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "progress",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "song",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "status",
						"type": "`$STRING`",
					},
				},
				"name": "music",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/offline/downloads",
								"parts": []any{
									"offline",
									"downloads",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.downloads`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"offline_download": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "songId",
						"req": true,
						"type": "`$STRING`",
					},
				},
				"name": "offline_download",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/offline/downloads",
								"parts": []any{
									"offline",
									"downloads",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.song`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"playlist": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "createdAt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isPublic",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "isSmart",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "name",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owner",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "smartCriteria",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "songCount",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "songId",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "songs",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "updatedAt",
						"type": "`$STRING`",
					},
				},
				"name": "playlist",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "playlist_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "POST",
								"orig": "/playlists/{playlistId}/songs",
								"parts": []any{
									"playlists",
									"{id}",
									"songs",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"playlistId": "id",
									},
								},
								"select": map[string]any{
									"$action": "song",
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/playlists",
								"parts": []any{
									"playlists",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/playlists",
								"parts": []any{
									"playlists",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.playlists`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "playlist_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/playlists/{playlistId}",
								"parts": []any{
									"playlists",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"playlistId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"remove": map[string]any{
						"input": "data",
						"name": "remove",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "playlist_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "DELETE",
								"orig": "/playlists/{playlistId}",
								"parts": []any{
									"playlists",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"playlistId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"update": map[string]any{
						"input": "data",
						"name": "update",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "playlist_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "PUT",
								"orig": "/playlists/{playlistId}",
								"parts": []any{
									"playlists",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"playlistId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "albums",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "artists",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "playlists",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "songs",
						"type": "`$ARRAY`",
					},
				},
				"name": "search",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "offset",
											"orig": "offset",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "imagine dragons",
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "all",
											"kind": "query",
											"name": "type",
											"orig": "type",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"parts": []any{
									"search",
								},
								"select": map[string]any{
									"exist": []any{
										"limit",
										"offset",
										"q",
										"type",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"song": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "album",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "artist",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "coverArt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "duration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "genres",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "hasVideo",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "releaseDate",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"type": "`$STRING`",
					},
				},
				"name": "song",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "song_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/songs/{songId}",
								"parts": []any{
									"songs",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"songId": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"stream": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bitrate",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "expiresAt",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "quality",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "streamUrl",
						"type": "`$STRING`",
					},
				},
				"name": "stream",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "song_id",
											"orig": "song_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "high",
											"kind": "query",
											"name": "quality",
											"orig": "quality",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/songs/{songId}/stream",
								"parts": []any{
									"songs",
									"{song_id}",
									"stream",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"songId": "song_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"quality",
										"song_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"song",
						},
					},
				},
			},
			"video": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "duration",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "thumbnailUrl",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "videoUrl",
						"type": "`$STRING`",
					},
				},
				"name": "video",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "song_id",
											"orig": "song_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/songs/{songId}/video",
								"parts": []any{
									"songs",
									"{song_id}",
									"video",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"songId": "song_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"song_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"song",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
