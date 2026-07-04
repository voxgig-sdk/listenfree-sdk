// Typed models for the Listenfree SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface ListeningRoom {
  created_at?: string
  current_song?: Record<string, any>
  description?: string
  host?: string
  id?: string
  is_public?: boolean
  max_participant?: number
  name?: string
  participant?: any[]
  queue?: any[]
}

export interface ListeningRoomLoadMatch {
  id: string
}

export type ListeningRoomListMatch = Partial<ListeningRoom>

export interface ListeningRoomCreateData {
  id: string
}

export interface Music {
  downloaded_at?: string
  expires_at?: string
  id?: string
  progress?: number
  song?: Record<string, any>
  status?: string
}

export type MusicListMatch = Partial<Music>

export interface OfflineDownload {
  song_id: string
}

export type OfflineDownloadCreateData = Partial<OfflineDownload>

export interface Playlist {
  created_at?: string
  description?: string
  id?: string
  is_public?: boolean
  is_smart?: boolean
  name?: string
  owner?: string
  smart_criterion?: Record<string, any>
  song?: any[]
  song_count?: number
  song_id: string
  updated_at?: string
}

export interface PlaylistLoadMatch {
  id: string
}

export type PlaylistListMatch = Partial<Playlist>

export interface PlaylistCreateData {
  id: string
}

export interface PlaylistUpdateData {
  id: string
}

export interface PlaylistRemoveMatch {
  id: string
}

export interface Search {
  limit?: number
  offset?: number
  result?: Record<string, any>
  total?: number
}

export type SearchLoadMatch = Partial<Search>

export interface Song {
  album?: string
  artist?: string
  cover_art?: string
  duration?: number
  genre?: any[]
  has_video?: boolean
  id?: string
  release_date?: string
  title?: string
}

export interface SongLoadMatch {
  id: string
}

export interface Stream {
  bitrate?: number
  expires_at?: string
  quality?: string
  stream_url?: string
}

export interface StreamLoadMatch {
  song_id: string
}

export interface Video {
  duration?: number
  thumbnail_url?: string
  video_url?: string
}

export interface VideoLoadMatch {
  song_id: string
}

