-- Typed models for the Listenfree SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ListeningRoom
---@field createdAt? string
---@field currentSong? table
---@field description? string
---@field host? string
---@field id? string
---@field isPublic? boolean
---@field maxParticipants? number
---@field name? string
---@field participants? table
---@field queue? table

---@class ListeningRoomLoadMatch
---@field id string

---@class ListeningRoomListMatch
---@field createdAt? string
---@field currentSong? table
---@field description? string
---@field host? string
---@field id? string
---@field isPublic? boolean
---@field maxParticipants? number
---@field name? string
---@field participants? table
---@field queue? table

---@class ListeningRoomCreateData
---@field createdAt? string
---@field currentSong? table
---@field description? string
---@field host? string
---@field id? string
---@field isPublic? boolean
---@field maxParticipants? number
---@field name? string
---@field participants? table
---@field queue? table

---@class Music
---@field downloadedAt? string
---@field expiresAt? string
---@field id? string
---@field progress? number
---@field song? table
---@field status? string

---@class MusicListMatch
---@field downloadedAt? string
---@field expiresAt? string
---@field id? string
---@field progress? number
---@field song? table
---@field status? string

---@class OfflineDownload
---@field songId string

---@class OfflineDownloadCreateData
---@field songId string

---@class Playlist
---@field createdAt? string
---@field description? string
---@field id? string
---@field isPublic? boolean
---@field isSmart? boolean
---@field name? string
---@field owner? string
---@field smartCriteria? table
---@field songCount? number
---@field songId string
---@field songs? table
---@field updatedAt? string

---@class PlaylistLoadMatch
---@field id string

---@class PlaylistListMatch
---@field createdAt? string
---@field description? string
---@field id? string
---@field isPublic? boolean
---@field isSmart? boolean
---@field name? string
---@field owner? string
---@field smartCriteria? table
---@field songCount? number
---@field songId? string
---@field songs? table
---@field updatedAt? string

---@class PlaylistCreateData
---@field createdAt? string
---@field description? string
---@field id? string
---@field isPublic? boolean
---@field isSmart? boolean
---@field name? string
---@field owner? string
---@field smartCriteria? table
---@field songCount? number
---@field songId string
---@field songs? table
---@field updatedAt? string

---@class PlaylistUpdateData
---@field id string
---@field createdAt? string
---@field description? string
---@field isPublic? boolean
---@field isSmart? boolean
---@field name? string
---@field owner? string
---@field smartCriteria? table
---@field songCount? number
---@field songId? string
---@field songs? table
---@field updatedAt? string

---@class PlaylistRemoveMatch
---@field id string

---@class Search
---@field albums? table
---@field artists? table
---@field playlists? table
---@field songs? table

---@class SearchLoadMatch
---@field albums? table
---@field artists? table
---@field playlists? table
---@field songs? table

---@class Song
---@field album? string
---@field artist? string
---@field coverArt? string
---@field duration? number
---@field genres? table
---@field hasVideo? boolean
---@field id? string
---@field releaseDate? string
---@field title? string

---@class SongLoadMatch
---@field id string

---@class Stream
---@field bitrate? number
---@field expiresAt? string
---@field quality? string
---@field streamUrl? string

---@class StreamLoadMatch
---@field song_id string

---@class Video
---@field duration? number
---@field thumbnailUrl? string
---@field videoUrl? string

---@class VideoLoadMatch
---@field song_id string

local M = {}

return M
