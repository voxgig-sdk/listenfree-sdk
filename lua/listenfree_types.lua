-- Typed models for the Listenfree SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class ListeningRoom
---@field created_at? string
---@field current_song? table
---@field description? string
---@field host? string
---@field id? string
---@field is_public? boolean
---@field max_participant? number
---@field name? string
---@field participant? table
---@field queue? table

---@class ListeningRoomLoadMatch
---@field id string

---@class ListeningRoomListMatch
---@field created_at? string
---@field current_song? table
---@field description? string
---@field host? string
---@field id? string
---@field is_public? boolean
---@field max_participant? number
---@field name? string
---@field participant? table
---@field queue? table

---@class ListeningRoomCreateData
---@field id string

---@class Music
---@field downloaded_at? string
---@field expires_at? string
---@field id? string
---@field progress? number
---@field song? table
---@field status? string

---@class MusicListMatch
---@field downloaded_at? string
---@field expires_at? string
---@field id? string
---@field progress? number
---@field song? table
---@field status? string

---@class OfflineDownload
---@field song_id string

---@class OfflineDownloadCreateData
---@field song_id string

---@class Playlist
---@field created_at? string
---@field description? string
---@field id? string
---@field is_public? boolean
---@field is_smart? boolean
---@field name? string
---@field owner? string
---@field smart_criterion? table
---@field song? table
---@field song_count? number
---@field song_id string
---@field updated_at? string

---@class PlaylistLoadMatch
---@field id string

---@class PlaylistListMatch
---@field created_at? string
---@field description? string
---@field id? string
---@field is_public? boolean
---@field is_smart? boolean
---@field name? string
---@field owner? string
---@field smart_criterion? table
---@field song? table
---@field song_count? number
---@field song_id? string
---@field updated_at? string

---@class PlaylistCreateData
---@field id string

---@class PlaylistUpdateData
---@field id string

---@class PlaylistRemoveMatch
---@field id string

---@class Search
---@field limit? number
---@field offset? number
---@field result? table
---@field total? number

---@class SearchLoadMatch
---@field limit? number
---@field offset? number
---@field result? table
---@field total? number

---@class Song
---@field album? string
---@field artist? string
---@field cover_art? string
---@field duration? number
---@field genre? table
---@field has_video? boolean
---@field id? string
---@field release_date? string
---@field title? string

---@class SongLoadMatch
---@field id string

---@class Stream
---@field bitrate? number
---@field expires_at? string
---@field quality? string
---@field stream_url? string

---@class StreamLoadMatch
---@field song_id string

---@class Video
---@field duration? number
---@field thumbnail_url? string
---@field video_url? string

---@class VideoLoadMatch
---@field song_id string

local M = {}

return M
